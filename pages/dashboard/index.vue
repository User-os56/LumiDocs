<template>
  <div
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
          <div class="h-10 w-10 rounded-full bg-white border border-[#d5def5] shadow flex items-center justify-center">
            <img src="https://i.pravatar.cc/100" alt="profile" class="h-9 w-9 rounded-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Conditional Content: Show new design if assessment exists, otherwise show original -->
      <template v-if="hasAssessmentData">
        <!-- Welcome Section -->
        <div data-aos="fade-up" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 px-6 sm:px-8 py-6">
          <h2 class="text-2xl font-bold text-[#1c2b4a]">Welcome back, Siji!</h2>
          <p class="text-sm text-[#4c6087] mt-1">Computer Science Department | Level: {{ skillLevel }}</p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Skill Proficiency -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Skill Proficiency</h3>
              <!-- Radar Chart Placeholder -->
              <div class="mb-6 flex justify-center">
                <div class="h-48 w-48 rounded-2xl bg-[#f2f5ff] border border-[#dce6ff] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="h-40 w-40">
                    <polygon points="100,20 180,80 160,180 40,180 20,80" fill="#2f61c7" fill-opacity="0.2" stroke="#2f61c7" stroke-width="2"/>
                    <polygon points="100,60 150,100 140,150 60,150 50,100" fill="#2f61c7" fill-opacity="0.4" stroke="#2f61c7" stroke-width="2"/>
                    <circle cx="100" cy="100" r="3" fill="#2f61c7"/>
                    <text x="100" y="15" text-anchor="middle" font-size="12" fill="#1c2b4a">HTML/CSS</text>
                    <text x="185" y="85" text-anchor="middle" font-size="12" fill="#1c2b4a">Problem Solving</text>
                    <text x="165" y="195" text-anchor="middle" font-size="12" fill="#1c2b4a">Algorithms</text>
                    <text x="15" y="195" text-anchor="middle" font-size="12" fill="#1c2b4a">Vue/Nuxt</text>
                    <text x="15" y="85" text-anchor="middle" font-size="12" fill="#1c2b4a">Problem Sc.</text>
                  </svg>
                </div>
              </div>
              <!-- JavaScript Progress Bar -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4 text-[#2f61c7]">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium text-[#1c2b4a]">JavaScript</span>
                  </div>
                  <span class="text-sm font-semibold text-[#1c2b4a]">{{ javascriptScore }}%</span>
                </div>
                <div class="h-3 bg-[#e6edff] rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :class="getProgressColor(javascriptScore)"
                    :style="{ width: javascriptScore + '%' }"
                  ></div>
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
                    <span class="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-semibold">
                      Recommended for You
                    </span>
                  </div>
                  <div class="h-24 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12 text-[#9fbaf5]">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a 
                    :href="course.url" 
                    target="_blank"
                    class="text-xs text-[#2f61c7] font-medium hover:underline"
                  >
                    View Course →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Overall Skill Score -->
            <div v-if="showSkillScore" data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 relative">
              <button 
                @click="removeSkillScore"
                class="absolute top-4 right-4 text-[#7890b8] hover:text-[#1c2b4a] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Overall Skill Score</h3>
              <div class="flex flex-col items-center gap-4">
                <div class="text-5xl font-bold text-[#1c2b4a]">{{ overallScore }}%</div>
                <button class="rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold">
                  {{ skillLevel }}
                </button>
                <!-- Donut Chart -->
                <div class="relative w-32 h-32">
                  <svg class="transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e6edff" stroke-width="8" fill="none"/>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="#ff6b35" 
                      stroke-width="8" 
                      fill="none"
                      :stroke-dasharray="`${overallScore * 2.513} 251.3`"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-2xl font-bold text-[#1c2b4a]">{{ overallScore }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skill Gap Analysis -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Skill Gap Analysis</h3>
              <div class="space-y-3">
                <div v-for="gap in skillGaps" :key="gap.name" class="flex items-center gap-3 p-3 rounded-xl bg-[#f6f8ff] border border-[#e3eafe]">
                  <div 
                    class="h-3 w-3 rounded-full"
                    :class="gap.priority === 'High' ? 'bg-green-500' : gap.priority === 'Medium' ? 'bg-orange-500' : 'bg-red-500'"
                  ></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-[#1c2b4a]">{{ gap.name }}</p>
                    <p class="text-xs text-[#586d96]">({{ gap.priority }} Priority)</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Assessments -->
            <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6">
              <h3 class="text-xl font-semibold text-[#1c2b4a] mb-4">Recent Assessments</h3>
              <div class="mb-4">
                <h4 class="text-sm font-medium text-[#4c6087] mb-2">Your Progress</h4>
                <div class="h-24 bg-gradient-to-r from-[#e8f0ff] to-[#f0f5ff] rounded-xl p-2">
                  <svg viewBox="0 0 200 80" preserveAspectRatio="none" class="h-full w-full">
                    <path 
                      d="M 10,70 Q 50,50 90,30 T 170,20" 
                      stroke="#2f61c7" 
                      stroke-width="3" 
                      fill="none"
                    />
                    <circle cx="50" cy="50" r="4" fill="#2f61c7"/>
                    <circle cx="90" cy="30" r="4" fill="#2f61c7"/>
                    <circle cx="170" cy="20" r="4" fill="#2f61c7"/>
                  </svg>
                </div>
              </div>
              <div class="space-y-2">
                <div v-for="assessment in recentAssessments" :key="assessment.date" class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#2f61c7" viewBox="0 0 24 24" class="h-4 w-4">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span class="text-[#1c2b4a]">{{ assessment.label }}: {{ assessment.date }} - Score: {{ assessment.score }}%</span>
                </div>
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
          <button class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Skill Report
          </button>
          <button class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Update Profile
          </button>
          <button class="inline-flex items-center gap-2 rounded-xl bg-white text-[#1c2b4a] px-4 py-2 text-sm font-semibold shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </button>
        </div>
      </template>

      <!-- Original Design (shown when no assessment data) -->
      <template v-else>
        <!-- Hero -->
        <div data-aos="fade-up" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 px-6 sm:px-8 py-8 sm:py-10 flex flex-col gap-4">
          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold text-[#5672a5] uppercase tracking-wide">Welcome to the Skill Assessment Platform, Siji!</p>
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

        <!-- Cards Grid -->
        <div data-aos="fade-up" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Skill Proficiency -->
          <div class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Skill Proficiency</h3>
              <span class="text-xs text-[#7890b8]">No data yet</span>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div class="flex-1 flex justify-center">
                <div class="h-40 w-40 rounded-2xl bg-[#f2f5ff] border border-[#dce6ff] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="h-24 w-24 text-[#8fb0ff]">
                    <path fill="currentColor" opacity="0.15" d="M50 5l35 20v40L50 95 15 65V25z" />
                    <path fill="none" stroke="currentColor" stroke-width="4" d="M50 5l35 20v40L50 95 15 65V25z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 space-y-3 text-[#3d5175]">
                <p class="font-semibold">No data yet.</p>
                <p class="text-sm leading-relaxed text-[#586d96]">
                  Take your first skill assessment to see your proficiency in various areas.
                </p>
                <button @click="handleStart" class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-[#274fa3] transition">
                  Take First Skill Assessment
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Skill Gap Analysis -->
          <div class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Skill Gap Analysis</h3>
              <span class="text-xs text-[#7890b8]">0 gaps</span>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div class="flex-1 space-y-3 text-[#3d5175]">
                <p class="font-semibold">No skill gaps discovered yet.</p>
                <p class="text-sm leading-relaxed text-[#586d96]">
                  After your assessment, this area will highlight your skill gaps and priorities.
                </p>
              </div>
              <div class="flex-1 flex justify-center">
                <div class="h-36 w-36 rounded-2xl bg-[#f2f7ff] border border-[#dce6ff] flex items-center justify-center">
                  <img src="https://cdn.jsdelivr.net/gh/alohe/illustrations@master/static/clipboard-search.png" class="h-24 w-24 object-contain" alt="analysis" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lower grid -->
        <div data-aos="fade-up" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recommended Learning -->
          <div class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <h3 class="text-xl font-semibold text-[#1c2b4a]">Recommended Learning</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-2xl border border-[#e3eafe] bg-[#f6f8ff] px-4 py-4 flex flex-col gap-2 shadow-sm">
                <div class="flex items-center gap-2 text-[#2f61c7] font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m2 4v-4m-2 0H9m4 0h1m-4 4h1" />
                  </svg>
                  No recommendations yet.
                </div>
                <p class="text-sm text-[#586d96] leading-relaxed">
                  Once assessed, you'll receive personalized courses and resources here.
                </p>
              </div>
              <div class="rounded-2xl border border-[#e3eafe] bg-[#f6f8ff] px-4 py-4 flex flex-col gap-2 shadow-sm">
                <div class="flex items-center gap-2 text-[#2f61c7] font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h4m-2 0v12" />
                  </svg>
                  Once assessed...
                </div>
                <p class="text-sm text-[#586d96] leading-relaxed">
                  We'll surface personalized learning journeys tailored to your goals.
                </p>
              </div>
            </div>
          </div>

          <!-- Progress Tracker -->
          <div data-aos="fade-up" class="bg-white rounded-3xl shadow-md border border-white/70 px-6 py-6 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-[#1c2b4a]">Progress Tracker</h3>
              <span class="text-xs text-[#7890b8]">Getting started</span>
            </div>
            <div class="rounded-2xl border border-[#e3eafe] bg-[#f7f9ff] p-4">
              <div class="h-28 w-full bg-gradient-to-r from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 opacity-60">
                  <svg viewBox="0 0 400 150" preserveAspectRatio="none" class="h-full w-full text-[#9fbaf5]">
                    <path d="M0,120 C80,80 120,60 200,80 C280,100 320,60 400,30" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" />
                    <circle cx="250" cy="73" r="7" fill="#2f61c7" />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-sm text-[#586d96] leading-relaxed">
              Track your progress over time after completing assessments. Let's get started!
            </p>
          </div>
        </div>

        <!-- Bottom actions -->
        <div data-aos="fade-up" class="flex flex-wrap gap-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/70 px-4 sm:px-6 py-4">
          <button @click="handleStart" class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-[#274fa3] transition">
            <span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#2f61c7] text-[10px] font-bold">✓</span>
            Take First Assessment
          </button>
          <button class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m-6-8h12" />
            </svg>
            Update Profile
          </button>
          <button class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v6H4zM4 14h16v6H4z" />
            </svg>
            Update Profile
          </button>
          <button class="inline-flex items-center gap-2 rounded-xl bg-white border border-[#d3defa] text-[#2d4570] px-4 py-2 text-sm font-semibold shadow hover:border-[#9fb6ec] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h13m-6 0l3 3-3 3m-2 4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
            </svg>
            Download Report
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

import { computed, ref } from "vue";
import { useRouter } from "#app";

const router = useRouter();

// Check if assessment data exists
const assessmentScore = useState("assessmentScore", () => ({
  correct: 0,
  total: 0,
  elapsed: 0,
}));

const hasAssessmentData = computed(() => {
  return assessmentScore.value && assessmentScore.value.total > 0;
});

const showSkillScore = ref(true);

const removeSkillScore = () => {
  showSkillScore.value = false;
};

// Calculate overall score
const overallScore = computed(() => {
  if (!hasAssessmentData.value) return 0;
  return Math.round((assessmentScore.value.correct / assessmentScore.value.total) * 100);
});

// Get skill level based on score
const getSkillLevel = (score) => {
  if (score >= 90) return "Expert";
  if (score >= 80) return "Advanced";
  if (score >= 70) return "Upper Intermediate";
  if (score >= 60) return "Intermediate";
  if (score >= 50) return "Upper Basic";
  if (score >= 40) return "Basic";
  if (score >= 20) return "Beginner";
  return "Absolute Beginner";
};

const skillLevel = computed(() => getSkillLevel(overallScore.value));

// JavaScript score (using overall score for now)
const javascriptScore = computed(() => overallScore.value);

// Get progress bar color based on score
const getProgressColor = (score) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-gray-500";
};

// Recommended courses from free platforms
const recommendedCourses = [
  {
    title: "JavaScript Advanced Course",
    platform: "FreeCodeCamp",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
  },
  {
    title: "Data Structures Tutorial",
    platform: "YouTube",
    url: "https://www.youtube.com/results?search_query=javascript+data+structures+tutorial",
  },
  {
    title: "Effective Presentation Skills",
    platform: "YouTube",
    url: "https://www.youtube.com/results?search_query=presentation+skills+tutorial",
  },
];

// Skill gaps
const skillGaps = computed(() => {
  if (!hasAssessmentData.value) return [];
  const gaps = [];
  if (overallScore.value < 70) {
    gaps.push({ name: "Advanced JavaScript", priority: "High" });
  }
  if (overallScore.value < 60) {
    gaps.push({ name: "Data Structures", priority: "Medium" });
  }
  if (overallScore.value < 50) {
    gaps.push({ name: "Public Speaking", priority: "Low" });
  }
  return gaps;
});

// Recent assessments
const recentAssessments = computed(() => {
  if (!hasAssessmentData.value) return [];
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  return [
    {
      label: "Last Attempt",
      date: today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      score: overallScore.value,
    },
    {
      label: "Previous",
      date: lastMonth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      score: Math.max(0, overallScore.value - 7),
    },
  ];
});

const handleStart = () => {
  router.push("/assessments/onboarding");
};
</script>
