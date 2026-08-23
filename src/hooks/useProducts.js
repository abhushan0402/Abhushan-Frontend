import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  getProducts,
  getBestSellers,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivals,
  getProductById,
} from '../api/endpoints/products'
import { queryKeys } from '../app/queryClient'

export const useProducts = (filters = {}) =>
  useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: () => getProducts(filters),
    select: (res) => res.data ?? { products: [], pagination: {} },
    placeholderData: keepPreviousData,
  })

export const useBestSellers = (params = { limit: 8 }) =>
  useQuery({
    queryKey: queryKeys.bestSellers(params),
    queryFn: () => getBestSellers(params),
    select: (res) => res.data?.products ?? res.data ?? [],
  })

export const useFeaturedProducts = (params = { limit: 8 }) =>
  useQuery({
    queryKey: queryKeys.featured(params),
    queryFn: () => getFeaturedProducts(params),
    select: (res) => res.data?.products ?? res.data ?? [],
  })

export const useTrendingProducts = (params = { limit: 8 }) =>
  useQuery({
    queryKey: queryKeys.trending(params),
    queryFn: () => getTrendingProducts(params),
    select: (res) => res.data?.products ?? res.data ?? [],
  })

export const useNewArrivals = (params = { limit: 8 }) =>
  useQuery({
    queryKey: queryKeys.newArrivals(params),
    queryFn: () => getNewArrivals(params),
    select: (res) => res.data?.products ?? res.data ?? [],
  })

export const useProduct = (productId) =>
  useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => getProductById(productId),
    select: (res) => res.data,
    enabled: Boolean(productId),
  })
