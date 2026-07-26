<script setup lang="ts">
usePageSeo({ title: 'Bills Information', description: 'Your saved billing addresses.' })

const LABELS = [
  { value: 'home', text: 'Home' },
  { value: 'office', text: 'Office' },
  { value: 'other', text: 'Other' },
]

interface BillingAddress {
  id: number
  label: string
  /** "Home", or "Home 1"/"Home 2" once that type repeats — worked out by the API. */
  display_label: string
  full_name: string | null
  company: string | null
  phone: string | null
  address: string
  city: string | null
  state: string | null
  zip: string | null
  country: string
  is_default: boolean
  one_line: string
}

const { $api } = useNuxtApp()
const { data: res, refresh } = await useAsyncData('account-billing-addresses', () =>
  $api<{ data: BillingAddress[] }>('/account/billing-addresses'),
)
const addresses = computed<BillingAddress[]>(() => res.value?.data || [])

const blank = () => ({
  label: 'home', full_name: '', company: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'Bangladesh', is_default: false,
})

const form = reactive(blank())
const editingId = ref<number | null>(null)
const showForm = ref(false)
const saving = ref(false)
const error = ref('')

const field = 'h-11 w-full rounded-xl border border-gray-200 px-3.5 text-sm text-ink-900 transition placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

function startAdd() {
  Object.assign(form, blank())
  editingId.value = null
  error.value = ''
  showForm.value = true
}

function startEdit(a: BillingAddress) {
  Object.assign(form, {
    label: a.label || 'other', full_name: a.full_name || '', company: a.company || '', phone: a.phone || '',
    address: a.address, city: a.city || '', state: a.state || '', zip: a.zip || '',
    country: a.country, is_default: a.is_default,
  })
  editingId.value = a.id
  error.value = ''
  showForm.value = true
}

async function save() {
  saving.value = true
  error.value = ''
  try {
    if (editingId.value) {
      await $api(`/account/billing-addresses/${editingId.value}`, { method: 'PUT', body: { ...form } })
    } else {
      await $api('/account/billing-addresses', { method: 'POST', body: { ...form } })
    }
    showForm.value = false
    await refresh()
  } catch (e: any) {
    // Laravel sends 422 with a per-field message; show the first one.
    const errs = e?.data?.errors
    error.value = errs ? String(Object.values(errs)[0]) : (e?.data?.message || 'Could not save the address.')
  } finally {
    saving.value = false
  }
}

async function makeDefault(a: BillingAddress) {
  await $api(`/account/billing-addresses/${a.id}/default`, { method: 'POST' })
  await refresh()
}

async function remove(a: BillingAddress) {
  if (!confirm('Remove this billing address?')) return
  await $api(`/account/billing-addresses/${a.id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-3xl font-extrabold text-ink-900">Bills Information</h1>
        <p class="mt-1 text-gray-500">The addresses your invoices are billed to. Checkout uses your default one.</p>
      </div>
      <button type="button" class="btn bg-brand-600 text-white hover:bg-brand-700" @click="startAdd">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg>
        Add address
      </button>
    </div>

    <!-- Saved addresses -->
    <div v-if="addresses.length" class="mt-6 grid gap-4 sm:grid-cols-2">
      <div
        v-for="a in addresses"
        :key="a.id"
        class="rounded-2xl border p-5 shadow-sm"
        :class="a.is_default ? 'border-brand-300 bg-brand-50/40' : 'border-gray-100'"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="flex items-center gap-2 font-bold text-ink-900">
              <span class="truncate">{{ a.display_label }}</span>
              <span v-if="a.is_default" class="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Default</span>
            </p>
            <p v-if="a.company" class="mt-0.5 text-sm text-gray-500">{{ a.company }}</p>
            <p class="mt-1 text-sm leading-relaxed text-gray-600">{{ a.one_line }}</p>
            <p v-if="a.phone" class="mt-1 text-sm text-gray-500">{{ a.phone }}</p>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold">
          <button type="button" class="text-brand-600 hover:text-brand-700" @click="startEdit(a)">Edit</button>
          <button v-if="!a.is_default" type="button" class="text-gray-500 hover:text-ink-900" @click="makeDefault(a)">Set as default</button>
          <button type="button" class="ml-auto text-red-500 hover:text-red-600" @click="remove(a)">Remove</button>
        </div>
      </div>
    </div>

    <div v-else class="mt-6 rounded-2xl border border-dashed border-gray-200 p-10 text-center">
      <p class="font-semibold text-ink-900">No billing address yet</p>
      <p class="mt-1 text-sm text-gray-500">Add one and checkout will stop asking for it every time.</p>
    </div>

    <!-- Add / edit -->
    <section v-if="showForm" class="mt-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h2 class="font-display text-lg font-bold text-ink-900">{{ editingId ? 'Edit address' : 'New billing address' }}</h2>

      <p v-if="error" class="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</p>

      <form class="mt-5 grid gap-4 md:grid-cols-2" @submit.prevent="save">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Label <span class="text-red-500">*</span></label>
          <select v-model="form.label" required :class="field">
            <option v-for="l in LABELS" :key="l.value" :value="l.value">{{ l.text }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Full Name</label>
          <input v-model="form.full_name" type="text" autocomplete="name" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Company <span class="text-gray-400">(Optional)</span></label>
          <input v-model="form.company" type="text" autocomplete="organization" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Phone</label>
          <input v-model="form.phone" type="tel" autocomplete="tel" :class="field" />
        </div>

        <div class="md:col-span-2">
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Address <span class="text-red-500">*</span></label>
          <input v-model="form.address" type="text" required autocomplete="street-address" placeholder="123 Main Street" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">City</label>
          <input v-model="form.city" type="text" autocomplete="address-level2" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">ZIP / Postal Code <span class="text-red-500">*</span></label>
          <input v-model="form.zip" type="text" required autocomplete="postal-code" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">State / Province</label>
          <input v-model="form.state" type="text" autocomplete="address-level1" :class="field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-ink-800">Country <span class="text-red-500">*</span></label>
          <CountryNameSelect v-model="form.country" />
        </div>

        <label class="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
          <input v-model="form.is_default" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-600" />
          Use this as my default billing address
        </label>

        <div class="flex gap-3 md:col-span-2">
          <button type="submit" :disabled="saving" class="btn bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60">
            {{ saving ? 'Saving…' : editingId ? 'Save changes' : 'Add address' }}
          </button>
          <button type="button" class="btn border border-gray-200 text-gray-600 hover:bg-gray-50" @click="showForm = false">Cancel</button>
        </div>
      </form>
    </section>
  </div>
</template>
