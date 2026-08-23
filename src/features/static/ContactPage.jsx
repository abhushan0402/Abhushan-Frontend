import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Typography, TextField, Button, Grid2 as Grid } from '@mui/material'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import { useNotify } from '../../components/common/NotificationContext'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Please share a few more details'),
})

// No contact/support endpoint exists on the API yet — this submits locally
// and confirms to the user. Wire to a real endpoint once one is available.
export default function ContactPage() {
  const notify = useNotify()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    notify.success("Message sent — we'll get back to you soon.")
    reset()
  }

  return (
    <Box className="av-container" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 1 }}>
        Get in Touch
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 6, maxWidth: 520 }}>
        Have a question about an order, a piece, or a custom design? We'd love to hear from you.
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <PlaceOutlinedIcon sx={{ color: 'primary.main' }} />
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Visit Us</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Abhushan Vatika, Jewellers Lane, India
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <PhoneOutlinedIcon sx={{ color: 'primary.main' }} />
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Call Us</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                +91 00000 00000
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MailOutlineRoundedIcon sx={{ color: 'primary.main' }} />
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Email Us</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                care@abhushanvatika.com
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Your Name"
                  margin="normal"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  minRows={4}
                  label="Message"
                  margin="normal"
                  error={Boolean(errors.message)}
                  helperText={errors.message?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
