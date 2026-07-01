<script setup lang="ts">
definePageMeta({ layout: 'auth' })
usePageSeo({ title: 'Sign In', description: 'Sign in to your RazinSoft account to manage your products, licenses and downloads.' })
useSeoMeta({ robots: 'noindex, follow' })

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPwd = ref(false)

const { login } = useAuth()
const route = useRoute()
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  if (loading.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    await login(email.value, password.value)
    await navigateTo((route.query.redirect as string) || '/dashboard')
  } catch (e: any) {
    errorMsg.value = e?.data?.message || 'These credentials do not match our records.'
  } finally {
    loading.value = false
  }
}

const field = 'h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 text-sm text-ink-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <AuthAside />

    <main class="flex items-center justify-center px-5 py-10 sm:px-8">
      <div class="w-full max-w-md">
        <!-- Mobile logo -->
        <NuxtLink to="/" class="mb-8 flex items-center gap-2 lg:hidden">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white" aria-hidden="true">R</span>
          <span class="font-display text-xl font-extrabold text-ink-900">RazinSoft</span>
        </NuxtLink>

        <h1 class="font-display text-3xl font-extrabold text-ink-900">Welcome back</h1>
        <p class="mt-2 text-gray-500">Sign in to continue to your dashboard.</p>

        <div class="mt-7">
          <AuthSocials />
        </div>

        <div class="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          <span class="h-px flex-1 bg-gray-200" />or continue with email<span class="h-px flex-1 bg-gray-200" />
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <p v-if="errorMsg" class="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{{ errorMsg }}</p>
          <div>
            <label for="email" class="mb-1.5 block text-sm font-medium text-ink-800">Email address</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
              <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@example.com" :class="[field, 'pr-3']" />
            </div>
          </div>

          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-ink-800">Password</label>
              <NuxtLink to="/login" class="text-sm font-semibold text-brand-600 hover:text-brand-700">Forgot password?</NuxtLink>
            </div>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              <input id="password" v-model="password" :type="showPwd ? 'text' : 'password'" required autocomplete="current-password" placeholder="••••••••" :class="[field, 'pr-10']" />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-400 hover:text-gray-600" :aria-label="showPwd ? 'Hide password' : 'Show password'" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 3 18 18M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4M9.4 5.2A9.5 9.5 0 0 1 12 5c6.25 0 9.75 7 9.75 7a13 13 0 0 1-2.4 3.2M6.5 6.5A13 13 0 0 0 2.25 12S5.75 19 12 19c1 0 1.9-.15 2.75-.4" /></svg>
              </button>
            </div>
          </div>

          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input v-model="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 accent-brand-600" />
            Remember me for 30 days
          </label>

          <button type="submit" class="btn-brand w-full disabled:cursor-not-allowed disabled:opacity-60" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign In' }}</button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <NuxtLink to="/register" class="font-semibold text-brand-600 hover:text-brand-700">Sign up</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>
