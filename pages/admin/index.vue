<template>
  <div
    class="relative min-h-screen w-full bg-gradient-to-b from-[#e9f0ff] via-[#eef3ff] to-[#dce6ff] text-[#1c2b4a]"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,136,255,0.15),_transparent_45%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(73,120,196,0.12),_transparent_35%)]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-10 space-y-8">
      <!-- Admin Header Bar -->
      <div data-aos="fade-up" class="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/70 px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Search Bar -->
          <div class="flex-1 w-full sm:max-w-md">
            <div class="relative">
              <input
                type="text"
                placeholder="Q Search..."
                class="w-full px-4 py-2 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f61c7] focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 flex-wrap">
            <button class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Assessment
            </button>
            <button class="inline-flex items-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Course
            </button>
            <button class="h-10 w-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button class="h-10 w-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Title Section -->
      <div data-aos="fade-up" class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1c2b4a]">Admin</h1>
        <p class="text-base sm:text-lg text-[#4c6087]">
          Manage and oversee the platform's users, assessments, courses, and analytics.
        </p>
      </div>

      <!-- Main Cards Grid -->
      <div data-aos="fade-up" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Manage Users Card -->
        <div class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-[#1c2b4a]">Manage Users</h3>
          <p class="text-sm text-[#586d96] leading-relaxed flex-1">
            View, edit, and manage platform users.
          </p>
          <div class="h-40 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-20 w-20 text-[#9fbaf5]">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Go to User Management
          </button>
        </div>

        <!-- Manage Assessments Card -->
        <div class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-[#1c2b4a]">Manage Assessments</h3>
          <p class="text-sm text-[#586d96] leading-relaxed flex-1">
            Create, edit, and manage skill assessments.
          </p>
          <div class="h-40 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-20 w-20 text-[#9fbaf5]">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Go to Assessment Management
          </button>
        </div>

        <!-- Manage Courses Card -->
        <div class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-[#1c2b4a]">Manage Courses</h3>
          <p class="text-sm text-[#586d96] leading-relaxed flex-1">
            Create, edit, and manage learning courses.
          </p>
          <div class="h-40 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-20 w-20 text-[#9fbaf5]">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Go to Course Management
          </button>
        </div>

        <!-- View Analytics Card -->
        <div class="bg-white rounded-2xl shadow-md border border-white/70 p-6 flex flex-col gap-4 hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-[#1c2b4a]">View Analytics</h3>
          <p class="text-sm text-[#586d96] leading-relaxed flex-1">
            View platform statistics and generate reports.
          </p>
          <div class="h-40 bg-gradient-to-br from-[#e8f0ff] to-[#f0f5ff] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-20 w-20 text-[#9fbaf5]">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f61c7] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-[#274fa3] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Go to Analytics Dashboard
          </button>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div data-aos="fade-up" class="bg-white rounded-2xl shadow-md border border-white/70 p-6">
        <h3 class="text-xl font-bold text-[#1c2b4a] mb-6">Recent Activity</h3>
        
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-sm font-semibold text-[#1c2b4a]">Action</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-[#1c2b4a]">User</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-[#1c2b4a]">Role</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-[#1c2b4a]">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(activity, index) in recentActivities"
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td class="py-3 px-4 text-sm text-[#586d96]">{{ activity.action }}</td>
                <td class="py-3 px-4 text-sm font-medium text-[#1c2b4a]">{{ activity.user }}</td>
                <td class="py-3 px-4 text-sm text-[#586d96]">
                  <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {{ activity.role }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-[#586d96]">{{ activity.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- View All Link -->
        <div class="mt-6 flex justify-end">
          <button class="text-sm text-[#2f61c7] font-medium hover:underline">
            View All Activity →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const recentActivities = [
  {
    action: 'New course "Data Structures Mastery" added',
    user: "Admin",
    role: "Admin",
    date: "Apr 24, 2024 3:15 PM",
  },
  {
    action: 'Emily White completed "Advanced JavaScript" assessm...',
    user: "Emily White",
    role: "Learner",
    date: "Apr 24, 2024 2:40 PM",
  },
  {
    action: "Report generated",
    user: "Admin",
    role: "Admin",
    date: "Apr 24, 2024 1:05 PM",
  },
  {
    action: "Skill gap analysis updated for John Smith",
    user: "Admin",
    role: "Admin",
    date: "Apr 24, 2024 12:30 PM",
  },
];
</script>
