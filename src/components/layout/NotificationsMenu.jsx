import { useState } from 'react'
import {
  IconButton,
  Badge,
  Popover,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
  useNotifications,
  isNotificationRead,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from '../../hooks/useNotifications'
import { useIsAuthenticated } from '../../hooks/useAuth'

function timeAgo(dateString) {
  if (!dateString) return ''
  const diffMs = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function NotificationsMenu({ iconColor = '#f5f1e8' }) {
  const isAuthenticated = useIsAuthenticated()
  const [anchorEl, setAnchorEl] = useState(null)
  const { data, isLoading } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const deleteNotification = useDeleteNotification()

  if (!isAuthenticated) return null

  const notifications = data?.notifications ?? []
  const unreadCount = notifications.filter((n) => !isNotificationRead(n)).length
  const open = Boolean(anchorEl)

  const handleItemClick = (notification) => {
    if (!isNotificationRead(notification)) {
      markRead.mutate(notification._id)
    }
  }

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: iconColor }}
        aria-label="Notifications"
      >
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsNoneRoundedIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 360, maxHeight: 480 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
          {unreadCount > 0 ? (
            <Button size="small" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
              Mark all read
            </Button>
          ) : null}
        </Box>
        <Divider />

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} sx={{ color: 'primary.main' }} />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You're all caught up.
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Divider />} sx={{ maxHeight: 380, overflowY: 'auto' }}>
            {notifications.map((notification) => {
              const read = isNotificationRead(notification)
              return (
                <Box
                  key={notification._id}
                  onClick={() => handleItemClick(notification)}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'flex-start',
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: read ? 'transparent' : 'rgba(31,128,117,0.06)',
                    '&:hover': { bgcolor: 'rgba(31,128,117,0.1)' },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: read ? 500 : 700 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
                      {notification.body}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                      {timeAgo(notification.createdAt)}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification.mutate(notification._id)
                    }}
                    aria-label="Delete notification"
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              )
            })}
          </Stack>
        )}
      </Popover>
    </>
  )
}
