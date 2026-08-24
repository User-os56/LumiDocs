<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
    
    <!-- Top Bar Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <span class="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">LUMIERE</span> Workspace
        </h1>
        <p class="text-slate-400 text-sm mt-1">Transform course notes, slides, and papers into dynamic AI quizzes.</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="fileInputRef.click()" 
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 font-semibold text-slate-950 transition-all shadow-lg shadow-amber-500/10 active:scale-95"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Upload Document
        </button>
      </div>
    </header>

    <!-- Stat Highlights Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Library Size</p>
        <div class="flex items-baseline justify-between mt-2">
          <span class="text-3xl font-bold text-white">{{ stats.totalDocuments }}</span>
          <span class="text-xs text-amber-400 font-medium">Files Stored</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Tests</p>
        <div class="flex items-baseline justify-between mt-2">
          <span class="text-3xl font-bold text-white">{{ stats.totalTests }}</span>
          <span class="text-xs text-emerald-400 font-medium">+{{ stats.weeklyTests }} this week</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Score</p>
        <div class="flex items-baseline justify-between mt-2">
          <span class="text-3xl font-bold text-white">{{ stats.avgScore }}%</span>
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Grade {{ stats.overallGrade }}
          </span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Groq AI Status</p>
        <div class="flex items-center justify-between mt-3">
          <span class="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Llama 3 Ready
          </span>
          <span class="text-xs text-slate-500">Fast Extraction</span>
        </div>
      </div>
    </div>

    <!-- Main Workspace Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Left Column: Quick Upload Zone & Recent Documents -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Drag and Drop Quick Upload Container -->
        <div 
          @dragover.prevent="isDragging = true" 
          @dragleave.prevent="isDragging = false" 
          @drop.prevent="handleFileDrop"
          :class="[
            'p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center relative overflow-hidden',
            isDragging ? 'border-amber-400 bg-amber-500/5 scale-[1.01]' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
          ]"
        >
          <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <svg v-if="!isUploading" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            <svg v-else class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
          </div>
          <h3 class="text-base font-semibold text-white">
            {{ isUploading ? 'Uploading & Extracting Content...' : 'Drop course files here to analyze' }}
          </h3>
          <p class="text-xs text-slate-400 mt-1">Supports PDF, DOCX, or PPTX files up to 25MB</p>

          <input type="file" ref="fileInputRef" @change="handleFileSelect" class="hidden" accept=".pdf,.docx,.pptx" />
          <button 
            :disabled="isUploading"
            @click="fileInputRef.click()" 
            class="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors disabled:opacity-50"
          >
            Browse Computer
          </button>
        </div>

        <!-- Recent Documents Table / Card List -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-white">Recent Documents</h2>
            <NuxtLink to="/documents" class="text-xs font-semibold text-amber-400 hover:underline">View All Documents →</NuxtLink>
          </div>

          <div v-if="documents.length === 0" class="py-8 text-center text-slate-500 text-sm">
            No documents uploaded yet.
          </div>

          <div v-else class="space-y-3">
            <div 
              v-for="doc in documents" 
              :key="doc.id || doc.document_id || doc.uuid" 
              class="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800/60 hover:border-slate-700/80 transition-all group"
            >
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center text-amber-400 font-bold uppercase text-xs shrink-0">
                  {{ getFileExtension(doc.original_name || doc.filename || doc.title || 'PDF') }}
                </div>
                <div class="truncate">
                  <p class="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                    {{ doc.original_name || doc.filename || doc.title || 'Untitled Document' }}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Uploaded {{ formatDate(doc.uploaded_at || doc.created_at) }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <!-- Status Badge -->
                <span 
                  :class="[
                    'text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wide',
                    (doc.status === 'ready' || !doc.status) ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    doc.status === 'processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' : 
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  ]"
                >
                  {{ doc.status || 'ready' }}
                </span>

                <!-- Action Button -->
                <button 
                  v-if="doc.status === 'ready'"
                  @click="generateTestFor(doc.id || doc.document_id || doc.uuid)"
                  class="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 font-medium transition-colors"
                >
                  Generate Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Recent Test Attempts & Intelligence Panel -->
      <div class="space-y-8">

        <!-- Recent Test Attempts -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-white">Recent Attempts</h2>
            <NuxtLink to="/assessments/history" class="text-xs font-semibold text-amber-400 hover:underline">History →</NuxtLink>
          </div>

          <!-- Loading Spinner State -->
          <div v-if="isLoadingAttempts" class="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <svg class="w-7 h-7 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <p class="text-xs font-medium">Fetching assessments...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="recentAttempts.length === 0" class="py-8 text-center text-slate-500 text-sm">
            No quizzes completed yet.
          </div>

          <!-- Populated Attempts List -->
          <div v-else class="space-y-3">
            <NuxtLink 
              v-for="attempt in recentAttempts" 
              :key="attempt.id" 
              :to="`/assessments/history/${attempt.id}`"
              class="block p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/60 hover:border-amber-500/40 transition-all"
            >
              <div class="flex items-center justify-between">
                <div class="truncate pr-2">
                  <p class="text-xs font-semibold text-slate-200 truncate">{{ attempt.document_name || 'General Quiz' }}</p>
                  <p class="text-[11px] text-slate-500 mt-1">{{ attempt.difficulty }} • {{ formatDate(attempt.created_at) }}</p>
                </div>

                <div class="text-right shrink-0">
                  <span 
                    :class="[
                      'inline-block text-xs font-black px-2 py-0.5 rounded',
                      attempt.grade === 'A' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      attempt.grade === 'B' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    ]"
                  >
                    Grade {{ attempt.grade }}
                  </span>
                  <p class="text-[11px] font-bold text-slate-400 mt-1">{{ attempt.percentage }}%</p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Study AI Tip Card -->
        <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
          <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Study Intelligence
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Upload longer documents with structured sub-headings to get higher precision multiple-choice questions from the Groq API engine.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizApi } from '~/composables/useQuizApi'

