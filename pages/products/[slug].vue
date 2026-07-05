<script setup lang="ts">
import {
  suitableFor as suitableForFallback,
  techStack as techFallback,
  productInfo,
  features as featuresFallback,
  pricingTiers as pricingFallback,
  galleryTabs as galleryFallback,
  tryItLive,
  docs as docsFallback,
} from '~/data/products'

const route = useRoute()
const slug = route.params.slug as string
const { $api } = useNuxtApp()

// Live product detail from the Laravel API (SSR).
const { data: detail, error, refresh } = await useAsyncData(`product-${slug}`, () => $api<any>(`/products/${slug}`))
if (error.value || !detail.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}
const api = computed<any>(() => (detail.value as any)?.data ?? detail.value)

const base = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')

const product = computed(() => {
  const p = api.value
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    version: p.version,
    // No standalone price — use the first plan's price.
    price: Number(p.from_price ?? p.plans?.[0]?.price ?? 0),
    rating: Number(p.rating),
    reviews: p.reviews_count ?? 0,
    sales: p.sales_count ?? 0,
    badge: p.badge || 'Best Seller',
    image: p.hero_image || p.thumbnail || `/images/products/${p.slug}.jpg`,
    imageWidth: 900,
    imageHeight: 600,
  }
})

// ---- Content mapped from the API, with the original visual styling as fallback ----
const suitable = computed(() => (api.value.suitable_for?.length ? api.value.suitable_for : suitableForFallback))

const techTones = ['bg-red-50 text-red-600', 'bg-purple-50 text-purple-600', 'bg-sky-50 text-sky-600', 'bg-orange-50 text-orange-600', 'bg-emerald-50 text-emerald-600', 'bg-violet-50 text-violet-600', 'bg-teal-50 text-teal-600', 'bg-blue-50 text-blue-600']
const tech = computed(() => {
  const t = api.value.tech_stack
  if (!t?.length) return techFallback
  return t.map((x: any, i: number) => ({ name: x.name, tone: techTones[i % techTones.length] }))
})

const featureList = computed(() => {
  const f = api.value.features
  if (!f?.length) return featuresFallback
  return f.map((x: any, i: number) => {
    const v = featuresFallback[i % featuresFallback.length]
    return { title: x.title, subtitle: x.subtitle, desc: x.description, top: v.top, icon: v.icon, subText: v.subText, paths: v.paths }
  })
})

// Show the first 6 feature cards; reveal the rest behind a "Read More" toggle.
const FEATURE_LIMIT = 6
const showAllFeatures = ref(false)

const tiers = computed(() => {
  const pl = api.value.plans
  if (!pl?.length) return pricingFallback.map((t: any, i: number) => ({ ...t, id: -(i + 1) }))
  return pl.map((x: any) => ({ id: x.id, name: x.name, blurb: x.blurb, price: Number(x.price), popular: x.is_popular, perks: x.perks || [] }))
})

const galleryImageFallback = ['/images/blog/blog-2.jpg', '/images/blog/blog-1.jpg', '/images/blog/blog-3.jpg', '/images/hero-1.jpg', '/images/hero-2.jpg']
// Each tab = one group; `images` holds every uploaded image (browsed in the lightbox).
const gallery = computed(() => {
  const g = api.value.gallery
  if (!g?.length) {
    return galleryFallback.map((t: any) => ({ name: t.name, label: t.label, paths: t.paths, images: [{ image: t.image, caption: t.label, alt: t.name }] }))
  }
  return g.map((grp: any, i: number) => {
    const imgs = grp.images?.length
      ? grp.images
      : [{ image: galleryImageFallback[i % galleryImageFallback.length], caption: grp.name, alt: grp.name }]
    return {
      name: grp.name,
      label: imgs[0]?.caption || grp.name,
      paths: galleryFallback[i % galleryFallback.length].paths,
      images: imgs,
    }
  })
})

const docList = computed(() => {
  const d = api.value.docs
  if (!d?.length) return docsFallback
  return d.map((x: any, i: number) => {
    const v = docsFallback[i % docsFallback.length]
    return { title: x.title, url: x.url || '#', card: v.card, circle: v.circle, text: v.text, paths: v.paths }
  })
})

