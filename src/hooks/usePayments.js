import { useMutation } from '@tanstack/react-query'
import * as paymentsApi from '../api/endpoints/payments'

export const useCreateRazorpayOrder = () =>
  useMutation({ mutationFn: paymentsApi.createRazorpayOrder })

export const useVerifyPayment = () =>
  useMutation({ mutationFn: paymentsApi.verifyPayment })
