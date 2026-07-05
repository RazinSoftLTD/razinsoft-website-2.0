// https://nuxt.com/docs/api/configuration/nuxt-config

// ---- Everything env-driven (see .env / .env.example) ----
const siteUrl = process.env.SITE_URL || 'https://razinsoft.com'
const apiBase = process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'

// Host that serves API/storage images — derived from apiBase so @nuxt/image can optimise them.
const apiImageHost = (() => {
  try {
    return new URL(apiBase).hostname
  } catch {
    return '127.0.0.1'
  }
})()
const imageDomains = [...new Set([apiImageHost, '127.0.0.1', 'localhost'])]

// Full origin of the API/storage host — used to preconnect (cuts image/API connection latency).
const apiOrigin = (() => {
  try {
    return new URL(apiBase).origin
  } catch {
    return ''
  }
})()

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Single source of truth for every absolute URL (canonical, OG, sitemap, schema).
  site: {
    url: siteUrl,
    name: 'RazinSoft',
    description:
      'RazinSoft empowers startups and businesses with scalable digital solutions, combining modern development technologies, strategic thinking, and industry-focused expertise.',
    defaultLocale: 'en',
  },

  // Exposed to app + client so we never depend on the site-config auto-import.
  runtimeConfig: {
    public: {
      siteUrl,
      // Laravel API base — override via NUXT_PUBLIC_API_BASE in .env.
      apiBase,
      // Calendly scheduling link for the Book a Meeting page — override via NUXT_PUBLIC_CALENDLY_URL.
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/razinsoft/consultation',
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],

  css: ['~/assets/css/main.css'],

  // ---- Rendering ----
  // Static marketing pages prerender; data- and auth-driven pages render live (SSR/SPA)
  // so they reflect the API instead of baking stale data at build time.
  routeRules: {
    // Live content pages: the CDN/edge caches the HTML (s-maxage) for a fast load, but the
    // BROWSER is told max-age=0 so a normal reload always revalidates and shows current data.
    // Without max-age=0 browsers heuristically cache the HTML → only a HARD refresh shows new data.
    // Home shows LIVE product + blog data from the API.
    '/': { headers: { 'cache-control': 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=600' } },
    '/login': { prerender: true },
    '/register': { prerender: true },
    '/contact-us': { prerender: true },
    '/about-us': { prerender: true },
    '/careers': { prerender: true },
    '/life': { prerender: true },
    '/support': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/refund-policy': { prerender: true },
    '/installation-policy': { prerender: true },
    '/terms-and-conditions': { prerender: true },
    '/service-policy': { prerender: true },
    '/support-policy': { prerender: true },
    // Catalogue: SSR + stale-while-revalidate cache. Crawlers still get full server-rendered
    // HTML (SEO-safe) but repeat visitors get it instantly from cache; revalidated in background.
    '/products': { headers: { 'cache-control': 'public, max-age=0, must-revalidate, s-maxage=180, stale-while-revalidate=600' } },
    '/products/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=600' } },
    // Insights / blog: edge-cached, browser revalidates (articles change rarely).
    '/blog': { headers: { 'cache-control': 'public, max-age=0, must-revalidate, s-maxage=180, stale-while-revalidate=600' } },
    '/blog/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate, s-maxage=600, stale-while-revalidate=600' } },
    // Auth-gated, per-user pages: client-rendered (token lives in a cookie).
    '/dashboard': { ssr: false },
    '/dashboard/**': { ssr: false },
    '/checkout': { ssr: false },
    '/cart': { ssr: false },
    // Long-lived immutable caching for hashed/static assets. Improves: repeat-visit LCP, Best Practices.
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // Security headers on every response. Improves: Best Practices (Lighthouse) + hardening.
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
        'X-DNS-Prefetch-Control': 'on',
      },
    },
  },

  nitro: {
    // Only crawl-prerender the static marketing routes; don't bake live API data.
    prerender: { crawlLinks: false, routes: ['/login', '/register'], failOnError: false },
    // Brotli + gzip precompressed assets. Improves: Performance (smaller transfer).
    compressPublicAssets: { gzip: true, brotli: true },
  },

  // Inline critical CSS into the document, defer the rest. Improves: FCP/LCP (no render-blocking CSS).
  features: { inlineStyles: true },

  // ---- Images: AVIF/WebP, sized, lazy below the fold. Improves: LCP, CLS, Performance. ----
  image: {
    format: ['avif', 'webp'],
    quality: 70,
    densities: [1, 2],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
    // Allow optimising admin-uploaded product images served from the Laravel /storage host
    // (derived from NUXT_PUBLIC_API_BASE, so it follows the API host in every environment).
    domains: imageDomains,
  },

  // ---- Fonts: self-hosted + subset + font-display:swap + preload. Improves: LCP, CLS, Best Practices. ----
  // @nuxt/fonts downloads Google fonts at build, serves them from /_fonts, and adds
  // size-adjust fallback metrics (fontaine) so swapping in the web font causes no layout shift.
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google', weights: [600, 700, 800] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
    ],
    defaults: { fallbacks: { 'sans-serif': ['Arial'] } },
  },

  // ---- SEO modules ----
  sitemap: {
    autoLastmod: true,
    // Pull dynamic product + blog URLs from the API so every detail page is indexable.
    sources: ['/api/__sitemap__/urls'],
    // Always regenerate from the live API — never serve a stale/empty cached sitemap.
    cacheMaxAgeSeconds: 0,
    runtimeCacheStorage: false,
    // Plain XML (no styled HTML view) — like a standard sitemap.
    xsl: false,
    // Give every URL a changefreq + priority.
    defaults: { changefreq: 'weekly', priority: 0.7 },
    // Trim unused image/video/news namespaces for a clean <urlset>.
    discoverImages: false,
    discoverVideos: false,
  },
  robots: {
    allow: '/',
    // Keep private / transactional pages out of crawl budget (also noindex-tagged in-page).
    disallow: ['/dashboard', '/checkout', '/cart', '/payment'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563eb' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Warm up the connection to the API/storage host early → faster image + data fetch (LCP).
        ...(apiOrigin ? [{ rel: 'preconnect', href: apiOrigin, crossorigin: '' as const }, { rel: 'dns-prefetch', href: apiOrigin }] : []),
      ],
    },
  },
})
