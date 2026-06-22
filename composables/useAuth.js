export const useAuth = () => {
  const token = useState('token', () => null)
  const user = useState('user', () => null)

  const setAuth = (data) => {
    token.value = data.access
    user.value = data.user
    if (import.meta.client) {
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh || '')
      localStorage.setItem('user', JSON.stringify(data.user))
    }
  }

  const loadAuth = () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('access_token')
      if (savedToken) token.value = savedToken
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try { user.value = JSON.parse(savedUser) } catch (e) {}
      }
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }

  const getToken = () => {
    if (import.meta.client) {
      return token.value || localStorage.getItem('access_token')
    }
    return token.value
  }

  const apiCall = async (url, options = {}) => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000'
    const fullUrl = `${baseUrl}${url}`

    // Always read token fresh from localStorage
    const authToken = getToken()

    // Public endpoints that don't need a token
    const publicEndpoints = [
      '/api/auth/send-code/',
      '/api/auth/register/',
      '/api/auth/login/',
      '/api/auth/resend-code/',
    ]

    const isPublic = publicEndpoints.includes(url)

    if (!authToken && !isPublic) {
      console.error(`No token available for protected endpoint: ${url}`)
      throw { status: 401, data: { error: 'Not authenticated' }, message: 'Not authenticated' }
    }

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    // Add Authorization header for protected endpoints
    if (authToken && !isPublic) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    try {
      const response = await fetch(fullUrl, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          data: errorData,
          message: errorData.error || response.statusText
        }
      }

      return await response.json()
    } catch (err) {
      console.error(`API Error ${url}:`, err)
      throw err
    }
  }

  return { token, user, setAuth, loadAuth, clearAuth, getToken, apiCall }
}
