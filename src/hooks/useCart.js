import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as cartApi from '../api/endpoints/cart'
import { queryKeys } from '../app/queryClient'
import { useIsAuthenticated } from './useAuth'
import { useNotify } from '../components/common/NotificationContext'

// Cart item shape from the API isn't strictly documented
// (additionalProperties: true). Normalize defensively so the UI works
// whether `productId` comes back populated (an object) or as a bare id.
export function normalizeCartItems(cart) {
  const rawItems = cart?.items ?? []
  return rawItems.map((item) => {
    const product =
      typeof item.productId === 'object' && item.productId !== null
        ? item.productId
        : item.product ?? null
    const productId =
      typeof item.productId === 'object'
        ? item.productId?._id
        : item.productId
    return {
      productId,
      quantity: item.quantity ?? 1,
      product,
      raw: item,
    }
  })
}

export const useCart = () => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: cartApi.getCart,
    select: (res) => res.data,
    enabled: isAuthenticated,
  })
}

function useCartMutation(mutationFn, successMessage) {
  const queryClient = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      if (successMessage) notify.success(successMessage)
    },
    onError: (error) => {
      notify.error(error?.message || 'Could not update your cart')
    },
  })
}

export const useAddToCart = () =>
  useCartMutation(cartApi.addToCart, 'Added to cart')

export const useUpdateCartItem = () =>
  useCartMutation(({ productId, quantity }) =>
    cartApi.updateCartItem(productId, quantity)
  )

export const useRemoveCartItem = () =>
  useCartMutation(cartApi.removeCartItem, 'Removed from cart')

export const useClearCart = () => useCartMutation(cartApi.clearCart)
