<script setup lang="ts">
import { Users, Heart, Gamepad2 } from '@lucide/vue'
import SectionTitle from '@/components/SectionTitle.vue'
import DoodleAccent from '@/components/DoodleAccent.vue'
import DiscordButton from '@/components/DiscordButton.vue'

const rules = [
  {
    title: 'Уважение преди всичко',
    text: 'Шегуваме се много, но без злоба. Никой не остава сам, ако нещо стане неприятно.',
  },
  {
    title: 'Всички игри са добре дошли',
    text: 'Не се държим само на едно заглавие. Каквото играете, има място в сървъра.',
  },
  {
    title: 'Участваш, колкото искаш',
    text: 'Няма задължителни квоти. Идваш за да се забавляваш, не за да отчиташ активност.',
  },
  {
    title: 'Поканата е лична',
    text: 'Приемаме нови хора чрез препоръка, за да остане общността близка и спокойна.',
  },
]
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <div v-fade class="max-w-2xl">
      <span
        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-semibold tracking-wide text-cream/80 uppercase"
      >
        За нас
      </span>
      <h1 class="mt-5 text-4xl text-cream sm:text-5xl">Кои сме ние, всъщност?</h1>
      <p class="mt-5 leading-relaxed text-muted">
        Патиланци са компания от приятели, обединени от игрите, глупавите вечери и историите, които
        разказваме после с месеци. Не сме организация — сме група хора, които просто харесват да са
        заедно, дори когато плановете се объркат.
      </p>
    </div>
  </section>

  <section class="bg-surface py-16 sm:py-20">
    <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
      <div v-fade class="relative">
        <DoodleAccent type="star" color="gold" :size="24" float class="absolute -left-2 -top-4" />
        <h2 class="text-3xl text-cream sm:text-4xl">Нашата история</h2>
      </div>
      <div v-fade="1" class="space-y-4">
        <p class="leading-relaxed text-muted">
          Всичко започна като малка група приятели, които играеха заедно вечер след работа или
          училище. Нямаше план, нямаше "стратегия за растеж" — просто хора, които искаха повод да се
          съберат онлайн.
        </p>
        <p class="leading-relaxed text-muted">
          С времето към чата се присъединиха още приятели, а после — приятели на приятели. Записахме
          няколко видеа, после направихме първия си стрийм, после организирахме първото си истинско
          събитие. Патиланци пораснаха бавно и естествено, без да спрат да си бъдат същите.
        </p>
      </div>
    </div>
  </section>

  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Всеки ден" title="Какво правим" />
    <div class="mt-10 grid gap-5 sm:grid-cols-3">
      <div v-fade class="rounded-2xl border border-white/10 bg-surface p-6">
        <Gamepad2 class="h-7 w-7 text-red" />
        <h3 class="mt-4 text-lg text-cream">Играем</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          От бързи партии до дълги survival сесии — почти всяка вечер някой събира група.
        </p>
      </div>
      <div v-fade="1" class="rounded-2xl border border-white/10 bg-surface p-6">
        <Users class="h-7 w-7 text-gold" />
        <h3 class="mt-4 text-lg text-cream">Създаваме</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          Видеа, клипове и стриймове се раждат от най-обикновени разговори в чата.
        </p>
      </div>
      <div v-fade="2" class="rounded-2xl border border-white/10 bg-surface p-6">
        <Heart class="h-7 w-7 text-cream" />
        <h3 class="mt-4 text-lg text-cream">Подкрепяме се</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          Успехи, провали, лоши дни — всичко се споделя и никой не остава без "браво" или прегръдка.
        </p>
      </div>
    </div>
  </section>

  <section class="bg-surface py-16 sm:py-20">
    <div class="container-page">
      <SectionTitle eyebrow="Кого търсим" title="Какви хора търсим" />
      <p v-fade class="mt-3 max-w-2xl text-muted">
        Не гледаме умения в игрите — гледаме отношение. Търсим хора, които са забавни, честни и не
        приемат нещата твърде на сериозно.
      </p>
      <ul class="mt-8 grid gap-3 sm:grid-cols-2">
        <li
          v-for="(item, i) in [
            'Обичаш да играеш, независимо какво',
            'Умееш да се смееш на себе си',
            'Уважаваш другите, дори когато губиш',
            'Идваш с добро настроение (или поне се стараеш)',
          ]"
          :key="item"
          v-fade="i % 4"
          class="flex items-start gap-3 rounded-xl border border-white/10 bg-bg px-4 py-3 text-sm text-cream/90"
        >
          <DoodleAccent type="dot" color="red" :size="10" class="mt-1.5 shrink-0" />
          {{ item }}
        </li>
      </ul>
    </div>
  </section>

  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Основите" title="Нашите правила" />
    <div class="mt-10 grid gap-5 sm:grid-cols-2">
      <div
        v-for="(rule, i) in rules"
        :key="rule.title"
        v-fade="i % 4"
        class="rounded-2xl border border-white/10 bg-surface p-6"
      >
        <h3 class="text-lg text-cream">{{ rule.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ rule.text }}</p>
      </div>
    </div>

    <div v-fade class="mt-12 flex flex-col items-center gap-4 text-center">
      <p class="text-muted">Звучи като твоето място?</p>
      <DiscordButton size="lg" />
    </div>
  </section>
</template>
