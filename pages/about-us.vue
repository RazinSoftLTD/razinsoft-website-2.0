<script setup lang="ts">
usePageSeo({
  title: 'About Us — Empowering Businesses Through Software',
  image: '/images/team/group-image-fast.webp',
  description:
    'Meet the team behind RazinSoft — a software company helping startups, SMEs and enterprises build custom software, web & mobile apps, and SaaS products that scale.',
})

const stats = [
  { value: '3100+', label: 'Businesses served' },
  { value: '25+', label: 'Countries' },
  { value: '35+', label: 'Team members' },
  { value: '20', label: 'Ready products' },
]

const doWork = [
  { title: 'Ready-Made Products', desc: 'Launch faster with production-ready software built from years of industry experience and continuous improvements.', tone: 'bg-blue-50 text-blue-600', paths: ['M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v8'] },
  { title: 'Custom Software Development', desc: 'Scalable custom software built around your unique business needs - secure, reliable, and ready for growth.', tone: 'bg-purple-50 text-purple-600', paths: ['M9 12h6m-6 4h6M8 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.6a1 1 0 0 1 .7.3l5.4 5.4a1 1 0 0 1 .3.7V19a2 2 0 0 1-2 2h-1'] },
  { title: 'AI & SaaS Development', desc: 'Smart software powered by AI and automation to improve efficiency, decision-making, and business performance.', tone: 'bg-emerald-50 text-emerald-600', paths: ['M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18'] },
  { title: 'Maintenance & Support', desc: 'Reliable monitoring, regular updates, and expert technical support to keep your business running smoothly.', tone: 'bg-orange-50 text-orange-600', paths: ['M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z'] },
]

// Real group photo used for the story + meetup shots (bound dynamically so a
// missing file never breaks the production build).
const groupPhoto = '/images/team/group-image-fast.webp'

// Cache-buster for team photos: files were replaced at the SAME urls, so Cloudflare/
// browsers sometimes served the old cached image. Bump this whenever photos change.
const pv = '?v=2'

// Leadership — featured as distinct personalities. Photos live in /public/images/team/LeaderShip.
const leaders = [
  {
    name: 'Mohammad Shofikul Islam',
    role: 'Founder & CEO',
    photo: '/images/team/LeaderShip/mohammad-shofikul-islam.webp',
    quote: 'We don’t just sell software — we partner in our clients’ success. Every product we ship is a promise to help a business grow.',
    accent: 'text-brand-600',
    linkedin: 'https://www.linkedin.com/in/shofikul/',
  },
  {
    name: 'Md Joynal Abedin',
    role: 'Co-Founder & CTO',
    photo: '/images/team/LeaderShip/md-joynal-abedin.webp',
    quote: 'Great engineering is invisible — it just works, at any scale. We obsess over reliability so our customers never have to.',
    accent: 'text-emerald-600',
    linkedin: 'https://www.linkedin.com/in/joynal-abedin-57470016a/',
  },
]

