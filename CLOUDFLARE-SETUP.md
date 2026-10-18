# Patilanci launcher downloads on Cloudflare Pages

The existing coming-soon page remains the home page. A Pages Function serves only `/launcher/*`. Large game/mod downloads stream through Cloudflare, and ZIP scanning expands only the bounded `manifest.json`, discarding overrides. No VPS or long-running Node server is required.

## Cloudflare dashboard

1. Open Workers & Pages and select the existing Pages project serving `patilanci.net`.
2. Under Settings > Variables and Secrets, add an encrypted secret named `PATILANCI_CURSEFORGE_KEY` with your existing working CurseForge API key. Set it for Production. Configure Preview separately only if you want preview deployments to access downloads. Never put the key in HTML, Git, or a public variable.
3. Set the build command to `npm run build` and the build output directory to `dist`. Keep the existing production branch and repository root directory. The build copies the original index, assets, and resource-pack ZIPs into the public output; source, tests, and secrets remain outside it.
4. This project now has a `wrangler.jsonc` using compatibility date `2026-10-18`. No Cloudflare project name is hardcoded; keep the existing Git integration, or supply the actual project name for CLI deployment. The Function uses standard Fetch/Streams APIs and does not need a running Node HTTP server.
5. Commit and push these local site changes through your existing Git integration. Deploy Functions via Git integration or Wrangler, rather than dragging a static folder into the dashboard. Do not configure Pages to fail open to static assets for Function errors.
6. After deployment, verify:
   - `https://patilanci.net/` still shows the coming-soon page.
   - `https://patilanci.net/launcher/health` returns JSON identifying Patilanci downloads. A 503 means the secret is missing.
   - `https://patilanci.net/launcher/v1/mods/1746375/files?pageSize=1` returns CurseForge metadata with same-domain proxy download URLs. This tests real API access, which the health route alone does not do.
7. In the **launcher** GitHub repository, set the Actions variable `PUBLIC_DOWNLOAD_SERVICE_URL` to `https://patilanci.net/launcher`. The local launcher configuration uses this same URL. Windows signing remains a separate requirement for production installers.

If you deploy by CLI instead of Git integration, use `npm ci`, `npm run build`, then `npx wrangler pages deploy dist --project-name YOUR_EXISTING_PROJECT_NAME`. This publishes externally; run it only when you intend to deploy.

## Local checks

Use Node.js 22+ and run `npm ci`, `npm test`, `npm run build`, and `npm run check:cloudflare`. For local preview, copy `.dev.vars.example` to `.dev.vars`, set the key there, then run `npm run dev`. Keep `.dev.vars` private; it is ignored by Git.

The dependency lockfile is committed for repeatable Cloudflare builds. `lib/releases.cjs` is copied from the launcher's `electron/releases.cjs`; keep it synchronized when release-selection rules change. Never put launcher authentication tokens or signing certificates in this website project.

Only the latest Patilanci manifest's pack and referenced mods are authorized. Cache lifetime is one minute per running Function isolate, with no fallback to an expired allowlist after verification fails. Review your Cloudflare plan's CPU and subrequest quotas when sizing public traffic; test a complete modpack installation after deploying, not just the health route.

References: [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/), [secret bindings](https://developers.cloudflare.com/pages/functions/bindings/), [streaming](https://developers.cloudflare.com/workers/runtime-apis/streams/).
