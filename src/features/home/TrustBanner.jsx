import { Box, Grid2 as Grid, Typography } from '@mui/material'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import { TRUST_BADGES } from '../../utils/constants'

const icons = [VerifiedRoundedIcon, LocalShippingRoundedIcon, AutorenewRoundedIcon, DiamondRoundedIcon]

export default function TrustBanner() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: '#f8f5ef',
        color: '#211d17',
      }}
    >
      <Box className="av-container">
        <Grid container spacing={{ xs: 4, md: 3 }}>
          {TRUST_BADGES.map((badge, i) => {
            const Icon = icons[i]
            return (
              <Grid key={badge.title} size={{ xs: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', px: 1 }}>
                  <Icon sx={{ color: '#D4AF37', fontSize: 32, mb: 1.5 }} />
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, mb: 0.5, color: '#211d17' }}>
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
