<script setup lang="ts">
// Data-driven service pages — one file powers Installation / Customisation / Maintenance.
type Feature = { title: string; desc: string; paths: string[] }
type Service = {
  slug: string
  eyebrow: string
  title: string
  highlight: string
  intro: string
  tone: string
  accent: string
  icon: string[]
  features: Feature[]
  steps: { title: string; desc: string }[]
}

const SERVICES: Record<string, Service> = {
  installation: {
    slug: 'installation',
    eyebrow: 'Service',
    title: 'Professional',
    highlight: 'Installation',
    intro: 'Skip the technical hassle — our engineers install, configure and launch your product on your own server, correctly and securely, the first time.',
    tone: 'bg-emerald-50 text-emerald-600',
    accent: 'emerald',
    icon: ['M12 3v12', 'm8 11 4 4 4-4', 'M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4'],
    features: [
      { title: 'Server Setup', desc: 'We configure your hosting, domain, SSL and database so everything runs smoothly from day one.', paths: ['M4 5h16a1 1 0 0 1 1 1v4H3V6a1 1 0 0 1 1-1Z', 'M3 14h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z', 'M7 7h.01M7 16h.01'] },
      { title: 'Full Configuration', desc: 'Payment gateways, SMTP mail, SMS, maps and every third-party service configured and tested.', paths: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8M4.3 8.2A1.6 1.6 0 0 0 4.6 10'] },
      { title: 'Go-Live Ready', desc: 'Web admin, landing page, and mobile apps published and verified — ready for real customers.', paths: ['M9 12l2 2 4-4', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'] },
    ],
    steps: [
      { title: 'Share access', desc: 'Send us your server and product credentials securely.' },
      { title: 'We install & configure', desc: 'Our team sets everything up and integrates your services.' },
      { title: 'Test & hand over', desc: 'We verify every flow and hand you a live, working product.' },
    ],
  },
  customization: {
    slug: 'customization',
    eyebrow: 'Service',
    title: 'Product',
    highlight: 'Customisation',
    intro: 'Make it truly yours. We tailor features, design, branding and workflows so the product fits your business exactly the way you need.',
    tone: 'bg-indigo-50 text-indigo-600',
    accent: 'indigo',
    icon: ['M14.6 6.4a3.5 3.5 0 0 0-4.8 4.2L4 16.4V20h3.6l5.8-5.8a3.5 3.5 0 0 0 4.2-4.8l-2.3 2.3-2-.5-.5-2 2.3-2.3Z'],
    features: [
      { title: 'Feature Development', desc: 'New modules and functionality built around your unique requirements and business logic.', paths: ['M9 3H4v5', 'M15 3h5v5', 'M15 21h5v-5', 'M9 21H4v-5', 'M9 9h6v6H9z'] },
      { title: 'Design & Branding', desc: 'Your colours, logo, typography and layout applied across web and mobile for a consistent brand.', paths: ['M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1 .8-1.5 1.5-1.5H18a3 3 0 0 0 3-3 9 9 0 0 0-9-9Z', 'M7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'] },
      { title: 'Integrations', desc: 'Connect any payment, SMS, shipping, ERP or third-party API your operation depends on.', paths: ['M9 12h6', 'M12 9v6', 'M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z'] },
    ],
    steps: [
      { title: 'Tell us your needs', desc: 'Share the features, look and integrations you want.' },
      { title: 'We scope & quote', desc: 'A clear plan, timeline and fixed quote before any work starts.' },
      { title: 'Build & deliver', desc: 'We develop, review with you, and deliver the tailored product.' },
    ],
  },
  maintenance: {
    slug: 'maintenance',
    eyebrow: 'Service',
    title: 'Maintenance',
    highlight: 'Services',
    intro: 'Keep your product fast, secure and up to date. Our maintenance plans cover updates, monitoring, backups and priority support so you can focus on growth.',
    tone: 'bg-amber-50 text-amber-600',
    accent: 'amber',
    icon: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M6 6 4.6 4.6M19.4 19.4 18 18M18 6l1.4-1.4M4.6 19.4 6 18'],
    features: [
      { title: 'Updates & Upgrades', desc: 'Latest versions, security patches and new features applied without breaking your live site.', paths: ['M4 4v6h6', 'M20 20v-6h-6', 'M20 8A8 8 0 0 0 6 6', 'M4 16a8 8 0 0 0 14 2'] },
      { title: 'Monitoring & Backups', desc: 'Automated backups and uptime monitoring so nothing is ever lost or left down for long.', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'm9.5 12 1.8 1.8L15 10'] },
      { title: 'Priority Support', desc: 'A dedicated team on standby to fix issues fast and answer your questions any time.', paths: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z'] },
    ],
    steps: [
      { title: 'Pick a plan', desc: 'Choose the maintenance level that fits your product.' },
      { title: 'We take over upkeep', desc: 'Updates, backups and monitoring run in the background.' },
      { title: 'Relax & grow', desc: 'Report an issue any time — we handle the rest, fast.' },
    ],
  },
}

const route = useRoute()
const service = computed(() => SERVICES[route.params.slug as string])

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

useSeoMeta({
  title: () => `${service.value!.title} ${service.value!.highlight} — RazinSoft Services`,
  description: () => service.value!.intro,
})

const CALENDLY = useRuntimeConfig().public.calendlyUrl
</script>

<template>
  <div v-if="service" class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-6 top-6 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.06] sm:text-[20rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-20">
        <span class="grid h-14 w-14 place-items-center rounded-2xl" :class="service.tone" aria-hidden="true">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in service.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
        </span>
        <p class="mt-5 text-sm font-bold uppercase tracking-widest text-brand-600">{{ service.eyebrow }}</p>
        <h1 class="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          {{ service.title }} <span class="text-brand-600">{{ service.highlight }}</span>
        </h1>
        <p class="mt-5 max-w-xl text-lg text-gray-600">{{ service.intro }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/contact-us" class="btn bg-brand-700 text-white hover:bg-brand-800">
            Get a Free Quote
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
          </NuxtLink>
          <a :href="CALENDLY" target="_blank" rel="noopener noreferrer" class="btn-outline">Book a Meeting</a>
        </div>
      </div>
    </section>

    <div class="container-page pb-20">
      <!-- Features -->
      <div class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="f in service.features" :key="f.title" class="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110" :class="service.tone" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in f.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
          </div>
          <div>
            <h3 class="font-display text-lg font-bold text-ink-900">{{ f.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ f.desc }}</p>
          </div>
        </article>
      </div>

      <!-- How it works -->
      <div class="mt-16 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">How it works</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900">Simple, from start to finish</h2>
        </div>
        <div class="mt-10 grid gap-8 sm:grid-cols-3">
          <div v-for="(s, i) in service.steps" :key="s.title" class="relative text-center">
            <span class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white">{{ i + 1 }}</span>
            <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ s.title }}</h3>
            <p class="mt-1.5 text-sm text-gray-600">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-10 overflow-hidden rounded-2xl p-8 text-center shadow-sm sm:p-12" style="background-image: linear-gradient(to right, #1d4ed8, #2563eb);">
        <h2 class="font-display text-2xl font-extrabold text-white sm:text-3xl">Ready to get started?</h2>
        <p class="mx-auto mt-2 max-w-xl text-white/85">Tell us what you need and we'll get back to you within 24 hours with a plan and a quote.</p>
        <NuxtLink to="/contact-us" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-gray-100">
          Contact Us
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
