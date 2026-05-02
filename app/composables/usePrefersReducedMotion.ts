/**
 * Reactive boolean tracking prefers-reduced-motion.
 * SSR-safe (returns false until mount).
 *
 * Reactive in two senses: it picks up the initial value on mount AND
 * listens for changes (the OS preference can flip mid-session).
 */
import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): Readonly<Ref<boolean>> {
  const reduced = ref(false)
  let mq: MediaQueryList | null = null

  function update(e: MediaQueryListEvent | MediaQueryList): void {
    reduced.value = e.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    mq = window.matchMedia(QUERY)
    update(mq)
    mq.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', update)
  })

  return readonly(reduced)
}
