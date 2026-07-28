<script setup lang="ts">
/**
 * "You are paying for twenty things; here is one."
 *
 * The tiles are the modules SmartDesk actually ships, not a generic list of business software.
 * A buyer counts these against the screenshots further down the page, and anything listed here
 * that the panel cannot do is a refund request waiting to happen.
 */
const tools = [
  { name: 'CRM', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9', tone: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10' },
  { name: 'Leads', icon: 'M3 21l6-6M14 4l6 6-9 3-3-3z', tone: 'text-sky-600 bg-sky-50 dark:bg-sky-500/10' },
  { name: 'Deals', icon: 'M3 4h7v7H3zM14 4h7v7h-7zM3 15h7v5H3zM14 15h7v5h-7z', tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' },
  { name: 'Follow-ups', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4', tone: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
  { name: 'Clients', icon: 'M3 21V7l9-4 9 4v14M9 21v-6h6v6', tone: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10' },
  { name: 'Help Desk', icon: 'M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'HRM', icon: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0', tone: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10' },
  { name: 'Attendance', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2', tone: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
  { name: 'Leave', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M10 16h4', tone: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' },
  { name: 'Payroll', icon: 'M3 6h18v12H3zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 9h.01M18 15h.01', tone: 'text-lime-600 bg-lime-50 dark:bg-lime-500/10' },
  { name: 'Projects', icon: 'M3 7h6l2 2h10v11H3zM3 7V4h6', tone: 'text-teal-600 bg-teal-50 dark:bg-teal-500/10' },
  { name: 'Tasks', icon: 'M9 5h11M9 12h11M9 19h11M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2', tone: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10' },
  { name: 'Timers', icon: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2 2M9 2h6', tone: 'text-slate-600 bg-slate-100 dark:bg-white/10' },
  { name: 'Invoicing', icon: 'M7 3h10v18l-2.5-2-2.5 2-2.5-2L7 21zM10 8h4M10 12h4', tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'Payments', icon: 'M2 7h20v10H2zM2 11h20M6 15h3', tone: 'text-green-600 bg-green-50 dark:bg-green-500/10' },
  { name: 'Products', icon: 'M12 2 21 7v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10', tone: 'text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-500/10' },
  { name: 'Email', icon: 'M3 6h18v12H3zM3 7l9 6 9-6', tone: 'text-pink-600 bg-pink-50 dark:bg-pink-500/10' },
  { name: 'WhatsApp', icon: 'M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A9 9 0 0 1 21 12ZM8.5 9.5c0 3.3 2.7 6 6 6', tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'Team Chat', icon: 'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z', tone: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
  { name: 'Analytics', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2', tone: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10' },
  { name: 'Meetings', icon: 'M15 10l6-3v10l-6-3zM3 7h12v10H3z', tone: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10' },
  { name: 'Blog', icon: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4', tone: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
  { name: 'REST API', icon: 'm9 8-5 4 5 4M15 8l5 4-5 4M13.5 5l-3 14', tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' },
  { name: '…and more', icon: 'M6 12h.01M12 12h.01M18 12h.01', tone: 'text-gray-500 bg-gray-100 dark:bg-white/10' },
]

const pillars = [
  { t: 'One Login', d: 'Everyone reaches every module through a single secure sign-in.', icon: 'M6 11h12v10H6zM9 11V7a3 3 0 0 1 6 0v4', tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' },
  { t: 'One Database', d: 'A client in the CRM is the same client on the invoice. No syncing.', icon: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3', tone: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' },
  { t: 'Your Server', d: 'Installed on hosting you control. We cannot see it or switch it off.', icon: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01', tone: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10' },
  { t: 'Full Source', d: 'Complete Laravel and Nuxt code. Extend it the day you buy it.', icon: 'M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z', tone: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' },
]
</script>

<template>
  <section id="modules" class="scroll-mt-20 border-y border-gray-100 bg-gray-50/60 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
    <div class="container-page">
      <!-- ───────── Heading ───────── -->
      <div class="mx-auto max-w-3xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.6L19.5 9l-4.6 3.4 1.7 5.6L12 14.6 7.4 18l1.7-5.6L4.5 9l5.7-1.4z" /></svg>
          One Platform. Everything You Need.
        </p>
        <h2 class="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
          Replace Your Entire <span class="text-brand-600 dark:text-brand-400">Software Stack</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-slate-400">
          Everything your business needs in one unified business hub.
        </p>
      </div>

      <!-- ───────── Many → one ───────── -->
      <div class="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1.15fr]">
        <!-- Left: the tiles -->
        <div>
          <p class="text-center font-display text-xl font-extrabold text-ink-900 dark:text-white lg:text-left">
            <span class="text-brand-600 dark:text-brand-400">20+</span> Tools You Use Every Day
          </p>

          <ul class="mt-5 grid grid-cols-3 gap-2.5 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:grid-cols-4">
            <li v-for="t in tools" :key="t.name"
                class="rounded-xl border border-gray-100 px-2 py-3.5 text-center dark:border-white/10">
              <span class="mx-auto grid h-9 w-9 place-items-center rounded-lg" :class="t.tone" aria-hidden="true">
                <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="width:1.125rem;height:1.125rem">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="t.icon" />
                </svg>
              </span>
              <span class="mt-2 block text-[11px] font-semibold leading-tight text-ink-800 dark:text-slate-300">{{ t.name }}</span>
            </li>
          </ul>
        </div>

        <!-- Middle: the collapse. Rotated a quarter-turn on phones so the flow still reads. -->
        <div class="grid place-items-center py-2" aria-hidden="true">
          <span class="relative grid h-20 w-20 place-items-center">
            <span class="absolute inset-0 rounded-full border border-dashed border-brand-200 dark:border-brand-500/25" />
            <span class="absolute inset-3 rounded-full border border-dashed border-brand-300/70 dark:border-brand-500/35" />
            <svg class="h-7 w-7 rotate-90 text-brand-600 dark:text-brand-400 lg:rotate-0" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m6 5 7 7-7 7M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        <!-- Right: the one -->
        <div>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="font-display text-xl font-extrabold text-ink-900 dark:text-white">
              <span class="text-brand-600 dark:text-brand-400">One</span> Powerful Platform
            </p>
            <span class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
              <svg class="h-3.5 w-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.7-5.4 5.4a1 1 0 0 1-1.4 0L7.3 12.5a1 1 0 1 1 1.4-1.4l1.9 1.9 4.7-4.7a1 1 0 0 1 1.4 1.4Z" /></svg>
              SmartDesk Business Hub
            </span>
          </div>

          <div class="mt-5 rounded-2xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
            <HomeDashboardMock compact />
            <p class="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-600 dark:text-slate-400">
              <svg class="h-4 w-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z" /></svg>
              All your tools. All your data. All in one place.
            </p>
          </div>
        </div>
      </div>

      <!-- ───────── Pillars ───────── -->
      <div class="mt-14 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-100 dark:lg:divide-white/10">
          <div v-for="(p, i) in pillars" :key="p.t" class="flex items-start gap-4" :class="i ? 'lg:pl-7' : ''">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl" :class="p.tone" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="p.icon" /></svg>
            </span>
            <span>
              <span class="block font-display text-base font-extrabold text-ink-900 dark:text-white">{{ p.t }}</span>
              <span class="mt-1 block text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ p.d }}</span>
            </span>
          </div>
        </div>

        <p class="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-sm font-medium text-gray-600 dark:border-white/10 dark:text-slate-400">
          <svg class="h-4 w-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6z" /></svg>
          Save time. Reduce cost. Improve productivity with SmartDesk.
        </p>
      </div>
    </div>
  </section>
</template>
