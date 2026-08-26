import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  TextField,
  Button,
  Grid2 as Grid,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material'
import { useMe, useUpdateProfile } from '../../hooks/useAuth'
import { profileSchema } from '../../utils/validators'
import { useNotify } from '../../components/common/NotificationContext'
import { TextBlockSkeleton } from '../../components/common/Skeletons'

function initials(user) {
  return `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() || 'A'
}

export default function ProfilePage() {
  const { data: user, isLoading } = useMe()
  const updateProfile = useUpdateProfile()
  const notify = useNotify()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      dateOfBirth: '',
      gender: undefined,
      profileImage: '',
    },
  })

  const previewImage = watch('profileImage')

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        mobile: user.mobile ?? '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
        gender: user.gender ?? undefined,
        profileImage: user.profileImage ?? '',
      })
    }
  }, [user, reset])

  const onSubmit = (values) => {
    const payload = { ...values }
    if (!payload.mobile) delete payload.mobile
    if (!payload.dateOfBirth) delete payload.dateOfBirth
    if (!payload.gender) delete payload.gender
    if (!payload.profileImage) delete payload.profileImage
    updateProfile.mutate(payload, {
      onSuccess: () => notify.success('Profile updated'),
      onError: (error) => notify.error(error?.message || 'Could not update profile'),
    })
  }

  if (isLoading) return <TextBlockSkeleton lines={6} />

  return (
    <Box sx={{ bgcolor: '#faf7f1', p: { xs: 3, md: 4 } }}>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        Personal Information
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3.5 }}>
        <Avatar
          src={previewImage || undefined}
          sx={{ width: 72, height: 72, bgcolor: 'primary.main', color: '#fff', fontSize: '1.5rem' }}
        >
          {initials(user)}
        </Avatar>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 320 }}>
          Paste a link to an image below to use it as your profile picture.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Profile Image URL"
                  placeholder="https://..."
                  sx={{ bgcolor: '#fff' }}
                  error={Boolean(errors.profileImage)}
                  helperText={errors.profileImage?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  sx={{ bgcolor: '#fff' }}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  sx={{ bgcolor: '#fff' }}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mobile Number"
                  sx={{ bgcolor: '#fff' }}
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ bgcolor: '#fff' }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField {...field} select fullWidth label="Gender" sx={{ bgcolor: '#fff' }}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={user?.email ?? ''}
              disabled
              sx={{ bgcolor: '#fff' }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || updateProfile.isPending}
          sx={{ mt: 3 }}
        >
          {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  )
}
