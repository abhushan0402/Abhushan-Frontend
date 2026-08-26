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

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const requireAuth = useRequireAuth()
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const addToCart = useAddToCart()
  const isWishlisted = useIsWishlisted(product._id)

  const images = product.images?.length ? product.images : ['/placeholder-product.svg']
  const secondaryImage = images[1] ?? images[0]

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
          <Box
            component="img"
            src={hovered ? secondaryImage : images[0]}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.svg'
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
          />

          {product.isNewArrival ? (
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
          <PriceTag price={product.basePrice} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
    </Box>
  )
}
