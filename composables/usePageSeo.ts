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
export function usePageSeo(meta: PageSeo) {
  const route = useRoute()
  const siteUrl = useRuntimeConfig().public.siteUrl as string
  const base = siteUrl.replace(/\/$/, '')
  const canonical = base + route.path
  const image = base + (meta.image ?? '/images/razinsoft-home-og-image.webp')

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
