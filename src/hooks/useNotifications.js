import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as notificationsApi from '../api/endpoints/notifications'
import { queryKeys } from '../app/queryClient'
import { useIsAuthenticated } from './useAuth'

const DEFAULT_PARAMS = { page: 1, limit: 20 }

export const useNotifications = (params = DEFAULT_PARAMS) => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: queryKeys.notifications(params),
    queryFn: () => notificationsApi.getNotifications(params),
    select: (res) => res.data ?? { notifications: [], pagination: {} },
    enabled: isAuthenticated,
    // Notifications are the one thing worth polling for — a light interval
    // keeps the bell badge fresh without the user having to reload.
    refetchInterval: isAuthenticated ? 60 * 1000 : false,
  })
}

// Normalizes the read flag defensively — the field name isn't documented
// (additionalProperties: true), so accept either `isRead` or `read`.
export function isNotificationRead(notification) {
  return Boolean(notification?.isRead ?? notification?.read)
}

function useNotificationsMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export const useMarkNotificationRead = () =>
  useNotificationsMutation(notificationsApi.markNotificationRead)

export const useMarkAllNotificationsRead = () =>
  useNotificationsMutation(notificationsApi.markAllNotificationsRead)

export const useDeleteNotification = () =>
  useNotificationsMutation(notificationsApi.deleteNotification)
