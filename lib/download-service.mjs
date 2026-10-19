import { Unzip, UnzipInflate, UnzipPassThrough } from 'fflate';
import releases from './releases.cjs';

const { findLatestClientFile } = releases;
const PROJECT_ID = 1746375;
const MAX_MANIFEST = 1024 * 1024;

// Read only the manifest. Start a discard decoder for every other ZIP entry so
// fflate never retains overrides or expands their contents in Worker memory.
export async function readManifest(body) {
  const reader = body.getReader();
  const parts = [];
  let size = 0;
  let read = 0;
  let found = false;
  let complete = false;
  let failure;
  const unzip = new Unzip((file) => {
    if (file.name !== 'manifest.json') {
      unzip.register(
        class Discard {
          static compression = file.compression;
          push(_chunk, final) {
            this.ondata(null, new Uint8Array(), final);
          }
        },
      );
      file.ondata = (error) => {
        if (error) failure = error;
      };
      file.start();
      return;
    }
    if (found || file.originalSize > MAX_MANIFEST)
      throw new Error('Invalid manifest.');
    found = true;
    unzip.register(UnzipInflate);
    unzip.register(UnzipPassThrough);
    file.ondata = (error, chunk, final) => {
      if (error) {
        failure = error;
        return;
      }
      size += chunk.length;
      if (size > MAX_MANIFEST) throw new Error('Manifest too large.');
      parts.push(chunk.slice());
      complete = final;
    };
    file.start();
  });
  try {
    while (!complete) {
      const { value, done } = await reader.read();
      if (done) {
        unzip.push(new Uint8Array(), true);
        break;
      }
      read += value.length;
      if (read > 64 * 1024 * 1024)
        throw new Error('Archive scan limit exceeded.');
      // Bound individual inflation allocations even with malicious compression.
      for (let offset = 0; offset < value.length && !complete; offset += 1024) {
        unzip.push(value.subarray(offset, offset + 1024));
        if (failure) throw failure;
      }
    }
    if (!complete || failure) throw new Error('Missing or invalid manifest.');
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const part of parts) {
      bytes.set(part, offset);
      offset += part.length;
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

class CurseForgeApiError extends Error {
  constructor(code, upstreamStatus = null) {
    super('The CurseForge API request failed.');
    this.code = code;
    this.upstreamStatus = upstreamStatus;
  }
}

export function createDownloadService({
  apiKey,
  publicBaseUrl,
  fetchUpstream = fetch,
  now = Date.now,
}) {
  if (!apiKey) throw new Error('Missing service credential.');
  const base = new URL(publicBaseUrl);
  if (
    base.protocol !== 'https:' ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  )
    throw new Error('Use a public HTTPS service URL.');
  const publicUrl = base.href.replace(/\/$/, '');
  const prefix = base.pathname.replace(/\/$/, '');
  let manifestCache;
  let manifestRequest;

  async function api(route) {
    const response = await fetchUpstream(
      `https://api.curseforge.com/v1${route}`,
      {
        headers: { 'x-api-key': apiKey, 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(30000),
        redirect: 'error',
      },
    ).catch(() => {
      throw new CurseForgeApiError('CURSEFORGE_CONNECTION_FAILED');
    });
    if (!response.ok)
      throw new CurseForgeApiError('CURSEFORGE_HTTP_ERROR', response.status);
    return response.json().catch(() => {
      throw new CurseForgeApiError('CURSEFORGE_INVALID_RESPONSE', response.status);
    });
  }

  async function cdn(url) {
    let target = new URL(url);
    for (let attempt = 0; attempt < 4; attempt++) {
      if (
        target.protocol !== 'https:' ||
        !target.hostname.endsWith('.forgecdn.net') ||
        target.username ||
        target.password ||
        target.port
      )
        throw new Error('Untrusted download host.');
      const response = await fetchUpstream(target.href, {
        headers: { 'x-api-key': apiKey },
        redirect: 'manual',
        signal: AbortSignal.timeout(180000),
      });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        await response.body?.cancel();
        target = new URL(response.headers.get('location'), target);
        continue;
      }
      if (!response.ok || !response.body) throw new Error('Download failed.');
      return response;
    }
    throw new Error('Too many redirects.');
  }

  async function fileInfo(project, file) {
    const { data: info } = await api(`/mods/${project}/files/${file}`);
    if (!info || info.isAvailable === false)
      throw new Error('Unavailable file.');
    const downloadUrl =
      info.downloadUrl ||
      (await api(`/mods/${project}/files/${file}/download-url`)).data;
    if (!downloadUrl) throw new Error('Unavailable third-party download.');
    return { info, downloadUrl };
  }

  async function allowedFiles(force = false) {
    if (!force && manifestCache?.expires > now()) return manifestCache;
    if (!manifestRequest) {
      manifestRequest = (async () => {
        const latest = await findLatestClientFile(({ index, pageSize }) =>
          api(`/mods/${PROJECT_ID}/files?index=${index}&pageSize=${pageSize}`),
        );
        const { downloadUrl } = await fileInfo(PROJECT_ID, latest.id);
        const archive = await cdn(downloadUrl);
        const manifest = await readManifest(archive.body);
        if (!Array.isArray(manifest.files) || manifest.files.length > 10000)
          throw new Error('Invalid manifest files.');
        const allowed = new Set([`${PROJECT_ID}/${latest.id}`]);
        for (const file of manifest.files) {
          if (
            !Number.isSafeInteger(file.projectID) ||
            file.projectID <= 0 ||
            !Number.isSafeInteger(file.fileID) ||
            file.fileID <= 0
          )
            throw new Error('Invalid file reference.');
          allowed.add(`${file.projectID}/${file.fileID}`);
        }
        manifestCache = { allowed, expires: now() + 60000 };
        return manifestCache;
      })().finally(() => {
        manifestRequest = null;
      });
    }
    return manifestRequest;
  }

  function json(status, data) {
    return Response.json(data, {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  return async function handle(request) {
    try {
      if (request.method !== 'GET')
        return json(405, { error: 'GET required.' });
      const url = new URL(request.url);
      if (url.origin !== base.origin || !url.pathname.startsWith(`${prefix}/`))
        return json(404, { error: 'Not found.' });
      const route = url.pathname.slice(prefix.length);
      if (route === '/health')
        return json(200, { service: 'Patilanci downloads' });
      if (route === `/v1/mods/${PROJECT_ID}/files`) {
        const index = Number(url.searchParams.get('index') || 0);
        const pageSize = Number(url.searchParams.get('pageSize') || 50);
        if (
          !Number.isInteger(index) ||
          index < 0 ||
          index >= 10000 ||
          !Number.isInteger(pageSize) ||
          pageSize < 1 ||
          pageSize > 50 ||
          index + pageSize > 10000 ||
          [...url.searchParams.keys()].some(
            (key) => !['index', 'pageSize'].includes(key),
          )
        )
          return json(400, { error: 'Invalid pagination.' });
        const result = await api(
          `/mods/${PROJECT_ID}/files?index=${index}&pageSize=${pageSize}`,
        );
        result.data = result.data.map((file) => ({
          ...file,
          downloadUrl: `${publicUrl}/download/${PROJECT_ID}/${file.id}`,
        }));
        return json(200, result);
      }
      const metadata = route.match(
        /^\/v1\/mods\/(\d+)\/files\/(\d+)(\/download-url)?$/,
      );
      const match = metadata || route.match(/^\/download\/(\d+)\/(\d+)$/);
      if (!match || url.search) return json(404, { error: 'Not found.' });
      const [, project, file] = match;
      let manifest = await allowedFiles();
      if (
        project === String(PROJECT_ID) &&
        !manifest.allowed.has(`${project}/${file}`)
      )
        manifest = await allowedFiles(true);
      if (!manifest.allowed.has(`${project}/${file}`))
        return json(403, {
          error: 'Only files from the current Patilanci pack are served.',
        });
      const { info, downloadUrl } = await fileInfo(project, file);
      if (metadata)
        return json(200, {
          data: metadata[3]
            ? `${publicUrl}/download/${project}/${file}`
            : {
                ...info,
                downloadUrl: `${publicUrl}/download/${project}/${file}`,
              },
        });
      const upstream = await cdn(downloadUrl);
      return new Response(upstream.body, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      if (error instanceof CurseForgeApiError) {
        return json(502, {
          error: [401, 403].includes(error.upstreamStatus)
            ? 'CurseForge denied API access. Check the server API key and its permissions.'
            : 'The CurseForge API request failed. Retry later.',
          code: error.code,
          upstreamStatus: error.upstreamStatus,
        });
      }
      return json(502, {
        error:
          'The Patilanci download service could not prepare this file. Retry later.',
      });
    }
  };
}
