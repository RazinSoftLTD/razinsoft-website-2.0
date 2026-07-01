<script setup lang="ts">
// Auth is handled by the parent dashboard shell.
useSeoMeta({ robots: 'noindex, nofollow', title: 'Order details' })

const route = useRoute()
const orderNumber = route.params.order as string
const { $api } = useNuxtApp()

const { data: res, error, refresh } = await useAsyncData(`order-${orderNumber}`, () => $api<any>(`/account/orders/${orderNumber}`))
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Order not found', fatal: true })
}
const order = computed<any>(() => res.value?.data || {})

const fmtMoney = (n: number) => '$' + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')

const PAID = ['paid', 'processing', 'completed']
const paidStatus = computed(() => PAID.includes(order.value.status))
const statusLabel = computed(() => (paidStatus.value ? 'Paid' : 'Unpaid'))
const statusTone = computed(() => (paidStatus.value ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'))

// ---- Product reviews (left from here, product-wise) ----
const reviewState = reactive<Record<string, { open: boolean; rating: number; comment: string }>>({})
const expandedReview = reactive<Record<string, boolean>>({})
const savingReview = ref('')

function toggleReviewText(it: any) {
  const k = it.product_slug
  if (!k || !it.my_review?.comment) return
  expandedReview[k] = !expandedReview[k]
}

function toggleReview(it: any) {
  const k = it.product_slug
  if (!k) return
  if (reviewState[k]?.open) { reviewState[k].open = false; return }
  reviewState[k] = {
    open: true,
    rating: it.my_review?.rating || 0,
    comment: it.my_review?.comment || '',
  }
}

async function saveReview(it: any) {
  const k = it.product_slug
  const form = reviewState[k]
  if (!k || !form?.rating || savingReview.value) return
  savingReview.value = k
  try {
    await $api(`/products/${k}/reviews`, { method: 'POST', body: { rating: form.rating, comment: form.comment } })
    useToast().success(it.my_review ? 'Review updated' : 'Review posted', 'Thanks for your feedback!')
    form.open = false
    await refresh()
  } catch (e: any) {
    useToast().error('Could not save review', e?.data?.message || 'Please try again.')
  } finally {
    savingReview.value = ''
  }
}

// ---- Pay Now (re-pay an unpaid order) ----
const repaying = ref(false)
const showFrame = ref(false)
const showStripe = ref(false)
const frameUrl = ref('')
const stripeData = ref<{ client_secret: string; publishable_key: string } | null>(null)

async function payNow() {
  if (repaying.value || paidStatus.value) return
  repaying.value = true
  try {
    const r = await $api<{ checkout_url?: string; stripe?: { client_secret: string; publishable_key: string } }>(`/orders/${orderNumber}/repay`, { method: 'POST' })
    if (r.stripe?.client_secret) {
      stripeData.value = r.stripe
      showStripe.value = true
    } else if (r.checkout_url) {
      frameUrl.value = r.checkout_url
      showFrame.value = true
    }
  } catch (e: any) {
    useToast().error('Could not start payment', e?.status === 409 ? 'This order is already paid.' : (e?.data?.message || 'Please try again.'))
    if (e?.status === 409) await refresh()
  } finally {
    repaying.value = false
  }
}

async function onPaid() {
  showFrame.value = false
  showStripe.value = false
  useToast().success('Payment received', 'Your downloads are now unlocked.')
  await refresh()
}
function onPayCancel() {
  showFrame.value = false
  showStripe.value = false
}

// Downloads need the Bearer token, so fetch them as a blob via $api and save client-side.
const busy = ref<string>('')
async function download(url: string | null | undefined, filename: string, key: string) {
  if (!url || busy.value) return
  busy.value = key
  try {
    const blob = await $api<Blob>(url, { responseType: 'blob' })
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(href)
  } catch {
    useToast().error('Download failed', 'Please try again.')
  } finally {
    busy.value = ''
  }
}
</script>

<template>
  <div>
    <NuxtLink to="/dashboard/orders" class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-ink-900">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" /></svg>
      Back to orders
    </NuxtLink>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Order {{ order.order_number }}</h1>
        <p class="mt-1 text-sm text-gray-500">Placed {{ fmtDate(order.paid_at || order.created_at) }}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold" :class="statusTone">{{ statusLabel }}</span>
        <button
          v-if="!paidStatus"
          type="button"
          class="btn-brand disabled:opacity-60"
          :disabled="repaying"
          @click="payNow"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h2m4 0h4M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" /></svg>
          {{ repaying ? 'Starting…' : 'Pay Now' }}
        </button>
      </div>
    </div>

    <div class="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
      <!-- Items + downloads -->
      <section class="space-y-4">
        <article v-for="(it, i) in order.items || []" :key="i" class="rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="font-display text-base font-bold text-ink-900">
                <NuxtLink v-if="it.product_slug" :to="`/products/${it.product_slug}`" class="hover:text-brand-700">{{ it.product_name }}</NuxtLink>
                <span v-else>{{ it.product_name }}</span>
              </h2>
              <div class="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span v-if="it.plan_name" class="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{{ it.plan_name }}</span>
                <!-- <span class="text-gray-400">Qty {{ it.quantity }}</span> -->
                <span v-if="it.license?.license_key" class="font-mono text-gray-500">License: {{ it.license.license_key }}</span>
              </div>
            </div>
            <p class="font-display font-extrabold text-ink-900">{{ fmtMoney(it.line_total) }}</p>
          </div>

          <!-- Per-item downloads: License + Source code (unlocked only after payment) -->
          <div class="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            <button
              v-if="it.license?.download_url"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-ink-800 transition hover:bg-gray-50 disabled:opacity-60"
              :disabled="busy === `lic-${i}`"
              @click="download(it.license.download_url, `${it.license.license_key}.pdf`, `lic-${i}`)"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" /></svg>
              {{ busy === `lic-${i}` ? 'Preparing…' : 'License' }}
            </button>
            <button
              v-if="it.source_download_url"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
              :disabled="busy === `src-${i}`"
              @click="download(it.source_download_url, `${it.product_slug || 'source'}.zip`, `src-${i}`)"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" /></svg>
              {{ busy === `src-${i}` ? 'Preparing…' : 'Source Code' }}
            </button>
            <span v-if="!paidStatus" class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
              License &amp; source code unlock after payment.
            </span>
          </div>

          <!-- Per-item review (paid orders only) -->
          <div v-if="it.can_review" class="mt-4 border-t border-gray-100 pt-4">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                class="flex items-center gap-2"
                :class="it.my_review?.comment ? 'cursor-pointer' : 'cursor-default'"
                :aria-expanded="!!expandedReview[it.product_slug]"
                @click="toggleReviewText(it)"
              >
                <span class="text-xs font-semibold text-gray-500">{{ it.my_review ? 'Your rating' : 'Rate this product' }}</span>
                <span v-if="it.my_review" class="flex items-center text-amber-500" aria-hidden="true">
                  <svg v-for="n in 5" :key="n" class="h-4 w-4" :class="n <= it.my_review.rating ? 'text-amber-500' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>
                </span>
                <span v-if="it.my_review && !it.my_review.is_approved" class="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">Hidden by admin</span>
                <svg v-if="it.my_review?.comment" class="h-4 w-4 text-gray-400 transition-transform" :class="expandedReview[it.product_slug] ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
              </button>
              <button type="button" class="text-xs font-semibold text-brand-600 hover:text-brand-700" @click="toggleReview(it)">
                {{ reviewState[it.product_slug]?.open ? 'Cancel' : (it.my_review ? 'Edit review' : 'Write a review') }}
              </button>
            </div>

            <div v-if="it.my_review?.comment && expandedReview[it.product_slug] && !reviewState[it.product_slug]?.open" class="mt-2 text-sm text-gray-600">{{ it.my_review.comment }}</div>

            <!-- Star + comment form -->
            <div v-if="reviewState[it.product_slug]?.open" class="mt-3 rounded-xl border border-gray-100 p-4">
              <div class="flex items-center gap-1">
                <button v-for="n in 5" :key="n" type="button" class="p-0.5" :aria-label="`${n} star`" @click="reviewState[it.product_slug].rating = n">
                  <svg class="h-7 w-7 transition" :class="n <= reviewState[it.product_slug].rating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-300'" fill="currentColor" viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>
                </button>
              </div>
              <textarea v-model="reviewState[it.product_slug].comment" rows="3" placeholder="Share your experience with this product…" class="mt-3 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-ink-800 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200" />
              <div class="mt-3 flex justify-end">
                <button
                  type="button"
                  class="btn bg-brand-600 px-4 py-1.5 text-sm text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="!reviewState[it.product_slug].rating || savingReview === it.product_slug"
                  @click="saveReview(it)"
                >
                  {{ savingReview === it.product_slug ? 'Saving…' : (it.my_review ? 'Update review' : 'Submit review') }}
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- Summary + invoice -->
      <aside class="space-y-4 lg:sticky lg:top-20">
        <section class="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 class="font-display text-lg font-bold text-ink-900">Summary</h2>
          <dl class="mt-4 space-y-2.5 text-sm">
            <div class="flex justify-between"><dt class="text-gray-600">Subtotal</dt><dd class="font-semibold text-ink-900">{{ fmtMoney(order.subtotal) }}</dd></div>
            <div v-if="order.discount" class="flex justify-between text-emerald-600"><dt>Discount<span v-if="order.coupon_code"> ({{ order.coupon_code }})</span></dt><dd class="font-semibold">−{{ fmtMoney(order.discount) }}</dd></div>
            <div class="flex justify-between"><dt class="text-gray-600">Tax</dt><dd class="text-gray-500">{{ fmtMoney(0) }}</dd></div>
            <div class="flex justify-between border-t border-gray-100 pt-2.5"><dt class="font-display font-bold text-ink-900">Total</dt><dd class="font-display text-lg font-extrabold text-ink-900">{{ fmtMoney(order.total) }}</dd></div>
          </dl>

          <!-- Pay Now (unpaid orders) -->
          <button
            v-if="!paidStatus"
            type="button"
            class="btn-brand mt-5 w-full disabled:opacity-60"
            :disabled="repaying"
            @click="payNow"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h2m4 0h4M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" /></svg>
            {{ repaying ? 'Starting payment…' : `Pay Now · ${fmtMoney(order.total)}` }}
          </button>

          <!-- Invoice download -->
          <button
            v-if="order.invoice"
            type="button"
            class="btn-brand mt-5 w-full disabled:opacity-60"
            :disabled="busy === 'inv'"
            @click="download(order.invoice.download_url, `${order.invoice.invoice_number}.pdf`, 'inv')"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" /></svg>
            {{ busy === 'inv' ? 'Preparing…' : 'Download Invoice' }}
          </button>
          <p v-if="order.invoice && !paidStatus" class="mt-2 text-center text-xs text-amber-600">Invoice is marked <strong>UNPAID</strong> until your payment completes.</p>
          <p v-else-if="!order.invoice" class="mt-5 rounded-lg bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">Invoice will be available once the order is placed.</p>
        </section>

        <section v-if="order.billing" class="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="font-display text-sm font-bold text-ink-900">Billed to</h3>
          <p class="mt-2 text-sm text-gray-600">
            {{ order.billing.first_name }} {{ order.billing.last_name }}<br>
            <span v-if="order.billing.email">{{ order.billing.email }}<br></span>
            <span v-if="order.billing.address">{{ order.billing.address }}, </span>{{ order.billing.city }} {{ order.billing.country }}
          </p>
        </section>
      </aside>
    </div>

    <!-- Re-pay modals -->
    <PaymentFrame v-if="showFrame" :url="frameUrl" :order="orderNumber" @success="onPaid" @cancel="onPayCancel" />
    <StripeCheckout v-if="showStripe && stripeData" :client-secret="stripeData.client_secret" :publishable-key="stripeData.publishable_key" :order="orderNumber" @cancel="onPayCancel" />
  </div>
</template>
