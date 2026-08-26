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

  const handleMenuEnter = (event, link) => {
    if (!link.megaMenu) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaMenuAnchor(event.currentTarget)
  }

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setMegaMenuAnchor(null), 120)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #121212 0%, #383838 55%, #232323 100%)',
        borderBottom: '1px solid rgba(31,128,117,0.18)',
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
          onMouseLeave={handleMenuLeave}
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
                '&:hover': { color: '#1f8075' },
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
