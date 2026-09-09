import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
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
        <AnimatePresence mode="wait" initial={false}>
          <Box
            key={location.pathname}
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </Box>
        </AnimatePresence>
      </Box>
      <Footer />
      <MobileNav />
      <CartDrawer />
    </Box>
  )
}
