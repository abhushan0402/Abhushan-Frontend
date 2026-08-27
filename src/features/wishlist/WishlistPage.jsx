import { Box, Typography, Grid2 as Grid } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useIsAuthenticated } from '../../hooks/useAuth'
import { useWishlistProducts } from '../../hooks/useWishlist'
import WishlistItemCard from './WishlistItemCard'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import { WishlistGridSkeleton } from '../../components/common/PageSkeleton'

export default function WishlistPage() {
  const isAuthenticated = useIsAuthenticated()
  const { items, isLoading, isError, refetch } = useWishlistProducts()

  if (!isAuthenticated) {
    return (
      <Box className="av-container" sx={{ py: { xs: 6, md: 10 } }}>
        <EmptyState
          icon={<LockOutlinedIcon fontSize="inherit" />}
          title="Sign in to view your wishlist"
          description="Save pieces you love and come back to them anytime."
          actionLabel="Sign In"
          actionTo="/signin?redirect=/wishlist"
        />
      </Box>
    )
  }

  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 4 }}>
        Your Wishlist
      </Typography>

      {isLoading ? (
        <WishlistGridSkeleton />
      ) : isError ? (
        <ErrorState
          title="Could not load your wishlist"
          description="Please refresh to try again."
          onRetry={refetch}
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<FavoriteBorderRoundedIcon fontSize="inherit" />}
          title="Your wishlist is empty"
          description="Tap the heart on any piece to save it here."
          actionLabel="Explore Collections"
          actionTo="/shop"
        />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {items.map((item) => (
            <Grid key={item.productId} size={{ xs: 6, sm: 4, md: 3 }}>
              <WishlistItemCard productId={item.productId} product={item.product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
