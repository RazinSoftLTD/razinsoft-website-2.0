<script setup lang="ts">
/**
 * A product's own page, reached only by the link an operator sends.
 *
 * There is no catalogue: this URL is the product's whole address. So the page has to carry the
 * entire job on its own — what it is, what it costs, and a way to pay — without a nav to fall back
 * on and without asking anyone to make an account first.
 */
type Plan = { id: number; name: string; price: number; blurb: string | null }
type Payload = {
  name: string
  tagline: string | null
  summary: string | null
  image: string | null
  currency: string
  price: number
  ext_price: number | null
  plans: Plan[]
}

const route = useRoute()
const { $api } = useNuxtApp()
const toast = useToast()

const token = computed(() => String(route.params.token))

const { data: product, error } = await useAsyncData<Payload>(
  () => `product-link-${token.value}`,
  () => $api(`/p/${token.value}`),
)

// A bad or withdrawn token should look like any other missing page, not like a broken product.
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'This link is no longer available', fatal: true })
}

usePageSeo({
  title: product.value ? `${product.value.name} — SmartDesk` : 'SmartDesk',
  description: product.value?.tagline || undefined,
  // Sent to one buyer, not published. Keeping it out of the index also keeps the price out.
  noindex: true,
})

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: product.value?.currency || 'USD', maximumFractionDigits: 0 }).format(n)

const planId = ref<number | null>(product.value?.plans?.[0]?.id ?? null)
const licenseType = ref<'regular' | 'extended'>('regular')

const chosenPrice = computed(() => {
  const p = product.value
  if (!p) return 0
  const plan = p.plans.find((x) => x.id === planId.value)
  if (plan) return plan.price
  return licenseType.value === 'extended' && p.ext_price ? p.ext_price : p.price
})

const form = reactive({ name: '', email: '', phone: '', company: '' })
const gateway = ref<'stripe' | 'paypal'>('stripe')
const busy = ref(false)

const canBuy = computed(() => !!form.name.trim() && !!form.email.trim() && !busy.value)

// The same two shapes the dashboard's "pay this order" flow already handles: an embedded Stripe
// session, or a PayPal URL to send the browser to.
const showFrame = ref(false)
const showStripe = ref(false)
const frameUrl = ref('')
const stripeData = ref<{ client_secret: string; publishable_key: string } | null>(null)
const orderNumber = ref('')

async function buy() {
  if (!canBuy.value) return
  busy.value = true

  try {
    const r = await $api<{
      order_number: string
      checkout_url?: string
      stripe?: { client_secret: string; publishable_key: string }
    }>(`/p/${token.value}/order`, {
      method: 'POST',
      body: {
        ...form,
        plan_id: planId.value,
        license_type: licenseType.value,
        gateway: gateway.value,
      },
    })

    orderNumber.value = r.order_number

    if (r.stripe?.client_secret) {
      stripeData.value = r.stripe
      showStripe.value = true
    } else if (r.checkout_url) {
      frameUrl.value = r.checkout_url
      showFrame.value = true
    } else {
      toast.error('Could not start payment', 'No gateway is configured for this store.')
    }
  } catch (e: any) {
    toast.error('Could not start payment', e?.data?.message || 'Please check your details and try again.')
  } finally {
    busy.value = false
  }
}

function onPaid() {
  navigateTo(`/payment/success?order=${orderNumber.value}`)
}

const field =
  'h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-ink-900 transition placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-white/10'
</script>

