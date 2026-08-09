# Патиланци — Landing Page

Landing page for **Патиланци**, an invite-only Bulgarian gaming and creator
community. Built with Vue 3, Vite, TypeScript, Tailwind CSS, and Vue Router.

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vite
- TypeScript (strict mode)
- Tailwind CSS v4
- Vue Router
- [@lucide/vue](https://lucide.dev) icons
- ESLint + Prettier

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` runs `vue-tsc` for type-checking before bundling with Vite.
`npm run preview` serves the built `dist/` folder locally.

## Other scripts

```bash
npm run lint     # ESLint, with --fix
npm run format   # Prettier, writes to src/
```

## Project structure

```text
src/
  assets/          # logo and other static assets bundled by Vite
  components/      # reusable UI components
    sections/      # homepage section components (Hero, Community, CTA, ...)
  composables/      # useFadeIn (scroll fade-in directive), useScrolled (header state)
  data/            # typed sample content — see "Replacing content" below
  router/          # Vue Router routes + per-page SEO meta
  views/           # one component per route (HomeView, AboutView, ...)
  style.css        # Tailwind import, theme tokens, small amount of custom CSS
public/
  logo.png         # favicon / OG image source
  robots.txt
  sitemap.xml      # placeholder — regenerate with real lastmod dates before launch
```

## Routes

```text
/           Начало
/about      За нас
/creators   Създатели
/events     Събития
/podcast    Подкаст
/contact    Контакти
```

## Replacing placeholder content

Everything below is sample/placeholder data, isolated so it's easy to swap
for the real thing without touching component code.

| What | Where |
| --- | --- |
| Discord invite + social links | `src/data/socials.ts` |
| Creator profiles | `src/data/creators.ts` |
| Event listings | `src/data/events.ts` |
| Podcast episodes | `src/data/podcasts.ts` |
| Featured games | `src/data/games.ts` |
| Community highlight clips | `src/data/highlights.ts` |
| Nav labels/routes | `src/data/navigation.ts` |
| Logo / favicon / OG image | `src/assets/logo.png` and `public/logo.png` |
| Domain-specific metadata (canonical URL, OG tags, sitemap) | `index.html`, `src/router/index.ts`, `public/sitemap.xml`, `public/robots.txt` |
| Contact form destination | `src/views/ContactView.vue` — the form only simulates success client-side; wire `handleSubmit` up to a real backend/API when ready |

All social/creator/podcast URLs currently point to placeholder handles —
search for `example.com`, `your-invite`, and `@patilanci` placeholders across
`src/data/` before launch.

## Notes

- The display font is **Oswald** (not Bungee/Archivo Black/Anton as originally
  suggested) — those don't ship Cyrillic glyphs, which broke Bulgarian
  headings. Oswald has full Cyrillic coverage and was one of the alternatives
  already recommended. Body copy uses **Manrope**.
- Community access is invite-only by design — copy intentionally avoids
  "join now" / "open community" phrasing in favor of "Поискай покана" /
  "Само с покана".
- Animations are IntersectionObserver + CSS only (see `src/composables/useFadeIn.ts`
  and the `v-fade` directive registered in `src/main.ts`), no animation library.
