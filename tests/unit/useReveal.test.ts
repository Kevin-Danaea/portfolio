import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useReveal } from '~/composables/useReveal'

// We control IntersectionObserver via a fake we install per test.
type CB = (entries: { isIntersecting: boolean }[]) => void

interface FakeIO {
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
  fire: (intersecting: boolean) => void
}

function installIO(): { last: () => FakeIO | null } {
  const created: FakeIO[] = []
  class IO {
    cb: CB
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    constructor(cb: CB) {
      this.cb = cb
      created.push(this as unknown as FakeIO)
      ;(this as unknown as FakeIO).fire = (intersecting: boolean) =>
        cb([{ isIntersecting: intersecting }])
    }
  }
  vi.stubGlobal('IntersectionObserver', IO)
  return { last: () => created[created.length - 1] ?? null }
}

function stubMatchMedia(prefersReduced = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn(() => ({
      matches: prefersReduced,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('useReveal', () => {
  beforeEach(() => stubMatchMedia(false))
  afterEach(() => vi.restoreAllMocks())

  function probe() {
    let exposed!: ReturnType<typeof useReveal>
    const Probe = defineComponent({
      setup() {
        const el = ref<HTMLElement | null>(null)
        exposed = useReveal(el)
        return () => h('div', { ref: el, 'data-revealed': exposed.value })
      },
    })
    const w = mount(Probe, { attachTo: document.body })
    return { w, get: () => exposed.value }
  }

  it('starts false before the observer fires', () => {
    installIO()
    const { get } = probe()
    expect(get()).toBe(false)
  })

  it('flips to true when the observer reports an intersection', async () => {
    const io = installIO()
    const { get } = probe()
    io.last()?.fire(true)
    await nextTick()
    expect(get()).toBe(true)
  })

  it('disconnects after first reveal when once=true (default)', async () => {
    const io = installIO()
    const { get } = probe()
    const fake = io.last()
    fake?.fire(true)
    await nextTick()
    expect(get()).toBe(true)
    expect(fake?.disconnect).toHaveBeenCalled()
  })

  it('returns true immediately when prefers-reduced-motion is set, no observer', async () => {
    stubMatchMedia(true)
    installIO()
    const { get } = probe()
    expect(get()).toBe(true)
  })

  it('disconnects on unmount', () => {
    const io = installIO()
    const { w } = probe()
    const fake = io.last()
    w.unmount()
    expect(fake?.disconnect).toHaveBeenCalled()
  })
})
