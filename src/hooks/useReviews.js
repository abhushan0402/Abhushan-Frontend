import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductReviews, createProductReview } from '../api/endpoints/reviews'
import { queryKeys } from '../app/queryClient'

export const useProductReviews = (productId, params = { page: 1, limit: 10 }) =>
  useQuery({
    queryKey: queryKeys.reviews(productId, params),
    queryFn: () => getProductReviews(productId, params),
    select: (res) => res.data ?? {},
    enabled: Boolean(productId),
  })

export const useCreateReview = (productId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => createProductReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
      queryClient.invalidateQueries({ queryKey: queryKeys.product(productId) })
    },
  })
}
