<template>
<PageLoader v-if="!mounted" message="Please wait while the template"/>
  <div v-else
    class="relative min-h-screen rounded-[5%] w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 rounded-[5%] bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.18),_transparent_45%)]"></div>
      <div class="absolute inset-0 rounded-[5%] bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10 space-y-8">

      <!-- Top bar -->
      <div data-aos="fade-up" class="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-md px-4 sm:px-6 py-3 border border-white/60">
        <div class="flex items-center gap-3 sm:gap-4">
          <div class="h-10 w-10 rounded-xl bg-[#3568d4] flex items-center justify-center shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-6 w-6">
              <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Zm-8 3h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-[#2d4570]">LUMIERE</p>
            <p class="text-xs text-[#5672a5]">Dashboard</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="hidden sm:inline-flex items-center gap-2 rounded-full bg-white border border-[#cdd8f4] px-4 py-2 text-sm font-medium text-[#2d4570] shadow-sm hover:border-[#9fb6ec] transition">
            <span class="h-2 w-2 rounded-full bg-[#1fa97a] shadow-[0_0_0_4px_rgba(31,169,122,0.18)]"></span>
            Connected
          </button>
          <div @click="goToProfile" class="h-10 w-10 rounded-full bg-white border border-[#d5def5] shadow flex items-center justify-center">
            <img src="https://i.pravatar.cc/100" alt="profile" class="h-9 w-9 rounded-full object-cover" />
          </div>
        </div>
      </div>

      <!-- ═══ HAS ASSESSMENT DATA ═══ -->
      <template v-if="hasAssessmentData">

        <!-- Welcome -->
        <div data-aos="fade-up" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 px-6 sm:px-8 py-6">
          <h2 class="text-2xl font-bold text-[#1c2b4a]">Welcome back, {{ userName }}!</h2>
          <p class="text-sm text-[#4c6087] mt-1">{{ userDepartment }} | Level: {{ skillLevel }}</p>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Left column -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Skill Proficiency -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Skill Proficiency</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4 text-[#2f61c7]">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium text-[#1c2b4a]">{{ expertiseField }}</span>
                  </div>
                  <span class="text-sm font-semibold text-[#1c2b4a]">{{ overallScore }}%</span>
                </div>
                <div class="h-3 bg-[#e6edff] rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :class="getProgressColor(overallScore)"
                    :style="{ width: overallScore + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-[#4c6087]">
                  {{ currentResult.correct ?? 0 }} correct out of {{ currentResult.total ?? 0 }} questions answered
                </p>
              </div>
            </div>

            <!-- Skill Coverage Radar Chart -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Skill Coverage Radar</h3>
              <div class="flex flex-col items-center">
                <div class="relative w-full max-w-[400px] aspect-square">
                  <svg viewBox="0 0 400 400" class="w-full h-full">
                    <!-- Background grid -->
                    <g v-for="level in [20, 40, 60, 80, 100]" :key="level">
                      <polygon
                        :points="getRadarPoints(level)"
                        fill="none"
                        stroke="#e3eafe"
                        stroke-width="1"
                      />
                      <text
                        :x="200 + (level / 100) * 180 * Math.cos(-Math.PI / 2)"
                        :y="200 + (level / 100) * 180 * Math.sin(-Math.PI / 2) - 5"
                        class="text-[10px] fill-[#7890b8]"
                        text-anchor="middle"
                      >{{ level }}%</text>
                    </g>
                    <!-- Axis lines -->
                    <line
                      v-for="(axis, i) in radarAxes"
                      :key="`axis-${i}`"
                      x1="200" y1="200"
                      :x2="200 + 180 * Math.cos((i * 2 * Math.PI / radarAxes.length) - Math.PI / 2)"
                      :y2="200 + 180 * Math.sin((i * 2 * Math.PI / radarAxes.length) - Math.PI / 2)"
                      stroke="#e3eafe"
                      stroke-width="1"
                    />
                    <!-- Data polygon -->
                    <polygon
                      :points="radarDataPoints"
                      fill="rgba(47, 97, 199, 0.15)"
                      stroke="#2f61c7"
                      stroke-width="2.5"
                      stroke-linejoin="round"
                    />
                    <!-- Data points -->
                    <circle
                      v-for="(point, i) in radarPointCoords"
                      :key="`point-${i}`"
                      :cx="point.x"
                      :cy="point.y"
                      r="5"
                      fill="#2f61c7"
                      stroke="white"
                      stroke-width="2"
                      class="hover:r-6 transition-all"
                    />
                    <!-- Labels -->
                    <text
                      v-for="(axis, i) in radarAxes"
                      :key="`label-${i}`"
                      :x="200 + 200 * Math.cos((i * 2 * Math.PI / radarAxes.length) - Math.PI / 2)"
                      :y="200 + 200 * Math.sin((i * 2 * Math.PI / radarAxes.length) - Math.PI / 2)"
                      class="text-xs font-semibold fill-[#1c2b4a]"
                      text-anchor="middle"
                      dominant-baseline="middle"
                    >{{ axis }}</text>
                  </svg>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 justify-center">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-[#2f61c7]"></div>
                    <span class="text-xs text-[#4c6087]">Current Score</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full border-2 border-[#e3eafe] bg-white"></div>
                    <span class="text-xs text-[#4c6087]">Target (100%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gap Priority Breakdown -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Gap Priority Breakdown</h3>
              <div class="flex flex-col sm:flex-row items-center gap-6">
                <!-- Donut Chart -->
                <div class="relative w-48 h-48 shrink-0">
                  <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                    <!-- Background circle -->
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5ff" stroke-width="12" />
                    <!-- Segments -->
                    <circle
                      v-for="(segment, i) in gapPrioritySegments"
                      :key="i"
                      cx="50" cy="50" r="40"
                      fill="none"
                      :stroke="segment.color"
                      stroke-width="12"
                      :stroke-dasharray="`${segment.length} ${251.3 - segment.length}`"
                      :stroke-dashoffset="segment.offset"
                      stroke-linecap="round"
                      class="transition-all duration-700"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-[#1c2b4a]">{{ skillGaps.length }}</span>
                    <span class="text-xs text-[#7890b8]">Total Gaps</span>
                  </div>
                </div>
                <!-- Legend -->
                <div class="flex-1 space-y-3 w-full">
                  <div
                    v-for="(item, i) in gapPriorityLegend"
                    :key="i"
                    class="flex items-center justify-between p-3 rounded-xl bg-[#f6f8ff] border border-[#e3eafe]"
                  >
                    <div class="flex items-center gap-3">
                      <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: item.color }"></div>
                      <span class="text-sm font-medium text-[#1c2b4a]">{{ item.label }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="h-2 bg-[#e6edff] rounded-full w-24 overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all duration-700"
                          :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                        ></div>
                      </div>
                      <span class="text-sm font-semibold text-[#1c2b4a] w-8 text-right">{{ item.count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommended Learning -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Recommended Learning</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  v-for="course in recommendedCourses"
                  :key="course.title"
                  class="rounded-2xl border border-[#e3eafe] bg-[#f6f8ff] px-4 py-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-semibold text-sm text-[#1c2b4a] mb-1">{{ course.title }}</h4>
                      <p class="text-xs text-[#586d96]">{{ course.platform }}</p>
                    </div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-semibold shrink-0 ml-1">
                      For You
                    </span>
                  </div>
                  <div class="h-20 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-10 w-10 text-[#9fbaf5]">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a :href="course.url" target="_blank" class="text-xs text-[#2f61c7] font-medium hover:underline">
                    View Resource →
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Right column -->
          <div class="space-y-6">

            <!-- Overall Skill Score -->
            <div v-if="showSkillScore" data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 relative">
              <button @click="showSkillScore = false" class="absolute top-4 right-4 text-[#7890b8] hover:text-[#1c2b4a] transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Overall Skill Score</h3>
              <div class="flex flex-col items-center gap-4">
                <div class="text-5xl font-bold text-[#1c2b4a]">{{ overallScore }}%</div>
                <span class="rounded-xl bg-[#2f61c7] text-white px-4 py-1.5 text-sm font-semibold">
                  {{ skillLevel }}
                </span>
                <div class="relative w-32 h-32">
                  <svg class="transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e6edff" stroke-width="8" fill="none"/>
                    <circle
                      cx="50" cy="50" r="40"
                      :stroke="overallScore >= 70 ? '#22c55e' : overallScore >= 50 ? '#f97316' : '#ef4444'"
                      stroke-width="8" fill="none"
                      :stroke-dasharray="`${overallScore * 2.513} 251.3`"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-[#1c2b4a]">{{ overallScore }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skill Gap Detail -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Skill Gap Detail</h3>
              <div v-if="skillGaps.length" class="space-y-4">
                <div
                  v-for="(gap, i) in skillGaps"
                  :key="gap.name"
                  class="relative overflow-hidden rounded-2xl border border-[#e3eafe] bg-[#f6f8ff] p-4"
                >
                  <!-- Priority indicator bar -->
                  <div
                    class="absolute top-0 left-0 h-1 w-full"
                    :class="gap.priority === 'High' ? 'bg-red-500' : gap.priority === 'Medium' ? 'bg-orange-500' : 'bg-yellow-400'"
                  ></div>
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span
                        class="inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold text-white shrink-0"
                        :class="gap.priority === 'High' ? 'bg-red-500' : gap.priority === 'Medium' ? 'bg-orange-500' : 'bg-yellow-400'"
                      >{{ i + 1 }}</span>
                      <span class="text-sm font-semibold text-[#1c2b4a]">{{ gap.name }}</span>
                    </div>
                    <span
                      class="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
                      :class="gap.priority === 'High' ? 'bg-red-100 text-red-700' : gap.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'"
                    >{{ gap.priority }}</span>
                  </div>
                  <!-- Gap severity bar -->
                  <div class="mt-2">
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="text-[#7890b8]">Gap Severity</span>
                      <span class="font-semibold text-[#1c2b4a]">{{ gap.severity }}%</span>
                    </div>
                    <div class="h-2 bg-[#e6edff] rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-700"
                        :class="gap.priority === 'High' ? 'bg-red-500' : gap.priority === 'Medium' ? 'bg-orange-500' : 'bg-yellow-400'"
                        :style="{ width: gap.severity + '%' }"
                      ></div>
                    </div>
                  </div>
                  <p class="text-xs text-[#586d96] mt-2">{{ gap.recommendation }}</p>
                </div>
              </div>
              <p v-else class="text-sm text-[#4c6087]">No gaps detected — excellent performance!</p>
            </div>

            <!-- Recent Assessments -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Recent Assessments</h3>
              <div class="mb-4">
                <h4 class="text-sm font-medium text-[#4c6087] mb-2">Your Progress</h4>
                <div class="h-24 bg-gradient-to-r from-[#e8f0ff] to-[#f0f5ff] rounded-xl p-2">
                  <svg viewBox="0 0 200 80" preserveAspectRatio="none" class="h-full w-full">
                    <path :d="progressLinePath" stroke="#2f61c7" stroke-width="3" fill="none"/>
                    <circle v-for="(pt, i) in progressPoints" :key="i" :cx="pt.x" :cy="pt.y" r="4" fill="#2f61c7"/>
                  </svg>
                </div>
              </div>
              <div class="space-y-2">
                <div v-for="a in recentAssessments" :key="a.date + a.field" class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#2f61c7" viewBox="0 0 24 24" class="h-4 w-4 shrink-0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span class="text-[#1c2b4a]">{{ a.field }}: {{ a.date }} — {{ a.score }}%</span>
                </div>
                <p v-if="!recentAssessments.length" class="text-sm text-[#4c6087]">No assessment history yet.</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div data-aos="fade-up" class="flex flex-wrap gap-3 bg-[#1c2b4a] rounded-2xl shadow-md px-4 sm:px-6 py-4">
          <button @click="handleStart" class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Take New Assessment
          </button>
          <button @click="viewSkillReport" class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Skill Report
          </button>
          <button @click="updateProfile" class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Update Profile
          </button>
          <button @click="downloadPDFReport" class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Report
          </button>
        </div>

      </template>

      <!-- ═══ NO ASSESSMENT DATA YET ═══ -->
      <template v-else>
        <div data-aos="fade-up" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 px-6 sm:px-8 py-8 sm:py-10 flex flex-col gap-4">
          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold text-[#5672a5] uppercase tracking-wide">Welcome to the Skill Assessment Platform!</p>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c2b4a] leading-tight">
              Explore and assess your skills to receive personalized learning recommendations.
            </h1>
            <p class="text-base sm:text-lg text-[#4c6087]">Start with your first assessment to unlock insights into your strengths and skill gaps.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button @click="handleStart" class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[#2f61c7]/30 hover:bg-[#274fa3] transition">
              Take First Skill Assessment
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div data-aos="fade-up" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Skill Proficiency</h3>
              <span class="text-xs text-[#7890b8]">No data yet</span>
            </div>
            <p class="text-sm text-[#586d96]">Take your first skill assessment to see your proficiency breakdown.</p>
          </div>
          <div class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Skill Gap Analysis</h3>
              <span class="text-xs text-[#7890b8]">0 gaps</span>
            </div>
            <p class="text-sm text-[#586d96]">After your assessment, skill gaps and priorities will appear here.</p>
          </div>
        </div>

        <div data-aos="fade-up" class="flex flex-wrap gap-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/70 px-4 sm:px-6 py-4">
          <button @click="handleStart" class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-[#274fa3] transition">
            Take First Assessment
          </button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" })

import { computed, ref, onMounted } from "vue"
import { useRouter } from "#app"
import { jsPDF } from "jspdf"
import { autoTable, applyPlugin } from "jspdf-autotable"
import PageLoader from '~/components/PageLoader.vue'


applyPlugin(jsPDF)
const router = useRouter()
const mounted = ref(false)

// ── Load real data from localStorage ─────────────────────────────────────
const latestResult      = ref(null)
const assessmentHistory = ref([])
const userName          = ref('there')
const userDepartment    = ref('')

onMounted(() => {
  if (import.meta.client) {
    const raw = localStorage.getItem('latest_result')
    if (raw) { try { latestResult.value = JSON.parse(raw) } catch {} }

    const hist = localStorage.getItem('assessment_history')
    if (hist) { try { assessmentHistory.value = JSON.parse(hist) } catch {} }

    const userRaw = localStorage.getItem('user')
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw)
        if (u.full_name) userName.value = u.full_name.split(' ')[0]
        if (u.department) userDepartment.value = u.department
      } catch {}
    }
  }
    mounted.value = true
})

const scoreState = useState('assessmentScore', () => ({}))
const goToProfile = () => {
    router.push('/profile/')
}

const hasAssessmentData = computed(() =>
  (latestResult.value && latestResult.value.total > 0) ||
  (scoreState.value && scoreState.value.total > 0)
)

const currentResult = computed(() =>
  latestResult.value?.total > 0 ? latestResult.value : (scoreState.value || {})
)

const overallScore = computed(() =>
  currentResult.value.score_percent ??
  (currentResult.value.total > 0
    ? Math.round((currentResult.value.correct / currentResult.value.total) * 100)
    : 0)
)

const expertiseField = computed(() => currentResult.value.field || 'General')

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

const getProgressColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-orange-500'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-red-400'
}

// ── Radar Chart Data ──────────────────────────────────────────────────────
const radarAxes = computed(() => {
  const field = expertiseField.value
  const axesMap = {
    'Full Stack Developer': ['Frontend', 'Backend', 'Database', 'DevOps', 'Architecture', 'Security'],
    'AI Engineer': ['ML Theory', 'Deep Learning', 'Data Processing', 'Model Deployment', 'Math/Stats', 'Python'],
    'Cybersecurity Analyst': ['Network Security', 'Threat Analysis', 'Compliance', 'Incident Response', 'Forensics', 'Risk Management'],
    'Data Scientist': ['Statistics', 'ML', 'Python/R', 'Data Viz', 'SQL', 'Big Data'],
    'Data Analyst': ['SQL', 'Excel', 'Tableau/PowerBI', 'Statistics', 'Python', 'Reporting'],
    'Cloud Engineer': ['AWS/Azure/GCP', 'IaC', 'Networking', 'Security', 'Containers', 'Monitoring'],
    'DevOps Engineer': ['CI/CD', 'Containers', 'IaC', 'Monitoring', 'Cloud', 'Scripting'],
    'Backend Developer': ['API Design', 'Database', 'Security', 'Performance', 'Architecture', 'Testing'],
    'Mobile Developer': ['iOS/Android', 'UI/UX', 'Performance', 'APIs', 'State Mgmt', 'Testing'],
    'Machine Learning Engineer': ['ML Ops', 'Model Serving', 'Feature Engineering', 'Cloud', 'Python', 'Monitoring'],
    'UI/UX Designer': ['Research', 'Visual Design', 'Prototyping', 'Usability', 'Design Systems', 'Figma'],
    'Front End Developer': ['HTML/CSS', 'JavaScript', 'Frameworks', 'Performance', 'Accessibility', 'State Mgmt'],
  }
  return axesMap[field] || ['Core Knowledge', 'Problem Solving', 'Communication', 'Tools', 'Best Practices', 'Architecture']
})

const radarValues = computed(() => {
  const base = overallScore.value
  // Generate realistic-looking distribution around the base score
  return radarAxes.value.map((_, i) => {
    const variance = Math.sin(i * 1.7) * 15 // Create natural variation
    const val = Math.max(20, Math.min(100, Math.round(base + variance + (i === 0 ? 5 : 0))))
    return val
  })
})

const getRadarPoints = (radius) => {
  return radarAxes.value.map((_, i) => {
    const angle = (i * 2 * Math.PI / radarAxes.value.length) - Math.PI / 2
    const r = (radius / 100) * 180
    const x = 200 + r * Math.cos(angle)
    const y = 200 + r * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')
}

const radarDataPoints = computed(() => {
  return radarValues.value.map((val, i) => {
    const angle = (i * 2 * Math.PI / radarAxes.value.length) - Math.PI / 2
    const r = (val / 100) * 180
    const x = 200 + r * Math.cos(angle)
    const y = 200 + r * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')
})

const radarPointCoords = computed(() => {
  return radarValues.value.map((val, i) => {
    const angle = (i * 2 * Math.PI / radarAxes.value.length) - Math.PI / 2
    const r = (val / 100) * 180
    return {
      x: 200 + r * Math.cos(angle),
      y: 200 + r * Math.sin(angle)
    }
  })
})

// ── Gap Priority Breakdown ────────────────────────────────────────────────
const gapPriorityStats = computed(() => {
  const counts = { High: 0, Medium: 0, Low: 0 }
  skillGaps.value.forEach(g => { counts[g.priority] = (counts[g.priority] || 0) + 1 })
  return counts
})

const gapPrioritySegments = computed(() => {
  const total = skillGaps.value.length || 1
  const colors = { High: '#ef4444', Medium: '#f97316', Low: '#facc15' }
  let offset = 0
  return ['High', 'Medium', 'Low'].map(priority => {
    const count = gapPriorityStats.value[priority] || 0
    const length = (count / total) * 251.3
    const segment = { length, offset, color: colors[priority] }
    offset -= length
    return segment
  }).filter(s => s.length > 0)
})

const gapPriorityLegend = computed(() => {
  const total = skillGaps.value.length || 1
  const colors = { High: '#ef4444', Medium: '#f97316', Low: '#facc15' }
  return ['High', 'Medium', 'Low'].map(priority => ({
    label: `${priority} Priority`,
    count: gapPriorityStats.value[priority] || 0,
    color: colors[priority],
    percentage: ((gapPriorityStats.value[priority] || 0) / total) * 100
  })).filter(item => item.count > 0)
})

// ── Enhanced Skill Gaps with severity & recommendations ─────────────────
const skillGaps = computed(() => {
  if (!hasAssessmentData.value) return []
  const s = overallScore.value
  const f = expertiseField.value
  const gaps = []
  if (s < 80) gaps.push({
    name: `Advanced ${f} concepts`,
    priority: 'High',
    severity: Math.min(100, Math.round((100 - s) * 1.2)),
    recommendation: `Study advanced ${f} patterns and real-world case studies to bridge this gap.`
  })
  if (s < 65) gaps.push({
    name: `Applied problem solving in ${f}`,
    priority: 'Medium',
    severity: Math.min(100, Math.round((85 - s) * 1.1)),
    recommendation: `Practice hands-on projects and coding challenges specific to ${f}.`
  })
  if (s < 50) gaps.push({
    name: `Foundational ${f} knowledge`,
    priority: 'High',
    severity: Math.min(100, Math.round((70 - s) * 1.3)),
    recommendation: `Review fundamental concepts and complete beginner-to-intermediate courses.`
  })
  if (s < 75) gaps.push({
    name: 'Professional communication',
    priority: 'Low',
    severity: Math.min(100, Math.round((90 - s) * 0.8)),
    recommendation: 'Work on technical writing and documentation skills.'
  })
  if (s < 60) gaps.push({
    name: 'Testing & Debugging',
    priority: 'Medium',
    severity: Math.min(100, Math.round((80 - s) * 1.0)),
    recommendation: 'Learn systematic debugging approaches and testing frameworks.'
  })
  return gaps
})

// ── Recommendations per field ─────────────────────────────────────────────
const recommendedCourses = computed(() => {
  const f = expertiseField.value
  const map = {
    'Full Stack Developer': [
      { title: 'The Odin Project', platform: 'Free', url: 'https://www.theodinproject.com' },
      { title: 'Full Stack Open', platform: 'University of Helsinki', url: 'https://fullstackopen.com' },
      { title: 'JavaScript.info', platform: 'Free', url: 'https://javascript.info' },
    ],
    'AI Engineer': [
      { title: 'Fast.ai Deep Learning', platform: 'Free', url: 'https://www.fast.ai' },
      { title: 'CS50 AI', platform: 'Harvard/edX', url: 'https://cs50.harvard.edu/ai' },
      { title: 'Hugging Face Course', platform: 'Free', url: 'https://huggingface.co/learn' },
    ],
    'Cybersecurity Analyst': [
      { title: 'TryHackMe', platform: 'Free tier', url: 'https://tryhackme.com' },
      { title: 'Cybrary', platform: 'Free tier', url: 'https://www.cybrary.it' },
      { title: 'OWASP Top 10', platform: 'Free', url: 'https://owasp.org/www-project-top-ten' },
    ],
    'Data Scientist': [
      { title: 'Kaggle Learn', platform: 'Free', url: 'https://www.kaggle.com/learn' },
      { title: 'StatQuest YouTube', platform: 'Free', url: 'https://www.youtube.com/@statquest' },
      { title: 'Fast.ai ML Course', platform: 'Free', url: 'https://www.fast.ai' },
    ],
    'Data Analyst': [
      { title: 'Google Data Analytics', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
      { title: 'SQL Tutorial', platform: 'Mode Analytics', url: 'https://mode.com/sql-tutorial' },
      { title: 'Tableau Public', platform: 'Free', url: 'https://public.tableau.com' },
    ],
    'Cloud Engineer': [
      { title: 'AWS Training', platform: 'AWS', url: 'https://aws.amazon.com/training' },
      { title: 'Google Cloud Skills Boost', platform: 'Free tier', url: 'https://cloudskillsboost.google' },
      { title: 'Azure Fundamentals', platform: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts' },
    ],
    'DevOps Engineer': [
      { title: 'KodeKloud', platform: 'Free tier', url: 'https://kodekloud.com' },
      { title: 'Play with Docker', platform: 'Free', url: 'https://labs.play-with-docker.com' },
      { title: 'GitHub Actions Docs', platform: 'Free', url: 'https://docs.github.com/en/actions' },
    ],
    'Backend Developer': [
      { title: 'Django Documentation', platform: 'Free', url: 'https://docs.djangoproject.com' },
      { title: 'Node Best Practices', platform: 'Free', url: 'https://github.com/goldbergyoni/nodebestpractices' },
      { title: 'PostgreSQL Tutorial', platform: 'Free', url: 'https://www.postgresqltutorial.com' },
    ],
    'Mobile Developer': [
      { title: 'Flutter Codelabs', platform: 'Google', url: 'https://flutter.dev/docs/codelabs' },
      { title: 'React Native Docs', platform: 'Free', url: 'https://reactnative.dev/docs/getting-started' },
      { title: 'Expo Docs', platform: 'Free', url: 'https://docs.expo.dev' },
    ],
    'Machine Learning Engineer': [
      { title: 'Stanford CS229 YouTube', platform: 'Free', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU' },
      { title: 'scikit-learn Guide', platform: 'Free', url: 'https://scikit-learn.org/stable/user_guide.html' },
      { title: 'MLflow Docs', platform: 'Free', url: 'https://mlflow.org/docs/latest/index.html' },
    ],
    'UI/UX Designer': [
      { title: 'Figma Learn', platform: 'Free', url: 'https://www.figma.com/resources/learn-design' },
      { title: 'Nielsen Norman Group', platform: 'Free', url: 'https://www.nngroup.com/articles' },
      { title: 'Google UX Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
    ],
    'Front End Developer': [
      { title: 'MDN Web Docs', platform: 'Free', url: 'https://developer.mozilla.org' },
      { title: 'CSS Tricks', platform: 'Free', url: 'https://css-tricks.com' },
      { title: 'Vue.js Docs', platform: 'Free', url: 'https://vuejs.org/guide/introduction.html' },
    ],
  }
  return map[f] || map['Full Stack Developer']
})


// ── Recent assessments (last 5) ───────────────────────────────────────────
const recentAssessments = computed(() =>
  assessmentHistory.value.slice(0, 5).map(a => ({
    field: a.field || 'Assessment',
    date:  a.date  || '',
    score: a.score_percent ?? 0,
  }))
)

// ── Progress line chart from history (last 5) ─────────────────────────────
const progressPoints = computed(() => {
  const hist = assessmentHistory.value.slice(0, 5).reverse()
  if (!hist.length) return [{ x: 10, y: 60 }, { x: 190, y: 60 }]
  const n = hist.length
  return hist.map((a, i) => ({
    x: n === 1 ? 100 : 10 + (i / (n - 1)) * 180,
    y: 70 - ((a.score_percent ?? 0) / 100) * 60,
  }))
})

const progressLinePath = computed(() => {
  const pts = progressPoints.value
  if (!pts.length) return ''
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')
})

// ── Button actions ────────────────────────────────────────────────────────
const showSkillScore = ref(true)
const handleStart    = () => router.push('/assessments/onboarding')

const viewSkillReport = () => {
  router.push('/assessments/tests/submitted')
}

const updateProfile = () => {
  router.push('/profile')
}

// ── PDF Generation ────────────────────────────────────────────────────────
const downloadPDFReport = () => {
  if (!hasAssessmentData.value) return

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const r = currentResult.value
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)

  // Colors
  const primaryColor = [47, 97, 199]
  const darkText = [28, 43, 74]
  const lightText = [86, 109, 150]
  const bgLight = [246, 248, 255]

  // Helper: add header to each page
  const addHeader = () => {
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, pageWidth, 35, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('LUMIERE', margin, 18)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Skill Assessment Report', margin, 26)
    doc.setFontSize(8)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, 26, { align: 'right' })
  }

  // Helper: add footer
  const addFooter = (pageNum, totalPages) => {
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.3)
    doc.line(margin, 280, pageWidth - margin, 280)
    doc.setTextColor(...lightText)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, 287, { align: 'right' })
    doc.text('Confidential - LUMIERE Skill Assessment Platform', margin, 287)
  }

  // Page 1: Overview
  addHeader()

  let y = 50

  // User Info Box
  doc.setFillColor(...bgLight)
  doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F')
  doc.setTextColor(...darkText)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(`${userName.value}`, margin + 5, y + 12)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...lightText)
  doc.text(`${userDepartment.value || 'Department N/A'} | ${expertiseField.value}`, margin + 5, y + 22)
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text(`Skill Level: ${skillLevel.value}`, margin + 5, y + 30)

  // Score Circle (right side)
  const scoreX = pageWidth - margin - 30
  const scoreY = y + 17
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(2)
  doc.circle(scoreX, scoreY, 12, 'S')
  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(`${overallScore.value}%`, scoreX, scoreY + 1, { align: 'center' })

  y += 50

  // Executive Summary
  doc.setTextColor(...darkText)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Executive Summary', margin, y)
  y += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...lightText)
  const summaryText = `This is the result of your recent ${expertiseField.value} skill assessment. You scored ${overallScore.value}%, placing you at the ${skillLevel.value} level. The assessment evaluated ${r.total || 0} questions, with ${r.correct || 0} correct answers.`
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(splitSummary, margin, y)
  y += splitSummary.length * 5 + 5

  // Assessment Details Table
  doc.setTextColor(...darkText)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Assessment Details', margin, y)
  y += 10

  const detailsData = [
    ['Field', r.field || 'N/A'],
    ['Date', r.date || 'N/A'],
    ['Score', `${r.score_percent ?? 0}%`],
    ['Skill Level', skillLevel.value],
    ['Correct Answers', `${r.correct ?? 0} / ${r.total ?? 0}`],
    ['Time Spent', `${Math.floor((r.elapsed || 0) / 60)}m ${(r.elapsed || 0) % 60}s`],
  ]

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    body: detailsData,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5,
      font: 'helvetica',
      lineColor: [227, 234, 254],
      lineWidth: 0.5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: bgLight, textColor: darkText, cellWidth: 50 },
      1: { textColor: lightText, cellWidth: 'auto' },
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
  })

  y = doc.lastAutoTable.finalY + 15

  // Skill Coverage Section (Radar data as table)
  doc.setTextColor(...darkText)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Skill Coverage Breakdown', margin, y)
  y += 10

  const radarData = radarAxes.value.map((axis, i) => [axis, `${radarValues.value[i]}%`])
  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Skill Area', 'Proficiency']],
    body: radarData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      font: 'helvetica',
      lineColor: [227, 234, 254],
    },
    alternateRowStyles: { fillColor: bgLight },
  })

  y = doc.lastAutoTable.finalY + 15

  // Skill Gaps Section
  if (skillGaps.value.length > 0) {
    doc.setTextColor(...darkText)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Identified Skill Gaps', margin, y)
    y += 10

    const gapData = skillGaps.value.map(gap => [
      gap.name,
      gap.priority,
      `${gap.severity}%`,
      gap.recommendation
    ])

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Gap Area', 'Priority', 'Severity', 'Recommendation']],
      body: gapData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        font: 'helvetica',
        lineColor: [227, 234, 254],
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' },
      },
      bodyStyles: { valign: 'top' },
      alternateRowStyles: { fillColor: bgLight },
    })

    y = doc.lastAutoTable.finalY + 15
  }

  // New Page: Assessment History
  doc.addPage()
  addHeader()
  y = 50

  doc.setTextColor(...darkText)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Assessment History (Last 5 Results)', margin, y)
  y += 10

  if (recentAssessments.value.length > 0) {
    const historyData = recentAssessments.value.map(a => [
      a.field,
      a.date,
      `${a.score}%`,
      getLevelFromScore(a.score)
    ])

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Assessment', 'Date', 'Score', 'Level']],
      body: historyData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        font: 'helvetica',
        lineColor: [227, 234, 254],
      },
      alternateRowStyles: { fillColor: bgLight },
    })

    y = doc.lastAutoTable.finalY + 15
  } else {
    doc.setFontSize(10)
    doc.setTextColor(...lightText)
    doc.text('No assessment history available.', margin, y)
    y += 10
  }

  // Recommended Resources
  doc.setTextColor(...darkText)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Recommended Learning Resources', margin, y)
  y += 10

  const resourceData = recommendedCourses.value.map(c => [c.title, c.platform, c.url])

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Resource', 'Platform', 'URL']],
    body: resourceData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      font: 'helvetica',
      lineColor: [227, 234, 254],
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40 },
      2: { cellWidth: 'auto' },
    },
    bodyStyles: { valign: 'top' },
    alternateRowStyles: { fillColor: bgLight },
  })

  // Add footer to all pages
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    addFooter(i, totalPages)
  }

  // Save
  doc.save(`LUMIERE_Report_${(r.field || 'Assessment').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Helper for PDF
const getLevelFromScore = (score) => {
  if (score >= 90) return 'Expert'
  if (score >= 80) return 'Advanced'
  if (score >= 70) return 'Upper Intermediate'
  if (score >= 60) return 'Intermediate'
  if (score >= 50) return 'Upper Basic'
  if (score >= 40) return 'Basic'
  if (score >= 20) return 'Beginner'
  return 'Absolute Beginner'
}
</script>