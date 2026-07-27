<script setup lang="ts">
usePageSeo({
  title: 'About SmartDesk — why it works the way it does',
  description:
    'SmartDesk is built by RazinSoft, who run their own business on it. Here is what it is, what it deliberately is not, and who is behind it.',
})

/** What the product refuses to do, which says more than a feature list. */
const principles = [
  {
    t: 'You own the install',
    d: 'It runs on your server, against your database. We cannot see your data, and we cannot switch it off. That is the whole point of buying rather than subscribing.',
  },
  {
    t: 'One system, not eight tools bolted together',
    d: 'The CRM, the projects and the invoices share the same client record. Nothing is exported from one part to be re-imported into another, because there is only one of everything.',
  },
  {
    t: 'No per-seat pricing, ever',
    d: 'A licence covers your whole team. Hiring the tenth person costs nothing, which means nobody has to decide who is worth a seat.',
  },
  {
    t: 'Readable code, not a black box',
    d: 'Standard Laravel and Nuxt, commented where the reasoning is not obvious. Your developer can change it the day you buy it.',
  },
]

/** Honest about the edges — a buyer finding these out after purchase is worse than before. */
const notFor = [
  'Teams who want a hosted service with someone else running the servers.',
  'Businesses needing accounting-grade bookkeeping — SmartDesk invoices, it does not do double-entry.',
  'Anyone expecting a mobile app; it is a responsive web panel.',
]
</script>

<template>
  <div>
    <!-- ───────── Intro ───────── -->
    <section class="bg-gradient-to-br from-[#0f172a] via-[#1e2b52] to-[#0f172a] py-20 text-white">
      <div class="container-page mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-gray-400">About</p>
        <h1 class="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          We built it because we needed it
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-gray-300">
          SmartDesk started as the panel RazinSoft runs its own company on — the clients, the staff,
          the projects and the invoices. Everything in it exists because something in the business
          was slow, or lived in a spreadsheet, or was being paid for monthly somewhere else.
        </p>
      </div>
    </section>

    <!-- ───────── What it is ───────── -->
    <section class="bg-white py-20">
      <div class="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <h2 class="font-display text-3xl font-extrabold text-ink-900">What it is</h2>
          <p class="mt-4 leading-relaxed text-gray-600">
            A business hub you install once: CRM, HR, projects, WhatsApp, email, internal messaging
            and analytics behind one login. It is the software a growing company usually assembles
            from six subscriptions, except the parts already know about each other.
          </p>
          <p class="mt-4 leading-relaxed text-gray-600">
            We use it every day. When something in SmartDesk is awkward, it is awkward for us first —
            which is a better quality check than any roadmap.
          </p>
        </div>

        <div>
          <h2 class="font-display text-3xl font-extrabold text-ink-900">What it is not</h2>
          <p class="mt-4 leading-relaxed text-gray-600">
            Worth saying plainly, because finding out after buying is worse than finding out now:
          </p>
          <ul class="mt-5 space-y-3">
            <li v-for="n in notFor" :key="n" class="flex gap-3 text-sm leading-relaxed text-gray-600">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300"></span>
              {{ n }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ───────── Principles ───────── -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">How it is built</h2>
          <p class="mt-3 text-gray-600">Four decisions that shaped everything else.</p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2">
          <article v-for="(p, i) in principles" :key="p.t"
                   class="rounded-2xl border border-gray-100 bg-white p-7">
            <span class="font-display text-sm font-extrabold text-brand-600">0{{ i + 1 }}</span>
            <h3 class="mt-2 font-display text-lg font-bold text-ink-900">{{ p.t }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ p.d }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ───────── Who ───────── -->
    <section class="bg-white py-20">
      <div class="container-page mx-auto max-w-3xl text-center">
        <h2 class="font-display text-3xl font-extrabold text-ink-900">Who is behind it</h2>
        <p class="mt-4 leading-relaxed text-gray-600">
          SmartDesk is made by <strong class="text-ink-900">RazinSoft</strong>, a software company in
          Dhaka, Bangladesh, building custom and ready-made business software since 2019. We are a
          real team with a real office, and the same people who write the code answer the support
          tickets.
        </p>

        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <div v-for="c in [
            { k: 'Since', v: '2019' },
            { k: 'Based in', v: 'Dhaka, BD' },
            { k: 'Support answered by', v: 'The developers' },
          ]" :key="c.k" class="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">{{ c.k }}</p>
            <p class="mt-1.5 font-display text-lg font-bold text-ink-900">{{ c.v }}</p>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/#pricing" class="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700">
            See the licences
          </NuxtLink>
          <NuxtLink to="/contact-us" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-ink-900 transition hover:bg-gray-50">
            Talk to us first
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
