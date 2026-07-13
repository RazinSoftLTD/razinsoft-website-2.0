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

// The wider team (shown under the meetup photo). Photos are the real member files in
// /public/images/team — names match the filenames. Designations are placeholders to refine.
const team = [
  { name: 'Abdullah Hossain', role: 'Team Member', photo: '/images/team/abdullah-hossain.webp' },
  { name: 'Ahmed All Muzahed', role: 'Team Member', photo: '/images/team/ahmed-all-muzahed.webp' },
  { name: 'Jannatun Nesa Jolly', role: 'Team Member', photo: '/images/team/jannatun-nesa-jolly.webp' },
  { name: 'Jobeda Khatun', role: 'Team Member', photo: '/images/team/jobeda-khatun.webp' },
  { name: 'Lamiya Akter Liza', role: 'Team Member', photo: '/images/team/lamiya-akter-liza.webp' },
  { name: 'Leaya Sultana', role: 'Team Member', photo: '/images/team/leaya-sultana.webp' },
  { name: 'Md Emon Mia', role: 'Team Member', photo: '/images/team/md-emon-mia.webp' },
  { name: 'Md Nizam Uddin', role: 'Team Member', photo: '/images/team/md-nizam-uddin.webp' },
  { name: 'Md Sohag Sheikh', role: 'Team Member', photo: '/images/team/md-sohag-sheikh.webp' },
  { name: 'Md. Sabbir Sarker', role: 'Team Member', photo: '/images/team/md-sabbir-sarker.webp' },
  { name: 'Mijanur Rahman', role: 'Team Member', photo: '/images/team/mijanur-rahman.webp' },
  { name: 'Nayeem Islam', role: 'Team Member', photo: '/images/team/nayeem-islam.webp' },
  { name: 'Raihan Sikdar', role: 'Team Member', photo: '/images/team/raihan-sikdar.webp' },
  { name: 'Rifat Hasan', role: 'Team Member', photo: '/images/team/rifat-hasan.webp' },
  { name: 'S.M Arifuzzaman', role: 'Team Member', photo: '/images/team/s-m-arifuzzaman.webp' },
  { name: 'Sabrina Ferdous Reza', role: 'Team Member', photo: '/images/team/sabrina-ferdous-reza.webp' },
  { name: 'Sohan Biswas', role: 'Team Member', photo: '/images/team/sohan-biswas.webp' },
]

const values = [
  { title: 'Client-First', desc: "Every decision begins with understanding our clients' goals and delivering solutions that create real business value.", paths: ['M20.8 8.6a5.5 5.5 0 0 0-9-1.8 5.5 5.5 0 0 0-9 1.8c0 3.6 4 6.9 9 10.4 5-3.5 9-6.8 9-10.4Z'] },
  { title: 'Quality Without Compromise', desc: 'From design to deployment, we maintain high standards to ensure every solution is secure, reliable, and built to last.', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'm9.5 12 1.8 1.8L15 10'] },
  { title: 'Continuous Innovation', desc: 'Technology evolves every day, and so do we. We embrace new ideas to build smarter, faster, and more impactful software.', paths: ['M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z'] },
]

const offices = [
  { city: 'Dhaka, Bangladesh', line: '1st Floor, RMR Center, A&B Ring Rd, Dhaka 1207', flag: '🇧🇩', hq: true },
  { city: 'Seattle, USA', line: '411 University St, Seattle, Washington, USA', flag: '🇺🇸' },
]
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

    <!-- Leadership — CEO & CTO as distinct personalities -->
    <section class="container-page py-20">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Leadership</p>
        <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Meet the People Driving Our Vision</h2>
        <p class="mx-auto mt-3 max-w-xl text-gray-600">Our leadership team combines vision, innovation, and technology to shape the future of our company. </p>
      </div>
      <div class="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        <article v-for="l in leaders" :key="l.name" class="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl">
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img :src="l.photo" :alt="l.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
            <div class="absolute bottom-4 left-5 text-white">
              <p class="font-display text-2xl font-extrabold drop-shadow">{{ l.name }}</p>
              <p class="text-sm font-semibold text-white/90">{{ l.role }}</p>
            </div>
          </div>
          <div class="p-6">
            <svg class="h-8 w-8 opacity-90" :class="l.accent" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Zm8 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7Z" /></svg>
            <p class="mt-2 leading-relaxed text-gray-700">{{ l.quote }}</p>
            <a :href="l.linkedin" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold" :class="l.accent">
              <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" /></svg>
              Connect on LinkedIn
            </a>
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
          <img :src="groupPhoto" alt="The RazinSoft team together at a meetup" class="h-[280px] w-full object-cover sm:h-[380px]" loading="lazy" decoding="async">
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <div class="text-white">
              <p class="font-display text-xl font-extrabold sm:text-2xl">The whole team, together.</p>
              <p class="mt-1 max-w-md text-sm text-white/80">From our quarterly meetups to everyday standups — collaboration is at the heart of how we work.</p>
            </div>
            <span class="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">35+ people · 2 continents</span>
          </div>
        </div>

        <!-- Team grid — with photos -->
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="m in team" :key="m.name" class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div class="relative aspect-square overflow-hidden bg-gray-100">
              <img :src="m.photo" :alt="m.name" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
            </div>
            <div class="p-4 text-center">
              <p class="font-display font-bold text-ink-900 transition-colors group-hover:text-brand-600">{{ m.name }}</p>
              <p class="mt-0.5 text-xs text-gray-500">{{ m.role }}</p>
            </div>
          </article>
        </div>
        <p class="mt-8 text-center text-sm text-gray-500">…and many more building behind the scenes. <NuxtLink to="/careers" class="font-semibold text-brand-600 hover:underline">Want to join us?</NuxtLink></p>
      </div>
    </section>

    <!-- Values -->
    <section class="container-page py-20">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Values</p>
        <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Values That Shape Every Solution </h2>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div v-for="v in values" :key="v.title" class="rounded-2xl border border-gray-100 p-7 shadow-sm">
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="p in v.paths" :key="p" stroke-linecap="round" stroke-linejoin="round" :d="p" /></svg>
          </span>
          <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ v.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Global offices -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Global Offices</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Where you’ll find us</h2>
        </div>
        <div class="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div v-for="o in offices" :key="o.city" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ o.flag }}</span>
              <h3 class="font-display text-lg font-bold text-ink-900">{{ o.city }}</h3>
              <span v-if="o.hq" class="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-600">HQ</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">{{ o.line }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-20 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="container-page relative text-center">
        <h2 class="font-display text-3xl font-extrabold sm:text-4xl">Let’s build something great together</h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-300">Have a project in mind? Our team is ready to help you plan, build and scale.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/contact-us" class="btn bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700">Contact us</NuxtLink>
          <NuxtLink to="/careers" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">Join our team</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
