import { Box, Typography, Button, Grid2 as Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import { useTrendingProducts } from '../../hooks/useProducts'
import { handleImageError, pickWorkingImage } from '../../utils/handleImageError'

const MotionButton = motion(Button)

export default function CraftsmanshipBanner() {
  const { data: products = [] } = useTrendingProducts({ limit: 8 })
  const image = pickWorkingImage(products)

  return (
    <Box component="section" sx={{ bgcolor: '#faf7f1', py: { xs: 7, md: 10 } }}>
      <Box className="av-container">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              sx={{ position: 'relative' }}
            >
              <Box
                sx={{
                  aspectRatio: '4 / 5',
                  bgcolor: '#e9e2d3',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(46,10,63,0.14)',
                }}
              >
                {image ? (
                  <Box
                    component="img"
                    src={image}
                    alt="Craftsmanship"
                    loading="lazy"
                    onError={handleImageError}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : null}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: -20, md: -24 },
                  right: { xs: 12, md: -16 },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: '#fff',
                  borderRadius: '14px',
                  boxShadow: '0 12px 28px rgba(33,29,23,0.18)',
                  px: 2.5,
                  py: 1.75,
                }}
              >
                <DiamondRoundedIcon sx={{ color: '#701888', fontSize: 28 }} />
                <Box>
                  <Typography sx={{ fontFamily: 'Lora, serif', fontSize: '1.1rem', lineHeight: 1 }}>
                    Since 1995
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 0.25 }}>
                    30 Years of Craft
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              sx={{ mt: { xs: 3, md: 0 } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 22, height: '1.5px', bgcolor: 'primary.main', opacity: 0.7 }} />
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'primary.main', letterSpacing: '0.25em', fontSize: '0.7rem', fontWeight: 600 }}
                >
                  OUR CRAFT
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2.5 }}>
                Every Piece Tells a Story
                <br />
                of Patience &amp; Precision
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 460, mb: 4 }}>
                From the first sketch to the final polish, our artisans pour
                hundreds of hours into every creation — hand-selecting metals,
                setting stones with precision, and finishing each piece to a
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
