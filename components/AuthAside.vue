<script setup lang="ts">
const points = [
  'Lifetime licenses — pay once, own forever',
  'Full source code & documentation included',
  '24/7 expert support and free updates',
]
</script>

<template>
  <aside class="relative hidden overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
    <div class="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 56px 56px;" />

    <NuxtLink to="/" class="relative flex items-center gap-2">
      <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white" aria-hidden="true">R</span>
      <span class="font-display text-xl font-extrabold">RazinSoft</span>
    </NuxtLink>

    <div class="relative">
      <h2 class="font-display text-3xl font-extrabold leading-tight xl:text-4xl">
        Scalable software for <span class="text-brand-400">growing businesses.</span>
      </h2>
      <p class="mt-4 max-w-md text-gray-300">
        Join 50,000+ teams running their business on RazinSoft’s enterprise-ready platforms.
      </p>
      <ul class="mt-8 space-y-3">
        <li v-for="p in points" :key="p" class="flex items-center gap-3 text-sm text-gray-200">
          <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300" aria-hidden="true">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
          </span>
          {{ p }}
        </li>
      </ul>
    </div>

    <figure class="relative rounded-2xl border border-white/10 bg-white/5 p-5">
      <div class="flex gap-1 text-amber-400" aria-hidden="true">
        <svg v-for="n in 5" :key="n" class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
      </div>
      <blockquote class="mt-3 text-sm leading-relaxed text-gray-200">“RazinSoft’s suite cut our development time by 70%. Live in three days — the analytics dashboard is genuinely excellent.”</blockquote>
      <figcaption class="mt-3 text-sm">
        <span class="font-semibold text-white">Aisha Rahman</span>
        <span class="text-gray-400"> · CTO, NovaTrade</span>
      </figcaption>
    </figure>
  </aside>
</template>
