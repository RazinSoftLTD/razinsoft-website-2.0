<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()

const open = ref(false)
const q = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const inputEl = ref<HTMLInputElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null
let sessionLogged = false // log only ONE committed term per search session (never per keystroke)

function openSearch() {
  open.value = true
  sessionLogged = false
  nextTick(() => inputEl.value?.focus())
}

// Fire-and-forget: record the final/committed term (Enter, result-click, or on close).
function logSearch(term: string, count: number) {
  const t = term.trim()
  if (t.length < 2 || sessionLogged) return
  sessionLogged = true
  $api('/search-log', { method: 'POST', body: { term: t, results_count: count, source: 'site' } }).catch(() => {})
}

function close() {
  logSearch(q.value, results.value.length) // capture abandoned searches too
  open.value = false
  q.value = ''
  results.value = []
}

// Live search across products AND blog articles (debounced).
watch(q, (val) => {
  if (timer) clearTimeout(timer)
  const term = val.trim()
  if (!term) { results.value = []; loading.value = false; return }
  loading.value = true
  timer = setTimeout(async () => {
    const enc = encodeURIComponent(term)
    try {
      const [prod, blog] = await Promise.all([
        $api<any>(`/products?search=${enc}&per_page=5`).catch(() => null),
        $api<any>(`/articles?search=${enc}&per_page=5`).catch(() => null),
      ])
      const products = (prod?.data ?? []).map((p: any) => ({ type: 'product', id: `p${p.id}`, to: `/products/${p.slug}`, title: p.name, subtitle: p.tagline, image: p.thumbnail, price: p.from_price }))
      const blogs = (blog?.data ?? []).map((a: any) => ({ type: 'blog', id: `b${a.id}`, to: `/blog/${a.slug}`, title: a.title, subtitle: a.category, image: a.image }))
      results.value = [...products, ...blogs]
    } catch {
      results.value = []
    } finally {
      loading.value = false
    }
  }, 250)
})

const productResults = computed(() => results.value.filter((r: any) => r.type === 'product'))
const blogResults = computed(() => results.value.filter((r: any) => r.type === 'blog'))

function submit() {
  const term = q.value.trim()
  if (!term) return
  logSearch(term, results.value.length)
  const dest = `/products?q=${encodeURIComponent(term)}`
  close()
  navigateTo(dest)
}

// Close on route change, Esc key; lock scroll when open.
watch(() => route.fullPath, close)
function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && open.value) close() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (import.meta.client) document.body.style.overflow = ''
})
watch(open, (o) => { if (import.meta.client) document.body.style.overflow = o ? 'hidden' : '' })
</script>

<template>
  <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50" aria-label="Search" @click="openSearch">
    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7.5" /><path stroke-linecap="round" d="m21 21-4.3-4.3" /></svg>
  </button>

  <Teleport to="body">
    <Transition name="search">
      <div v-if="open" class="fixed inset-0 z-[100] bg-black/50 p-4 pt-20 backdrop-blur-sm sm:pt-28" role="dialog" aria-modal="true" @click.self="close">
        <div class="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          <form class="flex items-center gap-3 border-b border-gray-100 px-5 py-4" @submit.prevent="submit">
            <svg class="h-5 w-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7.5" /><path stroke-linecap="round" d="m21 21-4.3-4.3" /></svg>
            <input ref="inputEl" v-model="q" type="text" placeholder="Search products & articles…" class="flex-1 bg-transparent text-base text-ink-900 placeholder-gray-400 focus:outline-none" autocomplete="off">
            <button type="button" class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-ink-700" aria-label="Close search" @click="close">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </form>

          <div class="max-h-[60vh] overflow-auto p-2">
            <p v-if="loading" class="px-4 py-6 text-center text-sm text-gray-400">Searching…</p>

            <template v-else-if="results.length">
              <!-- Products -->
              <div v-if="productResults.length" class="mb-1">
                <p class="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Products</p>
                <NuxtLink
                  v-for="r in productResults"
                  :key="r.id"
                  :to="r.to"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
                  @click="logSearch(q, results.length)"
                >
                  <img :src="r.image || '/images/products/placeholder.jpg'" :alt="r.title" class="h-12 w-12 shrink-0 rounded-lg bg-gray-100 object-cover">
                  <div class="min-w-0 flex-1">
                    <p class="truncate font-semibold text-ink-900">{{ r.title }}</p>
                    <p class="truncate text-xs text-gray-500">{{ r.subtitle }}</p>
                  </div>
                  <span v-if="r.price != null" class="shrink-0 text-sm font-bold text-brand-600">${{ r.price }}</span>
                  <span class="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600">Product</span>
                </NuxtLink>
              </div>

              <!-- Articles -->
              <div v-if="blogResults.length">
                <p class="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Blog articles</p>
                <NuxtLink
                  v-for="r in blogResults"
                  :key="r.id"
                  :to="r.to"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
                  @click="logSearch(q, results.length)"
                >
                  <img :src="r.image || '/images/blog/blog-1.jpg'" :alt="r.title" class="h-12 w-12 shrink-0 rounded-lg bg-gray-100 object-cover">
                  <div class="min-w-0 flex-1">
                    <p class="truncate font-semibold text-ink-900">{{ r.title }}</p>
                    <p class="truncate text-xs text-gray-500">{{ r.subtitle }}</p>
                  </div>
                  <span class="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">Blog</span>
                </NuxtLink>
              </div>

              <button type="button" class="mt-1 w-full rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-brand-600 transition hover:bg-brand-50" @click="submit">
                See all products for “{{ q.trim() }}”
              </button>
            </template>

            <p v-else-if="q.trim()" class="px-4 py-8 text-center text-sm text-gray-400">Nothing found for “{{ q.trim() }}”.</p>
            <p v-else class="px-4 py-8 text-center text-sm text-gray-400">Start typing to search products & articles…</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
}
</style>
