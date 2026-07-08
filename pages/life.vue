<script setup lang="ts">
usePageSeo({
  title: 'Life@RazinSoft — Our Life, Culture & Workplace',
  description: 'Take a peek inside RazinSoft — our people, culture, celebrations and the everyday moments that make working here special.',
})

const highlights = [
  { title: 'People First', desc: 'A supportive, no-ego culture where everyone has a voice and room to grow.', tone: 'bg-blue-50 text-blue-600', paths: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
  { title: 'Celebrate Together', desc: 'Festivals, birthdays, product launches — we love finding reasons to celebrate.', tone: 'bg-rose-50 text-rose-600', paths: ['m12 2 2.4 4.8L20 8l-4 3.8L17 18l-5-2.6L7 18l1-6.2L4 8l5.6-1.2Z'] },
  { title: 'Learn & Build', desc: 'Hackathons, tech talks and side projects keep our curiosity alive.', tone: 'bg-brand-50 text-brand-600', paths: ['m8 16-4-4 4-4m8 0 4 4-4 4M14 4l-4 16'] },
  { title: 'Work-Life Balance', desc: 'Flexible hours and hybrid work so you can do great work and live well.', tone: 'bg-purple-50 text-purple-600', paths: ['M12 8v4l3 2', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'] },
]

const photos = [
  { src: '/life/RazinSoft-Group-Image.webp', alt: 'The whole RazinSoft team together for a group photo', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/life/RazinSoft-Work-Image.webp', alt: 'RazinSoft team members working together at the office' },
  { src: '/life/RazinSoft-Cricket-Image.webp', alt: 'RazinSoft team playing cricket together' },
  { src: '/life/RazinSoft-TT-Image.webp', alt: 'RazinSoft team enjoying a game of table tennis' },
  { src: '/life/RazinSoft-Buffer-Image.webp', alt: 'RazinSoft team taking a relaxed break together' },
]

const moments = [
  { title: 'Weekly Tech Talks', desc: 'Every Thursday the team shares something new — a tool, a pattern, a lesson learned.' },
  { title: 'Quarterly Hackathons', desc: '48 hours to build anything. Some of our best features started here.' },
  { title: 'Team Retreats', desc: 'We step away from screens to recharge, plan and have fun together.' },
  { title: 'Festival Celebrations', desc: 'From Eid to New Year, we celebrate every occasion as one big family.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <span class="pointer-events-none absolute -right-8 top-4 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.05] sm:text-[22rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-24">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Life@RazinSoft</p>
        <h1 class="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Life, culture and the <span class="text-brand-600">people behind the products</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          Great software is built by great people who love what they do. Here's a look inside our workplace — the culture, the moments and the team that makes RazinSoft feel like home.
        </p>
      </div>
    </section>

    <!-- Photo gallery -->
    <section class="container-page py-16">
      <div class="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
        <div v-for="(p, i) in photos" :key="i" class="overflow-hidden rounded-2xl bg-gray-100 shadow-sm" :class="p.span">
          <img :src="p.src" :alt="p.alt" class="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" decoding="async">
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Culture</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">What makes us, us</h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="h in highlights" :key="h.title" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
            <span class="grid h-12 w-12 place-items-center rounded-xl" :class="h.tone" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in h.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ h.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ h.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Moments -->
    <section class="container-page py-20">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Everyday Moments</p>
        <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">More than just work</h2>
      </div>
      <div class="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
        <div v-for="m in moments" :key="m.title" class="flex gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm">
          <span class="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
          </span>
          <div>
            <h3 class="font-display text-lg font-bold text-ink-900">{{ m.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-gray-600">{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#16357e] to-[#0b1e4d] py-20 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="container-page relative text-center">
        <h2 class="font-display text-3xl font-extrabold sm:text-4xl">Want to be part of the story?</h2>
        <p class="mx-auto mt-4 max-w-xl text-white/70">We're always looking for curious, kind and talented people to join the team.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/careers" class="btn bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600">View open roles</NuxtLink>
          <NuxtLink to="/about-us" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">About us</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
