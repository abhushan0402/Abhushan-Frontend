// Brand palette — teal-forward 3D UI scheme, per the user's supplied hex
// codes: TealPrimary #2BBBAE, TealDark #14807A, TealLight/Highlight #5CE1E6
// (glossy light reflection), TealDeepShadow #0A4D4A (depth/shadow/background
// contrast), GoldAccent #D4AF37 (jewelry highlight elements). Dark surfaces
// (Header/Hero/Footer/marketing) are built off the teal ramp — no black used
// anywhere as a primary color. Gradients use the highlight/dark/deep-shadow
// stops together to read as raised, glossy 3D surfaces rather than flat fills.

export const colors = {
  black: '#0E5A55', // deep teal — darkest surface stop (replaces charcoal/black)
  blackSoft: '#14807A', // TealDark — mid surface stop
  blackElevated: '#2BBBAE', // TealPrimary — lightest "sheen" stop
  accent: '#2BBBAE', // TealPrimary — primary brand accent
  accentLight: '#5DD0C4', // lighter tint, derived from TealPrimary
  accentDark: '#14807A', // TealDark
  accentHighlight: '#5CE1E6', // Teal Light — glossy light reflection / highlight edge
  accentDeepShadow: '#0A4D4A', // Teal Deep Shadow — 3D depth, shadow, background contrast
  gold: '#D4AF37', // Gold Accent — buttons and jewelry highlight elements
  goldLight: '#E6C86E',
  goldDark: '#94781F',
  cream: '#f8f5ef',
  creamDeep: '#f1ebe0',
  ivory: '#f5f1e8',
  textOnDark: '#f5f1e8',
  textOnDarkMuted: '#9CA3AF', // TextHint
  textOnLight: '#211d17',
  textOnLightMuted: '#6f6a5f',
  border: 'rgba(20, 128, 122, 0.28)',
  borderOnLight: 'rgba(33, 29, 23, 0.12)',
  success: '#22C55E', // ColorSuccess
  error: '#b3453f',
}

export const gradients = {
  // Primary -> Dark -> Deep Shadow sweep used for the hero and other large
  // dark marketing moments — reads as a raised 3D surface with real depth.
  dark: 'linear-gradient(135deg, #2BBBAE 0%, #14807A 55%, #0A4D4A 100%)',
  // Glossy 3D button gradient: light reflection at the top, deepening toward
  // the bottom, like a raised/glossy surface rather than a flat fill.
  accent: 'linear-gradient(180deg, #5CE1E6 0%, #2BBBAE 45%, #14807A 100%)',
  accentHover: 'linear-gradient(180deg, #8CF0F3 0%, #5CE1E6 45%, #2BBBAE 100%)',
}

export const fonts = {
  display: '"Playfair Display", "Georgia", serif',
  body: '"Poppins", "Segoe UI", sans-serif',
}

// Aligned with MUI default breakpoints so Tailwind screens can match 1:1.
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
