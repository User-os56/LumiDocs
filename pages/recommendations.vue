<template>
  <Pageloader v-if="!mounted" message="Please wait while the page loads" />
  <div v-else
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10 space-y-8">
      <!-- Header -->
      <div data-aos="fade-up" class="space-y-3">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">Recommendations</h1>
        <p class="text-base sm:text-lg text-[#4c6087]">
          Here are the recommended resources and learning opportunities for you, based on your skill gap analysis and assessment results.
        </p>
      </div>

      <!-- Toggle Switch -->
      <div data-aos="fade-up" class="flex items-center justify-center gap-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/70 px-6 py-4">
        <span class="text-sm font-medium text-[#4c6087]" :class="{ 'text-[#1c2b4a] font-semibold': !isPaid }">
          Free Resources
        </span>
        <button
          @click="isPaid = !isPaid"
          class="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2f61c7] focus:ring-offset-2"
          :class="isPaid ? 'bg-[#2f61c7]' : 'bg-gray-300'"
        >
          <span
            class="inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg"
            :class="isPaid ? 'translate-x-9' : 'translate-x-1'"
          ></span>
        </button>
        <span class="text-sm font-medium text-[#4c6087]" :class="{ 'text-[#1c2b4a] font-semibold': isPaid }">
          Paid Resources
        </span>
      </div>

      <!-- Loading State -->
<div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f61c7]"></div>
  <p class="text-[#4c6087] text-sm font-medium">
    Generating tailored {{ isPaid ? 'premium' : 'free' }} resources for {{ userField }}...
  </p>
</div>

<div v-else-if="fetchError" class="text-center py-12 bg-red-50 rounded-2xl border border-red-200 max-w-2xl mx-auto px-4">
  <p class="text-red-700 font-semibold">Failed to load recommendations.</p>
  <p class="text-red-500 text-xs mt-1">{{ fetchError }}</p>
  <button @click="loadRecommendations()"
    class="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition">
    Try Again
  </button>
