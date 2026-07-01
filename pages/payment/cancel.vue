<script setup lang="ts">
// Rendered inside the iframe (tells the parent to close) OR top-level as a real
// "payment cancelled" page offering a re-pay that re-opens the payment iframe.
definePageMeta({ layout: false })
useSeoMeta({ robots: 'noindex, nofollow', title: 'Payment cancelled' })

const route = useRoute()
const order = ref((route.query.order as string) || '')
const { $api } = useNuxtApp()
const { clear } = useCart()

const inIframe = ref(false)
const repaying = ref(false)
const errorMsg = ref('')
const frameUrl = ref('')
const showFrame = ref(false)
const showStripe = ref(false)
const stripeData = ref<{ client_secret: string; publishable_key: string } | null>(null)

onMounted(() => {
  inIframe.value = !!(window.parent && window.parent !== window)
  if (inIframe.value) {
    window.parent.postMessage({ type: 'rzn-pay', status: 'cancel', order: order.value }, window.location.origin)
  }
})

async function repay() {
  if (!order.value || repaying.value) return
  repaying.value = true
  errorMsg.value = ''
  try {
    const res = await $api<{ checkout_url?: string; stripe?: { client_secret: string; publishable_key: string } }>(`/orders/${order.value}/repay`, { method: 'POST' })
    if (res.stripe?.client_secret) {
      stripeData.value = res.stripe
      showStripe.value = true
    } else if (res.checkout_url) {
      frameUrl.value = res.checkout_url
      showFrame.value = true
    }
  } catch (e: any) {
    errorMsg.value = e?.status === 409 ? 'This order is already paid.' : (e?.data?.message || 'Could not restart payment. Please try again.')
  } finally {
    repaying.value = false
  }
}

function onSuccess() {
  showFrame.value = false
  clear()
  navigateTo({ path: '/dashboard', hash: '#orders' })
}
function onCancel() {
  showFrame.value = false
  showStripe.value = false
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-gray-50 p-6 text-center">
    <div v-if="inIframe" class="text-gray-500">Cancelling…</div>

    <div v-else class="w-full max-w-md">
      <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-600" aria-hidden="true">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
      </span>
      <h1 class="mt-5 font-display text-2xl font-extrabold text-ink-900">Payment cancelled</h1>
      <p class="mt-2 text-gray-500">
        Your order<span v-if="order" class="font-semibold text-ink-900"> {{ order }}</span> hasn’t been paid yet. You can try again — your items are saved.
      </p>

      <p v-if="errorMsg" class="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{{ errorMsg }}</p>

      <div class="mt-7 flex flex-wrap justify-center gap-3">
        <button type="button" class="btn-brand disabled:opacity-60" :disabled="repaying || !order" @click="repay">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.7 3M3 3v5h5" /></svg>
          {{ repaying ? 'Starting…' : 'Re-pay now' }}
        </button>
        <NuxtLink to="/cart" class="btn-outline">Back to cart</NuxtLink>
      </div>
    </div>

    <PaymentFrame v-if="showFrame" :url="frameUrl" :order="order" @success="onSuccess" @cancel="onCancel" />
    <StripeCheckout v-if="showStripe && stripeData" :client-secret="stripeData.client_secret" :publishable-key="stripeData.publishable_key" :order="order" @cancel="onCancel" />
  </div>
</template>
