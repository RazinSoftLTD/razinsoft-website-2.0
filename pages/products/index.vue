<script setup lang="ts">
usePageSeo({
  title: 'All Products — Enterprise-Ready Software',
  description:
    'Browse RazinSoft’s catalogue of enterprise-ready software products — eCommerce, LMS, POS, ride-sharing and more. One-time purchase, lifetime license, source code included.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: 'Products', item: '/products' }] }),
])

// Live catalogue from the Laravel API (SSR).
const { data: products } = await useProducts()

// Categories derived from the live data (plus an "all" option).
const categories = computed(() => [
  'All Categories',
  ...Array.from(new Set((products.value ?? []).map((p) => p.category).filter(Boolean) as string[])),
])

const sorts = [
  { key: 'best', label: 'Best Match' },
  { key: 'sellers', label: 'Best Sellers' },
  { key: 'rated', label: 'Best Rated' },
  { key: 'free', label: 'Free' },
  { key: 'price', label: 'Price' },
]

const { addItem } = useCart()
const view = ref<'grid' | 'list'>('grid')
const sort = ref('best')
const category = ref('All Categories')
const search = ref('')

const filtered = computed(() => {
  let list = [...(products.value ?? [])]
  if (category.value !== 'All Categories') list = list.filter((p) => p.category === category.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(q))
  }
  switch (sort.value) {
    case 'sellers': list.sort((a, b) => b.sales - a.sales); break
    case 'rated': list.sort((a, b) => b.rating - a.rating); break
    case 'price': list.sort((a, b) => a.price - b.price); break
    case 'free': list = list.filter((p) => p.price === 0); break
  }
  return list
})

const badgeClass: Record<string, string> = {
  'Best Seller': 'bg-ink-900 text-amber-300',
  New: 'bg-emerald-600 text-white',
  Free: 'bg-brand-600 text-white',
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-12 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 56px 56px;" />
      <div class="container-page relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-300">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />One-Time Purchase · No Subscriptions
          </p>
          <h1 class="mt-3 font-display text-4xl font-extrabold sm:text-5xl">All <span class="text-brand-400">Products</span></h1>
          <p class="mt-2 text-gray-300">{{ products.length }} enterprise-ready platforms — pay once, own forever.</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label class="relative">
            <span class="sr-only">Search products</span>
            <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="m20 20-3-3" /></svg>
            <input v-model="search" type="search" placeholder="Search products..." class="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:border-brand-400 focus:outline-none sm:w-64" />
          </label>
        </div>
      </div>
    </header>

    <!-- Filter bar -->
    <div class="sticky top-16 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div class="container-page flex flex-wrap items-center gap-4 py-4">
        <div class="relative">
          <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
          <select v-model="category" aria-label="Filter by category" class="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-ink-800 focus:border-brand-500 focus:outline-none">
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
        </div>

        <div class="hidden h-6 w-px bg-gray-200 sm:block" />

        <div class="flex flex-wrap items-center gap-1">
          <button v-for="s in sorts" :key="s.key" type="button" class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition" :class="sort === s.key ? 'bg-ink-900 text-white' : 'text-gray-500 hover:bg-gray-50'" @click="sort = s.key">
            {{ s.label }}
            <svg v-if="s.key === 'price'" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" /></svg>
          </button>
        </div>

        <div class="ml-auto flex items-center gap-1 rounded-lg border border-gray-200 p-1">
          <button type="button" aria-label="Grid view" class="rounded p-1.5" :class="view === 'grid' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:text-gray-600'" @click="view = 'grid'">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
          </button>
          <button type="button" aria-label="List view" class="rounded p-1.5" :class="view === 'list' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:text-gray-600'" @click="view = 'list'">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="container-page py-10">
      <p v-if="!filtered.length" class="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
        No products match your filters.
      </p>

      <div v-else class="grid gap-6" :class="view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'">
        <article
          v-for="p in filtered"
          :key="p.slug"
          class="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
          :class="view === 'list' ? 'flex-col sm:flex-row' : 'flex-col'"
        >
          <NuxtLink :to="`/products/${p.slug}`" class="relative block shrink-0" :class="view === 'list' ? 'sm:w-72' : ''">
            <NuxtImg :src="p.image" :alt="`${p.name} — ${p.tagline}`" :width="p.imageWidth" :height="p.imageHeight" sizes="100vw sm:50vw lg:384px" format="webp" loading="lazy" class="h-44 w-full bg-gray-100 object-cover" :class="view === 'list' ? 'sm:h-full' : ''" />
            <span v-if="p.badge" class="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold" :class="badgeClass[p.badge]">{{ p.badge }}</span>
            <span class="absolute right-3 top-3 rounded-md bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-ink-900">V {{ p.version }}</span>
          </NuxtLink>

          <div class="flex flex-1 flex-col p-5">
            <h2 class="font-display text-base font-bold leading-snug text-ink-900">
              <NuxtLink :to="`/products/${p.slug}`" class="hover:text-brand-700">{{ p.name }} — {{ p.tagline }}</NuxtLink>
            </h2>

            <div class="mt-3 flex items-center justify-between gap-2">
              <p>
                <span class="text-xs text-gray-500">From</span>
                <span class="ml-1 font-display text-2xl font-extrabold text-ink-900">${{ p.price }}</span>
              </p>
              <span v-if="p.planName" class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{{ p.planName }}</span>
            </div>

            <div class="mt-3 flex items-center justify-between text-sm">
              <span class="flex items-center gap-1 font-semibold text-amber-600">
                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
                <span>{{ p.rating }}</span>
                <span class="font-normal text-gray-600">({{ p.reviews }} reviews)</span>
              </span>
              <span class="text-gray-600">{{ p.sales }} Sales</span>
            </div>

            <div class="mt-auto flex items-center gap-2 pt-5">
              <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gray-200 text-ink-700 hover:bg-gray-50" :aria-label="`Add ${p.name} to cart`" @click="addItem({ slug: p.slug, name: p.name, unitPrice: p.price, image: p.image, version: p.version, planId: p.planId ?? undefined, planName: p.planName ?? undefined })">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
              </button>
              <NuxtLink :to="`/products/${p.slug}`" class="btn-outline flex-1" :aria-label="`View ${p.name}`">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
                Live Preview
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