</div>


      <!-- Main Content (Show only when not loading or errored) -->
      <div v-else class="space-y-8">
        
        <!-- Skill Development Recommendations -->
        <div v-if="skillDevelopmentRecommendations.length > 0" data-aos="fade-up" class="space-y-4">
          <div>
            <h2 class="text-2xl font-bold text-[#1c2b4a]">Skill Development Recommendations</h2>
            <p class="text-sm text-[#4c6087] mt-1">Priority areas to focus on based on your skill gaps.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="recommendation in skillDevelopmentRecommendations"
              :key="recommendation.title"
              class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition"
            >
              <!-- Tags -->
              <div class="flex items-center gap-2 flex-wrap">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="getPriorityClass(recommendation.priority)"
                >
                  {{ recommendation.priority }} Priority
                </span>
                <span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Skill Gap
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-[#1c2b4a]">{{ recommendation.title }}</h3>

              <!-- Priority Badge -->
              <div>
                <span
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  :class="getPriorityBadgeClass(recommendation.priority)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-3 w-3">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ recommendation.priority }} Priority
                </span>
              </div>

              <!-- Description -->
              <p class="text-sm text-[#586d96] leading-relaxed flex-1">
                {{ recommendation.description }}
              </p>

              <!-- Illustration Placeholder -->
              <div class="h-32 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-16 w-16 text-[#9fbaf5]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- CTA Button -->
              <a
                :href="recommendation.url"
                target="_blank"
                class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
                :class="getPriorityButtonClass(recommendation.priority)"
              >
                {{ recommendation.buttonText || 'Explore Resource' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Skill Improvement Resources -->
        <div v-if="skillImprovementResources.length > 0" data-aos="fade-up" class="space-y-4">
          <h2 class="text-2xl font-bold text-[#1c2b4a]">Skill Improvement Resources</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="resource in skillImprovementResources"
              :key="resource.title"
              class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition"
            >
              <!-- Tags -->
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#2f61c7] text-white">
                  {{ resource.type }}
                </span>
                <span v-if="resource.recommendedTag" class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {{ resource.recommendedTag }}
                </span>
              </div>

              <!-- Image/Illustration -->
              <div class="h-40 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center relative overflow-hidden">
                <div v-if="resource.isLive" class="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                  LIVE
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-20 w-20 text-[#9fbaf5]">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-[#1c2b4a]">{{ resource.title }}</h3>

              <!-- Description -->
              <p class="text-sm text-[#586d96] leading-relaxed flex-1">
                {{ resource.description }}
              </p>

              <!-- CTA Button -->
              <a
                :href="resource.url"
                target="_blank"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-[#274fa3] hover:shadow-xl transition"
              >
                {{ resource.buttonText || 'View Resource' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Global Empty State Guard -->
        <div v-if="skillDevelopmentRecommendations.length === 0 && skillImprovementResources.length === 0" class="text-center py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mx-auto h-12 w-12 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-gray-900">No active AI suggestions</h3>
          <p class="mt-1 text-sm text-gray-500">We couldn't find specialized recommendation records for this resource filter tier.</p>
        </div>

        <!-- View All Resources Button -->
        <div data-aos="fade-up" class="flex justify-center pt-4">
          <button class="inline-flex items-center gap-2 rounded-xl bg-white border-2 border-gray-300 text-[#1c2b4a] px-6 py-3 text-sm font-semibold shadow hover:border-[#2f61c7] hover:text-[#2f61c7] transition">
            View All Resources
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" })

import { ref, onMounted, watch } from "vue"
import PageLoader from '~/components/PageLoader.vue'
const { apiCall, loadAuth } = useAuth()

// ── UI state ──────────────────────────────────────────────────────────────
const isPaid    = ref(false)
const loading   = ref(false)
const fetchError = ref(null)
const mounted   = ref(false)

const skillDevelopmentRecommendations = ref([])
const skillImprovementResources       = ref([])

// ── User data ─────────────────────────────────────────────────────────────
const userField = ref('Full Stack Developer')
const userScore = ref(0)

// ── Load recommendations from backend ────────────────────────────────────
const loadRecommendations = async () => {
  loading.value    = true
  fetchError.value = null

  const tier  = isPaid.value ? 'paid' : 'free'
  const field = encodeURIComponent(userField.value)
  const score = userScore.value

  try {
    // Build URL with query params manually — apiCall uses fetch() directly
    // and doesn't support a query object, so we append them to the URL string
    const data = await apiCall(
      `/api/recommendations/?tier=${tier}&field=${field}&score=${score}`,
      { method: 'GET' }
    )

    skillDevelopmentRecommendations.value = data.skill_development    || []
    skillImprovementResources.value       = data.improvement_resources || []
  } catch (err) {
    console.error('Recommendations error:', err)
    fetchError.value = err?.data?.error || err?.message || 'Could not load recommendations.'
  } finally {
    loading.value = false
  }
}

// ── Re-fetch when tier toggle changes ────────────────────────────────────
watch(isPaid, () => loadRecommendations())

// ── On mount: read localStorage then call API ─────────────────────────────
onMounted(async () => {
  loadAuth()

  if (import.meta.client) {
    // Read expertise field — check user profile first, then latest result
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}')
      if (u.expertise_field) userField.value = u.expertise_field
      else if (u.field)      userField.value = u.field
    } catch {}

    // Read score from latest assessment result
    try {
      const r = JSON.parse(localStorage.getItem('latest_result') || 'null')
      if (r) {
        // Convert percentage score to theta-like value the backend understands
        userScore.value = r.score_percent !== undefined
          ? ((r.score_percent - 50) / 50) * 3.0
          : (r.theta ?? 0)
      }
    } catch {}
  }

  await loadRecommendations()
  mounted.value = true
})

// ── Priority styling helpers ──────────────────────────────────────────────
const getPriorityClass = (p) => {
  if (p === 'High')   return 'bg-red-100 text-red-700'
  if (p === 'Medium') return 'bg-orange-100 text-orange-700'
  return 'bg-green-100 text-green-700'
}
const getPriorityBadgeClass = (p) => {
  if (p === 'High')   return 'bg-blue-50 text-blue-700 border border-blue-200'
  if (p === 'Medium') return 'bg-orange-50 text-orange-700 border border-orange-200'
  return 'bg-green-50 text-green-700 border border-green-200'
}
const getPriorityButtonClass = (p) => {
  if (p === 'High')   return 'bg-blue-600 hover:bg-blue-700'
  if (p === 'Medium') return 'bg-orange-600 hover:bg-orange-700'
  return 'bg-green-600 hover:bg-green-700'
}
</script>
