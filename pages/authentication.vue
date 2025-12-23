<template>
  <div class="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 py-8">
    <div
      class="absolute inset-0 bg-[url('../../assets/images/LEARN.jpg')] bg-cover opacity-10 z-0"
    ></div>
    <div class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0"></div>

    <div class="relative z-10 w-full max-w-xl sm:max-w-2xl">
      <authModal class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import authModal from "../components/authModal.vue";
</script>
