<template>
  <div class="min-h-screen bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans text-slate-100">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl lg:grid-cols-2">

      <!-- Left Decorative Panel -->
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

      <!-- Right Panel: Auth Forms -->
      <div class="flex items-center justify-center p-6 sm:p-10 bg-slate-950/40">

        <!-- STEP 1: Registration Form -->
        <form v-if="step === 1" class="w-full max-w-md space-y-5" @submit.prevent="sendCode">
          <div class="text-right text-xs text-slate-400">
            Already have an account?
            <button type="button" class="font-bold text-amber-400 hover:underline ml-1" @click="goToLogin">Sign in</button>
          </div>

          <div>
            <h2 class="text-3xl font-extrabold text-white tracking-tight">Create Your Account</h2>
            <p class="mt-1 text-xs text-slate-400">Get started with automated AI study prep in seconds.</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input v-model="form.fullName" type="text" placeholder="John Doe"
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input v-model="form.email" type="email" placeholder="name@domain.com"
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input v-model="form.password" type="password" placeholder="At least 8 characters"
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
              <input v-model="form.confirmPassword" type="password" placeholder="Re-enter password"
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50" />
            </div>
          </div>

          <label class="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
            <input v-model="form.agreed" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500/20" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <p v-if="error" class="text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">{{ error }}</p>

          <button type="submit"
            class="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-3 text-xs font-bold text-slate-950 transition-all shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!isFormValid || loading">
            {{ loading ? 'Sending code...' : 'Send Verification Code' }}
          </button>
        </form>

        <!-- STEP 2: Verification Code -->
        <form v-else-if="step === 2" class="w-full max-w-md space-y-5" @submit.prevent="completeRegistration">
          <div>
            <h2 class="text-3xl font-extrabold text-white tracking-tight">Check Your Email</h2>
            <p class="mt-1 text-xs text-slate-400 leading-relaxed">
              We sent a 6-digit verification code to <strong class="text-amber-400 font-semibold">{{ form.email }}</strong>.
            </p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2 text-center">Verification Code</label>
            <input v-model="form.verificationCode" type="text" placeholder="000000"
              maxlength="6"
              class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5 text-slate-100 outline-none transition focus:border-amber-500/50 tracking-widest text-center text-xl font-mono" />
          </div>

          <p v-if="error" class="text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">{{ error }}</p>

          <button type="submit"
            class="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-3 text-xs font-bold text-slate-950 transition-all shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading || form.verificationCode.length < 6">
            {{ loading ? 'Verifying...' : 'Verify & Create Account' }}
          </button>

          <p class="text-center text-xs text-slate-400">
            Didn't receive the code?
            <button type="button" class="font-bold text-amber-400 hover:underline ml-1" @click="sendCode">
              Resend
            </button>
          </p>

          <button type="button" class="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors text-center" @click="step = 1">
            ← Edit Registration Details
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

import { computed, reactive, ref } from 'vue'

const { setAuth, apiCall } = useAuth()

const step    = ref(1)
const loading = ref(false)
const error   = ref('')

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreed: false,
  verificationCode: ''
})

const isFormValid = computed(() =>
  form.fullName.trim() &&
  form.email.trim() &&
  form.password.trim() &&
  form.confirmPassword.trim() &&
  form.password === form.confirmPassword &&
  form.password.length >= 8 &&
  form.agreed
)

// STEP 1: Send verification code
const sendCode = async () => {
  error.value = ''
  loading.value = true
  try {
    await apiCall('/api/auth/send-code/', {
      method: 'POST',
      body: { email: form.email }
    })
    step.value = 2
  } catch (err: any) {
    error.value = err?.data?.error || 'Failed to send code. Please try again.'
  } finally {
    loading.value = false
  }
}

// STEP 2: Verify code and register
const completeRegistration = async () => {
  error.value = ''
  if (!form.verificationCode || form.verificationCode.length < 6) {
    error.value = 'Please enter the full 6-digit code.'
    return
  }
  loading.value = true
  try {
    const data = await apiCall('/api/auth/register/', {
      method: 'POST',
      body: {
        full_name: form.fullName,
        email:     form.email,
        password:  form.password,
        code:      form.verificationCode
      }
    })
    setAuth(data)
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.error || 'Verification failed. Please check the code.'
  } finally {
    loading.value = false
  }
}

const goToLogin = () => navigateTo('/login')
</script>