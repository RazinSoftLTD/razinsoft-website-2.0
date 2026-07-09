<script setup lang="ts">
const calendlyUrl = useRuntimeConfig().public.calendlyUrl as string

const SALES_PHONE = '+880 1336-909483'
const SALES_WA = 'https://wa.link/woclza'
const SALES_TG = 'https://t.me/razinsoft'

// Same contact channels as the Contact Us page.
const talkChannels = [
  { label: 'WhatsApp', value: SALES_PHONE, href: SALES_WA, img: '/icons/Whats-App-Support.webp' },
  { label: 'Telegram', value: SALES_PHONE, href: SALES_TG, img: '/icons/Teligram-Support.webp' },
  { label: 'Email', value: 'support@razinsoft.com', href: 'mailto:support@razinsoft.com', img: '/icons/Email-Support.webp' },
]

useSeoMeta({
  title: 'Book a Meeting — Free Consultation with RazinSoft',
  description: 'Book your seat for a free consultation. Pick a time that works for you and talk to our team about your project.',
})

// Load the Calendly inline-embed script; it auto-mounts the .calendly-inline-widget below.
useHead({
  script: [{ src: 'https://assets.calendly.com/assets/external/widget.js', async: true }],
})

const steps = [
  { title: 'Pick a time', desc: 'Choose a slot from the live calendar that fits your schedule.', icon: ['M8 2v4M16 2v4M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'] },
  { title: 'Get a confirmation', desc: 'You’ll receive a calendar invite with the meeting link instantly.', icon: ['M22 11.1V12a10 10 0 1 1-5.9-9.1', 'm22 4-10 10.1L9 11'] },
  { title: 'Talk to our team', desc: 'We discuss your goals and how we can help — no obligation, totally free.', icon: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z'] },
]
</script>

<template>
  <div class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-6 top-6 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.06] sm:text-[20rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-20">
        <p class="text-sm font-bold uppercase tracking-widest text-brand-600">Book a Meeting</p>
        <h1 class="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Book your seat for a <span class="text-brand-600">free consultation.</span>
        </h1>
        <p class="mt-5 max-w-xl text-lg text-gray-600">
          Pick a time that works for you and talk to our team about your idea, product, or project. It only takes a minute.
        </p>
      </div>
    </section>

    <div class="container-page pb-20">
      <div class="grid gap-8 lg:grid-cols-[380px_1fr]">
        <!-- Left: what to expect + contact -->
        <div class="space-y-6">
                  <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
            <h2 class="font-display text-lg font-bold text-ink-900">Prefer to talk now?</h2>
            <p class="mt-1 text-sm text-gray-500">Chat with us on your preferred platform.</p>
            <ul class="mt-4 space-y-3">
              <li v-for="ch in talkChannels" :key="ch.label">
                <a :href="ch.href" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm">
                  <img :src="ch.img" :alt="ch.label" class="h-7 w-7 shrink-0 object-contain" width="28" height="28">
                  <span class="w-20 shrink-0 font-medium text-ink-800">{{ ch.label }}</span>
                  <span class="min-w-0 truncate text-gray-600 group-hover:text-ink-900">{{ ch.value }}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
            <h2 class="font-display text-lg font-bold text-ink-900">What to expect</h2>
            <ul class="mt-5 space-y-5">
              <li v-for="(s, i) in steps" :key="i" class="flex gap-4">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600" aria-hidden="true">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path v-for="d in s.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                </span>
                <div>
                  <p class="font-semibold text-ink-900">{{ s.title }}</p>
                  <p class="mt-0.5 text-sm leading-relaxed text-gray-600">{{ s.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Calendly calendar (widget.js auto-mounts the inline widget below) -->
        <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-sm sm:p-3">
          <div class="calendly-inline-widget" :data-url="calendlyUrl" style="min-width:320px;height:720px">
            <div class="flex h-[720px] items-center justify-center text-sm text-gray-400">Loading calendar…</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
