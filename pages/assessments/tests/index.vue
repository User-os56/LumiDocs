<template>
  <div
    data-aos="fade-in"
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a] overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-10 space-y-6">
      <!-- Top bar -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-[#1c2b4a]">Skill Assessment</h1>
            <p class="text-sm text-[#4c6087]">Category: JavaScript</p>
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
            <span>Question {{ currentQuestionNumber }} of {{ totalQuestions }}</span>
            <div class="flex items-center gap-2">
              <div class="flex gap-1">
                <span
                  v-for="(step, idx) in totalQuestions"
                  :key="idx"
                  class="h-2 w-6 rounded-full transition"
                  :class="stepClass(idx)"
                ></span>
              </div>
            </div>
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
      <AssessmentQuestionCard
        :question="currentQuestion"
        :selected="selectedAnswers[currentQuestion.id] || null"
        @update:selected="val => selectAnswer(currentQuestion.id, val)"
      />

      <!-- Nav buttons -->
      <div class="flex flex-wrap justify-between gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentIndex === 0"
          @click="goBack"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div class="flex flex-wrap gap-3">
          <button
            class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentIndex >= totalQuestions - 1"
            @click="goNext"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition disabled:opacity-60 disabled:cursor-not-allowed"
            @click="handleSubmit"
            :disabled="!hasAnyAnswer"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter, useState } from "#app";
import { definePageMeta } from "#imports";
import AssessmentQuestionCard from "../../../components/AssessmentQuestionCard.vue";

definePageMeta({
  layout: "auth",
});

type Option = { label: string; value: string };
type Question = {
  id: number;
  prompt: string;
  code?: string;
  options: Option[];
  correct: string;
};

const router = useRouter();
const durationSeconds = 15 * 60;
const remaining = ref(durationSeconds);
const timerId = ref<ReturnType<typeof setInterval> | null>(null);

const questions: Question[] = [
  {
    id: 1,
    prompt: "What is the output of the following JavaScript code?",
    code: "let x = 5;\nlet y = \"5\";\nconsole.log(x == y);",
    options: [
      { label: "True", value: "true" },
      { label: "False", value: "false" },
      { label: "undefined", value: "undefined" },
      { label: "NaN", value: "nan" },
    ],
    correct: "true",
  },
  {
    id: 2,
    prompt: "Which array method returns a new array with elements that pass a test?",
    options: [
      { label: "map()", value: "map" },
      { label: "forEach()", value: "foreach" },
      { label: "filter()", value: "filter" },
      { label: "reduce()", value: "reduce" },
    ],
    correct: "filter",
  },
  {
    id: 3,
    prompt: "What does `const` guarantee in JavaScript?",
    options: [
      { label: "The variable is block-scoped and cannot be reassigned.", value: "block-no-reassign" },
      { label: "The variable is function-scoped and cannot change type.", value: "function-scope" },
      { label: "The variable is immutable including its contents.", value: "immutable" },
      { label: "The variable is hoisted and initialized to undefined.", value: "hoisted" },
    ],
    correct: "block-no-reassign",
  },
  {
    id: 4,
    prompt: "What will `typeof NaN` return?",
    options: [
      { label: "\"undefined\"", value: "undefined" },
      { label: "\"number\"", value: "number" },
      { label: "\"object\"", value: "object" },
      { label: "\"NaN\"", value: "nan" },
    ],
    correct: "number",
  },
  {
    id: 5,
    prompt: "Which statement best describes arrow functions?",
    options: [
      { label: "They have their own `this` binding.", value: "own-this" },
      { label: "They inherit `this` from the enclosing scope.", value: "lex-this" },
      { label: "They cannot return values.", value: "no-return" },
      { label: "They must always use braces.", value: "must-brace" },
    ],
    correct: "lex-this",
  },
  {
    id: 6,
    prompt: "What will be logged?",
    code: "const arr = [1, 2, 3];\narr[5] = 6;\nconsole.log(arr.length);",
    options: [
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "6", value: "6" },
      { label: "5", value: "5" },
    ],
    correct: "6",
  },
  {
    id: 7,
    prompt: "What does `Array.prototype.reduce` return when no initial value is provided?",
    options: [
      { label: "The first element is used as the initial accumulator.", value: "first-as-init" },
      { label: "The last element is used as the initial accumulator.", value: "last-as-init" },
      { label: "It returns undefined always.", value: "undefined" },
      { label: "It throws an error.", value: "throws" },
    ],
    correct: "first-as-init",
  },
  {
    id: 8,
    prompt: "What is the result of `Boolean('false')`?",
    options: [
      { label: "false", value: "false" },
      { label: "true", value: "true" },
      { label: "undefined", value: "undefined" },
      { label: "Throws TypeError", value: "typeerror" },
    ],
    correct: "true",
  },
  {
    id: 9,
    prompt: "Which statement about promises is correct?",
    options: [
      { label: "Promises can only resolve once.", value: "resolve-once" },
      { label: "Promises can resolve multiple times.", value: "resolve-multi" },
      { label: "A promise must always reject.", value: "must-reject" },
      { label: "Promises block the event loop.", value: "block-loop" },
    ],
    correct: "resolve-once",
  },
  {
    id: 10,
    prompt: "What is printed?",
    code: "console.log(typeof null);",
    options: [
      { label: "\"null\"", value: "null" },
      { label: "\"object\"", value: "object" },
      { label: "\"undefined\"", value: "undefined" },
      { label: "\"boolean\"", value: "boolean" },
    ],
    correct: "object",
  },
  {
    id: 11,
    prompt: "Which method converts JSON string to an object?",
    options: [
      { label: "JSON.stringify()", value: "stringify" },
      { label: "JSON.parse()", value: "parse" },
      { label: "Object.fromJSON()", value: "fromjson" },
      { label: "JSON.object()", value: "jsonobject" },
    ],
    correct: "parse",
  },
  {
    id: 12,
    prompt: "What will be the output?",
    code: "let a;\nconsole.log(a ?? 'fallback');",
    options: [
      { label: "undefined", value: "undefined" },
      { label: "null", value: "null" },
      { label: "fallback", value: "fallback" },
      { label: "Throws ReferenceError", value: "referror" },
    ],
    correct: "fallback",
  },
  {
    id: 13,
    prompt: "What does `Object.is(NaN, NaN)` return?",
    options: [
      { label: "true", value: "true" },
      { label: "false", value: "false" },
      { label: "Throws TypeError", value: "typeerror" },
      { label: "undefined", value: "undefined" },
    ],
    correct: "true",
  },
  {
    id: 14,
    prompt: "Which of the following creates a shallow copy of an array?",
    options: [
      { label: "arr.slice()", value: "slice" },
      { label: "arr.splice()", value: "splice" },
      { label: "arr.filter(Boolean)", value: "filter" },
      { label: "arr.reduce(() => [])", value: "reduce-empty" },
    ],
    correct: "slice",
  },
  {
    id: 15,
    prompt: "What will this log?",
    code: "const obj = { a: 1 };\nObject.freeze(obj);\nobj.a = 2;\nconsole.log(obj.a);",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "undefined", value: "undefined" },
      { label: "Throws TypeError", value: "typeerror" },
    ],
    correct: "1",
  },
];

