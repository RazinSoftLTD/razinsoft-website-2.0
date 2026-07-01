<script setup lang="ts">
const props = defineProps<{ url: string; order?: string }>()
const emit = defineEmits<{ success: [order?: string]; cancel: [order?: string] }>()

// The gateway/dev-pay flow ends by redirecting the iframe to our own /payment/* pages,
// which post a message back here. We only trust messages from our own origin.
function onMessage(e: MessageEvent) {
  if (e.origin !== window.location.origin) return
  const d = e.data
  if (!d || d.type !== 'rzn-pay') return
  if (d.status === 'success') emit('success', d.order ?? props.order)
  else if (d.status === 'cancel') emit('cancel', d.order ?? props.order)
}

onMounted(() => {
  window.addEventListener('message', onMessage)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Secure payment">
    <div class="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <header class="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <p class="flex items-center gap-2 font-display font-bold text-ink-900">
          <svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Secure Payment
        </p>
        <button type="button" class="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-ink-900" aria-label="Cancel and close payment" @click="emit('cancel', props.order)">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </header>
      <iframe :src="url" class="w-full flex-1 border-0" title="Payment checkout" />
    </div>
  </div>
</template>
