import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Box
      className="av-container"
      sx={{
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{ fontFamily: 'Lora, serif', fontSize: { xs: '4rem', md: '6rem' }, color: 'primary.main' }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Page Not Found
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 420 }}>
        The page you're looking for may have been moved or no longer exists.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" color="primary">
        Back to Home
      </Button>
    </Box>
  )
}
