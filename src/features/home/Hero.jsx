import { Box } from '@mui/material'

export default function Hero() {
  return (
    <Box
      component="img"
      src="/Herro.jpeg"
      alt="Abhushan Vatika — Timeless Jewelry, Authentically You. Gold, Silver, 925 Silver."
      sx={{
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: '1376 / 768',
        objectFit: 'cover',
      }}
    />
  )
}
