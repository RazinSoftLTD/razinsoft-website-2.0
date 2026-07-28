<script setup lang="ts">
/**
 * Product footer, five columns and a bar.
 *
 * Two things from the comp are deliberately absent: the language selector (there is no second
 * language to switch to) and the "All Systems Operational" dot (there is no status page behind it —
 * a green light nobody measures is worth less than no light at all). Add either back the day the
 * thing behind it exists.
 */
const columns = [
  {
    title: 'Platform',
    items: [
      { label: 'Modules', to: '/#modules' },
      { label: 'Screens', to: '/#screens' },
      { label: 'Pricing', to: '/#pricing' },
      { label: 'Questions', to: '/#faq' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Log In', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'Your dashboard', to: '/dashboard' },
      { label: 'Support', to: '/support' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact-us' },
      { label: 'Book a meeting', to: '/book-a-meeting' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About Us', to: '/about-us' },
      { label: 'Contact Us', to: '/contact-us' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Licence & Terms', to: '/terms-and-conditions' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Support Policy', to: '/support-policy' },
    ],
  },
]

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/razinsoft/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z' },
  { label: 'Facebook', href: 'https://www.facebook.com/razinsoft', path: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z' },
  { label: 'YouTube', href: 'https://www.youtube.com/@razinsoft', path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z' },
  { label: 'Instagram', href: 'https://www.instagram.com/razinsoft', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z' },
]

const { theme, toggle } = useTheme()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-100 bg-gray-50/60 dark:border-white/10 dark:bg-white/[0.02]">
    <div class="container-page py-14">
      <div class="grid gap-10 lg:grid-cols-[1.5fr_repeat(5,1fr)]">
        <!-- Mark -->
        <div>
          <NuxtLink to="/" class="inline-flex items-center" aria-label="SmartDesk home">
            <img src="/images/smartdesk-logo.svg" alt="SmartDesk" width="760" height="180" loading="lazy" class="h-9 w-auto dark:hidden">
            <img src="/images/smartdesk-logo-dark.svg" alt="" aria-hidden="true" width="760" height="180" loading="lazy" class="hidden h-9 w-auto dark:block">
          </NuxtLink>
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-slate-400">
            The all-in-one business hub for your CRM, projects, finance, HR, support and more —
            installed on your own server, from a single licence.
          </p>

          <ul class="mt-6 flex items-center gap-2">
            <li v-for="s in socials" :key="s.label">
              <a :href="s.href" target="_blank" rel="noopener" :aria-label="s.label"
                 class="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-400">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path :d="s.path" /></svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div v-for="col in columns" :key="col.title">
          <p class="font-display text-sm font-extrabold text-ink-900 dark:text-white">{{ col.title }}</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in col.items" :key="item.label">
              <NuxtLink :to="item.to"
                        class="group inline-flex items-center gap-1 text-sm text-gray-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                {{ item.label }}
                <svg class="h-3 w-3 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-100 dark:border-white/10">
      <div class="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p class="text-sm text-gray-500 dark:text-slate-500">
          © {{ year }} SmartDesk — a product by
          <a href="https://www.razinsoft.com" target="_blank" rel="noopener" class="font-semibold text-ink-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">RazinSoft</a>.
          All rights reserved.
        </p>

        <ClientOnly>
          <button type="button" class="inline-flex items-center gap-2.5 text-sm font-medium text-gray-600 dark:text-slate-400" @click="toggle">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z" /></svg>
            Dark Mode
            <span class="relative h-6 w-11 rounded-full transition" :class="theme === 'dark' ? 'bg-brand-600' : 'bg-gray-300 dark:bg-white/20'">
              <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all" :class="theme === 'dark' ? 'left-[22px]' : 'left-0.5'" />
            </span>
          </button>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>
