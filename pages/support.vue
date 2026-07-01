<script setup lang="ts">
usePageSeo({
  title: 'Support — We’re Here to Help',
  description: 'Get help with RazinSoft products — documentation, WhatsApp, email and priority support. Find answers fast or reach our team directly.',
})

const WHATSAPP = '8801711257498'

const channels = [
  { title: 'Documentation', desc: 'Step-by-step guides, setup docs and API references for every product.', action: 'Browse docs', to: '/products', tone: 'bg-blue-50 text-blue-600', paths: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'] },
  { title: 'WhatsApp Support', desc: 'Chat with a support expert for instant help — we reply within minutes.', action: 'Chat now', href: `https://wa.me/${WHATSAPP}`, tone: 'bg-emerald-50 text-emerald-600', paths: ['M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5Z'] },
  { title: 'Email Support', desc: 'Send us the details and we’ll get back to you within 24 hours.', action: 'Email us', href: 'mailto:support@razinsoft.com', tone: 'bg-sky-50 text-sky-600', paths: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6 8.5-6'] },
  { title: 'Priority Support', desc: 'Dedicated engineers and faster SLAs for business and enterprise plans.', action: 'Contact sales', to: '/contact-us', tone: 'bg-purple-50 text-purple-600', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z'] },
]

const faqs = [
  { q: 'How do I download my purchase and license?', a: 'After payment, go to your Dashboard → Orders. Each paid order has downloadable invoice, license certificate and source code. Downloads unlock automatically once payment is confirmed.' },
  { q: 'What is included with a product license?', a: 'Every product includes full source code, documentation, free updates for the license period and access to our support channels. Extended licenses add commercial redistribution rights.' },
  { q: 'How fast will I get a response?', a: 'WhatsApp replies within minutes during business hours (Sat–Thu, 9AM–7PM). Email is answered within 24 hours. Priority-plan customers get dedicated, faster SLAs.' },
  { q: 'Do you offer installation help?', a: 'Yes. Documentation covers self-installation, and our team can help with setup on request. Business and enterprise plans include guided installation support.' },
  { q: 'Can I get a refund?', a: 'Because products include source code, refunds are handled case-by-case. Reach out within 7 days of purchase and we’ll do our best to make it right.' },
]

const open = ref<number | null>(0)
function toggle(i: number) { open.value = open.value === i ? null : i }
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <span class="pointer-events-none absolute -right-8 top-4 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.05] sm:text-[22rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-24">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Support</p>
        <h1 class="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          We’re here to <span class="text-brand-600">help you succeed</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          Whether you’re setting up, scaling or just have a question — our team and resources are ready. Pick the channel that suits you best.
        </p>
      </div>
    </section>

    <!-- Channels -->
    <section class="container-page py-16">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="c in channels" :key="c.title" class="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <span class="grid h-12 w-12 place-items-center rounded-xl" :class="c.tone" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in c.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
          </span>
          <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ c.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{{ c.desc }}</p>
          <a v-if="c.href" :href="c.href" :target="c.href.startsWith('http') ? '_blank' : undefined" rel="noopener" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            {{ c.action }}
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </a>
          <NuxtLink v-else :to="c.to!" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            {{ c.action }}
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">FAQ</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Frequently asked questions</h2>
        </div>
        <div class="mx-auto mt-12 max-w-3xl space-y-3">
          <div v-for="(f, i) in faqs" :key="i" class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <button type="button" class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" @click="toggle(i)">
              <span class="font-display font-bold text-ink-900">{{ f.q }}</span>
              <svg class="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200" :class="open === i ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
            </button>
            <div class="grid overflow-hidden transition-all duration-300 ease-out" :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="min-h-0 overflow-hidden">
                <p class="px-6 pb-5 text-sm leading-relaxed text-gray-600">{{ f.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container-page py-20">
      <div class="rounded-3xl bg-gradient-to-br from-brand-600 to-[#1d4ed8] px-8 py-14 text-center text-white shadow-xl">
        <h2 class="font-display text-3xl font-extrabold sm:text-4xl">Still need a hand?</h2>
        <p class="mx-auto mt-4 max-w-xl text-white/90">Our support team is ready. Reach out and we’ll get you sorted quickly.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener" class="btn bg-white text-brand-700 hover:bg-white/90">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5Z" /></svg>
            Chat on WhatsApp
          </a>
          <NuxtLink to="/contact-us" class="btn border border-white/40 bg-white/10 text-white hover:bg-white/20">Contact us</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
