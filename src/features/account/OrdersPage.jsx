import { Box, Typography } from '@mui/material'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import EmptyState from '../../components/common/EmptyState'

export default function OrdersPage() {
  return (
    <Box>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        My Orders
      </Typography>
      <EmptyState
        icon={<ReceiptLongOutlinedIcon fontSize="inherit" />}
        title="Order tracking is coming soon"
        description="We're putting the finishing touches on order history. In the meantime, continue exploring our collections."
        actionLabel="Continue Shopping"
        actionTo="/shop"
      />
    </Box>
  )
}
