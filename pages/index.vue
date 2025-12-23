<template>
  <div class="flex items-start w-[96%] md:w-[88%] lg:w-[95%] xl:w-[97%]  h-screen bg-[#9D7133] justify-center px-4 sm:px-6 lg:px-0 py-6 sm:py-8 lg:py-12 overflow-x-hidden">
    <div class="absolute w-full h-screen inset-0 bg-[url('../../assets/images/LEARN.jpg')] bg-cover opacity-10 z-0">

    </div>
    <div class="flex flex-col items-center w-full md:w-[100%] max-w-screen-xl 2xl:max-w-screen-2xl mx-auto gap-8 xl:gap-12 z-20">
      
      <!-- Header -->
      <div
        class="flex flex-col items-start 2xl:items-center text-center xl:text-left gap-6 xl:gap-10 mt-6 xl:mt-10 transition-all duration-500 ease-in-out"
        data-aos="fade-up"
      >
       <!-- <img
          src="../assets/images/AUI.png"
          class="w-[140px] h-[160px] sm:w-[160px] sm:h-[180px] lg:w-[180px] lg:h-[200px] transition-all duration-500 ease-in-out"
        /> -->
        <div>
          <h3
            class="font-inknut font-bold text-2xl sm:text-4xl lg:text-[40px] xl:text-5xl 2xl:text-6xl leading-tight text-white transition-all duration-500 ease-in-out"
          >
            WELCOME TO LUMIERE
          </h3>
          <h3
            class="font-inknut font-bold text-sm sm:text-base lg:text-lg text-white mt-3 transition-all duration-500 ease-in-out"
          >
            For IT Students exclusively
          </h3>
        </div>
      </div>

      <!-- Steps -->
      <div
        class="grid grid-cols-1 xl:grid-cols-2 mt-8 sm:mt-10 items-center justify-items-center gap-8 sm:gap-12 xl:gap-16 w-[80%] transition-all duration-500 ease-in-out"
        data-aos="fade-up"
      >
        <!-- Step 1 -->
        <div class="flex flex-col gap-6 flex-1 w-[100%] sm:w-[80%] lg:w-[95%] min-w-[200px] transition-all duration-500 ease-in-out">
          <h3
            class="text-white hidden xl:flex font-inknut text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize hover:underline transition-all duration-500 ease-in-out"
          >
            STEP 1.<br />
            Sign Up by filling out <br />
            this form
          </h3>

          <h3
            class="text-white flex xl:hidden font-inknut text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize hover:underline transition-all duration-500 ease-in-out"
          >
            STEP 1.<br />
            Sign Up by filling out this form
          </h3>

          <SignUpForm/>
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col gap-6 flex-1 w-[100%] sm:w-[80%]  lg:w-[95%] transition-all duration-500 ease-in-out">
          <h3
            class="text-white font-inknut text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize hover:underline transition-all duration-500 ease-in-out"
          >
            STEP 2.<br />
            Take a picture of the <br />
            front side of your Id card
          </h3>
          <div
            class="bg-[#50b0ff] hover:bg-[#2e6592] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] w-full rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] flex items-center justify-center shadow-lg transition-all duration-500 ease-in-out"
          >
            <img
              src="../assets/icons/icons8-camera-100.png"
              class="w-[60px] sm:w-[80px] hover:scale-[120%] md:w-[90px] lg:w-[100px] max-w-full object-contain transition-all duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SignUpForm from "../components/SignUpForm.vue";

const fullName = ref("");
const matricNumber = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
</script>
