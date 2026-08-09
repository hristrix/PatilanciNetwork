<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    align?: 'left' | 'center'
  }>(),
  { align: 'left', eyebrow: undefined },
)
</script>

<template>
  <div v-fade :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">
      {{ eyebrow }}
    </p>
    <h2 class="relative inline-block text-3xl leading-tight text-cream sm:text-4xl">
      {{ title }}
      <svg
        class="absolute -bottom-2 left-0 h-2 w-full text-red"
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 7C40 2 100 2 198 6"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </h2>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
