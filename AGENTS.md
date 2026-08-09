# AGENTS.md / Claude Prompt — Патиланци Landing Page

Create a complete, production-ready landing page for a Bulgarian gaming community called **Патиланци**.

The website must be built with:

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- Vue Router
- Lucide icons
- Clean reusable Vue components
- Responsive mobile-first layout

Do not use Nuxt.

The project must run with:

```bash
npm install
npm run dev
npm run build
```

The final result must feel handcrafted, playful, modern, and community-driven.

Avoid the common AI-generated gaming website look.

Do not use:

- excessive neon glows
- futuristic sci-fi HUD elements
- random glassmorphism cards everywhere
- generic esports shields
- fake statistics
- unnecessary 3D effects
- overly corporate language
- large blocks of empty marketing text

The design should feel like a real Bulgarian gaming community made by a group of friends.

---

# Brand

## Name

**Патиланци**

## Domain

**patilanci.gg**

## Community idea

Патиланци is a private Bulgarian community of friends who:

- play different games together
- create videos and streams
- record podcasts
- organize gaming nights
- share memes
- talk and have fun
- occasionally create Minecraft content
- are not limited to one game

The community is inspired by the playful Bulgarian meaning of “патиланци”: a group of friends who often get into funny situations and adventures together.

The website must not copy illustrations or characters from the classic book by Ran Bosilek.

The brand should only use the general ideas of:

- friendship
- fun
- playful chaos
- adventures
- Bulgarian community spirit

---

# Target audience

Bulgarian gamers and creators aged approximately 16–35.

The main website language must be Bulgarian.

Use natural Bulgarian wording.

Avoid jargon, corporate language, exaggerated marketing claims, and phrases that sound translated from English.

The tone should feel warm, funny, friendly, and human.

---

# Visual direction

Use a bold, flat, graphic style.

The identity should feel inspired by:

- gaming stickers
- hand-drawn doodles
- blocky game avatars
- Discord communities
- YouTube creator groups
- podcast branding
- playful street-style graphics

Do not imitate Minecraft branding directly.

Pixel-style or block-inspired elements may be used subtly.

## Main colors

```text
Background: #0B0B0D
Surface: #151519
Cream: #F4E7CF
Red: #E53935
Gold: #F2B632
Muted text: #A7A7AE
White: #FFFFFF
```

## Typography

Use a strong display font for large headings and a readable sans-serif font for body text.

Recommended Google Fonts:

- Display: Bungee, Anton, Oswald, or Archivo Black
- Body: Inter, Manrope, or Nunito Sans

Do not use more than two font families.

## Graphic details

Use restrained graphic accents such as:

- hand-drawn underlines
- small X marks
- stars
- dots
- arrows
- crowns
- game controller symbols
- microphone symbols
- playful brush strokes

Keep decorations balanced and purposeful.

---

# Site structure

Create the following routes:

```text
/
/about
/creators
/events
/podcast
/contact
```

The homepage should contain previews of the main sections.

---

# Header

Create a sticky header.

Desktop navigation:

- Начало
- За нас
- Създатели
- Събития
- Подкаст
- Контакти

Include:

- Патиланци wordmark or placeholder logo
- Discord button
- mobile menu button
- smooth mobile navigation drawer

Primary CTA:

```text
Поискай покана
```

The header should become slightly more solid when the user scrolls.

Do not make it excessively transparent.

---

# Hero section

Create a bold hero section with strong Bulgarian copy.

Suggested headline:

```text
Игри, истории и малко бели.
```

Suggested supporting text:

```text
Патиланци е българска общност от приятели, които играят, създават съдържание, записват подкасти и най-вече се забавляват заедно.
```

Primary button:

```text
Поискай покана
```

Secondary button:

```text
Разгледай общността
```

Include a playful visual composition on the right side using:

- block-style avatar placeholders
- controller
- microphone
- chat bubbles
- doodles
- crown accent

Do not use generic stock photography.

The visual must be made from CSS, SVG placeholders, or local asset placeholders.

Add a small label such as:

```text
Българска gaming общност
```

---

# Community section

Title:

```text
Повече от един сървър
```

Explain that the community is not limited to Minecraft or one specific game.

Create cards for:

## Играем заедно

Text:

