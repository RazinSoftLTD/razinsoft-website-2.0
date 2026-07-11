<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { success } = useToast()

useSeoMeta({ title: 'Reset Password — RazinSoft' })

const token = String(route.query.token || '')
const email = ref(String(route.query.email || ''))
const password = ref('')
const confirm = ref('')
const showPwd = ref(false)
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (password.value.length < 8) { error.value = 'Password must be at least 8 characters.'; return }
  if (password.value !== confirm.value) { error.value = 'Passwords do not match.'; return }
  loading.value = true
  try {
    await $api('/auth/reset-password', {
      method: 'POST',
      body: { token, email: email.value, password: password.value, password_confirmation: confirm.value },
    })
    success('Password updated. Please sign in.')
    router.push('/login')
  } catch (e: any) {
    error.value = e?.data?.errors?.email?.[0] || e?.data?.message || 'This reset link is invalid or has expired.'
  } finally {
    loading.value = false
  }
}

const field = 'h-11 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-brand-600 focus:outline-none'
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center bg-[#f7f9fc] px-4 py-16">
    <div class="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h1 class="font-display text-2xl font-extrabold text-ink-900">Set a new password</h1>
      <p class="mt-2 text-sm text-gray-600">Choose a new password for your account.</p>

      <div v-if="!token" class="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
        This link is missing its reset token. Please request a new one from the
        <NuxtLink to="/forgot-password" class="font-semibold underline">forgot password</NuxtLink> page.
      </div>

      <form v-else @submit.prevent="submit" class="mt-6 space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-ink-800">Email</label>
          <input v-model="email" type="email" required :class="field" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-ink-800">New password</label>
          <div class="relative">
            <input v-model="password" :type="showPwd ? 'text' : 'password'" required autocomplete="new-password" placeholder="••••••••" :class="[field, 'pr-10']" />
            <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-400 hover:text-gray-600" @click="showPwd = !showPwd">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </button>
          </div>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-ink-800">Confirm password</label>
          <input v-model="confirm" :type="showPwd ? 'text' : 'password'" required autocomplete="new-password" placeholder="••••••••" :class="field" />
        </div>
        <p v-if="error" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{{ error }}</p>
        <button type="submit" :disabled="loading" class="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
          {{ loading ? 'Saving…' : 'Set password & sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>
