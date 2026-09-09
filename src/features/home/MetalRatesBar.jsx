import { Box, Typography, Grid2 as Grid, Skeleton } from '@mui/material'
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded'
import { useMetalRates } from '../../hooks/useMetalRates'
import { formatPrice } from '../../utils/formatCurrency'
import SectionHeading from '../../components/common/SectionHeading'

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
        border: '1px solid',
        borderColor: 'divider',
        px: 3,
        py: 3,
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <DiamondRoundedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
      </Box>
      <Typography
        sx={{
          fontSize: '0.7rem',
          color: 'text.secondary',
          letterSpacing: '0.15em',
          fontWeight: 600,
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontFamily: 'Lora, serif', fontWeight: 600, fontSize: { xs: '1.4rem', md: '1.65rem' }, color: 'primary.main' }}>
        {price}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.25 }}>{unit}</Typography>
    </Box>
  )
}

export default function MetalRatesBar() {
  const { data, isLoading, isError } = useMetalRates()

  if (isError) return null
  if (!isLoading && !data) return null

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 6 } }}>
      <Box className="av-container">
        <SectionHeading eyebrow="Today's Rates" title="Live Gold & Silver Rates" />

        {isLoading ? (
          <Grid container spacing={2.5}>
            {[0, 1, 2].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 4 }}>
                <Skeleton variant="rounded" height={148} sx={{ borderRadius: '14px' }} />
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
          <Typography sx={{ textAlign: 'center', fontSize: '0.7rem', color: 'text.secondary', mt: 3 }}>
            Rates updated {formatUpdatedAt(data.updatedAt)}
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
