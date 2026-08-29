import { Box, Rating, Typography } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

export default function RatingStars({
  value = 0,
  count,
  size = 'small',
  showCount = true,
  hideEmpty = false,
}) {
  if (!value && !count) {
    if (hideEmpty) return null
    return (
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        No reviews yet
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Rating
        value={value}
        precision={0.5}
        readOnly
        size={size}
        icon={<StarRoundedIcon fontSize="inherit" />}
        emptyIcon={<StarRoundedIcon fontSize="inherit" style={{ opacity: 0.25 }} />}
        sx={{ color: '#facc15' }}
      />
      {showCount ? (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          ({count ?? 0})
        </Typography>
      ) : null}
    </Box>
  )
}
