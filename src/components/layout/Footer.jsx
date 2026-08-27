import { Box, Grid2 as Grid, Typography, Stack, IconButton, Divider } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import BrandLogo from './BrandLogo'
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../utils/constants'

const SOCIAL_ICONS = [
  { Icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { Icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { Icon: YouTubeIcon, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
]

function FooterColumn({ title, links }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ color: '#facc15', letterSpacing: '0.15em', mb: 2, fontSize: '0.75rem' }}
      >
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {links.map((link) => (
          <Typography
            key={link.label}
            component={RouterLink}
            to={link.to}
            variant="body2"
            sx={{
              color: 'rgba(245,241,232,0.72)',
              textDecoration: 'none',
              '&:hover': { color: '#f5f1e8' },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #7a1c53 0%, #1b1338 100%)',
        color: '#f5f1e8',
        pt: { xs: 6, md: 9 },
        pb: 3,
      }}
    >
      <Box className="av-container">
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <BrandLogo dark size="large" />
            <Typography variant="body2" sx={{ color: 'rgba(245,241,232,0.65)', mt: 2.5, maxWidth: 320 }}>
              Masterpieces of unparalleled artistry — each creation demands hundreds of
              hours of expert craftsmanship to perfect.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href || undefined}
                  target={href ? '_blank' : undefined}
                  rel={href ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  disabled={!href}
                  size="small"
                  sx={{
                    color: '#f5f1e8',
                    border: '1px solid rgba(112, 24, 136,0.3)',
                    borderRadius: '50%',
                    '&:hover': { color: '#facc15', borderColor: '#facc15' },
                    '&.Mui-disabled': { color: 'rgba(245,241,232,0.35)' },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <FooterColumn title="SHOP" links={FOOTER_LINKS.shop} />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <FooterColumn title="HELP" links={FOOTER_LINKS.help} />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <FooterColumn title="ACCOUNT" links={FOOTER_LINKS.account} />
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(112, 24, 136,0.18)', my: { xs: 4, md: 5 } }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(245,241,232,0.5)' }}>
            © {new Date().getFullYear()} Abhushan Vatika. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography
              component={RouterLink}
              to="/about"
              variant="caption"
              sx={{ color: 'rgba(245,241,232,0.5)', textDecoration: 'none', '&:hover': { color: '#f5f1e8' } }}
            >
              About
            </Typography>
            <Typography
              component={RouterLink}
              to="/contact"
              variant="caption"
              sx={{ color: 'rgba(245,241,232,0.5)', textDecoration: 'none', '&:hover': { color: '#f5f1e8' } }}
            >
              Contact
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
