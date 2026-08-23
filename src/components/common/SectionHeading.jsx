import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}) {
  return (
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
        mb: { xs: 4, md: 6 },
      }}
    >
      {eyebrow ? (
        <Typography
          variant="subtitle2"
          sx={{
            color: 'primary.main',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.7rem',
            mb: 1.5,
          }}
        >
          {eyebrow}
        </Typography>
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
  )
}
