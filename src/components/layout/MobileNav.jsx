import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link as RouterLink } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore'
import { useIsAuthenticated, useLogout } from '../../hooks/useAuth'
import { NAV_LINKS } from '../../utils/constants'
import BrandLogo from './BrandLogo'

export default function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen)
  const close = useUIStore((s) => s.closeMobileNav)
  const isAuthenticated = useIsAuthenticated()
  const logout = useLogout()

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      slotProps={{ paper: { sx: { width: 300, bgcolor: '#0b0b0c', color: '#f5f1e8' } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2.5 }}>
        <BrandLogo dark size="small" />
        <IconButton onClick={close} sx={{ color: 'inherit' }} aria-label="Close menu">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(201,166,103,0.2)' }} />
      <List sx={{ py: 1 }}>
        {NAV_LINKS.map((link) => (
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
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(201,166,103,0.2)' }} />
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
