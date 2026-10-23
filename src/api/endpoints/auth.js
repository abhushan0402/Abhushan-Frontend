import axiosClient from '../axiosClient'

export const signupInit = (payload) =>
  axiosClient.post('/api/auth/signup-init', payload).then((res) => res.data)

export const verifySignupOtp = (payload) =>
  axiosClient
    .post('/api/auth/verify-signup-otp', payload)
    .then((res) => res.data)

export const signin = (payload) =>
  axiosClient.post('/api/auth/signin', payload).then((res) => res.data)

export const signinVerify = (payload) =>
  axiosClient.post('/api/auth/signin/verify', payload).then((res) => res.data)

export const refreshToken = (payload) =>
  axiosClient.post('/api/auth/refresh', payload).then((res) => res.data)

export const getMe = () =>
  axiosClient.get('/api/auth/me').then((res) => res.data)

export const updateMe = (payload) =>
  axiosClient.patch('/api/auth/me', payload).then((res) => res.data)

export const logout = () =>
  axiosClient.delete('/api/auth/logout').then((res) => res.data)
