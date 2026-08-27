import { useRef, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useUIStore } from '../../store/uiStore'
import { useIsAuthenticated } from '../../hooks/useAuth'
import { useCart, normalizeCartItems } from '../../hooks/useCart'
import { useWishlist, normalizeWishlistItems } from '../../hooks/useWishlist'
import { NAV_LINKS } from '../../utils/constants'
import BrandLogo from './BrandLogo'
import MegaMenu from './MegaMenu'
import SearchOverlay from './SearchOverlay'
import NotificationsMenu from './NotificationsMenu'

export default function Header() {
  const openMobileNav = useUIStore((s) => s.openMobileNav)
  const openCartDrawer = useUIStore((s) => s.openCartDrawer)
  const openSearch = useUIStore((s) => s.openSearch)
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  const { data: cart } = useCart()
  const { data: wishlist } = useWishlist()
  const cartCount = normalizeCartItems(cart).reduce((n, i) => n + i.quantity, 0)
  const wishlistCount = normalizeWishlistItems(wishlist).length

  const [megaMenuAnchor, setMegaMenuAnchor] = useState(null)
  const closeTimer = useRef(null)

  // The dropdown panel renders in a Popper, so it isn't a DOM descendant of
  // the nav trigger — mouse-leaving the trigger to move toward the panel
  // has to cross a gap, and mouse events don't bubble across that portal
  // boundary. Cancel/schedule are shared by both the trigger and the panel
  // itself so hovering either keeps it open, and only leaving both closes it.
  const cancelMenuClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleMenuClose = () => {
    cancelMenuClose()
    closeTimer.current = setTimeout(() => setMegaMenuAnchor(null), 250)
  }

  const handleMenuEnter = (event, link) => {
    if (!link.megaMenu) return
    cancelMenuClose()
    setMegaMenuAnchor(event.currentTarget)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #2BBBAE 0%, #14807A 55%, #0A4D4A 100%)',
        borderBottom: '1px solid rgba(20, 128, 122,0.18)',
      }}
    >
      <Toolbar disableGutters sx={{ px: { xs: 2, md: 4 }, py: 1.25, minHeight: { xs: 64, md: 84 } }}>
        <IconButton
          onClick={openMobileNav}
          sx={{ color: '#f5f1e8', display: { xs: 'inline-flex', md: 'none' }, mr: 1 }}
          aria-label="Open menu"
        >
          <MenuRoundedIcon />
        </IconButton>

        <BrandLogo dark size="medium" />

        <Box
          component="nav"
          onMouseLeave={scheduleMenuClose}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            ml: 6,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Typography
              key={link.label}
              component={RouterLink}
              to={link.to}
              onMouseEnter={(e) => handleMenuEnter(e, link)}
              sx={{
                color: '#f5f1e8',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                position: 'relative',
                pb: 0.5,
                '&:hover': { color: '#D4AF37' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>

        <MegaMenu
          anchorEl={megaMenuAnchor}
          open={Boolean(megaMenuAnchor)}
          onClose={() => setMegaMenuAnchor(null)}
          onMouseEnter={cancelMenuClose}
          onMouseLeave={scheduleMenuClose}
        />

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
          <IconButton onClick={openSearch} sx={{ color: '#f5f1e8' }} aria-label="Search">
            <SearchRoundedIcon />
          </IconButton>
          <NotificationsMenu iconColor="#f5f1e8" />
          <IconButton
            component={RouterLink}
            to={isAuthenticated ? '/account/profile' : '/signin'}
            sx={{ color: '#f5f1e8', display: { xs: 'none', sm: 'inline-flex' } }}
            aria-label="Account"
          >
            <PersonOutlineRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate('/wishlist')}
            sx={{ color: '#f5f1e8' }}
            aria-label="Wishlist"
          >
            <Badge badgeContent={wishlistCount} color="primary" max={99}>
              <FavoriteBorderRoundedIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={openCartDrawer} sx={{ color: '#f5f1e8' }} aria-label="Cart">
            <Badge badgeContent={cartCount} color="primary" max={99}>
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
      <SearchOverlay />
    </AppBar>
  )
}
