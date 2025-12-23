<template>
    <div class="relative">
      <!-- Trigger -->
      <button
        type="button"
        @click="toggle"
        class="w-full rounded-xl border border-[#d3ddf5] bg-white
               px-4 py-3 text-left flex items-center justify-between
               focus:outline-none focus:ring-2 focus:ring-[#2f61c7]"
      >
        <span :class="modelValue ? 'text-[#1c2b4a]' : 'text-[#7b8fb6]'">
          {{ modelValue || placeholder }}
        </span>
  
        <svg
          class="h-5 w-5 text-[#2f61c7] transition-transform duration-200"
          :class="{ 'rotate-180': open }"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </button>
  
      <!-- Dropdown -->
      <transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <ul
          v-if="open"
          class="absolute z-50 mt-2 w-full rounded-xl border border-[#d3ddf5]
                 bg-white shadow-lg overflow-hidden"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="select(option.value)"
            class="px-4 py-3 cursor-pointer text-[#1c2b4a]
                   hover:bg-[#eef3ff]"
          >
            {{ option.label }}
          </li>
        </ul>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  interface Option {
    label: string;
    value: string;
  }
  
  const props = defineProps<{
    modelValue: string;
    options: Option[];
    placeholder?: string;
  }>();
  
  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();
  
  const open = ref(false);
  
  const toggle = () => {
    open.value = !open.value;
  };
  
  const select = (value: string) => {
    emit("update:modelValue", value);
    open.value = false;
  };
  </script>
  