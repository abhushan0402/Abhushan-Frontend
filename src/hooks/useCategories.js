import { useQuery } from '@tanstack/react-query'
import {
  getCategories,
  getCategoryById,
  getSubCategoriesByCategory,
  getSubCategories,
  getProductTypes,
} from '../api/endpoints/categories'
import { queryKeys } from '../app/queryClient'

const LONG_STALE_TIME = 10 * 60 * 1000

export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    select: (res) => res.data ?? [],
    staleTime: LONG_STALE_TIME,
  })

export const useCategory = (categoryId) =>
  useQuery({
    queryKey: queryKeys.category(categoryId),
    queryFn: () => getCategoryById(categoryId),
    select: (res) => res.data,
    enabled: Boolean(categoryId),
    staleTime: LONG_STALE_TIME,
  })

export const useSubCategoriesByCategory = (categoryId) =>
  useQuery({
    queryKey: queryKeys.subCategoriesByCategory(categoryId),
    queryFn: () => getSubCategoriesByCategory(categoryId),
    select: (res) => res.data ?? [],
    enabled: Boolean(categoryId),
    staleTime: LONG_STALE_TIME,
  })

export const useSubCategories = () =>
  useQuery({
    queryKey: queryKeys.subCategories,
    queryFn: getSubCategories,
    select: (res) => res.data ?? [],
    staleTime: LONG_STALE_TIME,
  })

export const useProductTypes = () =>
  useQuery({
    queryKey: queryKeys.productTypes,
    queryFn: getProductTypes,
    select: (res) => res.data ?? [],
    staleTime: LONG_STALE_TIME,
  })
