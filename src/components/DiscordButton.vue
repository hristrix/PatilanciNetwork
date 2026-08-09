<script setup lang="ts">
import SocialIcon from '@/components/SocialIcon.vue'
import { socialLinks } from '@/data/socials'

withDefaults(
  defineProps<{
    label?: string
    variant?: 'primary' | 'secondary'
    size?: 'md' | 'lg'
  }>(),
  { label: 'Поискай покана', variant: 'primary', size: 'md' },
)

const discord = socialLinks.find((s) => s.id === 'discord')!
</script>

<template>
  <a
    :href="discord.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-display tracking-wide transition-transform duration-200 active:scale-95',
      size === 'lg' ? 'px-7 py-4 text-base sm:text-lg' : 'px-5 py-3 text-sm',
      variant === 'primary'
        ? 'bg-red text-white shadow-[0_4px_0_0_#9c1f1c] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#9c1f1c] active:translate-y-0.5 active:shadow-[0_1px_0_0_#9c1f1c]'
        : 'border-2 border-cream/30 bg-transparent text-cream hover:border-gold hover:text-gold',
    ]"
  >
    <span
      class="group-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25"
      aria-hidden="true"
    />
    <SocialIcon
      icon="discord"
      class="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
    />
    {{ label }}
  </a>
</template>
