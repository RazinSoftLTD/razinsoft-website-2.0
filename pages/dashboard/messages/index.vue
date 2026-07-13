<script setup lang="ts">
// Layout + auth are provided by the parent pages/dashboard.vue shell.
usePageSeo({ title: 'Messages', description: 'Chat directly with the RazinSoft team.' })

const { $api } = useNuxtApp()
const { data: res, refresh } = await useAsyncData('account-messages', () => $api<any>('/account/messages'))
const messages = ref<any[]>([])
watchEffect(() => { messages.value = res.value?.data || [] })

const body = ref('')
const sending = ref(false)
const error = ref('')
const listEl = ref<HTMLElement | null>(null)

function scrollDown() {
  nextTick(() => { if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight })
}
onMounted(scrollDown)

async function send() {
  const text = body.value.trim()
  if (!text || sending.value) return
  sending.value = true
  error.value = ''
  try {
    const r = await $api<any>('/account/messages', { method: 'POST', body: { body: text } })
    messages.value.push(r.message)
    body.value = ''
    scrollDown()
  } catch (e: any) {
    error.value = e?.data?.message || 'Could not send. Please try again.'
  } finally {
    sending.value = false
  }
}

// Light polling so team replies appear without a manual refresh.
let timer: any = null
onMounted(() => { timer = setInterval(async () => { await refresh(); scrollDown() }, 15000) })
onBeforeUnmount(() => timer && clearInterval(timer))
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="mb-5">
      <h1 class="font-display text-2xl font-bold text-ink-900">Messages</h1>
      <p class="mt-1 text-sm text-gray-500">Chat directly with the RazinSoft team — we usually reply within a few hours.</p>
    </div>

    <div class="flex h-[calc(100vh-14rem)] min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <!-- Thread -->
      <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto p-5">
        <div v-if="!messages.length" class="grid h-full place-items-center text-center">
          <div>
            <svg class="mx-auto mb-3 h-10 w-10 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path stroke-linecap="round" d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10Z" /></svg>
            <p class="text-sm text-gray-400">No messages yet — say hello 👋</p>
          </div>
        </div>

        <div v-for="m in messages" :key="m.id" class="flex" :class="m.mine ? 'justify-end' : 'justify-start'">
          <div class="max-w-[80%]">
            <div
              class="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              :class="m.mine ? 'bg-brand-600 text-white' : 'bg-gray-100 text-ink-800'"
            >
              <div class="chat-html" v-html="m.body" />
              <a v-if="m.attachment" :href="m.attachment" target="_blank" rel="noopener" class="mt-1 inline-flex items-center gap-1 text-xs underline">📎 {{ m.attachment_name || 'Attachment' }}</a>
            </div>
            <p class="mt-1 px-1 text-[11px] text-gray-400" :class="m.mine ? 'text-right' : 'text-left'">
              <span v-if="!m.mine" class="font-semibold text-gray-500">{{ m.author }}</span> · {{ m.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Composer -->
      <form class="flex items-end gap-2 border-t border-gray-100 p-3" @submit.prevent="send">
        <textarea
          v-model="body"
          rows="1"
          placeholder="Type a message…"
          class="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-brand-500 focus:bg-white focus:outline-none"
          @keydown.enter.exact.prevent="send"
        />
        <button
          type="submit"
          :disabled="sending || !body.trim()"
          class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
          aria-label="Send"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
        </button>
      </form>
      <p v-if="error" class="px-4 pb-3 text-xs text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.chat-html :deep(p) { margin: 0; }
.chat-html :deep(a) { text-decoration: underline; }
</style>
