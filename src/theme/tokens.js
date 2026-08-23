// Design tokens extracted from the Abhushan Vatika Figma hero reference.
// Dark luxury theme drives Header / Hero / Footer / marketing moments.
// Light cream theme drives shopping surfaces (PLP / PDP / Cart / Account)
// so product photography reads clearly — both share the same accent + type system.

export const colors = {
  black: '#0b0b0c',
  blackSoft: '#141414',
  blackElevated: '#1c1b19',
  gold: '#c9a667',
  goldLight: '#e2c896',
  goldDark: '#a9814a',
  cream: '#f8f5ef',
  creamDeep: '#f1ebe0',
  ivory: '#f5f1e8',
  textOnDark: '#f5f1e8',
  textOnDarkMuted: '#9b968d',
  textOnLight: '#211d17',
  textOnLightMuted: '#6f6a5f',
  border: 'rgba(201, 166, 103, 0.28)',
  borderOnLight: 'rgba(33, 29, 23, 0.12)',
  success: '#5c8a5c',
  error: '#b3453f',
}

export const fonts = {
  display: '"Playfair Display", "Georgia", serif',
  body: '"Jost", "Segoe UI", sans-serif',
}

// Aligned with MUI default breakpoints so Tailwind screens can match 1:1.
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
