import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import AuthLayout from './AuthLayout'
import { signinSchema } from '../../utils/validators'
import { useSignin } from '../../hooks/useAuth'
import { useNotify } from '../../components/common/NotificationContext'

export default function SignInPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const notify = useNotify()
  const signin = useSignin()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: { identifier: '', password: '', rememberMe: false },
  })

  const onSubmit = (values) => {
    signin.mutate(values, {
      onSuccess: () => {
        notify.success('Welcome back!')
        navigate(searchParams.get('redirect') || '/')
      },
      onError: (error) => notify.error(error?.message || 'Could not sign in'),
    })
  }

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to Abhushan Vatika">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="identifier"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email or Mobile Number"
              margin="normal"
              error={Boolean(errors.identifier)}
              helperText={errors.identifier?.message}
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
              type={showPassword ? 'text' : 'password'}
              label="Password"
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                        {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} size="small" />}
                label={<Typography variant="body2">Remember me</Typography>}
              />
            )}
          />
          <Typography
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            sx={{ color: 'primary.dark', textDecoration: 'none' }}
          >
            Forgot password?
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={signin.isPending}
          sx={{ mt: 3 }}
        >
          {signin.isPending ? 'Signing in...' : 'Sign In'}
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
