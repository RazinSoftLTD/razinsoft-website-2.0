import { defineSitemapEventHandler } from '#imports'

// Feed dynamic product + blog URLs into the sitemap (fetched from the Laravel API at build/runtime).
export default defineSitemapEventHandler(async () => {
  const base = (useRuntimeConfig().public.apiBase as string).replace(/\/$/, '')
  const urls: Array<{ loc: string; changefreq?: string; priority?: number; lastmod?: string }> = []

  try {
    const products = await $fetch<any>(`${base}/products?per_page=48`)
    for (const p of products?.data ?? []) {
      urls.push({ loc: `/products/${p.slug}`, changefreq: 'weekly', priority: 0.8 })
    }
  } catch {
    // API unreachable at build — sitemap still generates for static routes.
  }

  try {
    const articles = await $fetch<any>(`${base}/articles`)
    for (const a of articles?.data ?? []) {
      urls.push({ loc: `/blog/${a.slug}`, changefreq: 'monthly', priority: 0.6, lastmod: a.date_iso || undefined })
    }
  } catch {
    // ignore
  }

  return urls
})
