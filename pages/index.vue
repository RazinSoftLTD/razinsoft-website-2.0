<script setup lang="ts">
usePageSeo({
  title: 'SmartDesk — CRM, HRM, Projects, WhatsApp & Email in one business hub',
  description:
    'SmartDesk is a self-hosted business hub: CRM, HRM, project management, WhatsApp and email management, internal messaging, analytics and a full REST API. One install, one login, no per-seat fees.',
  ogType: 'product',
})

/**
 * The modules, in the order a business meets them: win the work, deliver it, keep in touch, then
 * measure it. Each one is a real screen in the panel, not a roadmap item — a buyer who reads this
 * list and then opens the demo has to find the same thing there.
 */
const modules = [
  {
    name: 'CRM',
    blurb: 'Leads, deals, follow-ups and a client book that remembers every conversation.',
    points: ['Pipeline with stages & probability', 'Follow-up reminders', 'Import & export'],
    icon: 'M4.5 20a7.5 7.5 0 0 1 15 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  },
  {
    name: 'HRM',
    blurb: 'Staff records, attendance, leave, payroll and documents — the whole employee file.',
    points: ['Attendance & shifts', 'Leave approvals', 'Payslips & documents'],
    icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m1-2h6v4H9V2Z',
  },
  {
    name: 'Project Management',
    blurb: 'Projects, milestones, tasks and timers, with what was billed against what was done.',
    points: ['Milestones & tasks', 'Built-in time tracking', 'Client-visible progress'],
    icon: 'M9 11l3 3 5-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  {
    name: 'WhatsApp Management',
    blurb: 'A shared inbox for every number — QR-paired phones and Meta Cloud API side by side.',
    points: ['Several numbers, one inbox', 'Quick replies & labels', 'Approved template sending'],
    icon: 'M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z',
  },
  {
    name: 'Email Management',
    blurb: 'Several SMTP accounts, editable templates, a real queue, and every message logged.',
    points: ['Templates with variables', 'Bounce & complaint handling', 'Opens, clicks, analytics'],
    icon: 'M3 6h18v12H3zM3 7l9 6 9-6',
  },
  {
    name: 'Internal Messaging',
    blurb: 'Your team talks where the work lives, so the context never leaves the room.',
    points: ['Direct & group threads', 'Live, without a refresh', 'Unread badges everywhere'],
    icon: 'M8 10h8M8 14h5M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 1 1 21 12Z',
  },
  {
    name: 'Analytics',
    blurb: 'Revenue, pipeline, staff and support on one board — the numbers, not a data export.',
    points: ['Revenue & orders', 'Pipeline health', 'Support response times'],
    icon: 'M4 19V9m6 10V5m6 14v-7M3 21h18',
  },
  {
    name: 'REST API & data conversion',
    blurb: 'A documented API and import tools, so whatever you already have comes with you.',
    points: ['Token-authenticated REST API', 'CSV import & export', 'Webhooks for events'],
    icon: 'm9 8-5 4 5 4M15 8l5 4-5 4M13.5 5l-3 14',
  },
]

/** The questions a CodeCanyon buyer actually asks before clicking buy. */
const faqs = [
  {
    q: 'Is this a one-time payment?',
    a: 'Yes. You buy the licence once and host it on your own server. There are no per-user fees and no monthly bill from us.',
  },
  {
    q: 'What do I need to run it?',
    a: 'A host with PHP 8.3 or newer, MySQL 8 and Node. A standard VPS or cPanel account is enough. Installation instructions are included.',
  },
  {
    q: 'Can I change the branding?',
    a: 'The name, logo and colours are set from inside the admin panel — no code and no rebuild. The panel your team signs in to is yours, not ours.',
  },
  {
    q: 'Do I get the source code?',
    a: 'Yes, the complete Laravel and Nuxt source. You can extend it, and your developer can read every line of it.',
  },
  {
    q: 'What about updates?',
    a: 'Updates are free for the life of the licence and downloaded from your CodeCanyon account.',
  },
  {
    q: 'Is support included?',
    a: 'Six months of support comes with the purchase and can be extended. Bug fixes are not time-limited.',
  },
]

/** Captured from the demo install by tools/gen-screens (admin repo), never from a live one. */
const screens = [
  { file: 'deals', title: 'Deals', caption: 'a pipeline you drag cards across, with milestones on each' },
  { file: 'whatsapp', title: 'WhatsApp inbox', caption: 'every number your team answers, in one place' },
  { file: 'clients', title: 'Clients', caption: 'the book everything else hangs off' },
  { file: 'email-templates', title: 'Email templates', caption: 'edit the wording, switch one off, see what sent' },
]

const stack = ['Laravel 12', 'Nuxt 3', 'Tailwind CSS', 'MySQL 8', 'Alpine.js', 'Stripe & PayPal']

const openFaq = ref<number | null>(0)
</script>

<template>
  <div>
    <!-- ───────── Hero ───────── -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e2b52] to-[#0f172a] text-white">
      <div class="container-page grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Self-hosted · One-time licence
          </p>

          <h1 class="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Everything your business
            <span class="bg-gradient-to-r from-[#3aa6ff] to-[#a78bfa] bg-clip-text text-transparent">runs on</span>,
            in one place.
          </h1>

          <p class="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
            SmartDesk is a business hub you install on your own server. CRM, HR, projects, WhatsApp,
            email, internal chat and analytics — one login, one database, no per-seat pricing.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#pricing" class="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink-900 transition hover:bg-gray-100">
              Buy on CodeCanyon
            </a>
            <a href="#modules" class="rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              See the modules
            </a>
          </div>

          <p class="mt-5 text-sm text-gray-400">Full source code · Free lifetime updates · 6 months support</p>
        </div>

        <div class="relative">
          <div class="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#3aa6ff]/20 to-[#7b4bff]/20 blur-2xl"></div>
          <img src="/images/screens/dashboard.png" alt="The SmartDesk dashboard"
               class="relative w-full rounded-2xl shadow-2xl ring-1 ring-white/10" width="1440" height="813" />
        </div>
      </div>
    </section>

    <!-- ───────── What it replaces ───────── -->
    <section class="border-b border-gray-100 bg-white py-14">
      <div class="container-page">
        <p class="text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          One install instead of six subscriptions
        </p>
        <div class="mt-7 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="s in [
            { n: '8', l: 'modules, one login' },
            { n: '0', l: 'per-user fees' },
            { n: '100%', l: 'source code included' },
            { n: 'Your', l: 'server, your data' },
          ]" :key="s.l">
            <p class="font-display text-4xl font-extrabold text-ink-900">{{ s.n }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ s.l }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────── Modules ───────── -->
    <section id="modules" class="scroll-mt-20 bg-gray-50 py-20">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">Eight modules, one system</h2>
          <p class="mt-3 text-gray-600">
            They share the same clients, the same staff and the same numbers — so a lead becoming a
            project becoming an invoice never leaves the building.
          </p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="m in modules" :key="m.name"
                   class="group rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-brand-200 hover:shadow-lg">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" :d="m.icon" />
              </svg>
            </span>
            <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ m.name }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-600">{{ m.blurb }}</p>
            <ul class="mt-4 space-y-1.5">
              <li v-for="p in m.points" :key="p" class="flex items-start gap-2 text-sm text-gray-500">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
                </svg>
                {{ p }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ───────── Screens ───────── -->
    <section class="bg-white py-20">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">What it looks like</h2>
          <p class="mt-3 text-gray-600">
            Real screens from the panel. Every name and figure in them is invented — the demo runs on
            its own database.
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <figure v-for="sc in screens" :key="sc.file" class="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <img :src="`/images/screens/${sc.file}.png`" :alt="sc.caption" loading="lazy"
                 class="w-full" width="1440" height="813" />
            <figcaption class="border-t border-gray-100 bg-white px-5 py-3.5 text-sm">
              <span class="font-bold text-ink-900">{{ sc.title }}</span>
              <span class="text-gray-500"> — {{ sc.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ───────── Why ───────── -->
    <section class="bg-white py-20">
      <div class="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">Built to be owned, not rented</h2>
          <p class="mt-4 leading-relaxed text-gray-600">
            Most business tools charge per person, per month, and keep your data on their servers.
            SmartDesk is bought once and installed on yours. The database is yours, the source is
            yours, and adding the tenth member of staff costs nothing.
          </p>

          <div class="mt-8 space-y-5">
            <div v-for="w in [
              { t: 'Brand it as your own', d: 'Name, logo and colours are set in the admin panel. Your team signs in to your product, not to ours.' },
              { t: 'It all talks to itself', d: 'A lead becomes a client, the client gets a project, the project raises an invoice — no exports, no copying between tools.' },
              { t: 'Real code, not a black box', d: 'Laravel and Nuxt, documented and readable. Your developer can extend it the day you buy it.' },
            ]" :key="w.t" class="flex gap-4">
              <span class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <div>
                <p class="font-bold text-ink-900">{{ w.t }}</p>
                <p class="mt-0.5 text-sm leading-relaxed text-gray-600">{{ w.d }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-100 bg-gray-50 p-8">
          <p class="text-sm font-semibold uppercase tracking-widest text-gray-400">Built with</p>
          <div class="mt-5 flex flex-wrap gap-2.5">
            <span v-for="t in stack" :key="t"
                  class="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-ink-800">{{ t }}</span>
          </div>
          <p class="mt-6 text-sm leading-relaxed text-gray-600">
            Standard, current versions — the kind any PHP developer can pick up. It runs on a normal
            VPS or cPanel host, with nothing to learn before it will start.
          </p>
        </div>
      </div>
    </section>

    <!-- ───────── Pricing ───────── -->
    <section id="pricing" class="scroll-mt-20 bg-gray-50 py-20">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">One purchase, yours to keep</h2>
          <p class="mt-3 text-gray-600">Licensed through CodeCanyon. Pick the one that matches how you will use it.</p>
        </div>

        <div class="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <div v-for="(p, i) in [
            { name: 'Regular Licence', for: 'Use it in your own business, or in one project whose end users are not charged to access it.',
              perks: ['Full source code', 'All eight modules', 'Free lifetime updates', '6 months support'] },
            { name: 'Extended Licence', for: 'Use it in a product your end users pay to access.',
              perks: ['Everything in Regular', 'Charge your end users', 'Free lifetime updates', '6 months support'] },
          ]" :key="p.name"
               class="rounded-2xl border bg-white p-8"
               :class="i === 1 ? 'border-brand-600 shadow-lg' : 'border-gray-100'">
            <p v-if="i === 1" class="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">For SaaS</p>
            <h3 class="font-display text-xl font-extrabold text-ink-900">{{ p.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ p.for }}</p>
            <ul class="mt-6 space-y-2.5">
              <li v-for="k in p.perks" :key="k" class="flex items-start gap-2 text-sm text-ink-800">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
                </svg>
                {{ k }}
              </li>
            </ul>
            <a href="#" class="mt-7 block rounded-xl px-5 py-3 text-center text-sm font-bold transition"
               :class="i === 1 ? 'bg-brand-600 text-white hover:bg-brand-700' : 'border border-gray-200 text-ink-900 hover:bg-gray-50'">
              Buy on CodeCanyon
            </a>
          </div>
        </div>

        <p class="mt-6 text-center text-sm text-gray-500">The price and the licence itself are handled on CodeCanyon.</p>
      </div>
    </section>

    <!-- ───────── FAQ ───────── -->
    <section class="bg-white py-20">
      <div class="container-page mx-auto max-w-3xl">
        <h2 class="text-center font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">Before you buy</h2>

        <div class="mt-10 divide-y divide-gray-100 rounded-2xl border border-gray-100">
          <div v-for="(f, i) in faqs" :key="f.q">
            <button type="button" class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    @click="openFaq = openFaq === i ? null : i">
              <span class="font-semibold text-ink-900">{{ f.q }}</span>
              <svg class="h-5 w-5 shrink-0 text-gray-400 transition" :class="openFaq === i ? 'rotate-45' : ''"
                   fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <p v-show="openFaq === i" class="px-6 pb-5 text-sm leading-relaxed text-gray-600">{{ f.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────── Close ───────── -->
    <section class="bg-gradient-to-br from-[#0f172a] via-[#1e2b52] to-[#0f172a] py-20 text-white">
      <div class="container-page text-center">
        <h2 class="font-display text-3xl font-extrabold sm:text-4xl">Stop paying rent on your own data</h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-300">
          One licence, your server, and every part of the business in the same place.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#pricing" class="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-ink-900 transition hover:bg-gray-100">Buy on CodeCanyon</a>
          <NuxtLink to="/contact-us" class="rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold transition hover:bg-white/10">Ask a question</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
