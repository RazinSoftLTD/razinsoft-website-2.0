<script setup lang="ts">
/**
 * Six reasons, then social proof.
 *
 * ⚠️  The `proof` block below is MOCKUP CONTENT — the customer count, the countries, the rating and
 * all three quotes came from the design comp, not from anyone real. Invented reviews on a live
 * sales page are a lie told to buyers, and on CodeCanyon they are also grounds for removal.
 * Replace every field here with real figures and real, attributable quotes before launch; if you
 * do not have them yet, set `proof.show = false` and the whole strip disappears cleanly.
 */
const features = [
  { t: 'All-in-One Platform', d: 'CRM, projects, HR, finance, support and more — all in one place.', icon: 'M3 4h7v7H3zM14 4h7v7h-7zM3 15h7v5H3zM14 15h7v5h-7z', tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' },
  { t: 'Automate Workflows', d: 'Recurring invoices, follow-up reminders and email queues run themselves.', icon: 'm13 2-9 12h7l-1 8 9-12h-7z', tone: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' },
  { t: 'Real-time Insights', d: 'Revenue, pipeline, staff and support on one board — no exports.', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2', tone: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10' },
  { t: 'Secure & Self-hosted', d: 'Your database on your server. We cannot read it or switch it off.', icon: 'M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z', tone: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' },
  { t: 'Team Collaboration', d: 'Direct and group threads, live, right where the work already lives.', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9', tone: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10' },
  { t: 'Yours to Brand', d: 'Name, logo and colours set in the panel — no code, no rebuild.', icon: 'M12 3 2 12h3v8h6v-5h2v5h6v-8h3z', tone: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' },
]

const proof = {
  // Off until the fields below are real. Everything in here still came from the design comp —
  // nobody named has ever used SmartDesk, and it has no customers to count yet. Flip to true the
  // day you can put a real name, a real company and a real sentence against each quote.
  show: false,
  headline: 'Trusted by 5,000+ Businesses',
  sub: 'from 25+ Countries Worldwide',
  rating: '4.9/5 from 1,200+ reviews',
  quotes: [
    { q: 'SmartDesk has completely transformed the way we manage our business. Everything is now organised and running smoothly.', who: 'Sarah Johnson', role: 'CEO, TechNova' },
    { q: 'Finally, a platform that combines everything we need. It saves us time, cuts costs and boosts productivity.', who: 'David Miller', role: 'Operations Manager, BrightCode' },
    { q: 'The automation and insights help us make better decisions and grow faster than ever.', who: 'Emily Watson', role: 'Founder, PixieLab' },
  ],
}
</script>

<template>
  <section class="border-y border-gray-100 bg-gray-50/60 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
    <div class="container-page">
      <div class="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <!-- ───────── Reasons ───────── -->
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.6L19.5 9l-4.6 3.4 1.7 5.6L12 14.6 7.4 18l1.7-5.6L4.5 9l5.7-1.4z" /></svg>
            Powerful. Simple. Built for Growth.
          </p>

          <h2 class="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Everything You Need<br>
            to <span class="text-brand-600 dark:text-brand-400">Run &amp; Grow</span> Your Business
          </h2>

          <p class="mt-5 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-slate-400">
            SmartDesk gives you the tools to manage your operations, automate the repetitive parts,
            and make decisions from numbers rather than guesses.
          </p>

          <div class="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div v-for="f in features" :key="f.t"
                 class="rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-brand-200 hover:shadow-lg hover:shadow-gray-100 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/30 dark:hover:shadow-none">
              <span class="grid h-10 w-10 place-items-center rounded-xl" :class="f.tone" aria-hidden="true">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="f.icon" /></svg>
              </span>
              <p class="mt-3.5 font-display text-base font-extrabold text-ink-900 dark:text-white">{{ f.t }}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ f.d }}</p>
            </div>
          </div>
        </div>

        <!-- ───────── Product ───────── -->
        <div>
          <HomeDashboardMock upgrade />
        </div>
      </div>

      <!-- ───────── Social proof ───────── -->
      <div v-if="proof.show" class="mt-14 grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 lg:grid-cols-[0.8fr_2fr] lg:gap-10 lg:p-8">
        <div class="flex items-start gap-4 lg:border-r lg:border-gray-100 lg:pr-8 dark:lg:border-white/10">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400" aria-hidden="true">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z" /></svg>
          </span>
          <div>
            <p class="font-display text-xl font-extrabold leading-tight text-ink-900 dark:text-white">{{ proof.headline }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-400">{{ proof.sub }}</p>
            <p class="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink-900 dark:text-white">
              <span class="text-amber-400" aria-hidden="true">★★★★★</span>
              <span class="text-gray-600 dark:text-slate-400">{{ proof.rating }}</span>
            </p>
          </div>
        </div>

        <ul class="grid gap-4 sm:grid-cols-3">
          <li v-for="t in proof.quotes" :key="t.who" class="rounded-2xl border border-gray-100 p-5 dark:border-white/10">
            <svg class="h-6 w-6 text-brand-200 dark:text-brand-500/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H5a2 2 0 0 0-2 2v4h4v4H3v-2h2v-2H3V9a4 4 0 0 1 4-4h2Zm10 0h-4a2 2 0 0 0-2 2v4h4v4h-4v-2h2v-2h-2V9a4 4 0 0 1 4-4h2Z" /></svg>
            <blockquote class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ t.q }}</blockquote>
            <p class="mt-4 text-sm font-bold text-ink-900 dark:text-white">{{ t.who }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-500">{{ t.role }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
