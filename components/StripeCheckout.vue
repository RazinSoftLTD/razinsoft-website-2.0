<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps<{ clientSecret: string; publishableKey: string; order?: string }>()
const emit = defineEmits<{ cancel: [order?: string] }>()

const loading = ref(true)
const errorMsg = ref('')
let checkout: any = null

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  try {
    const stripe: any = await loadStripe(props.publishableKey)
    if (!stripe) throw new Error('Stripe failed to load')
    // Embedded Checkout mounts Stripe's card UI inside our modal — no redirect, no iframe block.
    // On success Stripe redirects the page to the session return_url (our /payment/success).
    // Stripe.js v9 renamed initEmbeddedCheckout → createEmbeddedCheckoutPage (older name kept as fallback).
    const create = stripe.createEmbeddedCheckoutPage ?? stripe.initEmbeddedCheckout
    checkout = await create.call(stripe, { clientSecret: props.clientSecret })
    checkout.mount('#stripe-embedded')
    loading.value = false
  } catch (e: any) {
    errorMsg.value = e?.message || 'Could not start the card payment.'
    loading.value = false
  }
})

onBeforeUnmount(() => {
  try { checkout?.destroy() } catch { /* already gone */ }
  document.body.style.overflow = ''
})

function close() {
  try { checkout?.destroy() } catch { /* already gone */ }
  emit('cancel', props.order)
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Card payment">
    <div class="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <header class="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <p class="flex items-center gap-2 font-display font-bold text-ink-900">
          <svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
          Secure Card Payment
        </p>
        <button type="button" class="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-ink-900" aria-label="Cancel and close payment" @click="close">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </header>

      <div class="min-h-[320px] flex-1 overflow-auto p-4">
        <p v-if="loading" class="py-16 text-center text-sm text-gray-500">Loading secure card form…</p>
        <p v-if="errorMsg" class="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{{ errorMsg }}</p>
        <!-- Stripe Embedded Checkout mounts here -->
        <div id="stripe-embedded" />
      </div>
    </div>
  </div>
</template>
