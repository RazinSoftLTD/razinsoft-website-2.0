<script setup lang="ts">
// Floating "back to top" button — appears once the user scrolls down a screen's worth.
const visible = ref(false)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY > 480
    ticking = false
  })
}

function toTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="btt">
    <button
      v-show="visible"
      type="button"
      aria-label="Back to top"
      class="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 sm:bottom-6 sm:right-6"
      @click="toTop"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
</style>
