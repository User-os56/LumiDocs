<template>
  <div
    class="min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <div
      class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10 space-y-8"
    >

      <!-- ========================================================= -->
      <!-- HEADER -->
      <!-- ========================================================= -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <button
              @click="router.back()"
              class="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white border border-[#dce5f7] text-[#7890b8] hover:text-[#2f61c7] hover:border-[#b9c9eb] transition"
              title="Go back"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span class="text-xs font-semibold text-[#7890b8]">
              Assessments
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">
            Assessment History
          </h1>

          <p class="text-sm sm:text-base text-[#4c6087] mt-2">
            Review your previous skill assessments and track your progress.
          </p>
        </div>

        <button
          @click="router.push('/assessments/onboarding')"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:bg-[#274fa3] transition"
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


      <!-- ========================================================= -->
      <!-- SUMMARY CARDS -->
      <!-- ========================================================= -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <!-- Total -->
        <div
          class="bg-white rounded-2xl border border-white/70 shadow-md p-5"
        >
          <div class="flex items-center justify-between">
            <div
              class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center"
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
            {{ assessments.length }}
          </p>

          <p class="text-xs text-[#7890b8] mt-1">
            Total Assessments
          </p>
        </div>


        <!-- Average -->
        <div
          class="bg-white rounded-2xl border border-white/70 shadow-md p-5"
        >
          <div
            class="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.5l4.5-4.5 4 4 6-7.5"
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


        <!-- Highest -->
        <div
          class="bg-white rounded-2xl border border-white/70 shadow-md p-5"
        >
          <div
            class="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center"
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
                d="M5 13l4 4L19 7"
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


        <!-- Passed -->
        <div
          class="bg-white rounded-2xl border border-white/70 shadow-md p-5"
        >
          <div
            class="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-emerald-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <p class="text-2xl font-bold text-[#1c2b4a] mt-4">
            {{ passedAssessments }}
          </p>

          <p class="text-xs text-[#7890b8] mt-1">
            Strong Results
          </p>
        </div>

      </div>


      <!-- ========================================================= -->
      <!-- SEARCH + FILTER -->
      <!-- ========================================================= -->
      <div
        class="bg-white rounded-2xl border border-white/70 shadow-md p-4"
      >
        <div class="flex flex-col md:flex-row gap-3">

          <!-- Search -->
          <div class="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7890b8]"
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
              class="w-full rounded-xl border border-[#dce5f7] bg-[#f8faff] pl-10 pr-4 py-2.5 text-sm text-[#1c2b4a] placeholder-[#9aabc8] focus:outline-none focus:border-[#2f61c7] focus:ring-2 focus:ring-[#2f61c7]/10"
            />
          </div>

          <!-- Difficulty -->
          <select
            v-model="difficultyFilter"
            class="rounded-xl border border-[#dce5f7] bg-[#f8faff] px-4 py-2.5 text-sm text-[#1c2b4a] focus:outline-none focus:border-[#2f61c7]"
          >
            <option value="All">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="advanced">Advanced</option>
          </select>

        </div>
      </div>


      <!-- ========================================================= -->
      <!-- LOADING -->
      <!-- ========================================================= -->
      <div
        v-if="loading"
        class="bg-white rounded-3xl border border-white/70 shadow-md p-12 text-center"
      >
        <div
          class="h-10 w-10 border-4 border-[#dce5f7] border-t-[#2f61c7] rounded-full animate-spin mx-auto"
        ></div>

        <p class="text-sm font-medium text-[#4c6087] mt-4">
          Loading your assessment history...
        </p>
      </div>


      <!-- ========================================================= -->
      <!-- ERROR -->
      <!-- ========================================================= -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
      >
        <div
          class="h-10 w-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto"
        >
          !
        </div>

        <h3 class="font-semibold text-red-700 mt-3">
          Unable to load assessment history
        </h3>

        <p class="text-sm text-red-500 mt-1">
          {{ errorMessage }}
        </p>

        <button
          @click="loadAssessments"
          class="mt-4 rounded-xl bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>


      <!-- ========================================================= -->
      <!-- HISTORY -->
      <!-- ========================================================= -->
      <div
        v-else
        class="bg-white rounded-3xl border border-white/70 shadow-md overflow-hidden"
      >

        <!-- Section Header -->
        <div
          class="px-6 py-5 border-b border-[#edf1fa] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h2 class="text-lg font-semibold text-[#1c2b4a]">
              Assessment Sessions
            </h2>

            <p class="text-xs text-[#7890b8] mt-1">
              {{ filteredAssessments.length }} result{{ filteredAssessments.length === 1 ? '' : 's' }}
            </p>
          </div>

          <button
            @click="loadAssessments"
            class="inline-flex items-center gap-2 text-xs font-semibold text-[#2f61c7] hover:text-[#274fa3]"
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
                d="M4 4v5h5M20 20v-5h-5M5.5 9A7.5 7.5 0 0118.5 6M18.5 15A7.5 7.5 0 015.5 18"
              />
            </svg>
            Refresh
          </button>
        </div>


        <!-- Empty -->
        <div
          v-if="filteredAssessments.length === 0"
          class="p-12 text-center"
        >
          <div
            class="h-14 w-14 rounded-2xl bg-[#f1f5ff] flex items-center justify-center mx-auto"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h3 class="text-sm font-semibold text-[#1c2b4a] mt-4">
            No assessments found
          </h3>

          <p class="text-xs text-[#7890b8] mt-1">
            {{ assessments.length === 0
              ? 'You have not completed any assessments yet.'
              : 'Try changing your search or filter.' }}
          </p>

          <button
            v-if="assessments.length === 0"
            @click="router.push('/assessments/onboarding')"
            class="mt-4 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold hover:bg-[#274fa3] transition"
          >
            Take an Assessment
          </button>
        </div>


        <!-- Desktop Table -->
        <div v-else class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-[#f8faff] border-b border-[#edf1fa]">
                <th class="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-semibold text-[#7890b8]">
                  Assessment
                </th>

                <th class="text-left px-4 py-4 text-[11px] uppercase tracking-wider font-semibold text-[#7890b8]">
                  Difficulty
                </th>

                <th class="text-left px-4 py-4 text-[11px] uppercase tracking-wider font-semibold text-[#7890b8]">
                  Score
                </th>

                <th class="text-left px-4 py-4 text-[11px] uppercase tracking-wider font-semibold text-[#7890b8]">
                  Grade
                </th>

                <th class="text-left px-4 py-4 text-[11px] uppercase tracking-wider font-semibold text-[#7890b8]">
                  Date
                </th>

                <th class="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-[#edf1fa]">

              <tr
                v-for="assessment in filteredAssessments"
                :key="assessment.id"
                class="hover:bg-[#fafbff] transition"
              >

                <!-- Document -->
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3 min-w-[240px]">
                    <div
                      class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center shrink-0"
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>

                    <div class="min-w-0">
                      <p
                        class="text-sm font-semibold text-[#1c2b4a] truncate max-w-[280px]"
                        :title="assessment.document_title"
                      >
                        {{ assessment.document_title }}
                      </p>

                      <p class="text-xs text-[#7890b8] mt-0.5">
                        {{ assessment.total_questions }} questions
                      </p>
                    </div>
                  </div>
                </td>


                <!-- Difficulty -->
                <td class="px-4 py-5">
                  <span
                    class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize"
                    :class="getDifficultyClass(assessment.difficulty)"
                  >
                    {{ assessment.difficulty }}
                  </span>
                </td>


                <!-- Score -->
                <td class="px-4 py-5">
                  <div class="flex items-center gap-3 min-w-[130px]">
                    <div class="w-16 h-1.5 bg-[#e6edff] rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full"
                        :class="getScoreBarClass(assessment.percentage)"
                        :style="{ width: `${Math.min(assessment.percentage, 100)}%` }"
                      ></div>
                    </div>

                    <span class="text-sm font-bold text-[#1c2b4a]">
                      {{ formatScore(assessment.percentage) }}%
                    </span>
                  </div>
                </td>


                <!-- Grade -->
                <td class="px-4 py-5">
                  <span
                    class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold"
                    :class="getGradeClass(assessment.grade)"
                  >
                    {{ assessment.grade }}
                  </span>
                </td>


                <!-- Date -->
                <td class="px-4 py-5">
                  <span class="text-xs text-[#7890b8]">
                    {{ formatDate(assessment.created_at) }}
                  </span>
                </td>


                <!-- Action -->
                <td class="px-6 py-5 text-right">
                  <button
                    @click="viewAssessment(assessment.id)"
                    class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f61c7] hover:text-[#274fa3]"
                  >
                    View
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="h-3.5 w-3.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </td>

              </tr>

            </tbody>
          </table>
        </div>


        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-[#edf1fa]">

          <div
            v-for="assessment in filteredAssessments"
            :key="assessment.id"
            class="p-5"
          >
            <div class="flex items-start gap-3">

              <div
                class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center shrink-0"
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>

              <div class="flex-1 min-w-0">

                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3
                      class="text-sm font-semibold text-[#1c2b4a] truncate"
                    >
                      {{ assessment.document_title }}
                    </h3>

                    <p class="text-xs text-[#7890b8] mt-1">
                      {{ formatDate(assessment.created_at) }}
                    </p>
                  </div>

                  <span
                    class="inline-flex items-center justify-center h-9 w-9 rounded-lg text-xs font-bold shrink-0"
                    :class="getGradeClass(assessment.grade)"
                  >
                    {{ assessment.grade }}
                  </span>
                </div>


                <div class="flex items-center gap-2 mt-3">
                  <span
                    class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize"
                    :class="getDifficultyClass(assessment.difficulty)"
                  >
                    {{ assessment.difficulty }}
                  </span>

                  <span class="text-xs text-[#7890b8]">
                    {{ assessment.total_questions }} questions
                  </span>
                </div>


                <div class="mt-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-[#7890b8]">
                      Score
                    </span>

                    <span class="font-bold text-[#1c2b4a]">
                      {{ formatScore(assessment.percentage) }}%
                    </span>
                  </div>

                  <div class="h-2 bg-[#e6edff] rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="getScoreBarClass(assessment.percentage)"
                      :style="{ width: `${Math.min(assessment.percentage, 100)}%` }"
                    ></div>
                  </div>
                </div>


                <button
                  @click="viewAssessment(assessment.id)"
                  class="mt-4 text-xs font-semibold text-[#2f61c7] hover:text-[#274fa3]"
                >
                  View Assessment →
                </button>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>


<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import { useRouter } from '#app'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()
const { apiCall, loadAuth } = useAuth()


// ================================================================
// TYPES
// ================================================================

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


// ================================================================
// STATE
// ================================================================

const assessments = ref<Assessment[]>([])

const loading = ref(true)
const errorMessage = ref('')

const searchQuery = ref('')
const difficultyFilter = ref('All')


// ================================================================
// COMPUTED
// ================================================================

const filteredAssessments = computed(() => {

  const query = searchQuery.value.trim().toLowerCase()

  return assessments.value.filter(assessment => {

    const matchesSearch =
      !query ||
      assessment.document_title?.toLowerCase().includes(query)

    const matchesDifficulty =
      difficultyFilter.value === 'All' ||
      assessment.difficulty?.toLowerCase() ===
        difficultyFilter.value.toLowerCase()

    return matchesSearch && matchesDifficulty
  })
})


const averageScore = computed(() => {

  if (!assessments.value.length) return 0

  const total = assessments.value.reduce(
    (sum, assessment) => sum + Number(assessment.percentage || 0),
    0
  )

  return Math.round(total / assessments.value.length)
})


const highestScore = computed(() => {

  if (!assessments.value.length) return 0

  return Math.round(
    Math.max(
      ...assessments.value.map(
        assessment => Number(assessment.percentage || 0)
      )
    )
  )
})


/*
 * "Strong Results" = assessments with 70% or higher.
 *
 * This is only a UI statistic and does not change
 * your backend grading system.
 */
const passedAssessments = computed(() => {

  return assessments.value.filter(
    assessment => Number(assessment.percentage || 0) >= 70
  ).length

})


// ================================================================
// LOAD ASSESSMENTS
// ================================================================

const loadAssessments = async () => {

  loading.value = true
  errorMessage.value = ''

  try {

    loadAuth()

    const data = await apiCall('/api/tests/history/', {
      method: 'GET'
    })

    /*
     * DRF may return either:
     *
     * [
     *   {...},
     *   {...}
     * ]
     *
     * or a paginated response:
     *
     * {
     *   count: ...,
     *   results: [...]
     * }
     */

    if (Array.isArray(data)) {

      assessments.value = data

    } else if (Array.isArray(data?.results)) {

      assessments.value = data.results

    } else {

      assessments.value = []

    }

  } catch (error: any) {

    console.error(
      'Failed to load assessment history:',
      error
    )

    errorMessage.value =
      error?.data?.error ||
      error?.message ||
      'Unable to retrieve your assessment history.'

  } finally {

    loading.value = false

  }

}


// ================================================================
// VIEW ASSESSMENT
// ================================================================

const viewAssessment = (id: number) => {

  /*
   * This assumes we will create:
   *
   * /assessments/history/[id]
   *
   * for the detailed assessment page.
   */

  router.push(`/assessments/history/${id}`)

}


// ================================================================
// FORMATTING
// ================================================================

const formatDate = (date: string) => {

  if (!date) return 'Unknown date'

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )

}


const formatScore = (score: number) => {

  return Number(score || 0).toFixed(0)

}


// ================================================================
// UI HELPERS
// ================================================================

const getDifficultyClass = (difficulty: string) => {

  switch (difficulty?.toLowerCase()) {

    case 'beginner':
      return 'bg-green-50 text-green-700 border border-green-100'

    case 'easy':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100'

    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border border-yellow-100'

    case 'hard':
      return 'bg-orange-50 text-orange-700 border border-orange-100'

    case 'advanced':
      return 'bg-red-50 text-red-700 border border-red-100'

    default:
      return 'bg-gray-50 text-gray-600 border border-gray-100'

  }

}


const getScoreBarClass = (score: number) => {

  if (score >= 80) {
    return 'bg-green-500'
  }

  if (score >= 60) {
    return 'bg-blue-500'
  }

  if (score >= 40) {
    return 'bg-orange-500'
  }

  return 'bg-red-500'

}


const getGradeClass = (grade: string) => {

  switch (grade?.toUpperCase()) {

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
      return 'bg-gray-100 text-gray-600'

  }

}


// ================================================================
// INITIAL LOAD
// ================================================================

onMounted(() => {
  loadAssessments()
})

</script>