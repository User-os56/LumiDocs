<template>
  <div class="min-h-screen bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans text-slate-100">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl lg:grid-cols-2">
      
      <!-- Left Branding Column -->
      <div class="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 lg:flex lg:flex-col lg:justify-between border-r border-slate-800">
        <!-- Glowing Ambient Lights -->
        <div class="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <!-- Brand Badge -->
          <div class="mb-8 flex items-center gap-3">
            <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-slate-950 grid place-content-center text-xs font-black shadow-lg shadow-amber-500/20">
              LM
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400">AI Quiz Intelligence</p>
          </div>

          <p class="mb-6 inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-semibold text-amber-400">
            Document-Driven Assessments
          </p>

          <h1 class="text-4xl font-extrabold leading-tight text-white tracking-tight">
            Upload slides.<br />
            Generate tests.<br />
            <span class="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Master any subject.</span>
          </h1>

          <p class="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
            Turn lecture slides, PDFs, and notes into instant multiple-choice assessments using Groq AI.
          </p>
        </div>

        <div class="text-xs text-slate-500">
          Powered by LUMIERE AI Engine
        </div>
      </div>

      <!-- Right Form Column -->
      <div class="flex items-center justify-center p-6 sm:p-10 bg-slate-950/40">
        <form class="w-full max-w-md space-y-5" @submit.prevent="login">
          <div class="text-right text-xs text-slate-400">
            Don't have an account?
            <button type="button" class="font-bold text-amber-400 hover:underline ml-1" @click="goToSignup">Create one</button>
          </div>

          <div>
            <h2 class="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
            <p class="mt-1 text-xs text-slate-400">Sign in to access your workspace and quiz history.</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input 
                v-model="email" 
                type="email" 
                placeholder="name@domain.com" 
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" 
              />
            </div>
            
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-semibold text-slate-300">Password</label>
                <button type="button" class="text-xs font-semibold text-amber-400 hover:underline" @click="goToForgotPassword">
                  Forgot password?
                </button>
              </div>
              <input 
                v-model="password" 
                type="password" 
                placeholder="Enter your password" 
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" 
              />
            </div>
          </div>
          
          <!-- Error message -->
          <p v-if="error" class="text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">{{ error }}</p>

          <button
            type="submit"
            class="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-3 text-xs font-bold text-slate-950 transition-all shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!isLoginValid || loading"
          >
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuth } from '../composables/useAuth'

definePageMeta({
  layout: false,
});

const { apiCall, setAuth } = useAuth()
const email = ref("");
const password = ref("");
const loading = ref(false)
const error = ref('')

const isLoginValid = computed(() => email.value.trim() && password.value.trim());

const goToSignup = () => navigateTo("/"); 
const goToForgotPassword = () => navigateTo("/forgot-password"); 

const login = async () => {
  if (!isLoginValid.value) return
  
  error.value = ''
  loading.value = true
  
  try {
    const data = await apiCall('/api/auth/login/', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        password: password.value
      }
    })
    
    setAuth(data)
    navigateTo('/dashboard')
    
  } catch (err: any) {
    error.value = err?.data?.error || err?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
};
</script>