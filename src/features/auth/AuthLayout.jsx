import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import BrandLogo from '../../components/layout/BrandLogo'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          background: 'linear-gradient(135deg, #2BBBAE 0%, #14807A 55%, #0A4D4A 100%)',
          color: '#f5f1e8',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          px: 6,
          position: 'relative',
        }}
      >
        <BrandLogo dark size="large" />
        <Typography
          variant="h3"
          sx={{ mt: 5, fontSize: '2.25rem', maxWidth: 380, lineHeight: 1.25 }}
        >
          Timeless Beauty. Infinite Love.
        </Typography>
        <Typography sx={{ mt: 3, color: 'rgba(245,241,232,0.7)', maxWidth: 360 }}>
          Sign in to track orders, manage your wishlist, and enjoy a faster
          checkout every time.
        </Typography>
      </Grid>

      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6 },
          py: { xs: 6, md: 4 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ width: '100%', maxWidth: 420 }}
        >
          <Typography variant="h4" sx={{ fontSize: '1.85rem', mb: 1 }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography sx={{ color: 'text.secondary', mb: 4 }}>{subtitle}</Typography>
          ) : (
            <Box sx={{ mb: 4 }} />
          )}
          {children}
        </Box>
      </Grid>
    </Grid>
  )
}
