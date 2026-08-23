import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'
import { z } from 'zod'
import AuthLayout from './AuthLayout'
import OtpField from '../../components/common/OtpField'
import { emailSchema, otpFormSchema, resetPasswordSchema } from '../../utils/validators'
import { useSendOtp, useVerifyOtp, useResetPassword } from '../../hooks/useAuth'
import { useNotify } from '../../components/common/NotificationContext'

const emailFormSchema = z.object({ email: emailSchema })

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const notify = useNotify()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const sendOtp = useSendOtp()
  const verifyOtp = useVerifyOtp()
  const resetPassword = useResetPassword()

  const emailForm = useForm({ resolver: zodResolver(emailFormSchema), defaultValues: { email: '' } })
  const otpForm = useForm({ resolver: zodResolver(otpFormSchema), defaultValues: { otp: '' } })
  const passwordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const submitEmail = ({ email: enteredEmail }) => {
    sendOtp.mutate(
      { identifier: enteredEmail, purpose: 'forgot-password' },
      {
        onSuccess: () => {
          setEmail(enteredEmail)
          setStep(2)
          setResendTimer(30)
          notify.success('OTP sent to your email')
        },
        onError: (error) => notify.error(error?.message || 'Could not send OTP'),
      }
    )
  }

  const submitOtp = ({ otp }) => {
    verifyOtp.mutate(
      { identifier: email, otp, purpose: 'forgot-password' },
      {
        onSuccess: (res) => {
          const token = res?.data?.token
          if (!token) {
            notify.error('Verification failed. Please try again.')
            return
          }
          setResetToken(token)
          setStep(3)
        },
        onError: (error) => notify.error(error?.message || 'Invalid OTP'),
      }
    )
  }

  const submitNewPassword = ({ password }) => {
    resetPassword.mutate(
      { email, newPassword: password, resetToken },
      {
        onSuccess: () => {
          notify.success('Password reset successfully. Please sign in.')
          navigate('/signin')
        },
        onError: (error) => notify.error(error?.message || 'Could not reset password'),
      }
    )
  }

  const handleResend = () => {
    if (resendTimer > 0) return
    sendOtp.mutate(
      { identifier: email, purpose: 'forgot-password' },
      {
        onSuccess: () => {
          setResendTimer(30)
          notify.success('OTP resent')
        },
      }
    )
  }

  if (step === 3) {
    return (
      <AuthLayout title="Set New Password" subtitle="Choose a strong password for your account">
        <Box component="form" onSubmit={passwordForm.handleSubmit(submitNewPassword)} noValidate>
          <Controller
            name="password"
            control={passwordForm.control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="New Password"
                margin="normal"
                error={Boolean(passwordForm.formState.errors.password)}
                helperText={passwordForm.formState.errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={passwordForm.control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Confirm New Password"
                margin="normal"
                error={Boolean(passwordForm.formState.errors.confirmPassword)}
                helperText={passwordForm.formState.errors.confirmPassword?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={resetPassword.isPending}
            sx={{ mt: 3 }}
          >
            {resetPassword.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Box>
      </AuthLayout>
    )
  }

  if (step === 2) {
    return (
      <AuthLayout title="Verify OTP" subtitle={`Enter the 6-digit code sent to ${email}`}>
        <Box component="form" onSubmit={otpForm.handleSubmit(submitOtp)} noValidate>
          <Controller
            name="otp"
            control={otpForm.control}
            render={({ field }) => (
              <OtpField
                value={field.value}
                onChange={field.onChange}
                error={Boolean(otpForm.formState.errors.otp)}
                helperText={otpForm.formState.errors.otp?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={verifyOtp.isPending}
            sx={{ mt: 3 }}
          >
            {verifyOtp.isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>
          <Button fullWidth sx={{ mt: 1.5 }} disabled={resendTimer > 0} onClick={handleResend}>
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </Button>
        </Box>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset code">
      <Box component="form" onSubmit={emailForm.handleSubmit(submitEmail)} noValidate>
        <Controller
          name="email"
          control={emailForm.control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="email"
              label="Email Address"
              margin="normal"
              error={Boolean(emailForm.formState.errors.email)}
              helperText={emailForm.formState.errors.email?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={sendOtp.isPending}
          sx={{ mt: 3 }}
        >
          {sendOtp.isPending ? 'Sending...' : 'Send Reset Code'}
        </Button>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
          Remembered your password?{' '}
          <Typography
            component={RouterLink}
            to="/signin"
            variant="body2"
            sx={{ color: 'primary.dark', textDecoration: 'none', display: 'inline' }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
