<script setup lang="ts">
const route = useRoute()
const id = route.params.ticket as string
const { $api } = useNuxtApp()

const { data: ticket, refresh } = await useAsyncData(`support-ticket-${id}`, () => $api<any>(`/support/tickets/${id}`))
usePageSeo({ title: ticket.value?.subject || 'Ticket', description: 'Support ticket conversation.' })

// Chronological stream: opening message (customer) + replies. All messages are HTML.
const stream = computed<any[]>(() => {
  const t = ticket.value
  if (!t) return []
  return [
    { admin: false, name: 'You', message: t.message, attachment: t.attachment, at: t.created_at },
    ...(t.replies || []).map((r: any) => ({ admin: r.is_admin, name: r.is_admin ? (r.author || 'Support') : 'You', message: r.message, attachment: r.attachment, at: r.created_at })),
  ]
})

const file = ref<File | null>(null)
const sending = ref(false)
const error = ref('')
const scroller = ref<HTMLElement | null>(null)
const editorEl = ref<HTMLElement | null>(null)
let quill: any = null

function onFile(e: Event) {
  file.value = (e.target as HTMLInputElement).files?.[0] || null
}
function scrollToBottom() {
  nextTick(() => { if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight })
}

// Load Quill from CDN (client only) and initialise the reply editor.
function loadQuill(): Promise<any> {
  return new Promise((resolve) => {
    if ((window as any).Quill) return resolve((window as any).Quill)
    if (!document.getElementById('quill-css')) {
      const link = document.createElement('link')
      link.id = 'quill-css'; link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css'
      document.head.appendChild(link)
    }
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js'
    s.onload = () => resolve((window as any).Quill)
    document.head.appendChild(s)
  })
}

// Real-time replies via Pusher (only if a public key is configured).
function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src; s.onload = () => resolve(); document.head.appendChild(s)
  })
}
async function initPusher() {
  const cfg = useRuntimeConfig().public as any
  if (!cfg.reverbKey) return
  await loadScript('https://js.pusher.com/8.2/pusher.min.js')
  const Pusher = (window as any).Pusher
  if (!Pusher) return
  const pusher = new Pusher(cfg.reverbKey, {
    wsHost: cfg.reverbHost,
    wsPort: cfg.reverbPort,
    wssPort: cfg.reverbPort,
    forceTLS: cfg.reverbScheme === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: '',
    disableStats: true,
  })
  const channel = pusher.subscribe(`tickets.${id}`)
  channel.bind('reply.posted', async () => { await refresh(); scrollToBottom() })
}

onMounted(async () => {
  scrollToBottom()
  initPusher()
  if (ticket.value?.status === 'closed') return
  const Quill = await loadQuill()
  if (!editorEl.value || !Quill) return
  quill = new Quill(editorEl.value, {
    theme: 'snow',
    placeholder: 'Write a reply…',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
  })
})

async function send() {
  error.value = ''
  const html = quill && quill.getText().trim().length ? quill.root.innerHTML : ''
  if (!html) return
  sending.value = true
  try {
    const fd = new FormData()
    fd.append('message', html)
    if (file.value) fd.append('attachment', file.value)
    await $api(`/support/tickets/${id}/replies`, { method: 'POST', body: fd })
    if (quill) quill.setContents([])
    file.value = null
    await refresh()
    scrollToBottom()
  } catch (e: any) {
    error.value = e?.data?.message || 'Could not send your reply.'
  } finally {
    sending.value = false
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
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div v-if="ticket">
    <NuxtLink to="/dashboard/support" class="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-ink-900">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m15 18-6-6 6-6" /></svg> Back to tickets
    </NuxtLink>

    <div class="flex h-[calc(100vh-9rem)] min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <!-- Header -->
      <div class="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3.5">
        <div class="min-w-0">
          <h1 class="truncate font-display font-bold text-ink-900">{{ ticket.subject }}</h1>
          <p class="text-xs text-gray-400">#{{ ticket.ticket_number }} · {{ ticket.category_label }}</p>
        </div>
        <span class="inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize" :class="badge[ticket.status]">{{ ticket.status_label }}</span>
      </div>

      <!-- Messages -->
      <div ref="scroller" class="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 px-4 py-5 sm:px-5">
        <div v-for="(m, i) in stream" :key="i" class="flex items-end gap-2" :class="!m.admin ? 'flex-row-reverse' : ''">
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold" :class="!m.admin ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'">{{ (m.name || '?').charAt(0).toUpperCase() }}</span>
          <div class="max-w-[78%]">
            <div class="mb-1 flex items-center gap-2 text-xs text-gray-400" :class="!m.admin ? 'justify-end' : ''">
              <span class="font-semibold text-ink-800">{{ m.name }}</span>
              <span v-if="m.admin" class="rounded-full bg-brand-100 px-1.5 text-[10px] font-semibold text-brand-700">Support</span>
              <span>{{ timeAgo(m.at) }}</span>
            </div>
            <div class="rounded-2xl px-4 py-2.5 text-sm" :class="!m.admin ? 'rounded-br-sm bg-brand-600 text-white' : 'rounded-bl-sm bg-white text-ink-800 ring-1 ring-gray-100'">
              <div class="prose prose-sm max-w-none" :class="!m.admin ? 'prose-invert' : ''" v-html="m.message"></div>
              <a v-if="m.attachment" :href="m.attachment" target="_blank" class="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold" :class="!m.admin ? 'text-white/90 hover:text-white' : 'text-brand-600 hover:underline'">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21.4 11.1-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3 3 0 0 1 4.3 4.3l-8.6 8.5a1 1 0 0 1-1.4-1.4l7.8-7.8" /></svg> Attachment
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Composer (fixed at bottom) — rich text editor -->
      <div v-if="ticket.status !== 'closed'" class="shrink-0 border-t border-gray-100 bg-white p-3">
        <div class="rounded-xl border border-gray-200">
          <div ref="editorEl" style="min-height:90px"></div>
        </div>
        <div class="mt-2 flex items-center justify-between gap-2">
          <label class="inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-ink-900">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21.4 11.1-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3 3 0 0 1 4.3 4.3l-8.6 8.5a1 1 0 0 1-1.4-1.4l7.8-7.8" /></svg>
            {{ file?.name || 'Attach file' }}
            <input type="file" accept="image/png,image/jpeg,application/pdf" class="hidden" @change="onFile">
          </label>
          <button type="button" :disabled="sending" @click="send" class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
            {{ sending ? 'Sending…' : 'Send reply' }}
          </button>
        </div>
        <p v-if="error" class="mt-1 px-1 text-xs text-red-600">{{ error }}</p>
      </div>
      <p v-else class="shrink-0 border-t border-gray-100 px-5 py-4 text-center text-sm text-gray-500">This ticket is closed.</p>
    </div>
  </div>
</template>
