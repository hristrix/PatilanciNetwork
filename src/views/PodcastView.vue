<script setup lang="ts">
import { MicVocal, Hammer } from '@lucide/vue'
import DoodleAccent from '@/components/DoodleAccent.vue'
import DiscordButton from '@/components/DiscordButton.vue'
</script>

<template>
  <section
    class="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center"
  >
    <div v-fade class="relative">
      <DoodleAccent type="star" color="gold" :size="20" float class="absolute -left-6 -top-6" />
      <DoodleAccent type="dot" color="red" :size="14" float class="absolute -right-5 -bottom-2" />
      <span
        class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-surface px-4 py-1.5 text-xs font-semibold tracking-wide text-gold uppercase"
      >
        <Hammer class="h-3.5 w-3.5" />
        В разработка
      </span>
    </div>

    <div v-fade="1" class="mt-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red/15">
      <MicVocal class="h-10 w-10 text-red" />
    </div>

    <h1 v-fade="2" class="mt-6 text-4xl text-cream sm:text-5xl">Подкастът идва скоро :)</h1>
    <p v-fade="3" class="mt-4 max-w-xl text-muted">
      Записваме, монтираме и се смеем на собствените си шеги зад кулисите. Подкастът на Патиланци е
      в активна разработка — първият епизод ще излезе, когато е готов, не по-рано.
    </p>

    <div v-fade="4" class="mt-8 flex flex-col items-center gap-3 sm:flex-row">
      <DiscordButton label="Последвай в Discord за новини" size="md" />
    </div>
  </section>
</template>
