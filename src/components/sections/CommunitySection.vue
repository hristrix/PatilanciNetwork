<script setup lang="ts">
import { Gamepad2, Video, Radio, PartyPopper } from '@lucide/vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CommunityCard from '@/components/CommunityCard.vue'

const items = [
  {
    icon: Gamepad2,
    title: 'Играем заедно',
    text: 'От Minecraft и survival игри до co-op, horror, shooters и каквото ни е интересно тази седмица.',
  },
  {
    icon: Video,
    title: 'Правим видеа',
    text: 'Клипове, монтажи и забавни моменти, събрани от най-обикновени вечери заедно.',
  },
  {
    icon: Radio,
    title: 'Стриймваме на живо',
    text: 'Гейминг сесии на живо в Twitch, YouTube и TikTok — с чат, който никога не мълчи.',
  },
  {
    icon: PartyPopper,
    title: 'Правим събития',
    text: 'Gaming вечери, турнири, предизвикателства и специални общностни събирания.',
  },
]
</script>

<template>
  <section id="community" class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Общността" title="Повече от един сървър" />
    <p v-fade class="mt-3 max-w-2xl text-muted">
      Не сме ограничени само до Minecraft или една игра — Патиланци са за всичко, което играем и
      създаваме заедно.
    </p>

    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <CommunityCard
        v-for="(item, i) in items"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        :text="item.text"
        :delay="i % 4"
      />
    </div>
  </section>
</template>
