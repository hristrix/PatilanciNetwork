<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CircleCheckBig } from '@lucide/vue'
import SectionTitle from '@/components/SectionTitle.vue'

const reasons = [
  'Искам покана',
  'Партньорство',
  'Съвместен стрийм',
  'Събитие',
  'Технически проблем',
  'Друго',
]

interface ContactForm {
  name: string
  email: string
  reason: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  reason: '',
  message: '',
})

const errors = reactive<Partial<Record<keyof ContactForm, string>>>({})
const submitted = ref(false)

function validate(): boolean {
  errors.name = form.name.trim().length < 2 ? 'Въведи име (поне 2 символа).' : undefined
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? undefined
    : 'Въведи валиден имейл адрес.'
  errors.reason = form.reason ? undefined : 'Избери причина за контакт.'
  errors.message =
    form.message.trim().length < 10 ? 'Съобщението трябва да е поне 10 символа.' : undefined

  return !errors.name && !errors.email && !errors.reason && !errors.message
}

function handleSubmit() {
  if (!validate()) return
  // No real backend — this only simulates a successful submission.
  submitted.value = true
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.reason = ''
  form.message = ''
  errors.name = undefined
  errors.email = undefined
  errors.reason = undefined
  errors.message = undefined
  submitted.value = false
}
</script>

<template>
  <section class="container-page py-16 sm:py-20">
    <SectionTitle eyebrow="Контакти" title="Свържи се с нас" />
    <p v-fade class="mt-3 max-w-2xl text-muted">
      Имаш въпрос, идея или просто искаш да ни кажеш здравей? Пиши ни — четем всичко.
    </p>

    <div v-fade="1" class="mt-10 max-w-xl">
      <div
        v-if="submitted"
        class="flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-surface p-10 text-center"
      >
        <CircleCheckBig class="h-12 w-12 text-gold" />
        <h2 class="text-2xl text-cream">Съобщението е изпратено!</h2>
        <p class="text-muted">
          Благодарим ти, {{ form.name || 'приятелю' }}. Ще ти отговорим възможно най-скоро.
        </p>
        <button
          type="button"
          class="mt-2 rounded-xl border-2 border-cream/20 px-5 py-3 font-display text-sm text-cream hover:border-gold hover:text-gold"
          @click="resetForm"
        >
          Изпрати друго съобщение
        </button>
      </div>

      <form v-else novalidate class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="mb-2 block text-sm font-semibold text-cream">Име</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :aria-invalid="!!errors.name"
            aria-describedby="name-error"
            class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted focus:border-gold/60"
            placeholder="Твоето име"
          />
          <p v-if="errors.name" id="name-error" class="mt-1.5 text-xs text-red">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label for="email" class="mb-2 block text-sm font-semibold text-cream">Имейл</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :aria-invalid="!!errors.email"
            aria-describedby="email-error"
            class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted focus:border-gold/60"
            placeholder="you@example.com"
          />
          <p v-if="errors.email" id="email-error" class="mt-1.5 text-xs text-red">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="reason" class="mb-2 block text-sm font-semibold text-cream">
            Причина за контакт
          </label>
          <select
            id="reason"
            v-model="form.reason"
            :aria-invalid="!!errors.reason"
            aria-describedby="reason-error"
            class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-cream focus:border-gold/60"
          >
            <option value="" disabled>Избери причина</option>
            <option v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</option>
          </select>
          <p v-if="errors.reason" id="reason-error" class="mt-1.5 text-xs text-red">
            {{ errors.reason }}
          </p>
        </div>

        <div>
          <label for="message" class="mb-2 block text-sm font-semibold text-cream">Съобщение</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            :aria-invalid="!!errors.message"
            aria-describedby="message-error"
            class="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted focus:border-gold/60"
            placeholder="Разкажи ни за какво става дума..."
          />
          <p v-if="errors.message" id="message-error" class="mt-1.5 text-xs text-red">
            {{ errors.message }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-red px-6 py-3.5 font-display text-sm text-white shadow-[0_4px_0_0_#9c1f1c] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#9c1f1c] active:translate-y-0.5 active:shadow-[0_1px_0_0_#9c1f1c] sm:text-base"
        >
          Изпрати съобщение
        </button>
      </form>
    </div>
  </section>
</template>
