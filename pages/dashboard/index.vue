<script setup lang="ts">
usePageSeo({ title: 'Dashboard', description: 'Your RazinSoft account overview.' })

const { $api } = useNuxtApp()
const { count: cartCount } = useCart()

const { data: dash } = await useAsyncData('account-dashboard', () => $api<any>('/account/dashboard'))
const d = computed<any>(() => dash.value || {})

const fmtMoney = (n: number) => '$' + Number(n || 0).toLocaleString()
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')

const stats = computed(() => {
  const s = d.value.stats || {}
  return [
    { label: 'Total order placed', value: String(s.total_orders ?? 0), tone: 'bg-brand-600', paths: ['M2.25 3h1.5l1.5 13.5h12l1.5-9H6', 'M9 20a1 1 0 1 0 .01 0M17 20a1 1 0 1 0 .01 0'] },
    { label: 'Running orders', value: String(Math.max(0, (s.total_orders ?? 0) - (s.completed_orders ?? 0))), tone: 'bg-orange-500', paths: ['M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7'] },
    { label: 'Items in cart', value: String(cartCount.value), tone: 'bg-emerald-500', paths: ['M2.25 3h1.5l1.5 13.5h12l1.5-9H6', 'M9 20a1 1 0 1 0 .01 0M17 20a1 1 0 1 0 .01 0'] },
    { label: 'Products owned', value: String(s.products_owned ?? 0), tone: 'bg-orange-500', paths: ['M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z'] },
    { label: 'Amount spent', value: fmtMoney(s.total_spent), tone: 'bg-brand-600', paths: ['M12 3v18M16 7H10a2.5 2.5 0 0 0 0 5h4a2.5 2.5 0 0 1 0 5H8'] },
    { label: 'Active licenses', value: String(s.active_licenses ?? 0), tone: 'bg-purple-500', paths: ['M15 7a4 4 0 1 0-4 4 4 4 0 0 0 4-4Z', 'm11 11-6 6v3h3l6-6'] },
  ]
})

const PAID = ['paid', 'processing', 'completed']
const orders = computed(() => (d.value.recent_orders || []).map((o: any) => ({
  id: o.order_number,
  product: (o.products || []).join(', ') || `${o.item_count} item(s)`,
  date: fmtDate(o.paid_at || o.created_at),
  amount: fmtMoney(o.total),
  status: PAID.includes(o.status) ? 'Paid' : 'Unpaid',
})))

const actions = [
  { label: 'Browse Products', to: '/products', tone: 'bg-blue-50 text-blue-600', paths: ['M2.25 3h1.5l1.5 13.5h12l1.5-9H6', 'M9 20a1 1 0 1 0 .01 0M17 20a1 1 0 1 0 .01 0'] },
  { label: 'My Orders', to: '/dashboard/orders', tone: 'bg-emerald-50 text-emerald-600', paths: ['M3 7h18l-1.4 12a2 2 0 0 1-2 1.8H6.4a2 2 0 0 1-2-1.8L3 7Z', 'M8 7a4 4 0 1 1 8 0'] },
  { label: 'Get Support', to: 'mailto:info@razinsoft.com', tone: 'bg-purple-50 text-purple-600', paths: ['M7 7h.01M3 5a2 2 0 0 1 2-2h6l9 9-8 8-9-9V5Z'] },
]
</script>

<template>
  <div>
    <h1 class="font-display text-3xl font-extrabold text-ink-900">Dashboard</h1>
    <p class="mt-1 text-gray-500">Welcome back! Here's an overview of your account</p>

    <!-- Stat cards -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="s in stats" :key="s.label" class="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div>
          <p class="font-display text-3xl font-extrabold text-ink-900">{{ s.value }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ s.label }}</p>
        </div>
        <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full text-white" :class="s.tone" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path v-for="d in s.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
        </span>
      </article>
    </div>

    <!-- Recent Orders -->
    <section class="mt-8">
      <div class="flex items-center justify-between">
        <h2 class="font-display text-xl font-bold text-ink-900">Recent Orders</h2>
        <NuxtLink to="/dashboard/orders" class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">View All
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>

      <p v-if="!orders.length" class="mt-4 rounded-2xl border border-dashed border-gray-200 py-12 text-center text-gray-500">
        No orders yet. <NuxtLink to="/products" class="font-semibold text-brand-600 hover:text-brand-700">Browse products</NuxtLink> to get started.
      </p>

      <ul v-else class="mt-4 space-y-4">
        <li v-for="o in orders" :key="o.id">
          <NuxtLink :to="`/dashboard/orders/${o.id}`" class="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-md">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v8" /></svg>
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-display font-bold text-ink-900">{{ o.product }}</p>
              <p class="mt-0.5 text-sm text-gray-400">#{{ o.id }} · {{ o.date }}</p>
            </div>
            <div class="text-right">
              <p class="font-display font-extrabold text-ink-900">{{ o.amount }}</p>
              <span
                class="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="o.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'"
              >
                <svg v-if="o.status === 'Paid'" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
                <svg v-else class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" /></svg>
                {{ o.status }}
              </span>
            </div>
            <svg class="h-5 w-5 shrink-0 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- Quick actions -->
    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <NuxtLink v-for="a in actions" :key="a.label" :to="a.to" class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md">
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl" :class="a.tone" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in a.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
        </span>
        <span class="font-display font-bold text-ink-900">{{ a.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
