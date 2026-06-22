<template>
  <header
    data-aos="fade-down"
    class="w-full z-30 bg-gradient-to-r from-[#2f61c7] via-[#2a58b7] to-[#1f4ba5] text-white shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand -->
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
            <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Zm-8 3h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Z" />
          </svg>
        </div>
        <div class="leading-tight">
          <p class="text-sm font-semibold">LUMIERE</p>
          <p class="text-xs text-white/80">Skill Assessment & Learning Platform</p>
        </div>
      </div>

      <!-- Desktop links -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="relative px-2 py-1 rounded-lg transition group"
          :class="
            isActive(link.to)
              ? 'bg-white text-[#2f61c7] shadow-sm'
              : 'text-white/90 hover:text-white'
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Right: actions -->
      <div class="flex items-center gap-3 sm:gap-4">
        <button class="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold shadow hover:bg-white/20 transition">
          <span class="h-2 w-2 rounded-full bg-[#1fa97a] shadow-[0_0_0_4px_rgba(31,169,122,0.18)]"></span>
          Connected
        </button>
        <button class="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m3 0v1a2 2 0 1 1-4 0v-1m4 0h-4" />
          </svg>
        </button>
        <div class="h-10 w-10 rounded-full bg-white border border-white/30 shadow flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/100" alt="profile" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "#app";

const route = useRoute();
const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Assessments", to: "/assessments/onboarding" },
  { label: "Recommendations", to: "/recommendations" },
  { label: "Profile", to: "/profile"},
];

const isActive = (to: string) => {
  // Simple startsWith match so nested routes also underline
  return route.path === to || route.path.startsWith(`${to}/`);
};
</script>
