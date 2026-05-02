<script setup lang="ts">
// Mono uppercase label that sits above section titles or as a standalone
// status pill. The element is configurable so it can be a <div> in a
// section header or a <span> inline.
withDefaults(defineProps<{ as?: 'span' | 'div' | 'p' }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="eyebrow">
    <slot />
  </component>
</template>

<style scoped>
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--type-eyebrow);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--color-accent);
}
</style>
