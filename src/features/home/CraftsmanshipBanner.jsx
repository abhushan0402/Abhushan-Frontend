import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'

const MotionButton = motion(Button)

export default function CraftsmanshipBanner() {
  return (
    <Box component="section" sx={{ bgcolor: '#faf7f1', py: { xs: 7, md: 10 } }}>
      <Box className="av-container">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#fff',
              borderRadius: '999px',
              boxShadow: '0 8px 20px rgba(33,29,23,0.1)',
              px: 2.5,
              py: 1,
              mb: 3,
            }}
          >
            <DiamondRoundedIcon sx={{ color: '#701888', fontSize: 22 }} />
            <Typography sx={{ fontFamily: 'Lora, serif', fontSize: '0.95rem' }}>
              Since 1995
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
              · 30 Years of Craft
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ width: 22, height: '1.5px', bgcolor: 'primary.main', opacity: 0.7 }} />
            <Typography
              variant="subtitle2"
              sx={{ color: 'primary.main', letterSpacing: '0.25em', fontSize: '0.7rem', fontWeight: 600 }}
            >
              OUR CRAFT
            </Typography>
            <Box sx={{ width: 22, height: '1.5px', bgcolor: 'primary.main', opacity: 0.7 }} />
          </Box>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2.5 }}>
            Every Piece Tells a Story
            <br />
            of Patience &amp; Precision
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto', mb: 4 }}>
            From the first sketch to the final polish, our artisans pour
            hundreds of hours into every creation — hand-selecting metals,
            setting stones with precision, and finishing, each piece to a
            mirror shine. It's a tradition of craftsmanship passed down
            through generations.
          </Typography>
          <MotionButton
            component={RouterLink}
            to="/about"
            variant="outlined"
            color="secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Our Story
          </MotionButton>
        </Box>
      </Box>
    </Box>
  )
}
