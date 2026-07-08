<script setup lang="ts">
// Persistent dashboard shell: sidebar + user card stay mounted; only <NuxtPage/> swaps.
// Auth middleware here covers every /dashboard/* child route.
definePageMeta({ middleware: 'auth' })
useSeoMeta({ robots: 'noindex, nofollow' })

const { user, fetchMe, logout } = useAuth()
const route = useRoute()

onMounted(() => {
  if (!user.value) fetchMe()
})

const nav = [
  { label: 'Dashboard', to: '/dashboard', match: (p: string) => p === '/dashboard', paths: ['M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'] },
  { label: 'My Orders', to: '/dashboard/orders', match: (p: string) => p.startsWith('/dashboard/orders'), paths: ['M3 7h18l-1.4 12a2 2 0 0 1-2 1.8H6.4a2 2 0 0 1-2-1.8L3 7Z', 'M8 7a4 4 0 1 1 8 0'] },
  { label: 'My Invoices', to: '/dashboard/invoices', match: (p: string) => p.startsWith('/dashboard/invoices'), paths: ['M7 3h7l5 5v13H7zM14 3v5h5', 'M9 13h6M9 17h4'] },
  { label: 'Profile', to: '/dashboard/profile', match: (p: string) => p.startsWith('/dashboard/profile'), paths: ['M12 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M4.5 20a7.5 7.5 0 0 1 15 0'] },
  { label: 'Support', to: 'mailto:info@razinsoft.com', match: () => false, paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
]
</script>

<template>
  <div class="container-page py-8">
    <div class="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <!-- Sidebar (persistent) -->
      <aside class="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:sticky lg:top-20 lg:self-start">
        <div class="rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 p-4 text-white">
          <p class="font-display text-lg font-bold">{{ user?.name || 'My Account' }}</p>
          <p class="truncate text-sm text-white/80">{{ user?.email }}</p>
        </div>

        <nav class="mt-4 space-y-1" aria-label="Account">
          <NuxtLink
            v-for="item in nav"
            :key="item.label"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
            :class="item.match(route.path) ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30' : 'text-ink-700 hover:bg-gray-50'"
          >
            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in item.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="mt-4 border-t border-gray-100 pt-3">
          <button type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50" @click="logout">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3m0 0 4-4m-4 4 4 4M13 16v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      <!-- Content area — only this swaps between dashboard pages -->
      <div class="min-w-0">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
