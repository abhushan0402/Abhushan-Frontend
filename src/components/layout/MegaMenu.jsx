import { Box, Grid2 as Grid, Popper, Paper, Fade, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useCategories, useProductTypes } from '../../hooks/useCategories'
import { handleImageError } from '../../utils/handleImageError'

export default function MegaMenu({ anchorEl, open, onClose, onMouseEnter, onMouseLeave }) {
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
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            elevation={8}
            sx={{
              background: '#ffffff',
              color: '#211d17',
              border: '1px solid rgba(33, 29, 23, 0.08)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#701888', letterSpacing: '0.2em', mb: 2 }}
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
                            borderRadius: 1,
                            bgcolor: '#f1ebe0',
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
                        <Typography variant="body2" sx={{ letterSpacing: '0.04em', color: '#211d17' }}>
                          {cat.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }} sx={{ borderLeft: { md: '1px solid rgba(33, 29, 23, 0.08)' }, pl: { md: 4 } }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#701888', letterSpacing: '0.2em', mb: 2 }}
                >
                  SHOP BY TYPE
                </Typography>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    maxHeight: 260,
                    overflowY: 'auto',
                    pr: 1,
                    '&::-webkit-scrollbar': { width: 6 },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(112, 24, 136,0.3)',
                    },
                  }}
                >
                  {productTypes.map((type) => (
                    <Grid size={{ xs: 6 }} key={type.productType}>
                      <Typography
                        component={RouterLink}
                        to={`/shop?productType=${encodeURIComponent(type.productType)}`}
                        onClick={onClose}
                        variant="body2"
                        sx={{
                          display: 'block',
                          py: 0.5,
                          color: '#6f6a5f',
                          textDecoration: 'none',
                          textTransform: 'capitalize',
                          '&:hover': { color: '#db2173' },
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
