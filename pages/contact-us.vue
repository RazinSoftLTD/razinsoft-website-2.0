<script setup lang="ts">
usePageSeo({
  title: 'Contact — SmartDesk',
  description: 'Questions before you buy, or help after. The people who answer are the people who wrote it.',
})

const { $api } = useNuxtApp()
const toast = useToast()

/**
 * Two reasons anyone writes to a product site, and they want different things.
 *
 * The old form asked for a service and a budget range, which is what an agency needs to qualify a
 * lead. A buyer asking whether SmartDesk runs on shared hosting has no budget to give, and being
 * asked for one reads as being sized up.
 */
const topics = [
  { value: 'presale', label: 'Before I buy', hint: 'Will it do X? Will it run on my host?' },
  { value: 'support', label: 'I already own it', hint: 'Something is not working, or I am stuck.' },
  { value: 'licence', label: 'Licensing', hint: 'Which licence covers what I am building.' },
  { value: 'other', label: 'Something else', hint: '' },
]

const form = reactive({ topic: 'presale', name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const canSend = computed(() => !!form.name.trim() && !!form.email.trim() && form.message.trim().length > 9)

async function send() {
  if (!canSend.value || sending.value) return
  sending.value = true

  try {
    // The endpoint still expects a `service` field; the topic is the honest thing to put in it.
    await $api('/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        service: topics.find((t) => t.value === form.topic)?.label,
        message: form.message,
      },
    })
    sent.value = true
    Object.assign(form, { topic: 'presale', name: '', email: '', message: '' })
  } catch (e: any) {
    toast.error(e?.data?.message || 'That did not send. Try again, or email us directly.')
  } finally {
    sending.value = false
  }
}

const field = 'h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-ink-900 transition placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
</script>

<template>
  <div class="bg-white">
    <div class="container-page py-16 lg:py-24">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <!-- ───────── What to expect ───────── -->
        <div>
          <h1 class="font-display text-4xl font-extrabold text-ink-900 sm:text-5xl">
            Ask us anything
          </h1>
          <p class="mt-4 text-lg leading-relaxed text-gray-600">
            Before you buy or after — the people who answer are the people who wrote it. No sales
            desk in between.
          </p>

          <div class="mt-10 space-y-6">
            <div v-for="e in [
              { t: 'Within one working day', d: 'Usually much sooner. We are in Dhaka, GMT+6, so a message sent overnight from Europe or the US is normally answered by the time you are up.' },
              { t: 'Ask the hard questions', d: 'Whether it runs on your host, whether it does the one thing you actually need, whether the licence covers your plan. Better answered now than after paying.' },
              { t: 'Already a customer?', d: 'Support tickets from inside your account get to us with your licence and install details attached, which is faster than starting here.' },
            ]" :key="e.t" class="border-l-2 border-gray-100 pl-5">
              <p class="font-bold text-ink-900">{{ e.t }}</p>
              <p class="mt-1 text-sm leading-relaxed text-gray-600">{{ e.d }}</p>
            </div>
          </div>

          <div class="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <p class="text-sm text-gray-600">
              Prefer email?
              <a href="mailto:support@razinsoft.com" class="font-semibold text-brand-600 hover:text-brand-700">support@razinsoft.com</a>
            </p>
            <p class="mt-1 text-sm text-gray-500">
              Most of what people ask is already answered in the
              <NuxtLink to="/#pricing" class="font-semibold text-ink-900 hover:text-brand-600">questions on the home page</NuxtLink>.
            </p>
          </div>
        </div>

        <!-- ───────── The form ───────── -->
        <div>
          <div v-if="sent" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <span class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <p class="mt-4 font-display text-xl font-bold text-ink-900">That reached us</p>
            <p class="mt-2 text-sm text-gray-600">We will reply within a working day, to the address you gave.</p>
            <button type="button" class="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700" @click="sent = false">
              Send another
            </button>
          </div>

          <form v-else class="rounded-2xl border border-gray-100 p-7 shadow-sm" @submit.prevent="send">
            <p class="mb-2 text-sm font-semibold text-ink-900">What is this about?</p>
            <div class="mb-6 grid gap-2.5 sm:grid-cols-2">
              <label v-for="t in topics" :key="t.value"
                     class="cursor-pointer rounded-xl border p-3.5 transition"
                     :class="form.topic === t.value ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'">
                <input v-model="form.topic" type="radio" :value="t.value" class="sr-only" />
                <span class="block text-sm font-bold text-ink-900">{{ t.label }}</span>
                <span v-if="t.hint" class="mt-0.5 block text-xs leading-relaxed text-gray-500">{{ t.hint }}</span>
              </label>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="c-name" class="mb-1.5 block text-sm font-medium text-ink-800">Name <span class="text-red-500">*</span></label>
                <input id="c-name" v-model="form.name" type="text" required autocomplete="name" :class="field" />
              </div>
              <div>
                <label for="c-email" class="mb-1.5 block text-sm font-medium text-ink-800">Email <span class="text-red-500">*</span></label>
                <input id="c-email" v-model="form.email" type="email" required autocomplete="email" :class="field" />
              </div>
            </div>

            <div class="mt-4">
              <label for="c-msg" class="mb-1.5 block text-sm font-medium text-ink-800">Your question <span class="text-red-500">*</span></label>
              <textarea id="c-msg" v-model="form.message" rows="6" required
                        placeholder="The more specific, the better an answer we can give."
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-ink-900 transition placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"></textarea>
            </div>

            <button type="submit" :disabled="!canSend || sending"
                    class="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-50">
              {{ sending ? 'Sending…' : 'Send' }}
            </button>

            <p class="mt-3 text-center text-xs text-gray-400">We only use this to reply. No list, no follow-up sequence.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
