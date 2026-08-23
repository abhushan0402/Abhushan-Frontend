// The Abhushan Vatika API does not yet expose order/checkout/payment
// endpoints (confirmed against the live Swagger spec). This module is the
// single integration point for that flow: once a real `/api/orders`
// endpoint exists, replace the body of `placeOrder` with the actual
// `axiosClient.post('/api/orders', payload)` call — every screen that
// needs to place an order already calls through this one function.

function simulateNetworkDelay(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const placeOrder = async ({ addressId, items, paymentMethod, totals }) => {
  await simulateNetworkDelay()

  return {
    success: true,
    message: 'Order placed successfully',
    data: {
      orderId: `AV-${Date.now().toString(36).toUpperCase()}`,
      status: 'pending',
      addressId,
      items,
      paymentMethod,
      totals,
      placedAt: new Date().toISOString(),
      __stub: true,
    },
  }
}
