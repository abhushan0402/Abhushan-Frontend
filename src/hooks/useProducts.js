import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  getProducts,
  getBestSellers,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivals,
  getProductById,
  searchProducts,
  getSearchSuggestions,
} from '../api/endpoints/products'
import { queryKeys } from '../app/queryClient'

// Whenever a search term is present, route through the dedicated search
// endpoint (GET /api/products/search) rather than the generic list's
// `search` filter param — every existing caller (ShopPage, etc.) gets this
// for free without needing its own conditional.
export const useProducts = (filters = {}) => {
  const { search, ...rest } = filters
  const hasSearch = Boolean(search && search.trim())
  return useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: () => (hasSearch ? searchProducts({ q: search.trim(), ...rest }) : getProducts(filters)),
    select: (res) => res.data ?? { products: [], pagination: {} },
    placeholderData: keepPreviousData,
  })
}

export const useSearchSuggestions = (term, limit = 8) => {
  const q = (term ?? '').trim()
  return useQuery({
    queryKey: ['search-suggestions', q, limit],
    queryFn: () => getSearchSuggestions(q, limit),
    select: (res) => res.data ?? [],
    enabled: q.length > 1,
    staleTime: 30 * 1000,
  })
}

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
