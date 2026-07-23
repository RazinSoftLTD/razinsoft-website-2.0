<script setup lang="ts">
defineProps<{ percentOff: number }>()
</script>

<template>
  <span class="absolute left-3 top-3 z-10 rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
    {{ percentOff }}% OFF
  </span>
</template>
