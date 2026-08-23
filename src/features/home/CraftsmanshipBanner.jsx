import { Box, Typography, Button, Grid2 as Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTrendingProducts } from '../../hooks/useProducts'
import { handleImageError } from '../../utils/handleImageError'

export default function CraftsmanshipBanner() {
  const { data: products = [] } = useTrendingProducts({ limit: 1 })
  const image = products[0]?.images?.[0]

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
              sx={{
                aspectRatio: '4 / 5',
                bgcolor: '#e9e2d3',
                overflow: 'hidden',
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
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.main', letterSpacing: '0.25em', mb: 2, fontSize: '0.7rem' }}
              >
                OUR CRAFT
              </Typography>
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
              <Button component={RouterLink} to="/about" variant="outlined" color="secondary">
                Our Story
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
