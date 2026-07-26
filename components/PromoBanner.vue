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

// The desktop artwork is 16:1, so on a phone it can only ever show a cropped fragment.
// When the admin supplies a 6:1 phone version we render it whole (aspect-[6/1]); otherwise
// we keep the old cropped strip. From `sm` up the height follows the 16:1 ratio rather than a
// fixed 80/100px: at 1280px a 100px-tall box is 12.6:1, so object-cover was shaving about a
// fifth off the artwork's width.
const hasMobileArt = computed(() => Boolean(banner.value?.mobile_image))
</script>

<template>
  <!-- The band runs edge to edge; the artwork inside it is held to the same container as the
       header, so the sale graphic starts on the logo and the countdown ends on the account
       icon at every width. bg_color is the artwork's own edge colour, so the join is invisible. -->
  <NuxtLink
    v-if="banner"
    to="/products"
    aria-label="View all products"
    class="block w-full"
    :style="banner.bg_color ? { backgroundColor: banner.bg_color } : undefined"
  >
    <div class="container-page relative px-0 sm:px-6 lg:px-8">
      <picture>
        <!-- Phones get the 6:1 artwork when there is one; everything else uses the wide banner. -->
        <source v-if="banner.mobile_image" media="(max-width: 639px)" :srcset="banner.mobile_image" />
        <img
          :src="banner.image"
          alt=""
          class="w-full object-cover sm:h-auto sm:aspect-[16/1]"
          :class="hasMobileArt ? 'aspect-[6/1]' : 'h-16'"
        />
      </picture>

      <div
        v-if="banner.countdown_enabled && banner.ends_at"
        class="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-0.5 sm:right-6 sm:gap-1 lg:right-8"
      >
        <div
          v-if="banner.countdown_label"
          class="items-center gap-1 text-[9px] font-bold uppercase leading-tight tracking-wide md:text-[10px]"
          :class="hasMobileArt ? 'flex' : 'hidden sm:flex'"
          :style="{ color: banner.countdown_title_color }"
        >
          <svg class="h-3 w-3 xl:h-3.5 xl:w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5l3 2" />
          </svg>
          <span>{{ banner.countdown_label }}</span>
        </div>

        <div class="flex items-center gap-1 xl:gap-2">
          <template v-for="(unit, i) in units" :key="unit.key">
            <div class="flex min-w-[30px] flex-col items-center rounded-md bg-white/95 px-1 py-0.5 shadow-sm xl:min-w-[44px] xl:px-2 xl:py-1.5">
              <span class="text-xs font-extrabold leading-none xl:text-lg" :style="{ color: banner.countdown_value_color }">{{ pad(unit.value) }}</span>
              <span class="mt-0.5 text-[7px] font-semibold uppercase leading-none text-gray-500 xl:text-[8px]">{{ unit.label }}</span>
            </div>
            <span v-if="i < units.length - 1" class="text-[10px] font-bold xl:text-sm" :style="{ color: banner.countdown_value_color }">:</span>
          </template>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
