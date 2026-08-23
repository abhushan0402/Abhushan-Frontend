import { Box, Typography } from '@mui/material'
import { formatPrice } from '../../utils/formatCurrency'

export default function PriceTag({ price, size = 'medium', sx }) {
  const isOnRequest = !price || Number(price) <= 0
  const fontSize =
    size === 'large' ? '1.5rem' : size === 'small' ? '0.875rem' : '1.1rem'

  return (
    <Box sx={sx}>
      <Typography
        component="span"
        sx={{
          fontWeight: 600,
          fontSize,
          color: isOnRequest ? 'text.secondary' : 'text.primary',
          fontStyle: isOnRequest ? 'italic' : 'normal',
        }}
      >
        {formatPrice(price)}
      </Typography>
    </Box>
  )
}
