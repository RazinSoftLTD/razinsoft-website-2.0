<script setup lang="ts">
definePageMeta({ layout: 'auth' })
usePageSeo({ title: 'Create Account', description: 'Create a free RazinSoft account to purchase products, manage licenses and access downloads.' })
useSeoMeta({ robots: 'noindex, follow' })

const form = reactive({ name: '', email: '', phone: '', password: '', confirm: '' })
const agree = ref(false)
const showPwd = ref(false)
const showConfirm = ref(false)

const score = computed(() => {
  const p = form.password
  let s = 0
  if (p.length >= 8) s++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++
  if (/\d/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strength = computed(() => {
  if (!form.password) return { label: '', text: '', bar: '', bars: 0 }
  if (score.value <= 1) return { label: 'Weak', text: 'text-red-600', bar: 'bg-red-500', bars: 1 }
  if (score.value === 2) return { label: 'Fair', text: 'text-orange-600', bar: 'bg-orange-500', bars: 2 }
  if (score.value === 3) return { label: 'Good', text: 'text-amber-600', bar: 'bg-amber-500', bars: 3 }
  return { label: 'Strong', text: 'text-emerald-600', bar: 'bg-emerald-500', bars: 4 }
})
const mismatch = computed(() => form.confirm !== '' && form.confirm !== form.password)
const canSubmit = computed(() => form.name && form.email && form.password && form.confirm === form.password && agree.value)

const { register } = useAuth()
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  if (!canSubmit.value || loading.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    await register({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      password: form.password,
      password_confirmation: form.confirm,
    })
    await navigateTo('/dashboard')
  } catch (e: any) {
    errorMsg.value = e?.data?.message || Object.values(e?.data?.errors ?? {})?.[0]?.[0] || 'Could not create your account. Please try again.'
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
        <NuxtLink to="/" class="mb-8 flex items-center gap-2 lg:hidden">
          <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" class="h-8 w-auto">
        </NuxtLink>

        <h1 class="font-display text-3xl font-extrabold text-ink-900">Create your account</h1>
        <p class="mt-2 text-gray-500">Start with a free account — no credit card required.</p>

        <div class="mt-7">
          <AuthSocials />
        </div>

        <div class="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          <span class="h-px flex-1 bg-gray-200" />or sign up with email<span class="h-px flex-1 bg-gray-200" />
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <p v-if="errorMsg" class="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{{ errorMsg }}</p>
          <div>
            <label for="name" class="mb-1.5 block text-sm font-medium text-ink-800">Full name</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
              <input id="name" v-model="form.name" type="text" required autocomplete="name" placeholder="John Doe" :class="[field, 'pr-3']" />
            </div>
          </div>

          <div>
            <label for="email" class="mb-1.5 block text-sm font-medium text-ink-800">Email address</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
              <input id="email" v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" :class="[field, 'pr-3']" />
            </div>
          </div>

          <div>
            <label for="phone" class="mb-1.5 block text-sm font-medium text-ink-800">Phone number <span class="text-gray-400">(Optional)</span></label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12 12 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+1 (555) 000-0000" :class="[field, 'pr-3']" />
            </div>
          </div>

          <div>
            <label for="password" class="mb-1.5 block text-sm font-medium text-ink-800">Password</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              <input id="password" v-model="form.password" :type="showPwd ? 'text' : 'password'" required autocomplete="new-password" placeholder="Create a strong password" :class="[field, 'pr-10']" />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-400 hover:text-gray-600" :aria-label="showPwd ? 'Hide password' : 'Show password'" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 3 18 18M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4M9.4 5.2A9.5 9.5 0 0 1 12 5c6.25 0 9.75 7 9.75 7a13 13 0 0 1-2.4 3.2M6.5 6.5A13 13 0 0 0 2.25 12S5.75 19 12 19c1 0 1.9-.15 2.75-.4" /></svg>
              </button>
            </div>
            <!-- Password strength -->
            <div v-if="form.password" class="mt-2">
              <div class="flex gap-1.5" aria-hidden="true">
                <span v-for="i in 4" :key="i" class="h-1.5 flex-1 rounded-full transition-colors" :class="i <= strength.bars ? strength.bar : 'bg-gray-200'" />
              </div>
              <p class="mt-1 text-xs" :class="strength.text">Password strength: <span class="font-semibold">{{ strength.label }}</span></p>
            </div>
          </div>

          <div>
            <label for="confirm" class="mb-1.5 block text-sm font-medium text-ink-800">Confirm password</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              <input id="confirm" v-model="form.confirm" :type="showConfirm ? 'text' : 'password'" required autocomplete="new-password" placeholder="Re-enter your password" :class="[field, 'pr-10', mismatch ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : '']" />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-400 hover:text-gray-600" :aria-label="showConfirm ? 'Hide password' : 'Show password'" @click="showConfirm = !showConfirm">
                <svg v-if="!showConfirm" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 3 18 18M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4M9.4 5.2A9.5 9.5 0 0 1 12 5c6.25 0 9.75 7 9.75 7a13 13 0 0 1-2.4 3.2M6.5 6.5A13 13 0 0 0 2.25 12S5.75 19 12 19c1 0 1.9-.15 2.75-.4" /></svg>
              </button>
            </div>
            <p v-if="mismatch" class="mt-1 text-xs text-red-600">Passwords don't match.</p>
          </div>

          <label class="flex items-start gap-2.5 text-sm text-gray-600">
            <input v-model="agree" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-brand-600" />
            <span>I agree to the <NuxtLink to="/register" class="font-semibold text-brand-600 hover:text-brand-700">Terms of Service</NuxtLink> and <NuxtLink to="/register" class="font-semibold text-brand-600 hover:text-brand-700">Privacy Policy</NuxtLink>.</span>
          </label>

          <button type="submit" class="btn-brand w-full disabled:cursor-not-allowed disabled:opacity-60" :disabled="!canSubmit || loading">{{ loading ? 'Creating account…' : 'Create Account' }}</button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-brand-600 hover:text-brand-700">Sign in</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>
