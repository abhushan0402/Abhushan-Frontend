import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import { TRUST_BADGES } from '../../utils/constants'

const icons = [VerifiedRoundedIcon, LocalShippingRoundedIcon, DiamondRoundedIcon]

export default function TrustBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        background: '#f8f5ef',
        color: '#211d17',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -80,
          left: -80,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(112,24,136,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,204,21,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box className="av-container" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {TRUST_BADGES.map((badge, i) => {
            const Icon = icons[i]
            return (
              <Grid key={badge.title} size={{ xs: 6, md: 3 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  sx={{
                    textAlign: 'center',
                    height: '100%',
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 2.5, md: 3 },
                    bgcolor: '#fff',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '16px',
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 1.75,
                      borderRadius: '50%',
                      bgcolor: 'rgba(112, 24, 136, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: '#701888', fontSize: 26 }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 0.5, color: '#211d17' }}>
                    {badge.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#6f6a5f' }}>
                    {badge.desc}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
