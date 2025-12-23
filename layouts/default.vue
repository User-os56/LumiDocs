<template>
  <div class="overflow-hidden">
    <div class="flex flex-row w-screen min-h-screen">
      <div class="bg-[#9D7133] z-30">
        <NavBar v-if="route.path !== '/dashboard'" />
      </div>
      <main class="flex-1 overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/NavBars/NavBar.vue";
const route = useRoute();
</script>