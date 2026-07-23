<script setup lang="ts">
const { data: promotion } = await usePromotion()
const banner = computed(() => promotion.value.top_banner)

// Countdown to the banner's end date, ticking every second while mounted.
const remaining = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  if (!banner.value?.ends_at) return
  const diff = new Date(banner.value.ends_at).getTime() - Date.now()
  if (diff <= 0) {
    remaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }
  remaining.value = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <NuxtLink v-if="banner" to="/products" class="relative block w-full" aria-label="View all products">
    <img :src="banner.image" alt="" class="h-auto w-full object-cover" />
    <span
      v-if="banner.ends_at"
      class="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded bg-black/60 px-2 py-1 font-mono text-[11px] font-bold text-white sm:right-4 sm:px-3 sm:py-1.5 sm:text-sm"
    >
      <template v-if="remaining.days">{{ remaining.days }}d </template>{{ pad(remaining.hours) }}:{{ pad(remaining.minutes) }}:{{ pad(remaining.seconds) }}
    </span>
  </NuxtLink>
</template>
