import { useCallback, useMemo, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { NotificationContext } from './NotificationContext'

let idCounter = 0

export default function NotificationProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success', key: 0 })

  const notify = useCallback((message, severity = 'success') => {
    // Bump `key` on every call so the Snackbar below remounts even if a
    // toast is already showing — that resets its auto-hide timer cleanly
    // instead of extending/reusing a stale one, which is what let old
    // messages appear to "never go away" when a new one arrived quickly.
    setToast({ open: true, message, severity, key: ++idCounter })
  }, [])

  const value = useMemo(
    () => ({
      notify,
      success: (msg) => notify(msg, 'success'),
      error: (msg) => notify(msg, 'error'),
      info: (msg) => notify(msg, 'info'),
      warning: (msg) => notify(msg, 'warning'),
    }),
    [notify]
  )

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return
    setToast((prev) => ({ ...prev, open: false }))
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        key={toast.key}
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}
