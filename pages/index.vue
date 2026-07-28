<script setup lang="ts">
usePageSeo({
  title: 'SmartDesk — CRM, HRM, Projects, WhatsApp & Email in one business hub',
  description:
    'SmartDesk is a self-hosted business hub: CRM, HRM, project management, WhatsApp and email management, internal messaging, analytics and a full REST API. One install, one login, no per-seat fees.',
  ogType: 'product',
})

/** Captured from the demo install by tools/gen-screens (admin repo), never from a live one. */
const screens = [
  { file: 'deals', caption: 'Deals — drag a card between stages; milestones live on each one' },
  { file: 'whatsapp', caption: 'WhatsApp — every number your team answers, in one inbox' },
  { file: 'clients', caption: 'Clients — the book the rest of the system hangs off' },
  { file: 'email-templates', caption: 'Email — edit the wording, switch one off, see what sent' },
]

/** The questions a buyer actually asks before clicking buy. */
const faqs = [
  { q: 'Is this a one-time payment?', a: 'Yes. You buy the licence once and host it yourself. No per-user fees, and no monthly bill from us.' },
  { q: 'What do I need to run it?', a: 'PHP 8.3 or newer, MySQL 8 and Node. A standard VPS or cPanel account is enough. Installation instructions are included.' },
  { q: 'Can I change the branding?', a: 'Name, logo and colours are set inside the admin panel — no code, no rebuild. The panel your team signs in to is yours.' },
  { q: 'Do I get the source code?', a: 'The complete Laravel and Nuxt source. Your developer can read and extend every line of it.' },
  { q: 'What about updates and support?', a: 'Updates are free for the life of the licence. Six months of support is included and can be extended; bug fixes are not time-limited.' },
]

const openFaq = ref<number | null>(null)
</script>

<template>
  <div>
    <HomeHero />
    <HomeStack />
    <HomeConnected />
    <HomeFeatures />

    <!-- ───────── Screens ───────── -->
    <section id="screens" class="container-page scroll-mt-24 py-20 lg:py-28">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
          What it actually looks like
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-gray-600 dark:text-slate-400">
          Real screens from a real install. Every name and figure in them is invented — the demo
          runs on a database of its own, so nothing here is anyone's actual customer.
        </p>
      </div>

      <div class="mt-14 space-y-10">
        <figure v-for="sc in screens" :key="sc.file">
          <img :src="`/images/screens/${sc.file}.png`" :alt="sc.caption" loading="lazy" width="1440" height="813"
               class="w-full rounded-2xl border border-gray-200 bg-white dark:border-white/10">
          <figcaption class="mt-3 text-sm text-gray-500 dark:text-slate-500">{{ sc.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- ───────── Pricing ───────── -->
    <section id="pricing" class="scroll-mt-24 border-y border-gray-100 bg-gray-50/60 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            One purchase, <span class="text-brand-600 dark:text-brand-400">yours to keep</span>
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Licensed through CodeCanyon, where the price and the licence itself are handled.
          </p>
        </div>

        <div class="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
          <div v-for="(p, i) in [
            { name: 'Regular', for: 'For your own business, or one project whose end users are not charged to access it.' },
            { name: 'Extended', for: 'For a product your end users pay to access.' },
          ]" :key="p.name"
               class="rounded-2xl border bg-white p-8 dark:bg-white/5"
               :class="i === 1 ? 'border-brand-600 dark:border-brand-500' : 'border-gray-200 dark:border-white/10'">
            <div class="flex items-baseline justify-between">
              <h3 class="font-display text-xl font-extrabold text-ink-900 dark:text-white">{{ p.name }}</h3>
              <span v-if="i === 1" class="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">For SaaS</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ p.for }}</p>

            <ul class="mt-7 space-y-2.5 border-t border-gray-100 pt-6 text-sm text-gray-600 dark:border-white/10 dark:text-slate-400">
              <li v-for="k in ['Full source code', 'Every module included', 'Free lifetime updates', '6 months support']" :key="k" class="flex items-center gap-2">
                <svg class="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
                {{ k }}
              </li>
            </ul>

            <a href="#" class="mt-8 block rounded-xl px-5 py-3.5 text-center text-sm font-bold transition"
               :class="i === 1
                 ? 'bg-brand-600 text-white hover:bg-brand-700'
                 : 'border border-gray-200 text-ink-900 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5'">
              Buy on CodeCanyon
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────── FAQ ───────── -->
    <section id="faq" class="container-page scroll-mt-24 py-20 lg:py-28">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
          Before you buy
        </h2>

        <div class="border-t border-gray-100 dark:border-white/10">
          <div v-for="(f, i) in faqs" :key="f.q" class="border-b border-gray-100 dark:border-white/10">
            <button type="button" class="flex w-full items-start justify-between gap-6 py-5 text-left"
                    @click="openFaq = openFaq === i ? null : i">
              <span class="font-semibold text-ink-900 dark:text-white">{{ f.q }}</span>
              <svg class="mt-1 h-4 w-4 shrink-0 text-gray-400 transition" :class="openFaq === i ? 'rotate-45' : ''"
                   fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <p v-show="openFaq === i" class="max-w-2xl pb-5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ f.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <HomeCta />
  </div>
</template>
