<script setup lang="ts">
interface Logo { name: string; image?: string }

const props = withDefaults(defineProps<{
  heading?: string
  logos?: Logo[]
}>(), {
  heading: 'Trusted by Fast-Moving Tech Teams From Startups to Enterprises',
  logos: () => [
    // Real client logos from /public/clients (styled name shown only if `image` is missing).
    { name: 'Radiant Pharmaceuticals', image: '/clients/radiant-pharmaceuticals.webp' },
    { name: 'Bridge', image: '/clients/Bridge.webp' },
    { name: 'DocTime', image: '/clients/DocTime.webp' },
    { name: 'Dhaka Central International Medical College', image: '/clients/Dhaka_Central_International_Mediacal_College.webp' },
    { name: 'EduMali', image: '/clients/EduMali.webp' },
    { name: 'GoldStar', image: '/clients/GoldStar.webp' },
    { name: 'IronMan', image: '/clients/IronMan.webp' },
    { name: 'Jacks Gelato', image: '/clients/JacksGelato.webp' },
    { name: 'LaundryRunnerz', image: '/clients/LaundryRunnerz.webp' },
    { name: 'MasterBari', image: '/clients/MasterBari.webp' },
    { name: 'PCBBD Store', image: '/clients/PCBBD_Store.webp' },
    { name: 'Screw Hardware', image: '/clients/ScrewHardware.webp' },
  ],
})

// 4 copies → seamless -50% loop.
const loop = computed(() => [...props.logos, ...props.logos, ...props.logos, ...props.logos])
</script>

<template>
  <section class="overflow-hidden border-b border-gray-100 bg-white py-14">
    <h2 class="container-page text-center font-display text-xl font-extrabold leading-snug text-ink-900 sm:text-2xl">
      {{ heading }}
    </h2>
    <div class="marquee mt-10">
      <ul class="logo-track">
        <li v-for="(logo, i) in loop" :key="i">
          <div class="grid h-20 w-44 place-items-center rounded-xl border border-gray-100 bg-white px-6 shadow-sm">
            <img v-if="logo.image" :src="logo.image" :alt="logo.name" width="128" height="40" loading="lazy" decoding="async" class="max-h-10 max-w-full object-contain">
            <span v-else class="text-center font-display text-sm font-extrabold uppercase tracking-wide text-gray-400">{{ logo.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.logo-track {
  display: flex;
  width: max-content;
  animation: logo-marquee 70s linear infinite;
}
/* Uniform trailing margin (incl. last item) keeps the -50% loop seamless. */
.logo-track > li {
  margin-right: 2rem;
}
.marquee:hover .logo-track {
  animation-play-state: paused;
}
@keyframes logo-marquee {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .logo-track {
    animation: none;
  }
}
</style>
