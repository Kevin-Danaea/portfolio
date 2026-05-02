/**
 * Reveal-on-scroll. Watches a target element with IntersectionObserver and
 * flips the returned boolean to true the first time it crosses `threshold`.
 *
 * Honors prefers-reduced-motion: skips the observer entirely and returns
 * `true` immediately so content stays visible without animating in.
 *
 * Usage:
 *   const el = ref<HTMLElement | null>(null)
 *   const isRevealed = useReveal(el)
 *   <section ref="el" :class="{ 'is-in': isRevealed }">
 */
import { onBeforeUnmount, onMounted, readonly, ref, watch, type Ref } from 'vue'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface UseRevealOptions {
  /** 0–1; default 0.08 (matches the prototype). */
  threshold?: number
  /** When true (default) the observer disconnects after first reveal. */
  once?: boolean
}

export function useReveal<T extends Element>(
  target: Ref<T | null>,
  options: UseRevealOptions = {},
): Readonly<Ref<boolean>> {
  const { threshold = 0.08, once = true } = options
  const reduced = usePrefersReducedMotion()
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  function disconnect(): void {
    observer?.disconnect()
    observer = null
  }

  function setup(): void {
    if (reduced.value) {
      isRevealed.value = true
      return
    }
    if (!target.value || typeof IntersectionObserver === 'undefined') return
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          isRevealed.value = true
          if (once) disconnect()
        } else if (!once) {
          isRevealed.value = false
        }
      },
      { threshold },
    )
    observer.observe(target.value)
  }

  onMounted(setup)

  // If reduced-motion turns on after mount, force visible and stop observing.
  watch(reduced, (now) => {
    if (now) {
      isRevealed.value = true
      disconnect()
    }
  })

  onBeforeUnmount(disconnect)

  return readonly(isRevealed)
}
