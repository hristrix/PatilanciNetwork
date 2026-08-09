<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@lucide/vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CreatorCard from '@/components/CreatorCard.vue'
import { creators, type CreatorCategory } from '@/data/creators'

const filters: { label: string; value: CreatorCategory | 'all' }[] = [
  { label: 'Всички', value: 'all' },
  { label: 'Видео', value: 'video' },
  { label: 'Стрийм', value: 'stream' },
  { label: 'Разработка', value: 'dev' },
  { label: 'Дизайн', value: 'design' },
  { label: 'Общност', value: 'community' },
]

const activeFilter = ref<CreatorCategory | 'all'>('all')
const query = ref('')

const filtered = computed(() => {
  return creators.filter((creator) => {
    const matchesFilter = activeFilter.value === 'all' || creator.category === activeFilter.value
    const matchesQuery =
      query.value.trim().length === 0 ||
      creator.name.toLowerCase().includes(query.value.trim().toLowerCase()) ||
      creator.role.toLowerCase().includes(query.value.trim().toLowerCase())
    return matchesFilter && matchesQuery
  })
})
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Общността" title="Хората зад Patilanci Gaming" />
    <p v-fade class="mt-3 max-w-2xl text-muted">
      Създатели, стриймъри и хората, които държат всичко да работи зад кадър.
    </p>

    <div v-fade="1" class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative w-full sm:max-w-xs">
        <Search
          class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          v-model="query"
          type="search"
          placeholder="Търси по име или роля..."
          aria-label="Търси създатели"
          class="w-full rounded-xl border border-white/10 bg-surface py-3 pl-10 pr-4 text-sm text-cream placeholder:text-muted focus:border-gold/60"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          :aria-pressed="activeFilter === filter.value"
          :class="[
            'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors',
            activeFilter === filter.value
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-white/10 text-muted hover:border-white/30 hover:text-cream',
          ]"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div v-if="filtered.length" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <CreatorCard
        v-for="(creator, i) in filtered"
        :key="creator.id"
        :creator="creator"
        :delay="i % 4"
      />
    </div>
    <p v-else v-fade class="mt-16 text-center text-muted">
      Няма създатели, които да отговарят на търсенето. Пробвай друга дума или филтър.
    </p>
  </section>
</template>
