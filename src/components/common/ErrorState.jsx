import { Box, Typography, Button } from '@mui/material'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'

export default function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 380 }}>
        {description}
      </Typography>
      {onRetry ? (
        <Button
          variant="text"
          color="primary"
          startIcon={<RefreshRoundedIcon />}
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
          Try again
        </Button>
      ) : null}
    </Box>
  )
}
