import { onMounted, onUnmounted, ref } from 'vue'

/** Tracks whether the page has scrolled past a threshold, for header styling. */
export function useScrolled(threshold = 12) {
  const isScrolled = ref(false)

  function onScroll() {
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { isScrolled }
}
