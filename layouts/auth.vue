<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Top Navbar -->
    <AuthNavBar />

    <!-- Page Content — pb-16 prevents bottom nav overlapping content on mobile -->
    <main class="flex-1 p-6 pb-20 sm:pb-6">
      <slot />
    </main>

    <!-- Mobile Navigation — hidden on sm and above -->
    <MobileNav />
  </div>
</template>

<script setup lang="ts">
import AuthNavBar from "~/components/NavBars/AuthNavBar.vue"
import MobileNav  from "~/components/MobileNav.vue"
</script>
