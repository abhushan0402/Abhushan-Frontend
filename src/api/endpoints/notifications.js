import axiosClient from '../axiosClient'

// POST /api/notifications/ exists but is documented as "for testing/admin
// use" — intentionally not wrapped here, no end-user UI creates notifications.

export const getNotifications = (params = {}) =>
  axiosClient.get('/api/notifications/', { params }).then((res) => res.data)

export const markNotificationRead = (id) =>
  axiosClient.patch(`/api/notifications/${id}/read`).then((res) => res.data)

export const markAllNotificationsRead = () =>
  axiosClient.patch('/api/notifications/read-all').then((res) => res.data)

export const deleteNotification = (id) =>
  axiosClient.delete(`/api/notifications/${id}`).then((res) => res.data)
