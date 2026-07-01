<script setup lang="ts">
usePageSeo({ title: 'My Orders', description: 'Your RazinSoft orders.' })

const { $api } = useNuxtApp()
const { data: res } = await useAsyncData('account-orders', () => $api<any>('/account/orders'))
const orders = computed<any[]>(() => res.value?.data || [])

const fmtMoney = (n: number) => '$' + Number(n || 0).toLocaleString()
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')
const PAID = ['paid', 'processing', 'completed']
const isPaid = (s: string) => PAID.includes(s)
const label = (s: string) => (isPaid(s) ? 'Paid' : 'Unpaid')
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-extrabold text-ink-900">My Orders</h1>
    <p class="mt-1 text-gray-500">All your purchases, invoices and downloads</p>

    <p v-if="!orders.length" class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
      No orders yet. <NuxtLink to="/products" class="font-semibold text-brand-600 hover:text-brand-700">Browse products</NuxtLink> to get started.
    </p>

    <ul v-else class="mt-6 space-y-4">
      <li v-for="o in orders" :key="o.order_number">
        <NuxtLink :to="`/dashboard/orders/${o.order_number}`" class="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-md">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v8" /></svg>
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-display font-bold text-ink-900">{{ (o.products || []).join(', ') || `${o.item_count} item(s)` }}</p>
            <p class="mt-0.5 text-sm text-gray-400">#{{ o.order_number }} · {{ fmtDate(o.paid_at || o.created_at) }}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5">
            <p class="font-display font-extrabold text-ink-900">{{ fmtMoney(o.total) }}</p>
            <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold" :class="isPaid(o.status) ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">{{ label(o.status) }}</span>
          </div>
          <svg class="h-5 w-5 shrink-0 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
