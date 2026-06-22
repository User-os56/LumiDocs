<template>
  <div class="min-h-screen bg-[#f4f6fb] py-6 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-2xl border border-[#e4e8f3] bg-white shadow-xl lg:grid-cols-2">
      <div class="relative hidden overflow-hidden bg-gradient-to-b from-[#eef2ff] to-[#e5ebff] p-10 lg:block">
        <div class="mb-8 flex items-center gap-3">
          <div class="h-9 w-9 rounded-lg bg-[#2f61c7] text-white grid place-content-center text-sm font-bold">SA</div>
          <p class="text-sm font-semibold text-[#1f2f53]">Skill Assessment &amp; Learning Platform</p>
        </div>
        <p class="mb-5 inline-block rounded-full bg-[#dce6ff] px-3 py-1 text-xs font-medium text-[#2f61c7]">
          Secure Login
        </p>
        <h1 class="text-4xl font-bold leading-tight text-[#1c2b4a]">
          One last step to<br />
          <span class="text-[#2f61c7]">verify it's you.</span>
        </h1>
        <p class="mt-5 max-w-md text-sm leading-6 text-[#42557d]">
          We've sent a 6-digit verification code to <span class="font-semibold text-[#1f2f53]">{{ maskedEmail }}</span>.
        </p>
        <div class="mt-8 space-y-4 text-sm text-[#1f2f53]">
          <p><span class="font-semibold">Secure &amp; Private</span> - Your data is encrypted and always protected.</p>
          <p><span class="font-semibold">Quick &amp; Easy</span> - Enter the code sent to continue securely.</p>
          <p><span class="font-semibold">Trusted Platform</span> - Join thousands of learners and organizations.</p>
        </div>
      </div>

      <div class="flex items-center justify-center p-6 sm:p-10">
        <div class="w-full max-w-md rounded-2xl border border-[#e7ebf5] bg-white p-6 shadow-sm sm:p-8">
          <div class="mb-5 text-center">
            <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-[#eaf0ff] grid place-content-center text-[#2f61c7] text-2xl">✉</div>
            <h2 class="text-3xl font-bold text-[#1c2b4a]">Enter Verification Code</h2>
            <p class="mt-2 text-sm text-[#5a6b8f]">
              We've sent a 6-digit code to <span class="font-semibold text-[#1f2f53]">{{ maskedEmail }}</span>
            </p>
          </div>

          <div class="flex justify-between gap-2">
            <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              ref="inputs"
              v-model="otpDigits[index]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              class="h-12 w-12 rounded-lg border border-[#d8e0f1] text-center text-lg font-semibold text-[#1f2f53] outline-none transition focus:border-[#2f61c7]"
              @input="handleInput(index, $event)"
    @keydown.backspace="handleBackspace(index, $event)"
            />
          </div>

          <p class="mt-4 text-center text-sm text-[#5a6b8f]">
            Code expires in <span class="font-semibold text-[#2f61c7]">04:59</span>
          </p>

          <button
            type="button"
            class="mt-4 w-full rounded-lg bg-[#2f61c7] py-3 text-sm font-semibold text-white transition hover:bg-[#254ea2] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="!isOtpValid"
            @click="verifyCode"
          >
            Verify Code
          </button>

          <button
            type="button"
            class="mt-3 w-full rounded-lg border border-[#dbe2f1] bg-white py-3 text-sm font-semibold text-[#5a6b8f] transition hover:bg-[#f8faff]"
            @click="resendCode"
          >
            Resend Code (23s)
          </button>

          <div class="my-4 flex items-center gap-3 text-[#98a5c3]">
            <span class="h-px flex-1 bg-[#e2e8f5]"></span>
            <span class="text-xs">or</span>
            <span class="h-px flex-1 bg-[#e2e8f5]"></span>
          </div>

          <button
            type="button"
            class="w-full rounded-lg border border-[#dbe2f1] bg-white py-3 text-sm font-semibold text-[#1f2f53] transition hover:bg-[#f8faff]"
            @click="backToSignIn"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { computed, ref, nextTick } from "vue";

const maskedEmail = "john.doe@email.com";
const otpDigits = ref(["", "", "", "", "", ""]);
const isOtpValid = computed(() => otpDigits.value.every((digit) => digit.trim().length === 1));
const inputs = ref<HTMLInputElement[]>([]); 
  const handleInput = (index: number, event: Event) => {
  const val = (event.target as HTMLInputElement).value;

  // Move to next box if value is entered and next input exists
  if (val && index < otpDigits.value.length - 1) {
    const nextInput = inputs.value[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
};

// Function to handle backspace navigation
const handleBackspace = (index: number, event: KeyboardEvent) => {
  if (!otpDigits.value[index] && index > 0) {
    const prevInput = inputs.value[index - 1];
    if (prevInput) {
      prevInput.focus();
    }
  }
};

const verifyCode = () => {
  if (!isOtpValid.value) return;
  navigateTo("/dashboard");
};

const resendCode = () => {
  otpDigits.value = ["", "", "", "", "", ""];
};

const backToSignIn = () => navigateTo("/login");
</script>