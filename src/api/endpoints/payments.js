import axiosClient from '../axiosClient'

export const createRazorpayOrder = (orderId) =>
  axiosClient.post('/api/payments/create-order', { orderId }).then((res) => res.data)

// razorpayOrderId/razorpayPaymentId/razorpaySignature come straight off the
// object Razorpay Checkout's success handler hands back (its own field
// names are snake_case: razorpay_order_id etc. — map them at the call site).
export const verifyPayment = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
  axiosClient
    .post('/api/payments/verify', { razorpayOrderId, razorpayPaymentId, razorpaySignature })
    .then((res) => res.data)