```text
От Minecraft и survival игри до co-op, horror, shooters и каквото ни е интересно тази седмица.
```

## Създаваме съдържание

Text:

```text
Видеа, стриймове, кратки клипове, забавни моменти и общи проекти.
```

## Записваме подкасти

Text:

```text
Разговори за игри, интернет, технологии и историите, които ни се случват.
```

## Правим събития

Text:

```text
Gaming вечери, турнири, предизвикателства и специални общностни събирания.
```

Use Lucide icons.

---

# About preview section

Title:

```text
Кои са Патиланци?
```

Suggested copy:

```text
Не сме esports организация и не се опитваме да изглеждаме като такава.

Ние сме компания от хора, които обичат да играят, да създават неща и да се смеят на собствените си провали.

Името Патиланци ни пасва, защото почти винаги някой прави беля, обърква плана или превръща нормалната gaming вечер в история, която после разказваме с месеци.
```

Add a link:

```text
Научи повече за нас
```

---

# Featured games section

Title:

```text
Какво играем?
```

Show editable game cards.

Use placeholder games such as:

- Minecraft
- GTA V
- Counter-Strike 2
- Valorant
- Rust
- Lethal Company
- Party games
- Horror games

Do not use copyrighted game artwork.

Use abstract local placeholders with gradients, icons, blocks, textures, or simple SVG compositions.

Each card should include:

- game name
- small category
- short line
- optional active badge

Example:

```text
Minecraft
Строим, оцеляваме и понякога взривяваме неща, които не трябва.
```

---

# Creator section

Title:

```text
Хората зад хаоса
```

Create profile cards for community creators.

Each card should support:

- avatar
- display name
- role
- short bio
- YouTube
- Twitch
- TikTok
- Instagram

Create sample placeholder profiles but clearly isolate the data in a TypeScript file so it can easily be replaced later.

Suggested roles:

- Създател
- Стриймър
- Подкаст водещ
- Видео редактор
- Разработчик
- Community host

Add button:

```text
Виж всички Патиланци
```

---

# Podcast section

Title:

```text
Патилански разговори
```

Suggested text:

```text
Понякога говорим за игри. Понякога за технологии. Понякога започваме с една тема и след пет минути вече никой не знае как стигнахме дотам.
```

Include:

- latest episode card
- episode number
- title
- duration
- publish date
- play button
- Spotify button
- YouTube button

Use placeholder content.

Do not implement real audio streaming unless a local sample file exists.

---

# Events section

Title:

```text
Какво предстои?
```

Create event cards with:

- date
- title
- game
- time
- short description
- Discord CTA

Sample events:

```text
Minecraft Community Night
Петък, 20:00
```

```text
Horror Game Night
Събота, 21:30
```

```text
Патилански подкаст на живо
Неделя, 19:00
```

Clearly mark sample data.

Store event data in a separate TypeScript file.

---

# Community highlights

Create a horizontal or grid section showing:

- Забавни моменти
- Клипове
- Мемета
- Победи
- Провали
- Подкаст откъси

Use visual placeholders with play buttons and short Bulgarian captions.

Do not use fake YouTube embeds.

Make the cards easy to replace with real thumbnails and links.

---

# Discord CTA section

Create a strong final CTA section.

Headline:

```text
Готов ли си за следващата беля?
```

Text:

```text
Поискай покана, представи се и намери хора за следващата игра.
```

Button:

```text
Поискай покана за Патиланци
```

Add a small note:

```text
Българска общност. Истински хора. Различни игри.
```

---

# Footer

Include:

- Патиланци logo or wordmark
- short description
- Discord
- YouTube
- Twitch
- TikTok
- Instagram
- navigation links
- contact email placeholder
- privacy link
- terms link

Footer copy:

```text
Патиланци е българска gaming и creator общност.
```

Copyright:

```text
© 2026 Патиланци. Всички права запазени.
```

Add:

```text
patilanci.gg
```

---

# Additional pages

## About page

Explain:

- how the community started
- what Патиланци means to the group
- the community values
- that all games and creators are welcome
- that friendship and respect matter more than skill

Create sections:

- Нашата история
- Какво правим
- Какви хора търсим
- Нашите правила

## Creators page

Create a searchable/filterable creator directory.

Filters:

- Видео
- Стрийм
- Подкаст
- Разработка
- Дизайн
- Community

