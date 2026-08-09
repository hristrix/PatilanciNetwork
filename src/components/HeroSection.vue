<script setup lang="ts">
import { ref } from 'vue'
import { Gamepad2, Radio, MessageCircle, Video, Trophy, Sparkles } from '@lucide/vue'
import DiscordButton from '@/components/DiscordButton.vue'
import DoodleAccent from '@/components/DoodleAccent.vue'
import MinecraftHead from '@/components/MinecraftHead.vue'
import { creators } from '@/data/creators'

const onlineNow = creators.slice(0, 6)

const activity = [
  { icon: Gamepad2, text: 'Дичо е в survival лобито' },
  { icon: Video, text: 'Ново видео от Кики' },
  { icon: Radio, text: 'Нея стриймва на живо' },
  { icon: Trophy, text: 'CS2 турнир — петък 20:30' },
  { icon: Sparkles, text: 'Мира качи нови стикери' },
  { icon: MessageCircle, text: 'Оживен чат в #общи' },
]

const goToCommunity = () => {
  document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })
}

const tiltStyle = ref<{ transform?: string }>({})

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const handleTiltMove = (e: PointerEvent) => {
  if (prefersReducedMotion()) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  tiltStyle.value = {
    transform: `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateZ(0)`,
  }
}

const resetTilt = () => {
  tiltStyle.value = { transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' }
}
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="animate-blob-a absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-red/25 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        class="animate-blob-b absolute top-10 right-[4%] h-64 w-64 rounded-full bg-gold/20 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        class="bg-[radial-gradient(circle_at_20%_20%,rgba(229,57,53,0.10),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(242,182,50,0.08),transparent_40%)] absolute inset-0"
      />

      <div
        class="animate-pixel-bob absolute top-[18%] left-[6%] hidden h-4 w-4 rotate-12 rounded-sm bg-gold/50 sm:block"
        style="animation-delay: 0.3s"
      />
      <div
        class="animate-pixel-bob absolute top-[62%] left-[14%] hidden h-3 w-3 -rotate-6 rounded-sm bg-red/50 sm:block"
        style="animation-delay: 1.1s"
      />
      <div
        class="animate-pixel-bob absolute top-[28%] right-[10%] hidden h-3.5 w-3.5 rotate-45 rounded-sm bg-cream/30 lg:block"
        style="animation-delay: 0.7s"
      />
    </div>

    <div
      class="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28"
    >
      <div v-fade>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-semibold tracking-wide text-cream/80 uppercase"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red/60"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-red" />
          </span>
          Българска gaming общност
        </span>

        <h1 class="mt-6 text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
          Игри, истории<br />
          и малко
          <span class="relative">
            <span
              class="animate-gradient-text bg-gradient-to-r from-red via-gold to-red bg-clip-text text-transparent"
            >
              бели.
            </span>
            <DoodleAccent
              type="brush"
              color="gold"
              :size="70"
              float
              class="absolute -right-14 -top-6 hidden sm:block"
            />
          </span>
        </h1>

        <p class="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Патиланци са българска общност от приятели, които играят, снимат видеа, стриймват и
          най-вече се забавляват заедно.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <DiscordButton size="lg" />
          <button
            type="button"
            class="group inline-flex items-center gap-2 rounded-xl border-2 border-cream/20 px-6 py-3.5 font-display text-sm text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:text-base"
            @click="goToCommunity"
          >
            Разгледай общността
            <span
              class="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
              >→</span
            >
          </button>
        </div>

        <p class="mt-6 text-xs text-muted">
          Влизаш само по покана — от някой, който вече е вътре.
        </p>
      </div>

      <div v-fade="1" class="relative mx-auto w-full max-w-md pb-8 lg:max-w-none">
        <div
          class="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-red/10 blur-2xl"
          aria-hidden="true"
        />

        <div
          class="relative rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_0_0_0_rgba(242,182,50,0)] transition-shadow duration-500 will-change-transform hover:shadow-[0_0_45px_-12px_rgba(242,182,50,0.35)] sm:p-8"
          :style="tiltStyle"
          style="transition: transform 0.15s ease-out"
          @pointermove="handleTiltMove"
          @pointerleave="resetTilt"
        >
          <DoodleAccent
            type="crown"
            color="gold"
            :size="36"
            float
            class="absolute -top-4 -right-2 rotate-12"
          />
          <DoodleAccent
            type="x"
            color="cream"
            :size="16"
            class="absolute -bottom-3 -left-3 rotate-12"
          />

          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold tracking-wide text-cream/60 uppercase">Общността сега</p>
            <span class="flex items-center gap-1.5 text-xs text-gold">
              <span class="relative flex h-1.5 w-1.5">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60"
                />
                <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              6 души онлайн
            </span>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-3">
            <div
              v-for="member in onlineNow"
              :key="member.id"
              class="group relative flex aspect-square items-center justify-center rounded-xl p-2 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
              :style="{ backgroundColor: member.avatarColor }"
              :title="member.name"
            >
              <MinecraftHead
                :variant="member.id % 2 === 0 ? 'alex' : 'steve'"
                class="transition-transform duration-300 group-hover:scale-110"
              />
              <span
                class="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-surface bg-gold"
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            class="mt-5 flex items-center gap-3 rounded-2xl bg-bg/60 p-4 transition-colors duration-300 hover:bg-bg/80"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red/20 text-red"
            >
              <Gamepad2 class="h-5 w-5" />
            </span>
            <div class="text-sm">
              <p class="text-cream">Играем заедно тази вечер</p>
              <p class="text-muted">Minecraft · отворено лоби</p>
            </div>
          </div>

          <div
            class="mt-3 flex items-center gap-3 rounded-2xl bg-bg/60 p-4 transition-colors duration-300 hover:bg-bg/80"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold"
            >
              <Radio class="h-5 w-5" />
            </span>
            <div class="text-sm">
              <p class="text-cream">Стриймваме в 20:00</p>
              <p class="text-muted">Minecraft survival · на живо</p>
            </div>
          </div>
        </div>

        <div
          class="relative mx-6 -mt-3 flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-bg px-4 py-3 text-xs text-cream shadow-lg"
        >
          <MessageCircle class="h-4 w-4 shrink-0 text-red" />
          "някой пак изгуби кранчето"
        </div>
      </div>
    </div>

    <div class="relative border-t border-white/5 bg-surface/60 py-3" aria-hidden="true">
      <div class="flex w-max animate-marquee gap-10">
        <div
          v-for="(item, i) in [...activity, ...activity]"
          :key="i"
          class="flex items-center gap-2 whitespace-nowrap text-xs text-cream/70"
        >
          <component :is="item.icon" class="h-3.5 w-3.5 text-gold" />
          {{ item.text }}
        </div>
      </div>
    </div>
  </section>
</template>
