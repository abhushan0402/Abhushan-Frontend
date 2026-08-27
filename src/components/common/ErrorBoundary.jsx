import { Component } from 'react'
import { Box, Typography, Button } from '@mui/material'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 3,
            background: 'linear-gradient(135deg, #2BBBAE 0%, #14807A 55%, #0A4D4A 100%)',
            color: '#f5f1e8',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Something went wrong
          </Typography>
          <Typography sx={{ color: 'rgba(245,241,232,0.7)', mb: 4, maxWidth: 420 }}>
            We hit an unexpected error. Please refresh the page — if the
            problem continues, try again in a moment.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: '#f5f1e8',
              borderColor: '#D4AF37',
              '&:hover': { bgcolor: '#D4AF37', color: '#0E5A55', borderColor: '#D4AF37' },
            }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
