<script setup lang="ts">
import type { Creator } from '@/data/creators'
import SocialIcon from '@/components/SocialIcon.vue'
import MinecraftHead from '@/components/MinecraftHead.vue'

withDefaults(defineProps<{ creator: Creator; delay?: number }>(), { delay: 0 })
</script>

<template>
  <div
    v-fade="delay"
    class="group rounded-2xl border border-white/10 bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_0_30px_-8px_rgba(242,182,50,0.35)]"
  >
    <div
      class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl p-3 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
      :style="{ backgroundColor: creator.avatarColor }"
    >
      <MinecraftHead :variant="creator.id % 2 === 0 ? 'alex' : 'steve'" />
    </div>
    <h3 class="mt-4 text-lg text-cream">{{ creator.name }}</h3>
    <p class="text-sm font-semibold text-gold">{{ creator.role }}</p>
    <p class="mt-2 text-sm leading-relaxed text-muted">{{ creator.bio }}</p>

    <ul class="mt-4 flex items-center justify-center gap-3">
      <li v-if="creator.platforms.youtube">
        <a
          :href="creator.platforms.youtube"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-muted transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-gold"
          aria-label="YouTube"
        >
          <SocialIcon icon="youtube" class="h-5 w-5" />
        </a>
      </li>
      <li v-if="creator.platforms.twitch">
        <a
          :href="creator.platforms.twitch"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-muted transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-gold"
          aria-label="Twitch"
        >
          <SocialIcon icon="twitch" class="h-5 w-5" />
        </a>
      </li>
      <li v-if="creator.platforms.tiktok">
        <a
          :href="creator.platforms.tiktok"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-muted transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-gold"
          aria-label="TikTok"
        >
          <SocialIcon icon="tiktok" class="h-5 w-5" />
        </a>
      </li>
      <li v-if="creator.platforms.instagram">
        <a
          :href="creator.platforms.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-muted transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-gold"
          aria-label="Instagram"
        >
          <SocialIcon icon="instagram" class="h-5 w-5" />
        </a>
      </li>
    </ul>
  </div>
</template>
