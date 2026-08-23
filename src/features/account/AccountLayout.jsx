import { Box, Grid2 as Grid, Typography, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useLogout, useCurrentUser, useMe } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { label: 'Profile', to: '/account/profile', icon: PersonOutlineRoundedIcon },
  { label: 'Address Book', to: '/account/addresses', icon: LocationOnOutlinedIcon },
  { label: 'My Orders', to: '/account/orders', icon: ReceiptLongOutlinedIcon },
]

export default function AccountLayout() {
  useMe()
  const user = useCurrentUser()
  const logout = useLogout()

  return (
    <Box className="av-container" sx={{ py: { xs: 4, md: 7 } }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 1 }}>
        My Account
      </Typography>
      {user?.firstName ? (
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          Welcome back, {user.firstName}
        </Typography>
      ) : (
        <Box sx={{ mb: 4 }} />
      )}

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 3 }}>
          <List sx={{ bgcolor: '#faf7f1', p: 1 }}>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  '&.active': {
                    bgcolor: '#fff',
                    borderLeft: '2px solid',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => logout.mutate()}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}
