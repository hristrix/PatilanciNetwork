<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import EventCard from '@/components/EventCard.vue'
import { events } from '@/data/events'

const tabs = [
  { label: 'Предстоящи', value: 'upcoming' as const },
  { label: 'Минали', value: 'past' as const },
]

const activeTab = ref<'upcoming' | 'past'>('upcoming')

const filtered = computed(() => events.filter((e) => e.status === activeTab.value))
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Календар" title="Какво предстои?" />
    <p v-fade class="mt-3 max-w-2xl text-muted">
      Gaming вечери, турнири и стриймове на живо — пълния и актуален график виждаш в Discord.
    </p>

    <div v-fade="1" class="mt-8 inline-flex rounded-xl border border-white/10 bg-surface p-1">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        :aria-pressed="activeTab === tab.value"
        :class="[
          'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
          activeTab === tab.value ? 'bg-red text-white' : 'text-muted hover:text-cream',
        ]"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="filtered.length" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <EventCard v-for="(event, i) in filtered" :key="event.id" :event="event" :delay="i % 4" />
    </div>
    <p v-else v-fade class="mt-16 text-center text-muted">
      Няма събития в тази категория в момента.
    </p>
  </section>
</template>
