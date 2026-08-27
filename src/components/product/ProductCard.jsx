import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PriceTag from '../common/PriceTag'
import RatingStars from '../common/RatingStars'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { useAddToWishlist, useRemoveFromWishlist, useIsWishlisted } from '../../hooks/useWishlist'
import { useAddToCart } from '../../hooks/useCart'
import { handleImageError } from '../../utils/handleImageError'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const requireAuth = useRequireAuth()
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const addToCart = useAddToCart()
  const isWishlisted = useIsWishlisted(product._id)

  const inStock = (product.stock ?? 0) > 0

  const images = product.images?.length ? product.images : ['/placeholder-product.svg']
  const primaryImage = images[0]

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    requireAuth(() => {
      if (isWishlisted) {
        removeFromWishlist.mutate(product._id)
      } else {
        addToWishlist.mutate(product._id)
      }
    })
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return
    requireAuth(() => {
      addToCart.mutate({ productId: product._id, quantity: 1 })
    })
  }

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product._id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '250px',
            flexShrink: 0,
            overflow: 'hidden',
            borderRadius: '14px',
            bgcolor: '#f1ebe0',
          }}
        >
          {/* A single, always-the-same image — only a hover zoom transform,
              never a src/image swap, so the product photo shown never
              changes on hover. */}
          <Box
            component="img"
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />

          {inStock && product.isNewArrival ? (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: '#0E5A55',
                color: '#f5f1e8',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                px: 1,
                py: 0.5,
                borderRadius: '6px',
              }}
            >
              NEW
            </Box>
          ) : null}

          <IconButton
            onClick={handleWishlistToggle}
            aria-label="Toggle wishlist"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255,255,255,0.85)',
              '&:hover': { bgcolor: '#fff' },
            }}
          >
            {isWishlisted ? (
              <FavoriteRoundedIcon fontSize="small" sx={{ color: '#14807A' }} />
            ) : (
              <FavoriteBorderRoundedIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Box sx={{ pt: 1.5, flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, mb: 0.5 }}
            noWrap
          >
            {product.name}
          </Typography>
          <RatingStars value={product.averageRating} count={product.reviewCount} />
          <PriceTag price={product.basePrice} sx={{ mt: 0.5 }} />
        </Box>

        {inStock ? (
          <IconButton
            onClick={handleAddToCart}
            aria-label="Add to cart"
            size="small"
            sx={{
              mt: 1.25,
              width: '100%',
              borderRadius: '999px',
              backgroundColor: '#0B524F',
              color: '#f5f1e8',
              '&:hover': {
                backgroundColor: '#083f3d',
                color: '#f5f1e8',
              },
            }}
          >
            <ShoppingBagOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="caption" sx={{ letterSpacing: '0.1em' }}>
              ADD TO BAG
            </Typography>
          </IconButton>
        ) : (
          <Box
            sx={{
              mt: 1.25,
              width: '100%',
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '999px',
              bgcolor: '#e8e8e8',
              color: 'text.secondary',
              py: 0.9,
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
            }}
          >
            OUT OF STOCK
          </Box>
        )}
      </Box>
    </Box>
  )
}
