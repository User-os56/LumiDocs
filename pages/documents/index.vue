<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
    
    <!-- Page Header & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
          Document Hub
        </h1>
        <p class="text-xs text-slate-400 mt-1">
          Manage, analyze, and store your skill assessment certificates and portfolio assets.
        </p>
      </div>

      <button
        type="button"
        @click="showUploadModal = true"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/10 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        Upload File
      </button>
    </div>

    <!-- Storage Summary Bar -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Uploads</p>
          <p class="text-lg font-bold text-slate-100">{{ documents.length }} Files</p>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <div>
          <p class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Storage Used</p>
          <p class="text-lg font-bold text-slate-100">14.2 MB <span class="text-xs text-slate-500 font-normal">/ 100 MB</span></p>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Verified Documents</p>
          <p class="text-lg font-bold text-slate-100">3 Verified</p>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
      <!-- Search -->
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search documents by name or tag..."
          class="w-full rounded-xl bg-slate-900/80 border border-slate-800/80 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
        />
      </div>

      <!-- Categories -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
          :class="selectedCategory === category
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
            : 'bg-slate-900/60 text-slate-400 border border-slate-800/60 hover:text-slate-200'"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Documents Grid -->
    <div v-if="filteredDocuments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="doc in filteredDocuments"
        :key="doc.id"
        class="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
      >
        <div>
          <!-- File Icon & Category Badge -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="h-10 w-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300 group-hover:border-amber-500/30 group-hover:text-amber-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>

            <span class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700/60">
              {{ doc.category }}
            </span>
          </div>

          <!-- Title & Meta -->
          <h3 class="text-sm font-semibold text-slate-200 truncate group-hover:text-amber-400 transition-colors">
            {{ doc.name }}
          </h3>
          <p class="text-[11px] text-slate-500 mt-1">
            {{ doc.size }} • Uploaded {{ doc.uploadedAt }}
          </p>
        </div>

        <!-- Footer Actions -->
        <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <span 
            class="inline-flex items-center gap-1.5 text-[10px] font-medium"
            :class="{
  'text-emerald-400': doc.status === 'Ready',
  'text-amber-400': doc.status === 'Processing',
  'text-red-400': doc.status === 'Failed',
  'text-slate-400': !['Ready', 'Processing', 'Failed'].includes(doc.status)
}">
            <span class="h-1.5 w-1.5 rounded-full" :class="{
  'bg-emerald-400': doc.status === 'Ready',
  'bg-amber-400': doc.status === 'Processing',
  'bg-red-400': doc.status === 'Failed',
  'bg-slate-500': !['Ready', 'Processing', 'Failed'].includes(doc.status)
}""></span>
            {{ doc.status }}
          </span>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              @click="downloadDoc(doc)"
              class="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Download"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
            
            <button 
              type="button" 
              @click="deleteDoc(doc.id)"
              class="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-slate-900/30">
      <div class="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <p class="text-sm font-semibold text-slate-300">No documents found</p>
      <p class="text-xs text-slate-500 mt-1">Try updating your search filter or upload a new file.</p>
    </div>

    <!-- Upload Modal -->
    <Transition name="fade">
      <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div class="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-4">
          
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-slate-100">Upload New Document</h3>
            <button @click="showUploadModal = false" class="text-slate-400 hover:text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- File Drop Area -->
          <div
  @click="openFilePicker"
  class="border-2 border-dashed border-slate-800 hover:border-amber-500/40 rounded-xl p-8 text-center bg-slate-900/40 transition-colors cursor-pointer"
>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-amber-400 mx-auto mb-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <p class="text-xs font-semibold text-slate-300">Click to upload or drag and drop</p>
            <p class="text-[10px] text-slate-500 mt-1">
  PDF, DOC, DOCX, PPT, PPTX
</p>
            <input
              ref="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              class="hidden"
              @change="handleFileSelection"
            />
            <p
  v-if="uploadError"
  class="text-xs text-red-400 text-center"
>
  {{ uploadError }}
</p>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button 
              @click="showUploadModal = false"
              :disabled="uploading"
              class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuizApi } from '~/composables/useQuizApi'

const {
  documents,
  fetchDocuments,
  uploadDocument,
  deleteDocument
} = useQuizApi()

const searchQuery = ref('')
const selectedCategory = ref('All')
const showUploadModal = ref(false)
const uploading = ref(false)
const deleting = ref<number | null>(null)
const uploadError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const categories = [
  'All',
  'PDF',
  'Word',
  'PowerPoint'
]

interface DocumentItem {
  id: number
  name: string
  category: string
  size: string
  uploadedAt: string
  status: string
  file?: string
  fileType?: string
}

/*
 * Convert the document returned by Django
 * into the format expected by the template.
 */
