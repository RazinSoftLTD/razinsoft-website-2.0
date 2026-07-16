<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const token = route.params.token as string
const { $api } = useNuxtApp()

const { data: inv, error } = await useAsyncData(`invoice-${token}`, () => $api<any>(`/invoice/pay/${token}`))

const paid = computed(() => route.query.paid === '1' || inv.value?.status === 'paid')

const money = (n: number) => (inv.value?.currency_symbol || '') + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—')
const badge: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600', sent: 'bg-blue-50 text-blue-700',
  partially_paid: 'bg-amber-50 text-amber-700', paid: 'bg-emerald-50 text-emerald-700', overdue: 'bg-red-50 text-red-600',
}

useHead({ title: () => (inv.value ? `Pay ${inv.value.invoice_number} — RazinSoft` : 'Invoice — RazinSoft') })
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-2xl px-4">
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
        <!-- <div v-else-if="paid" class="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
          Payment received. Remaining due: <strong>{{ money(inv.amount_due) }}</strong>.
        </div> -->

        <!-- Full invoice document -->
        <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 p-6 sm:p-8">
            <div>
              <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" class="h-9 w-auto">
              <p class="mt-2 text-xs text-gray-500">RazinSoft Ltd. · support@razinsoft.com</p>
            </div>
            <div class="text-right">
              <span class="inline-flex rounded-md bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">Invoice</span>
              <p class="mt-2 text-lg font-bold text-ink-900">{{ inv.invoice_number }}</p>
            </div>
          </div>

          <div class="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Bill To</p>
              <p class="mt-1.5 font-semibold text-ink-900">{{ inv.bill_to.name || '—' }}</p>
              <p v-if="inv.bill_to.company" class="text-sm text-gray-500">{{ inv.bill_to.company }}</p>
              <p v-if="inv.bill_to.address" class="text-sm leading-relaxed text-gray-500">{{ inv.bill_to.address }}</p>
              <p v-if="inv.bill_to.email" class="text-sm text-gray-500">{{ inv.bill_to.email }}</p>
            </div>
            <div class="sm:text-right">
              <div class="inline-grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:text-left">
                <span class="text-gray-400">Issue Date</span><span class="font-medium text-ink-900">{{ fmtDate(inv.invoice_date) }}</span>
                <span class="text-gray-400">Due Date</span><span class="font-medium text-ink-900">{{ fmtDate(inv.due_date) }}</span>
                <span class="text-gray-400">Status</span><span><span class="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold" :class="badge[inv.status]">{{ inv.status_label }}</span></span>
              </div>
            </div>
          </div>

          <div class="px-6 sm:px-8">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-400">
                  <th class="rounded-l-lg px-3 py-2.5 text-left font-semibold">Item</th><th class="px-3 py-2.5 text-right font-semibold">Qty</th><th class="px-3 py-2.5 text-right font-semibold">Rate</th><th class="px-3 py-2.5 text-right font-semibold">Tax</th><th class="rounded-r-lg px-3 py-2.5 text-right font-semibold">Amount</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(item, i) in inv.items" :key="i">
                    <td class="px-3 py-3"><p class="font-medium text-ink-900">{{ item.description }}</p><p v-if="item.sub_description" class="mt-0.5 text-xs text-gray-500">{{ item.sub_description }}</p></td>
                    <td class="px-3 py-3 text-right text-gray-500">{{ item.qty }}</td>
                    <td class="px-3 py-3 text-right text-gray-500">{{ money(item.unit_price) }}</td>
                    <td class="px-3 py-3 text-right text-gray-500">{{ item.tax_percent }}%</td>
                    <td class="px-3 py-3 text-right font-medium text-ink-900">{{ money(item.amount) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex justify-end px-6 pt-5 sm:px-8">
            <div class="w-full max-w-xs space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">Subtotal</span><span class="text-ink-900">{{ money(inv.subtotal) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Discount</span><span class="text-ink-900">−{{ money(inv.discount_total) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Tax</span><span class="text-ink-900">{{ money(inv.tax_total) }}</span></div>
              <div class="flex justify-between border-t border-gray-100 pt-2 font-semibold text-ink-900"><span>Total</span><span>{{ money(inv.total) }}</span></div>
              <div v-if="inv.amount_paid > 0" class="flex justify-between text-emerald-600"><span>Paid</span><span>−{{ money(inv.amount_paid) }}</span></div>
              <div class="mt-1 flex justify-between rounded-lg bg-brand-50 px-4 py-3 text-base font-bold text-brand-700"><span>Pay Now</span><span>{{ money(inv.amount_due) }}</span></div>
            </div>
          </div>

          <!-- Payments -->
          <div v-if="inv.payments.length" class="mt-4 border-t border-gray-100 px-6 py-5 sm:px-8">
            <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Payment history</p>
            <div class="mt-2 space-y-1.5 text-sm">
              <div v-for="(p, i) in inv.payments" :key="i" class="flex justify-between">
                <span class="text-gray-500">{{ fmtDate(p.paid_at) }} · {{ p.method || '—' }}</span>
                <span class="font-medium text-ink-900">{{ money(p.amount) }}</span>
              </div>
            </div>
          </div>

          <div v-if="inv.notes || inv.terms" class="grid gap-6 border-t border-gray-100 px-6 py-5 text-xs leading-relaxed text-gray-500 sm:grid-cols-2 sm:px-8">
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

        <!-- Pay action -->
        <div v-if="inv.amount_due > 0" class="mt-5 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <p class="text-sm text-gray-500">{{ inv.partial_requested ? 'Partial payment requested' : 'Amount to pay now' }}</p>
          <p class="mt-1 text-3xl font-extrabold text-ink-900">{{ money(inv.payable_amount) }} {{ inv.currency }}</p>
          <p v-if="inv.partial_requested" class="mt-1 text-xs text-gray-400">Remaining due after this payment: {{ money(inv.amount_due - inv.payable_amount) }} {{ inv.currency }}</p>

          <a v-if="!inv.pay_methods || inv.pay_methods.includes('stripe')" :href="inv.checkout_url" class="mt-4 inline-block w-full rounded-xl bg-brand-600 py-3.5 text-center font-bold text-white transition hover:bg-brand-700">
            Pay {{ money(inv.payable_amount) }} with Card
          </a>
          <a v-if="inv.pay_methods && inv.pay_methods.includes('paypal')" :href="inv.paypal_url" class="mt-3 inline-block w-full rounded-xl bg-[#ffc439] py-3.5 text-center font-bold text-[#003087] transition hover:bg-[#f2ba36]">
            Pay {{ money(inv.payable_amount) }} with PayPal
          </a>
          <p class="mt-3 text-xs text-gray-400">Secured payment · powered by {{ (inv.pay_methods || ['stripe']).map(m => m === 'stripe' ? 'Stripe' : 'PayPal').join(' & ') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
