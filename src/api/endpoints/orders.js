import axiosClient from '../axiosClient'

// Creates an order from the current cart. The API wants the delivery
// address inlined (a snapshot, not a saved-address reference) so the order
// keeps its original address even if the user later edits/deletes it from
// their address book. Requires a unique Idempotency-Key per attempt so a
// retried request (flaky network, double-click) can't create a duplicate
// order — generate a fresh one per checkout attempt and reuse it across
// retries of that same attempt.
export const createOrder = ({ deliveryAddress, note, idempotencyKey }) =>
  axiosClient
    .post(
      '/api/orders/',
      { deliveryAddress, ...(note ? { note } : {}) },
      { headers: { 'Idempotency-Key': idempotencyKey } }
    )
    .then((res) => res.data)

export const getOrders = (params = {}) =>
  axiosClient.get('/api/orders/', { params }).then((res) => res.data)

export const getOrderById = (id) =>
  axiosClient.get(`/api/orders/${id}`).then((res) => res.data)
