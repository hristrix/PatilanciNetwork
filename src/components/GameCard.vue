<script setup lang="ts">
import type { Game } from '@/data/games'
import { Gamepad2 } from '@lucide/vue'

withDefaults(defineProps<{ game: Game; delay?: number }>(), { delay: 0 })
</script>

<template>
  <div
    v-fade="delay"
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_0_30px_-8px_rgba(242,182,50,0.3)]"
  >
    <div
      :class="[
        'relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br',
        game.gradient,
      ]"
    >
      <Gamepad2
        class="h-10 w-10 text-black/25 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"
      />
      <span
        v-if="game.active"
        class="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur"
      >
        Активна
      </span>
    </div>
    <div class="p-5">
      <p class="text-xs font-semibold tracking-wide text-gold uppercase">{{ game.category }}</p>
      <h3
        class="mt-1 text-lg text-cream transition-colors duration-300 group-hover:text-gold"
      >
        {{ game.name }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">{{ game.line }}</p>
    </div>
  </div>
</template>
