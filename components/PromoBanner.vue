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
const units = computed(() => [
  { key: 'days', value: remaining.value.days, label: 'Days' },
  { key: 'hours', value: remaining.value.hours, label: 'Hrs' },
  { key: 'minutes', value: remaining.value.minutes, label: 'Mins' },
  { key: 'seconds', value: remaining.value.seconds, label: 'Secs' },
])
</script>

<template>
  <NuxtLink v-if="banner" to="/products" aria-label="View all products" class="relative block w-full">
    <img :src="banner.image" alt="" class="h-16 w-full object-cover sm:h-20 md:h-[100px]" />

    <div
      v-if="banner.countdown_enabled && banner.ends_at"
      class="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 sm:right-4 md:right-8"
    >
      <div
        v-if="banner.countdown_label"
        class="hidden items-center gap-1 text-[9px] font-bold uppercase leading-tight tracking-wide sm:flex md:text-[10px]"
        :style="{ color: banner.countdown_title_color }"
      >
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" />
        </svg>
        <span>{{ banner.countdown_label }}</span>
      </div>

      <div class="flex items-center gap-1.5 sm:gap-2">
        <template v-for="(unit, i) in units" :key="unit.key">
          <div class="flex min-w-[34px] flex-col items-center rounded-md bg-white/95 px-1.5 py-1 shadow-sm sm:min-w-[44px] sm:px-2 sm:py-1.5">
            <span class="text-sm font-extrabold leading-none sm:text-lg" :style="{ color: banner.countdown_value_color }">{{ pad(unit.value) }}</span>
            <span class="mt-0.5 text-[7px] font-semibold uppercase leading-none text-gray-500 sm:text-[8px]">{{ unit.label }}</span>
          </div>
          <span v-if="i < units.length - 1" class="text-xs font-bold sm:text-sm" :style="{ color: banner.countdown_value_color }">:</span>
        </template>
      </div>
    </div>
  </NuxtLink>
</template>
