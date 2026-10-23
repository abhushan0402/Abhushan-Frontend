import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Without a timeout, a slow/overloaded backend leaves requests hanging
  // indefinitely — the UI just spins forever instead of surfacing an
  // ErrorState the user can retry from.
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Plain client with no interceptors, used only for the refresh call itself -
// it must not carry the (possibly expired) access token or trigger the
// response interceptor's own refresh/retry logic.
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

// Dedupe concurrent 401s during a refresh - every request that lands while a
// refresh is already in flight awaits the same promise instead of firing its
// own POST /api/auth/refresh.
let refreshPromise = null

function requestRefresh() {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/api/auth/refresh', { refreshToken: useAuthStore.getState().refreshToken })
      .then((res) => {
        const { accessToken, refreshToken } = res.data?.data ?? {}
        if (!accessToken) throw new Error('Refresh did not return an access token')
        useAuthStore.getState().setAuth({ accessToken, refreshToken })
        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

axiosClient.interceptors.request.use((config) => {
  // Allow a call to set its own Authorization header.
  if (!config.headers.Authorization) {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    const config = error?.config
    const isAuthCall = config?.url?.includes('/api/auth/')

    if (status === 401 && !isAuthCall && !config?._retried && useAuthStore.getState().refreshToken) {
      config._retried = true
      try {
        const accessToken = await requestRefresh()
        config.headers.Authorization = `Bearer ${accessToken}`
        return axiosClient(config)
      } catch {
        useAuthStore.getState().clearAuth()
        if (typeof window !== 'undefined') {
          const redirect = encodeURIComponent(window.location.pathname + window.location.search)
          window.location.href = `/signin?redirect=${redirect}`
        }
        return Promise.reject(error)
      }
    }

    if (status === 401 && !isAuthCall) {
      useAuthStore.getState().clearAuth()
      if (typeof window !== 'undefined') {
        const redirect = encodeURIComponent(
          window.location.pathname + window.location.search
        )
        window.location.href = `/signin?redirect=${redirect}`
      }
    }

    // Prefer the most specific message the backend gives us: field-level
    // validation errors (e.g. "must have required property 'password'")
    // are more useful than the generic "Validation error" wrapper text.
    const data = error?.response?.data
    const validationDetail =
      Array.isArray(data?.errors) &&
      (typeof data.errors[0] === 'string' ? data.errors[0] : data.errors[0]?.message)
    const message =
      validationDetail ||
      (typeof data?.message === 'string' && data.message) ||
      (typeof data?.error === 'string' && data.error) ||
      (error?.code === 'ECONNABORTED' &&
        'The server is taking longer than usual to respond. Please try again.') ||
      (!error?.response && 'Network error. Please check your connection and try again.') ||
      error?.message ||
      'Something went wrong. Please try again.'

    // Mutate the original AxiosError's message rather than spreading it into
    // a plain object — spreading a class instance is fragile (it can silently
    // drop non-enumerable/prototype data other code relies on), while every
    // consumer here only ever reads `.message`.
    error.message = message
    return Promise.reject(error)
  }
)

export default axiosClient
