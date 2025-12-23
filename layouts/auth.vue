<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Top Navbar -->
    <AuthNavBar />

    <!-- Page Content -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AuthNavBar from "~/components/NavBars/AuthNavBar.vue";
</script>