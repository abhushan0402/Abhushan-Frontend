import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProductTypes } from '../../hooks/useCategories'
import SectionHeading from '../../components/common/SectionHeading'
import HorizontalScroller from '../../components/common/HorizontalScroller'
import { ProductTypeStripSkeleton } from '../../components/common/PageSkeleton'

export default function ProductTypeStrip() {
  const { data: productTypes = [], isLoading } = useProductTypes()

  if (!isLoading && productTypes.length === 0) return null

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(160deg, #faf7f1 0%, #f1ebe0 60%, #ece3d3 100%)',
      }}
    >
      <Box className="av-container">
        <SectionHeading eyebrow="Quick Shop" title="Shop by Type" />
        <HorizontalScroller gap={{ xs: 3, md: 4 }} fadeColor="#f1ebe0">
          {isLoading
            ? <ProductTypeStripSkeleton />
            : productTypes.map((type, i) => (
                <Box
                  key={type.productType}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                  whileHover={{ y: -4 }}
                  sx={{ flex: '0 0 auto' }}
                >
                  <Box
                    component={RouterLink}
                    to={`/shop?productType=${encodeURIComponent(type.productType)}`}
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                      textDecoration: 'none',
                      width: { xs: 168, md: 196 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 164, md: 192 },
                        height: { xs: 164, md: 192 },
                        borderRadius: '50%',
                        p: '6px',
                        border: '2px solid transparent',
                        boxShadow: '0 8px 20px rgba(112, 24, 136, 0.12)',
                        background:
                          'linear-gradient(#fff, #fff) padding-box, ' +
                          'conic-gradient(from -95deg, transparent 0%, #db2173 12%, #F472B6 26%, #db2173 40%, transparent 53%, transparent 100%) border-box',
                        mb: 1.25,
                      }}
                    >
                      <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                        <Box
                          component="img"
                          src={type.image}
                          alt={type.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.svg'
                          }}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: 'capitalize', color: 'text.primary', fontWeight: 500 }}
                    >
                      {type.name}
                    </Typography>
                  </Box>
                </Box>
              ))}
        </HorizontalScroller>
      </Box>
    </Box>
  )
}
