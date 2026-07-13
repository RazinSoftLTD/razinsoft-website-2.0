<script setup lang="ts">
definePageMeta({ layout: 'auth' })
usePageSeo({ title: 'Create Account', description: 'Create a free RazinSoft account to purchase products, manage licenses and access downloads.' })
useSeoMeta({ robots: 'noindex, follow' })

const form = reactive({ name: '', email: '', country: 'BD', phone: '', password: '' })
const showPwd = ref(false)

const { countries, digits } = useCountries()
const selectedCountry = computed(() => countries.find((c) => c.code === form.country) ?? countries[0])
// Phone is optional and free-form — only the country code is applied, no per-country digit validation.

// Password: minimum 4 characters, no other rules.
const PWD_MIN = 4
const canSubmit = computed(() => !!form.name && !!form.email && form.password.length >= PWD_MIN)

// Default the phone country code to wherever the visitor is browsing from
// (quick guess from the browser locale, then refined by IP geolocation).
onMounted(() => {
  const region = (navigator.language?.split('-')[1] || '').toUpperCase()
  if (region && countries.some((c) => c.code === region)) form.country = region
  $fetch<any>('https://ipwho.is/?fields=country_code,success', { timeout: 3500 })
    .then((r) => { const code = r?.country_code; if (code && countries.some((c) => c.code === code)) form.country = code })
    .catch(() => { /* keep locale guess / default */ })
})

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
      phone: form.phone.trim() ? `${selectedCountry.value.dial} ${digits(form.phone)}` : undefined,
      password: form.password,
      password_confirmation: form.password,
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

        <!-- <div class="mt-7">
          <AuthSocials />
        </div> -->

        <div class="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          <!-- <span class="h-px flex-1 bg-gray-200" />or sign up with email<span class="h-px flex-1 bg-gray-200" /> -->
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
            <div class="flex gap-2">
              <CountrySelect v-model="form.country" class="shrink-0" />
              <div class="relative flex-1">
                <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.69a1.5 1.5 0 0 0-1.06-1.44l-3.36-1.12a1.5 1.5 0 0 0-1.62.49l-.97 1.2a12 12 0 0 1-5.42-5.42l1.2-.97a1.5 1.5 0 0 0 .49-1.62L8.88 4.06A1.5 1.5 0 0 0 7.44 3H4.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z" /></svg>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="tel"
                  placeholder="1712345678"
                  :class="[field, 'pr-3']"
                />
              </div>
            </div>
            <p class="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.13c-.24.68-1.42 1.31-1.96 1.36-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.24-.26.53-.32.71-.32.18 0 .36 0 .51.01.16.01.39-.06.6.46.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.96 1.25 2.24 1.39.28.14.44.12.6-.07.16-.19.69-.81.87-1.09.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.44.21.51.32.07.11.07.65-.17 1.33Z" /></svg>
              WhatsApp number preferred
            </p>
          </div>

          <div>
            <label for="password" class="mb-1.5 block text-sm font-medium text-ink-800">Password</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              <input id="password" v-model="form.password" :type="showPwd ? 'text' : 'password'" required autocomplete="new-password" minlength="4" placeholder="At least 4 characters" :class="[field, 'pr-10']" />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-400 hover:text-gray-600" :aria-label="showPwd ? 'Hide password' : 'Show password'" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7S2.25 12 2.25 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 3 18 18M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4M9.4 5.2A9.5 9.5 0 0 1 12 5c6.25 0 9.75 7 9.75 7a13 13 0 0 1-2.4 3.2M6.5 6.5A13 13 0 0 0 2.25 12S5.75 19 12 19c1 0 1.9-.15 2.75-.4" /></svg>
              </button>
            </div>
          </div>

          <p class="text-sm text-gray-500">
            By continuing, you agree to our
            <a href="/terms-and-conditions" target="_blank" rel="noopener" class="font-semibold text-brand-600 hover:text-brand-700">Terms of Service</a>
            and
            <a href="/privacy-policy" target="_blank" rel="noopener" class="font-semibold text-brand-600 hover:text-brand-700">Privacy Policy</a>.
          </p>

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
