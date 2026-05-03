/**
 * Reactive HH:MM:SS UTC clock.
 *
 * SSR/CSR hydration safety: the server renders a static placeholder
 * (`--:--:-- UTC`) and the client first-render renders the same
 * placeholder, so hydration matches with zero diff. We then update
 * to the real time on mount and tick every second.
 */
import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

const PLACEHOLDER = '--:--:-- UTC'

function format(d: Date): string {
  return d.toISOString().substring(11, 19) + ' UTC'
}

export function useUtcClock(): Readonly<Ref<string>> {
  const now = ref(PLACEHOLDER)
  let id: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    now.value = format(new Date())
    id = setInterval(() => {
      now.value = format(new Date())
    }, 1000)
  })

  onBeforeUnmount(() => {
    if (id !== null) clearInterval(id)
  })

  return readonly(now)
}
