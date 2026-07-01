<script setup lang="ts">
const socials = [
  { label: 'Google', path: 'M21.35 11.1H12v2.9h5.35c-.25 1.45-1.7 4.25-5.35 4.25A5.75 5.75 0 1 1 12 6.25c1.65 0 2.75.7 3.4 1.3l2.3-2.2C16.25 3.95 14.35 3 12 3a9 9 0 1 0 0 18c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1.05-.15-1.6Z' },
  { label: 'Facebook', path: 'M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z' },
  { label: 'LinkedIn', path: 'M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z' },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <button
      v-for="s in socials"
      :key="s.label"
      type="button"
      class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-ink-800 transition hover:bg-gray-50"
      :aria-label="`Continue with ${s.label}`"
    >
      <svg class="h-5 w-5" :class="s.label === 'Google' ? 'fill-current text-[#4285F4]' : s.label === 'Facebook' ? 'fill-current text-[#1877F2]' : 'fill-current text-[#0A66C2]'" viewBox="0 0 24 24" aria-hidden="true"><path :d="s.path" /></svg>
      <span class="hidden sm:inline">{{ s.label }}</span>
    </button>
  </div>
</template>
