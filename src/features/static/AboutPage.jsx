import { Box, Typography, Grid2 as Grid } from '@mui/material'
import TrustBanner from '../home/TrustBanner'

export default function AboutPage() {
  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #9C4FB0 0%, #701888 55%, #2e0a3f 100%)',
          color: '#f5f1e8',
          py: { xs: 7, md: 11 },
        }}
      >
        <Box className="av-container" sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" sx={{ color: '#facc15', letterSpacing: '0.3em', mb: 2 }}>
            OUR STORY
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, maxWidth: 720, mx: 'auto' }}>
            Crafting Timeless Beauty Since Generations
          </Typography>
        </Box>
      </Box>

      <Box className="av-container" sx={{ py: { xs: 7, md: 10 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                aspectRatio: '4 / 5',
                background: 'linear-gradient(160deg, #faf7f1 0%, #f1ebe0 100%)',
                overflow: 'hidden',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Abhushan Vatika"
                sx={{ width: '65%', height: 'auto', objectFit: 'contain' }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.8 }}>
              Abhushan Vatika began with a simple belief — that jewellery should carry meaning,
              not just materials. What started as a small family workshop has grown into a name
              trusted for its uncompromising quality and artistry.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.8 }}>
              Every piece in our collection is designed and finished by skilled artisans who
              treat each creation as a work of art — from the first sketch to the final polish.
              We work exclusively with certified gold, silver and imported 925 silver, ensuring
              every purchase is one you can trust for a lifetime.
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              Today, Abhushan Vatika continues that legacy online — bringing the same care,
              craftsmanship and personal service to every shopper, wherever they are.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <TrustBanner />
    </Box>
  )
}
