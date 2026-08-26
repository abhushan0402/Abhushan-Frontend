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
  const secondaryImage = images.length > 1 ? images[1] : null

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
      sx={{ position: 'relative' }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product._id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            bgcolor: '#f1ebe0',
          }}
        >
          {/* Both images are always mounted (not swapped via a single src) so
              the secondary image is already loaded by the time hover starts —
              a src-swap on one <img> caused a network-fetch flash / "wrong
              image for a moment" flicker on first hover. This crossfades two
              stacked, pre-loaded images via opacity instead. */}
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
              opacity: hovered && secondaryImage ? 0 : 1,
              transition: 'opacity 0.35s ease',
            }}
          />
          {secondaryImage ? (
            <Box
              component="img"
              src={secondaryImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={handleImageError}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}
            />
          ) : null}

          {!inStock ? (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'rgba(245,241,232,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  bgcolor: '#121212',
                  color: '#f5f1e8',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  px: 1.5,
                  py: 0.75,
                }}
              >
                OUT OF STOCK
              </Box>
            </Box>
          ) : product.isNewArrival ? (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: '#121212',
                color: '#1f8075',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                px: 1,
                py: 0.5,
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
              <FavoriteRoundedIcon fontSize="small" sx={{ color: '#1f8075' }} />
            ) : (
              <FavoriteBorderRoundedIcon fontSize="small" />
            )}
          </IconButton>

          {inStock ? (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                p: 1,
                opacity: { xs: 1, md: hovered ? 1 : 0 },
                transform: { xs: 'none', md: hovered ? 'translateY(0)' : 'translateY(8px)' },
                transition: 'all 0.25s ease',
              }}
            >
              <IconButton
                onClick={handleAddToCart}
                aria-label="Add to cart"
                size="small"
                sx={{
                  width: '100%',
                  borderRadius: 0,
                  background: 'linear-gradient(135deg, #121212 0%, #383838 100%)',
                  color: '#f5f1e8',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1f8075 0%, #196a61 100%)',
                    color: '#f5f1e8',
                  },
                }}
              >
                <ShoppingBagOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="caption" sx={{ letterSpacing: '0.1em' }}>
                  ADD TO BAG
                </Typography>
              </IconButton>
            </Box>
          ) : null}
        </Box>

        <Box sx={{ pt: 1.5 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, mb: 0.5 }}
            noWrap
          >
            {product.name}
          </Typography>
          <RatingStars value={product.averageRating} count={product.reviewCount} />
          {inStock ? (
            <PriceTag price={product.basePrice} sx={{ mt: 0.5 }} />
          ) : (
            <Typography
              variant="body2"
              sx={{ mt: 0.5, fontWeight: 600, color: 'text.secondary' }}
            >
              Out of Stock
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
