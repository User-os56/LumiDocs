<template>
    <div class="bg-white w-[600px] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 items-center flex flex-col gap-6 sm:gap-5 transition-all duration-500 ease-in-out z-30"  data-aos="fade-up">
        <div class="pb-[27px]">
            <h3 class="text-center text-[#533D1E] text-[30px] sm:text-[40px] font-inknut font-bold leading-snug"> TYPE IN THE CODE</h3>
        </div>
  <div class="py-5 gap-3 md:gap-9 items-center flex flex-row w-full h-fit">
  <div v-for="(digit, index) in digitIndex" :key="index">
    <input
  ref="inputs"
  v-model="digitIndex[index]"
  type="text"
  inputmode="numeric"
  maxlength="1"
  @input="handleInput(index)"
  class="w-full sm:w-[80px] md:w-[100px]
         h-[60px] sm:h-[80px] md:h-[100px]
         text-center
         text-[40px] sm:text-[60px] md:text-[80px]
         text-[#533d1e]
         bg-transparent outline-none
         border border-gray-300 rounded-lg
         focus:ring-2 focus:ring-[#9D7133]
         transition-all duration-300"
/>

  </div>
</div>


 <div class="flex flex-row gap-[50%] md:gap-[250px]  items-center justify-center">
     <!--FORGOT PASSWORD-->
   <div class="bg-[#533D1E] w-[120px] hover:w-[130px] h-[40px] hover:h-[50px] rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
    <h3  @click="verified" class="text-white text-center text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize  transition-all duration-500 ease-in-out">VERIFY CODE</h3>
  </div>
  <!--SEND CODE-->
  <div class="bg-[#533D1E] w-[120px] hover:w-[130px] h-[40px] hover:h-[50px] rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
    <h3 class="text-white text-center text-sm sm:text-base lg:text-lg font-medium leading-snug capitalize  transition-all duration-500 ease-in-out">RESEND CODE</h3>
  </div>
 </div>

</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const router = useRouter();

const digitIndex = ref<string[]>(["", "", "", ""]);
const inputs = ref<(HTMLInputElement | null)[]>([]);

const verified = () => {
    router.push('/dashboard/')
}
const handleInput = (index: number) => {
  const value = digitIndex.value[index];

  if (typeof value !== "string") return;


  digitIndex.value[index] = value.slice(0, 1);


  const nextInput = inputs.value[index + 1];
  if (nextInput) {
    nextInput.focus();
  }
};
</script>
