<script setup lang="ts">
const company = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Career & Positions', to: '/careers' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
]
const quick = [
  { label: 'Login', to: '/login' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/#services' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Get Support', to: '/dashboard/support', action: 'support' },
]

// "Get Support": logged-in → dashboard support; otherwise → sign in first.
const { user } = useAuth()
const toast = useToast()
function onSupport() {
  if (user.value) {
    navigateTo('/dashboard/support')
  } else {
    toast.info('Please sign in first to get support.')
    navigateTo('/login?redirect=/dashboard/support')
  }
}
const socials = [
  { label: 'RazinSoft on Facebook', href: 'https://facebook.com/razinsoft', path: 'M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z' },
  { label: 'RazinSoft on Instagram', href: 'https://instagram.com/razinsoft', path: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm4-9.25H8A3.75 3.75 0 0 0 4.25 8.5v8A3.75 3.75 0 0 0 8 20.25h8a3.75 3.75 0 0 0 3.75-3.75v-8A3.75 3.75 0 0 0 16 4.75Zm2.25 11.75A2.25 2.25 0 0 1 16 18.75H8a2.25 2.25 0 0 1-2.25-2.25v-8A2.25 2.25 0 0 1 8 6.25h8a2.25 2.25 0 0 1 2.25 2.25Zm.25-7.25a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z' },
  { label: 'RazinSoft on LinkedIn', href: 'https://www.linkedin.com/company/razinsoft', path: 'M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z' },
]

// Link columns → collapsible accordions on mobile, static columns on desktop.
const linkSections = [
  { key: 'company', title: 'Company', items: company },
  { key: 'quick', title: 'Quick Links', items: quick },
]
const open = reactive<Record<string, boolean>>({ company: false, quick: false })
</script>

<template>
  <footer id="company" class="bg-gradient-to-b from-[#0f1d33] to-[#0a1220] text-gray-300">
    <div class="container-page grid gap-10 py-14 lg:grid-cols-12">
      <!-- Brand -->
      <div class="lg:col-span-3">
        <!-- White-inverted brand logo for the dark footer. -->
        <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" loading="lazy" class="h-9 w-auto brightness-0 invert">
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
          Elevate Your Business with Innovative Web, App, and Software Solutions. Partner for Excellence in Tech.
        </p>
        <address class="mt-5 space-y-3 text-sm not-italic">
          <a href="mailto:info@razinsoft.com" class="flex items-center gap-3 text-gray-300 hover:text-white">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-brand-400" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
            </span>
            info@razinsoft.com
          </a>
          <a href="tel:+8801711257498" class="flex items-center gap-3 text-gray-300 hover:text-white">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-brand-400" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12.04 12.04 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
            </span>
            +880 1711 257498
          </a>
        </address>
        <ul class="mt-5 flex gap-3">
          <li v-for="s in socials" :key="s.href">
            <a :href="s.href" target="_blank" rel="noopener noreferrer" :aria-label="s.label" class="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white">
              <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path :d="s.path" /></svg>
            </a>
          </li>
        </ul>
      </div>

      <!-- Link columns: accordion on mobile (tap heading → arrow toggles), static columns on desktop. -->
      <nav
        v-for="sec in linkSections"
        :key="sec.key"
        class="border-b border-white/10 pb-4 lg:col-span-2 lg:border-0 lg:pb-0"
        :aria-label="sec.title"
      >
        <h2 class="font-display text-base font-bold text-white">
          <button
            type="button"
            class="flex w-full items-center justify-between lg:pointer-events-none"
            :aria-expanded="open[sec.key]"
            @click="open[sec.key] = !open[sec.key]"
          >
            {{ sec.title }}
            <svg
              class="h-4 w-4 text-gray-400 transition-transform duration-200 lg:hidden"
              :class="open[sec.key] && 'rotate-180'"
              fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>
        <ul class="mt-4 space-y-3 text-sm" :class="open[sec.key] ? 'block' : 'hidden lg:block'">
          <li v-for="i in sec.items" :key="i.label">
            <button v-if="(i as any).action === 'support'" type="button" @click="onSupport" class="text-left text-gray-400 hover:text-white">{{ i.label }}</button>
            <NuxtLink v-else :to="i.to" class="text-gray-400 hover:text-white">{{ i.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Global Offices -->
      <div class="lg:col-span-5">
        <h2 class="flex items-center gap-2 font-display text-base font-bold text-white">
          <svg class="h-5 w-5 text-brand-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>
          Global Offices
        </h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div v-for="o in [{ name: 'Bangladesh', hq: true, addr: 'HMR Center 171, Shyamoli Ring Road, Dhaka - 1207' }, { name: 'USA Inc', hq: false, addr: '700 Smith St #0070, Houston, TX 77002' }]" :key="o.name" class="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-start gap-3">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/20 text-brand-300" aria-hidden="true">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
              </span>
              <div>
                <p class="flex items-center gap-2 font-semibold text-white">
                  {{ o.name }}
                  <span v-if="o.hq" class="rounded bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">HQ</span>
                </p>
                <p class="mt-1 text-xs leading-relaxed text-gray-400">{{ o.addr }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- WhatsApp Support -->
        <div class="mt-4 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-900/40 to-emerald-800/10 p-4">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white" aria-hidden="true">
              <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.5 4 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z" /></svg>
            </span>
            <div>
              <p class="font-semibold text-white">WhatsApp Support</p>
              <p class="text-xs text-gray-400">Mon-Sat: 9 AM - 9 PM (GMT+6)</p>
            </div>
          </div>
          <div class="mt-3 grid gap-3 sm:grid-cols-2">
            <a href="https://wa.link/woclza " class="rounded-xl bg-white/5 p-3 hover:bg-white/10">
              <p class="text-xs text-gray-400">Sale Queries</p>
              <p class="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                <svg class="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12 12 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
                +880 1711 257498
              </p>
            </a>
            <a href="https://wa.link/hfp42a " class="rounded-xl bg-white/5 p-3 hover:bg-white/10">
              <p class="text-xs text-gray-400">Tech Support</p>
              <p class="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                <svg class="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12 12 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
                +880 1336 909483
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment methods + affiliated -->
    <div class="border-t border-white/10">
      <div class="container-page flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Accepted Payment Methods</p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="rounded-md bg-white px-3 py-1.5 text-sm font-bold italic"><span class="text-[#003087]">Pay</span><span class="text-[#0070e0]">Pal</span></span>
            <span class="rounded-md bg-white px-3 py-1.5 text-sm font-extrabold italic tracking-tight text-[#1434CB]">VISA</span>
            <span role="img" class="flex items-center rounded-md bg-white px-3 py-2" aria-label="Mastercard"><span class="h-4 w-4 rounded-full bg-[#EB001B]" /><span class="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B]/90" /></span>
            <span class="rounded-md bg-white px-3 py-1.5 text-[11px] font-bold text-[#016FD0]">AMERICAN EXPRESS</span>
            <span class="rounded-md bg-white px-3 py-1.5 text-sm font-bold text-ink-900">DISC<span class="text-[#FF6000]">OVER</span></span>
          </div>
        </div>
        <div class="lg:text-right">
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Affiliated With</p>
          <div class="mt-3 flex flex-wrap gap-2 lg:justify-end">
            <img src="/images/CodeCanyon-logo.webp" alt="CodeCanyon" class="h-8 w-auto" width="160" height="32">
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-gray-400 sm:flex-row">
        <p>© 2026 RazinSoft. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <NuxtLink to="/terms-and-conditions" class="hover:text-white">Terms &amp; Conditions</NuxtLink>
          <NuxtLink to="/refund-policy" class="hover:text-white">Refund Policy</NuxtLink>
          <NuxtLink to="/privacy-policy" class="hover:text-white">Privacy Policy</NuxtLink>
          <NuxtLink to="/installation-policy" class="hover:text-white">Installation Policy</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
