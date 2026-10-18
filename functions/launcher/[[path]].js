import { createDownloadService } from '../../lib/download-service.mjs';

let cached;

export function onRequest({ request, env }) {
  if (!env.PATILANCI_CURSEFORGE_KEY) {
    return Response.json(
      { error: 'The download service is not configured.' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
  const base = `${new URL(request.url).origin}/launcher`;
  if (
    !cached ||
    cached.base !== base ||
    cached.key !== env.PATILANCI_CURSEFORGE_KEY
  ) {
    cached = {
      base,
      key: env.PATILANCI_CURSEFORGE_KEY,
      handle: createDownloadService({
        apiKey: env.PATILANCI_CURSEFORGE_KEY,
        publicBaseUrl: base,
      }),
    };
  }
  return cached.handle(request);
}
