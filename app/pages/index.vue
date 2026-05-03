<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const SITE_URL = 'https://kevinaguilera.tech'
const OG_IMAGE = `${SITE_URL}/og.png`

const ogLocale = computed(() => (locale.value === 'es' ? 'es_MX' : 'en_US'))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogSiteName: 'Kevin Aguilera',
  ogLocale: () => ogLocale.value,
  ogUrl: () => `${SITE_URL}${route.path}`,
  ogImage: OG_IMAGE,
  ogImageWidth: 800,
  ogImageHeight: 800,
  ogImageAlt: 'Kevin Aguilera — Software Engineer',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.title'),
  twitterDescription: () => t('meta.description'),
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'Kevin Aguilera — Software Engineer',
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
