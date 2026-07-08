<script setup lang="ts">
// Renders inside the persistent dashboard shell (pages/dashboard.vue) — no layout/middleware here.
usePageSeo({ title: 'Profile', description: 'Manage your RazinSoft account — personal details, password and settings.' })

const { user, fetchMe, updateProfile, changePassword, uploadAvatar, resendVerification, deleteAccount } = useAuth()
const toast = useToast()
const route = useRoute()

const tabs = ['Personal Information', 'Change Password', 'Account Settings', 'Danger Zone'] as const
const activeTab = ref(0)

const field = 'h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-ink-900 placeholder-gray-400 transition focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

// ---- Personal information ----
const dialCodes = ['+880', '+1', '+44', '+91', '+971', '+61', '+49', '+92']
const form = reactive({ name: '', dial: '+880', phone: '', address: '', city: '', country: '' })
const savingProfile = ref(false)

function hydrate() {
  const u = user.value
  if (!u) return
  form.name = u.name || ''
  form.address = u.address || ''
  form.city = u.city || ''
  form.country = u.country || ''
  const m = (u.phone || '').match(/^(\+\d{1,4})\s+(.*)$/)
  if (m) { form.dial = m[1]; form.phone = m[2] }
  else { form.phone = u.phone || '' }
}

onMounted(async () => {
  if (!user.value) await fetchMe()
  hydrate()
  if (route.query.verified === '1') { toast.success('Email verified', 'Your email address is now verified.'); await fetchMe() }
  else if (route.query.verified === '0') { toast.error('Verification failed', 'The link is invalid or has expired.') }
})
watch(user, hydrate)

const initials = computed(() => user.value?.initials || 'U')

async function saveProfile() {
  if (savingProfile.value) return
  savingProfile.value = true
  try {
    await updateProfile({
      name: form.name,
      phone: form.phone ? `${form.dial} ${form.phone}`.trim() : '',
      address: form.address,
      city: form.city,
      country: form.country,
    })
    toast.success('Profile updated', 'Your changes have been saved.')
  } catch (e: any) {
    toast.error('Could not save', e?.data?.message || 'Please try again.')
  } finally {
    savingProfile.value = false
  }
}