// The wider team (shown under the meetup photo), in the order provided by the company.
// Photos are the real member files in /public/images/team — paths match the exact
// filenames (case-sensitive on the server).
const team = [
  { name: 'Sohan Biswas', role: 'HR Manager', photo: '/images/team/sohan-biswas.webp' },
  { name: 'Md Nizam Uddin', role: 'Business Development Manager', photo: '/images/team/md-nizam-uddin.webp' },
  { name: 'Ahmed All Muzahed', role: 'Marketing Manager', photo: '/images/team/ahmed-all-muzahed.webp' },
  { name: 'Md Sohag Sheikh', role: 'DevOps Engineer', photo: '/images/team/md-sohag-sheikh.webp' },
  { name: 'Jannatun Nesa Jolly', role: 'Business Development Executive', photo: '/images/team/jannatun-nesa-jolly.webp' },
  { name: 'Jechi', role: 'Business Development Executive', photo: '/images/team/jechi.webp' },
  { name: 'Faisal', role: 'Sr. Frontend Developer', photo: '/images/team/faisal.webp' },
  { name: 'Munshi', role: 'Frontend Developer', photo: '/images/team/munshi.webp' },
  { name: 'Jobeda Khatun', role: 'Sr. Backend Developer', photo: '/images/team/jobeda-khatun.webp' },
  { name: 'Leaya Sultana', role: 'Sr. Backend Developer', photo: '/images/team/leaya-sultana.webp' },
  { name: 'Khadija Banu', role: 'Sr. Backend Developer', photo: '/images/team/khadija-banu.webp' },
  { name: 'Lamiya Akter Liza', role: 'Project Coordinator', photo: '/images/team/lamiya-akter-liza.webp' },
  { name: 'Sabrina Ferdous Reza', role: 'Project Coordinator', photo: '/images/team/sabrina-ferdous-reza.webp' },
  { name: 'Rakibul', role: 'Sr. Backend Developer', photo: '/images/team/rakibul.webp' },
  { name: 'S.M Arifuzzaman', role: 'Backend Team Lead', photo: '/images/team/s-m-arifuzzaman.webp' },
  { name: 'Md Emon Mia', role: 'Office Assistant', photo: '/images/team/md-emon-mia.webp' },
  { name: 'Mijanur Rahman', role: 'Office Assistant', photo: '/images/team/mijanur-rahman.webp' },
  { name: 'Raihan Sikdar', role: 'Sr. Flutter Developer', photo: '/images/team/raihan-sikdar.webp' },
  { name: 'Traik', role: 'Flutter Developer', photo: '/images/team/traik.webp' },
  { name: 'Nayeem Islam', role: 'Flutter Developer', photo: '/images/team/nayeem-islam.webp' },
  { name: 'Sakibul Hasan Shanto', role: 'Flutter Developer', photo: '/images/team/sakibul-hasan-shanto.webp' },
  { name: 'Abdullah Hossain', role: 'Web Developer', photo: '/images/team/abdullah-hossain.webp' },
  { name: 'Arif Hossain', role: 'Content Writer', photo: '/images/team/arif-hossain.webp' },
  { name: 'Md. Sabbir Sarker', role: 'Backend Developer', photo: '/images/team/md-sabbir-sarker.webp' },
  { name: 'Sarah Islam', role: 'Content Writer', photo: '/images/team/sarah-islam.webp' },
  { name: 'Rifat Hasan', role: 'Product Designer', photo: '/images/team/rifat-hasan.webp' },
]

const values = [
  { title: 'Client-First, Always', desc: 'Every decision starts with your goals. We measure success by the impact we create for your business — not the hours we bill.', paths: ['M20.8 8.6a5.5 5.5 0 0 0-9-1.8 5.5 5.5 0 0 0-9 1.8c0 3.6 4 6.9 9 10.4 5-3.5 9-6.8 9-10.4Z'] },
  { title: 'Built to Last', desc: 'Secure, reliable, well-documented software — so what we build keeps working long after launch, and your team can own it with confidence.', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'm9.5 12 1.8 1.8L15 10'] },
  { title: 'Honest & Transparent', desc: 'Clear timelines, straight answers and no surprises. You always know where your project stands and exactly what comes next.', paths: ['M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z', 'M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'] },
  { title: 'A True Partner', desc: 'We don’t disappear after delivery. We stay on to maintain, improve and scale — treating your product like our own.', paths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'] },
]

