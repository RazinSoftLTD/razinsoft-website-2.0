<script setup lang="ts">
const { $api } = useNuxtApp()

useSeoMeta({
  title: "Contact Us — Let's Build Something Amazing Together",
  description: "Have a question or a project in mind? Reach out to RazinSoft and we'll get back to you within 24 hours.",
})

const SALES_PHONE = '+880 1711-257498'
const SALES_WA = 'https://wa.link/hfp42a'
const SALES_TG = 'https://t.me/razinsoft'
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=RazinSoft+RMR+Center+Ring+Road+Dhaka+1207'

// Sales channels shown in the "Sales Inquiries" card.
const salesChannels = [
  { label: 'WhatsApp', value: SALES_PHONE, href: SALES_WA, tone: 'bg-emerald-500', icon: 'wa' },
  { label: 'Telegram', value: SALES_PHONE, href: SALES_TG, tone: 'bg-sky-500', icon: 'tg' },
  { label: 'Email', value: 'support@razinsoft.com', href: 'mailto:support@razinsoft.com', tone: 'bg-brand-600', icon: 'mail' },
]

// Brand-coloured support icons the client dropped in /public/icons.
const iconImg: Record<string, string> = {
  wa: '/icons/Whats-App-Support.webp',
  tg: '/icons/Teligram-Support.webp',
  mail: '/icons/Email-Support.webp',
  desk: '/icons/Desk-Support.webp',
}

