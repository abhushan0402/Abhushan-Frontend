import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCategories } from '../../hooks/useCategories'
import SectionHeading from '../../components/common/SectionHeading'
import { handleImageError } from '../../utils/handleImageError'
import { CategoryShowcaseSkeleton } from '../../components/common/PageSkeleton'

export default function CategoryShowcase() {
  const { data: categories = [], isLoading } = useCategories()

  const tiles = categories.map((cat) => ({
    key: cat._id,
    name: cat.name,
    image: cat.image,
    to: `/category/${cat.slug}`,
  }))

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
            ? <CategoryShowcaseSkeleton count={3} />
            : tiles.map((tile, i) => (
                <Grid key={tile.key} size={{ xs: 12, sm: 4 }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    className="av-category-tile"
                    sx={{
                      borderRadius: '18px',
                      boxShadow: '0 4px 16px rgba(33,29,23,0.08)',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': { boxShadow: '0 16px 32px rgba(33,29,23,0.18)' },
                    }}
                  >
                    <Box
                      component={RouterLink}
                      to={tile.to}
                      sx={{
                        position: 'relative',
                        display: 'block',
                        aspectRatio: '4 / 5',
                        overflow: 'hidden',
                        borderRadius: '18px',
                        textDecoration: 'none',
                        bgcolor: '#f1ebe0',
                        '.av-category-tile:hover &': {
                          '& img': { transform: 'scale(1.08)' },
                          '& .av-shop-now-arrow': { transform: 'translateX(4px)' },
                        },
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
                            'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)',
                        }}
                      />
                      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3 }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontFamily: 'Lora, serif',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            mb: 0.5,
                          }}
                        >
                          {tile.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#facc15',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          SHOP NOW
                          <Box component="span" className="av-shop-now-arrow" sx={{ display: 'inline-block', transition: 'transform 0.25s ease' }}>
                            →
                          </Box>
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
