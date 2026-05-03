<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <p class="footer__quote">{{ t('footer.quote') }}</p>
    <div class="footer__row">
      <span class="mono">{{ t('footer.sig') }} · MMXXVI</span>
      <span class="mono">{{ t('footer.built') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  /* Match .site__page's stacking layer so the cosmic-field canvas
     (position: fixed; z-index: 0) doesn't paint over the footer.
     Without this, CSS paints positioned z-index:0 elements above
     static block-level siblings, hiding the footer behind stars. */
  position: relative;
  z-index: 2;
  max-width: var(--shell-max);
  margin: 0 auto;
  padding: 60px 32px 40px;
  border-top: 1px solid var(--color-line);
}

.footer__quote {
  margin: 0 0 32px;
  max-width: 70ch;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  line-height: 1.5;
  color: var(--color-fg-dim);
}

.footer__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  color: var(--color-fg-mute);
  font-size: 11px;
  letter-spacing: 0.05em;
}

@media (max-width: 700px) {
  .footer {
    padding-left: var(--shell-pad-x-sm);
    padding-right: var(--shell-pad-x-sm);
  }
}
</style>
