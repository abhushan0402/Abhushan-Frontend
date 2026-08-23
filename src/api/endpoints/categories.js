import axiosClient from '../axiosClient'

export const getCategories = () =>
  axiosClient.get('/api/categories').then((res) => res.data)

export const getCategoryById = (categoryId) =>
  axiosClient.get(`/api/categories/${categoryId}`).then((res) => res.data)

export const getSubCategoriesByCategory = (categoryId) =>
  axiosClient
    .get(`/api/categories/${categoryId}/subcategories`)
    .then((res) => res.data)

export const getSubCategories = () =>
  axiosClient.get('/api/subcategories').then((res) => res.data)

export const getSubCategoryById = (subCategoryId) =>
  axiosClient
    .get(`/api/subcategories/${subCategoryId}`)
    .then((res) => res.data)

export const getProductTypes = () =>
  axiosClient.get('/api/product-types').then((res) => res.data)
