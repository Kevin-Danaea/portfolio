<script setup lang="ts">
import type { WorkItem } from '~/i18n/locales/schema'
const { t, tm, rt } = useI18n()

const items = computed<WorkItem[]>(() => {
  const raw = tm('work.items') as unknown[]
  return raw.map((it) => {
    const obj = it as Record<string, unknown>
    return {
      company: rt(obj.company as string),
      desc: rt(obj.desc as string),
      role: rt(obj.role as string),
      period: rt(obj.period as string),
      loc: rt(obj.loc as string),
      bullets: (obj.bullets as unknown[]).map((b) => rt(b as string)),
    }
  })
})
</script>

<template>
  <section id="work" class="section">
    <SectionHeading
      :eyebrow="t('work.eyebrow')"
      :title="t('work.title')"
      :sub="t('work.sub')"
    />
    <div class="timeline">
      <JobCard
        v-for="(j, i) in items"
        :key="j.company"
        :job="j"
        :is-last="i === items.length - 1"
      />
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

.timeline {
  display: flex;
  flex-direction: column;
}
</style>
