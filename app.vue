<script setup lang="ts">
const siteUrl = useRuntimeConfig().public.siteUrl as string

// Site-wide <title> template + sensible SEO/OG defaults (pages override per-page).
useHead({
  titleTemplate: (t) => (t ? `${t} · RazinSoft` : 'RazinSoft — Scalable Software Solutions for Growing Businesses'),
})

useSeoMeta({
  ogSiteName: 'RazinSoft',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@razinsoft',
})

// Site-wide structured data. Improves: SEO (rich results eligibility).
useSchemaOrg([
  defineOrganization({
    name: 'RazinSoft',
    url: siteUrl,
    logo: `${siteUrl}/images/Razinsoft-logo.webp`,
    sameAs: [
      'https://github.com/razinsoft',
      'https://www.linkedin.com/company/razinsoft',
    ],
    contactPoint: {
      telephone: '+880-1111-257408',
      contactType: 'customer support',
      email: 'info@razinsoft.com',
    },
  }),
  defineWebSite({ name: 'RazinSoft' }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppToaster />
</template>
