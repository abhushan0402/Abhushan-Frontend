import axiosClient from '../axiosClient'

export const getAddresses = () =>
  axiosClient.get('/api/addresses/').then((res) => res.data)

export const addAddress = (payload) =>
  axiosClient.post('/api/addresses/', payload).then((res) => res.data)

export const updateAddress = (addressId, payload) =>
  axiosClient
    .patch(`/api/addresses/${addressId}`, payload)
    .then((res) => res.data)

export const deleteAddress = (addressId) =>
  axiosClient.delete(`/api/addresses/${addressId}`).then((res) => res.data)

export const setDefaultAddress = (addressId) =>
  axiosClient
    .patch(`/api/addresses/${addressId}/default`)
    .then((res) => res.data)
