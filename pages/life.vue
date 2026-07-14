<script setup lang="ts">
usePageSeo({
  title: 'Life @ RazinSoft — Our Culture, People & Workplace',
  description: 'Take a peek inside RazinSoft — our people, culture, the everyday rhythm and the team that makes working here special.',
})

// NOTE: images reuse the current /life/ photos — swap in real ones anytime.
const IMG = {
  group: '/life/RazinSoft-Group-Image.webp',
  work: '/life/RazinSoft-Work-Image.webp',
  cricket: '/life/RazinSoft-Cricket-Image.webp',
  tt: '/life/RazinSoft-TT-Image.webp',
  buffer: '/life/RazinSoft-Buffer-Image.webp',
}

const heroPhotos = [IMG.work, IMG.group, IMG.buffer, IMG.tt]

const collage = [IMG.tt, IMG.work, IMG.group]

const gallery = [
  { src: IMG.work, tag: 'Engineering', span: 'sm:col-span-2' },
  { src: IMG.buffer, tag: 'Deep Work', span: 'sm:col-span-2 sm:row-span-2' },
  { src: IMG.group, tag: 'Strategy', span: '' },
  { src: IMG.cricket, tag: 'Collaboration', span: '' },
  { src: IMG.tt, tag: 'Planning', span: '' },
  { src: IMG.buffer, tag: 'Remote', span: '' },
  { src: IMG.cricket, tag: 'Sports Day', span: '' },
  { src: IMG.group, tag: 'Team Event', span: '' },
]

const day = [
  { label: 'Morning', time: '10:00am', title: 'Doors open', desc: 'The office comes alive at 10. No 8am stand-ups, no groggy all-hands. Grab coffee, settle in, and ease into focus.', wm: '10:00', bg: 'bg-amber-50', chip: 'bg-amber-100 text-amber-700', accent: 'text-amber-600', wmCls: 'text-amber-500/20' },
  { label: 'Morning', time: '10:30am', title: 'Team standup', desc: "A focused 15-minute sync — what shipped, what's next, any blockers. Done by 10:45.", wm: '10:30', bg: 'bg-blue-50', chip: 'bg-blue-100 text-blue-700', accent: 'text-blue-600', wmCls: 'text-blue-500/20' },
  { label: 'Deep Work', time: '11:00am', title: 'Deep work block', desc: 'Calendars go dark. No pings, no drop-ins. This is protected time for real engineering, design, and thinking.', wm: '11:00', bg: 'bg-purple-50', chip: 'bg-purple-100 text-purple-700', accent: 'text-purple-600', wmCls: 'text-purple-500/20' },
  { label: 'Lunch Break', time: '1:00pm', title: 'Lunch break', desc: 'Proper lunch away from screens. We eat together when we can, and share the good stuff.', wm: '1:00', bg: 'bg-emerald-50', chip: 'bg-emerald-100 text-emerald-700', accent: 'text-emerald-600', wmCls: 'text-emerald-500/20' },
  { label: 'Afternoon', time: '2:00pm', title: 'Collabs & reviews', desc: 'Product reviews, design crits, pair programming, 1-on-1s. Short, focused, with clear outcomes and no filler.', wm: '2:00', bg: 'bg-rose-50', chip: 'bg-rose-100 text-rose-700', accent: 'text-rose-600', wmCls: 'text-rose-500/20' },
  { label: 'Shipping', time: '4:30pm', title: 'Ship something', desc: 'Get a PR merged. Push a feature. Deploy to staging. We celebrate shipping, not slide decks.', wm: '4:30', bg: 'bg-sky-50', chip: 'bg-sky-100 text-sky-700', accent: 'text-sky-600', wmCls: 'text-sky-500/20' },
  { label: 'Wrap', time: '7:00pm', title: 'Hard stop', desc: 'Office closes at 7. No after-hours messages. No heroics. Rest is part of the job description.', wm: '7:00', bg: 'bg-ink-900', chip: 'bg-white/10 text-brand-200', accent: 'text-brand-300', wmCls: 'text-white/[0.06]', dark: true },
]

const stories = [
  { name: 'Sohag Sheikh', role: 'DevOps Engineer', years: 4, avatar: 'bg-rose-500', quote: 'I run our deploy pipeline end to end — CI, staging, production. RazinSoft gave me real ownership of the infrastructure, and the room to keep making it faster and more reliable.' },
  { name: 'Sohan Biswas', role: 'HR Manager', years: 6, avatar: 'bg-brand-600', quote: 'I’ve grown with this team for six years and counting. RazinSoft genuinely invests in people — we hire for character and give everyone room to do their best work.' },
  { name: 'Rifat Ahamed', role: 'Product Designer', years: 3, avatar: 'bg-purple-600', quote: 'Design has a real seat at the table here. My work goes straight to clients — no watering down, no “just make the logo bigger”. Pure craft.' },
]

