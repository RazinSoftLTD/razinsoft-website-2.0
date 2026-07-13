<script setup lang="ts">
import { COUNTRIES } from '~/composables/useCountries'
type SlotInfo = { start: string; end: string; label: string; available: boolean }
type Config = {
  enabled: boolean
  working_days: number[]
  start_time: string
  end_time: string
  slot_minutes: number
  advance_days: number
  lead_hours: number
  min_date: string
  max_date: string
}

const { $api } = useNuxtApp()

useSeoMeta({
  title: 'Book a Meeting — Free Consultation with RazinSoft',
  description: 'Pick a date and an available time slot to book a free consultation with the RazinSoft team.',
})

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const pad = (n: number) => String(n).padStart(2, '0')
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// ── Config ──
const { data: config } = await useAsyncData<Config>('meeting-config', () => $api('/meetings/config'))

// ── Calendar state ──
const today = new Date()
const view = reactive({ year: today.getFullYear(), month: today.getMonth() })
const selectedDate = ref<string | null>(null)
const slots = ref<SlotInfo[]>([])
const selectedSlot = ref<SlotInfo | null>(null)
const loadingSlots = ref(false)

const SALES_PHONE = '+880 1711-257498'
const SALES_WA = 'https://wa.link/hfp42a'
const SALES_TG = 'https://t.me/razinsoft'


// Same contact channels as the Contact Us page.
const talkChannels = [
  { label: 'WhatsApp', value: SALES_PHONE, href: SALES_WA, img: '/icons/Whats-App-Support.webp' },
  { label: 'Telegram', value: SALES_PHONE, href: SALES_TG, img: '/icons/Teligram-Support.webp' },
  { label: 'Email', value: 'support@razinsoft.com', href: 'mailto:support@razinsoft.com', img: '/icons/Email-Support.webp' },
]

// ── Flow ──
const step = ref<'pick' | 'details' | 'done'>('pick')
const submitting = ref(false)
const errorMsg = ref('')
const confirmation = ref<any>(null)
const form = reactive({ name: '', email: '', phone: '', dial_code: '+880', company: '', notes: '' })

// Rich-text notes (contenteditable + execCommand toolbar)
const notesEl = ref<HTMLElement | null>(null)
function exec(cmd: string) {
  document.execCommand(cmd, false)
  if (notesEl.value) form.notes = notesEl.value.innerHTML
  notesEl.value?.focus()
}
function onNotesInput(e: Event) { form.notes = (e.target as HTMLElement).innerHTML }
// Restore notes into the editor whenever we (re)enter the details step.
watch(step, (v) => {
  if (v === 'details') nextTick(() => { if (notesEl.value) notesEl.value.innerHTML = form.notes || '' })
})

const monthCells = computed(() => {
  const first = new Date(view.year, view.month, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.year, view.month, d))
  return cells
})

function isSelectable(d: Date): boolean {
  if (!config.value?.enabled) return false
  const s = ymd(d)
  if (s < config.value.min_date || s > config.value.max_date) return false
  return config.value.working_days.includes(d.getDay())
}

const canPrevMonth = computed(() => {
  const firstOfView = `${view.year}-${pad(view.month + 1)}-01`
  return firstOfView > (config.value?.min_date ?? '')
})
const canNextMonth = computed(() => {
  const lastOfView = ymd(new Date(view.year, view.month + 1, 0))
  return lastOfView < (config.value?.max_date ?? '9999-12-31')
})
function prevMonth() { if (!canPrevMonth.value) return; if (view.month === 0) { view.month = 11; view.year-- } else view.month-- }
function nextMonth() { if (!canNextMonth.value) return; if (view.month === 11) { view.month = 0; view.year++ } else view.month++ }

async function pickDate(d: Date) {
  if (!isSelectable(d)) return
  selectedDate.value = ymd(d)
  selectedSlot.value = null
  loadingSlots.value = true
  slots.value = []
  try {
    const res = await $api<{ slots: SlotInfo[] }>('/meetings/availability', { params: { date: selectedDate.value } })
    slots.value = res.slots
  } catch { /* ignore */ }
  loadingSlots.value = false
}

function pickSlot(s: SlotInfo) {
  if (!s.available) return
  selectedSlot.value = s
  errorMsg.value = ''
  step.value = 'details'
}

const prettyDate = computed(() => {
  if (!selectedDate.value) return ''
  const d = new Date(selectedDate.value + 'T00:00:00')
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
})

async function submit() {
  errorMsg.value = ''
  if (!form.name.trim() || !form.email.trim()) { errorMsg.value = 'Please enter your name and email.'; return }
  submitting.value = true
  try {
    const res = await $api<{ ok: boolean; meeting: any }>('/meetings/book', {
      method: 'POST',
      body: { ...form, date: selectedDate.value, start: selectedSlot.value!.start },
    })
    confirmation.value = res.meeting
    step.value = 'done'
  } catch (e: any) {
    const errs = e?.data?.errors
    errorMsg.value = errs ? (Object.values(errs)[0] as string[])[0] : (e?.data?.message || 'Something went wrong. Please try again.')
    if (errs?.start && selectedDate.value) { await pickDate(new Date(selectedDate.value + 'T00:00:00')); step.value = 'pick' }
  } finally {
    submitting.value = false
  }
}

