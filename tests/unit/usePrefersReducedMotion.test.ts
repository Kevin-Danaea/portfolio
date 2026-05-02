import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

interface FakeMQ {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  _trigger: (matches: boolean) => void
}

function makeMQ(initial: boolean): FakeMQ {
  let listener: ((e: { matches: boolean }) => void) | null = null
  return {
    matches: initial,
    addEventListener: vi.fn((_evt: string, cb: (e: { matches: boolean }) => void) => {
      listener = cb
    }),
    removeEventListener: vi.fn(),
    _trigger(next: boolean) {
      this.matches = next
      listener?.({ matches: next })
    },
  }
}

describe('usePrefersReducedMotion', () => {
  let mq: FakeMQ
  beforeEach(() => {
    mq = makeMQ(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn(() => mq),
    })
  })
  afterEach(() => vi.restoreAllMocks())

  function probe() {
    let exposed!: ReturnType<typeof usePrefersReducedMotion>
    const Probe = defineComponent({
      setup() {
        exposed = usePrefersReducedMotion()
        return () => h('div')
      },
    })
    const w = mount(Probe)
    return { w, get: () => exposed.value }
  }

  it('reflects the initial OS preference on mount', () => {
    mq = makeMQ(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn(() => mq),
    })
    const { get } = probe()
    expect(get()).toBe(true)
  })

  it('updates reactively when the media query flips', async () => {
    const { get } = probe()
    expect(get()).toBe(false)
    mq._trigger(true)
    await nextTick()
    expect(get()).toBe(true)
  })

  it('removes its listener on unmount', () => {
    const { w } = probe()
    w.unmount()
    expect(mq.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
