import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BRAND_NAME } from '../../utils/constants'

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 1',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="/Hero.png"
        alt="Abhushan Vatika — Crafted to Shine, Made to Treasure"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: '5%', md: '6%' },
          transform: 'translateY(-50%)',
          width: { xs: '90%', sm: '62%', md: '46%' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 0.75, md: 1.25 } }}>
          <Box sx={{ width: 22, height: '1.5px', bgcolor: 'primary.main', opacity: 0.7 }} />
          <Typography
            sx={{
              color: 'primary.main',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: { xs: '0.6rem', md: '0.7rem' },
            }}
          >
            Fine Jewellery · Est. 1995
          </Typography>
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.15rem', sm: '1.65rem', md: '2.35rem' },
            lineHeight: 1.15,
            mb: { xs: 0.5, md: 1.25 },
          }}
        >
          Welcome to {BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'text.secondary',
            fontSize: { sm: '0.8rem', md: '0.95rem' },
            lineHeight: 1.5,
          }}
        >
          Where every ring, necklace, and pair of earrings is crafted to be worn for a
          lifetime — explore gold, silver, and 925 imported jewellery made with honest
          materials and uncompromising artistry.
        </Typography>
        <Button
          component={RouterLink}
          to="/shop"
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mt: { xs: 1.5, sm: 2.5 } }}
        >
          Explore Collection
        </Button>
      </Box>

      <Box
        aria-hidden
        sx={{ position: 'absolute', left: 0, right: 0, bottom: -1, lineHeight: 0, zIndex: 1 }}
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 'clamp(20px, 4vw, 56px)', display: 'block' }}
        >
          <path
            d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z"
            fill="#faf7f1"
          />
        </svg>
      </Box>
    </Box>
  )
}
