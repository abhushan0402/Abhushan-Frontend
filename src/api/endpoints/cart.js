import axiosClient from '../axiosClient'

export const getCart = () =>
  axiosClient.get('/api/cart/').then((res) => res.data)

export const addToCart = ({ productId, quantity = 1 }) =>
  axiosClient
    .post('/api/cart/', { productId, quantity })
    .then((res) => res.data)

export const updateCartItem = (productId, quantity) =>
  axiosClient
    .patch(`/api/cart/${productId}`, { quantity })
    .then((res) => res.data)

export const removeCartItem = (productId) =>
  axiosClient.delete(`/api/cart/${productId}`).then((res) => res.data)

export const clearCart = () =>
  axiosClient.delete('/api/cart/').then((res) => res.data)
