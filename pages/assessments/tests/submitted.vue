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

        <!-- Header -->
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-2xl bg-[#2f61c7] flex items-center justify-center shadow-lg shadow-[#2f61c7]/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="h-7 w-7">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-[#1c2b4a]">Assessment Complete</h1>
            <p class="text-sm text-[#4c6087]">{{ result.field || 'Skill Assessment' }} — {{ result.date || 'Today' }}</p>
          </div>
        </div>

        <!-- Score cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Score</p>
            <p class="text-3xl font-bold text-[#1c2b4a]">{{ scoreDisplay }}</p>
            <p class="text-xs text-[#4c6087] mt-1">{{ skillLevel }}</p>
          </div>
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Correct Answers</p>
            <p class="text-3xl font-bold text-[#1c2b4a]">{{ result.correct ?? 0 }} / {{ result.total ?? 0 }}</p>
          </div>
          <div class="rounded-2xl bg-[#f4f7ff] border border-[#dfe7fb] px-5 py-4">
            <p class="text-sm text-[#4c6087]">Time Spent</p>
            <p class="text-3xl font-bold text-[#1c2b4a]">{{ elapsedDisplay }}</p>
          </div>
        </div>

        <!-- Proficiency band -->
        <div class="rounded-2xl px-5 py-4 border"
          :class="bandClass">
          <p class="text-sm font-semibold mb-1">Your Proficiency Level</p>
          <p class="text-lg font-bold">{{ skillLevel }}</p>
          <p class="text-sm mt-1 opacity-80">{{ bandMessage }}</p>
        </div>

        <!-- Next Steps -->
        <div class="bg-white rounded-2xl border border-[#e6edff] px-5 py-4 space-y-3">
          <h2 class="text-lg font-semibold text-[#1c2b4a]">Next Steps</h2>
          <ul class="list-disc list-inside text-sm text-[#4c6087] space-y-1">
            <li>Check the dashboard for personalized learning recommendations based on your score.</li>
            <li>Retake the assessment after studying to track your improvement.</li>
            <li>Your results have been saved to your progress history.</li>
          </ul>
        </div>

        <!-- Action buttons -->
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
definePageMeta({ layout: "auth" })

import { computed, onMounted, ref } from "vue"
import { useRouter } from "#app"

const router = useRouter()

// ── Load result — check localStorage first, fall back to useState ─────────
const result = ref({
  correct: 0,
  total: 0,
  score_percent: 0,
  elapsed: 0,
  field: '',
  level: '',
  date: '',
})

onMounted(() => {
  if (import.meta.client) {
    const raw = localStorage.getItem('latest_result')
    if (raw) {
      try {
        result.value = JSON.parse(raw)
        return
      } catch {}
    }
  }
  // Fallback to useState if localStorage not available
  const state = useState('assessmentScore', () => ({}))
  if (state.value && state.value.total > 0) {
    result.value = state.value
  }
})

// ── Computed display values ───────────────────────────────────────────────
const scoreDisplay = computed(() => {
  const pct = result.value.score_percent
    ?? (result.value.total > 0
        ? Math.round((result.value.correct / result.value.total) * 100)
        : 0)
  return `${pct}%`
})

const elapsedDisplay = computed(() => {
  const elapsed = result.value.elapsed || 0
  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0")
  const secs = (elapsed % 60).toString().padStart(2, "0")
  return `${mins}:${secs}`
})

const numericScore = computed(() => {
  return result.value.score_percent
    ?? (result.value.total > 0
        ? Math.round((result.value.correct / result.value.total) * 100)
        : 0)
})

const skillLevel = computed(() => {
  const s = numericScore.value
  if (s >= 90) return "Expert"
  if (s >= 80) return "Advanced"
  if (s >= 70) return "Upper Intermediate"
  if (s >= 60) return "Intermediate"
  if (s >= 50) return "Upper Basic"
  if (s >= 40) return "Basic"
  if (s >= 20) return "Beginner"
  return "Absolute Beginner"
})

const bandClass = computed(() => {
  const s = numericScore.value
  if (s >= 70) return 'bg-green-50 border-green-200 text-green-800'
  if (s >= 50) return 'bg-yellow-50 border-yellow-200 text-yellow-800'
  return 'bg-red-50 border-red-200 text-red-800'
})

const bandMessage = computed(() => {
  const s = numericScore.value
  const field = result.value.field || 'this field'
  if (s >= 70) return `Strong performance in ${field}. Check your recommendations to go further.`
  if (s >= 50) return `You have a foundational grasp of ${field}. Focused study will close the gap.`
  return `More practice needed in ${field}. Your personalised recommendations will help you build up.`
})

// ── Navigation ────────────────────────────────────────────────────────────
const goHome = () => router.push("/dashboard")

// Retake goes to onboarding so the user picks field/level fresh
// and the backend session gets properly reset
const retake = () => router.push("/assessments/onboarding")
</script>