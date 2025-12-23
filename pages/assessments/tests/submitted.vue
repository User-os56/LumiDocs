<template>
  <div
    :key="$route.path"
    data-aos="fade-in"
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a] overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 xl:px-12 py-12 space-y-6">
      <div class="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/70 px-6 sm:px-8 py-10 space-y-8">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-2xl bg-[#2f61c7] flex items-center justify-center shadow-lg shadow-[#2f61c7]/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="h-7 w-7">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-[#1c2b4a]">Assessment Submitted</h1>
            <p class="text-sm text-[#4c6087]">Here are your results.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Score</p>
            <p class="text-2xl font-bold text-[#1c2b4a]">{{ scoreDisplay }}</p>
          </div>
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Correct Answers</p>
            <p class="text-2xl font-bold text-[#1c2b4a]">{{ state.correct }} / {{ state.total }}</p>
          </div>
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Time Spent</p>
            <p class="text-2xl font-bold text-[#1c2b4a]">{{ elapsedDisplay }}</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#e6edff] px-5 py-4 space-y-3">
          <h2 class="text-lg font-semibold text-[#1c2b4a]">Next Steps</h2>
          <ul class="list-disc list-inside text-sm text-[#4c6087] space-y-1">
            <li>Review explanations when they become available.</li>
            <li>Retake the assessment to improve your score.</li>
            <li>Check recommendations for tailored learning paths.</li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition"
            @click="goHome"
          >
            Back to Dashboard
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition"
            @click="retake"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
import { computed } from "vue";
import { useRouter, useRoute } from "#app";

const route = useRoute();

const router = useRouter();
const state = useState("assessmentScore", () => ({
  correct: 0,
  total: 0,
  elapsed: 0,
}));

const scoreDisplay = computed(() => {
  if (!state.value.total) return "0%";
  const percent = Math.round((state.value.correct / state.value.total) * 100);
  return `${percent}%`;
});

const elapsedDisplay = computed(() => {
  const mins = Math.floor(state.value.elapsed / 60)
    .toString()
    .padStart(2, "0");
  const secs = (state.value.elapsed % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

const goHome = () => {
  router.push("/dashboard");
};

const retake = () => {
  router.push("/assessments/tests");
};
</script>