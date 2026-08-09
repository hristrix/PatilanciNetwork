<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'steve' | 'alex' }>(), { variant: 'steve' })

const palettes = {
  steve: { hair: '#6b4423', skin: '#e0a878', eye: '#2b2118', mouth: '#a6673f' },
  alex: { hair: '#d97f3d', skin: '#e6b98f', eye: '#2f4858', mouth: '#a6673f' },
}

// 8x8 pixel-art placeholder face. 0 = transparent, 1 = hair, 2 = skin, 3 = eye, 4 = mouth.
const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 1],
  [2, 2, 3, 2, 2, 3, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 4, 4, 2, 2, 2],
  [1, 2, 4, 4, 4, 4, 2, 1],
  [1, 1, 2, 2, 2, 2, 1, 1],
]

const colorFor = (variant: 'steve' | 'alex', value: number) => {
  const palette = palettes[variant]
  if (value === 1) return palette.hair
  if (value === 2) return palette.skin
  if (value === 3) return palette.eye
  if (value === 4) return palette.mouth
  return 'transparent'
}
</script>

<template>
  <svg
    viewBox="0 0 8 8"
    class="h-full w-full"
    style="image-rendering: pixelated"
    aria-hidden="true"
  >
    <template v-for="(row, y) in grid" :key="y">
      <rect
        v-for="(value, x) in row"
        :key="x"
        :x="x"
        :y="y"
        width="1"
        height="1"
        :fill="colorFor(variant, value)"
      />
    </template>
  </svg>
</template>
