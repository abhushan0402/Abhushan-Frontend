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
    borderRadius: 2,
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
          borderRadius: 0,
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
          '&:hover': {
            backgroundImage: gradients.accentHover,
          },
          '&.Mui-disabled': {
            backgroundImage: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
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
          borderRadius: 2,
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
