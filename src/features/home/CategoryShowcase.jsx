import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCategories } from '../../hooks/useCategories'
import SectionHeading from '../../components/common/SectionHeading'
import { handleImageError } from '../../utils/handleImageError'
import { CategoryShowcaseSkeleton } from '../../components/common/PageSkeleton'

export default function CategoryShowcase() {
  const { data: categories = [], isLoading } = useCategories()

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
            ? <CategoryShowcaseSkeleton />
            : categories.map((cat, i) => (
                <Grid key={cat._id} size={{ xs: 12, sm: 4 }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Box
                      component={RouterLink}
                      to={`/category/${cat.slug}`}
                      sx={{
                        position: 'relative',
                        display: 'block',
                        aspectRatio: '4 / 5',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        textDecoration: 'none',
                        '&:hover img': { transform: 'scale(1.06)' },
                      }}
                    >
                      <Box
                        component="img"
                        src={cat.image}
                        alt={cat.name}
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
                          {cat.name}
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
