// Order response shape isn't strictly documented (additionalProperties:
// true) — these accessors try the plausible field-name variants rather
// than assuming one, the way the wishlist shape had to be discovered.
export function getOrderId(order) {
  return order?._id ?? order?.orderId ?? order?.id ?? null
}

export function getOrderItems(order) {
  return order?.items ?? order?.products ?? order?.orderItems ?? []
}

// Mirrors the same populated-object-vs-bare-id ambiguity normalizeCartItems
// already works around for cart items (orders are created from the cart, so
// order items carry the product under the same `productId` field).
export function getItemProduct(item) {
  if (typeof item?.productId === 'object' && item.productId !== null) {
    return item.productId
  }
  return item?.product ?? {}
}

export function getOrderTotal(order) {
  return order?.totalAmount ?? order?.total ?? order?.amount ?? 0
}

export function getOrderStatus(order) {
  return order?.status ?? order?.orderStatus ?? 'pending'
}

export function getOrderDate(order) {
  const raw = order?.createdAt ?? order?.placedAt
  if (!raw) return ''
  return new Date(raw).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const ORDER_STATUS_COLORS = {
  pending: 'default',
  confirmed: 'primary',
  processing: 'primary',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
  failed: 'error',
}
