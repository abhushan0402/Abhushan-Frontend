import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'
import AuthLayout from './AuthLayout'
import OtpField from '../../components/common/OtpField'
import { signinSchema, otpFormSchema } from '../../utils/validators'
import { useSignin, useSigninVerify } from '../../hooks/useAuth'
import { useNotify } from '../../components/common/NotificationContext'

export default function SignInPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const notify = useNotify()
  const [step, setStep] = useState(1)
  const [mobile, setMobile] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const signin = useSignin()
  const signinVerify = useSigninVerify()

  const mobileForm = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: { mobile: '' },
  })
  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: '' },
  })

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const submitMobile = ({ mobile: enteredMobile }) => {
    signin.mutate(
      { mobile: enteredMobile },
      {
        onSuccess: () => {
          setMobile(enteredMobile)
          setStep(2)
          setResendTimer(30)
          notify.success('OTP sent to your mobile')
        },
        onError: (error) => notify.error(error?.message || 'Could not send OTP'),
      }
    )
  }

  const submitOtp = ({ otp }) => {
    signinVerify.mutate(
      { mobile, otp },
      {
        onSuccess: () => {
          notify.success('Welcome back!')
          navigate(searchParams.get('redirect') || '/')
        },
        onError: (error) => notify.error(error?.message || 'Invalid OTP'),
      }
    )
  }

  const handleResend = () => {
    if (resendTimer > 0) return
    signin.mutate(
      { mobile },
      {
        onSuccess: () => {
          setResendTimer(30)
          notify.success('OTP resent')
        },
        onError: (error) => notify.error(error?.message || 'Could not resend OTP'),
      }
    )
  }

  if (step === 2) {
    return (
      <AuthLayout title="Verify OTP" subtitle={`Enter the 6-digit code sent to ${mobile}`}>
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
            disabled={signinVerify.isPending}
            sx={{ mt: 3 }}
          >
            {signinVerify.isPending ? 'Verifying...' : 'Verify & Sign In'}
          </Button>
          <Button fullWidth sx={{ mt: 1.5 }} disabled={resendTimer > 0 || signin.isPending} onClick={handleResend}>
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 1, color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => setStep(1)}
          >
            ← Edit mobile number
          </Typography>
        </Box>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to Abhushan Vatika">
      <Box component="form" onSubmit={mobileForm.handleSubmit(submitMobile)} noValidate>
        <Controller
          name="mobile"
          control={mobileForm.control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Mobile Number"
              margin="normal"
              error={Boolean(mobileForm.formState.errors.mobile)}
              helperText={mobileForm.formState.errors.mobile?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={signin.isPending}
          sx={{ mt: 3 }}
        >
          {signin.isPending ? 'Sending OTP...' : 'Send OTP'}
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
          New to Abhushan Vatika?{' '}
          <Typography
            component={RouterLink}
            to="/signup"
            variant="body2"
            sx={{ color: 'primary.dark', textDecoration: 'none', display: 'inline' }}
          >
            Create an account
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
