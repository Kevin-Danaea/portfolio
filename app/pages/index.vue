<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main id="main">
    <span id="top" aria-hidden="true" />
    <HeroSection />
    <AboutSection />
    <StackSection />
    <WorkSection />
    <EducationSection />
    <NowSection />
    <ContactSection />
  </main>
</template>
