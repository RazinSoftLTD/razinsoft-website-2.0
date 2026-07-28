<script setup lang="ts">
/**
 * The integration argument, made visually: eight modules around one core.
 *
 * The ring is a 3×3 grid with the hub in the middle cell and an SVG underneath drawing the spokes,
 * rather than eight absolutely-positioned cards. Grid keeps the cards the same height whatever the
 * label length, and the whole thing reflows to a plain two-column list on a phone, where a radial
 * diagram at 375px wide is unreadable anyway.
 */
const ring = [
  { name: 'HRM', blurb: 'Employees, payroll & attendance', icon: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0', tone: 'bg-rose-500' },
  { name: 'CRM', blurb: 'Manage leads & customers', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9', tone: 'bg-brand-600' },
  { name: 'Projects', blurb: 'Plan, track & deliver', icon: 'M9 5h11M9 12h11M9 19h11M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2', tone: 'bg-emerald-500' },

  { name: 'Email', blurb: 'Templates, queue & logs', icon: 'M3 6h18v12H3zM3 7l9 6 9-6', tone: 'bg-pink-500' },
  { name: 'Finance', blurb: 'Invoices, expenses & payments', icon: 'M3 6h18v12H3zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 9h.01M18 15h.01', tone: 'bg-violet-500' },

  { name: 'WhatsApp', blurb: 'Every number, one inbox', icon: 'M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A9 9 0 0 1 21 12ZM8.5 9.5c0 3.3 2.7 6 6 6', tone: 'bg-teal-500' },
  { name: 'Analytics', blurb: 'Reports & insights in real time', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2', tone: 'bg-indigo-500' },
  { name: 'Support', blurb: 'Tickets, help desk & replies', icon: 'M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', tone: 'bg-amber-500' },
]

const cards = [
  { t: 'CRM & Sales', d: 'Capture leads, track deals and close more sales faster.', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9', tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' },
  { t: 'Project Management', d: 'Plan, manage tasks, collaborate and deliver projects on time.', icon: 'M3 7h6l2 2h10v11H3zM3 7V4h6', tone: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' },
  { t: 'HR & Payroll', d: 'Manage employees, attendance, payroll and performance.', icon: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0', tone: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' },
  { t: 'Finance & Invoicing', d: 'Automate invoices, expenses, payments and financial reports.', icon: 'M7 3h10v18l-2.5-2-2.5 2-2.5-2L7 21zM10 8h4M10 12h4', tone: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' },
  { t: 'Customer Support', d: 'Resolve tickets faster and deliver a better customer experience.', icon: 'M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', tone: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10' },
  { t: 'Messaging', d: 'WhatsApp, email and internal team chat where the work already lives.', icon: 'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z', tone: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10' },
]
</script>

<template>
  <section class="container-page grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-14 lg:py-28">
    <!-- ───────── The ring ───────── -->
    <div class="relative">
      <!-- Spokes. Hidden on phones, where the grid is a plain list and lines would cross nothing. -->
      <svg class="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100"
           preserveAspectRatio="none" aria-hidden="true">
        <g stroke="currentColor" class="text-brand-200 dark:text-brand-500/30" stroke-width="0.4" fill="none">
          <path d="M50 50 L18 18M50 50 L50 15M50 50 L82 18M50 50 L15 50M50 50 L85 50M50 50 L18 82M50 50 L50 85M50 50 L82 82" />
        </g>
      </svg>

      <div class="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <template v-for="(m, i) in ring" :key="m.name">
          <!-- The hub drops into the middle cell of the 3×3, between the 4th and 5th module. -->
          <div v-if="i === 4" class="order-none col-span-2 sm:col-span-1">
            <div class="grid aspect-square place-items-center rounded-full border border-brand-100 bg-white text-center shadow-xl shadow-brand-100/50 dark:border-brand-500/20 dark:bg-slate-900 dark:shadow-brand-500/10">
              <div>
                <img src="/images/smartdesk-icon.svg" alt="" width="64" height="64" class="mx-auto h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
                <p class="mt-1.5 font-display text-sm font-extrabold text-ink-900 dark:text-white sm:text-lg">SmartDesk</p>
                <p class="text-[11px] font-semibold text-brand-600 dark:text-brand-400 sm:text-sm">Business Hub</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4">
            <span class="mx-auto grid h-9 w-9 place-items-center rounded-xl text-white sm:h-10 sm:w-10" :class="m.tone" aria-hidden="true">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="m.icon" /></svg>
            </span>
            <p class="mt-2 font-display text-sm font-extrabold text-ink-900 dark:text-white">{{ m.name }}</p>
            <p class="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-slate-400">{{ m.blurb }}</p>
          </div>
        </template>
      </div>

      <p class="mx-auto mt-6 w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
        100% Integrated · One database · Self-hosted
      </p>
    </div>

    <!-- ───────── The argument ───────── -->
    <div>
      <p class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.6L19.5 9l-4.6 3.4 1.7 5.6L12 14.6 7.4 18l1.7-5.6L4.5 9l5.7-1.4z" /></svg>
        Connected. Integrated. Simplified.
      </p>

      <h2 class="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-5xl">
        Every Department<br>
        <span class="text-brand-600 dark:text-brand-400">Works Together</span>
      </h2>

      <p class="mt-5 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-slate-400">
        No more disconnected systems. SmartDesk keeps your sales, operations, finance, HR and
        support in step — from a single workspace, on your own server.
      </p>

      <div class="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div v-for="c in cards" :key="c.t"
             class="rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-brand-200 hover:shadow-lg hover:shadow-gray-100 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/30 dark:hover:shadow-none">
          <span class="grid h-10 w-10 place-items-center rounded-xl" :class="c.tone" aria-hidden="true">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="c.icon" /></svg>
          </span>
          <p class="mt-3.5 font-display text-base font-extrabold text-ink-900 dark:text-white">{{ c.t }}</p>
          <p class="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ c.d }}</p>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-brand-50 p-5 dark:bg-brand-500/10">
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white" aria-hidden="true">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m13 2-9 12h7l-1 8 9-12h-7z" /></svg>
        </span>
        <span class="min-w-0 flex-1">
          <span class="block font-display text-base font-extrabold text-ink-900 dark:text-white">Everything updates in real time.</span>
          <span class="block text-sm text-gray-600 dark:text-slate-400">One action. Instant sync. Total visibility.</span>
        </span>
        <NuxtLink to="/#screens" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-ink-900 shadow-sm transition hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
          See it in Action
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
