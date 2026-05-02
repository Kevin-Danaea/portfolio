import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import Eyebrow from '~/components/ui/Eyebrow.vue'

describe('SectionHeading', () => {
  it('renders the title in a single line when no \\n', () => {
    const w = mount(SectionHeading, {
      props: { title: 'The toolkit' },
      global: { components: { Eyebrow } },
    })
    const lines = w.findAll('.section-heading__line')
    expect(lines).toHaveLength(1)
    expect(lines[0]?.text()).toBe('The toolkit')
  })

  it('splits the title into lines on \\n', () => {
    const w = mount(SectionHeading, {
      props: { title: 'Two trajectories,\none observer.' },
      global: { components: { Eyebrow } },
    })
    const lines = w.findAll('.section-heading__line')
    expect(lines).toHaveLength(2)
    expect(lines[0]?.text()).toBe('Two trajectories,')
    expect(lines[1]?.text()).toBe('one observer.')
  })

  it('renders eyebrow only when provided', () => {
    const without = mount(SectionHeading, {
      props: { title: 'X' },
      global: { components: { Eyebrow } },
    })
    expect(without.find('.eyebrow').exists()).toBe(false)

    const withEb = mount(SectionHeading, {
      props: { eyebrow: '// observable_universe', title: 'X' },
      global: { components: { Eyebrow } },
    })
    expect(withEb.find('.eyebrow').exists()).toBe(true)
    expect(withEb.find('.eyebrow').text()).toBe('// observable_universe')
  })

  it('renders sub only when provided', () => {
    const without = mount(SectionHeading, {
      props: { title: 'X' },
      global: { components: { Eyebrow } },
    })
    expect(without.find('.section-heading__sub').exists()).toBe(false)

    const withSub = mount(SectionHeading, {
      props: { title: 'X', sub: 'A short blurb.' },
      global: { components: { Eyebrow } },
    })
    expect(withSub.find('.section-heading__sub').text()).toBe('A short blurb.')
  })
})