const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="bg-white">
    <!-- ══════════ 1 · Hero ══════════ -->
    <section class="container-page py-14 lg:py-20">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 class="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
            Life @ <span class="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">Razinsoft</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
            RazinSoft ensures a harmonious blend of work-life balance. We nurture an environment that's both fun-loving and growth-oriented, allowing you to bring your best self to everything you do while enhancing your skills. Join us on a journey where you can thrive professionally and personally.
          </p>
          <div class="mt-8">
            <NuxtLink to="/careers" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:opacity-95">
              View Openings
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <img v-for="(src, i) in heroPhotos" :key="i" :src="src" alt="Life at RazinSoft" decoding="async" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm">
        </div>
      </div>
    </section>

    <!-- ══════════ 2 · Who we are ══════════ -->
    <section class="container-page py-14 lg:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">Who we are</p>
          <h2 class="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-[2.75rem]">
            A team that ships,<br>not just talks.
          </h2>
          <div class="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-500">
            <p>RazinSoft started in 2021 as a small, ambitious team with a shared monitor and big plans. Today we're 35+ engineers, designers and strategists across Dhaka and the USA — and we still get genuinely excited when something we built goes live.</p>
            <p>We work on real, hard problems — not throwaway apps or internal dashboards. Our clients trust us with the core of their business: the checkout flow, the scheduling system, the real-time dashboard that runs their operations.</p>
            <p>Our culture is built on low ego, high craft, and a genuine obsession with making things work. We don't optimize for looking busy. We optimize for shipping good software.</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <img :src="collage[0]" alt="RazinSoft team at work" loading="lazy" decoding="async" class="row-span-2 h-full w-full rounded-2xl object-cover shadow-sm">
          <img :src="collage[1]" alt="RazinSoft team collaborating" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm">
          <img :src="collage[2]" alt="RazinSoft team" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm">
        </div>
      </div>
    </section>

    <!-- ══════════ 3 · Photo gallery ══════════ -->
    <section class="container-page py-14 lg:py-16">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">Photo Gallery</p>
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink-900">Inside our world</h2>
        </div>
        <span class="font-mono text-sm text-gray-400">{{ gallery.length }} photos</span>
      </div>
      <div class="mt-8 grid grid-flow-row-dense auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4">
        <figure v-for="(g, i) in gallery" :key="i" class="group relative overflow-hidden rounded-2xl bg-gray-100" :class="g.span">
          <img :src="g.src" :alt="g.tag" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
          <figcaption class="absolute left-3 top-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">{{ g.tag }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- ══════════ 4 · A day in the life ══════════ -->
    <section class="bg-gray-50 py-16 lg:py-20">
      <div class="container-page">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">How we work</p>
            <h2 class="mt-2 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900">A day in the life.</h2>
          </div>
          <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 shadow-sm">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            Office hours: 10:00 AM – 7:00 PM
          </span>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-6">
          <div v-for="(d, i) in day" :key="i"
               class="relative overflow-hidden rounded-2xl p-6" :class="[d.bg, i < 4 ? 'sm:col-span-3' : 'sm:col-span-2']">
            <div class="relative z-10 flex items-center justify-between">
              <span class="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider" :class="d.chip">{{ d.label }}</span>
              <span class="font-mono text-xs" :class="d.dark ? 'text-white/40' : 'text-gray-400'">{{ d.time }}</span>
            </div>
            <p class="relative z-10 mt-4 font-mono text-sm font-bold" :class="d.accent">{{ d.time }}</p>
            <div class="relative z-10 mt-1 border-t" :class="d.dark ? 'border-white/15' : 'border-black/[0.08]'"></div>
            <h3 class="relative z-10 mt-3 font-display text-lg font-bold" :class="d.dark ? 'text-white' : 'text-ink-900'">{{ d.title }}</h3>
            <p class="relative z-10 mt-1.5 max-w-md text-sm leading-relaxed" :class="d.dark ? 'text-white/60' : 'text-gray-500'">{{ d.desc }}</p>
            <span class="pointer-events-none absolute -bottom-5 right-3 select-none font-display text-7xl font-black leading-none" :class="d.wmCls" aria-hidden="true">{{ d.wm }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ 5 · Team stories ══════════ -->
    <section class="container-page py-16 lg:py-20">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">Team Stories</p>
      <h2 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink-900">Hear from the team</h2>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <figure v-for="s in stories" :key="s.name" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white" :class="s.avatar" aria-hidden="true">{{ initials(s.name) }}</span>
            <div>
              <p class="font-display text-sm font-bold text-ink-900">{{ s.name }}</p>
              <p class="text-xs text-gray-500">{{ s.role }}</p>
              <p class="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-600">{{ s.years }} years at RazinSoft</p>
            </div>
          </div>
          <blockquote class="mt-4 text-sm italic leading-relaxed text-gray-600">{{ s.quote }}</blockquote>
        </figure>
      </div>
    </section>
  </div>
</template>
