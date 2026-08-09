import type { Directive } from 'vue'

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      )
    : null

/**
 * v-fade directive: adds [data-fade] and observes the element,
 * toggling .is-visible when it enters the viewport.
 */
export const vFade: Directive<HTMLElement, number | void> = {
  mounted(el, binding) {
    el.setAttribute('data-fade', '')
    if (binding.value) {
      el.setAttribute('data-fade-delay', String(binding.value))
    }
    if (observer) {
      observer.observe(el)
    } else {
      el.classList.add('is-visible')
    }
  },
}
