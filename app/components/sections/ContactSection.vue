<script setup lang="ts">
import type { ContactLink } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const links = computed<ContactLink[]>(() => {
  const raw = tm('contact.links') as unknown[]
  return raw.map((it) => {
    const obj = it as Record<string, unknown>
    return {
      label: rt(obj.label as string),
      url: rt(obj.url as string),
      handle: rt(obj.handle as string),
    }
  })
})

const ctaEmail = computed(() => t('contact.cta'))

// Magnetic radial highlight follows the pointer over the CTA.
const ctaRef = ref<HTMLAnchorElement | null>(null)
function onMove(e: MouseEvent) {
  const el = ctaRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}
</script>

<template>
  <section id="contact" class="section section--contact">
    <SectionHeading :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" />
    <p class="contact__sub">{{ t('contact.sub') }}</p>

    <a
      ref="ctaRef"
      class="contact__cta"
      :href="`mailto:${ctaEmail}`"
      @mousemove="onMove"
    >
      <div class="contact__cta-label mono">{{ t('contact.ctaLabel') }} →</div>
      <div class="contact__cta-email">{{ ctaEmail }}</div>
    </a>

    <div class="contact__links">
      <a
        v-for="l in links"
        :key="l.label"
        class="contact__link"
        :href="l.url"
        target="_blank"
        rel="noopener"
      >
        <div class="contact__link-label mono">→ {{ l.label }}</div>
        <div class="contact__link-handle">{{ l.handle }}</div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  max-width: var(--shell-max);
  margin: 0 auto;
  padding: var(--section-pad-y) var(--shell-pad-x);
}

.section--contact {
  padding-top: 120px;
  padding-bottom: 80px;
  border-top: 1px solid var(--color-line);
}

@media (max-width: 700px) {
  .section {
    padding: var(--section-pad-y-sm) var(--shell-pad-x-sm);
  }
}

.contact__sub {
  margin: 0 0 48px;
  max-width: 60ch;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  line-height: 1.4;
  color: var(--color-fg-dim);
}

.contact__cta {
  position: relative;
  display: block;
  overflow: hidden;
  margin-bottom: 32px;
  padding: 32px;
  border: 1px solid var(--color-line-strong);
  border-radius: 8px;
  background: var(--color-paper);
  transition: border-color var(--dur-slow) var(--ease-out);
}

.contact__cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at var(--mx, 50%) var(--my, 50%),
    rgb(232 160 107 / 0.12),
    transparent 60%
  );
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}

.contact__cta:hover {
  border-color: var(--color-accent);
}

.contact__cta:hover::before {
  opacity: 1;
}

.contact__cta-label {
  position: relative;
  margin-bottom: 12px;
  color: var(--color-accent);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact__cta-email {
  position: relative;
  font-family: var(--font-serif);
  font-size: clamp(28px, 5vw, 56px);
  line-height: 1;
  color: var(--color-fg);
}

.contact__links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1px;
  border: 1px solid var(--color-line);
  background: var(--color-line);
}

.contact__link {
  padding: 24px;
  background: var(--color-bg);
  transition: background var(--dur-base) var(--ease-out);
}

.contact__link:hover {
  background: var(--color-bg-2);
}

.contact__link-label {
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.contact__link-handle {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--color-fg);
}
</style>
