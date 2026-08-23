import { Box } from '@mui/material'
import SectionHeading from '../../components/common/SectionHeading'
import ScrollCarousel from '../../components/product/ScrollCarousel'
import ErrorState from '../../components/common/ErrorState'
import { ProductGridSkeleton } from '../../components/common/Skeletons'

export default function ProductRail({
  eyebrow,
  title,
  subtitle,
  products,
  isLoading,
  isError,
  refetch,
}) {
  if (!isLoading && !isError && (!products || products.length === 0)) {
    return null
  }

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
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
          <ScrollCarousel products={products} />
        )}
      </Box>
    </Box>
  )
}
