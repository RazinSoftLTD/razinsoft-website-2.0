<script setup lang="ts">
usePageSeo({
  title: 'Life @ RazinSoft — Our Culture, People & Workplace',
  description: 'Take a peek inside RazinSoft — our people, culture, the everyday rhythm and the team that makes working here special.',
})

// Life page photos — /public/life/{hero,who-we-are,gallery}/

// Top "Life @ RazinSoft" strip (in numbered order).
const heroPhotos = [
  '/images/life/hero/work-01.webp',
  '/images/life/hero/ping-pong-02.webp',
  '/images/life/hero/buffet-dinner-03.webp',
  '/images/life/hero/event-04.webp',
]

// "Who We Are" collage (first one is the tall image).
const collage = [
  '/images/life/who-we-are/cricket-match-01-2.webp',
  '/images/life/who-we-are/office-meeting-02.webp',
  '/images/life/who-we-are/boishakh-03.webp',
]

// Photo gallery — each image with its own tag.
const gallery = [
  { src: '/images/life/gallery/engineering.webp', tag: 'Engineering', span: 'sm:col-span-2' },
  { src: '/images/life/gallery/tour.webp', tag: 'Tour', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/images/life/gallery/strategy.webp', tag: 'Strategy', span: '' },
  { src: '/images/life/gallery/collaboration.webp', tag: 'Collaboration', span: '' },
  { src: '/images/life/gallery/planning.webp', tag: 'Planning', span: '' },
  { src: '/images/life/gallery/meeting.webp', tag: 'Meeting', span: '' },
  { src: '/images/life/gallery/sports-day.webp', tag: 'Sports Day', span: '' },
  { src: '/images/life/gallery/team-event.webp', tag: 'Team Event', span: '' },
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
  { name: 'Shohag Sheikh', role: 'DevOps Engineer', years: 4, avatar: 'bg-rose-500', quote: "The people here make work enjoyable. Everyone's easy to talk to, always ready to help, and there's a real team spirit. It honestly feels good coming to work every day." },
  { name: 'Rifat Ahmed', role: 'Product Designer', years: 3, avatar: 'bg-purple-600', quote: "Seeing an idea go from a quick discussion to a real product is the best part of my job. Everyone's open to feedback, and that makes working together really enjoyable." },
  { name: 'Nayeem Islam', role: 'Flutter Developer', years: 2, avatar: 'bg-sky-500', quote: 'One thing I really enjoy is our play area. A quick game of ping pong with teammates is a fun way to recharge, clear your mind, and get back to work with fresh energy.' },
  { name: 'Lamiya Akter Liza', role: 'Backend Developer', years: 4, avatar: 'bg-emerald-500', quote: "What I value most is the trust. Once you're given responsibility, people believe in you and let you do your best. That kind of confidence means a lot." },
  { name: 'Md Nizam Uddin', role: 'Business Development Manager', years: 4, avatar: 'bg-brand-600', quote: "I spend a lot of time talking with clients, so it's nice to work in an environment that stays positive and relaxed. It helps you stay motivated, even on busy days." },
]

const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

const benefits = [
  { title: 'Health & Wellness', desc: 'Full medical coverage for you and your family, from day one.', paths: ['M20.8 8.6a5.5 5.5 0 0 0-9-1.8 5.5 5.5 0 0 0-9 1.8c0 3.6 4 6.9 9 10.4 5-3.5 9-6.8 9-10.4Z'] },
  { title: 'Fast Growth', desc: 'Ship real products from week one — no bench time, no busy work.', paths: ['M13 2 4 14h6l-1 8 9-12h-6l1-8Z'] },
  { title: 'Remote-Friendly', desc: 'Work from our Dhaka office, the USA, or remotely — we care about output, not location.', featured: true, paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.7 2.5 15 0 18M12 3c-2.5 2.7-2.5 15 0 18'] },
  { title: 'Great Office', desc: 'A comfortable Dhaka HQ with free lunches, unlimited coffee, and quiet focus space.', paths: ['M4 8h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM16 9h1.5a2.5 2.5 0 0 1 0 5H16M7 2v2M10 2v2M13 2v2'] },
  { title: 'Learning Budget', desc: 'A yearly learning budget for courses, books, certifications and conferences.', paths: ['M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM8.5 13.2 7 22l5-3 5 3-1.5-8.8'] },
  { title: 'Bonuses & Increments', desc: 'Competitive pay, performance bonuses, and yearly increments.', paths: ['M3 17l6-6 4 4 8-8M21 7h-5m5 0v5'] },
  { title: 'Team Retreats', desc: 'Team outings and yearly retreats — past trips include Cox’s Bazar and Sylhet.', paths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'] },
  { title: 'Flexible Hours', desc: 'A focused core through the day, and flexibility around the edges — you own your schedule.', paths: ['M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18'] },
]
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
        <figure v-for="(s, si) in stories" :key="si" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
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

    <!-- ══════════ 6 · Benefits ══════════ -->
    <section class="bg-gray-50 py-16 lg:py-20">
      <div class="container-page">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-brand-600">Benefits</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink-900">What you get</h2>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500">We offer a comprehensive benefits package that treats people like adults — not perks designed to keep you at your desk longer.</p>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="b in benefits" :key="b.title"
               class="rounded-2xl border p-6 transition"
               :class="b.featured ? 'border-brand-200 bg-brand-50 ring-1 ring-brand-100' : 'border-gray-100 bg-white shadow-sm hover:shadow-md'">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-100/70 text-brand-600" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in b.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ b.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-500">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
