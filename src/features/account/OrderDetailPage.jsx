import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Chip, Skeleton, Stack, Divider, Grid2 as Grid, Button } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { useOrder } from '../../hooks/useOrders'
import ErrorState from '../../components/common/ErrorState'
import { formatPrice } from '../../utils/formatCurrency'
import { handleImageError } from '../../utils/handleImageError'
import {
  getOrderId,
  getOrderItems,
  getOrderTotal,
  getOrderStatus,
  getOrderDate,
  ORDER_STATUS_COLORS,
} from '../../utils/orderHelpers'

export default function OrderDetailPage() {
  const { orderId: id } = useParams()
  const { data: order, isLoading, isError, refetch } = useOrder(id)

  if (isLoading) {
    return (
      <Box className="av-container" sx={{ py: 6 }}>
        <Skeleton variant="text" width={220} sx={{ fontSize: '2rem', mb: 3 }} />
        <Skeleton variant="rectangular" height={200} />
      </Box>
    )
  }

  if (isError || !order) {
    return (
      <Box className="av-container" sx={{ py: 6 }}>
        <ErrorState title="Could not load this order" onRetry={refetch} />
      </Box>
    )
  }

  const items = getOrderItems(order)
  const status = getOrderStatus(order)
  const address = order.deliveryAddress ?? order.address ?? null

  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <Button
        component={RouterLink}
        to="/account/orders"
        startIcon={<ChevronLeftRoundedIcon />}
        color="secondary"
        sx={{ mb: 2 }}
      >
        Back to Orders
      </Button>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          {order.orderNumber ?? `Order #${String(getOrderId(order)).slice(-8).toUpperCase()}`}
        </Typography>
        <Chip
          label={status}
          color={ORDER_STATUS_COLORS[status] ?? 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      </Stack>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>Placed on {getOrderDate(order)}</Typography>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1rem', mb: 2 }}>
            Items
          </Typography>
          <Stack divider={<Divider />} spacing={0}>
            {items.map((item, i) => {
              const product = item.product ?? item
              return (
                <Box key={product._id ?? i} sx={{ display: 'flex', gap: 2, py: 2 }}>
                  <Box
                    component="img"
                    src={product.images?.[0] ?? '/placeholder-product.svg'}
                    alt={product.name}
                    onError={handleImageError}
                    sx={{ width: 72, height: 72, objectFit: 'cover', bgcolor: '#f1ebe0' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {product.name ?? 'Product'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Qty: {item.quantity ?? 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {formatPrice((product.basePrice ?? item.price ?? 0) * (item.quantity ?? 1))}
                  </Typography>
                </Box>
              )
            })}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {address ? (
            <Box sx={{ bgcolor: '#faf7f1', p: 3, mb: 2.5 }}>
              <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem', mb: 1.5 }}>
                DELIVERY ADDRESS
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {address.fullName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {address.addressLine1}
                {address.addressLine2 ? `, ${address.addressLine2}` : ''}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {address.city}, {address.state} - {address.pincode}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {address.mobile}
              </Typography>
            </Box>
          ) : null}

          <Box sx={{ bgcolor: '#faf7f1', p: 3 }}>
            <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem', mb: 1.5 }}>
              ORDER TOTAL
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>{formatPrice(getOrderTotal(order))}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
