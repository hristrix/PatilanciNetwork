<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import EventCard from '@/components/EventCard.vue'
import { events } from '@/data/events'

const upcoming = events.filter((e) => e.status === 'upcoming').slice(0, 3)
</script>

<template>
  <section class="bg-surface py-16 sm:py-20">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Календар" title="Какво предстои?" />
        <RouterLink
          to="/events"
          class="rounded-xl border-2 border-cream/20 px-5 py-3 font-display text-sm text-cream hover:border-gold hover:text-gold"
        >
          Всички събития
        </RouterLink>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard v-for="(event, i) in upcoming" :key="event.id" :event="event" :delay="i % 4" />
      </div>
    </div>
  </section>
</template>
