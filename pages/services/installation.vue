<script setup lang="ts">
// Public Installation Plans page — dynamic products + per-product comparison matrix,
// managed from admin (Products › Installation Plans).
type Feature = { id: number; label: string }
type Plan = { id: number; name: string; tagline: string | null; price: number; sale_price: number | null; note: string | null; is_popular: boolean; feature_ids: number[] }
type Product = { id: number; name: string; slug: string; thumbnail: string | null; currency: string; features: Feature[]; plans: Plan[] }

const { $api } = useNuxtApp()
const { data } = await useAsyncData('installation-plans', () => $api<{ products: Product[] }>('/installation-plans'))
const products = computed(() => data.value?.products ?? [])

const { addItem } = useCart()
const router = useRouter()
function buyPlan(product: Product, plan: Plan) {
  addItem({
    slug: product.slug,
    name: `${product.name} — Installation`,
    unitPrice: plan.sale_price ?? plan.price,
    image: product.thumbnail ?? undefined,
    installationPlanId: plan.id,
    installationPlanName: plan.name,
  })
  router.push('/cart')
}

const activeId = ref<number | null>(null)
watchEffect(() => { if (activeId.value === null && products.value.length) activeId.value = products.value[0].id })
const active = computed(() => products.value.find(p => p.id === activeId.value) ?? null)

const money = (n: number, cur = 'USD') => (cur === 'USD' ? '$' : cur + ' ') + Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })

// Fall back to initials when a product thumbnail fails to load.
const brokenThumbs = ref<Set<number>>(new Set())
const onThumbError = (id: number) => { brokenThumbs.value = new Set(brokenThumbs.value).add(id) }

