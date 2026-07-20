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
  { label: 'RazinSoft on Facebook', href: 'https://www.facebook.com/razinsoft', path: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z' },
  { label: 'RazinSoft on Instagram', href: 'http://instagram.com/razinsoftltd', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z' },
  { label: 'RazinSoft on LinkedIn', href: 'https://www.linkedin.com/company/razinsoft/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z' },
  { label: 'RazinSoft on YouTube', href: 'https://www.youtube.com/@razinsoft', path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z' },
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
          <div v-for="o in [{ name: 'Bangladesh', hq: true, addr: '1st Floor, RMR Center, A&B Ring Rd, Dhaka 1207' }, { name: 'USA Inc', hq: false, addr: '700 Smith St #0070, Houston, TX 77002' }]" :key="o.name" class="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
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
            <a href="https://wa.link/hfp42a" class="rounded-xl bg-white/5 p-3 hover:bg-white/10">
              <p class="text-xs text-gray-400">Sale Queries</p>
              <p class="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                <svg class="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12 12 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
                +880 1711 257498
              </p>
            </a>
            <a href="https://wa.me/8801336909483" class="rounded-xl bg-white/5 p-3 hover:bg-white/10">
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
