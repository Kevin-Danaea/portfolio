<script setup lang="ts">
// Polymorphic CTA — renders <a> when href is set, <button> otherwise.
// Variant changes only visuals; the contract (props/slots/events) is the
// same regardless of variant (Liskov: a `ghost` button can stand in for
// a `primary` button anywhere).

type Variant = 'primary' | 'ghost'

withDefaults(
  defineProps<{
    variant?: Variant
    href?: string
    download?: boolean | string
    type?: 'button' | 'submit' | 'reset'
    target?: '_blank' | '_self'
    rel?: string
  }>(),
  { variant: 'primary', type: 'button' },
)
</script>

<template>
  <a
    v-if="href"
    :class="['base-btn', `base-btn--${variant}`]"
    :href="href"
    :download="download"
    :target="target"
    :rel="rel ?? (target === '_blank' ? 'noopener' : undefined)"
  >
    <span class="base-btn__label"><slot /></span>
    <span v-if="$slots.icon" class="base-btn__icon" aria-hidden="true"><slot name="icon" /></span>
  </a>
  <button v-else :class="['base-btn', `base-btn--${variant}`]" :type="type">
    <span class="base-btn__label"><slot /></span>
    <span v-if="$slots.icon" class="base-btn__icon" aria-hidden="true"><slot name="icon" /></span>
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.base-btn--primary {
  background: var(--color-accent);
  color: #1a1208;
}

.base-btn--primary:hover {
  background: #f1b487;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgb(232 160 107 / 0.25);
}

.base-btn--ghost {
  border-color: var(--color-line-strong);
  color: var(--color-fg);
}

.base-btn--ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.base-btn__icon {
  transition: transform var(--dur-fast) var(--ease-out);
}

.base-btn:hover .base-btn__icon {
  transform: translateX(2px);
}
</style>
