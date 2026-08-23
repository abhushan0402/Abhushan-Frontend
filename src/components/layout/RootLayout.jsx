import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'
import CartDrawer from './CartDrawer'

export default function RootLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <MobileNav />
      <CartDrawer />
    </Box>
  )
}
