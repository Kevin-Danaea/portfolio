<script setup lang="ts">
// Site shell — composes the persistent layer that lives across pages.
// The cosmic backdrop sits at z-index 0; the chrome (nav/footer) and
// page content rise above it via the body's stacking context.
const head = useLocaleHead({ seo: true })
useHead(head)
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