// Per-product FAQs (admin-managed) — revealed under the docs grid when the FAQ card is tapped.
const faqList = computed<any[]>(() => (api.value.faqs || []).map((x: any) => ({ question: x.question, answer: x.answer })))
const showFaqs = ref(false)

const qa = computed(() => {
  // Real per-product question threads (anyone can answer). Falls back to admin FAQs if none.
  const threads = (api.value.questions || []).map((q: any) => ({
    id: q.id,
    user: q.user || 'Customer',
    when: q.asked_at || '',
    text: q.question,
    answers: (q.answers || []).map((a: any) => ({ user: a.user, body: a.body, isAdmin: !!a.is_admin, when: a.when || '' })),
  }))
  if (threads.length) return threads

  return (api.value.faqs || []).map((x: any) => ({
    id: null,
    user: 'RazinSoft',
    when: '',
    text: x.question,
    answers: [{ user: 'RazinSoft', body: x.answer, isAdmin: true, when: '' }],
  }))
})

// ---- Ask a question ----
const { isLoggedIn } = useAuth()
const newQuestion = ref('')
const postingQuestion = ref(false)

function requireLogin(): boolean {
  if (isLoggedIn.value) return true
  useToast().info('Please sign in', 'Sign in to join the discussion.')
  navigateTo(`/login?redirect=/products/${slug}`)
  return false
}

async function postQuestion() {
  const text = newQuestion.value.trim()
  if (!text || postingQuestion.value) return
  if (!requireLogin()) return
  postingQuestion.value = true
  try {
    await $api(`/products/${slug}/questions`, { method: 'POST', body: { question: text } })
    newQuestion.value = ''
    useToast().success('Question posted')
    await refresh()
  } catch (e: any) {
    useToast().error('Could not post', e?.data?.message || 'Please try again.')
  } finally {
    postingQuestion.value = false
  }
}

// ---- Answer a question (anyone) ----
const replyOpen = reactive<Record<number, boolean>>({})
const replyText = reactive<Record<number, string>>({})
const answering = ref<number | null>(null)

async function postAnswer(qid: number) {
  const body = (replyText[qid] || '').trim()
  if (!body || answering.value) return
  if (!requireLogin()) return
  answering.value = qid
  try {
    await $api(`/products/${slug}/questions/${qid}/answers`, { method: 'POST', body: { body } })
    replyText[qid] = ''
    replyOpen[qid] = false
    useToast().success('Answer posted')
    await refresh()
  } catch (e: any) {
    useToast().error('Could not post', e?.data?.message || 'Please try again.')
  } finally {
    answering.value = null
  }
}

