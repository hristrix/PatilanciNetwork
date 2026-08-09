<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'star' | 'x' | 'dot' | 'arrow' | 'crown' | 'brush'
    color?: 'red' | 'gold' | 'cream'
    size?: number
    float?: boolean
  }>(),
  { type: 'star', color: 'gold', size: 24, float: false },
)

const colorClass: Record<string, string> = {
  red: 'text-red',
  gold: 'text-gold',
  cream: 'text-cream',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :class="[colorClass[color], float ? 'doodle-float' : '']"
    aria-hidden="true"
  >
    <path
      v-if="type === 'star'"
      d="M12 2l2.2 6.2L20.5 9l-5 4.2L17 20l-5-3.6L7 20l1.5-6.8-5-4.2 6.3-.8L12 2z"
      fill="currentColor"
    />
    <path
      v-else-if="type === 'x'"
      d="M5 5l14 14M19 5L5 19"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle v-else-if="type === 'dot'" cx="12" cy="12" r="5" fill="currentColor" />
    <path
      v-else-if="type === 'arrow'"
      d="M3 12h15M13 6l6 6-6 6"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else-if="type === 'crown'"
      d="M3 18h18l-1.5-9-4 3.5L12 6l-3.5 6.5-4-3.5L3 18z"
      fill="currentColor"
    />
    <path
      v-else
      d="M2 20c4-2 6-8 8-12 1.5-3 4-6 8-6-2 4-4 7-6 9-3 3-6 8-10 9z"
      fill="currentColor"
    />
  </svg>
</template>