const totalQuestions = questions.length;
const currentIndex = ref(0);
const selectedAnswers = reactive<Record<number, string>>({});

const currentQuestion = computed<Question>(() => (questions[currentIndex.value] ?? questions[0]) as Question);
const currentQuestionNumber = computed(() => currentIndex.value + 1);
const progressPercent = computed(() => ((currentIndex.value + 1) / totalQuestions) * 100);
const hasAnyAnswer = computed(() => Object.keys(selectedAnswers).length > 0);

const formattedTime = computed(() => {
  const mins = Math.floor(remaining.value / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

const stepClass = (idx: number) => {
  const q = questions[idx];
  if (!q) return "bg-[#d7e2fb]";
  if (idx < currentIndex.value && selectedAnswers[q.id]) {
    return "bg-[#4dbd8b]";
  }
  if (idx === currentIndex.value) {
    return selectedAnswers[q.id] ? "bg-[#4dbd8b]" : "bg-[#2f61c7]";
  }
  return "bg-[#d7e2fb]";
};

const selectAnswer = (questionId: number, value: string) => {
  selectedAnswers[questionId] = value;
};

const goNext = () => {
  if (currentIndex.value < totalQuestions - 1) currentIndex.value += 1;
};

const goBack = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1;
};

const computeScore = () => {
  let correct = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correct) correct += 1;
  });
  return correct;
};

const goToSubmitted = async () => {
  const correct = computeScore();
  const elapsed = durationSeconds - remaining.value;
  const scoreState = useState("assessmentScore", () => ({
    correct: 0,
    total: totalQuestions,
    elapsed: 0,
  }));
  scoreState.value = {
    correct,
    total: totalQuestions,
    elapsed,
  };
  await router.push("/assessments/tests/submitted");
};

const handleSubmit = () => {
  goToSubmitted();
};

const tick = () => {
  if (remaining.value > 0) {
    remaining.value -= 1;
    return;
  }
  clearTimer();
  goToSubmitted();
};

const clearTimer = () => {
  if (timerId.value) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
};

onMounted(() => {
  if (!timerId.value) {
    timerId.value = setInterval(tick, 1000);
  }
});

onBeforeUnmount(() => {
  clearTimer();
});
</script>