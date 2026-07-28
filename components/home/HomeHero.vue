<script setup lang="ts">
/**
 * Hero: the claim on the left, the product on the right.
 *
 * The floating cards over the dashboard are positioned absolutely and hidden below `lg` — stacked
 * on a phone they cover the thing they are meant to be pointing at.
 */

/** Client marks in the trust strip. Placeholders from the mockup — swap for real logos. */
const logos = [
  { name: 'TechNova', icon: 'M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'BrightCode', icon: 'm9 8-5 4 5 4M15 8l5 4-5 4' },
  { name: 'PixelCraft', icon: 'M6 3h7a5 5 0 0 1 0 10H6zM6 13v8' },
  { name: 'DynamicX', icon: 'm5 5 14 14M19 5 5 19' },
  { name: 'SoftPulse', icon: 'M3 7h18M3 12h18M3 17h18' },
]

const tasks = [
  { title: 'Design new landing page', sub: 'Website Redesign', tag: 'High', tone: 'bg-rose-500' },
  { title: 'Review project proposal', sub: 'Marketing Campaign', tag: 'Medium', tone: 'bg-amber-500' },
  { title: 'Client meeting', sub: 'Web Development', tag: 'Low', tone: 'bg-emerald-500' },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Wash behind the whole hero; pure decoration, so it never traps a scroll or a click. -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-50 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-50/70 blur-3xl dark:bg-indigo-500/5" />
    </div>

    <div class="container-page grid items-center gap-14 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:py-24">
      <!-- ───────── Claim ───────── -->
      <div>
        <p class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.6L19.5 9l-4.6 3.4 1.7 5.6L12 14.6 7.4 18l1.7-5.6L4.5 9l5.7-1.4z" /></svg>
          All-in-One Business Operating System
        </p>

        <h1 class="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 dark:text-white sm:text-5xl xl:text-6xl">
          Run Your Business<br class="hidden sm:block">
          Smarter with <span class="text-brand-600 dark:text-brand-400">SmartDesk</span>
        </h1>

        <p class="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-slate-400">
          Manage your CRM, projects, team, finance, and more — all in one powerful platform.
          Automate workflows, gain real-time insights, and grow your business effortlessly.
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-4">
          <NuxtLink to="/#pricing"
                    class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700">
            Get Your Licence
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>

          <NuxtLink to="/#modules"
                    class="inline-flex items-center gap-2.5 rounded-xl border border-gray-200 px-7 py-4 text-sm font-bold text-ink-900 transition hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5">
            <svg class="h-5 w-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" /></svg>
            See It in Action
          </NuxtLink>
        </div>

        <ul class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-gray-600 dark:text-slate-400">
          <li v-for="p in [
            { t: 'Full source code', d: 'M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z' },
            { t: 'One-time payment', d: 'm13 2-9 12h7l-1 8 9-12h-7z' },
            { t: 'Free lifetime updates', d: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5' },
          ]" :key="p.t" class="inline-flex items-center gap-2">
            <svg class="h-5 w-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" :d="p.d" /></svg>
            {{ p.t }}
          </li>
        </ul>

        <!-- Trust strip -->
        <div class="mt-10 rounded-2xl border border-gray-100 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
          <p class="text-xs font-semibold text-gray-500 dark:text-slate-400">Trusted by businesses worldwide</p>
          <ul class="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4">
            <li v-for="l in logos" :key="l.name" class="inline-flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-slate-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" :d="l.icon" /></svg>
              {{ l.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ───────── Product ───────── -->
      <div class="relative">
        <HomeDashboardMock donut="projects" />

        <!-- Tasks Due Today — the one dark object on the page, so it reads as lifted -->
        <div class="absolute -bottom-8 -left-6 hidden w-64 rounded-2xl bg-ink-900 p-4 shadow-2xl shadow-slate-900/25 dark:bg-slate-800 dark:shadow-black/50 lg:block">
          <div class="flex items-center justify-between">
            <p class="text-sm font-bold text-white">Tasks Due Today</p>
            <span class="grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">4</span>
          </div>

          <ul class="mt-3 space-y-3">
            <li v-for="t in tasks" :key="t.title" class="flex items-center gap-2.5">
              <span class="grid h-4 w-4 shrink-0 place-items-center rounded bg-brand-500" aria-hidden="true">
                <svg class="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-xs font-semibold text-white">{{ t.title }}</span>
                <span class="block truncate text-[10px] text-slate-400">{{ t.sub }}</span>
              </span>
              <span class="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold text-white" :class="t.tone">{{ t.tag }}</span>
            </li>
          </ul>
        </div>

        <!-- Assistant bubble -->
        <div class="absolute -bottom-4 right-8 hidden h-14 w-14 place-items-center rounded-2xl bg-brand-600 shadow-xl shadow-brand-600/30 lg:grid" aria-hidden="true">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
            <rect x="4" y="8" width="16" height="12" rx="3" /><path stroke-linecap="round" d="M12 4v4M9 14h.01M15 14h.01M9.5 17h5" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
