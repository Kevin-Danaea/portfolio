<script setup lang="ts">
import type { WorkItem } from '~/i18n/locales/schema'

defineProps<{
  job: WorkItem
  /** True for the last item: hides the rail line. */
  isLast?: boolean
}>()
</script>

<template>
  <article class="job">
    <div class="job__rail">
      <span class="job__node" aria-hidden="true" />
      <span v-if="!isLast" class="job__line" aria-hidden="true" />
    </div>
    <div class="job__body">
      <header class="job__head">
        <div>
          <h3 class="job__company">{{ job.company }}</h3>
          <div class="job__desc mono">{{ job.desc }}</div>
        </div>
        <div class="job__meta mono">
          <div>{{ job.period }}</div>
          <div class="job__loc">{{ job.loc }}</div>
        </div>
      </header>
      <div class="job__role">{{ job.role }}</div>
      <ul class="job__bullets">
        <li v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 24px;
  position: relative;
}

.job__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}

.job__node {
  position: relative;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border: 1.5px solid var(--color-accent);
  border-radius: 50%;
  background: var(--color-bg);
}

.job__node::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: var(--color-accent);
}

.job__line {
  flex: 1;
  width: 1px;
  margin-top: 6px;
  background: var(--color-line-strong);
}

.job__body {
  padding: 0 0 56px;
}

.job__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 14px;
}

.job__company {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 32px;
  letter-spacing: -0.01em;
}

.job__desc {
  margin-top: 4px;
  color: var(--color-fg-mute);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.job__meta {
  text-align: right;
  color: var(--color-fg-dim);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.job__loc {
  margin-top: 2px;
  color: var(--color-fg-mute);
}

.job__role {
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed var(--color-line-strong);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.04em;
}

.job__bullets {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}

.job__bullets li {
  position: relative;
  padding-left: 22px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-fg-dim);
}

.job__bullets li::before {
  content: '▸';
  position: absolute;
  left: 0;
  top: 6px;
  color: var(--color-accent);
  font-size: 11px;
}
</style>
