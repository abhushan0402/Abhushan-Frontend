import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { BRAND_NAME } from '../../utils/constants'

export default function BrandLogo({ dark = true, size = 'medium' }) {
  const color = dark ? '#f5f1e8' : '#173B2C'
  const badgeSize = size === 'large' ? 46 : size === 'small' ? 32 : 38

  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        textDecoration: 'none',
      }}
    >
      {/* The source file has a solid white background rather than
          transparency — a small rounded white badge is the standard,
          reliable way to place a white-bg mark on a dark header without
          the raw square edges showing, and it reads identically well on
          light surfaces too. */}
      <Box
        sx={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: '50%',
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: dark ? '0 0 0 1px rgba(112, 24, 136,0.35)' : '0 0 0 1px rgba(33,29,23,0.12)',
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt={BRAND_NAME}
          sx={{ width: '78%', height: '78%', objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontFamily: 'Lora, serif',
            fontWeight: 600,
            fontSize: size === 'large' ? '1.5rem' : '1.15rem',
            letterSpacing: '0.02em',
            color,
            lineHeight: 1.1,
          }}
        >
          {BRAND_NAME}
        </Typography>
      </Box>
    </Box>
  )
}
