import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
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
        <HorizontalScroller gap={{ xs: 3, md: 4 }}>
          {isLoading
            ? <ProductTypeStripSkeleton />
            : productTypes.map((type) => (
                <Box
                  key={type.productType}
                  component={RouterLink}
                  to={`/shop?productType=${encodeURIComponent(type.productType)}`}
                  sx={{
                    textAlign: 'center',
                    flex: '0 0 auto',
                    textDecoration: 'none',
                    width: 136,
                  }}
                >
                  <Box
                    sx={{
                      width: 132,
                      height: 132,
                      borderRadius: '50%',
                      p: '6px',
                      border: '2px solid transparent',
                      background:
                        'linear-gradient(#fff, #fff) padding-box, ' +
                        'conic-gradient(from -95deg, transparent 0%, #db2173 12%, #F472B6 26%, #db2173 40%, transparent 53%, transparent 100%) border-box',
                      mb: 1,
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
                    sx={{ textTransform: 'capitalize', color: 'text.primary' }}
                  >
                    {type.name}
                  </Typography>
                </Box>
              ))}
        </HorizontalScroller>
      </Box>
    </Box>
  )
}
