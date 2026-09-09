import { useQuery } from '@tanstack/react-query'
import { getMetalRates } from '../api/endpoints/metalRates'
import { queryKeys } from '../app/queryClient'

// Rates are set by an admin, not per-request — no need to refetch often.
const RATES_STALE_TIME = 5 * 60 * 1000

export const useMetalRates = () =>
  useQuery({
    queryKey: queryKeys.metalRates,
    queryFn: getMetalRates,
    select: (res) => res.data,
    staleTime: RATES_STALE_TIME,
  })
