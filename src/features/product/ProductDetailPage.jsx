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
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import { useProduct, useProducts } from '../../hooks/useProducts'
import ProductGallery from '../../components/product/ProductGallery'
import PriceTag from '../../components/common/PriceTag'
import RatingStars from '../../components/common/RatingStars'
import ProductGrid from '../../components/product/ProductGrid'
import ErrorState from '../../components/common/ErrorState'
import { ProductDetailPageSkeleton } from '../../components/common/PageSkeleton'
import { formatWeight } from '../../utils/formatCurrency'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { useAddToCart } from '../../hooks/useCart'
import { useAddToWishlist, useRemoveFromWishlist, useIsWishlisted } from '../../hooks/useWishlist'
import ReviewsSection from './ReviewsSection'

const MotionButton = motion(Button)
const MotionIconButton = motion(IconButton)

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
    return <ProductDetailPageSkeleton />
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
  const hasWeight = product.weight !== undefined && product.weight !== null

  const handleAddToCart = () => {
    requireAuth(() => addToCart.mutate({ productId: product._id, quantity }))
  }

  const handleBuyNow = () => {
    if (!inStock) return
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
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              alignSelf: 'flex-start',
              position: { md: 'sticky' },
              top: { md: 104 },
            }}
          >
            <ProductGallery images={product.images} name={product.name} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              background: 'linear-gradient(160deg, #d7f2f1 0%, #f1ebe0 100%)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '16px',
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            {product.subCategoryId?.name ? (
              <Typography variant="caption" sx={{ color: 'primary.main', letterSpacing: '0.15em' }}>
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
            {product.sku ? (
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                SKU: {product.sku}
              </Typography>
            ) : null}

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={hasWeight ? 4 : 6}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Metal
                </Typography>
                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                  {product.metalType}
                </Typography>
              </Grid>
              <Grid size={hasWeight ? 4 : 6}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Purity
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {product.purity && product.purity !== '0' ? product.purity : '—'}
                </Typography>
              </Grid>
              {hasWeight ? (
                <Grid size={4}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Weight
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatWeight(product.weight)}
                  </Typography>
                </Grid>
              ) : null}
            </Grid>

            <Chip
              label={inStock ? 'In Stock' : 'Out of Stock'}
              size="small"
              color={inStock ? 'success' : 'default'}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: '10px', overflow: 'hidden' }}>
                <MotionIconButton
                  size="small"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                >
                  <RemoveRoundedIcon fontSize="small" />
                </MotionIconButton>
                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                <MotionIconButton
                  size="small"
                  onClick={() => setQuantity((q) => q + 1)}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                >
                  <AddRoundedIcon fontSize="small" />
                </MotionIconButton>
              </Box>
              <MotionIconButton
                onClick={handleWishlistToggle}
                disableRipple
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
                aria-label="Toggle wishlist"
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isWishlisted ? (
                    <motion.span
                      key="filled"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex' }}
                    >
                      <FavoriteRoundedIcon sx={{ color: 'primary.main' }} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="outline"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex' }}
                    >
                      <FavoriteBorderRoundedIcon />
                    </motion.span>
                  )}
                </AnimatePresence>
              </MotionIconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <MotionButton
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                disabled={addToCart.isPending}
                onClick={handleAddToCart}
                sx={{ py: 1.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                Add to Bag
              </MotionButton>
              <MotionButton
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={!inStock || addToCart.isPending}
                onClick={handleBuyNow}
                sx={{ py: 1.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {inStock ? 'Buy Now' : 'Out of Stock'}
              </MotionButton>
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
            <Box
              sx={{
                bgcolor: '#bbe0da',
                border: '1px solid #ecdfc8',
                borderRadius: '16px',
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography sx={{ color: 'text.secondary', maxWidth: 720, lineHeight: 1.8 }}>
                {product.description ||
                  `Handcrafted with care, this ${product.metalType} ${product.productType} showcases the artistry Abhushan Vatika is known for — a timeless addition to your jewellery collection.`}
              </Typography>
            </Box>
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