// Newsletter subscribe → stored in the admin subscriber list via POST /subscribe.
const { $api } = useNuxtApp()
const sub = reactive({ name: '', email: '' })
const subLoading = ref(false)
const subMsg = ref('')
const subOk = ref(false)
const canSubscribe = computed(() => !!sub.email.trim())
async function subscribe() {
  if (!canSubscribe.value || subLoading.value) return
  subLoading.value = true
  subMsg.value = ''
  try {
    await $api('/subscribe', { method: 'POST', body: { email: sub.email.trim(), name: sub.name.trim() || undefined, source: 'about' } })
    subOk.value = true
    subMsg.value = 'You’re in! Thanks for subscribing — watch your inbox.'
    sub.name = ''
    sub.email = ''
  } catch (e: any) {
    subOk.value = false
    subMsg.value = e?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    subLoading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <span class="pointer-events-none absolute -right-8 top-4 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.05] sm:text-[22rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-24">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">About RazinSoft</p>
        <h1 class="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Your Trusted Partner for <span class="text-brand-600">Building Smarter Businesses.</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          At RazinSoft, we help startups, SMEs, and enterprises turn ideas into reliable digital products. From ready-made business software to fully custom web, mobile, AI, and SaaS solutions, we build technology that solves real business challenges and supports long-term growth.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/products" class="btn bg-brand-600 text-white hover:bg-brand-700">Explore products
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </NuxtLink>
          <NuxtLink to="/careers" class="btn border border-gray-200 bg-white text-ink-800 hover:bg-gray-50">Join the team</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-y border-gray-100 bg-white">
      <div class="container-page grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <p class="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{{ s.value }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- Story / mission -->
    <section class="container-page py-20">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="relative">
          <div class="overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <img src="/images/our-mission.webp" alt="The RazinSoft team collaborating" class="h-80 w-full object-cover" loading="lazy" decoding="async">
          </div>
          <div class="absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl">
            <p class="font-display text-2xl font-extrabold text-ink-900">Since 2021</p>
            <p class="text-xs text-gray-500">Building software that scales with your business.</p>
          </div>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Mission</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold leading-tight text-ink-900 lg:text-4xl">We build software that businesses can grow on.</h2>
          <p class="mt-5 leading-relaxed text-gray-600">
            We create modern, reliable software solutions that help businesses grow faster, improve efficiency and deliver better experiences to their customers. From ready-made platforms to fully custom builds, our team combines proven engineering with a deep understanding of real business needs.
          </p>
          <p class="mt-4 leading-relaxed text-gray-600">
            We don’t just ship code — we help organizations maintain, modernize and scale their technology while solving complex business challenges.
          </p>
        </div>
      </div>
    </section>

    <!-- What we do -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">What We Do</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Built for modern businesses</h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="d in doWork" :key="d.title" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
            <span class="grid h-12 w-12 place-items-center rounded-xl" :class="d.tone" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="p in d.paths" :key="p" stroke-linecap="round" stroke-linejoin="round" :d="p" /></svg>
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ d.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ d.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Leadership — editorial, alternating feature rows -->
    <section class="container-page py-20 lg:py-24">
      <div class="max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">Leadership</p>
        <h2 class="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink-900">Meet the people driving our vision</h2>
        <p class="mt-4 text-lg leading-relaxed text-gray-500">The founders behind RazinSoft — pairing product vision with deep engineering to shape what we build next.</p>
      </div>

      <div class="mt-16 space-y-20">
        <article v-for="(l, i) in leaders" :key="l.name" class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <!-- Compact portrait: gradient frame, floating name ribbon, dot accent -->
          <div class="relative mx-auto w-full max-w-[280px] lg:col-span-4" :class="i % 2 ? 'lg:order-2' : ''">
            <div class="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-100 to-purple-100 opacity-70" :class="i % 2 ? 'rotate-3' : '-rotate-3'" aria-hidden="true"></div>
            <!-- decorative dots -->
            <svg class="absolute -right-8 -top-8 h-20 w-20 text-brand-200" :class="i % 2 ? '-left-8 right-auto' : ''" fill="currentColor" aria-hidden="true" viewBox="0 0 80 80">
              <circle v-for="d in 16" :key="d" :cx="((d - 1) % 4) * 20 + 6" :cy="Math.floor((d - 1) / 4) * 20 + 6" r="2.5" />
            </svg>
            <div class="relative overflow-hidden rounded-[1.5rem] shadow-xl ring-1 ring-black/[0.05]">
              <img :src="l.photo + pv" :alt="l.name" class="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async">
              <!-- name ribbon over the photo -->
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3.5 pt-10">
                <p class="font-display text-sm font-extrabold text-white">{{ l.name }}</p>
                <p class="text-[11px] font-semibold uppercase tracking-wider text-white/80">{{ l.role }}</p>
              </div>
            </div>
          </div>
          <!-- Content — the quote leads -->
          <div class="lg:col-span-8" :class="i % 2 ? 'lg:order-1' : ''">
            <svg class="h-10 w-10 text-brand-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Zm8 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Z" /></svg>
            <p class="mt-3 font-display text-2xl font-semibold leading-relaxed text-ink-900 sm:text-3xl sm:leading-relaxed">{{ l.quote }}</p>
            <div class="mt-7 flex flex-wrap items-center gap-4">
              <div>
                <p class="font-display text-lg font-extrabold text-ink-900">{{ l.name }}</p>
                <p class="text-sm font-semibold" :class="l.accent">{{ l.role }}</p>
              </div>
              <a :href="l.linkedin" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-ink-800 transition hover:border-brand-300 hover:text-brand-600 sm:ml-auto">
                <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" /></svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Team meetup -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Team</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">One team, One mission</h2>
          <p class="mx-auto mt-3 max-w-xl text-gray-600">A passionate team of experts committed to building reliable software and delivering exceptional customer experiences.</p>
        </div>

        <!-- Full-team meetup photo -->
        <div class="relative mt-12 overflow-hidden rounded-3xl shadow-xl">
          <img :src="groupPhoto + pv" alt="The RazinSoft team together at a meetup" class="h-[280px] w-full object-cover sm:h-[380px]" loading="lazy" decoding="async">
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <div class="text-white">
              <p class="font-display text-xl font-extrabold sm:text-2xl">The whole team, together.</p>
              <p class="mt-1 max-w-md text-sm text-white/80">From our quarterly meetups to everyday standups — collaboration is at the heart of how we work.</p>
            </div>
            <span class="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">35+ people · 2 continents</span>
          </div>
        </div>

        <!-- Team grid — portrait cards with name/role overlaid (25 members → tidy 5-col grid) -->
        <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <figure v-for="m in team" :key="m.name" class="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/[0.06]">
            <img :src="m.photo + pv" :alt="m.name" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]">
            <div class="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent"></div>
            <figcaption class="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
              <p class="font-display text-sm font-bold leading-tight text-white">{{ m.name }}</p>
              <p class="mt-0.5 text-xs font-medium text-brand-200">{{ m.role }}</p>
            </figcaption>
          </figure>
        </div>
        <p class="mt-8 text-center text-sm text-gray-500">…and many more building behind the scenes. <NuxtLink to="/careers" class="font-semibold text-brand-600 hover:underline">Want to join us?</NuxtLink></p>
      </div>
    </section>

    <!-- Values -->
    <section class="container-page py-20">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Values</p>
        <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">How we show up for clients</h2>
        <p class="mx-auto mt-3 max-w-xl text-gray-600">The principles that guide every project — from the first call to long after launch.</p>
      </div>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="v in values" :key="v.title" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="p in v.paths" :key="p" stroke-linecap="round" stroke-linejoin="round" :d="p" /></svg>
          </span>
          <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ v.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Closing: build-with-us CTA + newsletter, unified -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-20 text-white lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true"></div>

      <div class="container-page relative">
        <!-- Primary CTA -->
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Let’s build something great together</h2>
          <p class="mx-auto mt-4 max-w-xl text-gray-300">Have a project in mind? Our team is ready to help you plan, build and scale.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <NuxtLink to="/contact-us" class="btn bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700">Contact us</NuxtLink>
            <NuxtLink to="/careers" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">Join our team</NuxtLink>
          </div>
        </div>

        <!-- Newsletter — inset card -->
        <div class="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
          <div class="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div class="max-w-sm">
              <p class="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-300">Newsletter</p>
              <h3 class="mt-1.5 font-display text-xl font-bold">Stay in the loop</h3>
              <p class="mt-1.5 text-sm text-gray-400">Product updates and engineering notes — no spam, unsubscribe anytime.</p>
            </div>
            <form class="w-full md:w-auto" @submit.prevent="subscribe">
              <div class="flex flex-col gap-2.5 sm:flex-row">
                <input v-model="sub.email" type="email" required autocomplete="email" placeholder="Your email"
                       class="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 sm:w-64">
                <button type="submit" :disabled="!canSubscribe || subLoading"
                        class="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">
                  {{ subLoading ? 'Subscribing…' : 'Subscribe' }}
                </button>
              </div>
              <p v-if="subMsg" class="mt-2.5 text-sm font-medium" :class="subOk ? 'text-emerald-400' : 'text-red-300'">{{ subMsg }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
