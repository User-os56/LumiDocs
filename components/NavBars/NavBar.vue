<template>
        <div>
          <div class="bg-[#533D1E] hidden md:flex flex-col gap-[100px] md:w-[350px] xl:w-[350px] h-screen overflow-y-auto items-center overflow-hidden">
        <!-- 1 -->
        <div class=" flex mt-[0px]" data-aos="fade-in">
            <img
            src="../../assets/images/votetech.png"
            class="w-[312px] h-[312px]"
            loading="lazy"
            />
        </div>
        <!-- 2 -->
         <div class="space-y-4" data-aos="fade-in" v-if="route.path !== '/'">
            <div
            v-for="link in sideBarLinks" :key="link.name"
            > 
            <nuxt-link :to="link.link" @click="handleClick">
                <div class="flex gap-4 items-center pb-3 relative">
                    <p>
                        <span
                            class="text-[#ffff] font-inknut text-[16px] font-medium leading-[20px] capitalize hover:underline"
                            >
                        {{ link.name }}
                        </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
        <div class="space-y-4" data-aos="fade-in" v-else>
            <div
            v-for="link in sideBarLinks.slice(-4)" :key="link.name"
            > 
            <nuxt-link :to="link.link" @click="handleClick">
                <div class="flex gap-4 items-center pb-3 relative">
                    <p>
                        <span
                            class="text-[#ffff] font-inknut text-[16px] font-medium leading-[20px] capitalize hover:underline"
                            >
                        {{ link.name }}
                        </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
        <!-- 3 -->
       <div data-aos="fade-in">
         <NuxtLink  to="https://augustineuniversity.edu.ng/" class="flex flex-row items-center h-fit w-fit justify-center gap-0">
          <img
            src="../assets/icons/icons8-left-arrow-100.png"
            class="scale-[40%]"
          />
          <h3
           class="font-inknut font-bold text-[14px] leading-none text-white"
          >       
            GO TO SCHOOL WEBSITE
          </h3>
        </NuxtLink>
       </div>
    </div>
    <div class=" flex md:hidden bg-[#9D7133]">
      <el-button text @click="openDrawer = true">
    <el-icon size="28"><Menu/></el-icon>
      </el-button>
      <el-drawer
      :append-to-body="true"
      :lock-scroll="true"
      :show-close="false"
      direction="ltr"
      size="280px"
      v-model="openDrawer"
        class="bg-[#9D7133] h-full flex flex-col justify-between" 
      >
      <template #header="{close, titleId}">
        <div
        :id="titleId"
        class="flex items-center justify-between w-full pr-[10px]"
        >
        <nuxt-link @click="closeDrawer" class="" to="/">
          <img
          src="../assets/images/votetech.png"
          class="w-[87.4px]"
          alt="Vote Tech logo"
          width="88px"
          height="40px"
          loading="lazy"
          />
        </nuxt-link>
        <div class="flex items-center gap-1">
          <img
                        @click="close"
                        src="../assets/icons/close.svg"
                        alt="close icon"
                        width="10"
                        height="10"
                        loading="lazy"
                      />
        </div>
        </div>
      </template>
      <div class="px-4 py-6 flex-1 overflow-y-auto">
              <div class="space-y-4" data-aos="fade-in" v-if="route.path !== '/'">
            <div
            v-for="link in sideBarLinks" :key="link.name"
            > 
            <nuxt-link :to="link.link" @click="handleClick">
                <div class="flex gap-4 items-center pb-3 relative">
                    <p>
                        <span
                            class="text-[#533D1E] font-inknut text-[16px] font-medium leading-[20px] capitalize hover:underline"
                            >
                        {{ link.name }}
                        </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
        <div class="space-y-4" data-aos="fade-in" v-else>
            <div
            v-for="link in sideBarLinks.slice(-4)" :key="link.name"
            > 
            <nuxt-link :to="link.link" @click="handleClick">
                <div class="flex gap-4 items-center pb-3 relative">
                    <p>
                        <span
                            class="text-[#533D1E] font-inknut text-[16px] font-medium leading-[20px] capitalize hover:underline"
                            >
                        {{ link.name }}
                        </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
      </div>
      <template #footer>
        <div data-aos="fade-in">
         <NuxtLink  to="https://augustineuniversity.edu.ng/" class="flex flex-row items-center h-fit w-fit justify-center gap-2">
  <img
    src="../assets/icons/icons8-left-arrow-100.png"
    class="scale-[60%]"
  />
  <h3
    
    class="font-inknut hover:underline font-bold text-[14px] leading-none text-[#533D1E]"
  >
    GO TO SCHOOL WEBSITE
        </h3>
</NuxtLink>
       </div>
      </template>

      </el-drawer>
    </div>
        </div>
</template>




<script setup lang="ts">
import { isTemplate } from 'element-plus/es/utils/index.mjs';
import {ref} from 'vue';
import { Menu } from "@element-plus/icons-vue"
const route = useRoute()
const router = useRouter();
const activeCollapseItem = ref("" as string);
const sideBarLinks = ref([
     {  "name": "Sign Up",
          "link": "/"
        },
        {
          "name": "Login",
          "link": "/login"
        },
        {
          "name": "Contact Us",
          "link": "/contact"
        },
        {
          "name": "Frequently Asked Questions",
          "link": "/faqs"
        },
        {
          "name": "About",
          "link": "/about"
        }
])
const handleClick = () => {
  closeDrawer();
}
const openDrawer = ref(false);
const closeDrawer = () =>{
  openDrawer.value = false;
}
</script>
