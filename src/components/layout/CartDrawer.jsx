import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Link as RouterLink } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore'
import { useCart, normalizeCartItems, useUpdateCartItem, useRemoveCartItem } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatCurrency'
import EmptyState from '../common/EmptyState'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { handleImageError } from '../../utils/handleImageError'

export default function CartDrawer() {
  const open = useUIStore((s) => s.cartDrawerOpen)
  const close = useUIStore((s) => s.closeCartDrawer)
  const { data: cart, isLoading } = useCart()
  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()

  const items = normalizeCartItems(cart)
  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.basePrice ?? 0
    return sum + price * item.quantity
  }, 0)

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={close}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 } } } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem' }}>
            Your Bag {items.length ? `(${items.length})` : ''}
          </Typography>
          <IconButton onClick={close} aria-label="Close cart">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
          {!isLoading && items.length === 0 ? (
            <EmptyState
              icon={<ShoppingBagOutlinedIcon fontSize="inherit" />}
              title="Your bag is empty"
              description="Explore our collections and add pieces you love."
              actionLabel="Continue Shopping"
              actionTo="/shop"
              onAction={close}
            />
          ) : (
            <Stack divider={<Divider />} sx={{ py: 1 }}>
              {items.map((item) => (
                <Box key={item.productId} sx={{ display: 'flex', gap: 2, py: 2 }}>
                  <Box
                    component="img"
                    src={item.product?.images?.[0] ?? '/placeholder-product.svg'}
                    alt={item.product?.name}
                    onError={handleImageError}
                    sx={{ width: 80, height: 80, objectFit: 'cover', bgcolor: '#f1ebe0', flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }} noWrap>
                      {item.product?.name ?? 'Product'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {item.product?.metalType}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                        <IconButton
                          size="small"
                          disabled={item.quantity <= 1 || updateItem.isPending}
                          onClick={() =>
                            updateItem.mutate({ productId: item.productId, quantity: item.quantity - 1 })
                          }
                        >
                          <RemoveRoundedIcon fontSize="inherit" />
                        </IconButton>
                        <Typography variant="body2" sx={{ px: 1.25 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          disabled={updateItem.isPending}
                          onClick={() =>
                            updateItem.mutate({ productId: item.productId, quantity: item.quantity + 1 })
                          }
                        >
                          <AddRoundedIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatPrice((item.product?.basePrice ?? 0) * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    aria-label="Remove item"
                    onClick={() => removeItem.mutate(item.productId)}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {items.length > 0 ? (
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatPrice(subtotal)}
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              <Button
                component={RouterLink}
                to="/cart"
                onClick={close}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                View Bag
              </Button>
              <Button
                component={RouterLink}
                to="/checkout"
                onClick={close}
                variant="contained"
                color="primary"
                fullWidth
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Drawer>
  )
}
