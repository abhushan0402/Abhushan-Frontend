import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
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
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: '5%', md: '6%' },
          transform: 'translateY(-50%)',
          width: { xs: '90%', sm: '62%', md: '46%' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.05rem', sm: '1.5rem', md: '2.1rem' },
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
          size="small"
          sx={{ mt: { xs: 1.25, sm: 2 } }}
        >
          Explore Collection
        </Button>
      </Box>
    </Box>
  )
}
