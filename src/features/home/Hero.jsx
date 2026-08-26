import { Box, Typography, Button, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFeaturedProducts } from '../../hooks/useProducts'
import { handleImageError } from '../../utils/handleImageError'

export default function Hero() {
  const { data: products = [], isLoading } = useFeaturedProducts({ limit: 6 })
  const images = products.map((p) => p.images?.[0]).filter(Boolean)

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #121212 0%, #383838 55%, #232323 100%)',
        color: '#f5f1e8',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        className="av-container"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          alignItems: 'center',
          minHeight: { xs: 'auto', md: '86vh' },
          py: { xs: 8, md: 0 },
          gap: { xs: 6, md: 4 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: 'primary.main',
              letterSpacing: '0.3em',
              mb: 2.5,
              fontSize: '0.7rem',
            }}
          >
            ABHUSHAN VATIKA
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.6rem', sm: '3.2rem', md: '3.75rem' },
              lineHeight: 1.12,
              maxWidth: 560,
            }}
          >
            Timeless Beauty.
            <br />
            Infinite Love.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245,241,232,0.75)',
              mt: 3,
              maxWidth: 440,
              fontSize: '1rem',
            }}
          >
            Masterpieces of unparalleled artistry — each creation demands
            hundreds of hours of expert craftsmanship to perfect.
          </Typography>
          <Button
            component={RouterLink}
            to="/shop"
            variant="outlined"
            color="primary"
            sx={{
              mt: 5,
              color: '#f5f1e8',
              borderColor: '#1f8075',
              '&:hover': { bgcolor: '#1f8075', color: '#121212', borderColor: '#1f8075' },
            }}
          >
            Shop Now
          </Button>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: { xs: 380, sm: 460, md: 560 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 280, md: 420 },
              height: { xs: 280, md: 420 },
              borderRadius: '50%',
              border: '1px solid rgba(31,128,117,0.35)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 360, md: 520 },
              height: { xs: 200, md: 300 },
              top: { xs: 40, md: 60 },
              borderTopLeftRadius: '50% 100%',
              borderTopRightRadius: '50% 100%',
              background: 'linear-gradient(180deg, #383838 0%, #232323 100%)',
            }}
          />

          {isLoading ? (
            <Skeleton
              variant="circular"
              width={220}
              height={220}
              sx={{ bgcolor: 'rgba(31,128,117,0.15)' }}
            />
          ) : (
            <>
              {images[0] ? (
                <Box
                  component={motion.img}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  src={images[0]}
                  alt="Featured jewellery"
                  onError={handleImageError}
                  sx={{
                    position: 'absolute',
                    top: { xs: 10, md: 0 },
                    left: { xs: 10, md: 20 },
                    width: { xs: 130, md: 190 },
                    height: { xs: 170, md: 250 },
                    objectFit: 'cover',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.55)',
                    border: '1px solid rgba(31,128,117,0.3)',
                  }}
                />
              ) : null}
              {images[1] ? (
                <Box
                  component={motion.img}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  src={images[1]}
                  alt="Featured jewellery"
                  onError={handleImageError}
                  sx={{
                    position: 'absolute',
                    right: { xs: 4, md: 10 },
                    top: { xs: 90, md: 130 },
                    width: { xs: 150, md: 220 },
                    height: { xs: 150, md: 220 },
                    objectFit: 'cover',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.55)',
                    border: '1px solid rgba(31,128,117,0.3)',
                  }}
                />
              ) : null}
              {images[2] ? (
                <Box
                  component={motion.img}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  src={images[2]}
                  alt="Featured jewellery"
                  onError={handleImageError}
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 0, md: 10 },
                    left: { xs: 60, md: 100 },
                    width: { xs: 190, md: 280 },
                    height: { xs: 130, md: 190 },
                    objectFit: 'cover',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.55)',
                    border: '1px solid rgba(31,128,117,0.3)',
                  }}
                />
              ) : null}
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
