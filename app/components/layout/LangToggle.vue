<script setup lang="ts">
// Switches the active locale while preserving the current path.
// `switchLocalePath` is provided by @nuxtjs/i18n.
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <NuxtLink
    class="lang-toggle mono"
    :to="switchLocalePath(locale === 'en' ? 'es' : 'en')"
    :aria-label="t('a11y.toggleLanguage')"
  >
    <span :class="{ active: locale === 'en' }">EN</span>
    <span class="lang-sep">/</span>
    <span :class="{ active: locale === 'es' }">ES</span>
  </NuxtLink>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--color-line-strong);
  border-radius: 999px;
  color: var(--color-fg-dim);
  font-size: 11px;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: border-color var(--dur-base) var(--ease-out);
}

.lang-toggle:hover {
  border-color: var(--color-accent);
}

.lang-toggle .active {
  color: var(--color-accent);
}

.lang-sep {
  color: var(--color-fg-mute);
}
</style>
