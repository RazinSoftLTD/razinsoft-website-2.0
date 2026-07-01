<script setup lang="ts">
const { toasts, remove } = useToast()

const accent: Record<string, string> = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  info: 'border-l-brand-500',
}
const iconWrap: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-brand-100 text-brand-600',
}
</script>

<template>
  <ClientOnly>
    <div class="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[min(92vw,360px)] flex-col gap-2.5" aria-live="polite" aria-atomic="true">
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-6 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-200 ease-in absolute w-full"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-6 opacity-0"
        move-class="transition duration-200"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto flex items-start gap-3 rounded-xl border border-gray-100 border-l-4 bg-white p-3.5 shadow-lg shadow-black/5"
          :class="accent[t.type]"
          role="status"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg" :class="iconWrap[t.type]" aria-hidden="true">
            <svg v-if="t.type === 'success'" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            <svg v-else-if="t.type === 'error'" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8h.01M11 12h1v4h1M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" /></svg>
          </span>

          <div class="min-w-0 flex-1 pt-0.5">
            <p class="text-sm font-bold text-ink-900">{{ t.title }}</p>
            <p v-if="t.message" class="mt-0.5 truncate text-xs text-gray-500">{{ t.message }}</p>
          </div>

          <button type="button" class="shrink-0 rounded-md p-1 text-gray-300 transition hover:bg-gray-100 hover:text-gray-600" aria-label="Dismiss" @click="remove(t.id)">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </ClientOnly>
</template>
