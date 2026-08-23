import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 8, md: 12 },
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {icon ? (
        <Box sx={{ color: 'primary.main', fontSize: 48, mb: 1 }}>{icon}</Box>
      ) : null}
      <Typography variant="h5">{title}</Typography>
      {description ? (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 420 }}
        >
          {description}
        </Typography>
      ) : null}
      {actionLabel ? (
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          component={actionTo ? RouterLink : 'button'}
          to={actionTo}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </Box>
  )
}
