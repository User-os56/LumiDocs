<template>
  <div
    data-aos="fade-in"
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a] overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-10 space-y-6">
      <!-- Loading state -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div class="h-12 w-12 rounded-full border-4 border-[#2f61c7] border-t-transparent animate-spin"></div>
        <p class="text-[#4c6087] font-medium">Generating your question...</p>
      </div>
      <!-- Error state -->
      <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p class="text-red-500 font-medium">{{ error }}</p>
        <button
          class="rounded-xl bg-[#2f61c7] text-white px-6 py-2 font-semibold"
          @click="fetchNextQuestion(null)"
        >
          Try Again
        </button>
      </div>

      <!-- Main assessment UI -->
      <template v-else-if="currentQuestion">
        <!-- Top bar -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-[#1c2b4a]">Skill Assessment</h1>
              <p class="text-sm text-[#4c6087]">
                Category: {{ expertiseField }} |
                <span class="capitalize">{{ currentQuestion.bloom_level || 'Adaptive' }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2 rounded-xl bg-white/90 border border-white/70 px-3 py-2 shadow">
              <span class="text-[#2f61c7]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span class="font-semibold text-[#1c2b4a]">{{ formattedTime }}</span>
            </div>
          </div>
          <div class="rounded-2xl bg-white/90 border border-white/70 px-4 sm:px-6 py-3 shadow flex flex-col gap-3">
            <div class="flex items-center justify-between text-sm sm:text-base font-semibold text-[#1c2b4a]">
              <span>Question {{ currentStep }} of {{ totalQuestions }}</span>
              <span class="text-xs text-[#4c6087]">Score: {{ correctCount }} correct</span>
            </div>
            <div class="h-2 w-full rounded-full bg-[#e6edff] overflow-hidden">
              <div
                class="h-full bg-[#2f61c7] transition-all duration-300"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <!-- Question card -->
        <div class="rounded-2xl bg-white/90 border border-white/70 p-6 shadow space-y-5">
          <p class="text-lg font-semibold text-[#1c2b4a] leading-relaxed">
            {{ currentQuestion.question_text }}
          </p>
          <div class="grid gap-3">
            <button
              v-for="(optionText, key) in currentQuestion.options"
              :key="key"
              class="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
              :class="optionClass(key)"
              :disabled="answerSubmitted"
              @click="selectAnswer(key)"
            >
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold uppercase"
                :class="optionLabelClass(key)">
                {{ key }}
              </span>
              {{ optionText }}
            </button>
          </div>
          <!-- Answer feedback -->
          <div v-if="answerSubmitted" class="rounded-xl px-4 py-3 text-sm font-medium"
            :class="lastAnswerCorrect ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'">
            {{ lastAnswerCorrect ? '✓ Correct!' : `✗ The correct answer was: ${currentQuestion.correct_answer?.toUpperCase()}` }}
          </div>
        </div>

        <div 
v-if="currentStep < totalQuestions" 
class="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 flex items-center gap-3 shadow-sm transition-all"
>
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>
<p>
  Please complete all <strong>{{ totalQuestions }} questions</strong> to submit your assessment and receive accurate skill results. 
  Current progress: {{ currentStep }}/{{ totalQuestions }}.
</p>
</div>

        <!-- Nav buttons -->
        <div class="flex flex-wrap justify-between gap-3">
          <div></div><!-- spacer -->

          <div class="flex flex-wrap gap-3">
            <button
              v-if="!answerSubmitted"
              class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-6 py-2 text-sm font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="!selectedAnswer || loading"
              @click="submitAnswer"
            >
              Confirm Answer
            </button>
 
            <button
              v-else
              class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-6 py-2 text-sm font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition disabled:opacity-60"
              :disabled="loading"
              @click="goNext"
            >
              {{ currentStep >= totalQuestions ? 'See Results' : 'Next Question' }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
 
            <button
              class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition"
              :class="currentStep < totalQuestions 
                ? 'cursor-not-allowed opacity-60' 
                : 'cursor-pointer'"
              :disabled="currentStep < totalQuestions || loading || !currentQuestion"
              @click="handleSubmit"
            >
              Submit Assessment
            </button>
          </div>
        </div>
      </template>
 
    </div>
  </div>
</template>
 
<script setup lang="ts">

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { definePageMeta, navigateTo, useState } from "#imports";
import { useAuth } from "../../../composables/useAuth";

definePageMeta({ layout: "auth" });

const { apiCall, loadAuth } = useAuth();

// ── State ─────────────────────────────────────────────────────────────────
const loading           = ref(false);
const error             = ref(null);
const currentQuestion   = ref(null);
const selectedAnswer    = ref(null);
const answerSubmitted   = ref(false);
const lastAnswerCorrect = ref(null);
const currentStep       = ref(0);
const totalQuestions    = ref(50);
const correctCount      = ref(0);
const currentTheta      = ref(0)
const isFirstQuestion   = ref(true);   // ← triggers new_session on first call
const expertiseField    = ref('Full Stack Developer');
const entryLevel        = ref('Beginner');

// ── Timer ─────────────────────────────────────────────────────────────────
const durationSeconds = 15 * 60;
const remaining = ref(durationSeconds);
const timerId   = ref(null);

const formattedTime = computed(() => {
  const mins = Math.floor(remaining.value / 60).toString().padStart(2, "0");
  const secs = (remaining.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

const progressPercent = computed(() =>
  currentStep.value > 0 ? (currentStep.value / totalQuestions.value) * 100 : 0
);

// ── Styling helpers ───────────────────────────────────────────────────────
const optionClass = (key) => {
  if (!answerSubmitted.value) {
    return selectedAnswer.value === key
      ? 'border-[#2f61c7] bg-[#eef3ff] text-[#1c2b4a]'
      : 'border-[#d3defa] bg-white text-[#1c2b4a] hover:border-[#9fb6ec]';
  }
  const correct = currentQuestion.value?.correct_answer;
  if (key === correct) return 'border-green-400 bg-green-50 text-green-800';
  if (key === selectedAnswer.value) return 'border-red-400 bg-red-50 text-red-800';
  return 'border-[#d3defa] bg-white text-[#9aaac7]';
};

const optionLabelClass = (key) => {
  if (!answerSubmitted.value) {
    return selectedAnswer.value === key
      ? 'border-[#2f61c7] bg-[#2f61c7] text-white'
      : 'border-[#9fb6ec] text-[#4c6087]';
  }
  const correct = currentQuestion.value?.correct_answer;
  if (key === correct) return 'border-green-500 bg-green-500 text-white';
  if (key === selectedAnswer.value) return 'border-red-400 bg-red-400 text-white';
  return 'border-[#d3defa] text-[#9aaac7]';
};

// ── Core logic ────────────────────────────────────────────────────────────
const selectAnswer = (key) => {
  if (answerSubmitted.value) return;
  selectedAnswer.value = key;
};

const submitAnswer = () => {
  if (!selectedAnswer.value || !currentQuestion.value) return;
  const isCorrect = selectedAnswer.value === currentQuestion.value.correct_answer;
  lastAnswerCorrect.value = isCorrect;
  if (isCorrect) correctCount.value += 1;
  answerSubmitted.value = true;
};

const fetchNextQuestion = async (wasCorrect = null) => {
  loading.value = true;
  error.value = null;
  try {
    const body = {
      was_correct: wasCorrect,
      expertise_field: expertiseField.value,
      entry_level: entryLevel.value,
    };

    // First call: tell backend to wipe old session and start fresh
    if (isFirstQuestion.value) {
      body.new_session = true;
      isFirstQuestion.value = false;
    }

    const data = await apiCall('/api/process-answer/', {
      method: 'POST',
      body
    });

    if (data.is_completed) {
      saveResultsAndNavigate();
      return;
    }

    currentQuestion.value = data;
    currentStep.value     = data.step || (currentStep.value + 1);
    totalQuestions.value  = data.total || 50;

    selectedAnswer.value    = null;
    answerSubmitted.value   = false;
    lastAnswerCorrect.value = null;

  } catch (err) {
    console.error('Question fetch error:', err);
    if (err?.status === 401) {
      error.value = 'Session expired. Please log in again.';
      setTimeout(() => navigateTo('/login'), 2000);
    } else {
      error.value = 'Failed to load question. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

const goNext = async () => {
  await fetchNextQuestion(lastAnswerCorrect.value);
};

const saveResultsAndNavigate = async () => {
  clearTimer();

  const answered = currentStep.value > 0 ? currentStep.value : 1;
  const scorePercent = Math.round((correctCount.value / answered) * 100);

  const result = {
    correct:       correctCount.value,
    total:         answered,
    score_percent: scorePercent,
    elapsed:       durationSeconds - remaining.value,
    field:         expertiseField.value,
    theta:         currentTheta.value,
    level:         entryLevel.value,
    date:          new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };

  // Save to both useState (for immediate use) and localStorage (for dashboard persistence)
  const scoreState = useState('assessmentScore', () => ({}));
  scoreState.value = result;

  if (import.meta.client) {
    // Save latest result
    localStorage.setItem('latest_result', JSON.stringify(result));

    // Append to history array
    const history = JSON.parse(localStorage.getItem('assessment_history') || '[]');
    history.unshift(result);          // newest first
    history.splice(10);               // keep last 10
    localStorage.setItem('assessment_history', JSON.stringify(history));
  }

  await navigateTo('/assessments/tests/submitted');
};

const handleSubmit = () => saveResultsAndNavigate();

// ── Timer ─────────────────────────────────────────────────────────────────
const tick = () => {
  if (remaining.value > 0) { remaining.value -= 1; return; }
  clearTimer();
  saveResultsAndNavigate();
};

const clearTimer = () => {
  if (timerId.value) { clearInterval(timerId.value); timerId.value = null; }
};

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(() => {
  loadAuth();

  if (import.meta.client) {
    const savedField = localStorage.getItem('expertise_field');
    const savedLevel = localStorage.getItem('entry_level');
    if (savedField) expertiseField.value = savedField;
    if (savedLevel) entryLevel.value     = savedLevel;
  }

  timerId.value = setInterval(tick, 1000);
  fetchNextQuestion(null);
});

onBeforeUnmount(() => clearTimer());

</script>
 