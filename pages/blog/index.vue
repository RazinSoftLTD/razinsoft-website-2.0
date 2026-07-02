<script setup lang="ts">
const { $api } = useNuxtApp()

useSeoMeta({
  title: 'Insights & Updates — RazinSoft Blog',
  description: 'Explore expert tips, trends, and in-depth articles on web development, design, digital growth, and business innovation.',
})

// Live articles from the Laravel API.
const { data: res } = await useAsyncData('articles', () => $api<any>('/articles'))
const articles = computed<any[]>(() => res.value?.data ?? [])

const popularTags = ['AI', 'eCommerce', 'SaaS', 'Cloud', 'Mobile', 'Security', 'Analytics', 'Automation']

const route = useRoute()
const router = useRouter()

// Restore filters from the URL so reload / share / deep-link keeps them.
const search = ref((route.query.q as string) || '')
const activeCategory = ref((route.query.category as string) || 'All Posts')

// Filters → URL (replace = no extra history entry).
watch([search, activeCategory], ([q, c]) => {
  const query: Record<string, string> = {}
  if (q) query.q = q
  if (c && c !== 'All Posts') query.category = c
  router.replace({ query })
})

// URL → filters (deep-link / same-page navigation). Guards avoid a loop.
watch(() => route.query, (query) => {
  const q = (query.q as string) || ''
  if (q !== search.value) search.value = q
  const c = (query.category as string) || 'All Posts'
  if (c !== activeCategory.value) activeCategory.value = c
})

const categories = computed(() => {
  const counts: Record<string, number> = {}
  for (const a of articles.value) counts[a.category] = (counts[a.category] || 0) + 1
  return [
    { name: 'All Posts', count: articles.value.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, count })),
  ]
})

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return articles.value.filter((a) => {
    const matchesQuery
      = a.title.toLowerCase().includes(q)
      || a.excerpt.toLowerCase().includes(q)
      || a.tags.some((t) => t.toLowerCase().includes(q))
    const matchesCat = activeCategory.value === 'All Posts' || a.category === activeCategory.value
    return matchesQuery && matchesCat
  })
})

