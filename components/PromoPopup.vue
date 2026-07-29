<script setup lang="ts">
const { data: promotion } = await usePromotion()
const popup = computed(() => promotion.value.popup)

// Persists for the lifetime of this app instance (across client-side page navigation) —
// resets only on a full browser reload, which is exactly the requested behaviour.
const dismissed = useState('promo-popup-dismissed', () => false)

function dismiss() {
  dismissed.value = true
}
</script>

<template>
  <div
    v-if="popup && !dismissed"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
    @click.self="dismiss"
  >
    <div class="relative w-full max-w-md">
      <button
        type="button"
        aria-label="Close"
        class="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-gray-600 shadow-lg hover:text-gray-900"
        @click="dismiss"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      <NuxtLink to="/products" aria-label="View all products" @click="dismiss">
        <!-- The box holds its shape before the artwork arrives. Without it the image grew from
             nothing to full height on load, which was the single largest layout shift on the site
             (0.14 of a 0.22 CLS) — the promo is fetched after hydration, so it always lands late.
             Square matches the artwork the admin uploads; object-contain means a differently
             shaped upload letterboxes inside the box rather than being cropped. -->
        <div class="aspect-square w-full overflow-hidden rounded-2xl shadow-2xl">
          <NuxtImg
            :src="popup.image"
            alt=""
            width="448"
            height="448"
            sizes="448px"
            loading="eager"
            fetchpriority="high"
            class="h-full w-full object-contain"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
