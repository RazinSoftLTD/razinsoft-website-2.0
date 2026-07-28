<script setup lang="ts">
type Sub = { label: string; desc: string; to?: string; soon?: boolean }
type NavItem = { label: string; to?: string; menu?: Sub[] }

/**
 * Product-site nav.
 *
 * Every entry goes somewhere that exists. The comp showed a "Solutions" menu of industry pages
 * (Startups, Agencies, Healthcare…) — those are not written, and a nav that drops a buyer on a 404
 * costs more trust than a sixth menu buys.
 */
const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    // The four surfaces the licence ships, not the four things it does — "Modules" already
    // covers that further down the page.
    label: 'Platform',
    menu: [
      { label: 'Website', desc: 'The public site your customers arrive on.', to: '/' },
      { label: 'Client Dashboard', desc: 'Where your customers see invoices, orders and tickets.', to: '/dashboard' },
      { label: 'Admin Panel', desc: 'The staff side: CRM, HR, projects, finance and messaging.', to: '/#modules' },
      { label: 'Admin & Client apps', desc: 'Mobile, for both sides.', soon: true },
    ],
  },
  {
    label: 'Resources',
    menu: [
      { label: 'Blog', desc: 'Release notes and how-to guides.', to: '/blog' },
      { label: 'Support', desc: 'Help after you have bought it.', to: '/support' },
      { label: 'Questions', desc: 'What buyers ask before purchase.', to: '/#faq' },
    ],
  },
  { label: 'Pricing', to: '/#pricing' },
  {
    label: 'More',
    menu: [
      { label: 'About SmartDesk', desc: 'Who builds it, and why it works this way.', to: '/about-us' },
      { label: 'Contact', desc: 'Ask us anything, before or after.', to: '/contact-us' },
      { label: 'Licence & terms', desc: 'What each licence covers.', to: '/terms-and-conditions' },
    ],
  },
]

const open = ref(false)
const mobileSub = ref<string | null>(null)
const openDropdown = ref<string | null>(null)

const route = useRoute()
watch(() => route.fullPath, () => { open.value = false; mobileSub.value = null; openDropdown.value = null })

