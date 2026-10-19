import test from 'node:test';
import assert from 'node:assert/strict';
import { zipSync, strToU8, Zip, ZipPassThrough } from 'fflate';
import {
  createDownloadService,
  readManifest,
} from '../lib/download-service.mjs';
import { onRequest } from '../functions/launcher/[[path]].js';

function fixture() {
  const calls = [];
  let unsafe = false;
  let unavailable = false;
  let now = 0;
  let canceled = false;
  const latest = {
    id: 100,
    fileDate: '2026-10-18',
    releaseType: 1,
    isServerPack: false,
    isAvailable: true,
  };
  const archive = zipSync({
    'overrides/large.txt': new Uint8Array(4 * 1024 * 1024),
    'manifest.json': strToU8(
      JSON.stringify({ files: [{ projectID: 5, fileID: 6 }] }),
    ),
  });
  const service = createDownloadService({
    apiKey: 'secret-fixture-key',
    publicBaseUrl: 'https://patilanci.net/launcher',
    now: () => now,
    fetchUpstream: async (url, options) => {
      calls.push(url);
      assert.equal(options.headers['x-api-key'], 'secret-fixture-key');
      if (url.includes('/files?'))
        return Response.json({
          data: [{ ...latest, isAvailable: !unavailable }],
          pagination: { index: 0, resultCount: 1, totalCount: 1 },
        });
      if (url.endsWith('/mods/1746375/files/100'))
        return Response.json({
          data: {
            ...latest,
            downloadUrl: 'https://edge.forgecdn.net/pack.zip',
          },
        });
      if (url.endsWith('/mods/5/files/6'))
        return Response.json({
          data: { id: 6, downloadUrl: 'https://edge.forgecdn.net/mod.jar' },
        });
      if (url === 'https://edge.forgecdn.net/pack.zip')
        return new Response(archive);
      if (url === 'https://edge.forgecdn.net/mod.jar') {
        if (unsafe)
          return new Response(null, {
            status: 302,
            headers: { Location: 'https://evil.example/key' },
          });
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(strToU8('mod-fixture'));
            },
            cancel() {
              canceled = true;
            },
          }),
        );
      }
      throw new Error(`Unexpected request: ${url}`);
    },
  });
  return {
    calls,
    call: (route, method = 'GET') =>
      service(new Request(`https://patilanci.net${route}`, { method })),
    unsafe: () => {
      unsafe = true;
    },
    unavailable: () => {
      unavailable = true;
      now += 60001;
    },
    canceled: () => canceled,
  };
}

test('Cloudflare release metadata uses the same-domain proxy and never exposes the API key', async () => {
  const f = fixture();
  const result = await f.call('/launcher/v1/mods/1746375/files');
  assert.equal(result.status, 200);
  const body = await result.text();
  assert.match(
    body,
    /https:\/\/patilanci.net\/launcher\/download\/1746375\/100/,
  );
  assert.doesNotMatch(body, /secret-fixture-key/);
  const metadata = await f.call('/launcher/v1/mods/5/files/6/download-url');
  assert.deepEqual(await metadata.json(), {
    data: 'https://patilanci.net/launcher/download/5/6',
  });
});

test('only current pack files are served; methods, traversal, queries and pagination are constrained', async () => {
  const f = fixture();
  for (const [route, method, status] of [
    ['/launcher/health', 'POST', 405],
    ['/launcher/v1/mods/1/files', 'GET', 404],
    ['/launcher/v1/mods/1746375/files?pageSize=51', 'GET', 400],
    ['/launcher/v1/mods/1746375/files?index=9999&pageSize=50', 'GET', 400],
    ['/launcher/v1/mods/1746375/files?url=https://evil.example', 'GET', 400],
    ['/launcher/download/5/7', 'GET', 403],
    ['/launcher/download/5/6?redirect=1', 'GET', 404],
    ['/launcher/download/../../secret', 'GET', 404],
  ])
    assert.equal((await f.call(route, method)).status, status, route);
});

test('downloads return an open upstream stream without buffering the whole file', async () => {
  const f = fixture();
  const response = await f.call('/launcher/download/5/6');
  assert.equal(response.status, 200);
  const reader = response.body.getReader();
  assert.equal(
    new TextDecoder().decode((await reader.read()).value),
    'mod-fixture',
  );
  await reader.cancel();
  assert.equal(f.canceled(), true);
});

