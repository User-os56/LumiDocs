<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 flex flex-col justify-between max-w-4xl mx-auto">
    <!-- Top Progress Bar -->
    <div class="space-y-4">
      <div class="flex items-center justify-between text-sm text-slate-400">
        <span>Question {{ currentIndex + 1 }} of {{ questions.length }}</span>
        <span class="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-medium uppercase">
          {{ quizData?.difficulty || 'Assessment' }}
        </span>
      </div>
      <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300" 
          :style="{ width: `${((currentIndex + 1) / questions.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Active Question Card -->
    <div v-if="currentQuestion" class="my-8 p-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-xl space-y-6">
      <h2 class="text-xl md:text-2xl font-semibold text-slate-100 leading-relaxed">
        {{ currentQuestion.text }}
      </h2>

      <!-- Options Grid -->
      <div class="space-y-3">
        <button
          v-for="(option, idx) in currentQuestion.options"
          :key="idx"
          @click="selectAnswer(option)"
          :class="[
            'w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between',
            userAnswers[currentIndex] === option
              ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-medium'
              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
          ]"
        >
          <span>{{ option }}</span>
          <span 
            class="w-5 h-5 rounded-full border flex items-center justify-center text-xs"
            :class="userAnswers[currentIndex] === option ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-700'"
          >
            ✓
          </span>
        </button>
      </div>
    </div>

    <!-- Bottom Controls -->
    <div class="flex items-center justify-between pt-4 border-t border-slate-900">
      <button 
        @click="currentIndex--" 
        :disabled="currentIndex === 0"
        class="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl disabled:opacity-40 transition"
      >
        Previous
      </button>

      <button 
        v-if="currentIndex < questions.length - 1"
        @click="currentIndex++" 
        :disabled="!userAnswers[currentIndex]"
        class="px-6 py-2.5 bg-slate-200 hover:bg-white text-slate-950 font-bold rounded-xl disabled:opacity-40 transition"
      >
        Next
      </button>

      <button 
        v-else
        @click="handleSubmit" 
        :disabled="submitting || Object.keys(userAnswers).length < questions.length"
        class="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl disabled:opacity-40 hover:opacity-90 transition"
      >
        {{ submitting ? 'Submitting...' : 'Submit Assessment' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuizApi } from '~/composables/useQuizApi'

const route = useRoute()
const router = useRouter()
const { submitTest } = useQuizApi()

const quizData = ref(history.state?.quizData || null)
const questions = ref(quizData.value?.questions || [])
const currentIndex = ref(0)
const userAnswers = ref({})
const submitting = ref(false)

const currentQuestion = computed(() => questions.value[currentIndex.value] || null)

const selectAnswer = (option) => {
  userAnswers.value[currentIndex.value] = option
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const payload = {
      document_id: quizData.value.document_id,
      difficulty: quizData.value.difficulty,
      answers: Object.entries(userAnswers.value).map(([qIdx, ans]) => ({
        question_id: questions.value[qIdx].id,
        selected_option: ans
      }))
    }
    const res = await submitTest(payload)
    router.push({
      path: `/dashboard/results/${res.data?.attempt_id || res.attempt_id}`,
      state: { resultData: res.data || res }
    })
  } catch (err) {
    alert(err.message || 'Submission failed.')
  } finally {
    submitting.value = false
  }
}
</script>