const formattedDocuments = computed<DocumentItem[]>(() => {
  return documents.value.map((doc: any) => {
    const fileType = String(
      doc.file_type ||
      doc.fileType ||
      getExtension(doc.original_name || doc.name || '')
    ).toLowerCase()

    return {
      id: doc.id,

      name:
        doc.original_name ||
        doc.name ||
        'Unnamed document',

      category:
        getCategory(fileType),

      size:
        doc.size ||
        doc.file_size ||
        formatFileSize(doc.file_size_bytes) ||
        'Unknown size',

      uploadedAt:
        formatDate(
          doc.uploaded_at ||
          doc.uploadedAt ||
          doc.created_at
        ),

      status:
        normalizeStatus(doc.status),

      file:
        doc.file || undefined,

      fileType
    }
  })
})

const filteredDocuments = computed(() => {
  return formattedDocuments.value.filter(doc => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      doc.category === selectedCategory.value

    const query = searchQuery.value
      .trim()
      .toLowerCase()

    const matchesQuery =
      !query ||
      doc.name.toLowerCase().includes(query)

    return matchesCategory && matchesQuery
  })
})

/*
 * Fetch documents when the page loads.
 */
onMounted(async () => {
  await loadDocuments()
})

const loadDocuments = async () => {
  try {
    await fetchDocuments('date')
  } catch (error) {
    console.error('Failed to load documents:', error)
  }
}

/*
 * File selection
 */
const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFileSelection = async (
  event: Event
) => {
  const target = event.target as HTMLInputElement

  const file = target.files?.[0]

  if (!file) {
    return
  }

  await handleUpload(file)

  // Reset input so the same file can be selected again.
  target.value = ''
}

/*
 * Upload document
 */
const handleUpload = async (file: File) => {
  uploadError.value = ''

  const allowedExtensions = [
    '.pdf',
    '.doc',
    '.docx',
    '.ppt',
    '.pptx'
  ]

  const extension = getExtension(file.name)

  if (!allowedExtensions.includes(extension)) {
    uploadError.value =
      'Unsupported file type. Please upload PDF, DOC, DOCX, PPT, or PPTX files.'

    return
  }

  /*
   * Your backend currently does not enforce a 10 MB limit,
   * so we don't need to enforce the old frontend 10 MB message here.
   */

  try {
    uploading.value = true

    await uploadDocument(file)

    showUploadModal.value = false

    await loadDocuments()
  } catch (error: any) {
    console.error('Failed to upload document:', error)

    uploadError.value =
      error?.data?.error ||
      error?.message ||
      'Failed to upload document.'
  } finally {
    uploading.value = false
  }
}

/*
 * Delete document
 */
const deleteDoc = async (id: number) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this document?'
  )

  if (!confirmed) {
    return
  }

  try {
    deleting.value = id

    await deleteDocument(id)

    await loadDocuments()
  } catch (error: any) {
    console.error('Failed to delete document:', error)

    alert(
      error?.data?.error ||
      error?.message ||
      'Failed to delete document.'
    )
  } finally {
    deleting.value = null
  }
}

/*
 * Download document
 *
 * This works if your UploadedDocumentSerializer
 * exposes the file URL through the "file" field.
 */
const downloadDoc = (doc: DocumentItem) => {
  if (!doc.file) {
    console.warn(
      'No file URL was returned for this document.'
    )

    alert(
      'The document file URL is not available.'
    )

    return
  }

  const fileUrl = doc.file.startsWith('http')
    ? doc.file
    : `http://localhost:8000${doc.file}`

  window.open(fileUrl, '_blank')
}

/*
 * Helpers
 */
const getExtension = (filename: string) => {
  const parts = filename.split('.')

  if (parts.length < 2) {
    return ''
  }

  return `.${parts.pop()?.toLowerCase()}`
}

const getCategory = (extension: string) => {
  switch (extension) {
    case '.pdf':
      return 'PDF'

    case '.doc':
    case '.docx':
      return 'Word'

    case '.ppt':
    case '.pptx':
      return 'PowerPoint'

    default:
      return 'Other'
  }
}

const formatFileSize = (
  bytes?: number
) => {
  if (!bytes || bytes <= 0) {
    return ''
  }

  const units = [
    'Bytes',
    'KB',
    'MB',
    'GB'
  ]

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  )

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

const formatDate = (
  value?: string
) => {
  if (!value) {
    return 'Unknown date'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }
  )
}

const normalizeStatus = (
  status?: string
) => {
  switch (
    String(status || '').toLowerCase()
  ) {
    case 'ready':
      return 'Ready'

    case 'processing':
      return 'Processing'

    case 'failed':
      return 'Failed'

    default:
      return status || 'Unknown'
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>