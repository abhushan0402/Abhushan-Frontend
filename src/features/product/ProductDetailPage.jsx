import { useState } from 'react'
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Box,
  Grid2 as Grid,
  Typography,
  Breadcrumbs,
  IconButton,
  Button,
  Divider,
  Chip,
  Tabs,
  Tab,
  Skeleton,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import { useProduct, useProducts } from '../../hooks/useProducts'
import ProductGallery from '../../components/product/ProductGallery'
import PriceTag from '../../components/common/PriceTag'
import RatingStars from '../../components/common/RatingStars'
import ProductGrid from '../../components/product/ProductGrid'
import ErrorState from '../../components/common/ErrorState'
import { formatWeight } from '../../utils/formatCurrency'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { useAddToCart } from '../../hooks/useCart'
import { useAddToWishlist, useRemoveFromWishlist, useIsWishlisted } from '../../hooks/useWishlist'
import ReviewsSection from './ReviewsSection'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, isError, refetch } = useProduct(productId)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState(0)

  const requireAuth = useRequireAuth()
  const addToCart = useAddToCart()
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const isWishlisted = useIsWishlisted(productId)

  const { data: relatedData } = useProducts(
    product ? { categoryId: product.categoryId?._id, limit: 4 } : {}
  )
  const relatedProducts = (relatedData?.products ?? []).filter((p) => p._id !== productId)

  if (isLoading) {
    return (
      <Box className="av-container" sx={{ py: 6 }}>
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

  if (isError || !product) {
    return (
      <ErrorState
        title="Product not found"
        description="This piece may no longer be available."
        onRetry={refetch}
      />
    )
  }

  const inStock = (product.stock ?? 0) > 0
  const hasPrice = Number(product.basePrice) > 0
  const canBuyNow = inStock && hasPrice

  const handleAddToCart = () => {
    requireAuth(() => addToCart.mutate({ productId: product._id, quantity }))
  }

  const handleBuyNow = () => {
    if (!canBuyNow) return
    requireAuth(() => {
      addToCart.mutate(
        { productId: product._id, quantity },
        { onSuccess: () => navigate('/checkout') }
      )
    })
  }

  const handleWishlistToggle = () => {
    requireAuth(() => {
      if (isWishlisted) removeFromWishlist.mutate(product._id)
      else addToWishlist.mutate(product._id)
    })
  }

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <Box className="av-container" sx={{ py: { xs: 3, md: 6 } }}>
        <Breadcrumbs sx={{ mb: 3, fontSize: '0.8rem' }}>
          <Typography component={RouterLink} to="/" variant="caption" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
            Home
          </Typography>
          <Typography component={RouterLink} to="/shop" variant="caption" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
            Shop
          </Typography>
          {product.categoryId ? (
            <Typography
              component={RouterLink}
              to={`/category/${product.categoryId.slug}`}
              variant="caption"
              sx={{ color: 'text.secondary', textDecoration: 'none' }}
            >
              {product.categoryId.name}
            </Typography>
          ) : null}
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 7 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductGallery images={product.images} name={product.name} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              background: 'linear-gradient(160deg, #faf7f1 0%, #f1ebe0 100%)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            {product.subCategoryId?.name ? (
              <Typography variant="caption" sx={{ color: 'primary.dark', letterSpacing: '0.15em' }}>
                {product.subCategoryId.name.toUpperCase()}
              </Typography>
            ) : null}
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mt: 1, mb: 1.5 }}>
              {product.name}
            </Typography>
            <RatingStars value={product.averageRating} count={product.reviewCount} />

            <PriceTag price={product.basePrice} size="large" sx={{ mt: 2 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
              Inclusive of all taxes. Making charges may vary.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={4}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Metal
                </Typography>
                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                  {product.metalType}
                </Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Purity
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {product.purity && product.purity !== '0' ? product.purity : '—'}
                </Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Weight
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatWeight(product.weight)}
                </Typography>
              </Grid>
            </Grid>

            <Chip
              label={inStock ? 'In Stock' : 'Out of Stock'}
              size="small"
              color={inStock ? 'success' : 'default'}
              variant="outlined"
              sx={{ borderRadius: 0, mb: 3 }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                <IconButton
                  size="small"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <RemoveRoundedIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
                  <AddRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
              <IconButton
                onClick={handleWishlistToggle}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0 }}
                aria-label="Toggle wishlist"
              >
                {isWishlisted ? (
                  <FavoriteRoundedIcon sx={{ color: 'primary.main' }} />
                ) : (
                  <FavoriteBorderRoundedIcon />
                )}
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                disabled={addToCart.isPending}
                onClick={handleAddToCart}
              >
                Add to Bag
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!canBuyNow || addToCart.isPending}
                onClick={handleBuyNow}
              >
                {canBuyNow ? 'Buy Now' : 'Out of Stock'}
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <VerifiedOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  BIS Hallmarked purity guarantee
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocalShippingOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Free, fully insured shipping
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AutorenewOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Lifetime exchange policy
                </Typography>
              </Box>
            </Box>
          </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 9 } }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}
          >
            <Tab label="Description" sx={{ textTransform: 'none' }} />
            <Tab label="Reviews" sx={{ textTransform: 'none' }} />
          </Tabs>

          {tab === 0 ? (
            <Typography sx={{ color: 'text.secondary', maxWidth: 720, lineHeight: 1.8 }}>
              {product.description ||
                `Handcrafted with care, this ${product.metalType} ${product.productType} showcases the artistry Abhushan Vatika is known for — a timeless addition to your jewellery collection.`}
            </Typography>
          ) : (
            <ReviewsSection productId={product._id} />
          )}
        </Box>

        {relatedProducts.length > 0 ? (
          <Box sx={{ mt: { xs: 7, md: 10 } }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              You May Also Like
            </Typography>
            <ProductGrid products={relatedProducts} columns={{ xs: 6, sm: 4, md: 3 }} />
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
