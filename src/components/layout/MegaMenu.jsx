import { Box, Grid2 as Grid, Popper, Paper, Fade, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useCategories, useProductTypes } from '../../hooks/useCategories'
import { handleImageError } from '../../utils/handleImageError'

export default function MegaMenu({ anchorEl, open, onClose }) {
  const { data: categories = [] } = useCategories()
  const { data: productTypes = [] } = useProductTypes()

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      transition
      disablePortal={false}
      sx={{ zIndex: 1250, width: 'min(880px, 96vw)' }}
      modifiers={[{ name: 'offset', options: { offset: [0, 14] } }]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <Paper
            onMouseLeave={onClose}
            elevation={8}
            sx={{
              bgcolor: '#111110',
              color: '#f5f1e8',
              border: '1px solid rgba(201,166,103,0.25)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2 }}
                >
                  SHOP BY CATEGORY
                </Typography>
                <Grid container spacing={2}>
                  {categories.map((cat) => (
                    <Grid size={{ xs: 4 }} key={cat._id}>
                      <Box
                        component={RouterLink}
                        to={`/category/${cat.slug}`}
                        onClick={onClose}
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'inherit',
                          '&:hover img': { transform: 'scale(1.05)' },
                        }}
                      >
                        <Box
                          sx={{
                            aspectRatio: '1 / 1',
                            overflow: 'hidden',
                            mb: 1,
                            bgcolor: 'rgba(255,255,255,0.05)',
                          }}
                        >
                          <Box
                            component="img"
                            src={cat.image}
                            alt={cat.name}
                            loading="lazy"
                            onError={handleImageError}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.4s ease',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ letterSpacing: '0.04em' }}>
                          {cat.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }} sx={{ borderLeft: { md: '1px solid rgba(201,166,103,0.2)' }, pl: { md: 4 } }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2 }}
                >
                  SHOP BY TYPE
                </Typography>
                <Grid container spacing={1}>
                  {productTypes.slice(0, 10).map((type) => (
                    <Grid size={{ xs: 6 }} key={type.productType}>
                      <Typography
                        component={RouterLink}
                        to={`/shop?productType=${encodeURIComponent(type.productType)}`}
                        onClick={onClose}
                        variant="body2"
                        sx={{
                          display: 'block',
                          py: 0.5,
                          color: 'rgba(245,241,232,0.85)',
                          textDecoration: 'none',
                          textTransform: 'capitalize',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {type.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
