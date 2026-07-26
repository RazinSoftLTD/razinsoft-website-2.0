<script setup lang="ts">
// Searchable country picker for addresses. v-model = the country NAME (e.g. 'Bangladesh'),
// because that is what the billing address stores and what Stripe is sent.
const props = withDefaults(defineProps<{ modelValue: string; id?: string; placeholder?: string }>(), {
  placeholder: 'Select a country',
})
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const { search, byName } = useCountryNames()

const open = ref(false)
const query = ref('')
const root = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const listbox = ref<HTMLElement | null>(null)
const active = ref(0)

const selected = computed(() => byName(props.modelValue))
const results = computed(() => search(query.value))

function toggle() {
  open.value = !open.value
  if (open.value) {
    query.value = ''
    active.value = Math.max(0, results.value.findIndex((c) => c.name === props.modelValue))
    nextTick(() => searchInput.value?.focus())
  }
}

function choose(name: string) {
  emit('update:modelValue', name)
  open.value = false
}

/** Arrow keys move through the results; Enter picks the highlighted one. */
function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = results.value.length
    if (!n) return
    active.value = (active.value + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
    nextTick(() => listbox.value?.querySelector<HTMLElement>(`[data-i="${active.value}"]`)?.scrollIntoView({ block: 'nearest' }))
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const c = results.value[active.value]
    if (c) choose(c.name)
  } else if (e.key === 'Escape') {
    open.value = false
  }
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
      :id="id"
      type="button"
      class="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-left text-sm text-ink-900 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      @click="toggle"
    >
      <span v-if="selected" class="flex min-w-0 items-center gap-2">
        <span>{{ selected.flag }}</span>
        <span class="truncate">{{ selected.name }}</span>
      </span>
      <span v-else class="text-gray-400">{{ placeholder }}</span>
      <svg class="h-4 w-4 shrink-0 text-gray-400 transition" :class="open && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-show="open" class="absolute left-0 right-0 z-30 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
      <div class="border-b border-gray-100 p-2">
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Search country…"
          class="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-brand-500 focus:outline-none"
          @keydown="onKey"
        />
      </div>
      <ul ref="listbox" class="max-h-60 overflow-auto py-1 text-sm">
        <li v-for="(c, i) in results" :key="c.code" :data-i="i">
          <button
            type="button"
            class="flex w-full items-center gap-2 px-3 py-2 text-left"
            :class="[c.name === modelValue ? 'bg-brand-50 font-semibold text-brand-700' : i === active ? 'bg-gray-50' : 'hover:bg-gray-50']"
            @click="choose(c.name)"
          >
            <span>{{ c.flag }}</span>
            <span class="truncate">{{ c.name }}</span>
          </button>
        </li>
        <li v-if="!results.length" class="px-3 py-3 text-sm text-gray-400">No country matches “{{ query }}”.</li>
      </ul>
    </div>
  </div>
</template>
