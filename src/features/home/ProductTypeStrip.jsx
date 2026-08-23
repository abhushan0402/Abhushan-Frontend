import { Box, Typography, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useProductTypes } from '../../hooks/useCategories'
import SectionHeading from '../../components/common/SectionHeading'

export default function ProductTypeStrip() {
  const { data: productTypes = [], isLoading } = useProductTypes()

  if (!isLoading && productTypes.length === 0) return null

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Box className="av-container">
        <SectionHeading eyebrow="Quick Shop" title="Shop by Type" />
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, md: 4 },
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Box key={i} sx={{ textAlign: 'center', flex: '0 0 auto' }}>
                  <Skeleton variant="circular" width={92} height={92} />
                </Box>
              ))
            : productTypes.map((type) => (
                <Box
                  key={type.productType}
                  component={RouterLink}
                  to={`/shop?productType=${encodeURIComponent(type.productType)}`}
                  sx={{
                    textAlign: 'center',
                    flex: '0 0 auto',
                    textDecoration: 'none',
                    width: 96,
                  }}
                >
                  <Box
                    sx={{
                      width: 92,
                      height: 92,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 1,
                      transition: 'border-color 0.2s ease',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
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
                  <Typography
                    variant="caption"
                    sx={{ textTransform: 'capitalize', color: 'text.primary' }}
                  >
                    {type.name}
                  </Typography>
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  )
}
