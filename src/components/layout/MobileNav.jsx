import { useState } from 'react'
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { Link as RouterLink } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore'
import { useIsAuthenticated, useLogout } from '../../hooks/useAuth'
import { useCategories } from '../../hooks/useCategories'
import { NAV_LINKS } from '../../utils/constants'
import BrandLogo from './BrandLogo'

export default function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen)
  const close = useUIStore((s) => s.closeMobileNav)
  const isAuthenticated = useIsAuthenticated()
  const logout = useLogout()
  const { data: categories = [] } = useCategories()
  const [jewelleryOpen, setJewelleryOpen] = useState(false)

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      slotProps={{
        paper: {
          sx: {
            width: 300,
            background: 'linear-gradient(160deg, #9C4FB0 0%, #701888 55%, #2e0a3f 100%)',
            color: '#f5f1e8',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2.5 }}>
        <BrandLogo dark size="small" />
        <IconButton onClick={close} sx={{ color: 'inherit' }} aria-label="Close menu">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(112, 24, 136,0.2)' }} />
      <List sx={{ py: 1 }}>
        {NAV_LINKS.map((link) =>
          link.megaMenu ? (
            <Box key={link.label}>
              <ListItemButton onClick={() => setJewelleryOpen((v) => !v)} sx={{ py: 1.5 }}>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.85rem' },
                  }}
                  primary={link.label}
                />
                <ExpandMoreRoundedIcon
                  fontSize="small"
                  sx={{
                    transition: 'transform 0.2s ease',
                    transform: jewelleryOpen ? 'rotate(180deg)' : 'none',
                  }}
                />
              </ListItemButton>
              <Collapse in={jewelleryOpen} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  <ListItemButton component={RouterLink} to="/shop" onClick={close} sx={{ py: 1 }}>
                    <ListItemText
                      primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'rgba(245,241,232,0.85)' } }}
                      primary="All Jewellery"
                    />
                  </ListItemButton>
                  {categories.map((cat) => (
                    <ListItemButton
                      key={cat._id}
                      component={RouterLink}
                      to={`/category/${cat.slug}`}
                      onClick={close}
                      sx={{ py: 1 }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'rgba(245,241,232,0.85)' } }}
                        primary={cat.name}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton
              key={link.label}
              component={RouterLink}
              to={link.to}
              onClick={close}
              sx={{ py: 1.5 }}
            >
              <ListItemText
                primaryTypographyProps={{
                  sx: { letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.85rem' },
                }}
                primary={link.label}
              />
            </ListItemButton>
          )
        )}
      </List>
      <Divider sx={{ borderColor: 'rgba(112, 24, 136,0.2)' }} />
      <List sx={{ py: 1 }}>
        {isAuthenticated ? (
          <>
            <ListItemButton component={RouterLink} to="/account/profile" onClick={close}>
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/account/orders" onClick={close}>
              <ListItemText primary="My Orders" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/wishlist" onClick={close}>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                close()
                logout.mutate()
              }}
            >
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton component={RouterLink} to="/signin" onClick={close}>
              <ListItemText primary="Sign In" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/signup" onClick={close}>
              <ListItemText primary="Create Account" />
            </ListItemButton>
          </>
        )}
      </List>
      <Box sx={{ mt: 'auto', px: 2.5, py: 3 }}>
        <Typography variant="caption" sx={{ color: 'rgba(245,241,232,0.5)' }}>
          Timeless Beauty. Infinite Love.
        </Typography>
      </Box>
    </Drawer>
  )
}
