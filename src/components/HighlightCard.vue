<script setup lang="ts">
import type { Highlight } from '@/data/highlights'
import { Play } from '@lucide/vue'

withDefaults(defineProps<{ highlight: Highlight; delay?: number }>(), { delay: 0 })
</script>

<template>
  <div v-fade="delay" class="group shrink-0 w-64 snap-start">
    <div
      :class="[
        'relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]',
        highlight.gradient,
      ]"
    >
      <span
        class="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110"
      >
        <Play class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
      </span>
      <span
        class="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase backdrop-blur"
      >
        {{ highlight.category }}
      </span>
    </div>
    <p class="mt-3 text-sm leading-snug text-muted transition-colors duration-300 group-hover:text-cream">
      {{ highlight.caption }}
    </p>
  </div>
</template>
