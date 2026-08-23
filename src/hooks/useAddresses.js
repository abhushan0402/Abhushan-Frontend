import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as addressApi from '../api/endpoints/addresses'
import { queryKeys } from '../app/queryClient'
import { useIsAuthenticated } from './useAuth'
import { useNotify } from '../components/common/NotificationContext'

export const useAddresses = () => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: queryKeys.addresses,
    queryFn: addressApi.getAddresses,
    select: (res) => res.data ?? [],
    enabled: isAuthenticated,
  })
}

function useAddressMutation(mutationFn, successMessage) {
  const queryClient = useQueryClient()
  const notify = useNotify()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses })
      if (successMessage) notify.success(successMessage)
    },
    onError: (error) => notify.error(error?.message || 'Could not update address'),
  })
}

export const useAddAddress = () =>
  useAddressMutation(addressApi.addAddress, 'Address added')

export const useUpdateAddress = () =>
  useAddressMutation(
    ({ addressId, payload }) => addressApi.updateAddress(addressId, payload),
    'Address updated'
  )

export const useDeleteAddress = () =>
  useAddressMutation(addressApi.deleteAddress, 'Address removed')

export const useSetDefaultAddress = () =>
  useAddressMutation(addressApi.setDefaultAddress, 'Default address updated')
