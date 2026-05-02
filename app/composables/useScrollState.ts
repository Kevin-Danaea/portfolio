/**
 * Reactive boolean that tracks whether window.scrollY has crossed a threshold.
 * Listens passively (no scroll-handler perf impact) and cleans itself up on
 * unmount. SSR-safe: returns `false` until the component mounts.
 *
 *   const scrolled = useScrollState(40)  // true after scrolling past 40px
 */
import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

export function useScrollState(threshold = 40): Readonly<Ref<boolean>> {
  const scrolled = ref(false)

  function update(): void {
    scrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', update)
  })

  return readonly(scrolled)
}