const stats = [
  { value: '25+', label: 'Countries', icon: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  { value: '3100+', label: 'Happy Clients', icon: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
  { value: '20+', label: 'Products', icon: ['M21 8 12 3 3 8l9 5 9-5Z', 'M3 8v8l9 5 9-5V8', 'M12 13v8'] },
  { value: '24/7', label: 'Support', icon: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z', 'M18 17a4 4 0 0 1-4 3h-2'] },
]

const services = ['Custom Software Development', 'eCommerce Development', 'AI & SaaS Development', 'Cloud & DevOps Solutions', 'Marketing & Creative', 'Maintenance & Support', 'Other']
const budgets = ['Less than $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+']

const form = reactive({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
const sending = ref(false)
const canSend = computed(() => !!form.name.trim() && !!form.email.trim() && !!form.service && !!form.budget && !!form.message.trim())

async function submit() {
  if (!canSend.value || sending.value) return
  sending.value = true
  try {
    await $api('/contact', { method: 'POST', body: { ...form } })
    useToast().success('Message sent', "Thanks! We'll get back to you within 24 hours.")
    Object.assign(form, { name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  } catch (e: any) {
    useToast().error('Could not send', e?.data?.message || 'Please try again.')
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-6 top-6 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.06] sm:text-[20rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-20">
        <p class="text-sm font-bold uppercase tracking-widest text-brand-600">Contact Us</p>
        <h1 class="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Let's Build Something Amazing <span class="text-brand-600">Together</span>
        </h1>
        <p class="mt-5 max-w-xl text-lg text-gray-600">
          Have a question or a project in mind? We're here to help.<br class="hidden sm:block">
          Reach out to us and we'll get back to you within 24 hours.
        </p>
      </div>
    </section>

    <div class="container-page pb-20">
      <!-- Info cards: Headquarters + Sales Inquiries -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Headquarters -->
        <div class="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:gap-5 sm:p-7">
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 2a7.5 7.5 0 0 0-7.5 7.5C4.5 14.6 12 22 12 22s7.5-7.4 7.5-12.5A7.5 7.5 0 0 0 12 2Zm0 10a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" /></svg>
          </span>
          <div>
            <h3 class="font-display text-lg font-bold text-ink-900">Headquarters</h3>
            <div class="mt-2 space-y-0.5 text-sm leading-relaxed text-gray-600">
              <p>RazinSoft (HQ)</p>
              <p>1st Floor, RMR Center</p>
              <p>A&amp;B Ring Rd, Dhaka 1207</p>
              <p>Bangladesh.</p>
            </div>
            <a :href="MAP_URL" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
              View on Map
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </a>
          </div>
        </div>

        <!-- Sales Inquiries -->
        <div class="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:gap-5 sm:p-7">
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1L6.6 10.8Z" /></svg>
          </span>
          <div class="min-w-0 flex-1">
            <h3 class="font-display text-lg font-bold text-ink-900">Sales Inquiries</h3>
            <p class="mt-1 text-sm text-gray-500">Chat with us on your preferred platform</p>
            <ul class="mt-4 space-y-3">
              <li v-for="ch in salesChannels" :key="ch.label">
                <a :href="ch.href" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm">
                  <img :src="iconImg[ch.icon]" :alt="ch.label" class="h-7 w-7 shrink-0 object-contain" width="28" height="28">
                  <!-- Redundant with the colored icon — hidden on ultra-narrow phones so the number never truncates. -->
                  <span class="w-20 shrink-0 font-medium text-ink-800 max-[379px]:hidden">{{ ch.label }}</span>
                  <span class="min-w-0 truncate text-gray-600 group-hover:text-ink-900">{{ ch.value }}</span>
                  <svg class="ml-auto h-4 w-4 shrink-0 text-brand-500 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5m0-5L9 15m-2-8H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Message form -->
      <section class="relative mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <span class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600" aria-hidden="true" />
        <div class="p-6 sm:p-10">
          <div class="mx-auto max-w-2xl text-center">
            <p class="text-sm font-bold uppercase tracking-widest text-brand-600">Get in Touch</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900">Send Us a Message</h2>
            <p class="mt-2 text-sm text-gray-500">Fill out the form below and we'll get back to you within 24 hours.</p>
            <div class="mx-auto mt-4 h-1 w-12 rounded-full bg-brand-500" />
          </div>

          <form class="mx-auto mt-8 max-w-3xl space-y-5" @submit.prevent="submit">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Full Name <span class="text-red-500">*</span></span>
                <div class="relative">
                  <input v-model="form.name" type="text" required placeholder="e.g. John Doe" class="h-12 w-full rounded-xl border border-gray-200 px-4 pr-10 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200">
                  <svg class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
                </div>
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Your Email <span class="text-red-500">*</span></span>
                <div class="relative">
                  <input v-model="form.email" type="email" required placeholder="e.g. john@company.com" class="h-12 w-full rounded-xl border border-gray-200 px-4 pr-10 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200">
                  <svg class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path stroke-linecap="round" d="m3.5 6.5 8.5 6 8.5-6" /></svg>
                </div>
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Phone Number <span class="font-normal text-gray-400">(preferably WhatsApp)</span></span>
                <div class="relative">
                  <input v-model="form.phone" type="text" placeholder="e.g. +880 1711-000000" class="h-12 w-full rounded-xl border border-gray-200 px-4 pr-10 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200">
                  <svg class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5Z" /></svg>
                </div>
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Company Name</span>
                <div class="relative">
                  <input v-model="form.company" type="text" placeholder="e.g. Acme Inc." class="h-12 w-full rounded-xl border border-gray-200 px-4 pr-10 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200">
                  <svg class="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M6 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01" /></svg>
                </div>
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Service <span class="text-red-500">*</span></span>
                <select v-model="form.service" required class="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200" :class="form.service ? 'text-ink-800' : 'text-gray-400'">
                  <option value="" disabled>Select a service</option>
                  <option v-for="s in services" :key="s" :value="s" class="text-ink-800">{{ s }}</option>
                </select>
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink-800">Budget Range <span class="text-red-500">*</span></span>
                <select v-model="form.budget" required class="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200" :class="form.budget ? 'text-ink-800' : 'text-gray-400'">
                  <option value="" disabled>Select a budget range</option>
                  <option v-for="b in budgets" :key="b" :value="b" class="text-ink-800">{{ b }}</option>
                </select>
              </label>
            </div>

            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink-800">Project Details <span class="text-red-500">*</span></span>
              <textarea v-model="form.message" required rows="5" placeholder="Tell us a little about your project…" class="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200" />
            </label>

            <div class="flex justify-end pt-1">
              <button type="submit" :disabled="!canSend || sending" class="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m22 2-7 20-4-9-9-4 20-7Z" /></svg>
                {{ sending ? 'Sending…' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Stats -->
      <div class="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(s, i) in stats" :key="s.label" class="flex items-center justify-center gap-4" :class="i > 0 ? 'lg:border-l lg:border-gray-100' : ''">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in s.icon" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <div>
              <p class="font-display text-2xl font-extrabold text-ink-900">{{ s.value }}</p>
              <p class="text-sm text-gray-500">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
