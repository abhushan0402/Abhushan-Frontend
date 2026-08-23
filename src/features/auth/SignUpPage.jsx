import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography, Grid2 as Grid } from '@mui/material'
import AuthLayout from './AuthLayout'
import OtpField from '../../components/common/OtpField'
import { signupSchema, otpFormSchema } from '../../utils/validators'
import { useSignupInit, useVerifySignupOtp } from '../../hooks/useAuth'
import { useNotify } from '../../components/common/NotificationContext'

export default function SignUpPage() {
  const navigate = useNavigate()
  const notify = useNotify()
  const [step, setStep] = useState(1)
  const [pendingPayload, setPendingPayload] = useState(null)
  const [resendTimer, setResendTimer] = useState(0)

  const signupInit = useSignupInit()
  const verifyOtp = useVerifySignupOtp()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: '' },
  })

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const submitStep1 = (values) => {
    const payload = { ...values }
    delete payload.confirmPassword
    signupInit.mutate(payload, {
      onSuccess: () => {
        setPendingPayload(payload)
        setStep(2)
        setResendTimer(30)
        notify.success('OTP sent to your email')
      },
      onError: (error) => notify.error(error?.message || 'Could not create account'),
    })
  }

  const submitStep2 = ({ otp }) => {
    verifyOtp.mutate(
      { email: pendingPayload.email, otp },
      {
        onSuccess: () => {
          notify.success('Account created successfully!')
          navigate('/')
        },
        onError: (error) => notify.error(error?.message || 'Invalid OTP'),
      }
    )
  }

  const handleResend = () => {
    if (!pendingPayload || resendTimer > 0) return
    signupInit.mutate(pendingPayload, {
      onSuccess: () => {
        setResendTimer(30)
        notify.success('OTP resent')
      },
      onError: (error) => notify.error(error?.message || 'Could not resend OTP'),
    })
  }

  if (step === 2) {
    return (
      <AuthLayout
        title="Verify Your Email"
        subtitle={`Enter the 6-digit code sent to ${pendingPayload?.email}`}
      >
        <Box component="form" onSubmit={handleOtpSubmit(submitStep2)} noValidate>
          <Controller
            name="otp"
            control={otpControl}
            render={({ field }) => (
              <OtpField
                value={field.value}
                onChange={field.onChange}
                error={Boolean(otpErrors.otp)}
                helperText={otpErrors.otp?.message}
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
            {verifyOtp.isPending ? 'Verifying...' : 'Verify & Create Account'}
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1.5 }}
            disabled={resendTimer > 0 || signupInit.isPending}
            onClick={handleResend}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 1, color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => setStep(1)}
          >
            ← Edit details
          </Typography>
        </Box>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join Abhushan Vatika today">
      <Box component="form" onSubmit={handleSubmit(submitStep1)} noValidate>
        <Grid container spacing={1.5}>
          <Grid size={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  margin="normal"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="email"
              label="Email Address"
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Mobile Number"
              margin="normal"
              error={Boolean(errors.mobile)}
              helperText={errors.mobile?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Confirm Password"
              margin="normal"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={signupInit.isPending}
          sx={{ mt: 3 }}
        >
          {signupInit.isPending ? 'Sending OTP...' : 'Create Account'}
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
          Already have an account?{' '}
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
