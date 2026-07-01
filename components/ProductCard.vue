<script setup lang="ts">
import type { CardProduct } from '~/composables/useCatalog'

const props = defineProps<{ product: CardProduct; eager?: boolean }>()
const { addItem } = useCart()

const badgeClass: Record<string, string> = {
  'Best Seller': 'bg-amber-400 text-ink-900',
  New: 'bg-emerald-600 text-white',
  Free: 'bg-brand-700 text-white',
}

// Adding from a card buys the first plan (products have no standalone price).
function add() {
  const p = props.product
  addItem({ slug: p.slug, name: p.name, unitPrice: p.price, image: p.image, version: p.version, planId: p.planId ?? undefined, planName: p.planName ?? undefined })
}
</script>

<template>
  <article class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
    <div class="relative">
      <NuxtLink :to="`/products/${product.slug}`" :aria-label="`View ${product.name}`" class="block">
        <NuxtImg
          :src="product.image"
          :alt="`${product.name} — ${product.tagline}`"
          :width="product.imageWidth"
          :height="product.imageHeight"
          sizes="100vw sm:50vw lg:384px"
          format="webp"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          class="h-44 w-full bg-gray-100 object-cover transition group-hover:scale-[1.02]"
        />
      </NuxtLink>
      <span
        v-if="product.badge"
        class="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold"
        :class="badgeClass[product.badge]"
      >{{ product.badge }}</span>
      <span class="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
        V {{ product.version }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-bold text-ink-900">
        <NuxtLink :to="`/products/${product.slug}`" class="hover:text-brand-700 focus-visible:text-brand-700">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p class="mt-1 text-sm text-gray-600">{{ product.tagline }}</p>

      <div class="mt-4 flex items-end justify-between">
        <p>
          <span class="text-xs text-gray-600">From</span>
          <span class="ml-1 font-display text-2xl font-extrabold text-ink-900">${{ product.price }}</span>
        </p>
        <span v-if="product.planName" class="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{{ product.planName }}</span>
      </div>

      <div class="mt-3 flex items-center justify-between text-sm">
        <span class="flex items-center gap-1 font-semibold text-amber-600">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
          <span>{{ product.rating }}</span>
          <span class="font-normal text-gray-600">({{ product.reviews }} reviews)</span>
        </span>
        <span class="text-gray-600">{{ product.sales }} sales</span>
      </div>

      <div class="mt-auto flex items-center gap-2 pt-5">
        <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gray-200 text-ink-700 hover:bg-gray-50" :aria-label="`Add ${product.name} to cart`" @click="add">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" />
            <circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" />
          </svg>
        </button>
        <NuxtLink :to="`/products/${product.slug}`" class="btn-outline flex-1" :aria-label="`View ${product.name} details`">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
          Live Preview
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
