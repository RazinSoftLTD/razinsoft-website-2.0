import { defineSitemapEventHandler } from '#imports'

// Feed dynamic blog URLs into the sitemap (fetched from the Laravel API at build/runtime).
export default defineSitemapEventHandler(async () => {
  const base = (useRuntimeConfig().public.apiBase as string).replace(/\/$/, '')
  const urls: Array<{ loc: string; changefreq?: string; priority?: number; lastmod?: string }> = []

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
