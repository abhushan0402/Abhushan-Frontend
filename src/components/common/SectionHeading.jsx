import { Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  viewAllHref,
  viewAllLabel = 'View All',
}) {
  const viewAllButton = viewAllHref ? (
    <Button
      component={RouterLink}
      to={viewAllHref}
      variant="outlined"
      color="primary"
      size="small"
      endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
      sx={{
        whiteSpace: 'nowrap',
        ...(dark
          ? {
              color: 'common.white',
              borderColor: 'rgba(245,241,232,0.4)',
              '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
            }
          : {}),
      }}
    >
      {viewAllLabel}
    </Button>
  ) : null

  return (
    <Box sx={{ position: 'relative', mb: { xs: 4, md: 6 } }}>
      {viewAllButton ? (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', top: 4, right: 0 }}>
          {viewAllButton}
        </Box>
      ) : null}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          textAlign: align,
          maxWidth: align === 'center' ? 640 : 'none',
          mx: align === 'center' ? 'auto' : 0,
        }}
      >
        {eyebrow ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: align === 'center' ? 'center' : 'flex-start',
              mb: 1.5,
            }}
          >
            <Box sx={{ width: 22, height: '1.5px', bgcolor: dark ? '#facc15' : 'primary.main', opacity: 0.7 }} />
            <Typography
              variant="subtitle2"
              sx={{
                color: dark ? '#facc15' : 'primary.main',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            >
              {eyebrow}
            </Typography>
            {align === 'center' ? (
              <Box sx={{ width: 22, height: '1.5px', bgcolor: dark ? '#facc15' : 'primary.main', opacity: 0.7 }} />
            ) : null}
          </Box>
        ) : null}
        <Typography
          variant="h3"
          sx={{
            color: dark ? 'common.white' : 'text.primary',
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant="body1"
            sx={{
              color: dark ? 'rgba(245,241,232,0.75)' : 'text.secondary',
              mt: 2,
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {viewAllButton ? (
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', mt: 2.5 }}>
          {viewAllButton}
        </Box>
      ) : null}
    </Box>
  )
}
