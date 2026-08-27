import { createTheme } from '@mui/material/styles'
import { colors, gradients, fonts, breakpoints } from './tokens'

const theme = createTheme({
  breakpoints: {
    values: breakpoints,
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.accent,
      light: colors.accentLight,
      dark: colors.accentDark,
      contrastText: colors.ivory,
    },
    secondary: {
      main: colors.black,
      contrastText: colors.ivory,
    },
    background: {
      default: colors.cream,
      paper: '#ffffff',
    },
    text: {
      primary: colors.textOnLight,
      secondary: colors.textOnLightMuted,
    },
    error: { main: colors.error },
    success: { main: colors.success },
    divider: colors.borderOnLight,
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.display,
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: fonts.display,
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: fonts.display,
      fontWeight: 500,
    },
    h4: {
      fontFamily: fonts.display,
      fontWeight: 500,
    },
    h5: {
      fontFamily: fonts.display,
      fontWeight: 500,
    },
    h6: {
      fontFamily: fonts.body,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    button: {
      fontFamily: fonts.body,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    subtitle1: {
      letterSpacing: '0.04em',
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: '1.75rem',
          paddingBlock: '0.75rem',
          fontSize: '0.75rem',
        },
        outlined: {
          borderWidth: 1,
        },
        outlinedPrimary: {
          borderColor: colors.accent,
        },
        containedPrimary: {
          backgroundImage: gradients.accent,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 4px 10px rgba(10,77,74,0.35)',
          '&:hover': {
            backgroundImage: gradients.accentHover,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 14px rgba(10,77,74,0.4)',
          },
          '&.Mui-disabled': {
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
        '::selection': {
          backgroundColor: colors.accent,
          color: colors.ivory,
        },
      },
    },
  },
})

export default theme
