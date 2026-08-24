<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans flex items-center justify-center relative overflow-hidden"
  >
    <!-- Ambient background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
      ></div>

      <div
        class="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative w-full max-w-4xl space-y-8 z-10">

      <!-- Header -->
      <div class="text-center space-y-3">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          AI Assessment
        </div>

        <h1
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
        >
          Configure Your
          <span
            class="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
          >
            Assessment
          </span>
        </h1>

        <p
          class="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-6"
        >
          Choose your assessment settings and let LUMIERE generate
          questions from your study material.
        </p>
      </div>

      <!-- Main card -->
      <div
        class="bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
      >

        <!-- Document -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label
              class="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
            >
              Source Document
            </label>

            <span
              v-if="docId"
              class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider"
            >
              Document Ready
            </span>
          </div>

          <!-- Existing document -->
          <div
            v-if="docId"
            class="flex items-center justify-between gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div
                class="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-5 h-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="text-sm font-semibold text-white truncate">
                  {{ documentName || "Selected document" }}
                </p>

                <p class="text-xs text-slate-500 mt-1">
                  Document ID:
                  <span class="font-mono text-amber-400">
                    {{ docId }}
                  </span>
                </p>
              </div>
            </div>

            <div
              class="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0"
            >
              <svg
                class="w-4 h-4 text-emerald-400"
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
          </div>

          <!-- Upload -->
          <div
            v-else
            @click="triggerFileUpload"
            class="border-2 border-dashed border-slate-800 hover:border-amber-500/40 rounded-2xl p-8 text-center bg-slate-950/40 transition-all cursor-pointer group"
          >
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              @change="handleFileUpload"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            />

            <div
              class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-500/30 mx-auto mb-4 transition-all"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>

            <p class="text-sm font-semibold text-slate-200">
              {{
                uploadedFileName ||
                "Upload your study material"
              }}
            </p>

            <p class="text-xs text-slate-500 mt-2">
              PDF, DOC, DOCX, TXT, PPT or PPTX
            </p>
          </div>

          <!-- Upload progress -->
          <div
            v-if="isUploading"
            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800"
          >
            <div
              class="w-4 h-4 border-2 border-slate-700 border-t-amber-500 rounded-full animate-spin"
            ></div>

            <p class="text-xs text-slate-400">
              Uploading and processing your document...
            </p>
          </div>
        </div>

        <!-- Number of questions -->
        <div class="space-y-3">
          <label
            class="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Number of Questions
          </label>

          <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <button
              v-for="count in [5, 10, 15, 20, 25, 30]"
              :key="count"
              type="button"
              @click="numQuestions = count"
              :class="[
                'py-3 rounded-xl text-xs font-semibold border transition-all',
                numQuestions === count
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              ]"
            >
              {{ count }}
            </button>
          </div>
        </div>

        <!-- Difficulty -->
        <div class="space-y-3">
          <label
            class="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Assessment Difficulty
          </label>

          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="level in levels"
              :key="level"
              type="button"
              @click="selectedLevel = level"
              :class="[
                'py-3 rounded-xl text-xs font-bold border transition-all uppercase tracking-wide',
                selectedLevel === level
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border-transparent shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
              ]"
            >
              {{ level }}
            </button>
          </div>
        </div>

        <!-- Info -->
        <div
          class="flex gap-3 p-4 rounded-2xl bg-slate-950/50 border border-slate-800"
        >
          <svg
            class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 8v.01M11 12h1v4h1"></path>
          </svg>

          <p class="text-xs text-slate-500 leading-5">
            Questions will be generated from the contents of your
            selected document. The difficulty level controls how
            challenging the generated questions are.
          </p>
        </div>

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-sm text-red-300"
        >
          {{ errorMessage }}
        </div>

        <!-- Actions -->
        <div
          class="flex items-center justify-end gap-4 pt-4 border-t border-slate-800/80"
        >
          <button
            type="button"
            @click="handleCancel"
            :disabled="isGenerating || isUploading"
            class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            :disabled="!canGenerate || isGenerating || isUploading"
            @click="handleStart"
            class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isGenerating || isUploading"
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

            <span>
              {{
                isUploading
                  ? "Uploading..."
                  : isGenerating
                    ? "Generating Quiz..."
                    : "Generate Assessment"
              }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" })

import { computed, onMounted, ref } from "vue"
import { useRouter, useRoute } from "#app"
import { useQuizApi } from "~/composables/useQuizApi"

const router = useRouter()
const route = useRoute()

const {
  generateTest,
  uploadDocument
} = useQuizApi()

const docId = ref<number | string | null>(null)
const documentName = ref("")
const uploadedFileName = ref("")
const selectedFile = ref<File | null>(null)

const isGenerating = ref(false)
const isUploading = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)

