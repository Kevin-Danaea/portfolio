import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '~/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders a <button> by default with the primary variant', () => {
    const w = mount(BaseButton, { slots: { default: 'Click' } })
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.text()).toBe('Click')
    expect(w.classes()).toContain('base-btn')
    expect(w.classes()).toContain('base-btn--primary')
    expect(w.attributes('type')).toBe('button')
  })

  it('renders an <a> when href is provided', () => {
    const w = mount(BaseButton, {
      props: { href: '#contact' },
      slots: { default: 'Get in touch' },
    })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('#contact')
  })

  it('applies the ghost variant class', () => {
    const w = mount(BaseButton, {
      props: { variant: 'ghost' },
      slots: { default: 'Download CV' },
    })
    expect(w.classes()).toContain('base-btn--ghost')
    expect(w.classes()).not.toContain('base-btn--primary')
  })

  it('renders icon slot only when provided', () => {
    const without = mount(BaseButton, { slots: { default: 'Plain' } })
    expect(without.find('.base-btn__icon').exists()).toBe(false)

    const withIcon = mount(BaseButton, {
      slots: { default: 'With arrow', icon: '→' },
    })
    expect(withIcon.find('.base-btn__icon').exists()).toBe(true)
    expect(withIcon.find('.base-btn__icon').text()).toBe('→')
  })

  it('auto-sets rel=noopener when target=_blank and no rel provided', () => {
    const w = mount(BaseButton, {
      props: { href: 'https://example.com', target: '_blank' },
      slots: { default: 'External' },
    })
    expect(w.attributes('rel')).toBe('noopener')
  })

  it('preserves the same contract across variants (Liskov)', () => {
    const primary = mount(BaseButton, {
      props: { variant: 'primary' },
      slots: { default: 'A' },
    })
    const ghost = mount(BaseButton, {
      props: { variant: 'ghost' },
      slots: { default: 'A' },
    })
    // Same element, same slot rendering, same accessible label.
    expect(primary.element.tagName).toBe(ghost.element.tagName)
    expect(primary.text()).toBe(ghost.text())
  })
})
