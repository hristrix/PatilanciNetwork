<script setup lang="ts">
import SocialIcon from '@/components/SocialIcon.vue'
import { socialLinks } from '@/data/socials'

withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' })
</script>

<template>
  <ul class="flex items-center gap-3">
    <li v-for="social in socialLinks" :key="social.id">
      <a
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.label"
        :class="[
          'flex items-center justify-center rounded-full border border-white/10 bg-surface text-cream/80 hover:border-gold/60 hover:text-gold',
          size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        ]"
      >
        <SocialIcon :icon="social.icon" :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'" />
      </a>
    </li>
  </ul>
</template>
