<script setup lang="ts">
usePageSeo({ title: 'My Invoices', description: 'Your RazinSoft invoices and payments.' })

const { $api } = useNuxtApp()
const { data: res } = await useAsyncData('account-invoices', () => $api<any>('/account/invoices'))
const invoices = computed<any[]>(() => res.value?.data || [])

const sym: Record<string, string> = { USD: '$', BDT: '৳', EUR: '€', GBP: '£' }
const money = (n: number, c = 'USD') => (sym[c] || '') + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—')
const badge: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600', sent: 'bg-blue-50 text-blue-700',
  partially_paid: 'bg-amber-50 text-amber-700', paid: 'bg-emerald-50 text-emerald-700', overdue: 'bg-red-50 text-red-600',
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-extrabold text-ink-900">My Invoices</h1>
    <p class="mt-1 text-gray-500">View your invoices and pay any outstanding balance online.</p>

    <p v-if="!invoices.length" class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
      You have no invoices yet.
    </p>

    <ul v-else class="mt-6 space-y-4">
      <li v-for="inv in invoices" :key="inv.invoice_number">
        <div class="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v13H7zM14 3v5h5M9 13h6M9 17h4" /></svg>
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-display font-bold text-ink-900">{{ inv.invoice_number }}</p>
            <p class="mt-0.5 text-sm text-gray-400">{{ fmtDate(inv.invoice_date) }} · {{ inv.items_count }} item(s) · Due {{ fmtDate(inv.due_date) }}</p>
          </div>
          <div class="text-right">
            <p class="font-display font-extrabold text-ink-900">{{ money(inv.total, inv.currency) }}</p>
            <p v-if="inv.amount_due > 0" class="text-xs font-semibold text-red-600">Due {{ money(inv.amount_due, inv.currency) }}</p>
          </div>
          <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="badge[inv.status] || 'bg-gray-100 text-gray-600'">{{ inv.status_label }}</span>
          <a
            v-if="inv.amount_due > 0"
            :href="inv.pay_url" target="_blank" rel="noopener"
            class="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >Pay Now</a>
          <a
            v-else
            :href="inv.pay_url" target="_blank" rel="noopener"
            class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50"
          >View</a>
        </div>
      </li>
    </ul>
  </div>
</template>