const router = useRouter()
const { fetchDocuments, uploadDocument, fetchTestHistory } = useQuizApi()

const isDragging = ref(false)
const isUploading = ref(false)
const isLoadingAttempts = ref(true)
const fileInputRef = ref(null)

const documents = ref([])
const recentAttempts = ref([])

const stats = ref({
  totalDocuments: 0,
  totalTests: 0,
  weeklyTests: 0,
  avgScore: 0,
  overallGrade: 'N/A'
})

const loadDashboardData = async () => {
  isLoadingAttempts.value = true
  try {
    // 1. Fetch documents
    const docsRes = await fetchDocuments('date')
    const docsList = Array.isArray(docsRes) ? docsRes : (docsRes?.results || [])
    
    // Sort newest uploaded documents to the top
    const sortedDocs = [...docsList].sort((a, b) => {
      const dateA = new Date(a.uploaded_at || a.created_at || 0)
      const dateB = new Date(b.uploaded_at || b.created_at || 0)
      return dateB - dateA
    })

    documents.value = sortedDocs.slice(0, 5)
    stats.value.totalDocuments = docsList.length

    // 2. Fetch history
    const historyRes = await fetchTestHistory()
    const historyList = Array.isArray(historyRes) ? historyRes : (historyRes?.results || [])
    recentAttempts.value = historyList.slice(0, 4)
    stats.value.totalTests = historyList.length

    if (historyList.length > 0) {
      const totalScore = historyList.reduce((acc, cur) => acc + (cur.percentage || 0), 0)
      stats.value.avgScore = Math.round(totalScore / historyList.length)
      stats.value.overallGrade = stats.value.avgScore >= 70 ? 'A' : stats.value.avgScore >= 60 ? 'B' : 'C'
    }
  } catch (err) {
    console.error('Failed to load dashboard data:', err)
  } finally {
    isLoadingAttempts.value = false
  }
}

const handleFileDrop = async (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    await processUpload(files[0])
  }
}

const handleFileSelect = async (event) => {
  const files = event.target.files
  if (files.length > 0) {
    await processUpload(files[0])
  }
}

const processUpload = async (file) => {
  isUploading.value = true
  try {
    await uploadDocument(file)
    await loadDashboardData()
  } catch (err) {
    console.error('Upload error details:', err)
    alert('Upload failed: ' + (err.message || 'Unknown error'))
  } finally {
    isUploading.value = false
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

const generateTestFor = (docId) => {
  router.push(`/assessments/onboarding?docId=${docId}`)
}

const getFileExtension = (name) => {
  if (!name) return 'FILE'
  const ext = name.split('.').pop()
  return ext ? ext.substring(0, 4).toUpperCase() : 'FILE'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'Recently'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  loadDashboardData()
})
</script>