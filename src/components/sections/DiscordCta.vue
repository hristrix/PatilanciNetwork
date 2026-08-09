<script setup lang="ts">
import DiscordButton from '@/components/DiscordButton.vue'
import DoodleAccent from '@/components/DoodleAccent.vue'
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <div
      v-fade
      class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red/20 via-surface to-surface px-6 py-14 text-center sm:px-12"
    >
      <DoodleAccent
        type="crown"
        color="gold"
        :size="36"
        float
        class="absolute left-8 top-8 hidden sm:block"
      />
      <DoodleAccent
        type="star"
        color="red"
        :size="24"
        float
        class="absolute right-10 top-12 hidden sm:block"
      />
      <DoodleAccent
        type="x"
        color="cream"
        :size="20"
        class="absolute bottom-10 left-14 hidden sm:block"
      />

      <h2 class="mx-auto max-w-xl text-3xl text-cream sm:text-4xl">
        Готов ли си за следващата беля?
      </h2>
      <p class="mx-auto mt-4 max-w-md text-muted">
        Поискай покана, представи се и намери хора за следващата игра.
      </p>

      <div class="mt-8 flex justify-center">
        <DiscordButton label="Поискай покана за Патиланци" size="lg" />
      </div>

      <p class="mt-5 text-xs text-muted">Българска общност. Истински хора. Различни игри.</p>
    </div>
  </section>
</template>
