/**
 * Reactive HH:MM:SS UTC clock that ticks every second on the client.
 * SSR-safe: returns the current snapshot on first render so SSR/CSR
 * markup matches; the interval starts on mount.
 */
import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

function format(d: Date): string {
  return d.toISOString().substring(11, 19) + ' UTC'
}

export function useUtcClock(): Readonly<Ref<string>> {
  const now = ref(format(new Date()))
  let id: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    id = setInterval(() => {
      now.value = format(new Date())
    }, 1000)
  })

  onBeforeUnmount(() => {
    if (id !== null) clearInterval(id)
  })

  return readonly(now)
}
