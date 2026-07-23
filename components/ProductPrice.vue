<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    price: number
    salePrice?: number | null
    percentOff?: number | null
    size?: 'card' | 'lg'
  }>(),
  { salePrice: null, percentOff: null, size: 'card' },
)

// A discount price should never show cents (e.g. "$79.5") — always a whole number, rounded down.
const displayPrice = computed(() => Math.floor(props.salePrice ?? props.price))
</script>

<template>
  <span class="inline-flex flex-wrap items-baseline gap-2">
    <span class="text-xs text-gray-600">From</span>
    <span class="font-display font-extrabold text-ink-900" :class="size === 'lg' ? 'text-3xl' : 'text-2xl'">
      ${{ displayPrice }}
    </span>
    <template v-if="salePrice != null">
      <span class="text-sm font-medium text-gray-400 line-through">${{ price }}</span>
      <span class="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">{{ percentOff }}% OFF</span>
    </template>
  </span>
</template>