function reset() {
  step.value = 'pick'
  selectedSlot.value = null
  confirmation.value = null
  Object.assign(form, { name: '', email: '', phone: '', company: '', notes: '' })
}

const expect = [
  { title: 'Pick a slot', desc: 'Choose an open time on the calendar.', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z' },
  { title: 'Confirm your details', desc: 'Tell us a little about your project.', icon: 'M20 6 9 17l-5-5' },
  { title: 'Talk to our team', desc: '2 hours reserved — no obligation, totally free.', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z' },
]
</script>

<template>
  <div class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-6 top-6 select-none font-display text-[16rem] font-black leading-none text-brand-600/[0.06] sm:text-[20rem]" aria-hidden="true">R</span>
      <div class="container-page relative py-14 lg:py-16">
        <p class="text-sm font-bold uppercase tracking-widest text-brand-600">Book a Meeting</p>
        <h1 class="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Book your <span class="text-brand-600">free consultation.</span>
        </h1>
        <p class="mt-4 max-w-xl text-lg text-gray-600">Pick a date and an available slot below — it only takes a minute.</p>
      </div>
    </section>

    <div class="container-page pb-20">
      <div class="grid gap-8 lg:grid-cols-[340px_1fr]">
        <!-- Left: what to expect -->
        <aside class="space-y-6">
          <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
            <h2 class="font-display text-lg font-bold text-ink-900">Prefer to talk now?</h2>
            <p class="mt-1 text-sm text-gray-500">Chat with us on your preferred platform.</p>
            <ul class="mt-4 space-y-3">
              <li v-for="ch in talkChannels" :key="ch.label">
                <a :href="ch.href" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm">
                  <img :src="ch.img" :alt="ch.label" class="h-7 w-7 shrink-0 object-contain" width="28" height="28">
                  <span class="w-20 shrink-0 font-medium text-ink-800">{{ ch.label }}</span>
                  <span class="min-w-0 truncate text-gray-600 group-hover:text-ink-900">{{ ch.value }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-3">
              <span class="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 font-bold text-white">R</span>
              <div>
                <p class="font-bold text-ink-900">RazinSoft Consultation</p>
                <p class="text-sm text-gray-500">Free · 2 hours</p>
              </div>
            </div>
            <p class="mt-4 text-sm text-gray-600">Office hours {{ config?.start_time }}–{{ config?.end_time }}, Sunday to Thursday.</p>
            <ul class="mt-5 space-y-4">
              <li v-for="s in expect" :key="s.title" class="flex gap-3">
                <span class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="s.icon" /></svg>
                </span>
                <span>
                  <span class="block text-sm font-semibold text-ink-900">{{ s.title }}</span>
                  <span class="block text-sm text-gray-500">{{ s.desc }}</span>
                </span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Right: booking widget -->
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <!-- disabled -->
          <div v-if="config && !config.enabled" class="py-16 text-center">
            <p class="text-lg font-semibold text-ink-900">Booking is temporarily closed.</p>
            <p class="mt-1 text-gray-500">Please reach out to us directly and we’ll find a time.</p>
          </div>

          <!-- STEP: pick date + slot -->
          <div v-else-if="step === 'pick'" class="grid gap-8 md:grid-cols-2">
            <!-- Calendar -->
            <div>
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-bold text-ink-900">{{ MONTHS[view.month] }} {{ view.year }}</h2>
                <div class="flex gap-1">
                  <button type="button" @click="prevMonth" :disabled="!canPrevMonth" class="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:enabled:bg-gray-50">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button type="button" @click="nextMonth" :disabled="!canNextMonth" class="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:enabled:bg-gray-50">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400">
                <span v-for="w in WEEKDAYS" :key="w" class="py-1.5">{{ w }}</span>
              </div>
              <div class="mt-1 grid grid-cols-7 gap-1">
                <template v-for="(cell, i) in monthCells" :key="i">
                  <span v-if="!cell"></span>
                  <button
                    v-else type="button"
                    :disabled="!isSelectable(cell)"
                    @click="pickDate(cell)"
                    class="aspect-square rounded-lg text-sm font-medium transition"
                    :class="[
                      selectedDate === ymd(cell) ? 'bg-brand-600 text-white' :
                      isSelectable(cell) ? 'bg-brand-50 text-brand-700 hover:bg-brand-100' :
                      'text-gray-300 cursor-not-allowed',
                    ]"
                  >{{ cell.getDate() }}</button>
                </template>
              </div>
              <p class="mt-4 text-xs text-gray-400">Highlighted days are open for booking. Sunday–Thursday, office hours only.</p>
            </div>

            <!-- Slots -->
            <div class="md:border-l md:border-gray-100 md:pl-8">
              <div v-if="!selectedDate" class="flex h-full min-h-40 items-center justify-center text-center text-sm text-gray-400">
                Select a date to see available times.
              </div>
              <div v-else>
                <p class="mb-3 text-sm font-bold text-ink-900">{{ prettyDate }}</p>
                <div v-if="loadingSlots" class="text-sm text-gray-400">Loading…</div>
                <div v-else-if="!slots.length" class="text-sm text-gray-400">No slots available on this day.</div>
                <div v-else class="space-y-2">
                  <button
                    v-for="s in slots" :key="s.start" type="button"
                    :disabled="!s.available" @click="pickSlot(s)"
                    class="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition"
                    :class="s.available ? 'border-brand-200 text-brand-700 hover:border-brand-600 hover:bg-brand-50' : 'border-gray-100 text-gray-300 cursor-not-allowed'"
                  >
                    <span :class="{ 'line-through': !s.available }">{{ s.label }}</span>
                    <span v-if="!s.available" class="text-xs font-medium">Booked</span>
                    <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP: details -->
          <div v-else-if="step === 'details'" class="mx-auto max-w-lg">
            <button type="button" @click="step = 'pick'" class="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-ink-900">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="m15 18-6-6 6-6" /></svg> Back
            </button>
            <div class="mb-5 rounded-xl bg-brand-50 px-4 py-3">
              <p class="text-sm font-bold text-brand-700">{{ prettyDate }}</p>
              <p class="text-sm text-brand-600">{{ selectedSlot?.label }}</p>
            </div>

            <form @submit.prevent="submit" class="space-y-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink-900">Name <span class="text-red-500">*</span></label>
                  <input v-model="form.name" required class="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink-900">Email <span class="text-red-500">*</span></label>
                  <input v-model="form.email" type="email" required class="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink-900">Phone</label>
                  <div class="flex">
                    <select v-model="form.dial_code" class="h-11 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-2 text-sm focus:border-brand-600 focus:outline-none">
                      <option v-for="c in COUNTRIES" :key="c.code" :value="c.dial">{{ c.flag }} {{ c.dial }}</option>
                    </select>
                    <input v-model="form.phone" inputmode="numeric" placeholder="Phone number" class="h-11 w-full rounded-r-lg border border-gray-200 px-3 text-sm focus:border-brand-600 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink-900">Company</label>
                  <input v-model="form.company" class="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-ink-900">What would you like to discuss?</label>
                <div class="rounded-lg border border-gray-200 focus-within:border-brand-600">
                  <div class="flex items-center gap-1 border-b border-gray-100 px-2 py-1.5">
                    <button type="button" @click="exec('bold')" class="grid h-7 w-7 place-items-center rounded font-bold text-gray-600 hover:bg-gray-100" title="Bold">B</button>
                    <button type="button" @click="exec('italic')" class="grid h-7 w-7 place-items-center rounded italic text-gray-600 hover:bg-gray-100" title="Italic">I</button>
                    <button type="button" @click="exec('insertUnorderedList')" class="grid h-7 w-7 place-items-center rounded text-gray-600 hover:bg-gray-100" title="Bullet list">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                    </button>
                    <button type="button" @click="exec('insertOrderedList')" class="grid h-7 w-7 place-items-center rounded text-gray-600 hover:bg-gray-100" title="Numbered list">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 15a1 1 0 1 0-2 0M4 18l2-2a1 1 0 0 0-2-1" /></svg>
                    </button>
                  </div>
                  <div ref="notesEl" contenteditable="true" @input="onNotesInput"
                       data-placeholder="Tell us about your project, goals, or questions…"
                       class="notes-editor min-h-[6rem] px-3 py-2 text-sm focus:outline-none [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"></div>
                </div>
              </div>

              <p v-if="errorMsg" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{{ errorMsg }}</p>

              <button type="submit" :disabled="submitting" class="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
                {{ submitting ? 'Booking…' : 'Confirm booking' }}
              </button>
            </form>
          </div>

          <!-- STEP: done -->
          <div v-else class="mx-auto max-w-md py-8 text-center">
            <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            </span>
            <h2 class="mt-4 text-2xl font-extrabold text-ink-900">You’re booked!</h2>
            <p class="mt-2 text-gray-600">We’ve reserved your slot. A confirmation will be sent to <strong>{{ confirmation?.email }}</strong>.</p>
            <div class="mx-auto mt-5 max-w-xs rounded-xl border border-gray-100 bg-[#f7f9fc] p-4 text-left">
              <p class="text-sm font-bold text-ink-900">{{ confirmation?.day }}</p>
              <p class="text-sm text-brand-600">{{ confirmation?.slot }}</p>
            </div>
            <button type="button" @click="reset" class="mt-6 text-sm font-semibold text-brand-600 hover:underline">Book another meeting</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes-editor:empty::before {
  content: attr(data-placeholder);
  color: #9ca3af;
}
</style>
