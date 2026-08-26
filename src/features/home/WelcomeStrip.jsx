import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { BRAND_NAME } from '../../utils/constants'

export default function WelcomeStrip() {
  return (
    <Box component="section" sx={{ bgcolor: '#fff', py: { xs: 5, md: 7 }, textAlign: 'center' }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="av-container"
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.1rem' },
            mb: 1.5,
          }}
        >
          Welcome to {BRAND_NAME}
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 620, mx: 'auto' }}>
          Where every ring, necklace, and pair of earrings is crafted to be worn for a lifetime —
          explore gold, silver, and 925 imported jewellery made with honest materials and
          uncompromising artistry.
        </Typography>
      </Box>
    </Box>
  )
}
