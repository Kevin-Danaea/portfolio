<script setup lang="ts">
import type { NowItem } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const items = computed<NowItem[]>(() => {
  const raw = tm('now.items') as unknown[]
  return raw.map((it) => {
    const obj = it as Record<string, unknown>
    return { k: rt(obj.k as string), v: rt(obj.v as string) }
  })
})

const rootEl = ref<HTMLElement | null>(null)
const isRevealed = useReveal(rootEl)
</script>

<template>
  <section
    id="now"
    ref="rootEl"
    class="section reveal"
    :class="{ 'is-in': isRevealed }"
  >
    <SectionHeading
      :eyebrow="t('now.eyebrow')"
      :title="t('now.title')"
      :sub="t('now.sub')"
    />
    <div class="now">
      <div v-for="it in items" :key="it.k" class="now__card">
        <div class="now__k mono">{{ it.k }}</div>
        <div class="now__v">{{ it.v }}</div>
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

.now {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.now__card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--color-line);
  border-radius: 4px;
  background: var(--color-paper);
  transition:
    border-color var(--dur-base) var(--ease-out),
    background var(--dur-base) var(--ease-out);
}

.now__card:hover {
  border-color: var(--color-accent);
  background: rgb(232 160 107 / 0.03);
}

.now__k {
  flex-shrink: 0;
  width: 100px;
  padding-top: 3px;
  color: var(--color-accent);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.now__v {
  color: var(--color-fg);
  font-size: 15px;
  line-height: 1.5;
}
</style>
