import axiosClient from '../axiosClient'

export const getProductReviews = (productId, params = {}) =>
  axiosClient
    .get(`/api/products/${productId}/reviews`, { params })
    .then((res) => res.data)

export const createProductReview = (productId, payload) =>
  axiosClient
    .post(`/api/products/${productId}/reviews`, payload)
    .then((res) => res.data)
