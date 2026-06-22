<template>
  <div class="min-h-screen bg-[#f4f6fb] py-6 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-2xl border border-[#e4e8f3] bg-white shadow-xl lg:grid-cols-2">
 
      <!-- Left decorative panel — unchanged -->
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
 
      <!-- Right panel -->
      <div class="flex items-center justify-center p-6 sm:p-10">
 
        <!-- STEP 1: Registration form -->
        <form v-if="step === 1" class="w-full max-w-md space-y-5" @submit.prevent="sendCode">
          <div class="text-right text-sm text-[#4f5f81]">
            Already have an account?
            <button type="button" class="font-semibold text-[#2f61c7] hover:underline" @click="goToLogin">Sign in</button>
          </div>
 
          <div>
            <h2 class="text-3xl font-bold text-[#1c2b4a]">Create Your Account</h2>
            <p class="mt-1 text-sm text-[#5a6b8f]">Join the platform and get started in minutes.</p>
          </div>
 
          <div class="space-y-4">
            <input v-model="form.fullName" type="text" placeholder="Full Name"
              class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
 
            <input v-model="form.email" type="email" placeholder="Email Address"
              class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
 
            <div ref="departmentDropdownRef" class="relative">
              <button type="button"
                class="flex w-full items-center justify-between rounded-lg border border-[#dbe2f1] bg-white px-4 py-3 text-left text-sm outline-none transition focus:border-[#2f61c7]"
                :class="form.department ? 'text-[#1f2f53]' : 'text-[#8a96b5]'"
                @click.stop="departmentOpen = !departmentOpen">
                <span>{{ form.department || 'Select department' }}</span>
                <svg class="h-4 w-4 shrink-0 text-[#5a6b8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul v-show="departmentOpen"
                class="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-auto rounded-lg border border-[#dbe2f1] bg-white py-1 shadow-lg">
                <li v-for="dept in departmentOptions" :key="dept"
                  class="cursor-pointer px-4 py-2.5 text-sm text-[#1f2f53] transition hover:bg-[#eef2ff]"
                  :class="{ 'bg-[#eef2ff] font-medium text-[#2f61c7]': form.department === dept }"
                  @click="selectDepartment(dept)">
                  {{ dept }}
                </li>
              </ul>
            </div>
 
            <input v-model="form.password" type="password" placeholder="Password"
              class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
 
            <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password"
              class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
 
            <input v-model="form.organization" type="text" placeholder="Organization / Institution (Optional)"
              class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7]" />
          </div>
 
          <label class="flex items-start gap-2 text-xs text-[#5a6b8f]">
            <input v-model="form.agreed" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-[#c8d3eb] text-[#2f61c7]" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
 
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
 
          <button type="submit"
            class="w-full rounded-lg bg-[#2f61c7] py-3 text-sm font-semibold text-white transition hover:bg-[#254ea2] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="!isFormValid || loading">
            {{ loading ? 'Sending code...' : 'Send Code' }}
          </button>
        </form>
 
        <!-- STEP 2: Enter verification code -->
        <form v-else-if="step === 2" class="w-full max-w-md space-y-5" @submit.prevent="completeRegistration">
          <div>
            <h2 class="text-3xl font-bold text-[#1c2b4a]">Check Your Email</h2>
            <p class="mt-1 text-sm text-[#5a6b8f]">
              We sent a 6-digit verification code to <strong>{{ form.email }}</strong>.
              It expires in 10 minutes.
            </p>
          </div>
 
          <input v-model="form.verificationCode" type="text" placeholder="Enter 6-digit code"
            maxlength="6"
            class="w-full rounded-lg border border-[#dbe2f1] px-4 py-3 text-sm outline-none transition focus:border-[#2f61c7] tracking-widest text-center text-lg" />
 
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
 
          <button type="submit"
            class="w-full rounded-lg bg-[#2f61c7] py-3 text-sm font-semibold text-white transition hover:bg-[#254ea2] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="loading || !form.verificationCode">
            {{ loading ? 'Verifying...' : 'Verify & Create Account' }}
          </button>
 
          <p class="text-center text-sm text-[#5a6b8f]">
            Didn't receive the code?
            <button type="button" class="font-semibold text-[#2f61c7] hover:underline" @click="sendCode">
              Resend
            </button>
          </p>
 
          <button type="button" class="w-full text-sm text-[#5a6b8f] hover:underline text-center" @click="step = 1">
            ← Go back
          </button>
        </form>
 
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
definePageMeta({ layout: false })
 
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
 
const { setAuth, apiCall } = useAuth()
 
const step    = ref(1)
const loading = ref(false)
const error   = ref('')
 
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  organization: '',
  agreed: false,
  verificationCode: ''
})
 
const departmentOptions = [
  'Computer Science',
  'Software Engineering',
  'CyberSecurity',
  'Information Technology',
]
 
const departmentOpen        = ref(false)
const departmentDropdownRef = ref<HTMLElement | null>(null)
 
const selectDepartment = (dept: string) => {
  form.department      = dept
  departmentOpen.value = false
}
 
const closeDepartmentDropdown = (e: MouseEvent) => {
  if (departmentDropdownRef.value && !departmentDropdownRef.value.contains(e.target as Node)) {
    departmentOpen.value = false
  }
}
 
onMounted(() => document.addEventListener('click', closeDepartmentDropdown))
onUnmounted(() => document.removeEventListener('click', closeDepartmentDropdown))
 
const isFormValid = computed(() =>
  form.fullName.trim() &&
  form.email.trim() &&
  form.department.trim() &&
  form.password.trim() &&
  form.confirmPassword.trim() &&
  form.password === form.confirmPassword &&
  form.password.length >= 8 &&
  form.agreed
)
 
// ── STEP 1: Call backend to send code ─────────────────────────────────────
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
 
// ── STEP 2: Verify code and register ─────────────────────────────────────
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
        full_name:  form.fullName,
        email:      form.email,
        department: form.department,
        password:   form.password,
        code:       form.verificationCode
      }
    })
    setAuth(data)          // saves JWT token to localStorage
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.error || 'Verification failed. Please check the code.'
  } finally {
    loading.value = false
  }
}
 
const goToLogin = () => navigateTo('/login')
</script>