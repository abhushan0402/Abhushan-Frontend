import { Box, Typography, Grid2 as Grid, Skeleton } from '@mui/material'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import { useMetalRates } from '../../hooks/useMetalRates'
import { formatPrice } from '../../utils/formatCurrency'

function formatUpdatedAt(value) {
  if (!value) return ''
  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function RateCard({ label, price, unit }) {
  return (
    <Box
      sx={{
        height: '100%',
        textAlign: 'center',
        borderRadius: '14px',
        border: '1px solid rgba(250, 204, 21, 0.25)',
        bgcolor: 'rgba(255,255,255,0.06)',
        px: 3,
        py: 3,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: 'rgba(250, 204, 21, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <DiamondRoundedIcon sx={{ color: '#facc15', fontSize: 22 }} />
      </Box>
      <Typography
        sx={{
          fontSize: '0.7rem',
          color: 'rgba(245,241,232,0.65)',
          letterSpacing: '0.15em',
          fontWeight: 600,
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontFamily: 'Lora, serif', fontSize: { xs: '1.4rem', md: '1.65rem' }, color: '#facc15' }}>
        {price}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'rgba(245,241,232,0.55)', mt: 0.25 }}>{unit}</Typography>
    </Box>
  )
}

export default function MetalRatesBar() {
  const { data, isLoading, isError } = useMetalRates()

  if (isError) return null
  if (!isLoading && !data) return null

  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #9C4FB0 0%, #701888 55%, #2e0a3f 100%)',
        py: { xs: 5, md: 6 },
      }}
    >
      <Box className="av-container">
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ width: 22, height: '1.5px', bgcolor: '#facc15', opacity: 0.7 }} />
            <Typography
              sx={{ color: '#facc15', letterSpacing: '0.25em', fontSize: '0.7rem', fontWeight: 600 }}
            >
              TODAY&apos;S RATES
            </Typography>
            <Box sx={{ width: 22, height: '1.5px', bgcolor: '#facc15', opacity: 0.7 }} />
          </Box>
          <Typography sx={{ color: '#f5f1e8', fontFamily: 'Lora, serif', fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
            Live Gold &amp; Silver Rates
          </Typography>
        </Box>

        {isLoading ? (
          <Grid container spacing={2.5}>
            {[0, 1, 2].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 4 }}>
                <Skeleton
                  variant="rounded"
                  height={148}
                  sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '14px' }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <RateCard label="GOLD 24K" price={formatPrice(data.gold24kPer10g)} unit="per 10 grams" />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <RateCard label="GOLD 22K" price={formatPrice(data.gold22kPer10g)} unit="per 10 grams" />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <RateCard label="SILVER 999" price={formatPrice(data.silver9999PerKg)} unit="per kg" />
            </Grid>
          </Grid>
        )}

        {!isLoading && data?.updatedAt ? (
          <Typography
            sx={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(245,241,232,0.55)', mt: 3 }}
          >
            Rates updated {formatUpdatedAt(data.updatedAt)}
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
