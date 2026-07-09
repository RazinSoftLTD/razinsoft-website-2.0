<script setup lang="ts">
// Searchable country dial-code picker. v-model = ISO country code (e.g. 'BD').
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const { countries } = useCountries()

const open = ref(false)
const search = ref('')
const root = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

const selected = computed(() => countries.find((c) => c.code === props.modelValue) ?? countries[0])
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return countries
  const dq = q.replace(/[^\d+]/g, '')
  return countries.filter(
    (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || (dq && c.dial.includes(dq)),
  )
})

function toggle() {
  open.value = !open.value
  if (open.value) { search.value = ''; nextTick(() => searchInput.value?.focus()) }
}
function choose(code: string) {
  emit('update:modelValue', code)
  open.value = false
}
function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex h-11 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm text-ink-900 transition focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="text-base leading-none">{{ selected.flag }}</span>
      <span class="font-medium">{{ selected.dial }}</span>
      <svg class="h-4 w-4 text-gray-400 transition" :class="open ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
    </button>

    <div v-if="open" class="absolute left-0 top-full z-40 mt-1 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div class="border-b border-gray-100 p-2">
        <div class="relative">
          <svg class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="m20 20-3-3" /></svg>
          <input
            ref="searchInput"
            v-model="search"
            type="text"
            placeholder="Search country…"
            class="h-9 w-full rounded-lg border border-gray-200 pl-8 pr-3 text-sm text-ink-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            @keydown.esc="open = false"
            @keydown.enter.prevent="filtered[0] && choose(filtered[0].code)"
          >
        </div>
      </div>
      <ul class="max-h-56 overflow-y-auto py-1" role="listbox">
        <li v-for="c in filtered" :key="c.code">
          <button
            type="button"
            class="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition"
            :class="c.code === modelValue ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-gray-50'"
            @click="choose(c.code)"
          >
            <span class="text-base leading-none">{{ c.flag }}</span>
            <span class="min-w-0 flex-1 truncate">{{ c.name }}</span>
            <span class="text-gray-400">{{ c.dial }}</span>
          </button>
        </li>
        <li v-if="!filtered.length" class="px-3 py-6 text-center text-sm text-gray-400">No country found</li>
      </ul>
    </div>
  </div>
</template>