const featured = computed(() => articles.value.find((a) => a.featured))
const rest = computed(() => filtered.value.filter((a) => !a.featured))
const showFeatured = computed(() => featured.value && activeCategory.value === 'All Posts' && !search.value)
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <!-- Hero -->
    <div class="bg-gradient-to-br from-primary via-primary to-[#2563eb] text-white">
      <div class="container mx-auto px-6 py-20">
        <div class="mx-auto max-w-3xl text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></svg>
            <span class="text-sm font-semibold">RazinSoft Blog</span>
          </div>
          <h1 class="mb-6 text-5xl font-bold">Discover the Latest Insights</h1>
          <p class="text-xl leading-relaxed text-white/90">Explore expert tips, trends, and in-depth articles on web development, design, digital growth, and business innovation.</p>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="border-b border-border bg-white">
      <div class="container mx-auto px-6 py-6">
        <div class="mx-auto max-w-2xl">
          <div class="relative">
            <svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path stroke-linecap="round" d="m21 21-4.3-4.3" /></svg>
            <input v-model="search" type="text" placeholder="Search articles, topics, or tags..." class="w-full rounded-lg border border-border bg-white py-4 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-12">
      <div class="grid gap-8 lg:grid-cols-12">
        <!-- Sidebar -->
        <aside class="min-w-0 lg:col-span-3">
          <div class="sticky top-6 space-y-6">
            <div class="rounded-xl border border-border bg-white p-6">
              <h3 class="mb-4 flex items-center gap-2 font-bold text-foreground">
                <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
                Categories
              </h3>
              <div class="space-y-2">
                <button
                  v-for="c in categories"
                  :key="c.name"
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all"
                  :class="activeCategory === c.name ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'"
                  @click="activeCategory = c.name"
                >
                  <span class="text-sm font-medium">{{ c.name }}</span>
                  <span class="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold" :class="activeCategory === c.name ? 'bg-white/20 text-white' : 'border border-border text-muted-foreground'">{{ c.count }}</span>
                </button>
              </div>
            </div>

            <div class="rounded-xl border border-border bg-white p-6">
              <h3 class="mb-4 flex items-center gap-2 font-bold text-foreground">
                <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7 7h.01" /></svg>
                Popular Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                  :class="!search ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:bg-primary hover:text-primary-foreground'"
                  @click="search = ''"
                >
                  All
                </button>
                <button
                  v-for="t in popularTags"
                  :key="t"
                  type="button"
                  class="cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                  :class="search.toLowerCase() === t.toLowerCase() ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:bg-primary hover:text-primary-foreground'"
                  @click="search = t"
                >
                  {{ t }}
                </button>
              </div>
            </div>

            <div class="rounded-xl bg-gradient-to-br from-primary to-[#2563eb] p-6 text-white">
              <h3 class="mb-2 font-bold">Stay Updated</h3>
              <p class="mb-4 text-sm text-white/90">Get the latest articles delivered to your inbox.</p>
              <input type="email" placeholder="Your email" class="mb-3 w-full rounded-lg bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none">
              <button type="button" class="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-primary hover:bg-white/90">Subscribe</button>
            </div>
          </div>
        </aside>

        <!-- Main -->
        <main class="min-w-0 lg:col-span-9">
          <!-- Featured -->
          <div v-if="showFeatured && featured" class="mb-12">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-6 w-1 rounded-full bg-primary" />
              <h2 class="text-2xl font-bold text-foreground">Featured Article</h2>
            </div>
            <NuxtLink :to="`/blog/${featured.slug}`" class="group block cursor-pointer overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg">
              <div class="grid gap-0 md:grid-cols-2">
                <div class="relative h-80 overflow-hidden md:h-auto">
                  <img :src="featured.image" :alt="featured.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                  <span class="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{{ featured.category }}</span>
                </div>
                <div class="flex flex-col justify-center p-8">
                  <h3 class="mb-4 text-3xl font-bold text-foreground transition-colors group-hover:text-primary">{{ featured.title }}</h3>
                  <p class="mb-6 leading-relaxed text-muted-foreground">{{ featured.excerpt }}</p>
                  <div class="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path stroke-linecap="round" d="M4 20a8 8 0 0 1 16 0" /></svg>{{ featured.author }}</span>
                    <span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18" /></svg>{{ featured.date }}</span>
                    <span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" /></svg>{{ featured.readTime }}</span>
                  </div>
                  <span class="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Read Full Article
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Latest -->
          <div class="mb-8">
            <div class="mb-6 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-6 w-1 rounded-full bg-primary" />
                <h2 class="text-2xl font-bold text-foreground">{{ activeCategory === 'All Posts' ? 'Latest Articles' : activeCategory }}</h2>
              </div>
              <p class="text-sm text-muted-foreground">{{ filtered.length }} {{ filtered.length === 1 ? 'article' : 'articles' }} found</p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <NuxtLink
                v-for="a in rest"
                :key="a.id"
                :to="`/blog/${a.slug}`"
                class="group block cursor-pointer overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
              >
                <div class="relative h-56 overflow-hidden">
                  <img :src="a.image" :alt="a.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                  <span class="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{{ a.category }}</span>
                </div>
                <div class="p-6">
                  <h3 class="mb-3 line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">{{ a.title }}</h3>
                  <p class="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{{ a.excerpt }}</p>
                  <div class="mb-4 flex flex-wrap gap-2">
                    <span v-for="t in a.tags.slice(0, 2)" :key="t" class="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{{ t }}</span>
                  </div>
                  <div class="flex items-center justify-between border-t border-border pt-4">
                    <div class="flex items-center gap-3">
                      <img v-if="a.author_photo" :src="a.author_photo" :alt="a.author" class="h-8 w-8 rounded-full object-cover">
                      <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path stroke-linecap="round" d="M4 20a8 8 0 0 1 16 0" /></svg>
                      </div>
                      <div class="text-xs">
                        <p class="font-medium text-foreground">{{ a.author }}</p>
                        <p class="text-muted-foreground">{{ a.date }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-muted-foreground">
                      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" /></svg>
                      <span>{{ a.readTime }}</span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div v-if="filtered.length === 0" class="py-16 text-center">
              <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <svg class="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path stroke-linecap="round" d="m21 21-4.3-4.3" /></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold text-foreground">No articles found</h3>
              <p class="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-16 border-t border-border bg-white">
      <div class="container mx-auto px-6 py-12">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="mb-4 text-3xl font-bold text-foreground">Ready to Transform Your Business?</h2>
          <p class="mb-8 text-lg text-muted-foreground">Explore our software solutions and take your business to the next level.</p>
          <div class="flex items-center justify-center gap-4">
            <NuxtLink to="/products" class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-[#2563c9]">View Products
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </NuxtLink>
            <NuxtLink to="/#company" class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted">Contact Sales</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
