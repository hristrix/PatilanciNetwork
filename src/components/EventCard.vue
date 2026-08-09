<script setup lang="ts">
import type { CommunityEvent } from '@/data/events'
import { CalendarDays, Clock, Gamepad2 } from '@lucide/vue'
import DiscordButton from '@/components/DiscordButton.vue'

withDefaults(defineProps<{ event: CommunityEvent; delay?: number }>(), { delay: 0 })
</script>

<template>
  <div
    v-fade="delay"
    class="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_0_30px_-8px_rgba(242,182,50,0.35)]"
  >
    <div class="flex items-center justify-between">
      <span
        :class="[
          'rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase transition-transform duration-300 group-hover:scale-105',
          event.status === 'upcoming' ? 'bg-red/20 text-red' : 'bg-white/10 text-muted',
        ]"
      >
        {{ event.status === 'upcoming' ? 'Предстои' : 'Минало' }}
      </span>
      <span class="flex items-center gap-1.5 text-xs text-muted">
        <Gamepad2 class="h-3.5 w-3.5" />
        {{ event.game }}
      </span>
    </div>

    <h3 class="text-xl text-cream transition-colors duration-300 group-hover:text-gold">
      {{ event.title }}
    </h3>
    <p class="text-sm leading-relaxed text-muted">{{ event.description }}</p>

    <div class="mt-auto flex flex-wrap items-center gap-4 pt-2 text-sm text-cream/80">
      <span class="flex items-center gap-1.5">
        <CalendarDays class="h-4 w-4 text-gold" />
        {{ event.date }}
      </span>
      <span class="flex items-center gap-1.5">
        <Clock class="h-4 w-4 text-gold" />
        {{ event.time }}
      </span>
    </div>

    <DiscordButton
      v-if="event.status === 'upcoming'"
      label="Виж в Discord"
      variant="secondary"
      class="mt-2 w-full"
    />
  </div>
</template>
