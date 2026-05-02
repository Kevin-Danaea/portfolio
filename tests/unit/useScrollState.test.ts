import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useScrollState } from '~/composables/useScrollState'

describe('useScrollState', () => {
  let scrollY = 0
  beforeEach(() => {
    scrollY = 0
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => scrollY,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function mountWith(threshold: number) {
    let exposed!: ReturnType<typeof useScrollState>
    const Probe = defineComponent({
      setup() {
        exposed = useScrollState(threshold)
        return () => h('div', { 'data-scrolled': exposed.value })
      },
    })
    const wrapper = mount(Probe)
    return { wrapper, getScrolled: () => exposed.value }
  }

  it('starts false when window.scrollY is below the threshold', () => {
    const { getScrolled } = mountWith(40)
    expect(getScrolled()).toBe(false)
  })

  it('flips to true once scroll crosses the threshold', async () => {
    const { getScrolled } = mountWith(40)
    scrollY = 50
    window.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(getScrolled()).toBe(true)
  })

  it('flips back to false when scroll drops back below the threshold', async () => {
    const { getScrolled } = mountWith(40)
    scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(getScrolled()).toBe(true)

    scrollY = 10
    window.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(getScrolled()).toBe(false)
  })

  it('removes its scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { wrapper } = mountWith(40)
    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
