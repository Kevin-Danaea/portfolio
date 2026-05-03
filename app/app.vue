<script setup lang="ts">
// Site shell — composes the persistent layer that lives across pages.
// The cosmic backdrop sits at z-index 0; the chrome (nav/footer) and
// page content rise above it via the body's stacking context.
const head = useLocaleHead({ seo: true })
useHead(head)

// JSON-LD identity — Person schema with sameAs pointing at GitHub +
// LinkedIn. Emitted once for the whole site by nuxt-schema-org.
useSchemaOrg([
  defineWebSite({
    name: 'Kevin Aguilera',
    url: 'https://kevinaguilera.tech',
    inLanguage: ['en-US', 'es-MX'],
  }),
  definePerson({
    name: 'Kevin Aguilera',
    alternateName: 'Kevin Danae Aguilera Barragán',
    jobTitle: 'Software Engineer',
    url: 'https://kevinaguilera.tech',
    image: 'https://kevinaguilera.tech/images/kevin.png',
    sameAs: [
      'https://github.com/Kevin-Danaea',
      'https://www.linkedin.com/in/kevin-danae/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tolcayuca',
      addressRegion: 'Hidalgo',
      addressCountry: 'MX',
    },
  }),
  defineWebPage(),
])
</script>

<template>
  <div class="site">
    <SkipLink />
    <CosmicField />
    <TheNav />
    <NuxtPage class="site__page" />
    <TheFooter />
  </div>
</template>

<style scoped>
.site {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.site__page {
  position: relative;
  z-index: 1;
}
</style>
