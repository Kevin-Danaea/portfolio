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
    <!-- Lazy: keeps the cosmic engine (~30KB gzipped of physics + draw
         + canvas setup) out of the entry chunk. Backdrop appears a few
         hundred ms after first paint — fine for purely decorative content. -->
    <LazyCosmicField :density="2.5" accent="#c2493b" />
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
  background: var(--grid-bg);
}

.site::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: linear-gradient(to right, rgb(255 255 255 / 0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: linear-gradient(to bottom, black, black 80%, transparent);
  mask-image: linear-gradient(to bottom, black, black 80%, transparent);
}

.site__page {
  position: relative;
  z-index: 2;
}
</style>
