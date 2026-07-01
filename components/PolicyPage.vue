<script setup lang="ts">
interface Section { heading: string; paragraphs?: string[]; list?: string[] }
defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  updated?: string
  sections: Section[]
}>()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <span class="pointer-events-none absolute -right-8 top-4 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.05] sm:text-[22rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-14 lg:py-20">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">{{ eyebrow || 'Legal' }}</p>
        <h1 class="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">{{ title }}</h1>
        <p v-if="updated" class="mt-4 text-sm text-gray-500">Last updated: {{ updated }}</p>
        <p v-if="intro" class="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">{{ intro }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="container-page py-16">
      <div class="mx-auto max-w-3xl space-y-10">
        <div v-for="(s, i) in sections" :key="i">
          <h2 class="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">
            <span class="mr-2 text-brand-600">{{ String(i + 1).padStart(2, '0') }}.</span>{{ s.heading }}
          </h2>
          <div class="mt-3 space-y-3">
            <p v-for="(p, pi) in s.paragraphs || []" :key="pi" class="leading-relaxed text-gray-600">{{ p }}</p>
          </div>
          <ul v-if="s.list?.length" class="mt-3 space-y-2">
            <li v-for="(item, li) in s.list" :key="li" class="flex items-start gap-3 text-gray-600">
              <svg class="mt-1 h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
              <span class="leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Contact note -->
        <div class="rounded-2xl border border-gray-100 bg-gray-50 p-6">
          <p class="font-display font-bold text-ink-900">Questions about this policy?</p>
          <p class="mt-1 text-sm text-gray-600">We’re happy to help — reach out and we’ll get back to you within 24 hours.</p>
          <NuxtLink to="/contact-us" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            Contact us
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
