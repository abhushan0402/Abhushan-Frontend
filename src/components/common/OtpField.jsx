import { TextField } from '@mui/material'

export default function OtpField({ value, onChange, error, helperText }) {
  return (
    <TextField
      fullWidth
      label="6-digit OTP"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
      error={error}
      helperText={helperText}
      inputProps={{
        inputMode: 'numeric',
        maxLength: 6,
        style: { letterSpacing: '0.5em', fontSize: '1.25rem', textAlign: 'center' },
      }}
    />
  )
}
