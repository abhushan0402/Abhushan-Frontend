import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Hero() {
  return (
    <Box sx={{ position: 'relative', width: '100%', lineHeight: 0 }}>
      <Box
        component="img"
        src="/Hero.png"
        alt="Abhushan Vatika — Crafted to Shine, Made to Treasure"
        sx={{ width: '100%', height: 'auto'}}
      />
      {/* The "Explore Collection" call-to-action is baked into the banner
          image itself — this invisible link sits over that button's
          position (as a % of the image so it tracks correctly at every
          screen width) to keep it clickable. */}
      <Box
        component={RouterLink}
        to="/shop"
        aria-label="Explore Collection"
        sx={{
          position: 'absolute',
          left: '5.5%',
          top: '80%',
          width: '20%',
          height: '9%',
        }}
      />
    </Box>
  )
}
