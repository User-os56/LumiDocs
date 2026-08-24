<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div class="w-full max-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Generate AI Quiz
        </h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-200 text-sm">✕</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleGenerate" class="space-y-5">
        <!-- Document Selection -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Select Document</label>
          <select 
            v-model="form.document_id" 
            required 
            class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option disabled value="">Choose a document...</option>
            <option v-for="doc in documents" :key="doc.id" :value="doc.id">
              {{ doc.title || doc.filename }}
            </option>
          </select>
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Difficulty</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="level in ['easy', 'medium', 'hard']"
              :key="level"
              type="button"
              @click="form.difficulty = level"
              :class="[
                'py-2.5 rounded-xl text-sm capitalize font-medium transition-all border',
                form.difficulty === level
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              ]"
            >
              {{ level }}
            </button>
          </div>
        </div>

        <!-- Question Count -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Number of Questions: <span class="text-amber-400 font-bold">{{ form.num_questions }}</span>
          </label>
          <input 
            type="range" 
            v-model.number="form.num_questions" 
            min="5" 
            max="20" 
            step="5" 
            class="w-full accent-amber-500 bg-slate-950 cursor-pointer"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 pt-2">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="w-1/2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="loading || !form.document_id"
            class="w-1/2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></span>
            <span>{{ loading ? 'Analyzing...' : 'Start Quiz' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizApi } from '~/composables/useQuizApi'

const props = defineProps({
  isOpen: Boolean,
  documents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])
const router = useRouter()
const { generateTest } = useQuizApi()

const loading = ref(false)
const form = ref({
  document_id: '',
  difficulty: 'medium',
  num_questions: 10
})

const handleGenerate = async () => {
  if (!form.value.document_id) return
  loading.value = true
  try {
    const res = await generateTest(form.value)
    emit('close')
    // Navigate to active assessment screen with generated quiz ID/payload
    router.push({
      path: `/dashboard/assessment/${res.data?.id || res.id}`,
      state: { quizData: res.data || res }
    })
  } catch (err) {
    alert(err.message || 'Failed to generate assessment.')
  } finally {
    loading.value = false
  }
}
</script>