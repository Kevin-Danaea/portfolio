<script setup lang="ts">
// Bypasses the nav for keyboard / screen-reader users. The .skip-link class
// is defined in app/assets/styles/base.css (visible only on :focus).
const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#main">{{ t('a11y.skipToMain') }}</a>
</template>