test('untrusted CDN redirects cannot receive credentials and failures reveal no upstream details', async () => {
  const f = fixture();
  f.unsafe();
  const response = await f.call('/launcher/download/5/6');
  assert.equal(response.status, 502);
  assert.equal(
    f.calls.some((url) => url.includes('evil.example')),
    false,
  );
  assert.doesNotMatch(
    await response.text(),
    /secret-fixture-key|evil.example|forgecdn/,
  );
});

test('expired allowlists do not authorize an unavailable latest release', async () => {
  const f = fixture();
  assert.equal((await f.call('/launcher/v1/mods/5/files/6')).status, 200);
  f.unavailable();
  assert.equal((await f.call('/launcher/v1/mods/5/files/6')).status, 502);
});

test('manifest extraction handles stored entries, streaming ZIP descriptors, malformed ZIPs and oversized manifests', async () => {
  const manifest = { files: [] };
  assert.deepEqual(
    await readManifest(
      new Response(
        zipSync({
          'manifest.json': [strToU8(JSON.stringify(manifest)), { level: 0 }],
        }),
      ).body,
    ),
    manifest,
  );
  const chunks = [];
  const zip = new Zip((error, bytes) => {
    assert.ifError(error);
    chunks.push(bytes);
  });
  const entry = new ZipPassThrough('manifest.json');
  zip.add(entry);
  entry.push(strToU8(JSON.stringify(manifest)), true);
  zip.end();
  const streamed = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  assert.deepEqual(await readManifest(streamed), manifest);
  await assert.rejects(() => readManifest(new Response('not a zip').body));
  await assert.rejects(() =>
    readManifest(new Response(zipSync({ 'other.txt': strToU8('none') })).body),
  );
  await assert.rejects(
    () =>
      readManifest(
        new Response(
          zipSync({ 'manifest.json': new Uint8Array(1024 * 1024 + 1) }),
        ).body,
      ),
    /manifest/i,
  );
});

test('Pages Function fails clearly when its secret is missing and does not intercept static pages', async () => {
  const response = await onRequest({
    request: new Request('https://patilanci.net/launcher/health'),
    env: {},
  });
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /PATILANCI_CURSEFORGE_KEY/);
  const f = fixture();
  assert.equal((await f.call('/index.html')).status, 404);
  assert.deepEqual(await (await f.call('/launcher/health')).json(), {
    service: 'Patilanci downloads',
  });
});


test('API failures report safe diagnostics without exposing credentials or upstream bodies', async () => {
  for (const failure of [401, 403, 429, 500, 'network', 'invalid-json']) {
    const service = createDownloadService({
      apiKey: 'secret-fixture-key',
      publicBaseUrl: 'https://patilanci.net/launcher',
      fetchUpstream: async () => {
        if (failure === 'network') throw new Error('secret-fixture-key');
        return new Response('secret-fixture-key', {
          status: failure === 'invalid-json' ? 200 : failure,
        });
      },
    });
    const response = await service(new Request(
      'https://patilanci.net/launcher/v1/mods/1746375/files?pageSize=1',
    ));
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.upstreamStatus, failure === 'network' ? null : failure === 'invalid-json' ? 200 : failure);
    assert.equal(body.code, failure === 'network' ? 'CURSEFORGE_CONNECTION_FAILED' : failure === 'invalid-json' ? 'CURSEFORGE_INVALID_RESPONSE' : 'CURSEFORGE_HTTP_ERROR');
    assert.doesNotMatch(JSON.stringify(body), /secret-fixture-key/);
  }
});


test('API redirects are rejected without forwarding the server credential', async () => {
  let calls = 0;
  const service = createDownloadService({
    apiKey: 'secret-fixture-key',
    publicBaseUrl: 'https://patilanci.net/launcher',
    fetchUpstream: async (url, options) => {
      calls++;
      if (options.redirect === 'error') throw new TypeError('Unsupported redirect mode');
      const upstream = new Request(url, options);
      assert.equal(upstream.redirect, 'manual');
      return new Response(null, {status: 302, headers: {Location: 'https://evil.example/key'}});
    },
  });
  const response = await service(new Request('https://patilanci.net/launcher/v1/mods/1746375/files'));
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.equal(body.upstreamStatus, 302);
  assert.equal(calls, 1);
  assert.doesNotMatch(JSON.stringify(body), /secret-fixture-key|evil.example/);
});
