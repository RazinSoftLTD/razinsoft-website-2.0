<script setup lang="ts">
usePageSeo({
  title: 'SmartDesk — CRM, HRM, Projects, WhatsApp & Email in one business hub',
  description:
    'SmartDesk is a self-hosted business hub: CRM, HRM, project management, WhatsApp and email management, internal messaging, analytics and a full REST API. One install, one login, no per-seat fees.',
  ogType: 'product',
})

/**
 * The modules, in the order a business meets them: win the work, deliver it, keep in touch, then
 * measure it. Each is a real screen in the panel — a buyer who reads this and opens a screenshot
 * has to find the same thing there.
 */
const modules = [
  { name: 'CRM', blurb: 'Leads, deals with a drag-across pipeline, follow-ups, and a client book that remembers every conversation.' },
  { name: 'HRM', blurb: 'Staff records, attendance and shifts, leave approvals, payslips and documents — the whole employee file.' },
  { name: 'Projects', blurb: 'Milestones, tasks and built-in timers, so what was billed sits next to what was actually done.' },
  { name: 'WhatsApp', blurb: 'Every number your team answers in one inbox — scanned phones and Meta Cloud API side by side.' },
  { name: 'Email', blurb: 'Several SMTP accounts, editable templates, a real queue, bounces handled, and every message logged.' },
  { name: 'Internal messaging', blurb: 'Direct and group threads where the work already lives, live, without anyone refreshing a page.' },
  { name: 'Analytics', blurb: 'Revenue, pipeline, staff and support on one board. The numbers, not another export to a spreadsheet.' },
  { name: 'REST API', blurb: 'Token-authenticated, documented, with CSV import and webhooks — so whatever you have now comes with you.' },
]

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
  <div class="bg-white">
    <!-- ───────── Hero ─────────
         Light, and one thing to read. The dark gradient this replaced was doing the work a good
         headline should do. -->
    <section class="container-page pt-20 text-center lg:pt-28">
      <p class="text-sm font-semibold tracking-wide text-gray-500">
        Self-hosted · One-time licence
      </p>

      <h1 class="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
        Everything your business runs on, in one place.
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
        CRM, HR, projects, WhatsApp, email, internal chat and analytics — behind one login, on your
        own server, with no per-seat pricing.
      </p>

      <div class="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a href="#pricing" class="rounded-xl bg-ink-900 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-ink-800">
          Buy on CodeCanyon
        </a>
        <a href="#modules" class="text-sm font-semibold text-ink-900 transition hover:text-brand-600">
          See what is in it →
        </a>
      </div>

      <p class="mt-5 text-sm text-gray-500">Full source code · Free lifetime updates · 6 months support</p>
    </section>

    <!-- The product itself, given room rather than squeezed beside the words. -->
    <section class="container-page pt-16">
      <img src="/images/screens/dashboard.png" alt="The SmartDesk dashboard" width="1440" height="813"
           class="w-full rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/60" />
    </section>

    <!-- ───────── Modules ───────── -->
    <section id="modules" class="container-page scroll-mt-20 py-24 lg:py-32">
      <div class="max-w-2xl">
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Eight modules that already know about each other
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-gray-600">
          One set of clients, one set of staff, one set of numbers. A lead becoming a project
          becoming an invoice never leaves the building.
        </p>
      </div>

      <!-- Hairlines instead of eight bordered cards: the list is the point, not the boxes. -->
      <dl class="mt-14 grid gap-x-16 border-t border-gray-100 sm:grid-cols-2">
        <div v-for="m in modules" :key="m.name" class="border-b border-gray-100 py-7">
          <dt class="font-display text-lg font-bold text-ink-900">{{ m.name }}</dt>
          <dd class="mt-1.5 max-w-md text-sm leading-relaxed text-gray-600">{{ m.blurb }}</dd>
        </div>
      </dl>
    </section>

    <!-- ───────── Screens ───────── -->
    <section id="screens" class="scroll-mt-20 border-y border-gray-100 bg-gray-50 py-24 lg:py-32">
      <div class="container-page">
        <div class="max-w-2xl">
          <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">What it looks like</h2>
          <p class="mt-4 text-lg leading-relaxed text-gray-600">
            Real screens. Every name and figure in them is invented — the demo runs on a database of
            its own, so nothing here is anyone's actual customer.
          </p>
        </div>

        <div class="mt-14 space-y-10">
          <figure v-for="sc in screens" :key="sc.file">
            <img :src="`/images/screens/${sc.file}.png`" :alt="sc.caption" loading="lazy" width="1440" height="813"
                 class="w-full rounded-2xl border border-gray-200 bg-white" />
            <figcaption class="mt-3 text-sm text-gray-500">{{ sc.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ───────── Why ───────── -->
    <section class="container-page py-24 lg:py-32">
      <div class="grid gap-16 lg:grid-cols-2">
        <div>
          <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Built to be owned, not rented
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-gray-600">
            Most business tools charge per person per month and keep your data on their servers.
            SmartDesk is bought once and installed on yours. Adding the tenth member of staff costs
            nothing.
          </p>
        </div>

        <div class="space-y-8">
          <div v-for="w in [
            { t: 'Brand it as your own', d: 'Name, logo and colours are set in the admin panel. Your team signs in to your product, not to ours.' },
            { t: 'Real code, not a black box', d: 'Standard Laravel and Nuxt, commented where the reasoning is not obvious. Extend it the day you buy it.' },
            { t: 'Your database, your server', d: 'We cannot see your data and we cannot switch it off. That is the whole difference between buying and subscribing.' },
          ]" :key="w.t">
            <p class="font-display text-lg font-bold text-ink-900">{{ w.t }}</p>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-600">{{ w.d }}</p>
          </div>

          <p class="border-t border-gray-100 pt-6 text-sm text-gray-500">
            Laravel 12 · Nuxt 3 · Tailwind CSS · MySQL 8 · Stripe &amp; PayPal
          </p>
        </div>
      </div>
    </section>

    <!-- ───────── Pricing ───────── -->
    <section id="pricing" class="scroll-mt-20 border-y border-gray-100 bg-gray-50 py-24 lg:py-32">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">One purchase, yours to keep</h2>
          <p class="mt-4 text-lg text-gray-600">Licensed through CodeCanyon, where the price and the licence itself are handled.</p>
        </div>

        <div class="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
          <div v-for="(p, i) in [
            { name: 'Regular', for: 'For your own business, or one project whose end users are not charged to access it.' },
            { name: 'Extended', for: 'For a product your end users pay to access.' },
          ]" :key="p.name"
               class="rounded-2xl border bg-white p-8"
               :class="i === 1 ? 'border-ink-900' : 'border-gray-200'">
            <div class="flex items-baseline justify-between">
              <h3 class="font-display text-xl font-extrabold text-ink-900">{{ p.name }}</h3>
              <span v-if="i === 1" class="text-xs font-bold uppercase tracking-widest text-gray-400">For SaaS</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">{{ p.for }}</p>

            <ul class="mt-7 space-y-2.5 border-t border-gray-100 pt-6 text-sm text-gray-600">
              <li v-for="k in ['Full source code', 'All eight modules', 'Free lifetime updates', '6 months support']" :key="k">{{ k }}</li>
            </ul>

            <a href="#" class="mt-8 block rounded-xl px-5 py-3 text-center text-sm font-bold transition"
               :class="i === 1 ? 'bg-ink-900 text-white hover:bg-ink-800' : 'border border-gray-200 text-ink-900 hover:bg-gray-50'">
              Buy on CodeCanyon
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────── FAQ ───────── -->
    <section class="container-page py-24 lg:py-32">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Before you buy
        </h2>

        <div class="border-t border-gray-100">
          <div v-for="(f, i) in faqs" :key="f.q" class="border-b border-gray-100">
            <button type="button" class="flex w-full items-start justify-between gap-6 py-5 text-left"
                    @click="openFaq = openFaq === i ? null : i">
              <span class="font-semibold text-ink-900">{{ f.q }}</span>
              <svg class="mt-1 h-4 w-4 shrink-0 text-gray-400 transition" :class="openFaq === i ? 'rotate-45' : ''"
                   fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <p v-show="openFaq === i" class="max-w-2xl pb-5 text-sm leading-relaxed text-gray-600">{{ f.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
