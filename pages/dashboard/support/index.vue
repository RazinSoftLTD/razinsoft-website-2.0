<script setup lang="ts">
usePageSeo({ title: 'Support Tickets', description: 'Create and track your RazinSoft support tickets.' })

const { $api } = useNuxtApp()
const { data: res, refresh } = await useAsyncData('support-tickets', () => $api<any>('/support/tickets'))

const tickets = computed<any[]>(() => res.value?.data || [])
const counts = computed<any>(() => res.value?.counts || { all: 0, open: 0, pending: 0, resolved: 0, closed: 0 })
const categories = computed<Record<string, string>>(() => res.value?.categories || {})

// Category cards (icon per category).
const catIcons: Record<string, string> = {
  technical_support: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 12h2M18 12h2M12 4v2M12 18v2',
  billing: 'M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 4h18',
  product_download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  activation_key: 'M15 7a4 4 0 1 0-3.9 5H14l2 2 2-2 1-1-1-1a4 4 0 0 0-4-4Z',
  other: 'M4 5h16v12H7l-3 3V5Z',
}

const filter = ref<'all' | 'open' | 'pending' | 'resolved' | 'closed'>('all')
const filtered = computed(() => (filter.value === 'all' ? tickets.value : tickets.value.filter((t) => t.status === filter.value)))

const showForm = ref(false)
const form = reactive({ subject: '', category: '', message: '' })
const file = ref<File | null>(null)
const submitting = ref(false)
const error = ref('')

function onFile(e: Event) {
  file.value = (e.target as HTMLInputElement).files?.[0] || null
}

async function submit() {
  error.value = ''
  if (!form.subject.trim()) { error.value = 'Please enter a subject.'; return }
  if (!form.category) { error.value = 'Please select a category.'; return }
  if (!form.message.trim()) { error.value = 'Please describe your issue.'; return }
  submitting.value = true
  try {
    const fd = new FormData()
    fd.append('subject', form.subject)
    fd.append('category', form.category)
    fd.append('message', form.message)
    if (file.value) fd.append('attachment', file.value)
    await $api('/support/tickets', { method: 'POST', body: fd })
    form.subject = ''; form.category = ''; form.message = ''; file.value = null
    showForm.value = false
    await refresh()
  } catch (e: any) {
    error.value = e?.data?.message || 'Could not submit the ticket. Please try again.'
  } finally {
    submitting.value = false
  }
}

const badge: Record<string, string> = {
  open: 'bg-red-50 text-red-700', pending: 'bg-amber-50 text-amber-700', resolved: 'bg-emerald-50 text-emerald-700', closed: 'bg-gray-100 text-gray-500',
}
const timeAgo = (s?: string) => {
  if (!s) return ''
  const d = (Date.now() - new Date(s).getTime()) / 1000
  if (d < 60) return 'just now'
  if (d < 3600) return `${Math.floor(d / 60)} min ago`
  if (d < 86400) return `${Math.floor(d / 3600)} hours ago`
  return `${Math.floor(d / 86400)} days ago`
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-3xl font-extrabold text-ink-900">Support Tickets</h1>
        <p class="mt-1 text-gray-500">Manage your support tickets and get help.</p>
        <p class="mt-1 flex items-center gap-1.5 text-sm font-semibold text-red-600">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></svg>
          Office Hours: Sunday–Thursday | 10:00 AM – 6:00 PM (GMT+6, Dhaka Time)
        </p>
      </div>
      <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700" @click="showForm = !showForm">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg> New Ticket
      </button>
    </div>

    <!-- Filter chips -->
    <div class="mt-5 flex flex-wrap items-center gap-2">
      <span class="text-sm text-gray-500">Filter by:</span>
      <button v-for="f in (['all','open','pending','resolved','closed'] as const)" :key="f" type="button" @click="filter = f"
        class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold capitalize"
        :class="filter === f ? 'bg-brand-600 text-white' : 'bg-white text-gray-500 ring-1 ring-gray-200 hover:bg-gray-50'">
        {{ f.replace('_', ' ') }}
        <span class="rounded-full px-1.5 text-xs" :class="filter === f ? 'bg-white/20' : 'bg-gray-100'">{{ counts[f] }}</span>
      </button>
    </div>

    <!-- Create form -->
    <div v-if="showForm" class="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="font-display text-lg font-bold text-ink-900">Create New Support Ticket</h2>
          <p class="text-sm text-gray-400">Fill in the information below</p>
        </div>
        <button type="button" class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100" @click="showForm = false" aria-label="Close">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>

      <div class="mt-4 space-y-5">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink-800">Subject</label>
          <input v-model="form.subject" placeholder="Enter a brief summary of your issue" class="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink-800">Select Category</label>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <button v-for="(label, key) in categories" :key="key" type="button" @click="form.category = key"
              class="flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center text-sm transition"
              :class="form.category === key ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="catIcons[key] || catIcons.other" /></svg>
              <span class="font-medium leading-tight">{{ label }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink-800">Message</label>
          <textarea v-model="form.message" rows="5" placeholder="Describe your issue in detail. Include any error messages, steps to reproduce, or relevant information…" class="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"></textarea>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink-800">Attachment</label>
          <label class="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 py-8 text-center hover:bg-gray-50">
            <svg class="h-6 w-6 text-brand-500" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21.4 11.1-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3 3 0 0 1 4.3 4.3l-8.6 8.5a1 1 0 0 1-1.4-1.4l7.8-7.8" /></svg>
            <span class="text-sm"><span class="font-semibold text-brand-600">Click to upload</span> or drag and drop</span>
            <span class="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</span>
            <input type="file" class="hidden" accept="image/png,image/jpeg,application/pdf" @change="onFile">
          </label>
          <p v-if="file" class="mt-1.5 text-xs text-gray-500">Selected: {{ file.name }}</p>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <div class="flex gap-3">
          <button type="button" :disabled="submitting" @click="submit" class="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
            {{ submitting ? 'Submitting…' : 'Submit Ticket' }}
          </button>
          <button type="button" @click="showForm = false" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Ticket list -->
    <p v-if="!filtered.length" class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
      No tickets{{ filter !== 'all' ? ' in this status' : ' yet' }}.
    </p>
    <ul v-else class="mt-6 space-y-4">
      <li v-for="t in filtered" :key="t.id">
        <div class="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4" /></svg>
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span v-if="t.unread" class="h-2 w-2 shrink-0 rounded-full bg-red-500" title="New reply"></span>
              <p class="font-display font-bold text-ink-900">{{ t.subject }}</p>
              <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize" :class="badge[t.status]">{{ t.status_label }}</span>
              <span v-if="t.unread" class="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase text-red-600">New reply</span>
            </div>
            <p class="mt-0.5 text-sm text-gray-400">Ticket ID: #{{ t.ticket_number }}</p>
            <p class="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span>🕒 {{ timeAgo(t.updated_at) }}</span>
              <span>💬 {{ t.replies_count }} {{ t.replies_count === 1 ? 'reply' : 'replies' }}</span>
              <span>{{ t.category_label }}</span>
            </p>
          </div>
          <NuxtLink :to="`/dashboard/support/${t.id}`" class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-ink-800 hover:bg-gray-50">View Details</NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>
