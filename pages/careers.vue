<script setup lang="ts">
usePageSeo({
  title: 'Careers — Build Your Future at RazinSoft',
  description: 'Join RazinSoft and work on products used by 50,000+ businesses worldwide. Explore open roles, our culture, benefits and how we grow together.',
})

const perks = [
  { title: 'Growth & Learning', desc: 'Annual learning budget, mentorship and real ownership from day one.', tone: 'bg-blue-50 text-blue-600', paths: ['M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z'] },
  { title: 'Flexible Work', desc: 'Hybrid schedules and flexible hours — we care about outcomes, not clock-ins.', tone: 'bg-emerald-50 text-emerald-600', paths: ['M12 8v4l3 2', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'] },
  { title: 'Health & Wellbeing', desc: 'Medical coverage, wellness support and generous paid leave.', tone: 'bg-rose-50 text-rose-600', paths: ['M20.8 8.6a5.5 5.5 0 0 0-9-1.8 5.5 5.5 0 0 0-9 1.8c0 3.6 4 6.9 9 10.4 5-3.5 9-6.8 9-10.4Z'] },
  { title: 'Modern Tools', desc: 'Top-tier hardware and the best tools so you can do your best work.', tone: 'bg-purple-50 text-purple-600', paths: ['M4 5h16v11H4zM2 20h20M9 8h6M9 12h3'] },
  { title: 'Team Culture', desc: 'Regular events, hackathons and a supportive, collaborative team.', tone: 'bg-orange-50 text-orange-600', paths: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M17 11a3 3 0 1 0 0-6', 'M3 20a6 6 0 0 1 12 0', 'M16.5 14.5A6 6 0 0 1 21 20'] },
  { title: 'Impact', desc: 'Ship products used by 50,000+ businesses across 40+ countries.', tone: 'bg-sky-50 text-sky-600', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
]

// Live openings from the Laravel API — ONLY roles an admin has explicitly published
// appear here (drafts stay internal), so nothing goes public until it's verified.
const { $api } = useNuxtApp()
const { data: res } = await useAsyncData('jobs', () => $api<any>('/jobs'))
const roles = computed<any[]>(() => res.value?.data ?? [])

const deptTone: Record<string, string> = {
  Engineering: 'bg-blue-50 text-blue-700', Design: 'bg-purple-50 text-purple-700', Infrastructure: 'bg-emerald-50 text-emerald-700', Sales: 'bg-orange-50 text-orange-700', Support: 'bg-rose-50 text-rose-700',
}
const toneFor = (dept: string) => deptTone[dept] || 'bg-gray-100 text-gray-600'
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <span class="pointer-events-none absolute -right-8 top-4 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.05] sm:text-[22rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-16 lg:py-24">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Careers</p>
        <h1 class="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Join our team and <span class="text-brand-600">build your future</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          We're a team of engineers, designers and problem-solvers building software that powers businesses worldwide. Come grow with us and do the best work of your career.
        </p>
        <a href="#openings" class="mt-8 inline-flex btn bg-brand-600 text-white hover:bg-brand-700">See open roles
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-6-6 6 6 6-6" /></svg>
        </a>
      </div>
    </section>

    <!-- Perks -->
    <section class="container-page py-20">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Why RazinSoft</p>
        <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Perks that put people first</h2>
      </div>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="p in perks" :key="p.title" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <span class="grid h-12 w-12 place-items-center rounded-xl" :class="p.tone" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in p.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
          </span>
          <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ p.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ p.desc }}</p>
        </article>
      </div>
    </section>

    <!-- Openings -->
    <section id="openings" class="scroll-mt-20 bg-gray-50 py-20">
      <div class="container-page">
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Open Positions</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-ink-900 lg:text-4xl">Find your role</h2>
        </div>
        <div v-if="roles.length" class="mx-auto mt-12 max-w-3xl space-y-4">
          <div v-for="r in roles" :key="r.id" class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="min-w-0">
              <h3 class="font-display text-lg font-bold text-ink-900">{{ r.title }}</h3>
              <div class="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span v-if="r.department" class="rounded-full px-2.5 py-1 font-semibold" :class="toneFor(r.department)">{{ r.department }}</span>
                <span class="text-gray-400">{{ r.type }}</span>
                <template v-if="r.location"><span class="text-gray-300">·</span><span class="text-gray-400">{{ r.location }}</span></template>
              </div>
            </div>
            <a v-if="r.apply_url" :href="r.apply_url" target="_blank" rel="noopener" class="btn border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100">Apply
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </a>
            <NuxtLink v-else :to="`/contact-us?role=${encodeURIComponent(r.title)}`" class="btn border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100">Apply
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state — no roles are published right now. -->
        <div v-else class="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <span class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
          </span>
          <h3 class="mt-4 font-display text-lg font-bold text-ink-900">No open positions right now</h3>
          <p class="mt-2 text-sm text-gray-600">We're not actively hiring at the moment, but we're always keen to meet great people.</p>
        </div>

        <p class="mt-8 text-center text-sm text-gray-500">Don't see your role? <NuxtLink to="/contact-us" class="font-semibold text-brand-600 hover:underline">Send us your CV</NuxtLink> — we're always looking for great people.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-20 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="container-page relative text-center">
        <h2 class="font-display text-3xl font-extrabold sm:text-4xl">Ready to grow with us?</h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-300">Explore life at RazinSoft or reach out — we'd love to meet you.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/life" class="btn bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700">Life at RazinSoft</NuxtLink>
          <NuxtLink to="/contact-us" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
