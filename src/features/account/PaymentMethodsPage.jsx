import { Box, Typography } from '@mui/material'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import EmptyState from '../../components/common/EmptyState'

// There is no saved-payment-methods API on the backend (payments are
// created fresh per order via Razorpay at checkout) — this intentionally
// shows an honest empty state rather than fabricated card data.
export default function PaymentMethodsPage() {
  return (
    <Box>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        Payment Methods
      </Typography>
      <EmptyState
        icon={<CreditCardOutlinedIcon fontSize="inherit" />}
        title="No saved payment methods"
        description="You'll choose Cash on Delivery or pay online via Razorpay (Card, UPI, Netbanking) fresh at checkout — nothing is stored here."
        actionLabel="Continue Shopping"
        actionTo="/shop"
      />
    </Box>
  )
}
