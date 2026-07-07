<script setup lang="ts">
const route = useRoute()
const { $api } = useNuxtApp()
const slug = route.params.slug as string

// Live article + related from the Laravel API.
const { data: res, error } = await useAsyncData(`article-${slug}`, () => $api<any>(`/articles/${slug}`))
if (error.value || !res.value?.data) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}
const article = computed<any>(() => res.value!.data)
const related = computed<any[]>(() => res.value?.related ?? [])
const products = computed<any[]>(() => article.value?.products ?? [])
const hasProducts = computed(() => products.value.length > 0)

const siteUrl = (useRuntimeConfig().public.siteUrl as string || '').replace(/\/$/, '')
const metaTitle = computed(() => article.value.seo?.title || article.value.title)
const metaDesc = computed(() => article.value.seo?.description || article.value.excerpt)
const ogImage = computed(() => article.value.image || undefined)
const canonical = computed(() => `${siteUrl}/blog/${slug}`)

useSeoMeta({
  title: () => `${metaTitle.value} — RazinSoft Blog`,
  description: () => metaDesc.value,
  keywords: () => article.value.seo?.keywords || undefined,
  // Open Graph
  ogType: 'article',
  ogTitle: () => metaTitle.value,
  ogDescription: () => metaDesc.value,
  ogImage: () => ogImage.value,
  ogImageAlt: () => article.value.image_alt || metaTitle.value,
  ogUrl: () => canonical.value,
  ogSiteName: 'RazinSoft',
  articleAuthor: () => article.value.author || undefined,
  articlePublishedTime: () => article.value.date || undefined,
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: () => metaTitle.value,
  twitterDescription: () => metaDesc.value,
  twitterImage: () => ogImage.value,
})
useHead({ link: [{ rel: 'canonical', href: () => canonical.value }] })

// Article / BlogPosting structured data for rich results.
useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: () => article.value.title,
    description: () => metaDesc.value,
    image: () => ogImage.value,
    datePublished: () => article.value.date_iso || undefined,
    author: () => (article.value.author ? { '@type': 'Person', name: article.value.author } : { '@type': 'Organization', name: 'RazinSoft' }),
    articleSection: () => article.value.category || undefined,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Blog', item: '/blog' },
      { name: () => article.value.title, item: () => canonical.value },
    ],
  }),
])

const shareOpen = ref(false)
const helpful = ref<boolean | null>(null)

// Follow → subscribe by email (stored in the admin subscriber list). $api declared above.
const followOpen = ref(false)
const following = ref(false)
const email = ref('')
const subscribing = ref(false)
const subError = ref('')

async function subscribe() {
  if (!email.value || subscribing.value) return
  subscribing.value = true
  subError.value = ''
  try {
    await $api('/subscribe', { method: 'POST', body: { email: email.value, source: 'blog', article: article.value.title } })
    following.value = true
    followOpen.value = false
  } catch {
    subError.value = 'Could not subscribe. Please try again.'
  } finally {
    subscribing.value = false
  }
}

