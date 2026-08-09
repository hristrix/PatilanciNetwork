<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import DoodleAccent from '@/components/DoodleAccent.vue'

const paragraphs = [
  'Не сме esports организация и не се опитваме да изглеждаме като такава.',
  'Ние сме компания от приятели, които обичат да играят, да създават неща и да се смеят на собствените си провали.',
  'Името Патиланци ни пасва, защото почти винаги някой прави беля, обърква плана или превръща нормалната gaming вечер в история, която после разказваме с месеци.',
]
</script>

<template>
  <section class="bg-surface py-16 sm:py-20">
    <div class="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div v-fade class="relative">
        <DoodleAccent type="star" color="gold" :size="28" float class="absolute -left-2 -top-4" />
        <h2 class="text-3xl text-cream sm:text-4xl">Кои са Патиланци?</h2>
      </div>

      <div v-fade="1" class="space-y-4">
        <p v-for="(p, i) in paragraphs" :key="i" class="leading-relaxed text-muted">
          {{ p }}
        </p>
        <RouterLink
          to="/about"
          class="inline-flex items-center gap-2 pt-2 font-semibold text-gold hover:text-cream"
        >
          Научи повече за нас
          <ArrowRight class="h-4 w-4" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
