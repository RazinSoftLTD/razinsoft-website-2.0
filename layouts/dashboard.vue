<script setup lang="ts">
const user = useDemoUser()
const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const nav = [
  { label: 'Dashboard', to: '/dashboard', paths: ['M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'] },
  { label: 'My Orders', to: '/dashboard#orders', paths: ['M3 7h18l-1.4 12a2 2 0 0 1-2 1.8H6.4a2 2 0 0 1-2-1.8L3 7Z', 'M8 7a4 4 0 1 1 8 0'] },
  { label: 'Purchase History', to: '/dashboard#orders', paths: ['M12 7v5l3 2', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'] },
  { label: 'Promo Code', to: '/cart', paths: ['M7 7h.01M3 5a2 2 0 0 1 2-2h6l9 9-8 8-9-9V5Z'] },
  { label: 'Support / Tickets', to: 'mailto:info@razinsoft.com', paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
  { label: 'Profile', to: '/dashboard#profile', paths: ['M12 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M4.5 20a7.5 7.5 0 0 1 15 0'] },
]
const isActive = (to: string) => to === '/dashboard' && route.path === '/dashboard' && !route.hash
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform lg:translate-x-0"
      :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
      <NuxtLink to="/" class="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white" aria-hidden="true">R</span>
        <span class="font-display text-xl font-extrabold text-ink-900">RazinSoft</span>
      </NuxtLink>

      <nav class="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Dashboard">
        <NuxtLink
          v-for="item in nav"
          :key="item.label"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
          :class="isActive(item.to) ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-gray-50'"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in item.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="border-t border-gray-100 p-4">
        <NuxtLink to="/" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3m0 0 4-4m-4 4 4 4M13 16v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1" /></svg>
          Log out
        </NuxtLink>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-show="open" class="fixed inset-0 z-30 bg-ink-900/40 lg:hidden" aria-hidden="true" @click="open = false" />

    <!-- Main -->
    <div class="lg:pl-64">
      <header class="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur sm:px-6">
        <div class="flex items-center gap-3">
          <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50 lg:hidden" aria-label="Toggle menu" @click="open = !open">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <h1 class="font-display text-lg font-bold text-ink-900">Dashboard</h1>
        </div>
        <div class="flex items-center gap-2 sm:gap-4">
          <button type="button" class="relative rounded-lg p-2 text-ink-700 hover:bg-gray-50" aria-label="Notifications">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9M9.5 21a2.5 2.5 0 0 0 5 0" /></svg>
            <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-600" />
          </button>
          <div class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white" aria-hidden="true">{{ user.initials }}</span>
            <div class="hidden text-left sm:block">
              <p class="text-sm font-semibold leading-tight text-ink-900">{{ user.name }}</p>
              <p class="text-xs leading-tight text-gray-500">{{ user.plan }}</p>
            </div>
          </div>
        </div>
      </header>

      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
