<script setup lang="ts">
// Minimal page — usually rendered INSIDE the checkout iframe. It tells the parent window
// the payment succeeded; if opened top-level (no parent), it forwards to the dashboard.
definePageMeta({ layout: false })
useSeoMeta({ robots: 'noindex, nofollow', title: 'Payment successful' })

const route = useRoute()
const order = (route.query.order as string) || ''
const sessionId = (route.query.session_id as string) || ''
// PayPal appends ?token=<paypal-order-id> to the return URL — the backend captures it.
const token = (route.query.token as string) || ''
const { $api } = useNuxtApp()
const { clear } = useCart()

onMounted(async () => {
  // Inside the dev-pay iframe → tell the parent window to finish.
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'rzn-pay', status: 'success', order }, window.location.origin)
    return
  }

  // Top-level return (Stripe Embedded Checkout or PayPal redirect): confirm → fulfil, then go to orders.
  if (order) {
    try {
      await $api(`/orders/${order}/confirm`, { method: 'POST', query: { session_id: sessionId, token } })
    } catch {
      // webhook will fulfil even if this confirm call fails
    }
  }
  clear()
  navigateTo({ path: '/dashboard', hash: '#orders' }, { replace: true })
})
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-gray-50 p-6 text-center">
    <div>
      <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600" aria-hidden="true">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
      </span>
      <h1 class="mt-5 font-display text-2xl font-extrabold text-ink-900">Payment successful</h1>
      <p class="mt-2 text-gray-500">Finalising your order<span v-if="order"> {{ order }}</span>…</p>
    </div>
  </div>
</template>
