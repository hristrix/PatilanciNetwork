<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import HighlightCard from '@/components/HighlightCard.vue'
import { highlights } from '@/data/highlights'
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Архив" title="Моменти от общността" />

    <div class="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
      <HighlightCard
        v-for="(highlight, i) in highlights"
        :key="highlight.id"
        :highlight="highlight"
        :delay="i % 4"
      />
    </div>
  </section>
</template>
