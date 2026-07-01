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
    '/': { prerender: true },
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
    // Catalogue: SSR on demand so the API feeds content + SEO (no prerender of live data).
    '/products': { prerender: false },
    '/products/**': { prerender: false },
    // Insights / blog: SSR on demand so articles come live from the API.
    '/blog': { prerender: false },
    '/blog/**': { prerender: false },
    // Auth-gated, per-user pages: client-rendered (token lives in a cookie).
    '/dashboard': { ssr: false },
    '/dashboard/**': { ssr: false },
    '/checkout': { ssr: false },
    '/cart': { ssr: false },
    // Long-lived immutable caching for hashed/static assets. Improves: repeat-visit LCP, Best Practices.
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  nitro: {
    // Only crawl-prerender the static marketing routes; don't bake live API data.
    prerender: { crawlLinks: false, routes: ['/', '/login', '/register'], failOnError: false },
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
  sitemap: { autoLastmod: true },
  robots: {
    // Allow everything; the module appends the Sitemap directive automatically.
    allow: '/',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563eb' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