const { isLoggedIn } = useAuth()
const { theme, toggle } = useTheme()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/85">
    <div class="container-page flex h-[72px] items-center justify-between gap-4">
      <NuxtLink to="/" class="flex shrink-0 items-center" aria-label="SmartDesk home">
        <!-- Two files rather than a CSS filter: the mark is a coloured tile, and `invert` would
             flatten it to a white square. Only the wordmark differs between them. -->
        <img src="/images/smartdesk-logo.svg" alt="SmartDesk" width="760" height="180" class="h-8 w-auto max-[379px]:h-6 dark:hidden">
        <img src="/images/smartdesk-logo-dark.svg" alt="" aria-hidden="true" width="760" height="180" class="hidden h-8 w-auto max-[379px]:h-6 dark:block">
      </NuxtLink>

      <!-- ───────── Desktop nav ───────── -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <template v-for="item in nav" :key="item.label">
          <div v-if="item.menu" class="relative"
               @mouseenter="openDropdown = item.label" @mouseleave="openDropdown = null">
            <button type="button"
                    class="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors"
                    :class="openDropdown === item.label
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-ink-700 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'"
                    @click="openDropdown = openDropdown === item.label ? null : item.label">
              {{ item.label }}
              <svg class="h-4 w-4 text-gray-400 transition-transform duration-200" :class="openDropdown === item.label ? 'rotate-180' : ''"
                   fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
            </button>

            <!-- pt-3 bridges the gap so the panel does not close as the pointer crosses it -->
            <div class="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3 transition-all duration-200"
                 :class="openDropdown === item.label ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'">
              <div class="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/60 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
                <template v-for="s in item.menu" :key="s.label">
                  <!-- Not shipped yet, so not a link. A menu entry that looks clickable and
                       goes nowhere is worse than one that says why. -->
                  <span v-if="s.soon" class="block cursor-default rounded-xl px-4 py-3">
                    <span class="flex items-center gap-2">
                      <span class="text-sm font-bold text-gray-400 dark:text-slate-500">{{ s.label }}</span>
                      <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:bg-white/10 dark:text-slate-400">Soon</span>
                    </span>
                    <span class="block text-xs text-gray-400 dark:text-slate-500">{{ s.desc }}</span>
                  </span>

                  <NuxtLink v-else :to="s.to!"
                            class="block rounded-xl px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                            @click="openDropdown = null">
                    <span class="block text-sm font-bold text-ink-900 dark:text-white">{{ s.label }}</span>
                    <span class="block text-xs text-gray-500 dark:text-slate-400">{{ s.desc }}</span>
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>

          <NuxtLink v-else :to="item.to!"
                    class="rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors"
                    :class="route.path === item.to
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                      : 'text-ink-700 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'">
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- ───────── Right ───────── -->
      <div class="flex items-center gap-2 sm:gap-3">
        <AppSearch />

        <ClientOnly>
          <button type="button" class="rounded-lg p-2 text-ink-700 transition hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-white/5"
                  :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggle">
            <svg v-if="theme === 'dark'" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" /><path stroke-linecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z" />
            </svg>
          </button>
        </ClientOnly>

        <ClientOnly>
          <NuxtLink :to="isLoggedIn ? '/dashboard' : '/login'"
                    class="hidden rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5 sm:inline-flex">
            {{ isLoggedIn ? 'Dashboard' : 'Log In' }}
          </NuxtLink>
          <template #fallback>
            <span class="hidden rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-ink-900 dark:border-white/15 dark:text-white sm:inline-flex">Log In</span>
          </template>
        </ClientOnly>

        <NuxtLink to="/#pricing"
                  class="hidden items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:inline-flex">
          Get Started
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>

        <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-white/5 lg:hidden"
                :aria-expanded="open" aria-controls="mobile-menu" aria-label="Toggle menu" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ───────── Mobile ───────── -->
    <div class="grid overflow-hidden transition-all duration-300 ease-out lg:hidden"
         :class="open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
      <nav id="mobile-menu" :inert="!open" class="min-h-0 overflow-hidden border-t border-gray-100 bg-white dark:border-white/10 dark:bg-slate-950" aria-label="Mobile">
        <ul class="container-page space-y-1 py-3">
          <li v-for="item in nav" :key="item.label">
            <template v-if="item.menu">
              <button type="button" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-white/5"
                      @click="mobileSub = mobileSub === item.label ? null : item.label">
                {{ item.label }}
                <svg class="h-4 w-4 text-gray-400 transition-transform duration-200" :class="mobileSub === item.label ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
              </button>
              <div class="grid overflow-hidden transition-all duration-300 ease-out" :class="mobileSub === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <ul class="min-h-0 overflow-hidden pl-3">
                  <li v-for="s in item.menu" :key="s.label">
                    <span v-if="s.soon" class="block px-3 py-2.5">
                      <span class="flex items-center gap-2">
                        <span class="text-sm font-semibold text-gray-400 dark:text-slate-500">{{ s.label }}</span>
                        <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:bg-white/10 dark:text-slate-400">Soon</span>
                      </span>
                      <span class="block text-xs text-gray-400 dark:text-slate-500">{{ s.desc }}</span>
                    </span>

                    <NuxtLink v-else :to="s.to!" class="block rounded-lg px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5">
                      <span class="block text-sm font-semibold text-ink-900 dark:text-white">{{ s.label }}</span>
                      <span class="block text-xs text-gray-500 dark:text-slate-400">{{ s.desc }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </template>

            <NuxtLink v-else :to="item.to!" class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-white/5">{{ item.label }}</NuxtLink>
          </li>

          <li class="flex gap-2 pt-2">
            <NuxtLink to="/login" class="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-ink-900 dark:border-white/15 dark:text-white">Log In</NuxtLink>
            <NuxtLink to="/#pricing" class="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white">Get Started</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
