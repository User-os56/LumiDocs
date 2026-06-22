<!-- components/PageLoader.vue -->
<!-- Drop this in your components/ folder and use it on any page -->
<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff]">
    <!-- Spinning ring -->
    <div class="relative h-16 w-16">
      <div class="absolute inset-0 rounded-full border-4 border-[#e6edff]"></div>
      <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2f61c7] animate-spin"></div>
      <!-- Inner dot -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="h-4 w-4 rounded-full bg-[#2f61c7] animate-pulse"></div>
      </div>
    </div>
    <!-- LUMIERE wordmark -->
    <div class="mt-6 flex items-center gap-2">
      <div class="h-7 w-7 rounded-lg bg-[#2f61c7] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-4 w-4">
          <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Zm-8 3h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Z"/>
        </svg>
      </div>
      <span class="text-sm font-semibold text-[#2d4570] tracking-wide">LUMIERE</span>
    </div>
    <p class="mt-2 text-xs text-[#7890b8]">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'Loading...' }
})
</script>
