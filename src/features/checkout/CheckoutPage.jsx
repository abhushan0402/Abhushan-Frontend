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
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useAddresses, useAddAddress } from '../../hooks/useAddresses'
import { useCart, normalizeCartItems, useClearCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatCurrency'
import AddressFormDialog from '../account/AddressFormDialog'
import { placeOrder } from '../../api/endpoints/orders'
import { useNotify } from '../../components/common/NotificationContext'
import EmptyState from '../../components/common/EmptyState'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { handleImageError } from '../../utils/handleImageError'

const STEPS = ['Delivery Address', 'Review Order', 'Payment']

export default function CheckoutPage() {
  const notify = useNotify()
  const { data: addresses = [] } = useAddresses()
  const { data: cart, isLoading: cartLoading } = useCart()
  const clearCart = useClearCart()
  const addAddress = useAddAddress()

  const [activeStep, setActiveStep] = useState(0)
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?._id ?? addresses[0]?._id ?? ''
  )
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const items = normalizeCartItems(cart)
  const subtotal = items.reduce((sum, item) => sum + (item.product?.basePrice ?? 0) * item.quantity, 0)
  const selectedAddress = addresses.find((a) => a._id === selectedAddressId)

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
    return (
      <Box className="av-container" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Order Placed!
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          Order ID: {placedOrder.data.orderId}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 480, mx: 'auto' }}>
          Thank you for shopping with Abhushan Vatika. We'll send updates on your order to your
          registered email and mobile number.
        </Typography>
        <Button component={RouterLink} to="/shop" variant="contained" color="primary">
          Continue Shopping
        </Button>
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

  const handlePlaceOrder = async () => {
    setPlacingOrder(true)
    try {
      const res = await placeOrder({
        addressId: selectedAddressId,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        paymentMethod,
        totals: { subtotal, total: subtotal },
      })
      setPlacedOrder(res)
      clearCart.mutate()
      notify.success('Order placed successfully!')
    } catch {
      notify.error('Could not place your order. Please try again.')
    } finally {
      setPlacingOrder(false)
    }
  }

  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
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
                                <Chip label="Default" size="small" sx={{ borderRadius: 0 }} />
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
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                  sx={{ border: '1px solid', borderColor: 'primary.main', p: 1.5, mb: 1.5, ml: 0 }}
                />
                <FormControlLabel
                  value="card"
                  disabled
                  control={<Radio />}
                  label="Credit / Debit Card — Coming Soon"
                  sx={{ border: '1px solid', borderColor: 'divider', p: 1.5, mb: 1.5, ml: 0 }}
                />
                <FormControlLabel
                  value="upi"
                  disabled
                  control={<Radio />}
                  label="UPI — Coming Soon"
                  sx={{ border: '1px solid', borderColor: 'divider', p: 1.5, ml: 0 }}
                />
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
                  {placingOrder ? 'Placing Order...' : 'Place Order'}
                </Button>
              </Box>
            </Box>
          ) : null}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ bgcolor: '#faf7f1', p: 3.5, position: 'sticky', top: 100 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Subtotal
              </Typography>
              <Typography variant="body2">{formatPrice(subtotal)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>{formatPrice(subtotal)}</Typography>
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
