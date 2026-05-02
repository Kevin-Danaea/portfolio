<script setup lang="ts">
import type { StackGroup } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const groups = computed<StackGroup[]>(() => {
  const raw = tm('stack.groups') as unknown[]
  return raw.map((g) => {
    const obj = g as { label: unknown; items: unknown[] }
    return {
      label: rt(obj.label as string),
      items: obj.items.map((i) => rt(i as string)),
    }
  })
})

const rootEl = ref<HTMLElement | null>(null)
const isRevealed = useReveal(rootEl)
</script>

<template>
  <section
    id="stack"
    ref="rootEl"
    class="section reveal"
    :class="{ 'is-in': isRevealed }"
  >
    <SectionHeading
      :eyebrow="t('stack.eyebrow')"
      :title="t('stack.title')"
      :sub="t('stack.sub')"
    />
    <div class="stack">
      <div v-for="(g, i) in groups" :key="g.label" class="stack__card">
        <div class="stack__head">
          <span class="stack__idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="stack__title">{{ g.label }}</h3>
        </div>
        <div class="stack__items">
          <BaseTag v-for="it in g.items" :key="it">{{ it }}</BaseTag>
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

.stack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1px;
  border: 1px solid var(--color-line);
  background: var(--color-line);
}

.stack__card {
  padding: 28px 24px;
  background: var(--color-bg);
  transition: background var(--dur-base) var(--ease-out);
}

.stack__card:hover {
  background: var(--color-bg-2);
}

.stack__head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 18px;
}

.stack__idx {
  color: var(--color-fg-mute);
  font-size: 11px;
}

.stack__title {
  margin: 0;
  color: var(--color-fg);
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 22px;
}

.stack__items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
