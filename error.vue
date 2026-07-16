<script setup lang="ts">
const error = useError()
const route = useRoute()

const code = computed(() => Number(error.value?.statusCode) || 500)
const heading = computed(() =>
  code.value === 404 ? 'Page not found' : code.value >= 500 ? 'Something went wrong' : 'Request error',
)
const message = computed(() =>
  code.value === 404
    ? 'The page you’re looking for doesn’t exist or may have been moved.'
    : 'An unexpected error occurred. Please try again, or head back home.',
)

// Report the error-page view to the activity tracker (fire-and-forget).
onMounted(() => {
  try {
    const { $api } = useNuxtApp() as unknown as { $api: typeof $fetch }
    $api('/track/visit', {
      method: 'POST',
      body: {
        path: route.fullPath,
        title: `Error ${code.value}`,
        error: code.value,
        referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      },
    }).catch(() => {})
  } catch {}
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center">
    <p class="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-8xl font-extrabold text-transparent">
      {{ code }}
    </p>
    <h1 class="mt-4 text-2xl font-bold text-white">{{ heading }}</h1>
    <p class="mt-2 max-w-md text-sm text-slate-400">{{ message }}</p>
    <div class="mt-8 flex gap-3">
      <button
        class="rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        @click="goHome"
      >
        Back to Home
      </button>
      <NuxtLink
        to="/contact-us"
        class="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
        @click="clearError()"
      >
        Contact Support
      </NuxtLink>
    </div>
  </div>
</template>
