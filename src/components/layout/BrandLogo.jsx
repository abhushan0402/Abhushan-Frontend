import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { BRAND_NAME } from '../../utils/constants'

export default function BrandLogo({ dark = true, size = 'medium' }) {
  const color = dark ? '#f5f1e8' : '#211d17'
  const iconSize = size === 'large' ? 40 : 30

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
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 4C24 4 12 12 12 24C12 32.8366 17.6 39 24 44C30.4 39 36 32.8366 36 24C36 12 24 4 24 4Z"
          stroke="#c9a667"
          strokeWidth="1.5"
        />
        <path
          d="M24 10V38"
          stroke="#c9a667"
          strokeWidth="1.5"
        />
        <path
          d="M24 16C24 16 18 20 18 26C18 30 21 33 24 36C27 33 30 30 30 26C30 20 24 16 24 16Z"
          stroke="#c9a667"
          strokeWidth="1"
        />
      </svg>
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontSize: size === 'large' ? '1.5rem' : '1.15rem',
            letterSpacing: '0.04em',
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
