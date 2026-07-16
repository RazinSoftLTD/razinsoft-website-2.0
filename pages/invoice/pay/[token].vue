<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const token = route.params.token as string
const { $api } = useNuxtApp()

const { data: inv, error } = await useAsyncData(`invoice-${token}`, () => $api<any>(`/invoice/pay/${token}`))

const paid = computed(() => route.query.paid === '1' || inv.value?.status === 'paid')

const money = (n: number) => (inv.value?.currency_symbol || '') + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+ \w+) (\d{4})/, '$1, $2') : '—')

// Status pill — mirrors the PDF badge: green Paid / Partially Paid, red Unpaid.
const statusPill = computed(() => {
  if (!inv.value) return { label: '', cls: '' }
  if (inv.value.amount_due <= 0) return { label: 'Paid', cls: 'border-emerald-600 text-emerald-600' }
  if (inv.value.amount_paid > 0) return { label: 'Partially Paid', cls: 'border-emerald-600 text-emerald-600' }
  return { label: 'Unpaid', cls: 'border-red-600 text-red-600' }
})

// Sub-description HTML → the PDF's round-bullet format (only inline formatting kept).
const fmtSub = (html?: string) => {
  if (!html) return ''
  let s = html
    .replace(/<li[^>]*>/gi, '◉ ')
    .replace(/<\/(p|li|ul|ol|div|h[1-6])>/gi, '<br>')
    .replace(/<(p|ul|ol|div|h[1-6])[^>]*>/gi, '')
  s = s.replace(/<(?!\/?(b|strong|i|em|u|br)\b)[^>]*>/gi, '')
  return s.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>').replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/gi, '').trim()
}

const methods = computed(() => (inv.value?.pay_methods?.length ? inv.value.pay_methods : ['stripe']))
const discountLabel = computed(() =>
  inv.value?.discount_type === 'percent' && inv.value?.discount_value > 0
    ? `Discount: ${+inv.value.discount_value}%`
    : 'Discount')