<template>
  <div v-if="product" class="bg-white dark:bg-transparent">
    <div class="container-page py-14 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <!-- ───────── What it is ───────── -->
        <div>
          <img v-if="product.image" :src="product.image" :alt="product.name"
               class="mb-8 w-full rounded-2xl border border-gray-100 object-cover dark:border-white/10"
               @error="($event.target as HTMLImageElement).style.display = 'none'">

          <h1 class="font-display text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            {{ product.name }}
          </h1>
          <p v-if="product.tagline" class="mt-3 text-lg leading-relaxed text-gray-600 dark:text-slate-400">
            {{ product.tagline }}
          </p>

          <!-- Plans, when the product has them; otherwise the licence choice. -->
          <div v-if="product.plans.length" class="mt-9">
            <p class="text-sm font-bold text-ink-900 dark:text-white">Choose a plan</p>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <label v-for="p in product.plans" :key="p.id"
                     class="cursor-pointer rounded-2xl border p-5 transition"
                     :class="planId === p.id
                       ? 'border-brand-600 bg-brand-50 dark:bg-brand-500/10'
                       : 'border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5'">
                <input v-model="planId" type="radio" :value="p.id" class="sr-only">
                <span class="flex items-baseline justify-between gap-3">
                  <span class="font-display text-base font-extrabold text-ink-900 dark:text-white">{{ p.name }}</span>
                  <span class="font-bold text-brand-600 dark:text-brand-400">{{ money(p.price) }}</span>
                </span>
                <span v-if="p.blurb" class="mt-1.5 block text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ p.blurb }}</span>
              </label>
            </div>
          </div>

          <div v-else-if="product.ext_price" class="mt-9">
            <p class="text-sm font-bold text-ink-900 dark:text-white">Licence</p>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <label v-for="l in [
                { key: 'regular', label: 'Regular', price: product.price, note: 'For one project whose end users are not charged.' },
                { key: 'extended', label: 'Extended', price: product.ext_price, note: 'For a product your end users pay to access.' },
              ]" :key="l.key"
                     class="cursor-pointer rounded-2xl border p-5 transition"
                     :class="licenseType === l.key
                       ? 'border-brand-600 bg-brand-50 dark:bg-brand-500/10'
                       : 'border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5'">
                <input v-model="licenseType" type="radio" :value="l.key" class="sr-only">
                <span class="flex items-baseline justify-between gap-3">
                  <span class="font-display text-base font-extrabold text-ink-900 dark:text-white">{{ l.label }}</span>
                  <span class="font-bold text-brand-600 dark:text-brand-400">{{ money(l.price!) }}</span>
                </span>
                <span class="mt-1.5 block text-sm leading-relaxed text-gray-600 dark:text-slate-400">{{ l.note }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- ───────── Buy it ───────── -->
        <div>
          <div class="rounded-2xl border border-gray-100 p-7 shadow-sm dark:border-white/10">
            <div class="flex items-baseline justify-between border-b border-gray-100 pb-5 dark:border-white/10">
              <span class="text-sm font-semibold text-gray-500 dark:text-slate-400">Total</span>
              <span class="font-display text-3xl font-extrabold text-ink-900 dark:text-white">{{ money(chosenPrice) }}</span>
            </div>

            <form class="mt-6" @submit.prevent="buy">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="b-name" class="mb-1.5 block text-sm font-medium text-ink-800 dark:text-slate-300">Name <span class="text-red-500">*</span></label>
                  <input id="b-name" v-model="form.name" type="text" required autocomplete="name" :class="field">
                </div>
                <div>
                  <label for="b-email" class="mb-1.5 block text-sm font-medium text-ink-800 dark:text-slate-300">Email <span class="text-red-500">*</span></label>
                  <input id="b-email" v-model="form.email" type="email" required autocomplete="email" :class="field">
                </div>
                <div>
                  <label for="b-company" class="mb-1.5 block text-sm font-medium text-ink-800 dark:text-slate-300">Company</label>
                  <input id="b-company" v-model="form.company" type="text" autocomplete="organization" :class="field">
                </div>
                <div>
                  <label for="b-phone" class="mb-1.5 block text-sm font-medium text-ink-800 dark:text-slate-300">Phone</label>
                  <input id="b-phone" v-model="form.phone" type="tel" autocomplete="tel" :class="field">
                </div>
              </div>

              <p class="mb-2 mt-6 text-sm font-semibold text-ink-900 dark:text-white">Pay with</p>
              <div class="grid grid-cols-2 gap-3">
                <label v-for="g in [{ key: 'stripe', label: 'Card' }, { key: 'paypal', label: 'PayPal' }]" :key="g.key"
                       class="cursor-pointer rounded-xl border py-3 text-center text-sm font-bold transition"
                       :class="gateway === g.key
                         ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                         : 'border-gray-200 text-ink-900 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5'">
                  <input v-model="gateway" type="radio" :value="g.key" class="sr-only">
                  {{ g.label }}
                </label>
              </div>

              <button type="submit" :disabled="!canBuy"
                      class="mt-6 w-full rounded-xl bg-brand-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-50">
                {{ busy ? 'Starting payment…' : `Pay ${money(chosenPrice)}` }}
              </button>

              <p class="mt-3 text-center text-xs text-gray-400 dark:text-slate-500">
                An account is created for you automatically. You will be able to download and re-download from your dashboard.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <PaymentFrame v-if="showFrame" :url="frameUrl" :order="orderNumber" @success="onPaid" @cancel="showFrame = false" />
    <StripeCheckout v-if="showStripe && stripeData" :client-secret="stripeData.client_secret"
                    :publishable-key="stripeData.publishable_key" :order="orderNumber"
                    @success="onPaid" @cancel="showStripe = false" />
  </div>
</template>
