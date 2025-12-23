<template>
  <div
    data-aos="fade-up"
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a] overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-12 py-12 space-y-10">
      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">Skill Assessment</h1>
        <p class="text-base sm:text-lg text-[#4c6087]">
          Tell us about your course of study or field of interest so we can customize the assessment to match your goals and aspirations.
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/70 px-4 sm:px-8 py-8 sm:py-10">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <!-- Illustration -->
          <div class="flex justify-center md:col-span-2">
            <img
              src="../../../assets/images/STUDENT.jpeg"
              alt="Student at desk"
              class="max-w-[260px] w-full drop-shadow-sm"
              loading="lazy"
            />
          </div>

          <!-- Form -->
          <div class="md:col-span-3 space-y-6">
            <div class="space-y-2">
              <h2 class="text-2xl sm:text-[26px] font-semibold text-[#1c2b4a]">
                What is your current course of study or desired field?
              </h2>
              <div>
                <SelectModal
  v-model="selectedField"
  :options="fieldOptions"
  placeholder="Select your field..."
/>

              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-center gap-2 text-xs text-[#7b8fb6]">
                <span class="h-2 w-2 rounded-full bg-[#2f61c7]"></span>
                <span class="h-2 w-2 rounded-full bg-[#9fb6ec]"></span>
                <span class="h-2 w-2 rounded-full bg-[#c7d4f5]"></span>
                <span class="h-2 w-2 rounded-full bg-[#dfe7fb]"></span>
              </div>
              <div class="flex items-center justify-end gap-3">
                <button
                  class="rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-5 py-2.5 text-sm font-semibold shadow hover:border-[#9fb6ec] transition"
                  @click="handleCancel"
                >
                  Cancel
                </button>
                <button
                  class="rounded-xl bg-[#2f61c7] text-white px-5 py-2.5 text-sm font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="!selectedField"
                  @click="handleStart"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
import { ref, computed } from "vue";
import { useRouter } from "#app";

const router = useRouter();
const fields = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Cyber Security",
];

const fieldOptions = computed(() =>
  fields.map((field) => ({
    label: field,
    value: field,
  }))
);
const selectedField = ref("");

const handleCancel = () => {
  router.back();
};

const handleStart = () => {
  if (!selectedField.value) return;
  router.push("/assessments/tests");
};
</script>