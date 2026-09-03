import { Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeading from '../../components/common/SectionHeading'
import ScrollCarousel from '../../components/product/ScrollCarousel'
import ErrorState from '../../components/common/ErrorState'
import { ProductGridSkeleton } from '../../components/common/PageSkeleton'

export default function ProductRail({
  eyebrow,
  title,
  subtitle,
  products,
  isLoading,
  isError,
  refetch,
  autoScroll = false,
  viewAllHref,
  bgcolor = '#fff',
}) {
  if (!isLoading && !isError && (!products || products.length === 0)) {
    return null
  }

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor }}>
      <Box className="av-container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : isError ? (
          <ErrorState
            title="Could not load products"
            description="Please refresh to try again."
            onRetry={refetch}
          />
        ) : (
          <ScrollCarousel products={products} autoScroll={autoScroll} fadeColor={bgcolor} />
        )}
        {viewAllHref && !isLoading && !isError ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: 3, md: 4 } }}>
            <Button
              component={RouterLink}
              to={viewAllHref}
              variant="outlined"
              color="primary"
              size="small"
              endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
            >
              View All
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
