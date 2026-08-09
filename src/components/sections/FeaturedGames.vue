<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import GameCard from '@/components/GameCard.vue'
import { games } from '@/data/games'
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Ротация" title="Какво играем?" />

    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <GameCard v-for="(game, i) in games" :key="game.id" :game="game" :delay="i % 4" />
    </div>
  </section>
</template>
