<<template>
  <div
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <!-- Background glow effects -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10 space-y-8">

      <!-- Header -->
      <div data-aos="fade-up" class="space-y-3">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">My Profile</h1>
        <p class="text-base sm:text-lg text-[#4c6087]">
          View your assessment history, skill metrics, and account details.
        </p>
      </div>

      <!-- Top Section: Profile Card + Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Profile Card -->
        <div data-aos="fade-up" class="lg:col-span-1">
          <div class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/70 px-6 py-8 flex flex-col items-center text-center">
            <!-- Avatar -->
            <div class="relative">
              <div class="h-28 w-28 rounded-full bg-gradient-to-br from-[#2f61c7] to-[#4f88ff] p-1 shadow-lg">
                <img 
                  :src="userAvatar" 
                  alt="Profile" 
                  class="h-full w-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div class="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-[#1fa97a] border-4 border-white shadow"></div>
            </div>

            <!-- Name & Department -->
            <h2 class="mt-5 text-2xl font-bold text-[#1c2b4a]">{{ userName }}</h2>
            <p class="text-sm text-[#4c6087] mt-1">{{ userDepartment }}</p>

            <!-- Role Badge -->
            <span class="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e8f0ff] text-[#2f61c7] text-xs font-semibold border border-[#cdd8f4]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Active Member
            </span>

            <!-- Edit Button -->
            <button 
              @click="isEditing = !isEditing"
              class="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#cdd8f4] bg-white px-5 py-2.5 text-sm font-semibold text-[#2f61c7] shadow-sm hover:bg-[#f6f8ff] hover:border-[#9fb6ec] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ isEditing ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>
        </div>

        <!-- Stats & Score Column -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Overall Skill Score -->
          <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Overall Skill Score</h3>
              <span 
                class="rounded-xl px-3 py-1 text-sm font-semibold"
                :class="getScoreBadgeClass(overallScore)"
              >
                {{ skillLevel }}
              </span>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-6">
              <!-- Circular Progress -->
              <div class="relative w-36 h-36 shrink-0">
                <svg class="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#e6edff" stroke-width="8" fill="none"/>
                  <circle
                    cx="50" cy="50" r="42"
                    :stroke="scoreColor"
                    stroke-width="8" fill="none"
                    :stroke-dasharray="`${overallScore * 2.638} 263.8`"
                    stroke-linecap="round"
                    class="transition-all duration-1000"
                  />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-3xl font-bold text-[#1c2b4a]">{{ overallScore }}%</span>
                  <span class="text-xs text-[#7890b8]">Proficiency</span>
                </div>
              </div>

              <!-- Score Breakdown -->
              <div class="flex-1 space-y-3 w-full">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[#4c6087]">Assessments Taken</span>
                  <span class="text-sm font-semibold text-[#1c2b4a]">{{ assessmentCount }}</span>
                </div>
                <div class="h-2 bg-[#e6edff] rounded-full">
                  <div class="h-full bg-[#2f61c7] rounded-full" :style="{ width: Math.min(assessmentCount * 10, 100) + '%' }"></div>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <span class="text-sm text-[#4c6087]">Highest Score</span>
                  <span class="text-sm font-semibold text-[#1c2b4a]">{{ highestScore }}%</span>
                </div>
                <div class="h-2 bg-[#e6edff] rounded-full">
                  <div class="h-full bg-green-500 rounded-full" :style="{ width: highestScore + '%' }"></div>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <span class="text-sm text-[#4c6087]">Current Field</span>
                  <span class="text-sm font-semibold text-[#1c2b4a]">{{ expertiseField }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats Row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div data-aos="fade-up" data-aos-delay="50" class="bg-white rounded-2xl shadow-md border border-white/70 px-4 py-5 text-center">
              <div class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-[#2f61c7]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="text-lg font-bold text-[#1c2b4a]">{{ totalQuestions }}</p>
              <p class="text-xs text-[#7890b8]">Questions</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" class="bg-white rounded-2xl shadow-md border border-white/70 px-4 py-5 text-center">
              <div class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-[#2f61c7]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-lg font-bold text-[#1c2b4a]">{{ correctAnswers }}</p>
              <p class="text-xs text-[#7890b8]">Correct</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" class="bg-white rounded-2xl shadow-md border border-white/70 px-4 py-5 text-center">
              <div class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-[#2f61c7]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-lg font-bold text-[#1c2b4a]">{{ avgTime }}</p>
              <p class="text-xs text-[#7890b8]">Avg. Time</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" class="bg-white rounded-2xl shadow-md border border-white/70 px-4 py-5 text-center">
              <div class="h-10 w-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-[#2f61c7]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p class="text-lg font-bold text-[#1c2b4a]">{{ streak }}</p>
              <p class="text-xs text-[#7890b8]">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Assessments History -->
      <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-[#1c2b4a]">Recent Assessments</h3>
            <p class="text-sm text-[#4c6087] mt-1">Your last 5 assessment sessions</p>
          </div>
          <button 
            @click="router.push('/dashboard')"
            class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-[#274fa3] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Dashboard
          </button>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(assessment, i) in recentAssessments" 
            :key="i"
            class="flex items-center gap-4 p-4 rounded-2xl bg-[#f6f8ff] border border-[#e3eafe] hover:shadow-md transition"
          >
            <!-- Score Circle -->
            <div class="relative w-14 h-14 shrink-0">
              <svg class="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#e6edff" stroke-width="10" fill="none"/>
                <circle
                  cx="50" cy="50" r="42"
                  :stroke="getScoreColor(assessment.score)"
                  stroke-width="10" fill="none"
                  :stroke-dasharray="`${assessment.score * 2.638} 263.8`"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-bold text-[#1c2b4a]">{{ assessment.score }}%</span>
              </div>
            </div>

            <!-- Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="text-sm font-semibold text-[#1c2b4a]">{{ assessment.field }}</h4>
                <span 
                  class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  :class="getLevelBadgeClass(assessment.level)"
                >
                  {{ assessment.level }}
                </span>
              </div>
              <p class="text-xs text-[#7890b8] mt-0.5">{{ assessment.date }} • {{ assessment.questions }} questions</p>
            </div>

            <!-- Arrow -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-[#cdd8f4] shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div v-if="recentAssessments.length === 0" class="text-center py-8 text-[#7890b8]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mx-auto h-10 w-10 mb-2 opacity-50">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-sm">No assessments taken yet.</p>
            <button 
              @click="router.push('/assessments/onboarding')"
              class="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-[#274fa3] transition"
            >
              Take First Assessment
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div v-if="isEditing" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2b4a]/40 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-[#1c2b4a]">Edit Profile</h3>
            <button @click="isEditing = false" class="text-[#7890b8] hover:text-[#1c2b4a]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-[#4c6087] mb-1">Full Name</label>
              <input 
                v-model="editForm.name"
                type="text"
                class="w-full rounded-xl border border-[#cdd8f4] px-4 py-2.5 text-sm text-[#1c2b4a] focus:border-[#2f61c7] focus:ring-2 focus:ring-[#2f61c7]/20 outline-none transition"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#4c6087] mb-1">Department</label>
              <input 
                v-model="editForm.department"
                type="text"
                class="w-full rounded-xl border border-[#cdd8f4] px-4 py-2.5 text-sm text-[#1c2b4a] focus:border-[#2f61c7] focus:ring-2 focus:ring-[#2f61c7]/20 outline-none transition"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#4c6087] mb-1">Area of Expertise</label>
              <select 
                v-model="editForm.expertise"
                class="w-full rounded-xl border border-[#cdd8f4] px-4 py-2.5 text-sm text-[#1c2b4a] focus:border-[#2f61c7] focus:ring-2 focus:ring-[#2f61c7]/20 outline-none transition bg-white"
              >
                <option v-for="field in availableFields" :key="field" :value="field">{{ field }}</option>
              </select>
            </div>
          </div>

          <div v-if="saveSuccess" class="rounded-xl bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-700 font-medium text-center">
  ✓ Profile updated successfully!
</div>

<!-- Error message -->
<p v-if="saveError" class="text-sm text-red-500 text-center">{{ saveError }}</p>

<div class="flex gap-3 pt-2">
  <button
    @click="isEditing = false"
    class="flex-1 rounded-xl border border-[#cdd8f4] bg-white px-4 py-2.5 text-sm font-semibold text-[#4c6087] hover:bg-[#f6f8ff] transition"
    :disabled="saveLoading"
  >
    Cancel
  </button>
  <button
    @click="saveProfile"
    class="flex-1 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow hover:bg-[#274fa3] transition disabled:opacity-60"
    :disabled="saveLoading"
  >
    {{ saveLoading ? 'Saving...' : 'Save Changes' }}
  </button>
</div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// ── Replace the entire <script setup> block in pages/profile/index.vue ──
// Keep your existing <template> exactly as it is — only the script changes.

definePageMeta({ layout: "auth" })

import { ref, computed, onMounted } from "vue"
import { useRouter } from "#app"
import { useAuth } from "~/composables/useAuth"

const router = useRouter()
const { apiCall, loadAuth } = useAuth()

// ── State ────────────────────────────────────────────────────────────────
const isEditing      = ref(false)
const saveLoading    = ref(false)
const saveError      = ref('')
const saveSuccess    = ref(false)

const userName       = ref('User')
const userDepartment = ref('Engineering')
const expertiseField = ref('Full Stack Developer')
const overallScore   = ref(0)
const assessmentCount = ref(0)
const highestScore   = ref(0)
const totalQuestions = ref(0)
const correctAnswers = ref(0)
const avgTime        = ref('—')
const streak         = ref(0)
const recentAssessments = ref([])

const editForm = ref({ name: '', department: '', expertise: '' })

const availableFields = [
  'AI Engineer', 'Full Stack Developer', 'Cybersecurity Analyst',
  'Cloud Engineer', 'DevOps Engineer', 'Data Scientist',
  'Data Analyst', 'Backend Developer', 'Machine Learning Engineer',
  'Mobile Developer', 'UI/UX Designer', 'Front End Developer'
]

// ── Computed ──────────────────────────────────────────────────────────────
const userAvatar = computed(() => {
  const seed = userName.value.replace(/\s/g, '').toLowerCase()
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=e9f0ff`
})

const skillLevel = computed(() => {
  const s = overallScore.value
  if (s >= 90) return 'Expert'
  if (s >= 80) return 'Advanced'
  if (s >= 70) return 'Upper Intermediate'
  if (s >= 60) return 'Intermediate'
  if (s >= 50) return 'Upper Basic'
  if (s >= 40) return 'Basic'
  if (s >= 20) return 'Beginner'
  return 'Absolute Beginner'
})

const scoreColor = computed(() => {
  const s = overallScore.value
  if (s >= 80) return '#22c55e'
  if (s >= 60) return '#f97316'
  if (s >= 40) return '#eab308'
  return '#ef4444'
})

// ── Helpers ───────────────────────────────────────────────────────────────
const getScoreBadgeClass = (score) => {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 60) return 'bg-orange-100 text-orange-700'
  if (score >= 40) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

const getScoreColor = (score) => {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f97316'
  if (score >= 40) return '#eab308'
  return '#ef4444'
}

const getLevelBadgeClass = (level) => {
  if (level === 'Expert' || level === 'Advanced') return 'bg-green-100 text-green-700'
  if (level === 'Upper Intermediate' || level === 'Intermediate') return 'bg-blue-100 text-blue-700'
  if (level === 'Upper Basic' || level === 'Basic') return 'bg-orange-100 text-orange-700'
  return 'bg-gray-100 text-gray-700'
}

// ── Load from backend + localStorage ─────────────────────────────────────
onMounted(async () => {
  loadAuth()

  // Load assessment history from localStorage
  if (import.meta.client) {
    try {
      const history = JSON.parse(localStorage.getItem('assessment_history') || '[]')
      recentAssessments.value = history.slice(0, 5).map(a => ({
        field:     a.field || 'Assessment',
        score:     a.score_percent ?? 0,
        level:     a.level || 'Beginner',
        date:      a.date || 'Recently',
        questions: a.total || 0
      }))
      assessmentCount.value = history.length
      highestScore.value    = Math.max(...history.map(a => a.score_percent ?? 0), 0)
      totalQuestions.value  = history.reduce((s, a) => s + (a.total || 0), 0)
      correctAnswers.value  = history.reduce((s, a) => s + (a.correct || 0), 0)

      // Average time across sessions
      const totalElapsed = history.reduce((s, a) => s + (a.elapsed || 0), 0)
      if (history.length > 0) {
        const avg = Math.round(totalElapsed / history.length)
        avgTime.value = `${Math.floor(avg/60)}m ${avg%60}s`
      }

      streak.value = Math.min(assessmentCount.value, 7)
    } catch {}

    try {
      const latest = JSON.parse(localStorage.getItem('latest_result') || 'null')
      if (latest) overallScore.value = latest.score_percent ?? 0
    } catch {}
  }

  // Load profile from backend (source of truth for name, dept, expertise)
  try {
    const data = await apiCall('/api/profile/', { method: 'GET' })
    userName.value       = data.full_name       || 'User'
    userDepartment.value = data.department      || 'Engineering'
    expertiseField.value = data.expertise_field || 'Full Stack Developer'

    // Sync to localStorage so dashboard and other pages stay in sync
    if (import.meta.client) {
      const stored = JSON.parse(localStorage.getItem('user') || '{}')
      stored.full_name       = data.full_name
      stored.department      = data.department
      stored.expertise_field = data.expertise_field
      localStorage.setItem('user', JSON.stringify(stored))
    }
  } catch (e) {
    // Fallback to localStorage if backend unavailable
    if (import.meta.client) {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}')
        if (u.full_name)       userName.value       = u.full_name
        if (u.department)      userDepartment.value = u.department
        if (u.expertise_field) expertiseField.value = u.expertise_field
      } catch {}
    }
  }

  // Prime edit form with current values
  editForm.value = {
    name:       userName.value,
    department: userDepartment.value,
    expertise:  expertiseField.value,
  }
})

// ── Save profile to backend ───────────────────────────────────────────────
const saveProfile = async () => {
  saveError.value   = ''
  saveSuccess.value = false
  saveLoading.value = true

  try {
    const data = await apiCall('/api/profile/', {
      method: 'PATCH',
      body: {
        full_name:       editForm.value.name,
        department:      editForm.value.department,
        expertise_field: editForm.value.expertise,
      }
    })

    // Update local state from confirmed backend response
    userName.value       = data.full_name
    userDepartment.value = data.department
    expertiseField.value = data.expertise_field

    // Keep localStorage in sync
    if (import.meta.client) {
      const stored = JSON.parse(localStorage.getItem('user') || '{}')
      stored.full_name       = data.full_name
      stored.department      = data.department
      stored.expertise_field = data.expertise_field
      localStorage.setItem('user', JSON.stringify(stored))
    }

    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
      isEditing.value   = false
    }, 1500)

  } catch (err) {
    saveError.value = err?.data?.error || 'Failed to save profile. Please try again.'
  } finally {
    saveLoading.value = false
  }
}

</script>