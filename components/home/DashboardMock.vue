<script setup lang="ts">
/**
 * The product shot, drawn rather than photographed.
 *
 * It appears three times on the home page at three different sizes, and it has to work in dark
 * mode. A PNG would need six exports and would go stale the day the panel changes; markup scales,
 * re-themes and stays sharp on a retina screen for a fraction of the bytes.
 *
 * Every figure in it is illustrative. Nothing here is read from a real install.
 */
const props = withDefaults(defineProps<{
  /** The right-hand donut: tasks (128 total) or project completion (75%). */
  donut?: 'tasks' | 'projects'
  /** Adds the "Upgrade Plan" card at the foot of the sidebar. */
  upgrade?: boolean
  /** Drops the four stat cards down to a tighter layout for the smaller placements. */
  compact?: boolean
}>(), { donut: 'tasks', upgrade: false, compact: false })

const nav = [
  { label: 'Dashboard', icon: 'M4 13h6V4H4zM14 8h6V4h-6zM14 20h6v-9h-6zM4 20h6v-4H4z', on: true },
  { label: 'CRM', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9M16 4.1a4 4 0 0 1 0 7.8' },
  { label: 'Projects', icon: 'M3 4h7v7H3zM14 4h7v7h-7zM3 15h7v5H3zM14 15h7v5h-7z' },
  { label: 'Tasks', icon: 'M9 5h9M9 12h9M9 19h9M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2' },
  { label: 'Finance', icon: 'M3 6h18v12H3zM3 10h18M7 15h4' },
  { label: 'HR & Payroll', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM22 19v-1a4 4 0 0 0-3-3.9' },
  { label: 'Calendar', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
  { label: 'Reports', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
  { label: 'Documents', icon: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4' },
  { label: 'Automation', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2' },
  { label: 'Settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 13.6a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9L4.1 6.6a2 2 0 1 1 2.8-2.8L7 3.9a1.7 1.7 0 0 0 2.9-1.2V2a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 17 3.9l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.4Z' },
]

/** The four headline figures, each with the shape of its own trend rather than a shared squiggle. */
const stats = [
  { label: 'Total Revenue', value: '$125,420', delta: '18.6%', up: true, tone: 'text-blue-500', line: '0,17 10,14 20,16 30,10 40,12 50,7 60,9 70,4 80,6 90,2 100,3' },
  { label: 'Total Expenses', value: '$68,230', delta: '8.4%', up: true, tone: 'text-rose-500', line: '0,12 10,15 20,11 30,14 40,9 50,13 60,8 70,11 80,6 90,9 100,5' },
  { label: 'Total Profit', value: '$57,190', delta: '24.1%', up: true, tone: 'text-emerald-500', line: '0,16 10,15 20,12 30,13 40,9 50,10 60,6 70,7 80,4 90,5 100,2' },
  { label: 'New Customers', value: '2,540', delta: '15.2%', up: true, tone: 'text-violet-500', line: '0,14 10,12 20,13 30,9 40,11 50,7 60,8 70,5 80,7 90,3 100,4' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

/**
 * Donut slices as stroke-dasharray on one circle each, drawn from 12 o'clock.
 * r = 42 → circumference 263.9; each slice's dash is its share of that.
 */
const CIRC = 2 * Math.PI * 42

const slices = computed(() => {
  const parts = props.donut === 'projects'
    ? [{ label: 'Completed', pct: 75, colour: '#2563eb' }, { label: 'In Progress', pct: 15, colour: '#f59e0b' }, { label: 'Pending', pct: 10, colour: '#10b981' }]
    : [{ label: 'Completed', pct: 65, colour: '#2563eb' }, { label: 'In Progress', pct: 20, colour: '#f59e0b' }, { label: 'Pending', pct: 15, colour: '#10b981' }]

  let sweep = 0
  return parts.map((p) => {
    const seg = { ...p, dash: `${(p.pct / 100) * CIRC} ${CIRC}`, offset: -(sweep / 100) * CIRC }
    sweep += p.pct
    return seg
  })
})

const card = 'rounded-xl border border-gray-100 bg-white p-3 dark:border-white/10 dark:bg-white/5'
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-2xl shadow-slate-300/40 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
    <div class="flex">
      <!-- ───────── Sidebar ───────── -->
      <aside class="hidden w-[26%] shrink-0 border-r border-gray-100 p-3 dark:border-white/10 sm:block">
        <div class="flex items-center gap-1.5 px-1.5 pb-3">
          <img src="/images/smartdesk-icon.svg" alt="" width="40" height="40" class="h-5 w-5" aria-hidden="true">
          <span class="font-display text-[11px] font-extrabold tracking-tight text-ink-900 dark:text-white">SmartDesk</span>
        </div>

        <ul class="space-y-0.5">
          <li v-for="n in nav" :key="n.label">
            <span class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[9px] font-medium"
                  :class="n.on
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-500 dark:text-slate-400'">
              <svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" :d="n.icon" />
              </svg>
              <span class="truncate">{{ n.label }}</span>
            </span>
          </li>
        </ul>

        <!-- Upgrade nudge, only where the design shows one -->
        <div v-if="upgrade" class="mt-3 rounded-lg bg-brand-50 p-2.5 dark:bg-brand-500/10">
          <p class="flex items-center gap-1 text-[9px] font-bold text-ink-900 dark:text-white">
            <svg class="h-2.5 w-2.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
            Upgrade Plan
          </p>
          <p class="mt-1 text-[8px] leading-relaxed text-gray-500 dark:text-slate-400">Unlock all features and grow your business faster.</p>
          <p class="mt-1.5 text-[8px] font-bold text-brand-600 dark:text-brand-400">Upgrade Now →</p>
        </div>
      </aside>

      <!-- ───────── Panel ───────── -->
      <div class="min-w-0 flex-1 bg-gray-50/60 p-3 dark:bg-transparent">
        <!-- Top bar -->
        <div class="flex items-center justify-between gap-3 pb-3">
          <p class="font-display text-xs font-extrabold text-ink-900 dark:text-white">Dashboard</p>

          <div class="flex items-center gap-2">
            <div class="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-white/10 dark:bg-white/5 md:flex">
              <svg class="h-2.5 w-2.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="m20 20-3.5-3.5" /></svg>
              <span class="text-[8px] text-gray-400">Search anything…</span>
            </div>

            <span class="relative text-gray-400">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M18 8a6 6 0 1 0-12 0c0 7-2 8-2 8h16s-2-1-2-8M13.7 21a2 2 0 0 1-3.4 0" /></svg>
              <span class="absolute -right-1 -top-1 grid h-2.5 w-2.5 place-items-center rounded-full bg-rose-500 text-[6px] font-bold text-white">3</span>
            </span>

            <span class="flex items-center gap-1.5">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">JD</span>
              <span class="hidden leading-tight sm:block">
                <span class="block text-[8px] font-bold text-ink-900 dark:text-white">John Doe</span>
                <span class="block text-[7px] text-gray-400">Admin</span>
              </span>
            </span>
          </div>
        </div>

        <!-- Stat cards -->
        <div class="grid gap-2" :class="compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'">
          <div v-for="s in stats" :key="s.label" :class="card">
            <p class="text-[8px] text-gray-500 dark:text-slate-400">{{ s.label }}</p>
            <div class="mt-0.5 flex items-baseline justify-between gap-1">
              <p class="font-display text-[13px] font-extrabold text-ink-900 dark:text-white">{{ s.value }}</p>
              <span class="text-[7px] font-bold" :class="s.label === 'Total Expenses' ? 'text-rose-500' : 'text-emerald-500'">↑ {{ s.delta }}</span>
            </div>
            <svg class="mt-1.5 h-4 w-full" :class="s.tone" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <polyline :points="s.line" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <!-- Charts -->
        <div class="mt-2 grid gap-2 lg:grid-cols-[1.5fr_1fr]">
          <!-- Revenue -->
          <div :class="card">
            <div class="flex items-center justify-between">
              <p class="text-[9px] font-bold text-ink-900 dark:text-white">Revenue Overview</p>
              <span class="flex items-center gap-1 rounded border border-gray-200 px-1.5 py-0.5 text-[7px] text-gray-500 dark:border-white/10 dark:text-slate-400">
                This Month
                <svg class="h-2 w-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="m6 9 6 6 6-6" /></svg>
              </span>
            </div>

            <div class="mt-2 flex gap-1.5">
              <div class="flex flex-col justify-between py-0.5 text-[6px] text-gray-400">
                <span>100K</span><span>75K</span><span>50K</span><span>25K</span><span>0</span>
              </div>
              <div class="min-w-0 flex-1">
                <svg class="h-[68px] w-full" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stop-color="#2563eb" stop-opacity="0.22" />
                      <stop offset="1" stop-color="#2563eb" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="currentColor" class="text-gray-100 dark:text-white/10" stroke-width="1">
                    <line x1="0" y1="0.5" x2="200" y2="0.5" /><line x1="0" y1="17.5" x2="200" y2="17.5" />
                    <line x1="0" y1="34.5" x2="200" y2="34.5" /><line x1="0" y1="51.5" x2="200" y2="51.5" />
                    <line x1="0" y1="68.5" x2="200" y2="68.5" />
                  </g>
                  <path d="M0 58 C 18 56, 26 44, 40 45 S 62 56, 78 48 S 100 30, 120 30 S 146 22, 166 14 S 188 8, 200 6 L200 70 L0 70 Z" fill="url(#rev-fill)" />
                  <path d="M0 58 C 18 56, 26 44, 40 45 S 62 56, 78 48 S 100 30, 120 30 S 146 22, 166 14 S 188 8, 200 6"
                        fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                </svg>
                <div class="flex justify-between pt-1 text-[6px] text-gray-400">
                  <span v-for="m in months" :key="m">{{ m }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Donut -->
          <div :class="card">
            <p class="text-[9px] font-bold text-ink-900 dark:text-white">
              {{ donut === 'projects' ? 'Projects Overview' : 'Task Overview' }}
            </p>

            <div class="mt-1.5 flex items-center gap-2">
              <svg class="h-[62px] w-[62px] shrink-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" class="text-gray-100 dark:text-white/10" stroke-width="14" />
                <circle v-for="s in slices" :key="s.label" cx="50" cy="50" r="42" fill="none"
                        :stroke="s.colour" stroke-width="14" :stroke-dasharray="s.dash" :stroke-dashoffset="s.offset" />
              </svg>

              <ul class="min-w-0 flex-1 space-y-1">
                <li v-for="s in slices" :key="s.label" class="flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 shrink-0 rounded-full" :style="{ background: s.colour }" />
                  <span class="min-w-0 flex-1 truncate text-[7px] text-gray-500 dark:text-slate-400">{{ s.label }}</span>
                  <span class="text-[7px] font-bold text-ink-900 dark:text-white">{{ s.pct }}%</span>
                </li>
              </ul>
            </div>

            <p v-if="donut === 'tasks'" class="mt-1 text-center text-[7px] text-gray-400">128 total tasks</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
