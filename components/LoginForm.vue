<template>
    <div class="bg-white w-[600px] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-5 transition-all duration-500 ease-in-out z-30"  data-aos="fade-up">
        <div class="pb-[27px]">
            <h3 class="text-center text-[#533D1E] text-[30px] sm:text-[40px] font-inknut font-bold leading-snug"> WELCOME BACK!</h3>
        </div>
  <!-- Full Name -->
  <div
    class="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-[#9D7133] transition-all duration-500 ease-in-out"
  >
    <img src="../assets/icons/icons8-user.gif" alt="user" class="w-6 h-6 mr-3" />
    <input
      v-model="fullName"
      type="text"
      placeholder="Full Name"
      class="flex-1 text-[#533d1e] placeholder-[#533d1e]/70 bg-transparent outline-none text-sm sm:text-base transition-all duration-500 ease-in-out focus:text-[#9D7133] focus:placeholder-[#9D7133]/70 focus:scale-[1.02]"
    />
  </div>

  <!-- Matric Number -->
  <div
    class="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-[#9D7133] transition-all duration-500 ease-in-out"
  >
    <img src="../assets/icons/icons8-user.gif" alt="matric" class="w-6 h-6 mr-3" />
    <input
      v-model="matricNumber"
      type="text"
      placeholder="Matric Number"
      class="flex-1 text-[#533d1e] placeholder-[#533d1e]/70 bg-transparent outline-none text-sm sm:text-base transition-all duration-500 ease-in-out focus:text-[#9D7133] focus:placeholder-[#9D7133]/70 focus:scale-[1.02]"
    />
  </div>



  <!-- Password -->
  <div
    class="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-[#9D7133] transition-all duration-500 ease-in-out"
  >
    <img src="../assets/icons/icons8-lock.gif" alt="password" class="w-6 h-6 mr-3" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="flex-1 text-[#533d1e] placeholder-[#533d1e]/70 bg-transparent outline-none text-sm sm:text-base transition-all duration-500 ease-in-out focus:text-[#9D7133] focus:placeholder-[#9D7133]/70 focus:scale-[1.02]"
    />
  </div>

 <div class="flex flex-row gap-[50%]  items-center justify-center">
     <!--FORGOT PASSWORD-->
  <div>
    <h3 class="text-center text-[#533D1E] text-sm sm:text-base lg:text-lg font-medium leading-snug hover:capitalize hover:underline transition-all duration-500 ease-in-out">Forgot Password?</h3>
  </div>
  <!--SEND CODE-->
  <div class="bg-[#533D1E] w-[120px] hover:w-[130px] h-[40px] hover:h-[50px] rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
    <h3 @click="auth" class="text-white text-center text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize  transition-all duration-500 ease-in-out">SEND CODE</h3>
  </div>
 </div>

</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const router = useRouter();

const auth = () =>{
  router.push('/authentication')
}
const fullName = ref("");
const matricNumber = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
</script>