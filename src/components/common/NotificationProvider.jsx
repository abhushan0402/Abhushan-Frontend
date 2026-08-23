import { useCallback, useMemo, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { NotificationContext } from './NotificationContext'

let idCounter = 0

export default function NotificationProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(false)

  const notify = useCallback((message, severity = 'success') => {
    const item = { key: ++idCounter, message, severity }
    setQueue((prev) => [...prev, item])
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

  // Advance the queue as a render-phase state adjustment (React's
  // documented pattern for deriving state from other state) rather than
  // an effect — it avoids an extra render round-trip and the
  // setState-in-effect cascading-render pitfall.
  if (!open && queue.length > 0) {
    setCurrent(queue[0])
    setQueue(queue.slice(1))
    setOpen(true)
  }

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const handleExited = () => {
    setCurrent(null)
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionProps={{ onExited: handleExited }}
      >
        {current ? (
          <Alert
            onClose={handleClose}
            severity={current.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {current.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </NotificationContext.Provider>
  )
}
