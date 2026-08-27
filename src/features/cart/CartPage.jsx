import {
  Box,
  Typography,
  Grid2 as Grid,
  IconButton,
  Divider,
  Button,
  Stack,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useIsAuthenticated } from '../../hooks/useAuth'
import {
  useCart,
  normalizeCartItems,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatCurrency'
import EmptyState from '../../components/common/EmptyState'
import PriceTag from '../../components/common/PriceTag'
import { handleImageError } from '../../utils/handleImageError'
import { CartPageSkeleton } from '../../components/common/PageSkeleton'

export default function CartPage() {
  const isAuthenticated = useIsAuthenticated()
  const { data: cart, isLoading } = useCart()
  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()
  const clearCart = useClearCart()

  if (!isAuthenticated) {
    return (
      <Box className="av-container" sx={{ py: { xs: 6, md: 10 } }}>
        <EmptyState
          icon={<LockOutlinedIcon fontSize="inherit" />}
          title="Sign in to view your bag"
          description="Your bag is saved to your account so it's ready whenever you are."
          actionLabel="Sign In"
          actionTo="/signin?redirect=/cart"
        />
      </Box>
    )
  }

  const items = normalizeCartItems(cart)
  const subtotal = items.reduce((sum, item) => sum + (item.product?.basePrice ?? 0) * item.quantity, 0)

  if (isLoading) {
    return <CartPageSkeleton />
  }

  if (items.length === 0) {
    return (
      <Box className="av-container" sx={{ py: { xs: 6, md: 10 } }}>
        <EmptyState
          icon={<ShoppingBagOutlinedIcon fontSize="inherit" />}
          title="Your bag is empty"
          description="Discover pieces crafted to become part of your story."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </Box>
    )
  }

  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
          Your Bag
        </Typography>
        <Button
          size="small"
          color="secondary"
          disabled={clearCart.isPending}
          onClick={() => clearCart.mutate()}
        >
          Clear Bag
        </Button>
      </Box>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack divider={<Divider />} spacing={0}>
            {items.map((item) => (
              <Box key={item.productId} sx={{ display: 'flex', gap: 2.5, py: 3 }}>
                <Box
                  component={RouterLink}
                  to={`/product/${item.productId}`}
                  sx={{ flexShrink: 0 }}
                >
                  <Box
                    component="img"
                    src={item.product?.images?.[0] ?? '/placeholder-product.svg'}
                    alt={item.product?.name}
                    onError={handleImageError}
                    sx={{ width: 120, height: 120, objectFit: 'cover', bgcolor: '#f1ebe0' }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    component={RouterLink}
                    to={`/product/${item.productId}`}
                    variant="body1"
                    sx={{ fontWeight: 500, textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.product?.name ?? 'Product'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'capitalize', mt: 0.5 }}>
                    {item.product?.metalType} {item.product?.productType ? `· ${item.product.productType}` : ''}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                      <IconButton
                        size="small"
                        disabled={item.quantity <= 1 || updateItem.isPending}
                        onClick={() => updateItem.mutate({ productId: item.productId, quantity: item.quantity - 1 })}
                      >
                        <RemoveRoundedIcon fontSize="inherit" />
                      </IconButton>
                      <Typography sx={{ px: 1.5 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        disabled={updateItem.isPending}
                        onClick={() => updateItem.mutate({ productId: item.productId, quantity: item.quantity + 1 })}
                      >
                        <AddRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                    <PriceTag price={(item.product?.basePrice ?? 0) * item.quantity} />
                  </Box>
                </Box>
                <IconButton
                  aria-label="Remove item"
                  onClick={() => removeItem.mutate(item.productId)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ bgcolor: '#faf7f1', p: 3.5, position: 'sticky', top: 100 }}>
            <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 2.5 }}>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})
              </Typography>
              <Typography variant="body2">{formatPrice(subtotal)}</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Shipping and taxes calculated at checkout.
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>{formatPrice(subtotal)}</Typography>
            </Box>
            <Button component={RouterLink} to="/checkout" variant="contained" color="primary" fullWidth size="large">
              Proceed to Checkout
            </Button>
            <Button component={RouterLink} to="/shop" fullWidth sx={{ mt: 1.5 }}>
              Continue Shopping
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