// "Try It Live" cards — fully dynamic from the API `demos` payload; each type maps to a
// preset icon + gradient so the design stays consistent no matter how many are added.
const demoPresets: Record<string, { tone: string; badge: string; paths: string[] }> = {
  live: { tone: 'from-indigo-500 to-violet-600', badge: 'Live Demo', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  admin: { tone: 'from-blue-500 to-blue-600', badge: 'Live Demo', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z'] },
  customer: { tone: 'from-teal-500 to-emerald-600', badge: 'Live Demo', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  web: { tone: 'from-sky-500 to-blue-600', badge: 'Live', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  android: { tone: 'from-emerald-500 to-green-600', badge: 'Download', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
  ios: { tone: 'from-purple-500 to-violet-600', badge: 'Download', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
  download: { tone: 'from-slate-600 to-slate-800', badge: 'Download', paths: ['M12 3v12m0 0 4-4m-4 4-4-4M5 19h14'] },
  link: { tone: 'from-gray-600 to-gray-800', badge: 'Open', paths: ['M14 5h5v5', 'M19 5 10 14', 'M19 13v6H5V5h6'] },
}

// Uploaded demo icons that failed to load → fall back to the preset SVG.
const brokenIcons = reactive(new Set<string>())

const demoLinks = computed(() => {
  const demos = api.value.demos
  if (demos?.length) {
    return demos.map((d: any) => {
      const preset = demoPresets[d.type] || demoPresets.link
      return {
        title: d.title,
        subtitle: d.subtitle || '',
        badge: d.badge || preset.badge,
        tone: preset.tone,
        icon: d.icon || '', // uploaded icon image; empty → fall back to the preset SVG
        paths: preset.paths,
        url: d.url || '',
      }
    })
  }

  // Fallback for products still using the old fixed demo columns.
  const demo = api.value.demo || {}
  const byTitle: Record<string, string | null | undefined> = {
    'Admin Demo': demo.admin,
    'Customer Demo': demo.customer,
    'Android App': demo.android,
    'iOS App': demo.ios,
  }
  return tryItLive.map((c) => ({ ...c, url: byTitle[c.title] || demo.live || '' })).filter((c) => c.url)
})

// ---- SEO from the API seo payload ----
const seo = computed(() => api.value.seo || {})

usePageSeo({
  title: seo.value.title || `${product.value.name} — ${product.value.tagline}`,
  description: seo.value.description || `${product.value.name}: ${product.value.tagline}. Lifetime license, source code included.`,
  image: product.value.image,
  ogType: 'product',
})
useSeoMeta({ robots: seo.value.robots || 'index,follow' })

useSchemaOrg([
  defineProduct({
    name: product.value.name,
    description: seo.value.description || product.value.tagline,
    image: base + product.value.image,
    sku: seo.value.sku || product.value.slug,
    brand: { name: seo.value.brand || 'RazinSoft' },
    offers: [{
      price: (tiers.value[0]?.price ?? product.value.price).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${base}/products/${product.value.slug}`,
      priceValidUntil: seo.value.price_valid_until,
    }],
    aggregateRating: { ratingValue: product.value.rating, reviewCount: product.value.reviews, bestRating: 5, worstRating: 1 },
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Products', item: '/products' },
      { name: product.value.name, item: `/products/${product.value.slug}` },
    ],
  }),
])

// SoftwareApplication + FAQPage JSON-LD (driven by the API payload).
const softwareLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.value.name,
  operatingSystem: seo.value.operating_system || 'Web, Android, iOS',
  applicationCategory: 'https://schema.org/' + (seo.value.application_category || 'BusinessApplication'),
  softwareVersion: seo.value.software_version || product.value.version,
  offers: { '@type': 'Offer', price: (tiers.value[0]?.price ?? product.value.price).toFixed(2), priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: product.value.rating, reviewCount: product.value.reviews },
}))
const faqLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.value.filter((q) => q.answers.length).map((q) => ({ '@type': 'Question', name: q.text, acceptedAnswer: { '@type': 'Answer', text: q.answers[0]?.body || '' } })),
}))
useHead(() => ({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(softwareLd.value) },
    ...(faqLd.value.mainEntity.length ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(faqLd.value) }] : []),
  ],
}))

// ---- Reviews (read-only here; customers post them from their order details page) ----
const reviewsList = computed(() => (api.value.reviews || []).map((r: any) => ({
  id: r.id,
  author: r.author || 'Customer',
  rating: Math.max(0, Math.min(5, Number(r.rating) || 0)),
  comment: r.comment,
  when: r.when || '',
})))

const activeTab = ref(gallery.value[0]?.name || 'Website')

// ---- Gallery lightbox (browse a group's images with arrows / swipe / keyboard) ----
const lightboxOpen = ref(false)
const lightboxImages = ref<any[]>([])
const lightboxIndex = ref(0)

function openLightbox(group: any, index = 0) {
  lightboxImages.value = group.images || []
  lightboxIndex.value = index
  lightboxOpen.value = true
}
function closeLightbox() { lightboxOpen.value = false }
function nextImage() { if (lightboxImages.value.length) lightboxIndex.value = (lightboxIndex.value + 1) % lightboxImages.value.length }
function prevImage() { if (lightboxImages.value.length) lightboxIndex.value = (lightboxIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length }

function onGalleryKey(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextImage()
  else if (e.key === 'ArrowLeft') prevImage()
}
let touchStartX = 0
function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0].clientX }
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) (dx < 0 ? nextImage() : prevImage())
}
watch(lightboxOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onGalleryKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGalleryKey)
  if (import.meta.client) document.body.style.overflow = ''
})
const { addItem } = useCart()
</script>

<template>
  <article>
    <!-- ===== HERO ===== -->
    <header class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-14 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 56px 56px;" />
      <div class="container-page relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <nav aria-label="Breadcrumb">
            <ol class="flex items-center gap-2 text-sm text-gray-400">
              <li><NuxtLink to="/products" class="hover:text-white">Products</NuxtLink></li>
              <li aria-hidden="true">/</li>
              <li class="text-gray-200" aria-current="page">{{ product.name }}</li>
            </ol>
          </nav>

          <h1 class="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{{ product.name }}</h1>
          <p class="mt-2 font-display text-2xl font-bold text-brand-400">{{ product.tagline }}</p>

          <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-300">
            <span class="flex items-center gap-1">
              <svg v-for="n in 5" :key="n" class="h-4 w-4 fill-amber-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
              <span class="ml-1 font-bold text-white">{{ product.rating }}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{{ product.reviews }} reviews</span>
            <span aria-hidden="true">·</span>
            <span>{{ product.sales.toLocaleString() }} sales</span>
            <span aria-hidden="true">·</span>
            <span class="rounded bg-brand-600/30 px-2 py-0.5 font-semibold text-brand-200">V {{ product.version }}</span>
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <button v-if="tiers[0]" type="button" class="btn bg-brand-600 text-white hover:bg-brand-700" @click="addItem({ slug: product.slug, name: product.name, unitPrice: tiers[0].price, image: product.image, version: product.version, planId: tiers[0].id, planName: tiers[0].name })">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
              Add to Cart — ${{ tiers[0].price }}
            </button>
            <button type="button" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">
              <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              Live Demo
            </button>
          </div>
        </div>

        <div class="relative">
          <NuxtImg :src="product.image" :alt="`${product.name} preview`" :width="product.imageWidth" :height="product.imageHeight" sizes="100vw lg:560px" format="webp" loading="eager" fetchpriority="high" preload class="aspect-[3/2] w-full rounded-2xl bg-white/5 object-cover shadow-2xl" />
          <span v-if="product.badge" class="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-ink-900">{{ product.badge }}</span>
        </div>
      </div>
    </header>

    <!-- ===== BODY: sidebar + main ===== -->
    <div class="container-page grid gap-8 py-14 lg:grid-cols-[280px_1fr]">
      <!-- Sidebar -->
      <aside class="space-y-6 lg:sticky lg:top-20 lg:self-start">
        <section class="rounded-2xl border border-gray-100 border-l-4 border-l-brand-500 p-5 shadow-sm">
          <h2 class="flex items-center gap-2 font-display text-base font-bold text-ink-900">
            <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
            Suitable for Business
          </h2>
          <ul class="mt-4 space-y-2.5 text-sm text-gray-700">
            <li v-for="s in suitable" :key="s" class="flex items-center gap-2">
              <svg class="h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
              {{ s }}
            </li>
          </ul>
        </section>

        <section class="rounded-2xl border border-gray-100 border-l-4 border-l-brand-500 p-5 shadow-sm">
          <h2 class="flex items-center gap-2 font-display text-base font-bold text-ink-900">
            <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m8 9-3 3 3 3m8-6 3 3-3 3M13 6l-2 12" /></svg>
            Technology Stack
          </h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="t in tech" :key="t.name" class="rounded-full px-3.5 py-1.5 text-sm font-semibold" :class="t.tone">{{ t.name }}</li>
          </ul>
        </section>

        <!-- <section class="rounded-2xl border border-gray-100 border-l-4 border-l-brand-500 p-5 shadow-sm">
          <h2 class="flex items-center gap-2 font-display text-base font-bold text-ink-900">
            <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" /></svg>
            Product Info
          </h2>
          <dl class="mt-4 space-y-3 text-sm">
            <div v-for="row in productInfo" :key="row.label">
              <dt class="text-gray-500">{{ row.label }}</dt>
              <dd class="font-bold text-ink-900">{{ row.value }}</dd>
            </div>
          </dl>
        </section> -->
      </aside>

      <!-- Main -->
      <div class="min-w-0 space-y-16">
        <!-- Gallery -->
        <section aria-label="Product screenshots">
          <div class="flex flex-wrap gap-2 border-b border-gray-100 pb-3" role="tablist">
            <button
              v-for="tab in gallery"
              :key="tab.name"
              type="button"
              role="tab"
              :aria-selected="activeTab === tab.name"
              class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              :class="activeTab === tab.name ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30' : 'text-gray-500 hover:bg-gray-50'"
              @click="activeTab = tab.name"
            >
              <svg class="h-4 w-4" :fill="tab.name === 'All' ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in tab.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
              {{ tab.name }}
            </button>
          </div>
          <div class="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl bg-ink-900">
            <div v-for="tab in gallery" v-show="activeTab === tab.name" :key="tab.name" class="absolute inset-0">
              <button type="button" class="group/gal relative block h-full w-full" :aria-label="`View ${tab.name} screenshots`" @click="openLightbox(tab, 0)">
                <NuxtImg :src="tab.images[0].image" :alt="tab.images[0].alt || `${product.name} — ${tab.name} screenshot`" width="640" height="420" sizes="100vw sm:50vw lg:420px" format="webp" loading="lazy" class="h-full w-full object-cover opacity-90 transition duration-300 group-hover/gal:scale-[1.02] group-hover/gal:opacity-100" />
                <span class="absolute bottom-4 left-4 font-display font-bold text-white drop-shadow">{{ tab.label }}</span>
                <span v-if="tab.images.length > 1" class="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15l5-5 4 4 3-3 6 6" /></svg>
                  {{ tab.images.length }} screenshots
                </span>
                <span class="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition group-hover/gal:bg-black/25">
                  <span class="grid h-14 w-14 place-items-center rounded-full bg-white/90 opacity-0 shadow-lg transition group-hover/gal:opacity-100">
                    <svg class="h-6 w-6 text-ink-900" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="m21 21-4.3-4.3M11 8v6M8 11h6" /></svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <!-- Try It Live -->
        <section v-if="demoLinks.length" aria-labelledby="tryit-h" class="text-center">
          <h2 id="tryit-h" class="font-display text-3xl font-extrabold text-ink-900">Try It Live</h2>
          <p class="mt-2 text-gray-600">Experience the product with live demos and mobile apps</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a v-for="card in demoLinks" :key="card.title" :href="card.url || undefined" :target="card.url ? '_blank' : undefined" :rel="card.url ? 'noopener noreferrer' : undefined" :aria-disabled="!card.url" class="relative flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br p-6 text-white shadow-sm transition hover:shadow-lg" :class="[card.tone, !card.url && 'cursor-not-allowed opacity-60']">
              <span class="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">{{ card.badge }}</span>
              <span class="grid h-12 w-12 place-items-center rounded-xl bg-white/20" aria-hidden="true">
                <!-- Uploaded icon if set (and not broken), otherwise fall back to the type preset SVG -->
                <img v-if="card.icon && !brokenIcons.has(card.icon)" :src="card.icon" alt="" class="h-6 w-6 object-contain" @error="brokenIcons.add(card.icon)">
                <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in card.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
              </span>
              <span class="font-display text-base font-bold">{{ card.title }}</span>
              <span class="text-xs text-white/80">{{ card.subtitle }}</span>
            </a>
          </div>
        </section>

        <!-- Pricing -->
        <section aria-labelledby="pricing-h" class="text-center">
          <h2 id="pricing-h" class="font-display text-3xl font-extrabold text-ink-900">Lifetime License Plans</h2>
          <p class="mt-2 text-gray-600">One-time payment, lifetime access with no recurring fees</p>
          <div class="mt-10 grid items-stretch gap-6 text-left lg:grid-cols-3">
            <article
              v-for="tier in tiers"
              :key="tier.name"
              class="relative flex h-full flex-col rounded-2xl p-7 shadow-sm"
              :class="tier.popular ? 'bg-ink-900 text-white shadow-xl ring-1 ring-brand-500/40' : 'border border-gray-100 bg-white'"
            >
              <span v-if="tier.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Most Popular</span>
              <h3 class="text-center font-display text-2xl font-extrabold" :class="tier.popular ? 'text-white' : 'text-ink-900'">{{ tier.name }}</h3>
              <p class="text-center text-sm" :class="tier.popular ? 'text-gray-400' : 'text-gray-500'">{{ tier.blurb }}</p>
              <p class="mt-4 text-center">
                <span class="font-display text-4xl font-extrabold" :class="tier.popular ? 'text-brand-400' : 'text-ink-900'">${{ tier.price }}</span>
              </p>
              <p class="text-center text-sm text-emerald-500">one-time</p>
              <ul class="mt-6 space-y-3 border-t pt-6 text-sm" :class="tier.popular ? 'border-white/10' : 'border-gray-100'">
                <li v-for="perk in tier.perks" :key="perk" class="flex items-center gap-2" :class="tier.popular ? 'text-gray-200' : 'text-gray-700'">
                  <svg class="h-4 w-4 shrink-0" :class="tier.popular ? 'text-brand-400' : 'text-brand-600'" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z" clip-rule="evenodd" /></svg>
                  {{ perk }}
                </li>
              </ul>
              <div class="mt-auto pt-7">
                <button type="button" class="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold" :class="tier.popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'border border-gray-200 text-ink-800 hover:bg-gray-50'" @click="addItem({ slug: product.slug, name: product.name, unitPrice: tier.price, image: product.image, version: product.version, planId: tier.id, planName: tier.name })">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
                  {{ tier.popular ? 'Add to Cart' : 'Select & Add' }} - ${{ tier.price }}
                </button>
              </div>
            </article>
          </div>
          <p class="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-blue-100 bg-blue-50/70 px-6 py-5 text-center text-sm text-gray-600">
            <strong class="text-ink-900">30-Day Money Back Guarantee</strong>
            <span class="text-gray-300" aria-hidden="true">•</span> Lifetime Updates Included
            <!-- <span class="text-gray-300" aria-hidden="true">•</span> Free Installation Support -->
          </p>
        </section>

        <!-- Powerful Features -->
        <section aria-labelledby="features-h" class="text-center">
          <h2 id="features-h" class="font-display text-3xl font-extrabold text-ink-900">Powerful Features</h2>
          <p class="mt-2 text-gray-600">Everything you need to run a successful multi-vendor marketplace</p>
          <div class="mt-8 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            <article v-for="(f, i) in featureList" v-show="showAllFeatures || i < FEATURE_LIMIT" :key="f.title" class="rounded-2xl border border-gray-100 border-t-4 p-6 shadow-sm" :class="f.top">
              <div class="flex items-start gap-3">
                <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl" :class="f.icon" aria-hidden="true">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in f.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                </span>
                <div>
                  <h3 class="font-display text-base font-bold text-ink-900">{{ f.title }}</h3>
                  <p class="text-xs font-semibold" :class="f.subText">{{ f.subtitle }}</p>
                </div>
              </div>
              <p class="mt-3 text-sm text-gray-600">{{ f.desc }}</p>
            </article>
          </div>

          <!-- Reveal the remaining feature cards (only when there are more than 6). -->
          <button
            v-if="featureList.length > FEATURE_LIMIT"
            type="button"
            class="btn-outline mt-8 inline-flex items-center gap-2"
            :aria-expanded="showAllFeatures"
            @click="showAllFeatures = !showAllFeatures"
          >
            {{ showAllFeatures ? 'Show Less' : `Read More (${featureList.length - FEATURE_LIMIT} more)` }}
            <svg class="h-4 w-4 transition-transform duration-200" :class="showAllFeatures && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </section>

        <!-- Documentation & Resources -->
        <section aria-labelledby="docs-h" class="text-center">
          <h2 id="docs-h" class="font-display text-3xl font-extrabold text-ink-900">Documentation &amp; Resources</h2>
          <p class="mt-2 text-gray-600">Everything you need to get started and succeed</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <template v-for="d in docList" :key="d.title">
              <!-- FAQ card toggles the product FAQ panel below instead of navigating away. -->
              <button
                v-if="d.title === 'FAQ' && faqList.length"
                type="button"
                class="flex flex-col items-center gap-3 rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                :class="[d.card, showFaqs ? 'ring-2 ring-brand-500' : '']"
                :aria-expanded="showFaqs"
                aria-controls="product-faqs"
                @click="showFaqs = !showFaqs"
              >
                <span class="grid h-14 w-14 place-items-center rounded-full" :class="d.circle" aria-hidden="true">
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path v-for="p in d.paths" :key="p" stroke-linecap="round" stroke-linejoin="round" :d="p" /></svg>
                </span>
                <span class="font-display text-sm font-bold" :class="d.text">{{ d.title }}</span>
              </button>
              <a v-else :href="d.url" class="flex flex-col items-center gap-3 rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-md" :class="d.card">
                <span class="grid h-14 w-14 place-items-center rounded-full" :class="d.circle" aria-hidden="true">
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path v-for="p in d.paths" :key="p" stroke-linecap="round" stroke-linejoin="round" :d="p" /></svg>
                </span>
                <span class="font-display text-sm font-bold" :class="d.text">{{ d.title }}</span>
              </a>
            </template>
          </div>

          <!-- Product FAQ panel — in the DOM for SEO, revealed when the FAQ card is tapped. -->
          <div v-show="showFaqs" id="product-faqs" class="mx-auto mt-8 max-w-3xl space-y-3 text-left">
            <div v-for="(f, i) in faqList" :key="i" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p class="flex items-start gap-2 font-display font-bold text-ink-900">
                <span class="mt-0.5 shrink-0 font-extrabold text-brand-600" aria-hidden="true">Q.</span>
                <span>{{ f.question }}</span>
              </p>
              <p class="mt-2 pl-6 text-sm leading-relaxed text-gray-600">{{ f.answer }}</p>
            </div>
          </div>
        </section>

        <!-- Reviews -->
        <section aria-labelledby="rev-h">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="rev-h" class="font-display text-3xl font-extrabold text-ink-900">Customer Reviews</h2>
              <p class="mt-2 flex items-center gap-2 text-gray-600">
                <span class="flex items-center text-amber-500" aria-hidden="true">
                  <svg v-for="n in 5" :key="n" class="h-5 w-5" :class="n <= Math.round(product.rating) ? 'text-amber-500' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>
                </span>
                <span class="font-semibold text-ink-900">{{ Number(product.rating).toFixed(1) }}</span>
                <span class="text-gray-400">· {{ product.reviews }} review{{ product.reviews === 1 ? '' : 's' }}</span>
              </p>
            </div>
            <NuxtLink to="/dashboard/orders" class="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Purchased this? Review it from your orders →
            </NuxtLink>
          </div>

          <!-- Reviews list -->
          <ul v-if="reviewsList.length" class="mt-6 space-y-4">
            <li v-for="r in reviewsList" :key="r.id" class="rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div class="flex items-start gap-3">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 font-bold text-brand-700" aria-hidden="true">{{ r.author.charAt(0).toUpperCase() }}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <p class="text-sm font-semibold text-ink-900">{{ r.author }}</p>
                    <span class="text-xs text-gray-400">{{ r.when }}</span>
                  </div>
                  <span class="mt-1 flex items-center text-amber-500" aria-hidden="true">
                    <svg v-for="n in 5" :key="n" class="h-4 w-4" :class="n <= r.rating ? 'text-amber-500' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>
                  </span>
                  <p v-if="r.comment" class="mt-2 text-sm text-ink-700">{{ r.comment }}</p>
                </div>
              </div>
            </li>
          </ul>
          <p v-else class="mt-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">No reviews yet — be the first to review this product after your purchase.</p>
        </section>

        <!-- Questions & Answers -->
        <section aria-labelledby="qa-h">
          <h2 id="qa-h" class="font-display text-3xl font-extrabold text-ink-900">Questions &amp; Answers</h2>
          <p class="mt-2 text-gray-600">Ask anything about this product — anyone in the community can answer.</p>

          <form class="mt-6 rounded-2xl border border-gray-100 p-5 shadow-sm" @submit.prevent="postQuestion">
            <label for="qa-input" class="sr-only">Ask a question about this product</label>
            <textarea id="qa-input" v-model="newQuestion" rows="2" placeholder="Ask a question about this product..." class="w-full resize-none border-0 p-0 text-sm text-ink-800 placeholder-gray-400 focus:outline-none focus:ring-0" />
            <div class="mt-3 flex items-center justify-between gap-3">
              <p class="text-xs text-gray-400">Replies from the product author are marked <span class="font-semibold text-brand-600">Author</span>.</p>
              <button type="submit" :disabled="postingQuestion || !newQuestion.trim()" class="btn bg-brand-600 text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5Z" /></svg>
                {{ postingQuestion ? 'Posting…' : 'Post Question' }}
              </button>
            </div>
          </form>

          <ul class="mt-6 space-y-4">
            <li v-for="q in qa" :key="q.id ?? q.text" class="rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div class="flex items-start gap-3">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500" aria-hidden="true">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm"><span class="font-semibold text-ink-900">{{ q.user }}</span> <span class="text-gray-400">{{ q.when }}</span></p>
                  <p class="mt-2 text-sm text-ink-700">{{ q.text }}</p>

                  <!-- Answer thread -->
                  <ul v-if="q.answers.length" class="mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                    <li v-for="(a, ai) in q.answers" :key="ai" class="flex items-start gap-2.5">
                      <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold" :class="a.isAdmin ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-500'" aria-hidden="true">
                        <svg v-if="!a.isAdmin" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
                        <span v-else>A</span>
                      </span>
                      <div class="min-w-0">
                        <p class="flex flex-wrap items-center gap-x-2 text-sm">
                          <span class="font-semibold text-ink-900">{{ a.user }}</span>
                          <span v-if="a.isAdmin" class="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">Author</span>
                          <span class="text-xs text-gray-400">{{ a.when }}</span>
                        </p>
                        <p class="mt-1 text-sm text-gray-600">{{ a.body }}</p>
                      </div>
                    </li>
                  </ul>

                  <!-- Reply -->
                  <template v-if="q.id">
                    <button
                      type="button"
                      class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                      @click="replyOpen[q.id] = !replyOpen[q.id]"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8M8 8h8M8 16h4M4 19l1-3V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-3 3Z" /></svg>
                      {{ replyOpen[q.id] ? 'Cancel' : 'Answer this' }}
                    </button>

                    <form v-show="replyOpen[q.id]" class="mt-3 rounded-xl border border-gray-100 p-3" @submit.prevent="postAnswer(q.id)">
                      <textarea v-model="replyText[q.id]" rows="2" placeholder="Write your answer…" class="w-full resize-none border-0 p-0 text-sm text-ink-800 placeholder-gray-400 focus:outline-none focus:ring-0" />
                      <div class="mt-2 flex justify-end">
                        <button type="submit" :disabled="answering === q.id || !(replyText[q.id] || '').trim()" class="btn bg-brand-600 px-4 py-1.5 text-sm text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                          {{ answering === q.id ? 'Posting…' : 'Post Answer' }}
                        </button>
                      </div>
                    </form>
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Gallery lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          @click.self="closeLightbox"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <button type="button" class="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close" @click="closeLightbox">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          <button v-if="lightboxImages.length > 1" type="button" class="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6" aria-label="Previous" @click="prevImage">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" /></svg>
          </button>

          <figure class="flex max-h-full max-w-full flex-col items-center">
            <img :src="lightboxImages[lightboxIndex]?.image" :alt="lightboxImages[lightboxIndex]?.alt || 'Screenshot'" class="max-h-[82vh] max-w-[92vw] rounded-xl object-contain shadow-2xl">
            <figcaption class="mt-4 flex flex-col items-center gap-2 text-center text-white">
              <p v-if="lightboxImages[lightboxIndex]?.caption" class="max-w-lg text-sm text-white/90">{{ lightboxImages[lightboxIndex].caption }}</p>
              <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{{ lightboxIndex + 1 }} / {{ lightboxImages.length }}</span>
            </figcaption>
          </figure>

          <button v-if="lightboxImages.length > 1" type="button" class="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6" aria-label="Next" @click="nextImage">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>

<style scoped>
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.2s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
