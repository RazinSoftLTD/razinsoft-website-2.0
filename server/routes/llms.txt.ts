import { defineEventHandler, setResponseHeader } from 'h3'

// Serves /llms.txt — a concise, structured guide to the whole site for LLMs and AI agents.
// Follows the https://llmstxt.org convention. Product + blog links are pulled live from the API
// so the file stays current, exactly like the sitemap.
export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()
  const site = (cfg.public.siteUrl as string || 'https://razinsoft.com').replace(/\/$/, '')
  const api = (cfg.public.apiBase as string || '').replace(/\/$/, '')
  const url = (path: string) => `${site}${path}`

  // ---- live data (best-effort; the file still renders if the API is unreachable) ----
  let products: any[] = []
  let articles: any[] = []
  try {
    const r = await $fetch<any>(`${api}/products?per_page=48`)
    products = r?.data ?? []
  } catch { /* ignore */ }
  try {
    const r = await $fetch<any>(`${api}/articles`)
    articles = r?.data ?? []
  } catch { /* ignore */ }

  const L: string[] = []
  L.push('# RazinSoft')
  L.push('')
  L.push('> RazinSoft is a software company and product marketplace. We build ready-made, enterprise-grade software products and custom software solutions. Every product ships with full source code and a lifetime license — a one-time purchase, no subscriptions.')
  L.push('')
  L.push('Businesses buy production-ready platforms (eCommerce, LMS, POS, ride-sharing, laundry, grocery and more), deploy them on their own servers, and own the source code. Each product page includes an overview, powerful features, pricing/license plans, a screenshot gallery, live demos, documentation & resources, a per-product FAQ, verified customer reviews, and a public Q&A section. Alongside products, RazinSoft offers professional services: installation & setup, customization, maintenance & support, and mobile app publishing.')
  L.push('')
  L.push('- Purchase model: one-time payment, lifetime license, full source code included (no subscriptions).')
  L.push('- Support hours: Monday–Saturday, 9 AM – 9 PM (GMT+6).')
  L.push('- Contact: info@razinsoft.com (general) · support@razinsoft.com (support & refunds).')
  L.push('- Offices: Dhaka, Bangladesh (HQ) · Houston/Seattle, USA.')
  L.push('- Website: ' + site + ' · Sitemap: ' + url('/sitemap.xml'))
  L.push('')

  // ---- Products ----
  L.push('## Products')
  if (products.length) {
    for (const p of products) {
      const cat = p.category ? ` [${p.category}]` : ''
      const tag = p.tagline ? ` — ${p.tagline}` : ''
      L.push(`- [${p.name}](${url('/products/' + p.slug)})${tag}${cat}`)
    }
  } else {
    L.push(`- [All Products](${url('/products')}): Browse the full catalogue of ready-made software products.`)
  }
  L.push('')

  // ---- Services ----
  L.push('## Services')
  L.push('- Installation & Setup — deploy your purchased product on your server or hosting.')
  L.push('- Customization — tailor features, design and workflows to your requirements.')
  L.push('- Maintenance & Support — updates, monitoring and technical assistance after launch.')
  L.push('- App Publishing — prepare and submit mobile apps to the Google Play Store and Apple App Store.')
  L.push('')

  // ---- Main pages ----
  L.push('## Main pages')
  L.push(`- [All Products](${url('/products')}): Full catalogue with search, category filters and sorting.`)
  L.push(`- [Blog / Insights](${url('/blog')}): Articles on software, SaaS, eCommerce, EdTech, security and business.`)
  L.push(`- [About Us](${url('/about-us')}): Company, leadership and the team behind the products.`)
  L.push(`- [Life @ RazinSoft](${url('/life')}): Culture, workplace and everyday moments.`)
  L.push(`- [Careers](${url('/careers')}): Open roles and how to join the team.`)
  L.push(`- [Contact Us](${url('/contact-us')}): Get in touch with the team.`)
  L.push(`- [Support](${url('/support')}): Help centre and support requests.`)
  L.push('')

  // ---- Blog ----
  if (articles.length) {
    L.push('## Blog articles')
    for (const a of articles) {
      L.push(`- [${a.title}](${url('/blog/' + a.slug)})`)
    }
    L.push('')
  }

  // ---- Legal ----
  L.push('## Legal & policies')
  L.push(`- [Terms & Conditions](${url('/terms-and-conditions')}): Payment, licensing, refunds and termination terms.`)
  L.push(`- [Privacy Policy](${url('/privacy-policy')}): What data we collect and how it is used and protected.`)
  L.push(`- [Refund Policy](${url('/refund-policy')}): Refund eligibility, non-refundable services and the process.`)
  L.push(`- [Service Policy](${url('/service-policy')}): How professional services are scoped and delivered.`)
  L.push(`- [Support Policy](${url('/support-policy')}): What support covers, channels and response times.`)
  L.push(`- [Installation Policy](${url('/installation-policy')}): Installation and setup service details.`)
  L.push('')

  // ---- Optional / account ----
  L.push('## Optional')
  L.push(`- [Login](${url('/login')}): Customer account sign-in.`)
  L.push(`- [Register](${url('/register')}): Create a customer account.`)
  L.push(`- [Dashboard](${url('/dashboard')}): Customer area — orders, licenses, downloads and support (requires sign-in).`)
  L.push('')

  const body = L.join('\n')
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, stale-while-revalidate=86400')
  return body
})
