<script setup lang="ts">
/**
 * Always-on WhatsApp button, bottom right.
 *
 * Sits below BackToTop rather than beside it: both live in the same corner, but this one is always
 * there while BackToTop only appears after a screen of scrolling, so the fixed slot belongs to this
 * and BackToTop stacks above it (see the bottom-* classes there).
 *
 * The message is prefilled — landing in an empty thread is where most of these buttons lose people.
 */
const NUMBER = '8801937203743'
const MESSAGE = 'Hello RazinSoft, I would like to know more about your services.'

const href = computed(() => `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`)
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    aria-label="Chat with us on WhatsApp"
    class="group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
  >
    <!-- WhatsApp's own mark, so it is recognised at a glance. -->
    <svg class="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.105.549 4.16 1.595 5.971L0 24l6.305-1.654a11.94 11.94 0 0 0 5.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.87 11.87 0 0 0-3.45-8.406" />
    </svg>

    <!-- Label on hover, desktop only: on a phone it would cover the page. -->
    <span
      class="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink-900 px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block"
    >
      Chat on WhatsApp
    </span>
  </a>
</template>
