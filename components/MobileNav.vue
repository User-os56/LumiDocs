<template>
  <div>
    
    <nav class="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#e4edff] shadow-lg safe-bottom">
      <div class="flex items-center justify-around px-1 py-1.5">
        <NuxtLink
          v-for="item in bottomItems"
          :key="item.path ?? item.label"
          :to="item.path ?? undefined"
          class="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px]"
          :class="item.path && isActive(item.path)
            ? 'text-[#2f61c7] bg-[#eef3ff]'
            : 'text-[#7890b8]'"
          @click.prevent="item.action ? item.action() : undefined"
        >
          <span v-html="item.icon" class="h-5 w-5 block [&>svg]:h-5 [&>svg]:w-5"></span>
          <span class="text-[10px] font-semibold leading-tight">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>

    <Transition name="fade-drawer">
      <div v-if="drawerOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-[#1c2b4a]/40 backdrop-blur-sm" @click="drawerOpen = false"/>

        <Transition name="slide-drawer">
          <div v-if="drawerOpen" class="relative w-72 bg-white h-full flex flex-col shadow-2xl">

            <div class="flex items-center justify-between px-6 py-5 border-b border-[#e4edff]">
              <div class="flex items-center gap-2">
                <div class="h-8 w-8 rounded-lg bg-[#2f61c7] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-4 w-4">
                    <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Zm-8 3h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Z"/>
                  </svg>
                </div>
                <span class="text-sm font-bold text-[#1c2b4a]">LUMIERE</span>
              </div>
              <button @click="drawerOpen = false" class="text-[#7890b8] hover:text-[#1c2b4a] transition p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <NuxtLink
                v-for="item in drawerItems"
                :key="item.path"
                :to="item.path"
                @click="drawerOpen = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                :class="isActive(item.path)
                  ? 'bg-[#eef3ff] text-[#2f61c7]'
                  : 'text-[#4c6087] hover:bg-[#f6f8ff] hover:text-[#2f61c7]'"
              >
                <span v-html="item.icon" class="h-5 w-5 shrink-0 block [&>svg]:h-5 [&>svg]:w-5"></span>
                <span class="flex-1">{{ item.label }}</span>
                <span v-if="isActive(item.path)" class="h-1.5 w-1.5 rounded-full bg-[#2f61c7]"></span>
              </NuxtLink>
            </div>

            <div class="border-t border-[#e4edff] px-5 py-4 space-y-3">
              <div class="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100" alt="profile" class="h-9 w-9 rounded-full object-cover border-2 border-[#cdd8f4]"/>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-[#1c2b4a] truncate">{{ userName }}</p>
                  <p class="text-xs text-[#7890b8] truncate">{{ userEmail }}</p>
                </div>
              </div>
              <button
                @click="logout"
                class="w-full flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Log Out
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

const route  = useRoute()
const router = useRouter()

const drawerOpen = ref(false)

const userName  = ref('')
const userEmail = ref('')

onMounted(() => {
  if (!import.meta.client) return
  try {
    const u = JSON.parse(localStorage.getItem('user') || '{}')
    userName.value  = u.full_name || 'User'
    userEmail.value = u.email     || ''
  } catch {}
})

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')

const icons = {
  home:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
  clipboard:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
  star:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
  user:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
  chart:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  menu:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`,
}

const bottomItems = [
  { label: 'Home',     path: '/dashboard',               icon: icons.home      },
  { label: 'Assess',   path: '/assessments/onboarding', icon: icons.clipboard },
  { label: 'Recs',     path: '/recommendations',        icon: icons.star      },
  { label: 'Profile',  path: '/profile',                icon: icons.user      },
  { label: 'More',     path: null, icon: icons.menu, action: () => drawerOpen.value = true },
]

const drawerItems = [
  { label: 'Dashboard',       path: '/dashboard',                    icon: icons.home      },
  { label: 'Take Assessment', path: '/assessments/onboarding',       icon: icons.clipboard },
  { label: 'My Results',      path: '/assessments/tests/submitted',  icon: icons.chart     },
  { label: 'Recommendations', path: '/recommendations',              icon: icons.star      },
  { label: 'My Profile',      path: '/profile',                      icon: icons.user      },
]

const logout = () => {
  if (import.meta.client) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('latest_result')
    localStorage.removeItem('assessment_history')
  }
  drawerOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
/* Backdrop fade */
.fade-drawer-enter-active, .fade-drawer-leave-active { transition: opacity 0.2s ease; }
.fade-drawer-enter-from,   .fade-drawer-leave-to     { opacity: 0; }

/* Panel slide */
.slide-drawer-enter-active, .slide-drawer-leave-active { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); }
.slide-drawer-enter-from,   .slide-drawer-leave-to     { transform: translateX(100%); }

/* iOS safe area */
.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0); }
</style>