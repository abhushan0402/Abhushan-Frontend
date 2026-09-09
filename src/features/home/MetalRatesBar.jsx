import { Box, Typography, Skeleton } from '@mui/material'
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

function RateTile({ label, price, unit }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: { xs: 2, md: 3 } }}>
      <DiamondRoundedIcon sx={{ color: 'primary.main', fontSize: 22, flexShrink: 0 }} />
      <Box>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', letterSpacing: '0.05em' }}>
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
          {price}
          <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary', ml: 0.5 }}>
            {unit}
          </Typography>
        </Typography>
      </Box>
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
        bgcolor: '#fff',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: { xs: 2, md: 2.5 },
      }}
    >
      <Box
        className="av-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 1.5,
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Skeleton variant="text" width={140} height={40} />
            <Skeleton variant="text" width={140} height={40} />
            <Skeleton variant="text" width={140} height={40} />
          </Box>
        ) : (
          <>
            <RateTile label="GOLD 24K" price={formatPrice(data.gold24kPer10g)} unit="/ 10g" />
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '1px', height: 32, bgcolor: 'divider' }} />
            <RateTile label="GOLD 22K" price={formatPrice(data.gold22kPer10g)} unit="/ 10g" />
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '1px', height: 32, bgcolor: 'divider' }} />
            <RateTile label="SILVER 999" price={formatPrice(data.silver9999PerKg)} unit="/ kg" />
          </>
        )}
        {!isLoading && data?.updatedAt ? (
          <Typography
            sx={{
              width: '100%',
              textAlign: 'center',
              fontSize: '0.68rem',
              color: 'text.secondary',
              mt: 0.5,
            }}
          >
            Rates updated {formatUpdatedAt(data.updatedAt)}
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
