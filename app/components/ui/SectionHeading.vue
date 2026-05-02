<script setup lang="ts">
// Eyebrow + multi-line title (\n splits) + optional italic sub.
// The second title line takes the italic accent treatment by convention.
const props = defineProps<{
  eyebrow?: string
  title: string
  sub?: string
}>()

const titleLines = computed(() => props.title.split('\n'))
</script>

<template>
  <header class="section-heading">
    <Eyebrow v-if="eyebrow">{{ eyebrow }}</Eyebrow>
    <h2 class="section-heading__title">
      <span v-for="(line, i) in titleLines" :key="i" class="section-heading__line">{{ line }}</span>
    </h2>
    <p v-if="sub" class="section-heading__sub">{{ sub }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  margin-bottom: 64px;
  max-width: 800px;
}

.section-heading__title {
  margin: 16px 0 20px;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--type-section);
  line-height: 1;
  letter-spacing: -0.02em;
}

.section-heading__line {
  display: block;
}

/* The italic accent on the second line is the editorial signature. */
.section-heading__line:nth-child(2) {
  font-style: italic;
  color: var(--color-accent);
}

.section-heading__sub {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  line-height: 1.4;
  color: var(--color-fg-dim);
}
</style>