useHead({ title: () => (inv.value ? `Pay ${inv.value.invoice_number} — RazinSoft` : 'Invoice — RazinSoft') })
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-3xl px-4">
      <div v-if="error" class="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p class="text-lg font-bold text-ink-900">Invoice not found</p>
        <p class="mt-1 text-sm text-gray-500">This payment link is invalid or has expired.</p>
      </div>

      <template v-else-if="inv">
        <!-- Paid / success banner -->
        <div v-if="paid && inv.amount_due <= 0" class="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="m5 13 4 4L19 7" /></svg>
          </span>
          <div><p class="font-semibold text-emerald-800">Payment received</p><p class="text-sm text-emerald-700">Thank you! This invoice is fully paid.</p></div>
        </div>

        <!-- Pay action — front and centre, at the very top -->
        <div v-if="inv.amount_due > 0" class="mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">{{ inv.partial_requested ? 'Partial payment requested' : 'Amount to pay now' }}</p>
              <p class="mt-1 text-3xl font-extrabold tracking-tight text-ink-900">{{ money(inv.payable_amount) }} <span class="text-base font-bold text-gray-400">{{ inv.currency }}</span></p>
              <p v-if="inv.partial_requested && inv.partial_note" class="mt-0.5 text-sm font-medium text-gray-600">{{ inv.partial_note }}</p>
              <p v-if="inv.partial_requested" class="mt-0.5 text-xs text-gray-400">Remaining after this payment: {{ money(inv.amount_due - inv.payable_amount) }}</p>
            </div>
            <div class="flex w-full gap-3 sm:w-auto">
              <a v-if="methods.includes('stripe')" :href="inv.checkout_url"
                 class="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-6 font-bold text-white shadow-sm transition hover:bg-brand-700 sm:flex-none">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 14.5h4"/></svg>
                Pay with Card
              </a>
              <!-- Official PayPal button: yellow pill + the PayPal wordmark, exactly like PayPal's own standalone checkout button -->
              <a v-if="methods.includes('paypal')" :href="inv.paypal_url" aria-label="Pay with PayPal"
                 class="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-8 shadow-sm transition hover:bg-gray-50 sm:flex-none">
                <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" class="h-6 w-auto">
              </a>
            </div>
          </div>
          <p class="mt-4 border-t border-gray-100 pt-3 text-center text-xs text-gray-400">
            <svg class="mr-1 inline h-3.5 w-3.5 -translate-y-px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
            Secured payment · powered by {{ methods.map((m: string) => m === 'stripe' ? 'Stripe' : 'PayPal').join(' & ') }}
          </p>
        </div>

        <!-- Invoice document — mirrors the PDF layout -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <!-- Big title + logo/meta row -->
          <p class="text-right text-3xl font-extrabold text-gray-700">Invoice</p>
          <div class="mt-2 flex flex-wrap items-start justify-between gap-5">
            <img src="/images/razinsoft-icon.png" alt="RazinSoft" class="h-16 w-16 rounded-lg">
            <table class="text-sm">
              <tbody>
                <tr>
                  <td class="border border-gray-300 bg-gray-100 px-4 py-2 font-bold text-gray-700">Invoice Number</td>
                  <td class="border border-gray-300 px-4 py-2 font-bold text-ink-900">{{ inv.invoice_number }}</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 bg-gray-100 px-4 py-2 font-bold text-gray-700">Invoice Date</td>
                  <td class="border border-gray-300 px-4 py-2 font-bold text-ink-900">{{ fmtDate(inv.invoice_date) }}</td>
                </tr>
                <tr v-if="inv.due_date">
                  <td class="border border-gray-300 bg-gray-100 px-4 py-2 font-bold text-gray-700">Due Date</td>
                  <td class="border border-gray-300 px-4 py-2 font-bold text-ink-900">{{ fmtDate(inv.due_date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Billed From / Billed To -->
          <div class="mt-6 flex flex-wrap justify-between gap-6 text-sm">
            <div>
              <p class="text-gray-400">Billed From</p>
              <p class="mt-0.5 font-bold text-ink-900">RazinSoft</p>
              <p class="text-gray-600">info@razinsoft.com</p>
              <p class="text-gray-600">+8801711257498</p>
              <p class="text-gray-600">RMR Center 1/1 (A&amp;B) Shyamoli Ring Road, Dhaka - 1207.</p>
              <p class="text-gray-600">Bangladesh</p>
            </div>
            <div class="sm:text-right">
              <p class="text-gray-400">Billed To</p>
              <p class="mt-0.5 font-bold text-ink-900">{{ inv.bill_to.name || '—' }}</p>
              <p v-if="inv.bill_to.company" class="text-gray-600">{{ inv.bill_to.company }}</p>
              <p v-if="inv.bill_to.email" class="text-gray-600">{{ inv.bill_to.email }}</p>
              <p v-if="inv.bill_to.phone" class="text-gray-600">{{ inv.bill_to.phone }}</p>
              <p v-if="inv.bill_to.address" class="text-gray-600">{{ inv.bill_to.address }}</p>
              <span class="mt-3 inline-block rounded-md border px-5 py-2 text-base font-bold" :class="statusPill.cls">{{ statusPill.label }}</span>
            </div>
          </div>

          <!-- Items table -->
          <div class="mt-6 overflow-x-auto">
            <table class="w-full border border-gray-200 text-sm">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700">
                  <th class="px-4 py-2.5 text-left">Description</th>
                  <th class="border-l border-gray-200 px-4 py-2.5 text-center">Quantity</th>
                  <th class="border-l border-gray-200 px-4 py-2.5 text-right">Unit Price</th>
                  <th class="border-l border-gray-200 px-4 py-2.5 text-right">Tax</th>
                  <th class="border-l border-gray-200 bg-gray-50 px-4 py-2.5 text-right">Amount ({{ inv.currency }})</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item, i) in inv.items" :key="i">
                  <td class="px-4 py-3 font-semibold text-ink-900">{{ item.description }}</td>
                  <td class="border-l border-gray-200 px-4 py-3 text-center text-gray-600">{{ item.qty }}<span class="block text-[11px] text-gray-400">Items</span></td>
                  <td class="border-l border-gray-200 px-4 py-3 text-right text-gray-600">{{ Number(item.unit_price).toFixed(2) }}</td>
                  <td class="border-l border-gray-200 px-4 py-3 text-right text-gray-600"><template v-if="item.tax_percent > 0">{{ item.tax_percent }}%</template></td>
                  <td class="border-l border-gray-200 bg-gray-50 px-4 py-3 text-right font-bold text-ink-900">{{ Number(item.amount).toFixed(2) }}</td>
                </tr>
                <template v-for="(item, i) in inv.items" :key="'sub' + i">
                  <tr v-if="item.sub_description">
                    <td colspan="5" class="px-4 py-3 text-xs leading-relaxed text-ink-900" v-html="fmtSub(item.sub_description)" />
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div class="mt-5 flex justify-end">
            <div class="w-full max-w-xs space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">Sub Total</span><span class="text-ink-900">{{ money(inv.subtotal) }}</span></div>
              <div v-if="inv.discount_total > 0" class="flex justify-between"><span class="text-gray-500">{{ discountLabel }}</span><span class="text-ink-900">−{{ money(inv.discount_total) }}</span></div>
              <div v-if="inv.tax_total > 0" class="flex justify-between"><span class="text-gray-500">Tax</span><span class="text-ink-900">{{ money(inv.tax_total) }}</span></div>
              <div class="flex justify-between border-t border-gray-800 pt-2 font-bold text-ink-900"><span>Total</span><span>{{ money(inv.total) }}</span></div>
              <div v-if="inv.amount_paid > 0" class="flex justify-between font-semibold text-emerald-600"><span>Paid</span><span>−{{ money(inv.amount_paid) }}</span></div>
              <div class="mt-1 flex justify-between rounded-md bg-gray-100 px-4 py-3 text-base font-bold text-ink-900"><span>Total Due</span><span>{{ money(inv.amount_due) }} {{ inv.currency }}</span></div>
            </div>
          </div>

          <!-- Notes / Terms -->
          <div v-if="inv.notes || inv.terms" class="mt-6 grid gap-6 border-t border-gray-100 pt-5 text-xs leading-relaxed text-gray-600 sm:grid-cols-2">
            <div>
              <p class="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Notes</p>
              <p>{{ inv.notes || '—' }}</p>
            </div>
            <div>
              <p class="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Terms</p>
              <p>{{ inv.terms || '—' }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
