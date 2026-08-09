<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '@lucide/vue'
import { navLinks } from '@/data/navigation'
import { useScrolled } from '@/composables/useScrolled'
import DiscordButton from '@/components/DiscordButton.vue'
import MobileNavigation from '@/components/MobileNavigation.vue'
import logo from '@/assets/logo.svg'

const { isScrolled } = useScrolled()
const menuOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-40 border-b transition-colors duration-300',
      isScrolled
        ? 'border-white/10 bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/90'
        : 'border-transparent bg-bg/70',
    ]"
  >
    <div class="container-page flex items-center justify-between py-3">
      <RouterLink to="/" class="flex items-center gap-2" aria-label="Патиланци — начало">
        <img :src="logo" alt="Патиланци" class="h-11 w-auto sm:h-12" />
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Основна навигация">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-cream/80 transition-colors duration-200 hover:text-gold [&.router-link-active]:text-gold"
        >
          {{ link.label }}
          <span
            v-if="link.badge"
            class="rounded-full bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-gold uppercase"
          >
            {{ link.badge }}
          </span>
          <span
            class="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.router-link-active]:scale-x-100"
            aria-hidden="true"
          />
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <DiscordButton />
      </div>

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-cream md:hidden"
        aria-label="Отвори менюто"
        @click="menuOpen = true"
      >
        <Menu class="h-6 w-6" />
      </button>
    </div>
  </header>

  <MobileNavigation :open="menuOpen" @close="menuOpen = false" />
</template>
