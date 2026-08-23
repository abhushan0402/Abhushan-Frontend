import { Box, Typography, IconButton, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PriceTag from '../../components/common/PriceTag'
import { handleImageError } from '../../utils/handleImageError'
import { useAddToCart } from '../../hooks/useCart'
import { useRemoveFromWishlist } from '../../hooks/useWishlist'

export default function WishlistItemCard({ productId, product }) {
  const addToCart = useAddToCart()
  const removeFromWishlist = useRemoveFromWishlist()

  const outOfStock = (product?.stock ?? 0) <= 0

  const handleMoveToBag = () => {
    addToCart.mutate(
      { productId, quantity: 1 },
      { onSuccess: () => removeFromWishlist.mutate(productId) }
    )
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={() => removeFromWishlist.mutate(productId)}
        disabled={removeFromWishlist.isPending}
        aria-label="Remove from wishlist"
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'rgba(255,255,255,0.9)',
          '&:hover': { bgcolor: '#fff' },
        }}
      >
        <DeleteOutlineRoundedIcon fontSize="small" />
      </IconButton>

      <Box
        component={RouterLink}
        to={`/product/${productId}`}
        sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <Box sx={{ aspectRatio: '1 / 1', overflow: 'hidden', bgcolor: '#f1ebe0' }}>
          <Box
            component="img"
            src={product?.images?.[0] ?? '/placeholder-product.svg'}
            alt={product?.name ?? 'Product'}
            loading="lazy"
            onError={handleImageError}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mt: 1.5 }} noWrap>
          {product?.name ?? 'Product'}
        </Typography>
        <PriceTag price={product?.basePrice} sx={{ mt: 0.5 }} />
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        size="small"
        startIcon={<ShoppingBagOutlinedIcon fontSize="small" />}
        disabled={outOfStock || addToCart.isPending}
        onClick={handleMoveToBag}
        sx={{ mt: 1.5 }}
      >
        {outOfStock ? 'Out of Stock' : 'Move to Bag'}
      </Button>
    </Box>
  )
}