// ---- Avatar ----
const fileInput = ref<HTMLInputElement | null>(null)
const uploadingAvatar = ref(false)
function pickAvatar() { fileInput.value?.click() }
async function onAvatar(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  if (f.size > 2 * 1024 * 1024) { toast.error('File too large', 'Please choose an image under 2MB.'); return }
  uploadingAvatar.value = true
  try {
    await uploadAvatar(f)
    toast.success('Photo updated', 'Your profile photo has been changed.')
  } catch (e: any) {
    toast.error('Upload failed', e?.data?.message || 'Please try again.')
  } finally {
    uploadingAvatar.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

// ---- Change password ----
const pw = reactive({ current_password: '', password: '', password_confirmation: '' })
const savingPw = ref(false)
async function submitPassword() {
  if (savingPw.value) return
  if (pw.password.length < 8) { toast.error('Password too short', 'Use at least 8 characters.'); return }
  if (pw.password !== pw.password_confirmation) { toast.error('Passwords do not match'); return }
  savingPw.value = true
  try {
    await changePassword({ ...pw })
    toast.success('Password updated', 'Use your new password next time you sign in.')
    pw.current_password = pw.password = pw.password_confirmation = ''
  } catch (e: any) {
    toast.error('Could not update', e?.data?.errors?.current_password?.[0] || e?.data?.message || 'Please try again.')
  } finally {
    savingPw.value = false
  }
}

// ---- Email verification ----
const sendingVerify = ref(false)
async function verifyEmail() {
  if (sendingVerify.value) return
  sendingVerify.value = true
  try {
    const r = await resendVerification()
    toast.success('Verification sent', r.message)
  } catch (e: any) {
    toast.error('Could not send', e?.data?.message || 'Please try again.')
  } finally {
    sendingVerify.value = false
  }
}

// ---- Danger zone ----
const del = reactive({ password: '' })
const deleting = ref(false)
async function removeAccount() {
  if (!del.password) { toast.error('Password required', 'Enter your password to confirm.'); return }
  if (!confirm('Delete your account permanently? This cannot be undone.')) return
  deleting.value = true
  try {
    await deleteAccount(del.password)
    toast.success('Account deleted', 'Sorry to see you go.')
    await navigateTo('/')
  } catch (e: any) {
    toast.error('Could not delete', e?.data?.errors?.password?.[0] || e?.data?.message || 'Please try again.')
  } finally {
    deleting.value = false
  }
}

const memberSince = computed(() =>
  user.value?.created_at ? new Date(user.value.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—',
)
</script>

<template>
  <div>
    <!-- Heading -->
    <div>
      <h1 class="font-display text-2xl font-bold text-ink-900">Profile Management</h1>
      <p class="mt-1 text-sm text-gray-500">Manage your personal information and settings</p>
    </div>

    <!-- Tabs -->
    <div class="mt-6 border-b border-gray-200">
      <nav class="-mb-px flex flex-wrap gap-x-6" aria-label="Profile sections">
        <button
          v-for="(t, i) in tabs"
          :key="t"
          type="button"
          class="whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition"
          :class="activeTab === i ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-ink-800'"
          @click="activeTab = i"
        >
          {{ t }}
        </button>
      </nav>
    </div>

    <!-- ===================== Personal Information ===================== -->
    <section v-show="activeTab === 0" class="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_220px]">
        <!-- Fields -->
        <div class="space-y-5">
          <div>
            <label for="name" class="mb-1.5 block text-sm font-medium text-ink-800">Full Name</label>
            <div class="relative">
              <input id="name" v-model="form.name" type="text" autocomplete="name" placeholder="John Doe" :class="[field, 'pr-10']">
              <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path stroke-linecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" /></svg>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label for="email" class="mb-1.5 block text-sm font-medium text-ink-800">Email Address</label>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  <input id="email" :value="user?.email" type="email" readonly class="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-ink-700">
                  <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                </div>
                <span v-if="user?.email_verified" class="inline-flex h-11 items-center gap-1 rounded-lg bg-emerald-50 px-3 text-sm font-semibold text-emerald-600">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
                  Verified
                </span>
                <button v-else type="button" class="h-11 shrink-0 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-ink-800 hover:bg-gray-50 disabled:opacity-60" :disabled="sendingVerify" @click="verifyEmail">
                  {{ sendingVerify ? 'Sending…' : 'Verify' }}
                </button>
              </div>
            </div>

            <div>
              <label for="phone" class="mb-1.5 block text-sm font-medium text-ink-800">Phone Number</label>
              <div class="flex gap-2">
                <select v-model="form.dial" aria-label="Country code" class="h-11 shrink-0 rounded-lg border border-gray-200 bg-white px-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500">
                  <option v-for="d in dialCodes" :key="d">{{ d }}</option>
                </select>
                <div class="relative flex-1">
                  <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="1234567890" :class="[field, 'pr-10']">
                  <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 0 1 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 3 5Z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="address" class="mb-1.5 block text-sm font-medium text-ink-800">Address</label>
            <div class="relative">
              <input id="address" v-model="form.address" type="text" autocomplete="street-address" placeholder="123 Main Street, City, Country" :class="[field, 'pr-10']">
              <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label for="city" class="mb-1.5 block text-sm font-medium text-ink-800">City</label>
              <input id="city" v-model="form.city" type="text" autocomplete="address-level2" placeholder="New York" :class="field">
            </div>
            <div>
              <label for="country" class="mb-1.5 block text-sm font-medium text-ink-800">Country</label>
              <input id="country" v-model="form.country" type="text" autocomplete="country-name" placeholder="United States" :class="field">
            </div>
          </div>

          <div class="pt-2">
            <button type="button" class="btn-brand disabled:cursor-not-allowed disabled:opacity-60" :disabled="savingProfile" @click="saveProfile">
              {{ savingProfile ? 'Saving…' : 'Save Changes' }}
            </button>
          </div>
        </div>

        <!-- Avatar -->
        <div class="flex flex-col items-center gap-3">
          <div class="relative">
            <img v-if="user?.photo" :src="user.photo" alt="Profile photo" class="h-32 w-32 rounded-full object-cover ring-4 ring-brand-100">
            <span v-else class="grid h-32 w-32 place-items-center rounded-full bg-brand-600 text-4xl font-bold text-white ring-4 ring-brand-100">{{ initials }}</span>
            <button type="button" class="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white shadow ring-2 ring-white hover:bg-brand-700" aria-label="Upload photo" @click="pickAvatar">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3" /></svg>
            </button>
          </div>
          <p class="text-xs text-gray-400">JPG or PNG, max 2MB</p>
          <button type="button" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60" :disabled="uploadingAvatar" @click="pickAvatar">
            {{ uploadingAvatar ? 'Uploading…' : 'Upload New' }}
          </button>
          <input ref="fileInput" type="file" accept="image/jpeg,image/png" class="hidden" @change="onAvatar">
        </div>
      </div>
    </section>

    <!-- ===================== Change Password ===================== -->
    <section v-show="activeTab === 1" class="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div class="max-w-md space-y-5">
        <div>
          <label for="cur" class="mb-1.5 block text-sm font-medium text-ink-800">Current Password</label>
          <input id="cur" v-model="pw.current_password" type="password" autocomplete="current-password" placeholder="••••••••" :class="field">
        </div>
        <div>
          <label for="new" class="mb-1.5 block text-sm font-medium text-ink-800">New Password</label>
          <input id="new" v-model="pw.password" type="password" autocomplete="new-password" placeholder="At least 8 characters" :class="field">
        </div>
        <div>
          <label for="conf" class="mb-1.5 block text-sm font-medium text-ink-800">Confirm New Password</label>
          <input id="conf" v-model="pw.password_confirmation" type="password" autocomplete="new-password" placeholder="Re-enter new password" :class="field">
        </div>
        <div class="pt-2">
          <button type="button" class="btn-brand disabled:cursor-not-allowed disabled:opacity-60" :disabled="savingPw" @click="submitPassword">
            {{ savingPw ? 'Updating…' : 'Update Password' }}
          </button>
        </div>
      </div>
    </section>

    <!-- ===================== Account Settings ===================== -->
    <section v-show="activeTab === 2" class="mt-6 space-y-4">
      <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="font-display text-base font-bold text-ink-900">Email verification</h3>
            <p class="mt-1 text-sm text-gray-500">{{ user?.email }}</p>
          </div>
          <span v-if="user?.email_verified" class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            Verified
          </span>
          <button v-else type="button" class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60" :disabled="sendingVerify" @click="verifyEmail">
            {{ sendingVerify ? 'Sending…' : 'Send verification' }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Member since</p>
          <p class="mt-1 font-display text-lg font-bold text-ink-900">{{ memberSince }}</p>
        </div>
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Account type</p>
          <p class="mt-1 font-display text-lg font-bold capitalize text-ink-900">{{ user?.role || 'customer' }}</p>
        </div>
      </div>
    </section>

    <!-- ===================== Danger Zone ===================== -->
    <section v-show="activeTab === 3" class="mt-6 rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-sm sm:p-8">
      <h3 class="font-display text-base font-bold text-red-700">Delete account</h3>
      <p class="mt-1 max-w-lg text-sm text-red-600/90">
        This permanently deletes your account, orders history access and licenses from your dashboard. This action cannot be undone.
      </p>
      <div class="mt-5 max-w-sm">
        <label for="delpw" class="mb-1.5 block text-sm font-medium text-ink-800">Confirm with your password</label>
        <input id="delpw" v-model="del.password" type="password" autocomplete="current-password" placeholder="••••••••" class="h-11 w-full rounded-lg border border-red-200 bg-white px-4 text-sm text-ink-900 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400">
      </div>
      <button type="button" class="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60" :disabled="deleting" @click="removeAccount">
        {{ deleting ? 'Deleting…' : 'Delete my account' }}
      </button>
    </section>
  </div>
</template>
