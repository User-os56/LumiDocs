```vue
<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden"
  >
    <!-- Ambient background -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
      ></div>

      <div
        class="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- ====================================================== -->
    <!-- LOADING -->
    <!-- ====================================================== -->

    <div
      v-if="isLoading"
      class="relative min-h-screen flex items-center justify-center px-6"
    >
      <div class="text-center">

        <div
          class="w-12 h-12 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-5"
        ></div>

        <h2 class="text-lg font-semibold text-white">
          Loading assessment...
        </h2>

        <p class="text-sm text-slate-400 mt-2">
          Preparing your questions.
        </p>

      </div>
    </div>

    <!-- ====================================================== -->
    <!-- ERROR -->
    <!-- ====================================================== -->

    <div
      v-else-if="errorMessage"
      class="relative min-h-screen flex items-center justify-center px-6"
    >
      <div
        class="w-full max-w-lg bg-slate-900/80 border border-red-500/20 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl"
      >

        <div
          class="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5"
        >
          <svg
            class="w-7 h-7 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14A2 2 0 003.84 21h16.32a2 2 0 001.73-3.14l-8.18-14a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h2 class="text-xl font-bold text-white">
          Unable to load assessment
        </h2>

        <p class="text-sm text-slate-400 mt-3 leading-6">
          {{ errorMessage }}
        </p>

        <div class="flex justify-center gap-3 mt-7">

          <button
            type="button"
            @click="goToOnboarding"
            class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-200 transition"
          >
            Back to Setup
          </button>

          <button
            type="button"
            @click="loadQuiz"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 text-sm font-bold transition"
          >
            Try Again
          </button>

        </div>

      </div>
    </div>

    <!-- ====================================================== -->
    <!-- ASSESSMENT -->
    <!-- ====================================================== -->

    <main
      v-else-if="currentQuestion"
      class="relative min-h-screen w-full max-w-5xl mx-auto px-5 sm:px-8 py-6 sm:py-10"
    >

      <!-- HEADER -->

      <header class="flex items-center justify-between mb-8">

        <div class="flex items-center gap-3">

          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20"
          >
            <svg
              class="w-5 h-5 text-slate-950"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a2 2 0 01.707.293l5.414 5.414A2 2 0 0120 7.414V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div>
            <p class="text-sm font-bold text-white">
              LUMIERE Assessment
            </p>

            <p class="text-xs text-slate-500 truncate max-w-[220px]">
              {{ documentName }}
            </p>
          </div>

        </div>

        <!-- TIMER -->

        <div
          class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800"
        >
          <svg
            class="w-4 h-4 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 7v5l3 2"></path>
          </svg>

          <span class="font-mono text-sm font-semibold text-slate-200">
            {{ formattedTime }}
          </span>
        </div>

      </header>

      <!-- PROGRESS -->

      <div class="mb-8">

        <div class="flex items-center justify-between mb-3">

          <div>
            <p class="text-xs uppercase tracking-wider text-slate-500">
              Progress
            </p>

            <p class="text-sm font-semibold text-slate-200 mt-1">
              Question {{ currentIndex + 1 }} of {{ questions.length }}
            </p>
          </div>

          <span class="text-xs font-semibold text-amber-400">
            {{ answeredCount }}/{{ questions.length }} answered
          </span>

        </div>

        <div class="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-500"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

      </div>

      <!-- QUESTION CARD -->

      <section
        class="bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
      >

        <!-- QUESTION HEADER -->

        <div
          class="px-6 sm:px-10 py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3"
        >

          <span
            class="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider"
          >
            {{ difficulty }}
          </span>

          <span class="text-xs text-slate-500">
            Multiple Choice
          </span>

        </div>

        <!-- QUESTION -->

        <div class="px-6 sm:px-10 py-8 sm:py-10">

          <p
            class="text-xs uppercase tracking-widest text-slate-500 mb-4"
          >
            Question {{ currentIndex + 1 }}
          </p>

          <h1
            class="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed"
          >
            {{ currentQuestion.question_text }}
          </h1>

          <!-- OPTIONS -->

          <div class="mt-8 space-y-3">

            <button
              v-for="(option, key) in normalizedOptions"
              :key="key"
              type="button"
              @click="selectAnswer(key)"
              :class="[
                'w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 group',
                selectedAnswer === key
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
              ]"
            >

              <div class="flex items-start gap-4">

                <div
                  :class="[
                    'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold border transition-all',
                    selectedAnswer === key
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 group-hover:border-slate-600'
                  ]"
                >
                  {{ key.toUpperCase() }}
                </div>

                <span
                  :class="[
                    'text-sm sm:text-base leading-6 pt-1',
                    selectedAnswer === key
                      ? 'text-white font-medium'
                      : 'text-slate-300'
                  ]"
                >
                  {{ option }}
                </span>

                <svg
                  v-if="selectedAnswer === key"
                  class="w-5 h-5 text-amber-400 ml-auto shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

              </div>

            </button>

          </div>

        </div>

        <!-- FOOTER -->

        <div
          class="px-6 sm:px-10 py-5 border-t border-slate-800/80 flex items-center justify-between gap-4"
        >

          <button
            type="button"
            @click="previousQuestion"
            :disabled="currentIndex === 0"
            class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>

          <button
            v-if="!isLastQuestion"
            type="button"
            @click="nextQuestion"
            :disabled="!selectedAnswer"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next Question →
          </button>

          <button
            v-else
            type="button"
            @click="submitAssessment"
            :disabled="!allQuestionsAnswered || isSubmitting"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
          >

            <svg
              v-if="isSubmitting"
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>

              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>

            {{ isSubmitting ? "Submitting..." : "Submit Assessment" }}

          </button>

        </div>

      </section>

      <!-- INCOMPLETE WARNING -->

      <div
        v-if="!allQuestionsAnswered"
        class="mt-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3 items-start"
      >

        <svg
          class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-3.464-1.333-4.196 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <div>

          <p class="text-sm font-semibold text-amber-300">
            Assessment incomplete
          </p>

          <p class="text-xs text-amber-400/70 mt-1">
            Please answer all {{ questions.length }} questions before submitting.
            You have answered {{ answeredCount }}.
          </p>

        </div>

      </div>

      <!-- QUESTION NAVIGATOR -->

      <div class="mt-6">

        <p class="text-xs text-slate-500 uppercase tracking-wider mb-3">
          Questions
        </p>

        <div class="flex flex-wrap gap-2">

          <button
            v-for="(_, index) in questions"
            :key="index"
            type="button"
            @click="goToQuestion(index)"
            :class="[
              'w-9 h-9 rounded-lg text-xs font-bold border transition-all',
              index === currentIndex
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : answers[index]
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'
            ]"
          >
            {{ index + 1 }}
          </button>

        </div>

      </div>

      <p class="text-center text-xs text-slate-600 pt-2">
        Your answers are automatically saved while you move through the assessment.
      </p>

    </main>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "auth"
})

import {
  computed,
  onMounted,
  onBeforeUnmount,
  ref
} from "vue"

import { useRouter } from "#app"

import { useQuizApi } from "~/composables/useQuizApi"


// ============================================================
// TYPES
// ============================================================

interface Question {
  question_text: string
  options: Record<string, string> | string[]
  correct_answer: string
  explanation?: string
}

interface QuizResponse {
  document_id?: number | string | null
  document_name?: string
  difficulty?: string
  questions: Question[]
}

interface AnswerSubmission {
  question_text: string
  options: Record<string, string> | string[]
  user_answer: string
  correct_answer: string
  explanation?: string
}


// ============================================================
// API
// ============================================================

const router = useRouter()

const {
  submitTest
} = useQuizApi()


// ============================================================
// STATE
// ============================================================

const questions = ref<Question[]>([])

const answers = ref<Record<number, string>>({})

const currentIndex = ref(0)

const isLoading = ref(true)

const isSubmitting = ref(false)

const errorMessage = ref("")

const documentId = ref<number | string | null>(null)

const documentName = ref("Assessment")

const difficulty = ref("Medium")

const entryLevel = ref("")

const elapsedSeconds = ref(0)

let timer: ReturnType<typeof setInterval> | null = null


// ============================================================
// COMPUTED
// ============================================================

const currentQuestion = computed<Question | null>(() => {
  return questions.value[currentIndex.value] || null
})


const selectedAnswer = computed(() => {
  return answers.value[currentIndex.value] || ""
})


/**
 * Always convert options into:
 *
 * {
 *   a: "...",
 *   b: "...",
 *   c: "...",
 *   d: "..."
 * }
 *
 * This protects the UI if the AI returns either
 * an object or an array.
 */
const normalizedOptions = computed<Record<string, string>>(() => {

  const options = currentQuestion.value?.options

  if (!options) {
    return {}
  }

  if (Array.isArray(options)) {

    const keys = ["a", "b", "c", "d"]

    return options.reduce(
      (result, option, index) => {

        if (index < keys.length) {
          result[keys[index]] = String(option)
        }

        return result

      },
      {} as Record<string, string>
    )
  }

  return {
    a: String(options.a ?? ""),
    b: String(options.b ?? ""),
    c: String(options.c ?? ""),
    d: String(options.d ?? "")
  }
})


const progress = computed(() => {

  if (!questions.value.length) {
    return 0
  }

  return (
    ((currentIndex.value + 1) /
      questions.value.length) *
    100
  )

})


const answeredCount = computed(() => {

  return Object.values(answers.value)
    .filter(answer => Boolean(answer))
    .length

})


const allQuestionsAnswered = computed(() => {

  return (
    questions.value.length > 0 &&
    answeredCount.value === questions.value.length
  )

})


const isLastQuestion = computed(() => {

  return (
    questions.value.length > 0 &&
    currentIndex.value === questions.value.length - 1
  )

})


const formattedTime = computed(() => {

  const minutes = Math.floor(
    elapsedSeconds.value / 60
  )
    .toString()
    .padStart(2, "0")

  const seconds = (
    elapsedSeconds.value % 60
  )
    .toString()
    .padStart(2, "0")

  return `${minutes}:${seconds}`

})


// ============================================================
// LOAD QUIZ
// ============================================================

const loadQuiz = () => {

  isLoading.value = true
  errorMessage.value = ""

  try {

    if (!import.meta.client) {
      return
    }

    const rawQuiz = localStorage.getItem("active_quiz")

    if (!rawQuiz) {
      throw new Error(
        "No active assessment was found. Please return to the assessment setup."
      )
    }

    let quiz: QuizResponse

    try {
      quiz = JSON.parse(rawQuiz)
    } catch {
      throw new Error(
        "The saved assessment data is corrupted. Please generate a new assessment."
      )
    }

    if (
      !quiz ||
      !Array.isArray(quiz.questions)
    ) {
      throw new Error(
        "The generated assessment does not contain a valid question list."
      )
    }

    if (quiz.questions.length === 0) {
      throw new Error(
        "No questions were generated. Please return to setup and try again."
      )
    }


    // --------------------------------------------------------
    // Validate questions
    // --------------------------------------------------------

    const validQuestions = quiz.questions.filter((question) => {

      if (!question) {
        return false
      }

      if (
        typeof question.question_text !== "string" ||
        !question.question_text.trim()
      ) {
        return false
      }

      if (
        typeof question.correct_answer !== "string" ||
        !["a", "b", "c", "d"].includes(
          question.correct_answer.toLowerCase()
        )
      ) {
        return false
      }

      if (
        !question.options ||
        (
          !Array.isArray(question.options) &&
          typeof question.options !== "object"
        )
      ) {
        return false
      }

      return true
    })


    if (!validQuestions.length) {
      throw new Error(
        "The generated assessment contains no valid questions. Please generate the assessment again."
      )
    }


    // --------------------------------------------------------
    // Store quiz
    // --------------------------------------------------------

    questions.value = validQuestions

    documentId.value =
      quiz.document_id ?? null

    documentName.value =
      quiz.document_name ||
      "Assessment"

    difficulty.value =
      quiz.difficulty ||
      "Medium"


    // --------------------------------------------------------
    // Metadata
    // --------------------------------------------------------

    entryLevel.value =
      localStorage.getItem("entry_level") ||
      ""


    // --------------------------------------------------------
    // Restore answers
    // --------------------------------------------------------

    const savedAnswers =
      localStorage.getItem("assessment_answers")

    if (savedAnswers) {

      try {

        const parsed = JSON.parse(savedAnswers)

        if (
          parsed &&
          typeof parsed === "object"
        ) {
          answers.value = parsed
        }

      } catch {

        answers.value = {}

      }

    }


    // --------------------------------------------------------
    // Start timer
    // --------------------------------------------------------

    startTimer()

  } catch (error: any) {

    console.error(
      "Failed to load assessment:",
      error
    )

    errorMessage.value =
      error?.message ||
      "Something went wrong while loading the assessment."

  } finally {

    isLoading.value = false

  }

}


// ============================================================
// TIMER
// ============================================================

const startTimer = () => {

  if (timer) {
    clearInterval(timer)
  }

  timer = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)

}


// ============================================================
// ANSWER SELECTION
// ============================================================

const selectAnswer = (answer: string) => {

  if (
    !["a", "b", "c", "d"].includes(answer)
  ) {
    return
  }

  answers.value = {
    ...answers.value,
    [currentIndex.value]: answer
  }

  if (import.meta.client) {

    localStorage.setItem(
      "assessment_answers",
      JSON.stringify(answers.value)
    )

  }

}


// ============================================================
// NAVIGATION
// ============================================================

const nextQuestion = () => {

  if (!selectedAnswer.value) {
    return
  }

  if (
    currentIndex.value <
    questions.value.length - 1
  ) {

    currentIndex.value++

  }

}


const previousQuestion = () => {

  if (currentIndex.value > 0) {
    currentIndex.value--
  }

}


const goToQuestion = (index: number) => {

  if (
    index >= 0 &&
    index < questions.value.length
  ) {

    currentIndex.value = index

  }

}


// ============================================================
// SUBMIT ASSESSMENT
// ============================================================

const submitAssessment = async () => {

  if (
    !allQuestionsAnswered.value ||
    isSubmitting.value
  ) {
    return
  }

  if (!import.meta.client) {
    return
  }

  const confirmed = window.confirm(
    `You have answered all ${questions.value.length} questions. Submit your assessment now?`
  )

  if (!confirmed) {
    return
  }

  isSubmitting.value = true

  try {

    // --------------------------------------------------------
    // Build backend submissions
    // --------------------------------------------------------

    const submissions: AnswerSubmission[] =
      questions.value.map((question, index) => ({

        question_text:
          question.question_text,

        options:
          question.options,

        user_answer:
          answers.value[index],

        correct_answer:
          question.correct_answer,

        explanation:
          question.explanation || ""

      }))


    const payload = {

      document_id:
        documentId.value,

      difficulty:
        difficulty.value,

      answers:
        submissions

    }


    console.log(
      "POST /api/tests/submit/",
      payload
    )


    // --------------------------------------------------------
    // Submit to Django
    // --------------------------------------------------------

    const response = await submitTest(payload)


    console.log(
      "Assessment submission response:",
      response
    )


    // --------------------------------------------------------
    // Calculate result
    // --------------------------------------------------------

    const total =
      Number(
        response?.total_questions ??
        questions.value.length
      )

    const correct =
      Number(
        response?.score ??
        questions.value.reduce(
          (count, question, index) => {

            return (
              count +
              (
                answers.value[index] ===
                question.correct_answer
                  ? 1
                  : 0
              )
            )

          },
          0
        )
      )

    const percentage =
      Number(
        response?.percentage ??
        (
          total > 0
            ? Math.round(
                (correct / total) * 100
              )
            : 0
        )
      )


    // --------------------------------------------------------
    // Build result
    // --------------------------------------------------------

    const result = {

      correct,

      total,

      score_percent:
        percentage,

      elapsed:
        elapsedSeconds.value,


      level:
        entryLevel.value ||
        difficulty.value,

      date:
        new Date().toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        ),

      attempt_id:
        response?.attempt_id ??
        null,

      grade:
        response?.grade ??
        null

    }


    // --------------------------------------------------------
    // Save result
    // --------------------------------------------------------

    localStorage.setItem(
      "latest_result",
      JSON.stringify(result)
    )

    localStorage.removeItem(
      "active_quiz"
    )

    localStorage.removeItem(
      "assessment_answers"
    )


    // --------------------------------------------------------
    // Stop timer
    // --------------------------------------------------------

    stopTimer()


    // --------------------------------------------------------
    // Go to results
    // --------------------------------------------------------

    await router.push(
      "/assessments/tests/submitted"
    )

  } catch (error: any) {

    console.error(
      "Assessment submission failed:",
      error
    )

    const message =
      error?.data?.error ||
      error?.message ||
      "Unable to submit your assessment. Please try again."

    alert(message)

  } finally {

    isSubmitting.value = false

  }

}


// ============================================================
// TIMER CLEANUP
// ============================================================

const stopTimer = () => {

  if (timer) {

    clearInterval(timer)

    timer = null

  }

}


// ============================================================
// BACK TO ONBOARDING
// ============================================================

const goToOnboarding = () => {

  if (import.meta.client) {

    localStorage.removeItem(
      "active_quiz"
    )

    localStorage.removeItem(
      "assessment_answers"
    )

  }

  stopTimer()

  router.push(
    "/assessments/onboarding"
  )

}


// ============================================================
// LIFECYCLE
// ============================================================

onMounted(() => {

  loadQuiz()

})


onBeforeUnmount(() => {

  stopTimer()

})

</script>
```
