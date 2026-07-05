<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
usePageSeo({
  title: 'Checkout',
  description: 'Complete your secure one-time purchase of RazinSoft products.',
})
useSeoMeta({ robots: 'noindex, follow' })

const { items, lineKey, subtotal, coupon, discount, total, applyCoupon, clear } = useCart()
const { $api } = useNuxtApp()
const { user, fetchMe } = useAuth()

// Prefill billing from the signed-in user.
onMounted(async () => {
  await fetchMe()
  if (user.value) {
    const [first, ...rest] = (user.value.name || '').split(' ')
    form.firstName ||= first || ''
    form.lastName ||= rest.join(' ')
    form.email ||= user.value.email
    form.phone ||= user.value.phone || ''
  }
})

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', company: '', address: '', city: '', state: '', zip: '', country: 'United States' })
const payment = ref<'card' | 'paypal' | 'bank'>('card')
// 'United States' first so the prerendered <select> default matches the v-model default (no flash).
const countries = ['United States', 'United Kingdom', 'Bangladesh', 'India', 'Canada', 'Australia', 'United Arab Emirates', 'Germany', 'Other']

const methods = [
  { id: 'card', name: 'Credit / Debit Card', paths: ['M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z', 'M2 10h20'] },
  { id: 'paypal', name: 'PayPal', paths: ['M7 19l1.5-9h4.5a3.5 3.5 0 0 1 0 7H9.5', 'M9 21l1.5-9H15a3.5 3.5 0 0 1 0 7h-3'] },
  { id: 'bank', name: 'Bank Transfer', paths: ['M3 10 12 4l9 6', 'M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18'] },
] as const

const couponInput = ref(coupon.value)
const couponError = ref('')
function onApply() {
  couponError.value = applyCoupon(couponInput.value) ? '' : 'Invalid coupon code.'
}

const placing = ref(false)
const placeError = ref('')

// Payment modal state.
const showFrame = ref(false) // dev-pay / frameable URL → iframe modal
const frameUrl = ref('')
const showStripe = ref(false) // Stripe card → Embedded Checkout modal
const stripeData = ref<{ client_secret: string; publishable_key: string } | null>(null)
const orderNo = ref('')

const canPlace = computed(
  () => !!form.firstName && !!form.lastName && !!form.email && !!form.address && !!form.city && !!form.zip,
)

// Map the chosen UI method to a gateway the API understands.
const gatewayFor = (m: string) => (m === 'paypal' ? 'paypal' : 'stripe')

async function placeOrder() {
  if (!canPlace.value || placing.value) return
  placing.value = true
  placeError.value = ''
  try {
    const payload = {
      items: items.value.map((it) => (it.planId && it.planId > 0
        ? { slug: it.slug, plan_id: it.planId, qty: it.qty }
        : { slug: it.slug, plan_id: null, qty: it.qty, license_type: it.license })),
      coupon: coupon.value || undefined,
      gateway: gatewayFor(payment.value),
      billing: {
        first_name: form.firstName, last_name: form.lastName, email: form.email, phone: form.phone,
        company: form.company, address: form.address, city: form.city, state: form.state, zip: form.zip, country: form.country,
      },
    }

    const res = await $api<{ order_number: string; checkout_url?: string; stripe?: { client_secret: string; publishable_key: string } }>('/checkout', { method: 'POST', body: payload })
    orderNo.value = res.order_number

    if (res.stripe?.client_secret) {
      // Stripe card → mount Embedded Checkout inside the page.
      stripeData.value = res.stripe
      showStripe.value = true
    } else if (res.checkout_url) {
      // dev-pay / other frameable gateway → iframe modal.
      frameUrl.value = res.checkout_url
      showFrame.value = true
    }
  } catch (e: any) {
    placeError.value = e?.data?.message || 'We could not start your checkout. Please try again.'
  } finally {
    placing.value = false
  }
}

// Paid: clear cart and send the customer to their orders.
function onPaid() {
  showFrame.value = false
  clear()
  navigateTo({ path: '/dashboard', hash: '#orders' })
}

// Cancelled / closed the payment window: take them to the cancel page (with re-pay).
function onCancelled() {
  showFrame.value = false
  showStripe.value = false
  navigateTo(`/payment/cancel?order=${orderNo.value}`)
}

// Explicit locale → identical output on server & client (no hydration mismatch).
const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const included = ['Lifetime License', 'Free Lifetime Updates', '6 Months Support', 'Free Installation', 'Full Documentation', 'Source Code Access']
const field = 'h-11 w-full rounded-lg border border-transparent bg-gray-100 px-4 text-sm text-ink-900 placeholder-gray-400 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500'
</script>

