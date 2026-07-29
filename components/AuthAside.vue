<script setup lang="ts">
/**
 * The panel beside the sign-in form.
 *
 * Everything here used to be hard-coded: the logo file, the headline, "Join 50,000+ teams running
 * their business on RazinSoft's enterprise-ready platforms", and a five-star review from a CTO at
 * a company that does not exist. All of it now comes from the panel, and the invented review is
 * gone — a fabricated quote on a sign-in screen is a lie told to the operator's own customers, and
 * it is not the operator's lie to tell.
 */
const brand = useBranding()

const points = [
  'Lifetime licence — pay once, own it',
  'Full source code and documentation',
  'Free updates for the life of the licence',
]
</script>

<template>
  <aside class="relative hidden overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
    <div class="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true"
         style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 56px 56px;" />

    <NuxtLink to="/" class="relative flex items-center gap-2" :aria-label="`${brand.product} home`">
      <!-- An uploaded logo is shown as it is. Only the shipped mark is known to survive being
           flattened to white, so the filter is not applied to somebody else's artwork. -->
      <img v-if="brand.logo" :src="brand.logo" :alt="brand.product" class="h-9 w-auto">
      <img v-else src="/images/smartdesk-logo.svg" :alt="brand.product" width="760" height="180" class="h-9 w-auto brightness-0 invert">
    </NuxtLink>

    <div class="relative">
      <h2 class="font-display text-3xl font-extrabold leading-tight xl:text-4xl">
        {{ brand.login.heading }}
      </h2>
      <p class="mt-4 max-w-md text-gray-300">
        {{ brand.footer.about }}
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

    <!-- Where the invented testimonial was. Contact details are true and useful; a made-up review
         is neither. -->
    <div class="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
      <p class="font-semibold text-white">{{ brand.company_name }}</p>
      <p v-if="brand.address" class="mt-1 text-gray-400">{{ brand.address }}</p>
      <div class="mt-3 space-y-1 text-gray-300">
        <p>
          <a :href="`mailto:${brand.support_email}`" class="hover:text-white">{{ brand.support_email }}</a>
        </p>
        <p v-if="brand.phone">
          <a :href="`tel:${brand.phone}`" class="hover:text-white">{{ brand.phone }}</a>
        </p>
      </div>
    </div>
  </aside>
</template>
