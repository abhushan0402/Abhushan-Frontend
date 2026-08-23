import { useMutation, useQuery, useQueries, useQueryClient } from '@tanstack/react-query'
import * as wishlistApi from '../api/endpoints/wishlist'
import { getProductById } from '../api/endpoints/products'
import { queryKeys } from '../app/queryClient'
import { useIsAuthenticated } from './useAuth'
import { useNotify } from '../components/common/NotificationContext'

function isPopulatedProduct(value) {
  return Boolean(value && typeof value === 'object' && (value.name || value.images))
}

// The wishlist response shape isn't strictly documented
// (additionalProperties: true on the API). Normalize every plausible shape:
// a raw array of full product objects (matches how best-sellers / trending /
// featured respond), an { items: [...] } wrapper of cart-like refs, or bare
// productId strings.
export function normalizeWishlistItems(wishlist) {
  const rawItems = wishlist?.items ?? wishlist?.products ?? wishlist ?? []
  if (!Array.isArray(rawItems)) return []
  return rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return { productId: item, product: null }
      }
      const ref = item.productId ?? item.product ?? item
      const product = isPopulatedProduct(ref) ? ref : null
      const productId = isPopulatedProduct(ref)
        ? ref._id
        : typeof ref === 'string'
          ? ref
          : (item._id ?? null)
      return { productId, product }
    })
    .filter((item) => item.productId)
}

export const useWishlist = () => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: queryKeys.wishlist,
    queryFn: wishlistApi.getWishlist,
    select: (res) => res.data,
    enabled: isAuthenticated,
  })
}

// Guarantees every wishlist entry carries full product data, fetching by id
// as a fallback for any entry the wishlist endpoint returned unpopulated —
// so the wishlist page renders correctly regardless of the exact backend
// response shape.
export const useWishlistProducts = () => {
  const { data, isLoading, isError, refetch } = useWishlist()
  const items = normalizeWishlistItems(data)
  const missingIds = items.filter((i) => !i.product).map((i) => i.productId)

  const fallbackQueries = useQueries({
    queries: missingIds.map((id) => ({
      queryKey: queryKeys.product(id),
      queryFn: () => getProductById(id),
      select: (res) => res.data,
      staleTime: 5 * 60 * 1000,
    })),
  })

  const fallbackById = new Map()
  missingIds.forEach((id, idx) => {
    if (fallbackQueries[idx]?.data) fallbackById.set(id, fallbackQueries[idx].data)
  })

  const resolvedItems = items.map((item) => ({
    productId: item.productId,
    product: item.product ?? fallbackById.get(item.productId) ?? null,
  }))

  return {
    items: resolvedItems,
    isLoading: isLoading || fallbackQueries.some((q) => q.isLoading),
    isError: isError || fallbackQueries.some((q) => q.isError),
    refetch,
  }
}

export const useIsWishlisted = (productId) => {
  const { data } = useWishlist()
  const items = normalizeWishlistItems(data)
  return items.some((item) => item.productId === productId)
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn: wishlistApi.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist })
      notify.success('Added to wishlist')
    },
    onError: (error) => notify.error(error?.message || 'Could not add to wishlist'),
  })
}

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn: wishlistApi.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist })
      notify.success('Removed from wishlist')
    },
    onError: (error) => notify.error(error?.message || 'Could not update wishlist'),
  })
}
