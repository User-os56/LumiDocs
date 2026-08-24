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

    const authToken = getToken()

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

const isFormData =
  typeof FormData !== 'undefined' &&
  options.body instanceof FormData
  
    const headers = {
      ...options.headers,
    }

    // Only set Content-Type to JSON if body is NOT FormData
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    // Add Authorization header for protected endpoints
    if (authToken && !isPublic) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    // Format body depending on whether it's FormData or regular object
    let body = options.body
    if (body && !isFormData && typeof body === 'object') {
      body = JSON.stringify(body)
    }

    try {
      const response = await fetch(fullUrl, {
        method: options.method || 'GET',
        headers,
        body,
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