import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useChangePassword } from '../../hooks/useAuth'
import { changePasswordSchema } from '../../utils/validators'
import { useNotify } from '../../components/common/NotificationContext'

export default function ChangePasswordPage() {
  const changePassword = useChangePassword()
  const notify = useNotify()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  })

  const onSubmit = ({ currentPassword, newPassword }) => {
    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          notify.success('Password updated successfully')
          reset()
        },
        onError: (error) => notify.error(error?.message || 'Could not update password'),
      }
    )
  }

  return (
    <Box sx={{ bgcolor: '#faf7f1', p: { xs: 3, md: 4 }, maxWidth: 480 }}>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        Update Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Current Password"
              margin="normal"
              sx={{ bgcolor: '#fff' }}
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword?.message}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="New Password"
              margin="normal"
              sx={{ bgcolor: '#fff' }}
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword?.message}
            />
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Confirm New Password"
              margin="normal"
              sx={{ bgcolor: '#fff' }}
              error={Boolean(errors.confirmNewPassword)}
              helperText={errors.confirmNewPassword?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={changePassword.isPending}
          sx={{ mt: 3 }}
        >
          {changePassword.isPending ? 'Updating...' : 'Update Password'}
        </Button>
      </Box>
    </Box>
  )
}
