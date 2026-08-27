import { useState } from 'react'
import {
  Box,
  Grid2 as Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Stack,
  Chip,
  Alert,
  IconButton,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import { useAddresses, useAddAddress } from '../../hooks/useAddresses'
import { useCart, normalizeCartItems, useClearCart } from '../../hooks/useCart'
import { useCreateOrder } from '../../hooks/useOrders'
import { useCreateRazorpayOrder, useVerifyPayment } from '../../hooks/usePayments'
import { formatPrice } from '../../utils/formatCurrency'
import { loadRazorpayScript } from '../../utils/loadRazorpay'
import AddressFormDialog from '../account/AddressFormDialog'
import { useNotify } from '../../components/common/NotificationContext'
import EmptyState from '../../components/common/EmptyState'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { handleImageError } from '../../utils/handleImageError'

const STEPS = ['Delivery Address', 'Review Order', 'Payment']

function extractOrderId(order) {
  return order?._id ?? order?.orderId ?? order?.order?._id ?? order?.id ?? null
}

// No brand asset exists for PhonePe (and pulling a random external logo URL
// isn't safe/reliable) — a small text badge in its real brand colour reads
// clearly as "PhonePe supported" without depending on an external image.
function PaymentBadge({ label, bg, color = '#fff' }) {
  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.5,
        bgcolor: bg,
        color,
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        borderRadius: '6px',
      }}
    >
      {label}
    </Box>
  )
}

function PaymentMethodIcons() {
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ rowGap: 1, mt: 1.5 }}>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
        <CreditCardRoundedIcon fontSize="small" />
        <Typography variant="caption">Cards</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
        <QrCode2RoundedIcon fontSize="small" />
        <Typography variant="caption">UPI</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
        <AccountBalanceRoundedIcon fontSize="small" />
        <Typography variant="caption">Netbanking</Typography>
      </Stack>
      <PaymentBadge label="PhonePe" bg="#5f259f" />
      <PaymentBadge label="Razorpay" bg="#0b2540" />
    </Stack>
  )
}

