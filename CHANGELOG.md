# Changelog

## 1.0.2 - 2026-10-19

- Fixed launcher metadata requests failing before reaching CurseForge because of an unsupported Cloudflare redirect mode. API redirects remain blocked.

## 1.0.1 - 2026-10-19

- Report safe CurseForge API failure codes and HTTP status when launcher downloads fail, so API access, connection, and invalid-response problems can be distinguished without exposing credentials.
