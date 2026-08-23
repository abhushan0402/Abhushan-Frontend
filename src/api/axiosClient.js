import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  // Allow a call to set its own Authorization header (e.g. the
  // password-reset flow, which authenticates with a one-time reset token
  // instead of the normal session access token).
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
  (error) => {
    const status = error?.response?.status
    const isAuthCall = error?.config?.url?.includes('/api/auth/')

    if (status === 401 && !isAuthCall) {
      useAuthStore.getState().clearAuth()
      if (typeof window !== 'undefined') {
        const redirect = encodeURIComponent(
          window.location.pathname + window.location.search
        )
        window.location.href = `/signin?redirect=${redirect}`
      }
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.'

    return Promise.reject({ ...error, message })
  }
)

export default axiosClient
