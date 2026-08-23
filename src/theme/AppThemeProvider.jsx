import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

export default function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
