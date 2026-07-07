<script setup lang="ts">
type MenuItem = { title: string; desc: string; to: string; icon: string[]; tone: string; arrow: string }
type NavItem = { label: string; to?: string; caret?: boolean; menu?: MenuItem[] }

const nav: NavItem[] = [
  { label: 'Products', to: '/products', caret: false },
  { label: 'Free Product', to: '/products?sort=free', caret: false },
  { label: 'Services', to: '/#services', caret: true },
  {
    label: 'Company',
    caret: true,
    menu: [
      { title: 'About Us', desc: 'Learn more about our journey and values.', to: '/about-us', tone: 'bg-blue-50 text-blue-600', arrow: 'text-blue-500', icon: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 11v5', 'M12 7.5h.01'] },
      { title: 'Contact Us', desc: 'Get in touch — we reply within 24 hours.', to: '/contact-us', tone: 'bg-sky-50 text-sky-600', arrow: 'text-sky-500', icon: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6 8.5-6'] },
      { title: 'Life@RazinSoft', desc: 'Explore our life, culture and workplace.', to: '/life', tone: 'bg-emerald-50 text-emerald-600', arrow: 'text-emerald-500', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
      { title: 'Careers', desc: 'Join our team and build your future.', to: '/careers', tone: 'bg-purple-50 text-purple-600', arrow: 'text-purple-500', icon: ['M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z', 'M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M3 13h18'] },
      { title: 'Blog', desc: 'Read our latest news and insights.', to: '/blog', tone: 'bg-orange-50 text-orange-600', arrow: 'text-orange-500', icon: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'] },
      { title: 'Support', desc: 'Get help and support from our team.', to: '/support', tone: 'bg-rose-50 text-rose-600', arrow: 'text-rose-500', icon: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', 'M18 17a4 4 0 0 1-4 3h-2'] },
    ],
  },
]

const open = ref(false)
const mobileSub = ref<string | null>(null)
const openDropdown = ref<string | null>(null) // desktop mega-menu (JS-controlled so it closes on click)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false; mobileSub.value = null; openDropdown.value = null })

const { count } = useCart()
const { user, isLoggedIn, fetchMe } = useAuth()
const loggedIn = isLoggedIn
onMounted(() => {
  if (isLoggedIn.value && !user.value) fetchMe()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2" aria-label="RazinSoft home">
        <!-- Brand logo (shrinks on ultra-narrow phones so the header never overflows). -->
        <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" class="h-8 w-auto max-[379px]:h-6">
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <template v-for="item in nav" :key="item.label">
          <!-- Item with mega-dropdown (JS-controlled: opens on hover, closes on click/leave) -->
          <div
            v-if="item.menu"
            class="relative"
            @mouseenter="openDropdown = item.label"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              :class="openDropdown === item.label ? 'text-brand-600' : 'text-ink-700'"
              @click="openDropdown = openDropdown === item.label ? null : item.label"
            >
              {{ item.label }}
              <svg class="h-4 w-4 transition-transform duration-200" :class="openDropdown === item.label ? 'rotate-180 text-brand-500' : 'text-gray-400'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
            </button>

            <!-- Panel (pt-3 bridges the hover gap) -->
            <div
              class="absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-3 transition-all duration-200"
              :class="openDropdown === item.label ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'"
            >
              <div class="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/60">
                <span class="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl-sm border-l border-t border-gray-100 bg-white" aria-hidden="true" />
                <NuxtLink
                  v-for="(m, idx) in item.menu"
                  :key="m.title"
                  :to="m.to"
                  class="group/row flex items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50/80"
                  :class="[idx === 0 ? 'rounded-t-xl' : '', idx === item.menu.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100']"
                  @click="openDropdown = null"
                >
                  <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl" :class="m.tone" aria-hidden="true">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block font-bold text-ink-900">{{ m.title }}</span>
                    <span class="block text-sm text-gray-500">{{ m.desc }}</span>
                  </span>
                  <svg class="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/row:translate-x-1" :class="m.arrow" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Plain link -->
          <NuxtLink
            v-else
            :to="item.to!"
            class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50 hover:text-ink-900"
          >
            {{ item.label }}
            <svg v-if="item.caret" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Search -->
        <AppSearch />

        <!-- Book a meeting CTA (desktop) -->
        <!-- <NuxtLink to="/book-a-meeting" class="hidden rounded-xl border border-brand-600 px-3.5 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white lg:inline-flex">
          Book a Meeting
        </NuxtLink> -->

        <!-- Cart — always available -->
        <NuxtLink to="/cart" class="relative rounded-lg p-2 text-ink-700 hover:bg-gray-50" :aria-label="`View cart, ${count} items`">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" />
          </svg>
          <ClientOnly>
            <span v-if="count" class="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{{ count }}</span>
          </ClientOnly>
        </NuxtLink>

        <ClientOnly>
          <NuxtLink v-if="loggedIn" to="/dashboard" class="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700" aria-label="Go to your dashboard">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <NuxtLink v-else to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <template #fallback>
            <NuxtLink to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
            </NuxtLink>
          </template>
        </ClientOnly>
        <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50 lg:hidden" :aria-expanded="open" aria-controls="mobile-menu" aria-label="Toggle menu" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu — smooth expand/collapse via grid-rows + fade -->
    <div
      class="grid overflow-hidden transition-all duration-300 ease-out lg:hidden"
      :class="open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <nav id="mobile-menu" :inert="!open" class="min-h-0 overflow-hidden border-t border-gray-100 bg-white" aria-label="Mobile">
        <ul class="container-page space-y-1 py-3">
          <li
            v-for="(item, i) in nav"
            :key="item.label"
            class="transition-all duration-300 ease-out"
            :class="open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'"
            :style="{ transitionDelay: open ? `${i * 40 + 60}ms` : '0ms' }"
          >
            <!-- Collapsible group -->
            <template v-if="item.menu">
              <button type="button" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50" @click="mobileSub = mobileSub === item.label ? null : item.label">
                {{ item.label }}
                <svg class="h-4 w-4 text-gray-400 transition-transform duration-200" :class="mobileSub === item.label ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
              </button>
              <div class="grid overflow-hidden transition-all duration-300 ease-out" :class="mobileSub === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <ul class="min-h-0 space-y-0.5 overflow-hidden pl-2">
                  <li v-for="m in item.menu" :key="m.title">
                    <NuxtLink :to="m.to" class="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50">
                      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg" :class="m.tone" aria-hidden="true">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                      </span>
                      <span>
                        <span class="block text-sm font-semibold text-ink-900">{{ m.title }}</span>
                        <span class="block text-xs text-gray-500">{{ m.desc }}</span>
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </template>

            <!-- Plain link -->
            <NuxtLink v-else :to="item.to!" class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
