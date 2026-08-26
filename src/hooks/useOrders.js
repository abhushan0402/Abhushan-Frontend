import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as ordersApi from '../api/endpoints/orders'
import { queryKeys } from '../app/queryClient'
import { useIsAuthenticated } from './useAuth'

export const useOrders = (params = { page: 1, limit: 20 }) => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: queryKeys.orders(params),
    queryFn: () => ordersApi.getOrders(params),
    select: (res) => res.data ?? { orders: [], pagination: {} },
    enabled: isAuthenticated,
  })
}

export const useOrder = (id) =>
  useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => ordersApi.getOrderById(id),
    select: (res) => res.data,
    enabled: Boolean(id),
  })

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
