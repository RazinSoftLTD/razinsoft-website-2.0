<script setup lang="ts">
/** `accent` is the item's own colour, used for the hover wash, underline and title tint. */
type MenuItem = { title: string; desc: string; to: string; icon: string[]; tone: string; arrow: string; accent: string }
/** Services opens as a wide panel with its own intro and a talk-to-us column; Company stays a list. */
type NavItem = {
  label: string; to?: string; caret?: boolean; menu?: MenuItem[]
  wide?: boolean
  /** Products build their rows from the live catalogue rather than a hard-coded list. */
  products?: boolean
  intro?: { eyebrow: string; title: string; accent: string }
  aside?: { eyebrow: string; title: string; desc: string; cta: string; ctaTo: string; stats: { value: string; label: string; tone: string; icon: string[] }[] }
}

const nav: NavItem[] = [
  {
    label: 'Products',
    caret: true,
    wide: true,
    products: true,
    intro: {
      eyebrow: 'Our Products',
      title: 'Ready to Launch.',
      accent: 'Built to Scale.',
    },
  },
  {
    label: 'Services',
    caret: true,
    wide: true,
    intro: {
      eyebrow: 'Our Services',
      title: 'Complete Services.',
      accent: 'Lasting Impact.',
    },
    aside: {
      eyebrow: "Let's talk",
      title: 'Have a project in mind?',
      desc: 'Our experts will help you find the right fit.',
      cta: 'Book a Free Consultation',
      ctaTo: '/book-a-meeting',
      stats: [
        { value: '25+', label: 'Countries Served', tone: 'bg-blue-50 text-blue-600', icon: ['M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Z', 'M2.5 12h19', 'M12 2.5c2.5 2.6 2.5 16.4 0 19', 'M12 2.5c-2.5 2.6-2.5 16.4 0 19'] },
        { value: '3100+', label: 'Happy Clients', tone: 'bg-emerald-50 text-emerald-600', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
        { value: '99.9%', label: 'Uptime & Reliability', tone: 'bg-purple-50 text-purple-600', icon: ['M12 2.5 4 6v6c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5V6l-8-3.5Z', 'm9 12 2 2 4-4'] },
      ],
    },
    menu: [
      { title: 'Installation', desc: 'Set up and running, fast and secure.', to: '/services/installation', tone: 'bg-blue-50 text-blue-600', arrow: 'text-blue-500', icon: ['M12 3v9', 'm8.5 8.5 3.5 3.5 3.5-3.5', 'M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3'], accent: '#3b82f6' },
      { title: 'Custom Development', desc: 'Features and workflows built around your business.', to: '/services/customization', tone: 'bg-emerald-50 text-emerald-600', arrow: 'text-emerald-500', icon: ['m9 8-4 4 4 4', 'm15 8 4 4-4 4', 'm13 5-2 14'], accent: '#10b981' },
      { title: 'Maintenance & Support', desc: 'Updates and support that keep things running.', to: '/services/maintenance', tone: 'bg-orange-50 text-orange-600', arrow: 'text-orange-500', icon: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z'], accent: '#f97316' },
      { title: 'Dedicated Team', desc: 'Developers who extend your team and ship faster.', to: '/contact-us', tone: 'bg-purple-50 text-purple-600', arrow: 'text-purple-500', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'], accent: '#a855f7' },
      { title: 'Cloud Deployment', desc: 'Scalable, secure hosting for your application.', to: '/contact-us', tone: 'bg-sky-50 text-sky-600', arrow: 'text-sky-500', icon: ['M12 13v8', 'm8 17 4-4 4 4', 'M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2'], accent: '#0ea5e9' },
      { title: 'AI Business Automation', desc: 'Automate the manual work and grow with AI.', to: '/services/ai-business-automation', tone: 'bg-violet-50 text-violet-600', arrow: 'text-violet-500', icon: ['m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z', 'm18.5 14.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z'], accent: '#8b5cf6' },
    ],
  },
  {
    label: 'Company',
    caret: true,
    menu: [
      { title: 'About Us', desc: 'Learn more about our journey and values.', to: '/about-us', tone: 'bg-blue-50 text-blue-600', arrow: 'text-blue-500', icon: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 11v5', 'M12 7.5h.01'], accent: '#3b82f6' },
      // Hidden for now — may be re-enabled later:
      // { title: 'Contact Us', desc: 'Get in touch — we reply within 24 hours.', to: '/contact-us', tone: 'bg-sky-50 text-sky-600', arrow: 'text-sky-500', icon: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6 8.5-6'] },
      { title: 'Life@RazinSoft', desc: 'Explore our life, culture and workplace.', to: '/life-at-razinsoft', tone: 'bg-brand-50 text-brand-600', arrow: 'text-brand-500', icon: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'], accent: '#3b66f5' },
      { title: 'Careers', desc: 'Join our team and build your future.', to: '/careers', tone: 'bg-purple-50 text-purple-600', arrow: 'text-purple-500', icon: ['M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z', 'M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M3 13h18'], accent: '#a855f7' },
      { title: 'Blog', desc: 'Read our latest news and insights.', to: '/blog', tone: 'bg-orange-50 text-orange-600', arrow: 'text-orange-500', icon: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'], accent: '#f97316' },
      { title: 'Support', desc: 'Get help and support from our team.', to: '/support', tone: 'bg-rose-50 text-rose-600', arrow: 'text-rose-500', icon: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', 'M18 17a4 4 0 0 1-4 3h-2'], accent: '#f43f5e' },
    ],
  },
  { label: 'Contact Us', to: '/contact-us', caret: false },
]

const open = ref(false)
const mobileSub = ref<string | null>(null)
const openDropdown = ref<string | null>(null) // desktop mega-menu (JS-controlled so it closes on click)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false; mobileSub.value = null; openDropdown.value = null })

// Live catalogue for the Products panel. Same useAsyncData key as the catalogue page, so the two
// share one request rather than each fetching the list. Not awaited: the header is a component, and
// suspending it would hold up every page's render for a menu nobody has opened yet — the list fills
// in reactively instead.
const { data: allProducts } = useProducts()

/**
 * The offer rail, from real data only.
 *
 * The headline percentage is the deepest discount actually running, and the countdown is the
 * soonest of those offers' own end dates. When nothing is on offer the whole rail is hidden rather
 * than showing an invented sale.
 */
const offer = computed(() => {
  const discounted = (allProducts.value ?? []).filter((p) => p.percentOff)
  if (!discounted.length) return null

  const ends = discounted
    .map((p) => p.offerEndsAt)
    .filter(Boolean)
    .map((d) => new Date(d as string).getTime())
    .filter((t) => Number.isFinite(t) && t > Date.now())
    .sort((a, b) => a - b)[0]

  return {
    percent: Math.max(...discounted.map((p) => p.percentOff ?? 0)),
    count: discounted.length,
    endsAt: ends ?? null,
  }
})

// Ticks only while an offer with a deadline is running, and only in the browser.
const now = ref(Date.now())
let tick: ReturnType<typeof setInterval> | null = null
onMounted(() => { tick = setInterval(() => (now.value = Date.now()), 1000) })
onBeforeUnmount(() => { if (tick) clearInterval(tick) })

const countdown = computed(() => {
  const end = offer.value?.endsAt
  if (!end) return null
  const left = Math.max(0, end - now.value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    { value: pad(Math.floor(left / 86400000)), label: 'Days' },
    { value: pad(Math.floor(left / 3600000) % 24), label: 'Hours' },
    { value: pad(Math.floor(left / 60000) % 60), label: 'Mins' },
    { value: pad(Math.floor(left / 1000) % 60), label: 'Secs' },
  ]
})

/** Claims the product pages already make — not new marketing written for this menu. */
const offerPoints = [
  { title: 'Lifetime License', desc: 'One-time payment', tone: 'bg-blue-50 text-blue-600', icon: ['M12 2.5 4 6v6c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5V6l-8-3.5Z', 'm9 12 2 2 4-4'] },
  { title: 'Free Updates', desc: 'Included with every licence', tone: 'bg-emerald-50 text-emerald-600', icon: ['M20 11a8 8 0 1 0-2.3 5.7', 'M20 5v6h-6'] },
  { title: 'Source Code Included', desc: 'Extend it the day you buy', tone: 'bg-violet-50 text-violet-600', icon: ['m9 8-4 4 4 4', 'm15 8 4 4-4 4', 'm13 5-2 14'] },
]

/** Rows in the panel, in the order they are read. Upcoming goes last — it is the only one you
 *  cannot buy yet, so it belongs after everything that is for sale. */
const productRows = computed(() => {
  const all = allProducts.value ?? []
  const upcoming = all.filter((p) => p.badgeKey === 'upcoming')
  const sellable = all.filter((p) => p.badgeKey !== 'upcoming')

  return [
    {
      key: 'best',
      label: 'Best Selling',
      tone: 'text-amber-600',
      dot: 'bg-amber-400',
      // Whatever the admin flagged, then the rest by sales — so the row is never short.
      items: [
        ...sellable.filter((p) => p.badgeKey === 'best_seller'),
        ...sellable.filter((p) => p.badgeKey !== 'best_seller').sort((a, b) => b.sales - a.sales),
      ].slice(0, 6),
    },
    {
      key: 'new',
      label: 'New',
      tone: 'text-emerald-600',
      dot: 'bg-emerald-400',
      items: sellable.filter((p) => p.badgeKey === 'new').slice(0, 4),
    },
    {
      key: 'upcoming',
      label: 'Coming Soon',
      tone: 'text-violet-600',
      dot: 'bg-violet-400',
      items: upcoming.slice(0, 4),
    },
  ].filter((row) => row.items.length)
})

const { count } = useCart()
const { user, isLoggedIn, fetchMe } = useAuth()
const loggedIn = isLoggedIn
onMounted(() => {
  if (isLoggedIn.value && !user.value) fetchMe()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2" aria-label="RazinSoft home">
        <!-- Brand logo (shrinks on ultra-narrow phones so the header never overflows). -->
        <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" class="h-8 w-auto max-[379px]:h-6">
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <template v-for="item in nav" :key="item.label">
          <!-- Item with mega-dropdown (JS-controlled: opens on hover, closes on click/leave) -->
          <div
            v-if="item.menu || item.products"
            class="relative"
            @mouseenter="openDropdown = item.label"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              :class="openDropdown === item.label ? 'text-brand-600' : 'text-ink-700'"
              @click="openDropdown = openDropdown === item.label ? null : item.label"
            >
              {{ item.label }}
              <svg class="h-4 w-4 transition-transform duration-200" :class="openDropdown === item.label ? 'rotate-180 text-brand-500' : 'text-gray-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
            </button>

            <!-- Panel (pt-3 bridges the hover gap) -->
            <div
              class="menu-panel z-50 -translate-x-1/2 pt-3"
              :class="[
                // Wide panels are centred on the page, not on their button: anchored to the button
                // they hang off the left edge, because Services sits left of centre. top-16 matches
                // the header's h-16.
                item.wide
                  ? 'menu-panel-wide fixed left-1/2 top-16 w-[min(64rem,calc(100vw-2rem))]'
                  : 'absolute left-1/2 top-full w-[600px]',
                openDropdown === item.label ? 'is-open' : '',
              ]"
            >
              <!-- Products: the Services shell, but a two-column layout — catalogue on the left,
                   what is on offer on the right. -->
              <div v-if="item.products" class="relative max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
                <div class="grid lg:grid-cols-[1fr_19rem]">
                  <div class="min-w-0">
                    <!-- Intro band -->
                    <div v-if="item.intro" class="relative overflow-hidden bg-gradient-to-r from-brand-50/70 via-white to-white px-6 pb-5 pt-6">
                      <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">{{ item.intro.eyebrow }}</p>
                      <span class="mt-1.5 block h-0.5 w-7 rounded bg-brand-600" aria-hidden="true" />
                      <h3 class="mt-2.5 text-xl font-extrabold leading-tight text-ink-900">
                        {{ item.intro.title }}<br><span class="text-brand-600">{{ item.intro.accent }}</span>
                      </h3>
                      <p class="mt-2 max-w-xs text-xs leading-relaxed text-gray-500">
                        {{ (allProducts ?? []).length }} enterprise-ready platforms — pay once, own forever.
                      </p>

                      <!-- Real thumbnails rather than a drawing: the one thing this menu can show
                           that an illustration cannot. -->
                      <div class="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex">
                        <div class="flex -space-x-4">
                          <NuxtImg
                            v-for="p in (allProducts ?? []).slice(0, 4)"
                            :key="p.slug"
                            :src="p.image" :alt="p.name" width="192" height="128" format="webp" loading="lazy"
                            class="h-12 w-16 rounded-lg border-2 border-white bg-gray-100 object-cover shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Groups -->
                    <div class="space-y-5 px-6 pb-6 pt-1">
                      <section v-for="row in productRows" :key="row.key">
                        <div class="mb-2.5 flex items-center gap-2">
                          <span class="h-1.5 w-1.5 rounded-full" :class="row.dot" aria-hidden="true" />
                          <h4 class="text-[11px] font-bold uppercase tracking-[0.15em]" :class="row.tone">{{ row.label }}</h4>
                          <span class="h-px flex-1 bg-gray-100" aria-hidden="true" />
                        </div>

                        <div class="grid auto-rows-fr gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                          <component
                            :is="row.key === 'upcoming' ? 'div' : resolveComponent('NuxtLink')"
                            v-for="(p, idx) in row.items"
                            :key="p.slug"
                            v-bind="row.key === 'upcoming' ? {} : { to: `/products/${p.slug}` }"
                            class="menu-card group/card flex h-full items-stretch gap-3 rounded-xl border border-gray-100 p-2.5"
                            :class="row.key === 'upcoming' ? 'cursor-default opacity-70' : ''"
                            :style="{ '--i': idx, '--accent': '#3b66f5' }"
                            @click="row.key === 'upcoming' ? null : (openDropdown = null)"
                          >
                            <span class="relative shrink-0">
                              <NuxtImg :src="p.image" :alt="p.name" width="192" height="128" format="webp" loading="lazy" class="h-12 w-16 rounded-lg bg-gray-100 object-cover" />
                              <span v-if="p.badge && row.key !== 'best'" class="absolute -left-1 -top-1 rounded bg-ink-900 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">{{ p.badge }}</span>
                            </span>
                            <span class="flex min-w-0 flex-1 flex-col">
                              <!-- No `block` alongside line-clamp: both set display, and which one
                                   wins depends on CSS order, not the order they are written here. -->
                              <span class="menu-title line-clamp-2 text-sm font-bold leading-snug text-ink-900">{{ p.name }}</span>
                              <span class="mt-0.5 line-clamp-2 text-[11px] leading-snug text-gray-500">{{ p.tagline }}</span>
                              <span class="mt-auto flex items-center justify-between gap-2 pt-1.5">
                                <span class="text-[11px] font-bold" :class="row.key === 'upcoming' ? 'text-gray-400' : 'text-brand-600'">
                                  <template v-if="row.key === 'upcoming'">Coming soon</template>
                                  <template v-else>From ${{ p.salePrice ?? p.price }}</template>
                                </span>
                                <svg v-if="row.key !== 'upcoming'" class="menu-arrow h-3.5 w-3.5 text-brand-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                              </span>
                            </span>
                          </component>
                        </div>
                      </section>
                    </div>
                  </div>

                  <!-- Offer rail. Shown only when something is genuinely discounted. -->
                  <aside class="hidden flex-col gap-3 border-l border-gray-100 bg-gray-50/60 p-5 lg:flex">
                    <div v-if="offer" class="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50 to-white p-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700">
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" /></svg>
                        Limited time offer
                      </span>
                      <p class="mt-3 text-sm font-semibold text-ink-900">Save up to</p>
                      <p class="text-4xl font-extrabold leading-none text-orange-600">{{ offer.percent }}% OFF</p>
                      <p class="mt-2 text-xs text-gray-500">On {{ offer.count }} {{ offer.count === 1 ? 'product' : 'products' }} right now.</p>

                      <ul class="mt-4 space-y-2.5">
                        <li v-for="pt in offerPoints" :key="pt.title" class="flex items-center gap-2.5">
                          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg" :class="pt.tone" aria-hidden="true">
                            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24"><path v-for="d in pt.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                          </span>
                          <span class="min-w-0">
                            <span class="block truncate text-xs font-bold text-ink-900">{{ pt.title }}</span>
                            <span class="block truncate text-[10px] text-gray-500">{{ pt.desc }}</span>
                          </span>
                        </li>
                      </ul>

                      <ClientOnly>
                        <div v-if="countdown" class="mt-4">
                          <p class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">Offer ends in</p>
                          <div class="grid grid-cols-4 gap-1.5">
                            <div v-for="c in countdown" :key="c.label" class="rounded-lg bg-white px-1 py-1.5 text-center ring-1 ring-orange-100">
                              <p class="text-sm font-extrabold leading-none text-ink-900">{{ c.value }}</p>
                              <p class="mt-0.5 text-[9px] text-gray-400">{{ c.label }}</p>
                            </div>
                          </div>
                        </div>
                      </ClientOnly>

                      <NuxtLink to="/products" class="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600" @click="openDropdown = null">
                        View all offers
                        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                      </NuxtLink>
                    </div>

                    <div class="rounded-2xl border border-gray-100 bg-white p-4">
                      <h4 class="text-sm font-bold text-ink-900">Need a custom solution?</h4>
                      <p class="mt-1 text-xs leading-relaxed text-gray-500">Our team can build something that fits your business exactly.</p>
                      <NuxtLink to="/contact-us" class="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100" @click="openDropdown = null">
                        Request a quote
                        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                      </NuxtLink>
                    </div>

                    <NuxtLink to="/products" class="mt-auto flex items-center justify-between rounded-xl bg-ink-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-ink-800" @click="openDropdown = null">
                      All {{ (allProducts ?? []).length }} products
                      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                    </NuxtLink>
                  </aside>
                </div>
              </div>

              <!-- Wide panel: services as cards, with the intro and a talk-to-us column beside them -->
              <div v-else-if="item.wide" class="relative max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
                <div class="grid lg:grid-cols-[1fr_auto]">
                  <div class="min-w-0">
                    <!-- Intro band -->
                    <div v-if="item.intro" class="relative overflow-hidden bg-gradient-to-r from-brand-50/70 via-white to-white px-6 pb-5 pt-6">
                      <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">{{ item.intro.eyebrow }}</p>
                      <span class="mt-1.5 block h-0.5 w-7 rounded bg-brand-600" aria-hidden="true" />
                      <h3 class="mt-2.5 text-xl font-extrabold leading-tight text-ink-900">
                        {{ item.intro.title }}<br><span class="text-brand-600">{{ item.intro.accent }}</span>
                      </h3>

                      <!-- Decorative: a cube with orbiting service marks. Inline so it needs no asset. -->
                      <svg class="pointer-events-none absolute right-5 top-1/2 hidden h-24 w-44 -translate-y-1/2 lg:block" viewBox="0 0 220 130" fill="none" aria-hidden="true">
                        <ellipse cx="110" cy="66" rx="82" ry="40" stroke="#dbeafe" stroke-dasharray="4 5" />
                        <path d="M110 40l26 15v30l-26 15-26-15V55l26-15Z" fill="#bfdbfe" fill-opacity=".55" />
                        <path d="M110 40l26 15-26 15-26-15 26-15Z" fill="#3b82f6" fill-opacity=".75" />
                        <g>
                          <circle cx="36" cy="46" r="15" fill="#fff" stroke="#e5edff" />
                          <path d="M30 48a4 4 0 0 1 .5-8 6 6 0 0 1 11 1 3.8 3.8 0 0 1-.5 7H30Z" fill="#3b82f6" />
                          <circle cx="186" cy="40" r="15" fill="#fff" stroke="#e5edff" />
                          <path d="M186 33l6 2.5v4c0 3.7-2.5 6.4-6 7-3.5-.6-6-3.3-6-7v-4l6-2.5Z" fill="#10b981" />
                          <circle cx="30" cy="98" r="15" fill="#fff" stroke="#e5edff" />
                          <rect x="24" y="97" width="3.4" height="6" rx="1" fill="#10b981" /><rect x="28.6" y="93" width="3.4" height="10" rx="1" fill="#10b981" /><rect x="33.2" y="89" width="3.4" height="14" rx="1" fill="#10b981" />
                          <circle cx="190" cy="96" r="15" fill="#fff" stroke="#e5edff" />
                          <circle cx="190" cy="96" r="4" fill="#3b82f6" /><path d="M190 88v3M190 101v3M182 96h3M195 96h3" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" />
                        </g>
                      </svg>
                    </div>

                    <!-- Service cards -->
                    <div class="grid gap-3 px-6 pb-6 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                      <NuxtLink
                        v-for="(m, idx) in item.menu"
                        :key="m.title"
                        :to="m.to"
                        class="menu-card group/card flex flex-col rounded-xl border border-gray-100 p-4"
                        :style="{ '--i': idx, '--accent': m.accent }"
                        @click="openDropdown = null"
                      >
                        <span class="flex items-center gap-3">
                          <span class="menu-icon grid h-10 w-10 shrink-0 place-items-center rounded-lg" :class="m.tone" aria-hidden="true">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                          </span>
                          <span class="menu-title text-sm font-bold leading-snug text-ink-900">{{ m.title }}</span>
                        </span>
                        <span class="mt-2.5 line-clamp-2 block flex-1 text-xs leading-relaxed text-gray-500">{{ m.desc }}</span>
                        <span class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" :class="m.arrow">
                          Learn More
                          <svg class="menu-arrow h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                        </span>
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- Talk to us -->
                  <div v-if="item.aside" class="hidden w-60 flex-col border-l border-gray-100 px-5 py-6 lg:flex">
                    <span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2ZM18 17a4 4 0 0 1-4 3h-2" /></svg>
                    </span>
                    <p class="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">{{ item.aside.eyebrow }}</p>
                    <h3 class="mt-1.5 text-base font-extrabold leading-snug text-ink-900">{{ item.aside.title }}</h3>
                    <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">{{ item.aside.desc }}</p>

                    <NuxtLink
                      :to="item.aside.ctaTo"
                      class="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-800"
                      @click="openDropdown = null"
                    >
                      {{ item.aside.cta }}
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                    </NuxtLink>

                    <div class="mt-5 space-y-3 border-t border-gray-100 pt-5">
                      <div v-for="st in item.aside.stats" :key="st.label" class="flex items-center gap-3">
                        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full" :class="st.tone" aria-hidden="true">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in st.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                        </span>
                        <span>
                          <span class="block text-sm font-extrabold leading-none text-brand-700">{{ st.value }}</span>
                          <span class="mt-0.5 block text-[11px] text-gray-500">{{ st.label }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/60">
                <span class="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl-sm border-l border-t border-gray-100 bg-white" aria-hidden="true" />
                <NuxtLink
                  v-for="(m, idx) in item.menu"
                  :key="m.title"
                  :to="m.to"
                  class="menu-card menu-row group/row flex items-center gap-4 px-4 py-4"
                  :class="[idx === 0 ? 'rounded-t-xl' : '', idx === item.menu.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100']"
                  :style="{ '--i': idx, '--accent': m.accent }"
                  @click="openDropdown = null"
                >
                  <span class="menu-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl" :class="m.tone" aria-hidden="true">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="menu-title block font-bold text-ink-900">{{ m.title }}</span>
                    <span class="block text-sm text-gray-500">{{ m.desc }}</span>
                  </span>
                  <svg class="menu-arrow h-5 w-5 shrink-0" :class="m.arrow" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Plain link -->
          <NuxtLink
            v-else
            :to="item.to!"
            class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50 hover:text-ink-900"
          >
            {{ item.label }}
            <svg v-if="item.caret" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Search -->
        <AppSearch />

        <!-- Book a meeting CTA (desktop) -->
        <!-- <NuxtLink to="/book-a-meeting" class="hidden rounded-xl border border-brand-600 px-3.5 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white lg:inline-flex">
          Book a Meeting
        </NuxtLink> -->

        <!-- Cart — always available -->
        <NuxtLink to="/cart" class="relative rounded-lg p-2 text-ink-700 hover:bg-gray-50" :aria-label="`View cart, ${count} items`">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" />
          </svg>
          <ClientOnly>
            <span v-if="count" class="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{{ count }}</span>
          </ClientOnly>
        </NuxtLink>

        <ClientOnly>
          <!-- The signed-in user's own photo, falling back to initials and then the generic icon.
               `user` is shared state, so uploading a new one on the profile page updates this
               without a reload. -->
          <NuxtLink v-if="loggedIn" to="/dashboard" class="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-brand-600 text-white hover:bg-brand-700" :aria-label="user?.name ? `${user.name} — go to your dashboard` : 'Go to your dashboard'">
            <img v-if="user?.photo" :src="user.photo" :alt="user.name || 'Profile photo'" class="h-full w-full object-cover">
            <span v-else-if="user?.initials" class="text-sm font-bold">{{ user.initials }}</span>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <NuxtLink v-else to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <template #fallback>
            <NuxtLink to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
            </NuxtLink>
          </template>
        </ClientOnly>
        <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50 lg:hidden" :aria-expanded="open" aria-controls="mobile-menu" aria-label="Toggle menu" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu — smooth expand/collapse via grid-rows + fade -->
    <div
      class="grid overflow-hidden transition-all duration-300 ease-out lg:hidden"
      :class="open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <nav id="mobile-menu" :inert="!open" class="min-h-0 overflow-hidden border-t border-gray-100 bg-white" aria-label="Mobile">
        <ul class="container-page space-y-1 py-3">
          <li
            v-for="(item, i) in nav"
            :key="item.label"
            class="transition-all duration-300 ease-out"
            :class="open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'"
            :style="{ transitionDelay: open ? `${i * 40 + 60}ms` : '0ms' }"
          >
            <!-- Collapsible group -->
            <template v-if="item.products">
              <button type="button" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50" @click="mobileSub = mobileSub === item.label ? null : item.label">
                {{ item.label }}
                <svg class="h-4 w-4 text-gray-400 transition-transform duration-200" :class="mobileSub === item.label ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
              </button>
              <div class="grid overflow-hidden transition-all duration-300 ease-out" :class="mobileSub === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <div class="min-h-0 overflow-hidden pl-2">
                  <div v-for="row in productRows" :key="row.key" class="mt-1.5">
                    <p class="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]" :class="row.tone">{{ row.label }}</p>
                    <ul class="space-y-0.5">
                      <li v-for="p in row.items" :key="p.slug">
                        <component
                          :is="row.key === 'upcoming' ? 'div' : resolveComponent('NuxtLink')"
                          v-bind="row.key === 'upcoming' ? {} : { to: `/products/${p.slug}` }"
                          class="flex items-center gap-3 rounded-lg px-3 py-2.5"
                          :class="row.key === 'upcoming' ? 'opacity-70' : 'hover:bg-gray-50'"
                        >
                          <NuxtImg :src="p.image" :alt="p.name" width="192" height="128" format="webp" loading="lazy" class="h-9 w-14 shrink-0 rounded-lg bg-gray-100 object-cover" />
                          <span class="min-w-0">
                            <span class="block truncate text-sm font-semibold text-ink-900">{{ p.name }}</span>
                            <span class="block text-xs text-gray-500">{{ row.key === 'upcoming' ? 'Coming soon' : `From $${p.salePrice ?? p.price}` }}</span>
                          </span>
                        </component>
                      </li>
                    </ul>
                  </div>
                  <NuxtLink to="/products" class="mt-2 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-bold text-ink-900">
                    All {{ (allProducts ?? []).length }} products
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                  </NuxtLink>
                </div>
              </div>
            </template>

            <template v-else-if="item.menu">
              <button type="button" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50" @click="mobileSub = mobileSub === item.label ? null : item.label">
                {{ item.label }}
                <svg class="h-4 w-4 text-gray-400 transition-transform duration-200" :class="mobileSub === item.label ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
              </button>
              <div class="grid overflow-hidden transition-all duration-300 ease-out" :class="mobileSub === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <ul class="min-h-0 space-y-0.5 overflow-hidden pl-2">
                  <li v-for="m in item.menu" :key="m.title">
                    <NuxtLink :to="m.to" class="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50">
                      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg" :class="m.tone" aria-hidden="true">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                      </span>
                      <span>
                        <span class="block text-sm font-semibold text-ink-900">{{ m.title }}</span>
                        <span class="block text-xs text-gray-500">{{ m.desc }}</span>
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </template>

            <!-- Plain link -->
            <NuxtLink v-else :to="item.to!" class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Opening reads as the panel dropping out of the header, so it grows from its top edge rather
   than fading in place. Closing is quicker — waiting for a menu to leave feels like lag. */
.menu-panel {
  visibility: hidden;
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(.98);
  transform-origin: top center;
  transition: opacity .14s ease, transform .14s ease, visibility 0s linear .14s;
}
.menu-panel.is-open {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  transition: opacity .22s ease, transform .28s cubic-bezier(.2, .8, .2, 1), visibility 0s;
}

/* Cards arrive just behind the panel, one after another — enough to feel deliberate, not slow.
   A keyframe rather than a transition: the panel is hidden between openings, and a transition from
   a never-rendered state does not reliably run, so the second visit would show no stagger at all.
   `backwards` holds the card at its starting point through the delay. */
.is-open .menu-card {
  animation: menu-card-in .3s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(60ms + var(--i) * 35ms);
}
@keyframes menu-card-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* The wide panel is pinned to the header's bottom edge, while its button stops 14px short of it.
   Crossing that strip of bare header put the pointer outside the trigger, so the menu shut and
   reopened the moment it reached the panel — one visible blink on the way in. This bridges the
   strip with hit area only, leaving the panel where it is. It rides on the panel, so it exists
   only while the menu is open; the narrow panels sit directly under their button and need none. */
.menu-panel-wide::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 14px;
}

/* Each item answers in its own colour rather than all of them going the same grey: --accent is
   set per item in the data, and drives the wash, the underline and the title. */
.menu-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-color: rgb(243 244 246);
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s ease, border-color .25s ease;
}
.menu-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%);
  opacity: 0;
  transition: opacity .3s ease;
}
/* The underline sweeps in from the left, so the eye is pulled towards the Learn More, not away. */
.menu-card::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1);
}
.menu-card:hover,
.menu-card:focus-visible {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--accent) 55%, transparent);
}
.menu-card:hover::before,
.menu-card:focus-visible::before { opacity: 1; }
.menu-card:hover::after,
.menu-card:focus-visible::after { transform: scaleX(1); }

/* The list rows sit flush against each other, so they slide sideways instead of lifting. */
.menu-row:hover,
.menu-row:focus-visible {
  transform: translateX(4px);
  border-color: rgb(243 244 246);
  box-shadow: none;
}

/* The icon overshoots slightly on the way in — a chip that merely scales reads as a hover state,
   one that springs reads as a thing responding. */
.menu-icon {
  transition: transform .35s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s ease;
}
.menu-card:hover .menu-icon,
.menu-card:focus-visible .menu-icon {
  transform: scale(1.12) rotate(-6deg);
  box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--accent) 70%, transparent);
}

.menu-title { transition: color .25s ease; }
.menu-card:hover .menu-title,
.menu-card:focus-visible .menu-title { color: var(--accent); }

.menu-arrow { transition: transform .3s cubic-bezier(.2, .8, .2, 1); }
.menu-card:hover .menu-arrow,
.menu-card:focus-visible .menu-arrow { transform: translateX(5px); }

/* Anyone who has asked for less motion gets the panel appearing, and nothing moving. */
@media (prefers-reduced-motion: reduce) {
  .menu-panel,
  .menu-panel.is-open {
    transition-duration: .01ms;
    transform: translateX(-50%);
  }
  .is-open .menu-card { animation: none; }
  .menu-card,
  .menu-card:hover,
  .menu-card:focus-visible,
  .menu-icon,
  .menu-card:hover .menu-icon,
  .menu-arrow,
  .menu-card:hover .menu-arrow {
    transform: none;
    transition-duration: .01ms;
  }
}
</style>
