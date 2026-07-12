<script setup lang="ts">
usePageSeo({
  title: 'Shopping Cart',
  description: 'Review the products in your RazinSoft cart and proceed to a secure one-time checkout.',
})
// Cart pages should not be indexed.
useSeoMeta({ robots: 'noindex, follow' })

const { items, lineKey, unitPrice, lineTotal, count, subtotal, remove, setQty, coupon, discount, total, applyCoupon } = useCart()

const couponInput = ref(coupon.value)
const couponError = ref('')
function onApply() {
  couponError.value = applyCoupon(couponInput.value) ? '' : 'Invalid coupon code.'
}
</script>

<template>
  <div class="container-page py-12">
    <nav aria-label="Breadcrumb" class="text-sm text-gray-500">
      <ol class="flex items-center gap-2">
        <li><NuxtLink to="/" class="hover:text-ink-900">Home</NuxtLink></li>
        <li aria-hidden="true">/</li>
        <li><NuxtLink to="/products" class="hover:text-ink-900">Products</NuxtLink></li>
        <li aria-hidden="true">/</li>
        <li class="text-ink-900" aria-current="page">Cart</li>
      </ol>
    </nav>

    <h1 class="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
      Shopping Cart
      <span v-if="items.length" class="ml-1 align-middle text-lg font-semibold text-gray-400">({{ count }} {{ count === 1 ? 'item' : 'items' }})</span>
    </h1>

    <!-- Empty state -->
    <div v-if="!items.length" class="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-20 text-center">
      <span class="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600" aria-hidden="true">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
      </span>
      <h2 class="mt-5 font-display text-xl font-bold text-ink-900">Your cart is empty</h2>
      <p class="mt-2 max-w-sm text-gray-500">Looks like you haven't added any products yet. Explore our enterprise-ready platforms.</p>
      <NuxtLink to="/products" class="btn-brand mt-6">Browse products</NuxtLink>
    </div>

    <!-- Cart layout -->
    <div v-else class="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
      <!-- Items -->
      <ul class="space-y-4">
        <li v-for="it in items" :key="lineKey(it)" class="rounded-2xl border border-gray-100 p-4 shadow-sm sm:p-5">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <NuxtLink :to="`/products/${it.slug}`" class="shrink-0">
              <NuxtImg :src="it.image || `/images/products/${it.slug}.jpg`" :alt="it.name" width="160" height="120" sizes="160px" format="webp" loading="lazy" class="h-28 w-full rounded-xl bg-gray-100 object-cover sm:h-24 sm:w-32" />
            </NuxtLink>

            <div class="min-w-0 flex-1">
              <h2 class="font-display text-base font-bold text-ink-900">
                <NuxtLink :to="`/products/${it.slug}`" class="hover:text-brand-700">{{ it.name }}</NuxtLink>
              </h2>
              <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span class="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{{ it.label }}</span>
                <span v-if="it.version" class="text-gray-400">V {{ it.version }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-center">
              <!-- Qty stepper -->
              <div class="inline-flex items-center rounded-lg border border-gray-200">
                <button type="button" class="grid h-9 w-9 place-items-center text-gray-600 hover:bg-gray-50 disabled:opacity-40" :disabled="it.qty <= 1" :aria-label="`Decrease quantity of ${it.name}`" @click="setQty(it, it.qty - 1)">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M5 12h14" /></svg>
                </button>
                <span class="w-9 text-center text-sm font-semibold tabular-nums">{{ it.qty }}</span>
                <button type="button" class="grid h-9 w-9 place-items-center text-gray-600 hover:bg-gray-50" :aria-label="`Increase quantity of ${it.name}`" @click="setQty(it, it.qty + 1)">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>

              <div class="text-right">
                <p class="font-display text-lg font-extrabold text-ink-900">${{ lineTotal(it).toLocaleString() }}</p>
                <p class="text-xs text-gray-400">${{ unitPrice(it).toLocaleString() }} each</p>
              </div>

              <button type="button" class="text-gray-400 hover:text-red-600" :aria-label="`Remove ${it.name} from cart`" @click="remove(it)">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m1 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7" /></svg>
              </button>
            </div>
          </div>
        </li>

        <li>
          <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" /></svg>
            Continue shopping
          </NuxtLink>
        </li>
      </ul>

      <!-- Summary -->
      <aside class="rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-20">
        <h2 class="font-display text-lg font-bold text-ink-900">Order Summary</h2>

        <dl class="mt-5 space-y-3 text-sm">
          <div class="flex justify-between">
            <dt class="text-gray-600">Subtotal</dt>
            <dd class="font-semibold text-ink-900">${{ subtotal.toLocaleString() }}</dd>
          </div>
          <div v-if="discount" class="flex justify-between text-emerald-600">
            <dt>Discount ({{ coupon }})</dt>
            <dd class="font-semibold">−${{ discount.toLocaleString() }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Taxes</dt>
            <dd class="text-gray-500">Calculated at checkout</dd>
          </div>
        </dl>

        <!-- Coupon -->
        <form class="mt-5" @submit.prevent="onApply">
          <label for="coupon" class="sr-only">Coupon code</label>
          <div class="flex gap-2">
            <input id="coupon" v-model="couponInput" type="text" placeholder="Coupon code" class="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
            <button type="submit" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-ink-800 hover:bg-gray-50">Apply</button>
          </div>
          <p v-if="couponError" class="mt-1.5 text-xs text-red-600">{{ couponError }}</p>
          <p v-else-if="coupon" class="mt-1.5 text-xs text-emerald-600">Coupon “{{ coupon }}” applied.</p>
        </form>

        <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
          <span class="font-display text-lg font-bold text-ink-900">Total</span>
          <span class="font-display text-2xl font-extrabold text-ink-900">${{ total.toLocaleString() }}</span>
        </div>

        <NuxtLink to="/checkout" class="btn-brand mt-5 w-full">
          Proceed to Checkout
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>

        <ul class="mt-5 space-y-2 text-xs text-gray-500">
          <!-- <li class="flex items-center gap-2"><svg class="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4" /></svg> Secure SSL checkout</li> -->
          <li class="flex items-center gap-2"><svg class="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg> 30-day money-back guarantee</li>
        </ul>
      </aside>
    </div>
  </div>
</template>
