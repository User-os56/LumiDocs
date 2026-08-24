<template>
  <div
    class="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f4f7ff] to-[#e8efff] text-[#1c2b4a]"
  >
    <!-- Background effects -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#4f88ff]/10 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#2f61c7]/10 blur-3xl"
      ></div>
    </div>

    <div
      class="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 xl:px-10"
    >
      <!-- ============================================================= -->
      <!-- PAGE HEADER -->
      <!-- ============================================================= -->

      <div data-aos="fade-up" class="mb-8">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2f61c7] shadow-md shadow-[#2f61c7]/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
              />
            </svg>
          </div>

          <div>
            <h1 class="text-2xl font-bold tracking-tight text-[#1c2b4a] sm:text-3xl">
              My Profile
            </h1>
            <p class="mt-1 text-sm text-[#6b7fa6] sm:text-base">
              Manage your account and track your assessment performance.
            </p>
          </div>
        </div>
      </div>

      <!-- ============================================================= -->
      <!-- ERROR -->
      <!-- ============================================================= -->

      <div
        v-if="pageError"
        class="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
      >
        {{ pageError }}
      </div>

      <!-- ============================================================= -->
      <!-- LOADING -->
      <!-- ============================================================= -->

      <div
        v-if="loading"
        class="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div
          class="h-80 animate-pulse rounded-3xl border border-white/70 bg-white/80 lg:col-span-1"
        ></div>

        <div class="space-y-6 lg:col-span-2">
          <div
            class="h-52 animate-pulse rounded-3xl border border-white/70 bg-white/80"
          ></div>

          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div
              v-for="i in 4"
              :key="i"
              class="h-28 animate-pulse rounded-2xl bg-white/80"
            ></div>
          </div>
        </div>
      </div>

      <!-- ============================================================= -->
      <!-- MAIN CONTENT -->
      <!-- ============================================================= -->

      <div v-else class="space-y-6">

        <!-- =========================================================== -->
        <!-- PROFILE + PERFORMANCE -->
        <!-- =========================================================== -->

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <!-- PROFILE CARD -->
          <div
            data-aos="fade-up"
            class="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-7"
          >
            <div class="flex flex-col items-center text-center">

              <!-- Avatar -->
              <div class="relative">
                <div
                  class="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#2f61c7] to-[#4f88ff] p-1 shadow-lg shadow-[#2f61c7]/20"
                >
                  <img
                    :src="userAvatar"
                    alt="Profile avatar"
                    class="h-full w-full rounded-full border-4 border-white bg-[#eef4ff] object-cover"
                  />
                </div>

                <div
                  class="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-white bg-[#22c55e]"
                  title="Active"
                ></div>
              </div>

              <!-- Name -->
              <h2 class="mt-5 text-2xl font-bold text-[#1c2b4a]">
                {{ user.full_name || "User" }}
              </h2>

              <!-- Email -->
              <p class="mt-1 break-all text-sm text-[#7184a8]">
                {{ user.email || "No email available" }}
              </p>

              <!-- Status -->
              <div
                class="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d6e2fb] bg-[#edf3ff] px-4 py-2 text-xs font-semibold text-[#2f61c7]"
              >
                <span class="h-2 w-2 rounded-full bg-[#22c55e]"></span>
                Active Account
              </div>

              <!-- Edit button -->
              <button
                @click="openEditModal"
                class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f61c7] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#2f61c7]/20 transition hover:bg-[#274fa3]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.5 7.125L16.875 4.5"
                  />
                </svg>
                Edit Profile
              </button>
            </div>

            <!-- Account information -->
            <div class="mt-7 border-t border-[#e8edfa] pt-6">
              <h3 class="mb-4 text-sm font-semibold text-[#1c2b4a]">
                Account Information
              </h3>

              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3ff]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-4 w-4 text-[#2f61c7]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <p class="text-xs text-[#8a9bbb]">Username</p>
                    <p class="mt-0.5 truncate text-sm font-medium text-[#35486b]">
                      {{ user.username || "—" }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3ff]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-4 w-4 text-[#2f61c7]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75"
                      />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <p class="text-xs text-[#8a9bbb]">Email Address</p>
                    <p class="mt-0.5 break-all text-sm font-medium text-[#35486b]">
                      {{ user.email || "—" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PERFORMANCE COLUMN -->
          <div class="space-y-6 lg:col-span-2">

            <!-- Overall Score -->
            <div
              data-aos="fade-up"
              class="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-7"
            >
              <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-[#7890b8]">
                    Assessment Performance
                  </p>

                  <h3 class="mt-1 text-xl font-bold text-[#1c2b4a]">
                    Overall Score
                  </h3>
                </div>

                <span
                  class="inline-flex w-fit rounded-xl px-3 py-1.5 text-xs font-semibold"
                  :class="getScoreBadgeClass(overallScore)"
                >
                  {{ skillLevel }}
                </span>
              </div>

              <div class="flex flex-col items-center gap-8 sm:flex-row">

                <!-- Circular score -->
                <div class="relative h-40 w-40 shrink-0">
                  <svg
                    class="h-full w-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#e7edfb"
                      stroke-width="8"
                      fill="none"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      :stroke="scoreColor"
                      stroke-width="8"
                      fill="none"
                      :stroke-dasharray="`${overallScore * 2.638} 263.8`"
                      stroke-linecap="round"
                      class="transition-all duration-1000"
                    />
                  </svg>

                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <span class="text-3xl font-bold text-[#1c2b4a]">
                      {{ overallScore }}%
                    </span>

                    <span class="mt-1 text-xs text-[#8a9bbb]">
                      Overall
                    </span>
                  </div>
                </div>

                <!-- Score information -->
                <div class="w-full flex-1 space-y-5">

                  <div>
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-[#7184a8]">
                        Highest Score
                      </span>

                      <span class="text-sm font-semibold text-[#1c2b4a]">
                        {{ highestScore }}%
                      </span>
                    </div>

                    <div class="h-2 overflow-hidden rounded-full bg-[#e7edfb]">
                      <div
                        class="h-full rounded-full bg-[#2f61c7] transition-all duration-700"
                        :style="{ width: `${highestScore}%` }"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-[#7184a8]">
                        Average Score
                      </span>

                      <span class="text-sm font-semibold text-[#1c2b4a]">
                        {{ averageScore }}%
                      </span>
                    </div>

                    <div class="h-2 overflow-hidden rounded-full bg-[#e7edfb]">
                      <div
                        class="h-full rounded-full bg-[#4f88ff] transition-all duration-700"
                        :style="{ width: `${averageScore}%` }"
                      ></div>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-[#f5f8ff] p-4">
                    <p class="text-xs leading-relaxed text-[#7184a8]">
                      Your overall score is calculated from your completed
                      assessment attempts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">

              <!-- Assessments -->
              <div
                data-aos="fade-up"
                data-aos-delay="50"
                class="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
              >
                <div
                  class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3ff]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5 text-[#2f61c7]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <p class="text-2xl font-bold text-[#1c2b4a]">
                  {{ assessmentCount }}
                </p>

                <p class="mt-1 text-xs text-[#8294b5]">
                  Assessments
                </p>
              </div>

              <!-- Questions -->
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                class="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
              >
                <div
                  class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3ff]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5 text-[#2f61c7]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M5.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25A2.25 2.25 0 015.25 3z"
                    />
                  </svg>
                </div>

                <p class="text-2xl font-bold text-[#1c2b4a]">
                  {{ totalQuestions }}
                </p>

                <p class="mt-1 text-xs text-[#8294b5]">
                  Questions
                </p>
              </div>

              <!-- Correct -->
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                class="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
              >
                <div
                  class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfdf5]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5 text-[#16a34a]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <p class="text-2xl font-bold text-[#1c2b4a]">
                  {{ correctAnswers }}
                </p>

                <p class="mt-1 text-xs text-[#8294b5]">
                  Correct
                </p>
              </div>

              <!-- Success Rate -->
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                class="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
              >
                <div
                  class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ed]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5 text-[#ea580c]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>

                <p class="text-2xl font-bold text-[#1c2b4a]">
                  {{ successRate }}%
                </p>

                <p class="mt-1 text-xs text-[#8294b5]">
                  Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- =========================================================== -->
        <!-- RECENT ASSESSMENTS -->
        <!-- =========================================================== -->

        <div
          data-aos="fade-up"
          class="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-7"
        >
          <div
            class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#7890b8]">
                Assessment Activity
              </p>

              <h3 class="mt-1 text-xl font-bold text-[#1c2b4a]">
                Recent Assessments
              </h3>

              <p class="mt-1 text-sm text-[#7184a8]">
                Your latest assessment attempts and scores.
              </p>
            </div>

            <button
              @click="router.push('/assessments/history')"
              class="inline-flex w-fit items-center gap-2 rounded-xl border border-[#d6e2fb] bg-[#edf3ff] px-4 py-2.5 text-sm font-semibold text-[#2f61c7] transition hover:border-[#aec2ed] hover:bg-[#e4edff]"
            >
              View Full History

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>

          <!-- Assessment rows -->
          <div v-if="recentAssessments.length" class="space-y-3">
            <button
              v-for="assessment in recentAssessments"
              :key="assessment.id"
              @click="viewAssessment(assessment.id)"
              class="group flex w-full items-center gap-4 rounded-2xl border border-[#e7edfa] bg-[#f7f9ff] p-4 text-left transition hover:border-[#cddbf5] hover:bg-[#f2f6ff] hover:shadow-sm"
            >
              <!-- Score -->
              <div
                class="relative flex h-14 w-14 shrink-0 items-center justify-center"
              >
                <svg
                  class="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e1e8f7"
                    stroke-width="9"
                    fill="none"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    :stroke="getScoreColor(assessment.percentage)"
                    stroke-width="9"
                    fill="none"
                    :stroke-dasharray="`${assessment.percentage * 2.638} 263.8`"
                    stroke-linecap="round"
                  />
                </svg>

                <span class="relative text-xs font-bold text-[#1c2b4a]">
                  {{ assessment.percentage }}%
                </span>
              </div>

              <!-- Details -->
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h4 class="truncate text-sm font-semibold text-[#1c2b4a]">
                    {{ assessment.document_title }}
                  </h4>

                  <span
                    class="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    :class="getDifficultyClass(assessment.difficulty)"
                  >
                    {{ capitalize(assessment.difficulty) }}
                  </span>
                </div>

                <div class="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8294b5]">
                  <span>
                    {{ assessment.score }}/{{ assessment.total_questions }} correct
                  </span>

                  <span>•</span>

                  <span>
                    Grade {{ assessment.grade }}
                  </span>

                  <span>•</span>

                  <span>
                    {{ formatDate(assessment.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Arrow -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5 shrink-0 text-[#b4c1db] transition group-hover:translate-x-1 group-hover:text-[#2f61c7]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="rounded-2xl border border-dashed border-[#d7e0f3] bg-[#f8faff] px-6 py-12 text-center"
          >
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf3ff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-7 w-7 text-[#2f61c7]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h4 class="mt-4 text-base font-semibold text-[#1c2b4a]">
              No assessments yet
            </h4>

            <p class="mx-auto mt-1 max-w-md text-sm text-[#8294b5]">
              Complete your first assessment to start building your performance history.
            </p>

            <button
              @click="router.push('/assessments/onboarding')"
              class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2f61c7]/20 transition hover:bg-[#274fa3]"
            >
              Take an Assessment

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =============================================================== -->
    <!-- EDIT PROFILE MODAL -->
    <!-- =============================================================== -->

    <Transition name="modal">
      <div
        v-if="isEditing"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#16243f]/40 p-4 backdrop-blur-sm"
        @click.self="closeEditModal"
      >
        <div
          class="w-full max-w-md rounded-3xl border border-white/80 bg-white p-6 shadow-2xl sm:p-7"
        >
          <!-- Modal header -->
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#7890b8]">
                Account Settings
              </p>

              <h3 class="mt-1 text-xl font-bold text-[#1c2b4a]">
                Edit Profile
              </h3>

              <p class="mt-1 text-sm text-[#7184a8]">
                Update your personal information.
              </p>
            </div>

            <button
              @click="closeEditModal"
              class="rounded-xl p-2 text-[#8294b5] transition hover:bg-[#f2f5fb] hover:text-[#1c2b4a]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <div class="mt-6 space-y-5">

            <!-- Full name -->
            <div>
              <label
                class="mb-2 block text-sm font-medium text-[#405373]"
              >
                Full Name
              </label>

              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4 text-[#8294b5]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                    />
                  </svg>
                </div>

                <input
                  v-model="editForm.full_name"
                  type="text"
                  autocomplete="name"
                  class="w-full rounded-xl border border-[#d4def0] bg-white py-3 pl-11 pr-4 text-sm text-[#1c2b4a] outline-none transition placeholder:text-[#a3afc4] focus:border-[#4f88ff] focus:ring-4 focus:ring-[#4f88ff]/10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label
                class="mb-2 block text-sm font-medium text-[#405373]"
              >
                Email Address
              </label>

              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4 text-[#8294b5]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75"
                    />
                  </svg>
                </div>

                <input
                  v-model="editForm.email"
                  type="email"
                  autocomplete="email"
                  class="w-full rounded-xl border border-[#d4def0] bg-[#f6f8fc] py-3 pl-11 pr-4 text-sm text-[#687b9e] outline-none"
                  readonly
                />
              </div>

              <p class="mt-2 text-xs text-[#8a9bbb]">
                Email address cannot currently be changed from this page.
              </p>
            </div>
          </div>

          <!-- Success -->
          <div
            v-if="saveSuccess"
            class="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700"
          >
            Profile updated successfully.
          </div>

          <!-- Error -->
          <div
            v-if="saveError"
            class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700"
          >
            {{ saveError }}
          </div>

          <!-- Actions -->
          <div class="mt-6 flex gap-3">
            <button
              @click="closeEditModal"
              :disabled="saveLoading"
              class="flex-1 rounded-xl border border-[#d4def0] bg-white px-4 py-3 text-sm font-semibold text-[#526684] transition hover:bg-[#f6f8fc] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              @click="saveProfile"
              :disabled="saveLoading"
              class="flex-1 rounded-xl bg-[#2f61c7] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#2f61c7]/20 transition hover:bg-[#274fa3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ saveLoading ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
})

import { ref, computed, onMounted } from "vue"
import { useRouter } from "#app"
import { useAuth } from "~/composables/useAuth"

const router = useRouter()
const { apiCall, loadAuth } = useAuth()

// ================================================================
// STATE
// ================================================================

const loading = ref(true)
const pageError = ref("")

const isEditing = ref(false)
const saveLoading = ref(false)
const saveError = ref("")
const saveSuccess = ref(false)

const user = ref({
  id: null,
  username: "",
  full_name: "",
  email: "",
})

const assessments = ref([])

const editForm = ref({
  full_name: "",
  email: "",
})

// ================================================================
// COMPUTED STATISTICS
// ================================================================

const assessmentCount = computed(() => assessments.value.length)

const totalQuestions = computed(() =>
  assessments.value.reduce(
    (total, assessment) =>
      total + Number(assessment.total_questions || 0),
    0
  )
)

const correctAnswers = computed(() =>
  assessments.value.reduce(
    (total, assessment) =>
      total + Number(assessment.score || 0),
    0
  )
)

const overallScore = computed(() => {
  if (!assessments.value.length) return 0

  const total = assessments.value.reduce(
    (sum, assessment) => sum + Number(assessment.percentage || 0),
    0
  )

  return Math.round(total / assessments.value.length)
})

const averageScore = computed(() => {
  if (!assessments.value.length) return 0

  const total = assessments.value.reduce(
    (sum, assessment) => sum + Number(assessment.percentage || 0),
    0
  )

  return Math.round(total / assessments.value.length)
})

const highestScore = computed(() => {
  if (!assessments.value.length) return 0

  return Math.round(
    Math.max(
      ...assessments.value.map(
        assessment => Number(assessment.percentage || 0)
      )
    )
  )
})

const successRate = computed(() => {
  if (!totalQuestions.value) return 0

  return Math.round(
    (correctAnswers.value / totalQuestions.value) * 100
  )
})

const recentAssessments = computed(() =>
  assessments.value.slice(0, 5)
)

// ================================================================
// PROFILE AVATAR
// ================================================================

const userAvatar = computed(() => {
  const seed =
    user.value.full_name?.trim() ||
    user.value.email?.trim() ||
    "User"

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=e9f0ff`
})

// ================================================================
// SKILL LEVEL
// ================================================================

const skillLevel = computed(() => {
  const score = overallScore.value

  if (score >= 90) return "Expert"
  if (score >= 80) return "Advanced"
  if (score >= 70) return "Upper Intermediate"
  if (score >= 60) return "Intermediate"
  if (score >= 50) return "Upper Basic"
  if (score >= 40) return "Basic"
  if (score >= 20) return "Beginner"

  return "No Assessment"
})

// ================================================================
// SCORE COLORS
// ================================================================

const scoreColor = computed(() => {
  const score = overallScore.value

  if (score >= 80) return "#22c55e"
  if (score >= 60) return "#f97316"
  if (score >= 40) return "#eab308"

  return "#ef4444"
})

const getScoreColor = score => {
  if (score >= 80) return "#22c55e"
  if (score >= 60) return "#f97316"
  if (score >= 40) return "#eab308"

  return "#ef4444"
}

const getScoreBadgeClass = score => {
  if (score >= 80) {
    return "bg-green-100 text-green-700"
  }

  if (score >= 60) {
    return "bg-orange-100 text-orange-700"
  }

  if (score >= 40) {
    return "bg-yellow-100 text-yellow-700"
  }

  if (score > 0) {
    return "bg-red-100 text-red-700"
  }

  return "bg-[#edf3ff] text-[#2f61c7]"
}

const getDifficultyClass = difficulty => {
  const value = String(difficulty || "").toLowerCase()

  if (value === "easy") {
    return "bg-green-100 text-green-700"
  }

  if (value === "medium") {
    return "bg-orange-100 text-orange-700"
  }

  if (value === "hard") {
    return "bg-red-100 text-red-700"
  }

  return "bg-[#edf3ff] text-[#2f61c7]"
}

// ================================================================
// HELPERS
// ================================================================

const capitalize = value => {
  if (!value) return "—"

  return String(value).charAt(0).toUpperCase() +
    String(value).slice(1).toLowerCase()
}

const formatDate = date => {
  if (!date) return "Unknown date"

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// ================================================================
// LOAD PROFILE
// ================================================================

const loadProfile = async () => {
  const data = await apiCall("/api/auth/profile/", {
    method: "GET",
  })

  user.value = {
    id: data.id || null,
    username: data.username || "",
    full_name: data.full_name || "User",
    email: data.email || "",
  }

  // Keep localStorage synchronized where it is used elsewhere
  if (import.meta.client) {
    try {
      const stored = JSON.parse(
        localStorage.getItem("user") || "{}"
      )

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...stored,
          ...user.value,
        })
      )
    } catch {
      // Ignore localStorage errors
    }
  }
}

// ================================================================
// LOAD ASSESSMENT HISTORY
// ================================================================

const loadAssessmentHistory = async () => {
  const data = await apiCall("/api/tests/history/", {
    method: "GET",
  })

  assessments.value = Array.isArray(data)
    ? data
    : data?.results || []
}

// ================================================================
// INITIAL LOAD
// ================================================================

onMounted(async () => {
  try {
    loading.value = true
    pageError.value = ""

    loadAuth()

    await Promise.all([
      loadProfile(),
      loadAssessmentHistory(),
    ])
  } catch (error) {
    console.error("Profile loading error:", error)

    pageError.value =
      error?.data?.error ||
      error?.message ||
      "Unable to load your profile. Please refresh the page."
  } finally {
    loading.value = false
  }
})

// ================================================================
// EDIT PROFILE
// ================================================================

const openEditModal = () => {
  editForm.value = {
    full_name: user.value.full_name,
    email: user.value.email,
  }

  saveError.value = ""
  saveSuccess.value = false
  isEditing.value = true
}

const closeEditModal = () => {
  if (saveLoading.value) return

  isEditing.value = false
  saveError.value = ""
  saveSuccess.value = false
}

// ================================================================
// SAVE PROFILE
// ================================================================

const saveProfile = async () => {
  saveError.value = ""
  saveSuccess.value = false

  const fullName = editForm.value.full_name.trim()

  if (!fullName) {
    saveError.value = "Full name is required."
    return
  }

  saveLoading.value = true

  try {
    const data = await apiCall("/api/auth/profile/", {
      method: "PATCH",
      body: {
        full_name: fullName,
      },
    })

    user.value = {
      ...user.value,
      full_name: data.full_name || fullName,
      email: data.email || user.value.email,
    }

    // Synchronize localStorage
    if (import.meta.client) {
      try {
        const stored = JSON.parse(
          localStorage.getItem("user") || "{}"
        )

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...stored,
            full_name: user.value.full_name,
            email: user.value.email,
          })
        )
      } catch {
        // Ignore localStorage errors
      }
    }

    saveSuccess.value = true

    setTimeout(() => {
      isEditing.value = false
      saveSuccess.value = false
    }, 1200)
  } catch (error) {
    console.error("Profile update error:", error)

    saveError.value =
      error?.data?.error ||
      error?.message ||
      "Failed to update your profile. Please try again."
  } finally {
    saveLoading.value = false
  }
}

// ================================================================
// VIEW ASSESSMENT
// ================================================================

const viewAssessment = id => {
  router.push(`/assessments/history/${id}`)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.97);
}
</style>

