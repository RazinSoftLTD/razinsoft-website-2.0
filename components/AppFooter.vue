<script setup lang="ts">
/**
 * A product footer.
 *
 * The old one belonged to an agency: global offices, payment logos, a line about elevating your
 * business, two support hotlines. None of that helps somebody deciding whether to buy a licence,
 * and a wall of it at the bottom of a sales page reads as noise.
 *
 * What is left is what a buyer at the end of the page still wants: the product's own links, the
 * one way to reach us, and who makes it.
 */
const product = [
  { label: 'Modules', to: '/#modules' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Screens', to: '/#screens' },
  { label: 'Blog', to: '/blog' },
]

const help = [
  { label: 'Contact', to: '/contact-us' },
  { label: 'About SmartDesk', to: '/about-us' },
  { label: 'Customer login', to: '/login' },
]

const legal = [
  { label: 'Licence & terms', to: '/terms-and-conditions' },
  { label: 'Refund policy', to: '/refund-policy' },
  { label: 'Privacy', to: '/privacy-policy' },
]

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/razinsoft', path: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/razinsoft/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z' },
  { label: 'YouTube', href: 'https://www.youtube.com/@razinsoft', path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z' },
]

const columns = [
  { title: 'Product', items: product },
  { title: 'Help', items: help },
  { title: 'Legal', items: legal },
]
</script>

<template>
  <footer class="border-t border-gray-100 bg-white">
    <div class="container-page py-14">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <!-- Mark and the one line that matters -->
        <div>
          <NuxtLink to="/" class="inline-flex items-center" aria-label="SmartDesk home">
            <img src="/images/smartdesk-logo.svg" alt="SmartDesk" width="760" height="180" loading="lazy" class="h-8 w-auto">
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
            A business hub you install on your own server. One licence, no per-seat fees, and the
            source comes with it.
          </p>

          <a href="mailto:support@razinsoft.com"
             class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-600">
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 6h18v12H3zM3 7l9 6 9-6" />
            </svg>
            support@razinsoft.com
          </a>
        </div>

        <div v-for="col in columns" :key="col.title">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400">{{ col.title }}</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in col.items" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-gray-600 transition hover:text-brand-600">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-100">
      <div class="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} SmartDesk — a product by
          <a href="https://www.razinsoft.com" target="_blank" rel="noopener" class="font-semibold text-ink-900 hover:text-brand-600">RazinSoft</a>.
        </p>

        <div class="flex items-center gap-1">
          <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener"
             :aria-label="s.label"
             class="grid h-9 w-9 place-items-center rounded-lg text-gray-400 transition hover:bg-gray-50 hover:text-ink-900">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path :d="s.path" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
