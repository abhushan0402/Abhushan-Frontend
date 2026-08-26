import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as authApi from '../api/endpoints/auth'
import { queryKeys } from '../app/queryClient'
import { useAuthStore, selectIsAuthenticated } from '../store/authStore'

export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated)

export const useCurrentUser = () => useAuthStore((state) => state.user)

export const useMe = () => {
  const isAuthenticated = useIsAuthenticated()
  const setUser = useAuthStore((state) => state.setUser)

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const res = await authApi.getMe()
      if (res?.data) setUser(res.data)
      return res
    },
    select: (res) => res.data,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSendOtp = () => useMutation({ mutationFn: authApi.sendOtp })

export const useVerifyOtp = () =>
  useMutation({ mutationFn: authApi.verifyOtp })

export const useSignupInit = () =>
  useMutation({ mutationFn: authApi.signupInit })

function useApplyAuthResult() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const queryClient = useQueryClient()

  return (res) => {
    const { accessToken, user } = res?.data ?? {}
    if (accessToken) {
      setAuth({ accessToken, user })
      queryClient.invalidateQueries({ queryKey: queryKeys.me })
    }
  }
}

export const useVerifySignupOtp = () => {
  const applyAuthResult = useApplyAuthResult()
  return useMutation({
    mutationFn: authApi.verifySignupOtp,
    onSuccess: applyAuthResult,
  })
}

export const useSignin = () => {
  const applyAuthResult = useApplyAuthResult()
  return useMutation({
    mutationFn: authApi.signin,
    onSuccess: applyAuthResult,
  })
}

export const useResetPassword = () =>
  useMutation({ mutationFn: authApi.resetPassword })

export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.updateMe,
    onSuccess: (res) => {
      if (res?.data) setUser(res.data)
      queryClient.invalidateQueries({ queryKey: queryKeys.me })
    },
  })
}

export const useChangePassword = () =>
  useMutation({ mutationFn: authApi.changePassword })

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth()
      queryClient.clear()
    },
  })
}
