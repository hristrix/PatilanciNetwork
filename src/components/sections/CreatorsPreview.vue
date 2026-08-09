<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import CreatorCard from '@/components/CreatorCard.vue'
import { creators } from '@/data/creators'

const featured = creators.slice(0, 4)
</script>

<template>
  <section class="bg-surface py-16 sm:py-20">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Екипът" title="Хората зад Patilanci Gaming" />
        <RouterLink
          to="/creators"
          class="rounded-xl border-2 border-cream/20 px-5 py-3 font-display text-sm text-cream hover:border-gold hover:text-gold"
        >
          Виж всички Патиланци
        </RouterLink>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CreatorCard
          v-for="(creator, i) in featured"
          :key="creator.id"
          :creator="creator"
          :delay="i % 4"
        />
      </div>
    </div>
  </section>
</template>