function share(kind: string) {
  shareOpen.value = false
  if (!import.meta.client) return
  const url = window.location.href
  const text = article.value.title
  const links: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  }
  if (kind === 'copy') {
    navigator.clipboard?.writeText(url)
    return
  }
  window.open(links[kind], '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <article>
      <!-- Header -->
      <div class="border-b border-border bg-white">
        <div class="container mx-auto px-6 py-6">
          <NuxtLink to="/blog" class="-ml-2 mb-8 inline-flex items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6-6 6 6 6" /></svg>
            Back to Blog
          </NuxtLink>
          <div class="mx-auto max-w-4xl">
            <span class="mb-5 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{{ article.category }}</span>
            <h1 class="mb-6 text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">{{ article.title }}</h1>
            <p class="mb-10 text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">{{ article.excerpt }}</p>
            <div class="flex flex-wrap items-center justify-between gap-6 pb-8">
              <div class="flex items-center gap-4">
                <img v-if="article.author_photo" :src="article.author_photo" :alt="article.author" class="h-14 w-14 rounded-full object-cover">
                <div v-else class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                  <svg class="h-7 w-7 text-primary-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path stroke-linecap="round" d="M4 20a8 8 0 0 1 16 0" /></svg>
                </div>
                <div>
                  <p class="text-base font-bold text-foreground">{{ article.author }}</p>
                  <div class="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span class="flex items-center gap-1.5"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18" /></svg>{{ article.date }}</span>
                    <span class="text-border">•</span>
                    <span class="flex items-center gap-1.5"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" /></svg>{{ article.readTime }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="relative">
                  <button type="button" class="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors" :class="following ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:bg-muted'" @click="!following && (followOpen = !followOpen)">
                    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
                    {{ following ? 'Following' : 'Follow' }}
                  </button>
                  <div v-if="followOpen && !following" class="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-border bg-white p-4 shadow-lg">
                    <p class="text-sm font-semibold text-foreground">Follow for new posts</p>
                    <p class="mb-3 mt-0.5 text-xs text-muted-foreground">Get an email when we publish new articles.</p>
                    <form class="space-y-2" @submit.prevent="subscribe">
                      <input v-model="email" type="email" required placeholder="you@email.com" class="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none">
                      <button type="submit" :disabled="subscribing" class="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">{{ subscribing ? 'Subscribing…' : 'Subscribe' }}</button>
                      <p v-if="subError" class="text-xs text-red-500">{{ subError }}</p>
                    </form>
                  </div>
                </div>
                <div class="relative">
                  <button type="button" class="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted" @click="shareOpen = !shareOpen">
                    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path stroke-linecap="round" d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>
                    Share
                  </button>
                  <div v-if="shareOpen" class="absolute right-0 top-full z-10 mt-2 w-56 rounded-lg border border-border bg-white p-2 shadow-lg">
                    <button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted" @click="share('twitter')"><svg class="h-4 w-4 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg><span class="text-sm">Share on X</span></button>
                    <button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted" @click="share('linkedin')"><svg class="h-4 w-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg><span class="text-sm">Share on LinkedIn</span></button>
                    <button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted" @click="share('facebook')"><svg class="h-4 w-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg><span class="text-sm">Share on Facebook</span></button>
                    <button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted" @click="share('email')"><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path stroke-linecap="round" d="m3 7 9 6 9-6" /></svg><span class="text-sm">Share via Email</span></button>
                    <div class="my-2 border-t border-border" />
                    <button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted" @click="share('copy')"><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path stroke-linecap="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg><span class="text-sm">Copy Link</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-6 py-12">
        <div class="mx-auto max-w-5xl">
          <div class="relative mb-16 h-96 w-full overflow-hidden rounded-2xl shadow-lg md:h-[520px]">
            <img :src="article.image" :alt="article.image_alt || article.title" class="h-full w-full object-cover">
          </div>

          <div :class="hasProducts ? 'grid gap-12 lg:grid-cols-12' : ''">
            <!-- Sidebar: attached products (replaces author/stats/share). Hidden when none → article goes full width. -->
            <aside v-if="hasProducts" class="order-2 lg:order-1 lg:col-span-3">
              <div class="space-y-4 lg:sticky lg:top-6">
                <div class="flex items-center gap-2">
                  <div class="h-5 w-1 rounded-full bg-primary" />
                  <h3 class="text-sm font-bold text-foreground">In this article</h3>
                </div>
                <NuxtLink
                  v-for="p in products"
                  :key="p.id"
                  :to="`/products/${p.slug}`"
                  class="group block overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-md"
                >
                  <div class="relative h-32 overflow-hidden bg-muted">
                    <img v-if="p.image" :src="p.image" :alt="p.name" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                    <span v-if="p.badge" class="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground">{{ p.badge }}</span>
                  </div>
                  <div class="p-4">
                    <h4 class="line-clamp-1 font-bold text-foreground transition-colors group-hover:text-primary">{{ p.name }}</h4>
                    <p v-if="p.tagline" class="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{{ p.tagline }}</p>
                    <div class="mt-3 flex items-center justify-between">
                      <span v-if="p.price" class="text-sm font-bold text-foreground">From ${{ p.price }}</span>
                      <span class="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-1.5">View
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                      </span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </aside>

            <!-- Content -->
            <main :class="hasProducts ? 'order-1 lg:order-2 lg:col-span-9' : ''">
              <!-- Rich HTML content from the editor -->
              <div class="article-content max-w-none" v-html="article.content" />

              <!-- Pull-quote -->
              <div v-if="article.quote" class="my-10 rounded-r-xl border-l-4 border-primary bg-primary/5 py-6 pl-6 pr-6">
                <svg class="mb-3 h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Zm8 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Z" /></svg>
                <p class="text-lg font-medium italic leading-relaxed text-foreground md:text-xl">"{{ article.quote }}"</p>
              </div>

              <!-- Key Takeaways -->
              <div v-if="article.takeaways?.length" class="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/[0.03] to-transparent p-8">
                <div class="mb-6 flex items-start gap-4">
                  <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <svg class="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7 7h.01" /></svg>
                  </div>
                  <div>
                    <h3 class="mb-2 text-xl font-bold text-foreground">Key Takeaways</h3>
                    <p class="text-sm text-muted-foreground">Important insights from this article</p>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li v-for="(t, i) in article.takeaways" :key="i" class="flex items-start gap-3">
                    <div class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <span class="text-xs font-bold text-primary">{{ i + 1 }}</span>
                    </div>
                    <p class="leading-relaxed text-foreground/90">{{ t }}</p>
                  </li>
                </ul>
              </div>

              <!-- Tagged Topics -->
              <div class="mt-10 border-t border-border pt-8">
                <div class="mb-5 flex items-center gap-2">
                  <div class="h-6 w-1 rounded-full bg-primary" />
                  <h3 class="text-xl font-bold text-foreground">Tagged Topics</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in article.tags" :key="t" class="cursor-pointer rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">{{ t }}</span>
                </div>
              </div>

              <!-- Was this helpful -->
              <div class="mt-10 rounded-xl border border-border bg-white p-6">
                <div class="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 class="mb-1 font-bold text-foreground">Was this article helpful?</h3>
                    <p class="text-sm text-muted-foreground">Your feedback helps us improve our content</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors" :class="helpful === true ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'" @click="helpful = true">
                      <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm0 0 4-8a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1.2 6a2 2 0 0 1-2 1.7H7" /></svg>Yes
                    </button>
                    <button type="button" class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors" :class="helpful === false ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'" @click="helpful = false">
                      <svg class="mr-2 h-4 w-4 rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm0 0 4-8a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1.2 6a2 2 0 0 1-2 1.7H7" /></svg>No
                    </button>
                  </div>
                </div>
                <div v-if="helpful !== null" class="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p class="text-sm font-medium text-primary">{{ helpful ? "Thank you for your feedback! We're glad you found this helpful." : "Thank you for your feedback. We'll work to improve our content." }}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <!-- Related -->
      <div v-if="related.length" class="border-t border-border bg-white py-20">
        <div class="container mx-auto px-6">
          <div class="mx-auto max-w-6xl">
            <div class="mb-12 text-center">
              <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7 7h.01" /></svg>
                <span class="text-sm font-semibold text-primary">Continue Reading</span>
              </div>
              <h2 class="mb-3 text-3xl font-bold text-foreground md:text-4xl">Related Articles</h2>
              <p class="text-lg text-muted-foreground">Explore more insights on {{ article.category }}</p>
            </div>
            <div class="grid gap-8 md:grid-cols-3">
              <NuxtLink
                v-for="r in related"
                :key="r.id"
                :to="`/blog/${r.slug}`"
                class="group block cursor-pointer overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div class="relative h-56 overflow-hidden">
                  <img :src="r.image" :alt="r.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                  <span class="absolute left-4 top-4 rounded-full border-0 bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-md">{{ r.category }}</span>
                </div>
                <div class="p-6">
                  <h3 class="mb-3 line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{{ r.title }}</h3>
                  <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{{ r.excerpt }}</p>
                  <div class="flex items-center justify-between border-t border-border pt-4">
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" /></svg>
                      <span>{{ r.readTime }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                      <span>Read More</span>
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* Typography for the rich HTML article body (:deep so it hits v-html output). */
.article-content :deep(p) {
  margin-bottom: 1.5rem;
  font-size: 1.0625rem;
  line-height: 1.85;
  color: rgb(37 37 37 / 0.9);
}
.article-content :deep(p:first-of-type)::first-letter {
  float: left;
  margin-right: 0.75rem;
  margin-top: 0.35rem;
  font-size: 3.25rem;
  font-weight: 700;
  line-height: 1;
  color: #3382e8;
}
.article-content :deep(h2) {
  margin: 2.25rem 0 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #252525;
}
.article-content :deep(h3) {
  margin: 1.75rem 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #252525;
}
.article-content :deep(a) {
  color: #3382e8;
  text-decoration: underline;
}
.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 1.5rem 1.5rem;
  list-style: revert;
}
.article-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}
.article-content :deep(blockquote) {
  margin: 1.75rem 0;
  border-left: 4px solid #3382e8;
  background: rgb(51 130 232 / 0.05);
  padding: 1rem 1.25rem;
  font-style: italic;
  color: #252525;
  border-radius: 0 0.5rem 0.5rem 0;
}
.article-content :deep(img) {
  margin: 1.75rem auto;
  border-radius: 0.75rem;
  max-width: 100%;
  height: auto;
}
/* Tables from the editor — visible borders, header shading, and horizontal scroll on small screens. */
.article-content :deep(table) {
  margin: 1.75rem 0;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  display: block;
  overflow-x: auto;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
}
.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid #e4e4e7;
  padding: 0.625rem 0.875rem;
  text-align: left;
  vertical-align: top;
}
.article-content :deep(th) {
  background: #f8fafc;
  font-weight: 700;
  color: #111827;
}
.article-content :deep(tbody tr:nth-child(even)) {
  background: #fbfcfe;
}
/* Extra headings from the editor (H1 + H4–H6). */
.article-content :deep(h1) {
  margin: 2.5rem 0 1.25rem;
  font-size: 2.15rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.15;
}
.article-content :deep(h4) {
  margin: 1.5rem 0 0.65rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #252525;
}
.article-content :deep(h5) {
  margin: 1.35rem 0 0.6rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: #252525;
}
.article-content :deep(h6) {
  margin: 1.25rem 0 0.55rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #52525b;
}
/* Quill class-based formats (font family, alignment, size) so the article renders as edited. */
.article-content :deep(.ql-font-serif) { font-family: Georgia, 'Times New Roman', serif; }
.article-content :deep(.ql-font-monospace) { font-family: Menlo, Consolas, monospace; }
.article-content :deep(.ql-font-arial) { font-family: Arial, Helvetica, sans-serif; }
.article-content :deep(.ql-font-georgia) { font-family: Georgia, serif; }
.article-content :deep(.ql-font-tahoma) { font-family: Tahoma, Geneva, sans-serif; }
.article-content :deep(.ql-font-verdana) { font-family: Verdana, Geneva, sans-serif; }
.article-content :deep(.ql-font-times) { font-family: 'Times New Roman', Times, serif; }
.article-content :deep(.ql-font-courier) { font-family: 'Courier New', Courier, monospace; }
.article-content :deep(.ql-align-center) { text-align: center; }
.article-content :deep(.ql-align-right) { text-align: right; }
.article-content :deep(.ql-align-justify) { text-align: justify; }
.article-content :deep(.ql-size-small) { font-size: 0.85em; }
.article-content :deep(.ql-size-large) { font-size: 1.4em; }
.article-content :deep(.ql-size-huge) { font-size: 2em; }
/* Code blocks from the editor. */
.article-content :deep(pre.ql-syntax),
.article-content :deep(pre) {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background: #1e293b;
  color: #e2e8f0;
  font-family: Menlo, Consolas, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
}
</style>
