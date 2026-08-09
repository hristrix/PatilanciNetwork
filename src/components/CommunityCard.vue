<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    icon: Component
    title: string
    text: string
    delay?: number
  }>(),
  { delay: 0 },
)
</script>

<template>
  <div
    v-fade="delay"
    class="group rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_0_30px_-8px_rgba(242,182,50,0.35)]"
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-red/15 text-red transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gold/15 group-hover:text-gold"
    >
      <component :is="icon" class="h-6 w-6" />
    </div>
    <h3 class="mt-4 text-xl text-cream">{{ title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-muted">{{ text }}</p>
  </div>
</template>
