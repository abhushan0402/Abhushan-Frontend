import { Box, Skeleton, Stack, Grid2 as Grid } from '@mui/material'

// Single home for every loading-state skeleton used across the site, one
// named component per section/page so each isLoading branch stays a
// one-liner. Colors come from the theme's MuiSkeleton override (see
// theme.js) rather than per-component props, so the shimmer stays on-brand
// everywhere without repeating a color here.

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

// A page/section title line — the repeated "big text skeleton before the
// content" pattern used at the top of several pages.
export function PageTitleSkeleton({ width = 220 }) {
  return <Skeleton variant="text" width={width} sx={{ fontSize: '2rem', mb: 3 }} />
}

// Suspense fallback for the router's lazy-loaded routes — shown while a
// route's JS chunk is still downloading, before the page itself has even
// mounted. A generic title + grid skeleton so navigation always lands on
// skeleton content instead of a spinner, no matter which route is loading.
export function RouteFallbackSkeleton() {
  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <PageTitleSkeleton width={240} />
      <ProductGridSkeleton />
    </Box>
  )
}

// CategoryPage / SubCategoryPage — shown while the category/subcategory
// record itself (name, slug) is still loading, before there's a name to
// show in the page title.
export function CategoryListingPageSkeleton() {
  return (
    <Box className="av-container" sx={{ py: 6 }}>
      <PageTitleSkeleton width={280} />
      <ProductGridSkeleton />
    </Box>
  )
}

// CartPage
export function CartPageSkeleton() {
  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <PageTitleSkeleton width={220} />
      <Skeleton variant="rectangular" height={120} sx={{ mb: 2, borderRadius: '10px' }} />
      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: '10px' }} />
    </Box>
  )
}

// OrderDetailPage
export function OrderDetailPageSkeleton() {
  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <PageTitleSkeleton width={220} />
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '10px' }} />
    </Box>
  )
}

// OrdersPage — the row-of-rectangles list, slotted under the page's own
// static "My Orders" heading.
export function OrdersListSkeleton({ count = 3 }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={100} />
      ))}
    </Stack>
  )
}

// WishlistPage
export function WishlistGridSkeleton({ count = 4 }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
          <Skeleton variant="rectangular" sx={{ aspectRatio: '1 / 1' }} />
        </Grid>
      ))}
    </Grid>
  )
}

// ProductDetailPage
export function ProductDetailPageSkeleton() {
  return (
    <Box className="av-container" sx={{ py: { xs: 3, md: 6 } }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" sx={{ aspectRatio: '1 / 1', width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" width="60%" sx={{ fontSize: '2rem' }} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="30%" sx={{ fontSize: '1.5rem', mt: 2 }} />
        </Grid>
      </Grid>
    </Box>
  )
}

// ProductTypeStrip (home) — meant to sit directly inside the section's
// HorizontalScroller alongside the real items, not as its own container.
export function ProductTypeStripSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ textAlign: 'center', flex: '0 0 auto' }}>
          <Skeleton variant="circular" sx={{ width: { xs: 164, md: 192 }, height: { xs: 164, md: 192 } }} />
        </Box>
      ))}
    </>
  )
}

// CategoryShowcase (home) — meant to sit inside the section's own Grid
// container alongside the real category cards.
export function CategoryShowcaseSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 4 }}>
          <Skeleton variant="rectangular" sx={{ aspectRatio: '4 / 5', width: '100%' }} />
        </Grid>
      ))}
    </>
  )
}
