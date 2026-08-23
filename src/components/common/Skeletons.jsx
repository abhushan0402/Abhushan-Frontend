import { Box, Skeleton, Grid2 as Grid } from '@mui/material'

export function ProductCardSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" sx={{ aspectRatio: '1 / 1', width: '100%' }} />
      <Skeleton variant="text" width="70%" sx={{ mt: 1.5, fontSize: '1rem' }} />
      <Skeleton variant="text" width="40%" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  )
}

export function TextBlockSkeleton({ lines = 3 }) {
  return (
    <Box>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" sx={{ fontSize: '1rem' }} />
      ))}
    </Box>
  )
}
