<script setup lang="ts">
type MenuItem = { title: string; desc: string; to: string; icon: string[]; tone: string; arrow: string }
/** Services opens as a wide panel with its own intro and a talk-to-us column; Company stays a list. */
type NavItem = {
  label: string; to?: string; caret?: boolean; menu?: MenuItem[]
  wide?: boolean
  intro?: { eyebrow: string; title: string; accent: string }
  aside?: { eyebrow: string; title: string; desc: string; cta: string; ctaTo: string; stats: { value: string; label: string; tone: string; icon: string[] }[] }
}

const nav: NavItem[] = [
  { label: 'Products', to: '/products', caret: false },
  {
    label: 'Services',
    caret: true,
    wide: true,
    intro: {
      eyebrow: 'Our Services',
      title: 'Complete Services.',
      accent: 'Lasting Impact.',
    },
    aside: {
      eyebrow: "Let's talk",
      title: 'Have a project in mind?',
      desc: 'Our experts will help you find the right fit.',
      cta: 'Book a Free Consultation',
      ctaTo: '/book-a-meeting',
      stats: [
        { value: '25+', label: 'Countries Served', tone: 'bg-blue-50 text-blue-600', icon: ['M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Z', 'M2.5 12h19', 'M12 2.5c2.5 2.6 2.5 16.4 0 19', 'M12 2.5c-2.5 2.6-2.5 16.4 0 19'] },
        { value: '1000+', label: 'Happy Clients', tone: 'bg-emerald-50 text-emerald-600', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
        { value: '99.9%', label: 'Uptime & Reliability', tone: 'bg-purple-50 text-purple-600', icon: ['M12 2.5 4 6v6c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5V6l-8-3.5Z', 'm9 12 2 2 4-4'] },
      ],
    },
    menu: [
      { title: 'Installation', desc: 'Set up and running, fast and secure.', to: '/services/installation', tone: 'bg-blue-50 text-blue-600', arrow: 'text-blue-500', icon: ['m4.5 19.5 3-1 12-12a2.1 2.1 0 0 0-3-3l-12 12-1 3Z', 'M14 6.5 17.5 10', 'M6 14.5 9.5 18'] },
      { title: 'Custom Development', desc: 'Features and workflows built around your business.', to: '/services/customization', tone: 'bg-emerald-50 text-emerald-600', arrow: 'text-emerald-500', icon: ['m9 8-4 4 4 4', 'm15 8 4 4-4 4', 'm13 5-2 14'] },
      { title: 'Maintenance & Support', desc: 'Updates and support that keep things running.', to: '/services/maintenance', tone: 'bg-orange-50 text-orange-600', arrow: 'text-orange-500', icon: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M6 6 4.6 4.6M19.4 19.4 18 18M18 6l1.4-1.4M4.6 19.4 6 18'] },
      { title: 'Dedicated Team', desc: 'Developers who extend your team and ship faster.', to: '/contact-us', tone: 'bg-purple-50 text-purple-600', arrow: 'text-purple-500', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
      { title: 'Cloud Deployment', desc: 'Scalable, secure hosting for your application.', to: '/contact-us', tone: 'bg-sky-50 text-sky-600', arrow: 'text-sky-500', icon: ['M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7Z'] },
      { title: 'AI Business Automation', desc: 'Automate the manual work and grow with AI.', to: '/contact-us', tone: 'bg-violet-50 text-violet-600', arrow: 'text-violet-500', icon: ['M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z', 'M9.5 15V9h1.8l1.7 3.6L14.7 9h1.8v6', 'M12 2v2M12 20v2M2 12h2M20 12h2'] },
    ],
  },
  {
    label: 'Company',
    caret: true,
    menu: [
      { title: 'About Us', desc: 'Learn more about our journey and values.', to: '/about-us', tone: 'bg-blue-50 text-blue-600', arrow: 'text-blue-500', icon: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 11v5', 'M12 7.5h.01'] },
      // Hidden for now — may be re-enabled later:
      // { title: 'Contact Us', desc: 'Get in touch — we reply within 24 hours.', to: '/contact-us', tone: 'bg-sky-50 text-sky-600', arrow: 'text-sky-500', icon: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6 8.5-6'] },
      { title: 'Life@RazinSoft', desc: 'Explore our life, culture and workplace.', to: '/life-at-razinsoft', tone: 'bg-brand-50 text-brand-600', arrow: 'text-brand-500', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
      { title: 'Careers', desc: 'Join our team and build your future.', to: '/careers', tone: 'bg-purple-50 text-purple-600', arrow: 'text-purple-500', icon: ['M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z', 'M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M3 13h18'] },
      { title: 'Blog', desc: 'Read our latest news and insights.', to: '/blog', tone: 'bg-orange-50 text-orange-600', arrow: 'text-orange-500', icon: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'] },
      { title: 'Support', desc: 'Get help and support from our team.', to: '/support', tone: 'bg-rose-50 text-rose-600', arrow: 'text-rose-500', icon: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', 'M18 17a4 4 0 0 1-4 3h-2'] },
    ],
  },
  { label: 'Contact Us', to: '/contact-us', caret: false },
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
              class="z-50 -translate-x-1/2 pt-3 transition-all duration-200"
              :class="[
                // Wide panels are centred on the page, not on their button: anchored to the button
                // they hang off the left edge, because Services sits left of centre. top-16 matches
                // the header's h-16.
                item.wide
                  ? 'fixed left-1/2 top-16 w-[min(64rem,calc(100vw-2rem))]'
                  : 'absolute left-1/2 top-full w-[600px]',
                openDropdown === item.label ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0',
              ]"
            >
              <!-- Wide panel: services as cards, with the intro and a talk-to-us column beside them -->
              <div v-if="item.wide" class="relative max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
                <div class="grid lg:grid-cols-[1fr_auto]">
                  <div class="min-w-0">
                    <!-- Intro band -->
                    <div v-if="item.intro" class="relative overflow-hidden bg-gradient-to-r from-brand-50/70 via-white to-white px-6 pb-5 pt-6">
                      <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">{{ item.intro.eyebrow }}</p>
                      <span class="mt-1.5 block h-0.5 w-7 rounded bg-brand-600" aria-hidden="true" />
                      <h3 class="mt-2.5 text-xl font-extrabold leading-tight text-ink-900">
                        {{ item.intro.title }}<br><span class="text-brand-600">{{ item.intro.accent }}</span>
                      </h3>

                      <!-- Decorative: a cube with orbiting service marks. Inline so it needs no asset. -->
                      <svg class="pointer-events-none absolute right-5 top-1/2 hidden h-24 w-44 -translate-y-1/2 lg:block" viewBox="0 0 220 130" fill="none" aria-hidden="true">
                        <ellipse cx="110" cy="66" rx="82" ry="40" stroke="#dbeafe" stroke-dasharray="4 5" />
                        <path d="M110 40l26 15v30l-26 15-26-15V55l26-15Z" fill="#bfdbfe" fill-opacity=".55" />
                        <path d="M110 40l26 15-26 15-26-15 26-15Z" fill="#3b82f6" fill-opacity=".75" />
                        <g>
                          <circle cx="36" cy="46" r="15" fill="#fff" stroke="#e5edff" />
                          <path d="M30 48a4 4 0 0 1 .5-8 6 6 0 0 1 11 1 3.8 3.8 0 0 1-.5 7H30Z" fill="#3b82f6" />
                          <circle cx="186" cy="40" r="15" fill="#fff" stroke="#e5edff" />
                          <path d="M186 33l6 2.5v4c0 3.7-2.5 6.4-6 7-3.5-.6-6-3.3-6-7v-4l6-2.5Z" fill="#10b981" />
                          <circle cx="30" cy="98" r="15" fill="#fff" stroke="#e5edff" />
                          <rect x="24" y="97" width="3.4" height="6" rx="1" fill="#10b981" /><rect x="28.6" y="93" width="3.4" height="10" rx="1" fill="#10b981" /><rect x="33.2" y="89" width="3.4" height="14" rx="1" fill="#10b981" />
                          <circle cx="190" cy="96" r="15" fill="#fff" stroke="#e5edff" />
                          <circle cx="190" cy="96" r="4" fill="#3b82f6" /><path d="M190 88v3M190 101v3M182 96h3M195 96h3" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" />
                        </g>
                      </svg>
                    </div>

                    <!-- Service cards -->
                    <div class="grid gap-3 px-6 pb-6 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                      <NuxtLink
                        v-for="m in item.menu"
                        :key="m.title"
                        :to="m.to"
                        class="group/card flex flex-col rounded-xl border border-gray-100 p-4 transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md"
                        @click="openDropdown = null"
                      >
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg" :class="m.tone" aria-hidden="true">
                          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in m.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                        </span>
                        <span class="mt-3 block text-sm font-bold text-ink-900">{{ m.title }}</span>
                        <span class="mt-1 line-clamp-2 block flex-1 text-xs leading-relaxed text-gray-500">{{ m.desc }}</span>
                        <span class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" :class="m.arrow">
                          Learn More
                          <svg class="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                        </span>
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- Talk to us -->
                  <div v-if="item.aside" class="hidden w-60 flex-col border-l border-gray-100 px-5 py-6 lg:flex">
                    <span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 14v-2a8 8 0 0 1 16 0v2M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2ZM18 17a4 4 0 0 1-4 3h-2" /></svg>
                    </span>
                    <p class="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">{{ item.aside.eyebrow }}</p>
                    <h3 class="mt-1.5 text-base font-extrabold leading-snug text-ink-900">{{ item.aside.title }}</h3>
                    <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">{{ item.aside.desc }}</p>

                    <NuxtLink
                      :to="item.aside.ctaTo"
                      class="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-800"
                      @click="openDropdown = null"
                    >
                      {{ item.aside.cta }}
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                    </NuxtLink>

                    <div class="mt-5 space-y-3 border-t border-gray-100 pt-5">
                      <div v-for="st in item.aside.stats" :key="st.label" class="flex items-center gap-3">
                        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full" :class="st.tone" aria-hidden="true">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in st.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                        </span>
                        <span>
                          <span class="block text-sm font-extrabold leading-none text-brand-700">{{ st.value }}</span>
                          <span class="mt-0.5 block text-[11px] text-gray-500">{{ st.label }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/60">
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
