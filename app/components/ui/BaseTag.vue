<script setup lang="ts">
// Square mono tag used by stack items. Smaller and tighter than BaseChip.
</script>

<template>
  <span class="base-tag">
    <slot />
  </span>
</template>

<style scoped>
.base-tag {
  display: inline-block;
  padding: 4px 9px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: rgb(255 255 255 / 0.04);
  color: var(--color-fg-dim);
  font-family: var(--font-mono);
  font-size: 11px;
  transition:
    color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}

.base-tag:hover {
  color: var(--color-accent);
  border-color: rgb(232 160 107 / 0.3);
}
</style>
