<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-4xl mx-auto space-y-8">
    <!-- Header Card -->
    <div class="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-4">
      <h1 class="text-3xl font-extrabold text-slate-100">Assessment Complete</h1>
      <div class="inline-block p-6 rounded-full bg-amber-500/10 border border-amber-500/30">
        <span class="text-5xl font-black text-amber-400">{{ results?.score || 0 }}%</span>
      </div>
      <p class="text-slate-400">
        You answered <strong class="text-slate-200">{{ results?.correct_count || 0 }}</strong> out of 
        <strong class="text-slate-200">{{ results?.total_count || 0 }}</strong> questions correctly.
      </p>
    </div>

    <!-- Actions -->
    <div class="flex justify-center gap-4">
      <NuxtLink 
        to="/dashboard" 
        class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition"
      >
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const results = ref(history.state?.resultData || null)
</script>