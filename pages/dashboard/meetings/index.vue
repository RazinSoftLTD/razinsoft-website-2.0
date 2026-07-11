<script setup lang="ts">
usePageSeo({ title: 'My Meetings', description: 'Your booked consultations with RazinSoft.' })

const { $api } = useNuxtApp()
const { data: res } = await useAsyncData('account-meetings', () => $api<any>('/account/meetings'))
const meetings = computed<any[]>(() => res.value?.data || [])

const badge: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700', confirmed: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-50 text-red-600',
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-3xl font-extrabold text-ink-900">My Meetings</h1>
        <p class="mt-1 text-gray-500">Your booked consultations with the RazinSoft team.</p>
      </div>
      <NuxtLink to="/book-a-meeting" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg>
        Book a meeting
      </NuxtLink>
    </div>

    <p v-if="!meetings.length" class="mt-6 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
      You haven’t booked any meetings yet.
    </p>

    <ul v-else class="mt-6 space-y-4">
      <li v-for="m in meetings" :key="m.id">
        <div class="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /></svg>
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-display font-bold text-ink-900">{{ m.day }}</p>
            <p class="mt-0.5 text-sm text-gray-400">
              {{ m.slot }}<span v-if="m.host"> · with {{ m.host }}</span>
            </p>
          </div>
          <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize" :class="badge[m.status] || 'bg-gray-100 text-gray-600'">{{ m.status }}</span>
          <a v-if="m.meeting_link && m.is_upcoming" :href="m.meeting_link" target="_blank" rel="noopener"
             class="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Join
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