<template>
  <div class="container-page py-12">
    <!-- ===== Empty ===== -->
    <div v-if="!items.length" class="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-20 text-center">
      <h1 class="font-display text-2xl font-bold text-ink-900">Your cart is empty</h1>
      <p class="mt-2 text-gray-500">Add a product before heading to checkout.</p>
      <NuxtLink to="/products" class="btn-brand mt-6">Browse products</NuxtLink>
    </div>

    <!-- ===== Checkout ===== -->
    <template v-else>
      <h1 class="sr-only">Checkout</h1>

      <!-- Back link -->
      <NuxtLink to="/cart" class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-ink-900">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" /></svg>
        Back to Product
      </NuxtLink>

      <!-- Steps -->
      <div class="mt-4 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <ol class="mx-auto flex max-w-xl items-start">
          <li class="flex flex-col items-center">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            </span>
            <span class="mt-2 text-sm font-semibold text-ink-900">Billing</span>
          </li>
          <li class="mx-2 mt-5 h-1 flex-1 rounded-full bg-brand-600" aria-hidden="true" />
          <li class="flex flex-col items-center">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-sm font-bold text-gray-400" aria-hidden="true">2</span>
            <span class="mt-2 text-sm font-semibold text-gray-400">Payment</span>
          </li>
          <li class="mx-2 mt-5 h-1 flex-1 rounded-full bg-gray-200" aria-hidden="true" />
          <li class="flex flex-col items-center">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-sm font-bold text-gray-400" aria-hidden="true">3</span>
            <span class="mt-2 text-sm font-semibold text-gray-400">Confirm</span>
          </li>
        </ol>
      </div>

      <form class="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_380px]" @submit.prevent="placeOrder">
        <div class="space-y-6">
          <!-- Billing Information -->
          <section class="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 class="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
              <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
              Billing Information
            </h2>
            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label for="fn" class="mb-1.5 block text-sm font-medium text-ink-800">First Name <span class="text-red-500">*</span></label>
                <input id="fn" v-model="form.firstName" type="text" required autocomplete="given-name" placeholder="John" :class="field" />
              </div>
              <div>
                <label for="ln" class="mb-1.5 block text-sm font-medium text-ink-800">Last Name <span class="text-red-500">*</span></label>
                <input id="ln" v-model="form.lastName" type="text" required autocomplete="family-name" placeholder="Doe" :class="field" />
              </div>
              <div class="md:col-span-2">
                <label for="email" class="mb-1.5 block text-sm font-medium text-ink-800">Email Address <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input id="email" v-model="form.email" type="email" required autocomplete="email" placeholder="john.doe@example.com" :class="[field, 'pr-10']" />
                  <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                </div>
              </div>
              <div>
                <label for="phone" class="mb-1.5 block text-sm font-medium text-ink-800">Phone Number</label>
                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+1 (555) 000-0000" :class="field" />
              </div>
              <div>
                <label for="company" class="mb-1.5 block text-sm font-medium text-ink-800">Company Name <span class="text-gray-400">(Optional)</span></label>
                <input id="company" v-model="form.company" type="text" autocomplete="organization" placeholder="Your Company" :class="field" />
              </div>
              <div class="md:col-span-2">
                <label for="addr" class="mb-1.5 block text-sm font-medium text-ink-800">Address <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input id="addr" v-model="form.address" type="text" required autocomplete="street-address" placeholder="123 Main Street" :class="[field, 'pr-10']" />
                  <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
                </div>
              </div>
              <div>
                <label for="city" class="mb-1.5 block text-sm font-medium text-ink-800">City <span class="text-red-500">*</span></label>
                <input id="city" v-model="form.city" type="text" required autocomplete="address-level2" placeholder="New York" :class="field" />
              </div>
              <div>
                <label for="zip" class="mb-1.5 block text-sm font-medium text-ink-800">ZIP / Postal Code <span class="text-red-500">*</span></label>
                <input id="zip" v-model="form.zip" type="text" required autocomplete="postal-code" placeholder="10001" :class="field" />
              </div>
              <div>
                <label for="state" class="mb-1.5 block text-sm font-medium text-ink-800">State / Province</label>
                <input id="state" v-model="form.state" type="text" autocomplete="address-level1" placeholder="New York" :class="field" />
              </div>
              <div>
                <label for="country" class="mb-1.5 block text-sm font-medium text-ink-800">Country <span class="text-red-500">*</span></label>
                <select id="country" v-model="form.country" autocomplete="country-name" :class="field">
                  <option v-for="c in countries" :key="c">{{ c }}</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Payment Method -->
          <section class="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 class="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
              <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
              Payment Method
            </h2>

            <div class="mt-5 grid gap-3 md:grid-cols-3">
              <button
                v-for="m in methods"
                :key="m.id"
                type="button"
                class="flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all"
                :class="payment === m.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-brand-300'"
                :aria-pressed="payment === m.id"
                @click="payment = m.id"
              >
                <svg class="h-6 w-6" :class="payment === m.id ? 'text-brand-600' : 'text-gray-400'" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in m.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                <span class="text-sm font-semibold" :class="payment === m.id ? 'text-ink-900' : 'text-gray-500'">{{ m.name }}</span>
              </button>
            </div>

            <p v-if="payment === 'card'" class="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">Your card details are entered securely on the next step.</p>
            <p v-else-if="payment === 'paypal'" class="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">You'll be redirected to PayPal to complete your purchase securely.</p>
            <p v-else class="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">Bank account details will be emailed after you place the order. Your license activates once payment is confirmed.</p>

            <p class="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              Secure payment — your card is processed by the gateway, never stored here.
            </p>
          </section>
        </div>

        <!-- Order summary -->
        <div class="space-y-4 lg:sticky lg:top-20">
          <section class="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 class="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
              <svg class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
              Order Summary
            </h2>

            <ul class="mt-4 space-y-3">
              <li v-for="it in items" :key="lineKey(it)" class="flex items-center gap-3">
                <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" /></svg>
                </span>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold text-ink-900">{{ it.name }}</p>
                  <p class="text-xs text-gray-500">{{ it.label }}<span v-if="it.qty > 1"> × {{ it.qty }}</span></p>
                </div>
              </li>
            </ul>

            <!-- Coupon (a div, not a nested <form> — nesting forms breaks hydration) -->
            <div class="mt-5 border-t border-gray-100 pt-5">
              <label for="coupon" class="block text-sm font-medium text-ink-800">Have a coupon code?</label>
              <div class="mt-2 flex gap-2">
                <div class="relative flex-1">
                  <input id="coupon" v-model="couponInput" type="text" placeholder="Enter code" class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm uppercase placeholder:normal-case focus:border-brand-500 focus:bg-white focus:outline-none" @keydown.enter.prevent="onApply" />
                  <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M3 5a2 2 0 0 1 2-2h6l9 9-8 8-9-9V5Z" /></svg>
                </div>
                <button type="button" class="rounded-lg border border-gray-200 px-4 text-sm font-semibold text-ink-800 hover:bg-gray-50" @click="onApply">Apply</button>
              </div>
              <p v-if="couponError" class="mt-1.5 text-xs text-red-600">{{ couponError }}</p>
              <p v-else-if="coupon" class="mt-1.5 text-xs text-emerald-600">Coupon “{{ coupon }}” applied.</p>
            </div>

            <dl class="mt-5 space-y-2.5 border-t border-gray-100 pt-5 text-sm">
              <div class="flex justify-between"><dt class="text-gray-600">Subtotal</dt><dd class="font-semibold text-ink-900">${{ money(subtotal) }}</dd></div>
              <div v-if="discount" class="flex justify-between text-emerald-600"><dt>Discount ({{ coupon }})</dt><dd class="font-semibold">−${{ money(discount) }}</dd></div>
              <div class="flex justify-between"><dt class="text-gray-600">Tax</dt><dd class="font-semibold text-ink-900">${{ money(0) }}</dd></div>
            </dl>

            <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
              <span class="font-display text-xl font-bold text-ink-900">Total</span>
              <span class="font-display text-3xl font-extrabold text-brand-600">${{ money(total) }}</span>
            </div>

            <p v-if="placeError" class="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{{ placeError }}</p>

            <button type="submit" class="btn-brand mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60" :disabled="!canPlace || placing">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              {{ placing ? 'Processing…' : 'Complete Purchase' }}
            </button>

            <p class="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" /></svg>
              Secure 256-bit SSL Encrypted
            </p>
          </section>

          <!-- Money-back guarantee -->
          <section class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div class="flex gap-3">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600" aria-hidden="true">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4" /></svg>
              </span>
              <div>
                <h3 class="font-display text-sm font-bold text-emerald-900">30-Day Money Back Guarantee</h3>
                <p class="mt-1 text-xs leading-relaxed text-emerald-700">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
              </div>
            </div>
          </section>

          <!-- What's included -->
          <!-- <section class="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-display text-base font-bold text-ink-900">What's Included</h3>
            <ul class="mt-4 space-y-2.5 text-sm text-gray-700">
              <li v-for="f in included" :key="f" class="flex items-center gap-2">
                <svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
                {{ f }}
              </li>
            </ul>
          </section> -->
        </div>
      </form>
    </template>

    <!-- dev-pay / frameable gateway → iframe modal -->
    <PaymentFrame v-if="showFrame" :url="frameUrl" :order="orderNo" @success="onPaid" @cancel="onCancelled" />
    <!-- Stripe card → Embedded Checkout modal (success redirects to /payment/success) -->
    <StripeCheckout v-if="showStripe && stripeData" :client-secret="stripeData.client_secret" :publishable-key="stripeData.publishable_key" :order="orderNo" @cancel="onCancelled" />
  </div>
</template>
