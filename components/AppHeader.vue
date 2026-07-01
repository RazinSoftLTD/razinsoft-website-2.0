<script setup lang="ts">
const nav = [
  { label: 'Products', to: '/products', caret: true },
  { label: 'Services', to: '/#services', caret: true },
  { label: 'Free Products', to: '/products', caret: true },
  { label: 'Company', to: '/#company', caret: false },
  { label: 'Resources', to: '/#blog', caret: false },
]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const { count } = useCart()
const { user, isLoggedIn, fetchMe } = useAuth()
const loggedIn = isLoggedIn
onMounted(() => {
  if (isLoggedIn.value && !user.value) fetchMe()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2" aria-label="RazinSoft home">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white" aria-hidden="true">R</span>
        <span class="font-display text-xl font-extrabold tracking-tight text-ink-900">RazinSoft</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <NuxtLink
          v-for="item in nav"
          :key="item.label"
          :to="item.to"
          class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50 hover:text-ink-900"
        >
          {{ item.label }}
          <svg v-if="item.caret" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Cart — always available -->
        <NuxtLink to="/cart" class="relative rounded-lg p-2 text-ink-700 hover:bg-gray-50" :aria-label="`View cart, ${count} items`">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.5 13.5h12l1.5-9H6" /><circle cx="9" cy="20" r="1.25" /><circle cx="17" cy="20" r="1.25" />
          </svg>
          <!-- count depends on client-only localStorage → render client-side to avoid hydration mismatch -->
          <ClientOnly>
            <span v-if="count" class="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{{ count }}</span>
          </ClientOnly>
        </NuxtLink>

        <!-- Account: avatar → dashboard when signed in, else sign in. Auth state is client-only
             (cookie), so render in ClientOnly with the sign-in icon as the SSR fallback. -->
        <ClientOnly>
          <NuxtLink v-if="loggedIn" to="/dashboard" class="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700" aria-label="Go to your dashboard">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <NuxtLink v-else to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
          </NuxtLink>
          <template #fallback>
            <NuxtLink to="/login" class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label="Sign in">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
            </NuxtLink>
          </template>
        </ClientOnly>
        <button type="button" class="rounded-lg p-2 text-ink-700 hover:bg-gray-50 lg:hidden" :aria-expanded="open" aria-controls="mobile-menu" aria-label="Toggle menu" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <nav v-show="open" id="mobile-menu" class="border-t border-gray-100 bg-white lg:hidden" aria-label="Mobile">
      <ul class="container-page space-y-1 py-3">
        <li v-for="item in nav" :key="item.label">
          <NuxtLink :to="item.to" class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
