<script setup lang="ts">
/** The last ask, in the same light register as the rest of the page. */
const assurances = [
  { t: 'Full source code', d: 'M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z' },
  { t: 'Setup in minutes', d: 'm13 2-9 12h7l-1 8 9-12h-7z' },
  { t: '6 months support', d: 'M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z' },
]
</script>

<template>
  <section class="container-page py-16 lg:py-20">
    <div class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-white/5 lg:p-12">
      <!-- Dot field, bottom-left, purely decorative -->
      <svg class="pointer-events-none absolute -left-4 bottom-0 h-40 w-40 text-brand-100 dark:text-brand-500/15" aria-hidden="true">
        <pattern id="cta-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="currentColor" /></pattern>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      <div class="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div class="flex items-start gap-5">
          <span class="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 sm:grid" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.85-.85.83-2.15-.02-3a2.12 2.12 0 0 0-2.98 0ZM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
            </svg>
          </span>

          <div>
            <h2 class="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Ready to Run Your Entire Business from
              <span class="text-brand-600 dark:text-brand-400">One Platform?</span>
            </h2>
            <p class="mt-3 max-w-md text-base leading-relaxed text-gray-600 dark:text-slate-400">
              Replace a stack of subscriptions with one licence you buy once and install on your own
              server.
            </p>
          </div>
        </div>

        <div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/#pricing" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              Buy on CodeCanyon
            </NuxtLink>
            <NuxtLink to="/contact-us" class="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-4 text-sm font-bold text-ink-900 transition hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5">
              Ask a Question
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
            </NuxtLink>
          </div>

          <ul class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600 dark:text-slate-400">
            <li v-for="a in assurances" :key="a.t" class="inline-flex items-center gap-2">
              <svg class="h-4 w-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" :d="a.d" /></svg>
              {{ a.t }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
