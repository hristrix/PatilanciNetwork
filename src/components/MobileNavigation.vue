<script setup lang="ts">
import { X } from '@lucide/vue'
import { navLinks } from '@/data/navigation'
import DiscordButton from '@/components/DiscordButton.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="open" class="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        class="absolute inset-0 bg-black/70"
        aria-label="Затвори менюто"
        @click="emit('close')"
      />
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="translate-x-full"
        leave-to-class="translate-x-full"
      >
        <nav
          v-if="open"
          class="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-8 border-l border-white/10 bg-surface px-6 py-6"
          aria-label="Мобилна навигация"
        >
          <div class="flex items-center justify-between">
            <span class="font-display text-lg text-cream">Меню</span>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream hover:text-gold"
              aria-label="Затвори менюто"
              @click="emit('close')"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <ul class="flex flex-col gap-2">
            <li v-for="link in navLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="flex items-center gap-2 rounded-lg px-3 py-3 font-display text-xl text-cream/90 hover:bg-white/5 hover:text-gold"
                active-class="text-gold"
                @click="emit('close')"
              >
                {{ link.label }}
                <span
                  v-if="link.badge"
                  class="rounded-full bg-gold/15 px-2 py-0.5 font-body text-[11px] font-semibold tracking-wide text-gold uppercase"
                >
                  {{ link.badge }}
                </span>
              </RouterLink>
            </li>
          </ul>

          <DiscordButton class="mt-auto w-full justify-center" />
        </nav>
      </Transition>
    </div>
  </Transition>
</template>
