<template>
  <div class="min-h-screen bg-[#f4f6fb] py-6 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-2xl border border-[#e4e8f3] bg-white shadow-xl lg:grid-cols-2">
      <!-- Left Branding Column -->
      <div class="relative hidden overflow-hidden bg-gradient-to-b from-[#eef2ff] to-[#e5ebff] p-10 lg:block">
        <div class="mb-8 flex items-center gap-3">
          <div class="h-9 w-9 rounded-lg bg-[#2f61c7] text-white grid place-content-center text-sm font-bold">LUMIERE</div>
          <p class="text-sm font-semibold text-[#1f2f53]">Skill Assessment &amp; Learning Platform</p>
        </div>
        <p class="mb-5 inline-block rounded-full bg-[#dce6ff] px-3 py-1 text-xs font-medium text-[#2f61c7]">
          Smart Assessments. Better Learning.
        </p>
        <h1 class="text-4xl font-bold leading-tight text-[#1c2b4a]">
          Assess skills.<br />
          Track progress.<br />
          <span class="text-[#2f61c7]">Drive growth.</span>
        </h1>
        <p class="mt-5 max-w-md text-sm leading-6 text-[#42557d]">
          Create assessments, manage courses, and unlock powerful insights all in one platform.
        </p>
      </div>

      <!-- Right Form Column -->
      <div class="flex items-center justify-center p-6 sm:p-10">
        <form class="w-full max-w-md space-y-5" @submit.prevent="login">
          <div class="text-right text-sm text-[#4f5f81]">
            Don't have an account?
            <button type="button" class="font-semibold text-[#2f61c7] hover:underline" @click="goToSignup">Create one</button>
          </div>

          <div>
            <h2 class="text-3xl font-bold text-[#1c2b4a]">Welcome Back</h2>
            <p class="mt-1 text-sm text-[#5a6b8f]">Sign in to continue your learning journey.</p>
          </div>

          <div class="space-y-4">
            <input v-model="email" type="email" placeholder="Work Email" class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
            <input v-model="password" type="password" placeholder="Password" class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
          </div>
          
          <!-- Error message -->
          <p v-if="error" class="text-red-500 text-sm text-center -mt-2">{{ error }}</p>

          <div class="text-right">
            <button type="button" class="text-sm font-medium text-[#2f61c7] hover:underline" @click="goToForgotPassword">
              Forgot password?
            </button>
          </div>

          <!-- Updated button to disable during loading states too -->
          <button
            type="submit"
            class="w-full rounded-lg bg-[#2f61c7] py-3 text-sm font-semibold text-white transition hover:bg-[#254ea2] disabled:cursor-not-allowed disabled:opacity-60"
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

const goToSignup = () => navigateTo("/"); // Changed from "/" assuming root isn't registration
const goToForgotPassword = () => navigateTo("/forgot-password"); // Changed from "/authentication"

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
    
    console.log("✅ Login successful:", data)
    setAuth(data)
    navigateTo('/dashboard')
    
  } catch (err: any) {
    console.error("Login error:", err)
    error.value = err?.data?.error || err?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
};
</script>