<script setup lang="ts">
import type { AboutStat } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const stats = computed<AboutStat[]>(() => {
  const raw = tm('about.stats') as unknown[]
  return raw.map((s) => {
    const obj = s as Record<string, unknown>
    return { k: rt(obj.k as string), v: rt(obj.v as string) }
  })
})

const interests = computed<string[]>(() => {
  const raw = tm('about.interests') as unknown[]
  return raw.map((w) => rt(w as string))
})
</script>

<template>
  <section id="about" class="section about">
    <SectionHeading :eyebrow="t('about.eyebrow')" :title="t('about.title')" />
    <div class="about__grid">
      <div class="about__text">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
        <div class="about__interests">
          <BaseChip v-for="i in interests" :key="i">{{ i }}</BaseChip>
        </div>
      </div>
      <div class="about__stats">
        <div v-for="s in stats" :key="s.k + s.v" class="about__stat">
          <div class="about__stat-k">{{ s.k }}</div>
          <div class="about__stat-v">{{ s.v }}</div>
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

.about__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 64px;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}

.about__text p {
  max-width: 60ch;
  margin: 0 0 20px;
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-fg);
}

.about__text p:last-of-type {
  color: var(--color-fg-dim);
}

.about__interests {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.about__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-content: start;
}

.about__stat {
  position: relative;
  padding: 24px 18px;
  border: 1px solid var(--color-line);
  border-radius: 4px;
  background: var(--color-paper);
  transition:
    border-color var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.about__stat:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.about__stat::before {
  content: '+';
  position: absolute;
  top: 6px;
  right: 8px;
  color: var(--color-fg-mute);
  font-family: var(--font-mono);
  font-size: 10px;
}

.about__stat-k {
  margin-bottom: 8px;
  color: var(--color-accent);
  font-family: var(--font-serif);
  font-size: 44px;
  line-height: 1;
}

.about__stat-v {
  color: var(--color-fg-dim);
  font-size: 12px;
  line-height: 1.4;
}
</style>
