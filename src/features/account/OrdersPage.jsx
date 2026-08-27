import { Box, Typography, Chip, Stack, Divider } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useOrders } from '../../hooks/useOrders'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import { OrdersListSkeleton } from '../../components/common/PageSkeleton'
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

export default function OrdersPage() {
  const { data, isLoading, isError, refetch } = useOrders()
  const orders = data?.orders ?? []

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
          My Orders
        </Typography>
        <OrdersListSkeleton />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box>
        <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
          My Orders
        </Typography>
        <ErrorState title="Could not load your orders" onRetry={refetch} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <EmptyState
          icon={<ReceiptLongOutlinedIcon fontSize="inherit" />}
          title="No orders yet"
          description="Once you place an order, it will show up here."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => {
            const id = getOrderId(order)
            const items = getOrderItems(order)
            const previewImage = items[0]?.product?.images?.[0] ?? items[0]?.images?.[0]
            const status = getOrderStatus(order)
            return (
              <Box
                key={id}
                component={RouterLink}
                to={`/account/orders/${id}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <Box
                  component="img"
                  src={previewImage ?? '/placeholder-product.svg'}
                  alt=""
                  onError={handleImageError}
                  sx={{ width: 64, height: 64, objectFit: 'cover', bgcolor: '#f1ebe0', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {order.orderNumber ?? `Order #${String(id).slice(-8).toUpperCase()}`}
                    </Typography>
                    <Chip
                      label={status}
                      size="small"
                      color={ORDER_STATUS_COLORS[status] ?? 'default'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {getOrderDate(order)} · {items.length} {items.length === 1 ? 'item' : 'items'}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {formatPrice(getOrderTotal(order))}
                </Typography>
                <ChevronRightRoundedIcon sx={{ color: 'text.secondary' }} />
              </Box>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}