## Events page

Create:

- upcoming events
- past events
- event status badges
- responsive cards

## Podcast page

Create:

- featured latest episode
- episode list
- platform links
- guest cards

## Contact page

Create a styled contact form with:

- Име
- Имейл
- Причина за контакт
- Съобщение

Reasons:

- Искам да се присъединя
- Партньорство
- Подкаст участие
- Събитие
- Технически проблем
- Друго

Include client-side validation.

Do not connect to a real backend.

Show a friendly success state.

---

# Components

Create reusable components such as:

```text
AppHeader.vue
AppFooter.vue
HeroSection.vue
SectionTitle.vue
CommunityCard.vue
CreatorCard.vue
GameCard.vue
EventCard.vue
PodcastCard.vue
SocialLinks.vue
DiscordButton.vue
DoodleAccent.vue
MobileNavigation.vue
```

Keep components focused and readable.

Avoid putting the entire website inside one Vue file.

---

# Data structure

Create data files under:

```text
src/data/
```

Suggested files:

```text
creators.ts
events.ts
games.ts
podcasts.ts
navigation.ts
socials.ts
```

Use typed interfaces.

Example:

```ts
export interface Creator {
  id: number
  name: string
  role: string
  bio: string
  avatar: string
  platforms: {
    youtube?: string
    twitch?: string
    tiktok?: string
    instagram?: string
  }
}
```

---

# Styling requirements

- Fully responsive
- Mobile-first
- No horizontal overflow
- Good spacing and hierarchy
- Accessible color contrast
- Visible focus states
- Buttons must have hover and active states
- Respect reduced-motion preferences
- Use transitions carefully
- Avoid excessive animation
- Avoid giant sections with too much empty space
- Keep text widths readable
- Use semantic HTML

Use Tailwind utility classes.

Create only a small amount of custom CSS where Tailwind is not sufficient.

---

# Animation

Use subtle animations only:

- fade-up on section entry
- small hover lift on cards
- button press feedback
- gentle movement for doodles
- slight stagger for creator cards

Do not use large parallax scenes.

Do not install an animation library unless necessary.

Prefer native CSS and IntersectionObserver.

---

# SEO

Add:

- page titles
- meta descriptions
- Open Graph tags
- favicon placeholder
- canonical URL using `https://patilanci.gg`
- Bulgarian language metadata
- sitemap placeholder
- robots.txt

Homepage title:

```text
Патиланци — Българска gaming и creator общност
```

Meta description:

```text
Патиланци е българска общност за игри, видеа, стриймове, подкасти и забавни приключения с приятели.
```

---

# Accessibility

Ensure:

- keyboard navigation
- alt text
- correct heading structure
- aria labels where needed
- accessible mobile navigation
- sufficient contrast
- no important information conveyed by color alone

---

# Project quality

Use:

- ESLint
- Prettier
- TypeScript strict mode
- clear folder structure
- reusable data-driven components
- no unused imports
- no console errors
- no broken links
- no placeholder lorem ipsum

All placeholder text must be meaningful Bulgarian copy.

---

# Required output

Provide the complete project.

Include:

1. Folder structure
2. All source files
3. Tailwind configuration
4. Vite configuration
5. Router setup
6. Reusable components
7. Sample data
8. Bulgarian page content
9. README with setup instructions
10. Production build instructions
11. Instructions showing where to replace:
   - Discord invite
   - social links
   - creator profiles
   - event data
   - podcast links
   - images
   - domain metadata

The README must include:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Do not return partial snippets.

Create the full working project with every required file.


---

# Community access

**Important:** Патиланци is an **invite-only** Bulgarian gaming and creator community.

This is **not** a public Discord server.

The website should communicate that membership is by invitation and personal recommendation, while remaining welcoming.

Do NOT use wording such as:

- "Join now"
- "Become a member instantly"
- "Open community"

Instead, use language such as:

- "Само с покана"
- "Достъп само за поканени"
- "По покана от член на общността"
- "Кандидатствай за покана" (optional)
- "Поискай покана"

The Discord CTA should become:

Primary:
- "Поискай покана"

Secondary:
- "Научи повече"

The website should create the feeling of joining a close group of friends rather than a large public server.

Emphasize quality over quantity.
