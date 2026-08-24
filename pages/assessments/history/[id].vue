```vue
<template>
  <div
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"
      ></div>
    </div>

    <div
      class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10 space-y-8"
    >

      <!-- Header -->
      <div class="space-y-2">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">
              Assessment History
            </h1>

            <p class="text-base text-[#4c6087] mt-2">
              Review your previous assessment attempts, scores, and performance.
            </p>
          </div>

          <button
            @click="router.push('/assessments')"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow hover:bg-[#274fa3] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Assessment
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="bg-white rounded-3xl shadow-md border border-white/70 p-12 text-center"
      >
        <div
          class="h-10 w-10 border-4 border-[#dce6ff] border-t-[#2f61c7] rounded-full animate-spin mx-auto"
        ></div>

        <p class="mt-4 text-sm font-medium text-[#4c6087]">
          Loading assessment history...
        </p>
      </div>

      <template v-else>

        <!-- Error -->
        <div
          v-if="error"
          class="rounded-2xl bg-red-50 border border-red-200 px-5 py-4 flex items-center justify-between gap-4"
        >
          <div>
            <p class="text-sm font-semibold text-red-700">
              Unable to load assessment history
            </p>

            <p class="text-xs text-red-600 mt-1">
              {{ error }}
            </p>
          </div>

          <button
            @click="loadHistory"
            class="shrink-0 rounded-xl bg-red-600 text-white px-4 py-2 text-xs font-semibold hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <!-- Total Assessments -->
          <div
            class="bg-white rounded-2xl shadow-md border border-white/70 p-5"
          >
            <div class="flex items-center justify-between">
              <div
                class="h-11 w-11 rounded-xl bg-[#e8f0ff] flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-[#2f61c7]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>

            <p class="text-2xl font-bold text-[#1c2b4a] mt-4">
              {{ history.length }}
            </p>

            <p class="text-xs text-[#7890b8] mt-1">
              Total Assessments
            </p>
          </div>

          <!-- Average Score -->
          <div
            class="bg-white rounded-2xl shadow-md border border-white/70 p-5"
          >
            <div
              class="h-11 w-11 rounded-xl bg-green-50 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 13.5l5.25-5.25L12 12l4.5-4.5L21 12"
                />
              </svg>
            </div>

            <p class="text-2xl font-bold text-[#1c2b4a] mt-4">
              {{ averageScore }}%
            </p>

            <p class="text-xs text-[#7890b8] mt-1">
              Average Score
            </p>
          </div>

          <!-- Highest Score -->
          <div
            class="bg-white rounded-2xl shadow-md border border-white/70 p-5"
          >
            <div
              class="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-amber-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3l2.781 5.633 6.219.904-4.5 4.385 1.062 6.194L12 17.188l-5.562 2.928L7.5 13.922 3 9.537l6.219-.904L12 3z"
                />
              </svg>
            </div>

            <p class="text-2xl font-bold text-[#1c2b4a] mt-4">
              {{ highestScore }}%
            </p>

            <p class="text-xs text-[#7890b8] mt-1">
              Highest Score
            </p>
          </div>

          <!-- Questions -->
          <div
            class="bg-white rounded-2xl shadow-md border border-white/70 p-5"
          >
            <div
              class="h-11 w-11 rounded-xl bg-purple-50 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-purple-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 6.75h12m-12 4.5h12m-12 4.5h12M3.75 6.75h.008v.008H3.75V6.75zm0 4.5h.008v.008H3.75v-.008zm0 4.5h.008v.008H3.75v-.008z"
                />
              </svg>
            </div>

            <p class="text-2xl font-bold text-[#1c2b4a] mt-4">
              {{ totalQuestions }}
            </p>

            <p class="text-xs text-[#7890b8] mt-1">
              Questions Answered
            </p>
          </div>
        </div>

        <!-- Filters -->
        <div
          class="bg-white rounded-3xl shadow-md border border-white/70 p-5"
        >
          <div class="flex flex-col lg:flex-row gap-4 justify-between">

            <!-- Search -->
            <div class="relative flex-1 max-w-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7890b8]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by document name..."
                class="w-full rounded-xl border border-[#cdd8f4] bg-[#f8faff] pl-10 pr-4 py-2.5 text-sm text-[#1c2b4a] placeholder-[#7890b8] focus:border-[#2f61c7] focus:ring-2 focus:ring-[#2f61c7]/20 outline-none transition"
              />
            </div>

            <!-- Difficulty -->
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="difficulty in difficultyOptions"
                :key="difficulty"
                @click="selectedDifficulty = difficulty"
                class="px-4 py-2 rounded-xl text-xs font-semibold transition"
                :class="
                  selectedDifficulty === difficulty
                    ? 'bg-[#2f61c7] text-white shadow-sm'
                    : 'bg-[#f6f8ff] text-[#4c6087] border border-[#e3eafe] hover:bg-[#e8f0ff]'
                "
              >
                {{ difficulty }}
              </button>
            </div>
          </div>
        </div>

        <!-- Assessment History -->
        <div
          class="bg-white rounded-3xl shadow-md border border-white/70 overflow-hidden"
        >
          <div class="px-6 py-5 border-b border-[#e3eafe]">
            <h2 class="text-xl font-semibold text-[#1c2b4a]">
              Assessment Attempts
            </h2>

            <p class="text-sm text-[#7890b8] mt-1">
              {{ filteredHistory.length }}
              {{ filteredHistory.length === 1 ? 'assessment' : 'assessments' }}
              found
            </p>
          </div>

          <!-- List -->
          <div
            v-if="filteredHistory.length > 0"
            class="divide-y divide-[#e9effb]"
          >
            <div
              v-for="assessment in filteredHistory"
              :key="assessment.id"
              class="p-5 sm:p-6 hover:bg-[#f8faff] transition"
            >
              <div
                class="flex flex-col lg:flex-row lg:items-center gap-5"
              >

                <!-- Score -->
                <div class="relative h-16 w-16 shrink-0">
                  <svg
                    class="transform -rotate-90 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#e6edff"
                      stroke-width="9"
                      fill="none"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      :stroke="getScoreColor(assessment.percentage)"
                      stroke-width="9"
                      fill="none"
                      :stroke-dasharray="`${assessment.percentage * 2.638} 263.8`"
                      stroke-linecap="round"
                    />
                  </svg>

                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="text-xs font-bold text-[#1c2b4a]">
                      {{ Math.round(assessment.percentage) }}%
                    </span>
                  </div>
                </div>

                <!-- Information -->
                <div class="flex-1 min-w-0">

                  <div
                    class="flex items-center gap-2 flex-wrap"
                  >
                    <h3
                      class="text-sm sm:text-base font-semibold text-[#1c2b4a] truncate"
                    >
                      {{ assessment.document_title }}
                    </h3>

                    <span
                      class="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      :class="getDifficultyClass(assessment.difficulty)"
                    >
                      {{ capitalize(assessment.difficulty) }}
                    </span>
                  </div>

                  <div
                    class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-[#7890b8]"
                  >
                    <span>
                      {{ formatDate(assessment.created_at) }}
                    </span>

                    <span>
                      {{ assessment.total_questions }} questions
                    </span>

                    <span>
                      {{ assessment.score }}/{{ assessment.total_questions }}
                      correct
                    </span>
                  </div>
                </div>

                <!-- Grade -->
                <div class="text-left lg:text-center shrink-0">
                  <p class="text-[10px] uppercase tracking-wider text-[#7890b8]">
                    Grade
                  </p>

                  <span
                    class="inline-flex mt-1 h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                    :class="getGradeClass(assessment.grade)"
                  >
                    {{ assessment.grade }}
                  </span>
                </div>

                <!-- View -->
                <button
                  @click="viewAssessment(assessment.id)"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cdd8f4] bg-white px-4 py-2.5 text-xs font-semibold text-[#2f61c7] hover:bg-[#f6f8ff] hover:border-[#9fb6ec] transition shrink-0"
                >
                  View Details

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else
            class="px-6 py-16 text-center"
          >
            <div
              class="h-14 w-14 rounded-2xl bg-[#f6f8ff] border border-[#e3eafe] flex items-center justify-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7 text-[#7890b8]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>

            <h3 class="mt-4 text-sm font-semibold text-[#1c2b4a]">
              No assessments found
            </h3>

            <p class="text-xs text-[#7890b8] mt-1 max-w-sm mx-auto">
              You have not completed any assessments matching your current
              filters.
            </p>

            <button
              v-if="history.length === 0"
              @click="router.push('/assessments')"
              class="mt-5 rounded-xl bg-[#2f61c7] text-white px-5 py-2.5 text-xs font-semibold hover:bg-[#274fa3] transition"
            >
              Take Your First Assessment
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Assessment Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedAssessment"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2b4a]/40 backdrop-blur-sm"
        @click.self="selectedAssessment = null"
      >
        <div
          class="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >

          <!-- Modal Header -->
          <div
            class="px-6 py-5 border-b border-[#e3eafe] flex items-start justify-between gap-4"
          >
            <div class="min-w-0">
              <h2 class="text-xl font-bold text-[#1c2b4a]">
                Assessment Details
              </h2>

              <p class="text-sm text-[#7890b8] mt-1 truncate">
                {{ selectedAssessment.document_title }}
              </p>
            </div>

            <button
              @click="selectedAssessment = null"
              class="h-9 w-9 rounded-xl bg-[#f6f8ff] text-[#7890b8] hover:text-[#1c2b4a] flex items-center justify-center transition shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto p-6 space-y-6">

            <!-- Result Summary -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">

              <div class="rounded-2xl bg-[#f6f8ff] p-4 text-center">
                <p class="text-[10px] uppercase tracking-wider text-[#7890b8]">
                  Score
                </p>

                <p class="text-xl font-bold text-[#1c2b4a] mt-1">
                  {{ selectedAssessment.percentage }}%
                </p>
              </div>

              <div class="rounded-2xl bg-[#f6f8ff] p-4 text-center">
                <p class="text-[10px] uppercase tracking-wider text-[#7890b8]">
                  Grade
                </p>

                <p class="text-xl font-bold text-[#2f61c7] mt-1">
                  {{ selectedAssessment.grade }}
                </p>
              </div>

              <div class="rounded-2xl bg-[#f6f8ff] p-4 text-center">
                <p class="text-[10px] uppercase tracking-wider text-[#7890b8]">
                  Correct
                </p>

                <p class="text-xl font-bold text-[#1c2b4a] mt-1">
                  {{ selectedAssessment.score }}
                </p>
              </div>

              <div class="rounded-2xl bg-[#f6f8ff] p-4 text-center">
                <p class="text-[10px] uppercase tracking-wider text-[#7890b8]">
                  Questions
                </p>

                <p class="text-xl font-bold text-[#1c2b4a] mt-1">
                  {{ selectedAssessment.total_questions }}
                </p>
              </div>
            </div>

            <!-- Questions -->
            <div>
              <h3 class="text-base font-semibold text-[#1c2b4a] mb-3">
                Questions & Answers
              </h3>

              <div
                v-if="selectedAssessment.questions?.length"
                class="space-y-4"
              >
                <div
                  v-for="(question, index) in selectedAssessment.questions"
                  :key="question.id"
                  class="rounded-2xl border p-4"
                  :class="
                    question.is_correct
                      ? 'border-green-200 bg-green-50/50'
                      : 'border-red-200 bg-red-50/50'
                  "
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      :class="
                        question.is_correct
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      "
                    >
                      {{ index + 1 }}
                    </div>

                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-[#1c2b4a]">
                        {{ question.question_text }}
                      </p>

                      <div class="mt-3 space-y-1.5 text-xs">
                        <p>
                          <span class="font-semibold text-[#4c6087]">
                            Your answer:
                          </span>

                          <span
                            :class="
                              question.is_correct
                                ? 'text-green-700'
                                : 'text-red-700'
                            "
                          >
                            {{ question.user_answer || 'Not answered' }}
                          </span>
                        </p>

                        <p>
                          <span class="font-semibold text-[#4c6087]">
                            Correct answer:
                          </span>

                          <span class="text-[#1c2b4a]">
                            {{ question.correct_answer }}
                          </span>
                        </p>
                      </div>

                      <div
                        v-if="question.explanation"
                        class="mt-3 rounded-xl bg-white/70 border border-white px-3 py-2.5"
                      >
                        <p class="text-[10px] font-semibold uppercase tracking-wider text-[#7890b8]">
                          Explanation
                        </p>

                        <p class="text-xs text-[#4c6087] mt-1 leading-relaxed">
                          {{ question.explanation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else
                class="rounded-2xl bg-[#f6f8ff] border border-[#e3eafe] p-6 text-center"
              >
                <p class="text-sm text-[#7890b8]">
                  Question details are not available for this assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from '#app'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'auth'
})

interface Assessment {
  id: number
  document_title: string
  difficulty: string
  score: number
  total_questions: number
  percentage: number
  grade: string
  created_at: string
}

interface Question {
  id: number
  question_text: string
  options: Record<string, string> | string[]
  user_answer: string
  correct_answer: string
  is_correct: boolean
  explanation: string
}

interface AssessmentDetail extends Assessment {
  questions: Question[]
}

const router = useRouter()
const { apiCall, loadAuth } = useAuth()

const history = ref<Assessment[]>([])
const loading = ref(true)
const error = ref('')

const searchQuery = ref('')
const selectedDifficulty = ref('All')

const selectedAssessment = ref<AssessmentDetail | null>(null)

const difficultyOptions = [
  'All',
  'Beginner',
  'Medium',
  'Hard'
]

/* ─────────────────────────────────────────────
   COMPUTED STATISTICS
───────────────────────────────────────────── */

const averageScore = computed(() => {
  if (!history.value.length) return 0

  const total = history.value.reduce(
    (sum, assessment) => sum + Number(assessment.percentage || 0),
    0
  )

  return Math.round((total / history.value.length) * 10) / 10
})

const highestScore = computed(() => {
  if (!history.value.length) return 0

  return Math.max(
    ...history.value.map(
      assessment => Number(assessment.percentage || 0)
    )
  )
})

const totalQuestions = computed(() => {
  return history.value.reduce(
    (sum, assessment) =>
      sum + Number(assessment.total_questions || 0),
    0
  )
})

/* ─────────────────────────────────────────────
   FILTERING
───────────────────────────────────────────── */

const filteredHistory = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return history.value.filter(assessment => {
    const matchesSearch =
      !query ||
      assessment.document_title
        ?.toLowerCase()
        .includes(query)

    const matchesDifficulty =
      selectedDifficulty.value === 'All' ||
      assessment.difficulty?.toLowerCase() ===
        selectedDifficulty.value.toLowerCase()

    return matchesSearch && matchesDifficulty
  })
})

/* ─────────────────────────────────────────────
   LOAD HISTORY
───────────────────────────────────────────── */

const loadHistory = async () => {
  loading.value = true
  error.value = ''

  try {
    loadAuth()

    const data = await apiCall('/api/tests/history/', {
      method: 'GET'
    })

    history.value = Array.isArray(data)
      ? data
      : data?.results || []

  } catch (err: any) {
    console.error('Failed to load assessment history:', err)

    error.value =
      err?.data?.error ||
      err?.message ||
      'Unable to retrieve your assessment history.'
  } finally {
    loading.value = false
  }
}

/* ─────────────────────────────────────────────
   VIEW ASSESSMENT
───────────────────────────────────────────── */

const viewAssessment = async (attemptId: number) => {
  try {
    const data = await apiCall(
      `/api/tests/history/${attemptId}/`,
      {
        method: 'GET'
      }
    )

    selectedAssessment.value = data

  } catch (err: any) {
    console.error('Failed to load assessment details:', err)

    error.value =
      err?.data?.error ||
      'Unable to load assessment details.'
  }
}

/* ─────────────────────────────────────────────
   FORMATTING
───────────────────────────────────────────── */

const formatDate = (date: string) => {
  if (!date) return 'Unknown date'

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(date))
  } catch {
    return date
  }
}

const capitalize = (value: string) => {
  if (!value) return ''

  return value.charAt(0).toUpperCase() + value.slice(1)
}

/* ─────────────────────────────────────────────
   SCORE / BADGES
───────────────────────────────────────────── */

const getScoreColor = (score: number) => {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f97316'
  if (score >= 40) return '#eab308'

  return '#ef4444'
}

const getGradeClass = (grade: string) => {
  switch (grade) {
    case 'A':
      return 'bg-green-100 text-green-700'

    case 'B':
      return 'bg-blue-100 text-blue-700'

    case 'C':
      return 'bg-yellow-100 text-yellow-700'

    case 'D':
      return 'bg-orange-100 text-orange-700'

    case 'F':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
    case 'easy':
      return 'bg-green-100 text-green-700'

    case 'medium':
      return 'bg-yellow-100 text-yellow-700'

    case 'hard':
    case 'advanced':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}

/* ─────────────────────────────────────────────
   INITIAL LOAD
───────────────────────────────────────────── */

onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```
