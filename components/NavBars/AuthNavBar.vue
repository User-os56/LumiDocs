<template>
  <header
    data-aos="fade-down"
    class="sticky top-0 w-full z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 shadow-2xl transition-all"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand Logo & Platform Title -->
      <NuxtLink to="/dashboard" class="flex items-center gap-3 group">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:border-amber-500/50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-amber-400">
            <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Zm-8 3h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Z" />
          </svg>
        </div>
        <div class="leading-tight">
          <p class="text-sm font-extrabold tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            LUMIERE
          </p>
          <p class="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            AI Skill Engine
          </p>
        </div>
      </NuxtLink>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-1 text-xs font-semibold">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="px-3.5 py-2 rounded-xl transition-all duration-200"
          :class="
            isActive(link.to)
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Actions & Status -->
      <div class="flex items-center gap-3">
        
        <!-- Live Connection Indicator -->
        <div class="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-300">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Live
        </div>

        <!-- Notifications Toggle -->
        <button 
          type="button" 
          aria-label="Notifications"
          class="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/60 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m3 0v1a2 2 0 1 1-4 0v-1m4 0h-4" />
          </svg>
        </button>

        <!-- User Profile Avatar -->
        <NuxtLink 
          to="/profile"
          class="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 p-0.5 shadow-sm hover:border-amber-500/40 transition-all overflow-hidden flex items-center justify-center"
        >
          <img 
            src="https://i.pravatar.cc/100" 
            alt="User Profile Avatar" 
            class="h-full w-full rounded-[10px] object-cover" 
          />
        </NuxtLink>

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
  { label: "Documents", to: "/documents" },
  { label: "Profile", to: "/profile" },
  { label: "History", to: "/assessments/history" },
];

const isActive = (to: string) => {
  return route.path === to || (to !== '/' && route.path.startsWith(`${to}/`));
};
</script>