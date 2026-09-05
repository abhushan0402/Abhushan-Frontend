import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HeritageBanner() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: '#f1ebe0',
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        sx={{ width: '100%', height: '100%' }}
      >
        <Box
          component={RouterLink}
          to="/about"
          sx={{
            display: 'block',
            position: 'relative',
            width: '100%',
            aspectRatio: { xs: '4.5 / 1', sm: '5.5 / 1', md: '6.56 / 1' },
          }}
        >
          <Box
            component="img"
            src="/Hero2.PNG"
            alt="Abhushan Vatika — Fine Jewelry, Crafted with Passion, Est. 1995"
            loading="lazy"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
