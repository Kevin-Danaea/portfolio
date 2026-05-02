<script setup lang="ts">
import type { FormalEdu, LangEntry } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const formal = computed<FormalEdu[]>(() => {
  const raw = tm('education.formal') as unknown[]
  return raw.map((it) => {
    const obj = it as Record<string, unknown>
    return {
      school: rt(obj.school as string),
      degree: rt(obj.degree as string),
      period: rt(obj.period as string),
      note: rt(obj.note as string),
    }
  })
})

const certs = computed<string[]>(() => {
  const raw = tm('education.certs') as unknown[]
  return raw.map((c) => rt(c as string))
})

const languages = computed<LangEntry[]>(() => {
  const raw = tm('education.languages') as unknown[]
  return raw.map((it) => {
    const obj = it as Record<string, unknown>
    return { lang: rt(obj.lang as string), level: rt(obj.level as string) }
  })
})

const rootEl = ref<HTMLElement | null>(null)
const isRevealed = useReveal(rootEl)
</script>

<template>
  <section
    id="education"
    ref="rootEl"
    class="section reveal"
    :class="{ 'is-in': isRevealed }"
  >
    <SectionHeading :eyebrow="t('education.eyebrow')" :title="t('education.title')" />
    <div class="edu">
      <div class="edu__col">
        <div class="edu__col-label mono">→ formal</div>
        <div v-for="it in formal" :key="it.school" class="edu__card">
          <div class="edu__school">{{ it.school }}</div>
          <div class="edu__degree">{{ it.degree }}</div>
          <div class="edu__period mono">{{ it.period }} · {{ it.note }}</div>
        </div>
      </div>
      <div class="edu__col">
        <div class="edu__col-label mono">→ certifications</div>
        <ul class="edu__cert-list">
          <li v-for="c in certs" :key="c">{{ c }}</li>
        </ul>
      </div>
      <div class="edu__col">
        <div class="edu__col-label mono">→ languages</div>
        <div v-for="l in languages" :key="l.lang" class="edu__card">
          <div class="edu__lang-name">{{ l.lang }}</div>
          <div class="edu__lang-level mono">{{ l.level }}</div>
        </div>
      </div>
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

@media (max-width: 700px) {
  .section {
    padding: var(--section-pad-y-sm) var(--shell-pad-x-sm);
  }
}

.edu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 900px) {
  .edu {
    grid-template-columns: 1fr;
  }
}

.edu__col-label {
  margin-bottom: 16px;
  color: var(--color-accent);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.edu__card {
  margin-bottom: 12px;
  padding: 20px;
  border: 1px solid var(--color-line);
  border-radius: 4px;
  background: var(--color-paper);
}

.edu__school {
  margin-bottom: 6px;
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 1.2;
}

.edu__degree {
  margin-bottom: 8px;
  color: var(--color-fg-dim);
  font-size: 14px;
}

.edu__period {
  color: var(--color-fg-mute);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.edu__cert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}

.edu__cert-list li {
  position: relative;
  padding: 10px 0 10px 16px;
  border-bottom: 1px dashed var(--color-line);
  color: var(--color-fg-dim);
  font-size: 14px;
}

.edu__cert-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 10px;
}

.edu__lang-name {
  margin-bottom: 4px;
  font-family: var(--font-serif);
  font-size: 22px;
}

.edu__lang-level {
  color: var(--color-fg-mute);
  font-size: 11px;
  letter-spacing: 0.05em;
}
</style>