// "Why buy" — RazinSoft's own take.
const reasons = [
  { n: '01', title: 'Built by the makers', desc: 'The same engineers who built the product install it — no guesswork, no third parties.', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'm9.5 12 1.8 1.8L15 10'] },
  { n: '02', title: 'Fixed price, no surprises', desc: 'Transparent plans with everything listed up front. What you see is what you pay.', paths: ['M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'] },
  { n: '03', title: 'Full setup to publish', desc: 'Server, gateways, apps and store publishing — we handle the whole journey to live.', paths: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8'] },
  { n: '04', title: 'Quality assured', desc: 'Every flow tested and verified before handover — delivered with 100% QA.', paths: ['M9 12l2 2 4-4', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'] },
  { n: '05', title: 'Your data stays safe', desc: 'Secure handling of credentials and robust protocols throughout the setup.', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'M12 8v4', 'M12 15.5h.01'] },
  { n: '06', title: 'Real people, real support', desc: 'A dedicated manager and support team on standby — not a ticket black hole.', paths: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z'] },
]

const steps = [
  { title: 'Buy a license', desc: 'Purchase the product license first, then pick an installation plan.' },
  { title: 'Share access', desc: 'Send us your server and store credentials securely.' },
  { title: 'We set it all up', desc: 'Install, configure, brand and integrate everything.' },
  { title: 'Go live', desc: 'We test every flow and hand you a live, working product.' },
]

useSeoMeta({
  title: 'Installation Plans — Expert Setup & Configuration | RazinSoft',
  description: 'Choose an installation plan for your RazinSoft product. Our engineers install, configure, brand and publish your web admin, apps and website — done right, the first time.',
})
</script>

<template>
  <div class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-6 top-6 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.06] sm:text-[20rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 text-center lg:py-20">
        <p class="text-sm font-bold uppercase tracking-widest text-brand-600">Service</p>
        <h1 class="mx-auto mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Installation <span class="text-brand-600">Plans</span>
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Purchase your product license first, then let our experts install and configure everything for a seamless launch.
        </p>
      </div>
    </section>

    <div class="container-page pb-20">
      <template v-if="products.length && active">
        <!-- Product selector -->
        <p class="mb-4 text-center text-sm font-semibold text-gray-500">Select your product</p>
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="p in products" :key="p.id" type="button" @click="activeId = p.id"
            class="group inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-bold transition"
            :class="p.id === activeId ? 'border-brand-400 bg-brand-50 text-brand-700 ring-1 ring-brand-200 shadow-sm' : 'border-gray-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-gray-50'"
          >
            <img v-if="p.thumbnail && !brokenThumbs.has(p.id)" :src="p.thumbnail" :alt="p.name" class="h-7 w-7 rounded-lg object-cover" @error="onThumbError(p.id)">
            <span v-else class="grid h-7 w-7 place-items-center rounded-lg text-[11px] font-bold" :class="p.id === activeId ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-500'">{{ p.name.slice(0, 2) }}</span>
            {{ p.name }}
          </button>
        </div>

        <!-- Comparison table — premium look; pt-8 padding gives the badge room without clipping -->
        <div class="mt-12 overflow-x-auto px-1 pt-8">
          <table class="w-full min-w-[760px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th class="w-1/3 rounded-tl-[1.75rem] border-b-2 border-gray-100 bg-white px-6 pb-6 pt-7 text-left align-bottom">
                  <span class="font-display text-xl font-extrabold text-ink-900">Features</span>
                  <p class="mt-1 text-xs font-normal text-gray-400">Everything included in each plan</p>
                </th>
                <th
                  v-for="(plan, i) in active.plans" :key="plan.id"
                  class="relative px-6 pb-6 pt-7 text-center align-bottom"
                  :class="[
                    plan.is_popular ? 'rounded-t-2xl text-white shadow-xl shadow-brand-500/25' : 'border-b-2 border-gray-100 bg-white',
                    i === active.plans.length - 1 && !plan.is_popular ? 'rounded-tr-[1.75rem]' : '',
                  ]"
                  :style="plan.is_popular ? 'background-image: linear-gradient(160deg, #6366f1, #2563eb);' : ''"
                >
                  <!-- Badge pokes above the column into the container's top padding — visible, not clipped -->
                  <span v-if="plan.is_popular" class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-ink-900 shadow-lg shadow-amber-500/30 ring-4 ring-white">★ Most Popular</span>
                  <p class="font-display text-xl font-extrabold" :class="plan.is_popular ? 'text-white' : 'text-ink-900'">{{ plan.name }}</p>
                  <p class="mt-0.5 text-xs" :class="plan.is_popular ? 'text-white/80' : 'text-gray-500'">{{ plan.tagline }}</p>
                  <p class="mt-4 flex items-baseline justify-center gap-1.5">
                    <span v-if="plan.sale_price != null" class="text-sm line-through" :class="plan.is_popular ? 'text-white/60' : 'text-gray-300'">{{ money(plan.price, active.currency) }}</span>
                    <span class="font-display text-3xl font-black" :class="plan.is_popular ? 'text-white' : 'text-brand-700'">{{ money(plan.sale_price ?? plan.price, active.currency) }}</span>
                  </p>
                  <p v-if="plan.note" class="mt-1 text-[11px]" :class="plan.is_popular ? 'text-white/80' : 'text-gray-400'">{{ plan.note }}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(feature, ri) in active.features" :key="feature.id" class="transition">
                <td class="px-6 py-3.5 text-sm font-medium text-ink-800" :class="ri % 2 ? 'bg-gray-50/70' : 'bg-white'">{{ feature.label }}</td>
                <td
                  v-for="plan in active.plans" :key="plan.id"
                  class="px-6 py-3.5 text-center"
                  :class="plan.is_popular ? 'bg-brand-50/70' : (ri % 2 ? 'bg-gray-50/70' : 'bg-white')"
                >
                  <span v-if="plan.feature_ids.includes(feature.id)" class="mx-auto grid h-6 w-6 place-items-center rounded-full shadow-sm" :class="plan.is_popular ? 'bg-brand-600 text-white' : 'bg-emerald-500 text-white'">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
                  </span>
                  <span v-else class="mx-auto grid h-6 w-6 place-items-center rounded-full bg-gray-100 text-gray-300">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 12h12"/></svg>
                  </span>
                </td>
              </tr>
              <!-- CTA row -->
              <tr>
                <td class="rounded-bl-[1.75rem] border-t border-gray-100 bg-white px-6 py-6"></td>
                <td
                  v-for="(plan, i) in active.plans" :key="plan.id"
                  class="border-t border-gray-100 px-4 py-6 text-center"
                  :class="[plan.is_popular ? 'bg-brand-50/70' : 'bg-white', i === active.plans.length - 1 ? 'rounded-br-[1.75rem]' : '']"
                >
                  <button type="button" @click="buyPlan(active, plan)"
                          class="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition"
                          :class="plan.is_popular ? 'text-white shadow-brand-500/30 hover:brightness-110' : 'border border-brand-200 bg-white text-brand-700 hover:bg-brand-50'"
                          :style="plan.is_popular ? 'background-image: linear-gradient(135deg, #6366f1, #2563eb);' : ''">
                    Buy Now
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
          <svg class="h-4 w-4 text-brand-500" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          You must purchase a product license first before buying an installation plan.
        </p>
      </template>

      <!-- Empty state -->
      <div v-else class="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
        <p class="text-lg font-bold text-ink-900">Installation plans coming soon</p>
        <p class="mt-1 text-sm text-gray-500">Meanwhile, <NuxtLink to="/contact-us" class="font-semibold text-brand-600 hover:underline">contact us</NuxtLink> for a custom installation quote.</p>
      </div>

      <!-- Why buy -->
      <section class="mt-16">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Why RazinSoft</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900">Why Should You Buy Our Installation Plans?</h2>
          <p class="mx-auto mt-3 max-w-xl text-gray-600">We ensure a neat installation and configuration for a seamless operation — handled end to end by the people who built the product.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="r in reasons" :key="r.n" class="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <span class="absolute right-5 top-5 font-display text-3xl font-black text-brand-600/10">{{ r.n }}</span>
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in r.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ r.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-600">{{ r.desc }}</p>
          </article>
        </div>
      </section>

      <!-- How it works -->
      <section class="mt-16 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">How it works</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900">From license to live in 4 steps</h2>
        </div>
        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(s, i) in steps" :key="s.title" class="text-center">
            <span class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white">{{ i + 1 }}</span>
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ s.title }}</h3>
            <p class="mt-1.5 text-sm text-gray-600">{{ s.desc }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="mt-16">
        <h2 class="text-center font-display text-3xl font-extrabold text-ink-900">Frequently asked questions</h2>
        <div class="mx-auto mt-8 max-w-3xl space-y-3">
          <details v-for="(f, i) in [
            { q: 'Do I need to buy the product license separately?', a: 'Yes. Installation plans cover the setup and configuration service only — you must own a valid product license first.' },
            { q: 'How long does installation take?', a: 'Most installations are completed within 3–7 working days after we receive your server access, depending on the plan.' },
            { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can start with Basic and upgrade any time — you only pay the difference.' },
            { q: 'What if something breaks after installation?', a: 'Every plan includes post-install support. Higher plans add premium priority support and revisions.' },
          ]" :key="i" class="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <summary class="flex cursor-pointer items-center justify-between font-semibold text-ink-900">
              {{ f.q }}
              <svg class="h-5 w-5 shrink-0 text-gray-400 transition group-open:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m6 9 6 6 6-6" /></svg>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">{{ f.a }}</p>
          </details>
        </div>
      </section>

      <!-- CTA -->
      <div class="mt-16 overflow-hidden rounded-2xl p-8 text-center shadow-sm sm:p-12" style="background-image: linear-gradient(to right, #1d4ed8, #2563eb);">
        <h2 class="font-display text-2xl font-extrabold text-white sm:text-3xl">Choose a plan and launch your business now!</h2>
        <p class="mx-auto mt-2 max-w-xl text-white/85">Not sure which plan fits? Tell us about your project and we'll recommend the right one.</p>
        <NuxtLink to="/contact-us" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-gray-100">
          Talk to Us
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
