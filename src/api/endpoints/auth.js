import axiosClient from '../axiosClient'

export const sendOtp = (payload) =>
  axiosClient.post('/api/auth/send-otp', payload).then((res) => res.data)

export const verifyOtp = (payload) =>
  axiosClient.post('/api/auth/verify-otp', payload).then((res) => res.data)

export const signupInit = (payload) =>
  axiosClient.post('/api/auth/signup-init', payload).then((res) => res.data)

export const verifySignupOtp = (payload) =>
  axiosClient
    .post('/api/auth/verify-signup-otp', payload)
    .then((res) => res.data)

export const signin = (payload) =>
  axiosClient.post('/api/auth/signin', payload).then((res) => res.data)

// Requires the one-time password-reset token returned by verify-otp
// (purpose: "forgot-password") — distinct from the normal session token.
export const resetPassword = ({ email, newPassword, resetToken }) =>
  axiosClient
    .post(
      '/api/auth/reset-password',
      { email, newPassword },
      { headers: { Authorization: `Bearer ${resetToken}` } }
    )
    .then((res) => res.data)

export const getMe = () =>
  axiosClient.get('/api/auth/me').then((res) => res.data)

export const updateMe = (payload) =>
  axiosClient.patch('/api/auth/me', payload).then((res) => res.data)

export const logout = () =>
  axiosClient.delete('/api/auth/logout').then((res) => res.data)
