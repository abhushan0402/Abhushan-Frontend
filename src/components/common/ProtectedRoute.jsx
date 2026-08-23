import { Navigate, useLocation } from 'react-router-dom'
import { useIsAuthenticated } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/signin?redirect=${redirect}`} replace />
  }

  return children
}
