export default defineNuxtRouteMiddleware((to) => {
  // Pages that don't require login
  const publicRoutes = ['/', '/login', '/authentication', '/about', '/contact', '/faqs']

  if (publicRoutes.includes(to.path)) return

  // Check for token in localStorage
  if (import.meta.client) {
    const { loadAuth, getToken } = useAuth()
    
    loadAuth()
    const token = getToken()
    if (!token) {
      return navigateTo('/login')
    }
  }
})
