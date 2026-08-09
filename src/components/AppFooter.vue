<script setup lang="ts">
import { navLinks } from '@/data/navigation'
import SocialLinks from '@/components/SocialLinks.vue'
import logo from '@/assets/logo.svg'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10 bg-surface">
    <div class="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div class="sm:col-span-2 lg:col-span-2">
        <img :src="logo" alt="Патиланци" class="h-12 w-auto" />
        <p class="mt-4 max-w-sm text-sm text-muted">
          Патиланци са българска gaming и creator общност.
        </p>
        <SocialLinks size="sm" class="mt-5" />
      </div>

      <div>
        <h3 class="font-display text-sm tracking-wide text-cream uppercase">Навигация</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="link in navLinks" :key="link.path">
            <RouterLink :to="link.path" class="text-sm text-muted hover:text-gold">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-display text-sm tracking-wide text-cream uppercase">Контакт</h3>
        <ul class="mt-4 space-y-2 text-sm text-muted">
          <li>
            <a href="mailto:hello@patilanci.gg" class="hover:text-gold">hello@patilanci.gg</a>
          </li>
          <li>
            <a
              href="https://patilanci.gg"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-gold"
            >
              patilanci.gg
            </a>
          </li>
        </ul>
        <ul class="mt-4 space-y-2 text-sm text-muted">
          <!-- Replace with real /privacy and /terms routes once those pages exist -->
          <li>Поверителност (очаквайте)</li>
          <li>Условия за ползване (очаквайте)</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row"
      >
        <p>© {{ year }} Патиланци. Всички права запазени.</p>
        <p>Само с покана. Истински хора, различни игри.</p>
      </div>
    </div>
  </footer>
</template>
