import axiosClient from '../axiosClient'

export const getWishlist = () =>
  axiosClient.get('/api/wishlist/').then((res) => res.data)

export const addToWishlist = (productId) =>
  axiosClient.post('/api/wishlist/', { productId }).then((res) => res.data)

export const removeFromWishlist = (productId) =>
  axiosClient.delete(`/api/wishlist/${productId}`).then((res) => res.data)
