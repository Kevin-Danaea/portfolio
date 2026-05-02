<script setup lang="ts">
// Pill-shaped mono label used by interest tags. Hover lifts to accent.
</script>

<template>
  <span class="base-chip">
    <slot />
  </span>
</template>

<style scoped>
.base-chip {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid var(--color-line-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--color-fg-dim);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  transition:
    color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.base-chip:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>