export default function CheckoutPage() {
  const notify = useNotify()
  const { data: addresses = [] } = useAddresses()
  const { data: cart, isLoading: cartLoading } = useCart()
  const clearCart = useClearCart()
  const addAddress = useAddAddress()
  const createOrder = useCreateOrder()
  const createRazorpayOrder = useCreateRazorpayOrder()
  const verifyPayment = useVerifyPayment()

  const [activeStep, setActiveStep] = useState(0)
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?._id ?? addresses[0]?._id ?? ''
  )
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)
  const [createdOrder, setCreatedOrder] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const [idempotencyKey] = useState(() => crypto.randomUUID())

  const items = normalizeCartItems(cart)
  const subtotal = items.reduce((sum, item) => sum + (item.product?.basePrice ?? 0) * item.quantity, 0)
  const selectedAddress = addresses.find((a) => a._id === selectedAddressId)
  // The API has no shipping/discount fields — "Free" reflects the site's own
  // stated shipping policy (see TRUST_BADGES) rather than an invented number,
  // and there's no discount line at all since no coupon/discount system exists.
  const total = subtotal

  if (!cartLoading && items.length === 0 && !placedOrder) {
    return (
      <Box className="av-container" sx={{ py: { xs: 6, md: 10 } }}>
        <EmptyState
          icon={<ShoppingBagOutlinedIcon fontSize="inherit" />}
          title="Your bag is empty"
          description="Add pieces to your bag before checking out."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </Box>
    )
  }

  if (placedOrder) {
    const orderId = extractOrderId(placedOrder)
    return (
      <Box className="av-container" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Order Placed!
        </Typography>
        {orderId ? (
          <Typography sx={{ color: 'text.secondary', mb: 1 }}>
            Order ID: {placedOrder.orderNumber ?? orderId}
          </Typography>
        ) : null}
        <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 480, mx: 'auto' }}>
          Thank you for shopping with Abhushan Vatika. We'll send updates on your order to your
          registered email and mobile number.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          {orderId ? (
            <Button component={RouterLink} to={`/account/orders/${orderId}`} variant="outlined" color="secondary">
              View Order
            </Button>
          ) : null}
          <Button component={RouterLink} to="/shop" variant="contained" color="primary">
            Continue Shopping
          </Button>
        </Stack>
      </Box>
    )
  }

  const handleAddAddress = (values) => {
    addAddress.mutateAsync(values).then((res) => {
      setAddressDialogOpen(false)
      const newId = res?.data?._id ?? res?.data?.[res.data.length - 1]?._id
      if (newId) setSelectedAddressId(newId)
    })
  }

  // The order is only ever created once per checkout attempt (same
  // idempotency key) — retrying payment after a failed/dismissed Razorpay
  // popup reuses the already-created order instead of creating a duplicate.
  const ensureOrderCreated = async () => {
    if (createdOrder) return createdOrder
    const deliveryAddress = {
      fullName: selectedAddress.fullName,
      mobile: selectedAddress.mobile,
      addressLine1: selectedAddress.addressLine1,
      ...(selectedAddress.addressLine2 ? { addressLine2: selectedAddress.addressLine2 } : {}),
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    }
    const res = await createOrder.mutateAsync({ deliveryAddress, idempotencyKey })
    const order = res?.data ?? null
    setCreatedOrder(order)
    return order
  }

  const handlePlaceOrder = async () => {
    setPaymentError(null)
    setPlacingOrder(true)
    try {
      const order = await ensureOrderCreated()
      const orderId = extractOrderId(order)
      if (!orderId) {
        setPaymentError('Could not place your order. Please try again.')
        return
      }

      if (paymentMethod === 'cod') {
        clearCart.mutate()
        setPlacedOrder(order)
        notify.success('Order placed successfully!')
        return
      }

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        setPaymentError(
          'Could not load the payment gateway. Please check your connection and try again, or choose Cash on Delivery.'
        )
        return
      }

      const rpRes = await createRazorpayOrder.mutateAsync(orderId)
      const rpData = rpRes?.data ?? {}
      const razorpayOrderId = rpData.razorpayOrderId ?? rpData.orderId ?? rpData.id
      const amount = rpData.amount
      const currency = rpData.currency ?? 'INR'
      const keyId =
        rpData.key ?? rpData.keyId ?? rpData.razorpayKeyId ?? import.meta.env.VITE_RAZORPAY_KEY_ID

      if (!razorpayOrderId || !keyId) {
        setPaymentError('Payment could not be initiated. Please try again or choose Cash on Delivery.')
        return
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: 'Abhushan Vatika',
        description: 'Order Payment',
        prefill: {
          name: selectedAddress?.fullName,
          contact: selectedAddress?.mobile,
        },
        theme: { color: '#14807A' },
        handler: (response) => {
          verifyPayment.mutate(
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
            {
              onSuccess: () => {
                clearCart.mutate()
                setPlacedOrder(order)
                notify.success('Payment successful! Order placed.')
              },
              onError: (error) => {
                setPaymentError(error?.message || 'Payment verification failed. Please contact support.')
              },
            }
          )
        },
        modal: {
          ondismiss: () => {
            setPaymentError('Payment was not completed. You can try again below.')
          },
        },
      })
      razorpay.open()
    } catch (error) {
      setPaymentError(error?.message || 'Could not place your order. Please try again.')
    } finally {
      setPlacingOrder(false)
    }
  }

  const handleTopBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1)
  }

  return (
    <Box className="av-container" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <IconButton
          component={activeStep === 0 ? RouterLink : 'button'}
          to={activeStep === 0 ? '/cart' : undefined}
          onClick={activeStep === 0 ? undefined : handleTopBack}
          aria-label="Back"
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {activeStep === 0 ? 'Back to Bag' : `Back to ${STEPS[activeStep - 1]}`}
        </Typography>
      </Box>

      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 4 }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 8 }}>
          {activeStep === 0 ? (
            <Box>
              {addresses.length === 0 ? (
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  You don't have any saved addresses yet.
                </Typography>
              ) : (
                <RadioGroup
                  value={selectedAddressId}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                >
                  {addresses.map((addr) => (
                    <Box
                      key={addr._id}
                      sx={{
                        border: '1px solid',
                        borderColor: selectedAddressId === addr._id ? 'primary.main' : 'divider',
                        p: 2,
                        mb: 1.5,
                      }}
                    >
                      <FormControlLabel
                        value={addr._id}
                        control={<Radio size="small" />}
                        sx={{ alignItems: 'flex-start', width: '100%' }}
                        label={
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography sx={{ fontWeight: 600 }}>{addr.label}</Typography>
                              {addr.isDefault ? (
                                <Chip label="Default" size="small" />
                              ) : null}
                            </Stack>
                            <Typography variant="body2">{addr.fullName}, {addr.mobile}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>
                  ))}
                </RadioGroup>
              )}
              <Button
                startIcon={<AddRoundedIcon />}
                variant="outlined"
                color="secondary"
                onClick={() => setAddressDialogOpen(true)}
                sx={{ mt: 1 }}
              >
                Add New Address
              </Button>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={!selectedAddressId}
                onClick={() => setActiveStep(1)}
                sx={{ mt: 4 }}
              >
                Continue to Review
              </Button>
            </Box>
          ) : null}

          {activeStep === 1 ? (
            <Box>
              <Stack divider={<Divider />} spacing={0}>
                {items.map((item) => (
                  <Box key={item.productId} sx={{ display: 'flex', gap: 2, py: 2 }}>
                    <Box
                      component="img"
                      src={item.product?.images?.[0] ?? '/placeholder-product.svg'}
                      alt={item.product?.name}
                      onError={handleImageError}
                      sx={{ width: 72, height: 72, objectFit: 'cover', bgcolor: '#f1ebe0' }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.product?.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {formatPrice((item.product?.basePrice ?? 0) * item.quantity)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button variant="outlined" color="secondary" onClick={() => setActiveStep(0)}>
                  Back
                </Button>
                <Button variant="contained" color="primary" fullWidth onClick={() => setActiveStep(2)}>
                  Continue to Payment
                </Button>
              </Box>
            </Box>
          ) : null}

          {activeStep === 2 ? (
            <Box>
              {paymentError ? (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setPaymentError(null)}>
                  {paymentError}
                </Alert>
              ) : null}
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                  sx={{
                    border: '1px solid',
                    borderColor: paymentMethod === 'cod' ? 'primary.main' : 'divider',
                    p: 1.5,
                    mb: 1.5,
                    ml: 0,
                  }}
                />
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: paymentMethod === 'online' ? 'primary.main' : 'divider',
                    p: 1.5,
                  }}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Pay Online (Razorpay)"
                    sx={{ ml: 0 }}
                  />
                  <PaymentMethodIcons />
                </Box>
              </RadioGroup>
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button variant="outlined" color="secondary" onClick={() => setActiveStep(1)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={placingOrder}
                  onClick={handlePlaceOrder}
                >
                  {placingOrder ? 'Processing...' : 'Place Order'}
                </Button>
              </Box>
            </Box>
          ) : null}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              background: 'linear-gradient(160deg, #faf7f1 0%, #f1ebe0 100%)',
              borderRadius: '16px',
              border: '1px solid',
              borderColor: 'divider',
              p: { xs: 3, md: 3.5 },
              position: 'sticky',
              top: 100,
            }}
          >
            <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 2.5 }}>
              Order Summary
            </Typography>
            {selectedAddress ? (
              <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Delivering to
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedAddress.fullName} · {selectedAddress.city}
                </Typography>
              </Box>
            ) : null}
            <Stack spacing={1.25} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total Amount ({items.length} {items.length === 1 ? 'item' : 'items'})
                </Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Shipping Charges
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                  Free
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>Payable Amount</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>{formatPrice(total)}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <AddressFormDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSubmit={handleAddAddress}
        initialValue={null}
        isSubmitting={addAddress.isPending}
      />
    </Box>
  )
}
