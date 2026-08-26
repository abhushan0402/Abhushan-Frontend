import axiosClient from '../axiosClient'

function cleanParams(params = {}) {
  const cleaned = {}
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    cleaned[key] = value
  })
  return cleaned
}

export const getProducts = (filters = {}) =>
  axiosClient
    .get('/api/products', { params: cleanParams(filters) })
    .then((res) => res.data)

export const getBestSellers = (params = {}) =>
  axiosClient
    .get('/api/products/best-sellers', { params: cleanParams(params) })
    .then((res) => res.data)

export const getFeaturedProducts = (params = {}) =>
  axiosClient
    .get('/api/products/featured', { params: cleanParams(params) })
    .then((res) => res.data)

export const getTrendingProducts = (params = {}) =>
  axiosClient
    .get('/api/products/trending', { params: cleanParams(params) })
    .then((res) => res.data)

export const getNewArrivals = (params = {}) =>
  axiosClient
    .get('/api/products/new-arrivals', { params: cleanParams(params) })
    .then((res) => res.data)

export const getProductById = (productId) =>
  axiosClient.get(`/api/products/${productId}`).then((res) => res.data)

// The dedicated search endpoint (as opposed to /api/products?search=) —
// takes the same filter/sort/pagination params plus a required `q`.
export const searchProducts = ({ q, ...filters } = {}) =>
  axiosClient
    .get('/api/products/search', { params: cleanParams({ q, ...filters }) })
    .then((res) => res.data)

export const getSearchSuggestions = (q, limit = 8) =>
  axiosClient
    .get('/api/products/search/suggestions', { params: cleanParams({ q, limit }) })
    .then((res) => res.data)
