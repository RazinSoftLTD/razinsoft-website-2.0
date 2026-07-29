interface PageSeo {
  title: string
  description: string
  /** Absolute-from-root image path, e.g. /images/hero-team.jpg */
  image?: string
  ogType?: 'website' | 'article' | 'product'
}

/**
 * Sets per-page title, description, canonical URL, Open Graph and Twitter tags.
 * Improves: SEO (unique metadata, canonical, social cards).
 */
export function usePageSeo(meta: PageSeo & { noindex?: boolean }) {
  const route = useRoute()
  const siteUrl = useRuntimeConfig().public.siteUrl as string
  const base = siteUrl.replace(/\/$/, '')
  const canonical = base + route.path
  // Absolute image URLs (e.g. API-hosted product images) pass through; relative paths get the site origin.
  const rawImage = meta.image ?? '/images/razinsoft-home-og-image.webp'
  const image = /^https?:\/\//.test(rawImage) ? rawImage : base + rawImage

  // Pages reached by a private link (a product sales link, say) must stay out of the index —
  // otherwise the URL that was the authorisation ends up in a search result.
  if (meta.noindex) {
    useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
  }

  useSeoMeta({
    title: meta.title,
    description: meta.description,
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogUrl: canonical,
    ogImage: image,
    ogType: (meta.ogType ?? 'website') as 'website',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
