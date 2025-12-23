<template>
  <div class="bg-white rounded-3xl shadow-md border border-white/70 px-4 sm:px-6 py-6 sm:py-8 space-y-6">
    <div class="space-y-3">
      <p class="text-lg sm:text-xl font-semibold text-[#1c2b4a]">
        {{ question.prompt }}
      </p>
      <div
        v-if="question.code"
        class="w-full rounded-2xl bg-[#f4f7ff] border border-[#e0e7fb] px-4 sm:px-5 py-4 text-sm font-mono text-[#2f3c5c] whitespace-pre-line"
      >
        {{ question.code }}
      </div>
    </div>

    <div class="space-y-3">
      <p class="text-sm sm:text-base font-semibold text-[#1c2b4a]">
        Select the correct option:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          v-for="option in question.options"
          :key="option.value"
          type="button"
          class="flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition shadow-sm"
          :class="[
            selected === option.value
              ? 'bg-[#e3f7ee] border-[#4dbd8b] text-[#1f5a3f]'
              : 'bg-white border-[#d9e2f4] text-[#1c2b4a] hover:border-[#9fb6ec]'
          ]"
          @click="emitSelection(option.value)"
        >
          <span class="flex items-center gap-3">
            <span
              class="inline-flex h-5 w-5 items-center justify-center rounded-full border transition"
              :class="selected === option.value ? 'border-[#4dbd8b] bg-white text-[#4dbd8b]' : 'border-[#c8d6f2] bg-white text-transparent'"
            >
              •
            </span>
            <span>{{ option.label }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-[#3d5175]">
      <div class="flex items-start gap-2">
        <span class="mt-1 h-3 w-3 rounded-full bg-[#4dbd8b]"></span>
        <div>
          <p class="font-semibold text-[#1c2b4a]">No recommendations yet.</p>
          <p class="text-[#586d96] leading-relaxed">
            Once assessed, you'll receive personalized courses and resources here.
          </p>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <span class="mt-1 h-3 w-3 rounded-full bg-[#2f61c7]"></span>
        <div>
          <p class="font-semibold text-[#1c2b4a]">Progress Tracker</p>
          <p class="text-[#586d96] leading-relaxed">
            Track your progress over time after completing assessments. Let's get started!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Option = { label: string; value: string };
type Question = {
  id: number;
  prompt: string;
  code?: string;
  options: Option[];
};

const props = defineProps<{
  question: Question;
  selected: string | null;
}>();

const emit = defineEmits<{
  (e: "update:selected", value: string): void;
}>();

const emitSelection = (value: string) => {
  emit("update:selected", value);
};
</script>

