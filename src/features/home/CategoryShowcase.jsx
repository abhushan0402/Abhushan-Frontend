import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCategories } from '../../hooks/useCategories'
import { useNewArrivals, useBestSellers, useTrendingProducts } from '../../hooks/useProducts'
import SectionHeading from '../../components/common/SectionHeading'
import { handleImageError, pickWorkingImage } from '../../utils/handleImageError'
import { CategoryShowcaseSkeleton } from '../../components/common/PageSkeleton'

export default function CategoryShowcase() {
  const { data: categories = [], isLoading } = useCategories()
  const { data: newArrivals = [] } = useNewArrivals({ limit: 8 })
  const { data: bestSellers = [] } = useBestSellers({ limit: 8 })
  const { data: trending = [] } = useTrendingProducts({ limit: 8 })

  const tiles = [
    ...categories.map((cat) => ({
      key: cat._id,
      name: cat.name,
      image: cat.image,
      to: `/category/${cat.slug}`,
    })),
    { key: 'new-arrivals', name: 'New Arrivals', image: pickWorkingImage(newArrivals), to: '/shop?isNewArrival=true' },
    { key: 'best-selling', name: 'Best Selling', image: pickWorkingImage(bestSellers), to: '/shop?isBestSeller=true' },
    { key: 'trending', name: 'Trending', image: pickWorkingImage(trending), to: '/shop?isTrending=true' },
  ]

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: '#faf7f1' }}>
      <Box className="av-container">
        <SectionHeading
          eyebrow="Our Collections"
          title="Shop by Category"
          subtitle="Explore our curated world of gold, silver and imported jewellery."
        />
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {isLoading
            ? <CategoryShowcaseSkeleton count={6} />
            : tiles.map((tile, i) => (
                <Grid key={tile.key} size={{ xs: 12, sm: 4 }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  >
                    <Box
                      component={RouterLink}
                      to={tile.to}
                      sx={{
                        position: 'relative',
                        display: 'block',
                        aspectRatio: '4 / 5',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        textDecoration: 'none',
                        bgcolor: '#f1ebe0',
                        '&:hover img': { transform: 'scale(1.06)' },
                      }}
                    >
                      <Box
                        component="img"
                        src={tile.image || '/placeholder-product.svg'}
                        alt={tile.name}
                        loading="lazy"
                        onError={handleImageError}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)',
                        }}
                      />
                      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3 }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontFamily: 'Lora, serif',
                            fontSize: '1.4rem',
                            mb: 0.5,
                          }}
                        >
                          {tile.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#facc15',
                            fontSize: '0.7rem',
                            letterSpacing: '0.15em',
                          }}
                        >
                          SHOP NOW →
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Box>
    </Box>
  )
}
