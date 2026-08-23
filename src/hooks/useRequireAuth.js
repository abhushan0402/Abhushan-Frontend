import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from './useAuth'
import { useNotify } from '../components/common/NotificationContext'

// Cart, Wishlist and Address endpoints are all bearerAuth-protected on the
// API — there is no anonymous/guest cart concept server-side. Rather than
// faking a local guest cart the backend can't actually reconcile, gate the
// action and send the shopper to sign in, then let them retry it.
export function useRequireAuth() {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const location = useLocation()
  const notify = useNotify()

  return useCallback(
    (action) => {
      if (isAuthenticated) {
        action()
        return true
      }
      notify.info('Please sign in to continue')
      const redirect = encodeURIComponent(
        location.pathname + location.search
      )
      navigate(`/signin?redirect=${redirect}`)
      return false
    },
    [isAuthenticated, navigate, location, notify]
  )
}