const errorMessage = ref("")

const levels = [
  "Beginner",
  "Intermediate",
  "Expert"
]

const selectedLevel = ref<string | null>(null)
const numQuestions = ref<number | null>(null)


const canGenerate = computed(() => {
  return (
    !!numQuestions.value &&
    !!selectedLevel.value &&
    (!!docId.value || !!selectedFile.value)
  )
})

onMounted(() => {
  if (route.query.docId) {
    docId.value = route.query.docId as string
  }

  if (route.query.documentName) {
    documentName.value = route.query.documentName as string
  }
})

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  selectedFile.value = file
  uploadedFileName.value = file.name

  errorMessage.value = ""
}

const handleCancel = () => {
  router.back()
}

const handleStart = async () => {
  if (!canGenerate.value) {
    errorMessage.value =
      "Please select a document, number of questions, and difficulty level."

    return
  }

  errorMessage.value = ""
  isGenerating.value = true

  try {

    // =====================================================
    // STEP 1: Upload document if necessary
    // =====================================================

    if (!docId.value && selectedFile.value) {

      isUploading.value = true

      try {

        const uploadedDocument = await uploadDocument(
          selectedFile.value
        )

        const uploadedId =
          uploadedDocument?.id ??
          uploadedDocument?.document_id

        if (!uploadedId) {
          throw new Error(
            "The document was uploaded, but no document ID was returned."
          )
        }

        docId.value = uploadedId

        documentName.value =
          uploadedDocument?.original_name ??
          uploadedDocument?.filename ??
          selectedFile.value.name

      } finally {

        isUploading.value = false

      }
    }

    // =====================================================
    // STEP 2: Make sure we have a document ID
    // =====================================================

    if (!docId.value) {
      throw new Error(
        "No document was selected."
      )
    }

    // =====================================================
    // STEP 3: Generate questions
    // =====================================================

    const payload = {
      document_id: docId.value,
      difficulty: selectedLevel.value!.toLowerCase(),
      num_questions: numQuestions.value!
    }

    const response = await generateTest(payload)

    // =====================================================
    // STEP 4: Validate AI response
    // =====================================================

    if (
      !response ||
      !Array.isArray(response.questions) ||
      response.questions.length === 0
    ) {
      throw new Error(
        "The AI did not return any questions."
      )
    }

    if (
      response.questions.length <
      numQuestions.value!
    ) {
      throw new Error(
        `Only ${response.questions.length} questions were generated. Please try again.`
      )
    }

    // =====================================================
    // STEP 5: Save quiz
    // =====================================================

    if (import.meta.client) {

      localStorage.setItem(
        "active_quiz",
        JSON.stringify(response)
      )

      localStorage.setItem(
        "entry_level",
        selectedLevel.value!
      )

      localStorage.removeItem(
        "assessment_answers"
      )
    }

    // =====================================================
    // STEP 6: Open assessment
    // =====================================================

    await router.push(
      "/assessments/tests"
    )

  } catch (error: any) {

    console.error(
      "Failed to generate assessment:",
      error
    )

    errorMessage.value =
      error?.data?.error ||
      error?.message ||
      "Could not generate the assessment. Please try again."

  } finally {

    isUploading.value = false
    isGenerating.value = false

  }
}
</script>