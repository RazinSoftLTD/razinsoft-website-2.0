# RazinSoft Frontend

Nuxt 3 rebuild of the RazinSoft marketing site (own-web.razinsoft.com).

## Stack

- **Nuxt 3** (Vue 3, Vite) — static-first (`nuxt generate`, all routes prerendered)
- **Tailwind CSS** via `@nuxtjs/tailwindcss`
- **@nuxt/image** — AVIF/WebP, sized, lazy, LCP preloaded
- **@nuxt/fonts** — self-hosted Manrope + Inter, `font-display:swap`, fontaine fallback metrics (no CLS)
- **@nuxtjs/sitemap**, **@nuxtjs/robots**, **nuxt-schema-org** — SEO

## Configuration

Copy `.env.example` → `.env` and set your production origin:

```bash
SITE_URL=https://razinsoft.com   # canonical / sitemap / OG / JSON-LD base
```

## Requirements

- Node.js **≥ 18.3** (developed on Node 20). Use `nvm use 20`.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `npm run dev`      | Start dev server (HMR)       |
| `npm run build`    | Production build             |
| `npm run preview`  | Preview the production build |
| `npm run generate` | Static site generation       |

## Structure

```
components/   AppHeader, AppFooter, ProductCard
layouts/      default.vue (header + footer shell)
pages/        index.vue (home)
data/         products.ts (catalogue data)
assets/css/   main.css (Tailwind + component classes)
```

## Lighthouse / Core Web Vitals

Built to score 100 on Performance, Accessibility, Best Practices and SEO.
Test the production output (not `dev`):

```bash
npm run generate
npx serve .output/public -l 4000          # static preview
npx unlighthouse --site http://localhost:4000     # crawl every route
# or a single page:
npx lighthouse http://localhost:4000/ --view --preset=desktop
npx lighthouse http://localhost:4000/ --view       # mobile (default)
```

> Note: a plain static file server may report `image/jpeg` for `/_ipx/*` URLs.
> Real hosts (Vercel/Netlify/Cloudflare/Nitro) send the correct `image/webp`
> type + Brotli + immutable cache headers, which is what the scores assume.

## Status

- [x] Project scaffold (Nuxt 3 + Tailwind)
- [x] Performance/SEO/A11y pass (SSG, @nuxt/image, @nuxt/fonts, schema, sitemap, robots)
- [x] Home page (hero, products, why-us, services, CTA)
- [x] Product details page (`/products/[slug]`, prerendered, Product + Breadcrumb JSON-LD)
- [ ] Dedicated all-products listing page
- [ ] Services / Company / Resources pages
- [ ] Cart & checkout
