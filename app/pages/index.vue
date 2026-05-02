<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main id="main">
    <h1>{{ t('meta.title') }}</h1>
    <p>Sections land in step 8 of the rewrite plan.</p>
  </main>
</template>
