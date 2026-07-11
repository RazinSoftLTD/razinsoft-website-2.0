<script setup lang="ts">
const { $api } = useNuxtApp()

useSeoMeta({ title: 'Forgot Password — RazinSoft', description: 'Reset your RazinSoft account password.' })

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $api('/auth/forgot-password', { method: 'POST', body: { email: email.value } })
    sent.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

const field = 'h-11 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm focus:border-brand-600 focus:outline-none'
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center bg-[#f7f9fc] px-4 py-16">
    <div class="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <NuxtLink to="/login" class="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-ink-900">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m15 18-6-6 6-6" /></svg> Back to sign in
      </NuxtLink>

      <template v-if="!sent">
        <h1 class="font-display text-2xl font-extrabold text-ink-900">Forgot your password?</h1>
        <p class="mt-2 text-sm text-gray-600">Enter the email you used to book a meeting or create your account, and we’ll send you a link to set a new password.</p>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
          <div class="relative">
            <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
            <input v-model="email" type="email" required placeholder="you@example.com" :class="field" />
          </div>
          <p v-if="error" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{{ error }}</p>
          <button type="submit" :disabled="loading" class="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
            {{ loading ? 'Sending…' : 'Send reset link' }}
          </button>
        </form>
      </template>

      <template v-else>
        <span class="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
        </span>
        <h1 class="mt-4 font-display text-2xl font-extrabold text-ink-900">Check your email</h1>
        <p class="mt-2 text-sm text-gray-600">If <strong>{{ email }}</strong> is registered, a password reset link is on its way. Open it to set a new password, then sign in.</p>
        <NuxtLink to="/login" class="mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline">Return to sign in</NuxtLink>
      </template>
    </div>
  </div>
</template>
