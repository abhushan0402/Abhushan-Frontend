import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const BOOLEAN_KEYS = ['isBestSeller', 'isFeatured', 'isTrending', 'isNewArrival']
const NUMBER_KEYS = ['minPrice', 'maxPrice', 'minWeight', 'maxWeight', 'page']

export function useProductFilters(defaults = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const result = { ...defaults }
    for (const [key, value] of searchParams.entries()) {
      if (BOOLEAN_KEYS.includes(key)) {
        result[key] = value === 'true'
      } else if (NUMBER_KEYS.includes(key)) {
        result[key] = Number(value)
      } else {
        result[key] = value
      }
    }
    if (!result.limit) result.limit = 12
    if (!result.page) result.page = 1
    return result
  }, [searchParams, defaults])

  const setFilters = useCallback(
    (next, { resetPage = true } = {}) => {
      const params = {}
      Object.entries(next).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '' || value === false) return
        params[key] = String(value)
      })
      if (resetPage) delete params.page
      setSearchParams(params)
    },
    [setSearchParams]
  )

  const setPage = useCallback(
    (page) => {
      setFilters({ ...filters, page }, { resetPage: false })
    },
    [filters, setFilters]
  )

  const clearFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  return { filters, setFilters, setPage, clearFilters }
}
