// Brand palette — built from three tonal ramps the user supplied as a
// swatch image (no hex labels were visible on that image, so these are a
// careful visual approximation; happy to swap in exact values if provided):
//   neutral/charcoal ramp -> dark surfaces (Header/Hero/Footer/marketing)
//   teal ramp             -> primary brand accent (buttons, links, highlights)
//   gold/khaki ramp        -> secondary metallic accent (ratings, badges) —
//                             a classic pairing with deep teal, and fitting
//                             for a jewelry brand
// Each ramp runs lightest -> darkest:
//   neutral: #ededed #d6d6d6 #bfbfbf #a3a3a3 #878787 #6b6b6b #525252 #383838 #232323 #121212
//   teal:    #dff3ef #b8e3db #8fd2c5 #62bfb0 #1f8075(base) #196a61 #14544e #0f3f3b #0a2a27 #051815
//   gold:    #fbf3d0 #f0e4a8 #e0cf7e #c9b45c #a08b3f(base) #7d6c2f #5c4f22 #3e3517 #241e0d #120f06

export const colors = {
  black: '#121212', // neutral ramp, darkest stop
  blackSoft: '#232323', // neutral ramp
  blackElevated: '#383838', // neutral ramp
  accent: '#1f8075', // teal ramp base — primary brand accent
  accentLight: '#62bfb0', // teal ramp, lighter tint
  accentDark: '#14544e', // teal ramp, darker shade
  gold: '#c9b45c', // gold/khaki ramp — secondary metallic accent
  goldLight: '#e0cf7e',
  goldDark: '#7d6c2f',
  cream: '#f8f5ef',
  creamDeep: '#f1ebe0',
  ivory: '#f5f1e8',
  textOnDark: '#f5f1e8',
  textOnDarkMuted: '#9b968d',
  textOnLight: '#211d17',
  textOnLightMuted: '#6f6a5f',
  border: 'rgba(31, 128, 117, 0.28)',
  borderOnLight: 'rgba(33, 29, 23, 0.12)',
  success: '#5c8a5c',
  error: '#b3453f',
}

export const gradients = {
  // Neutral charcoal sweep used for the hero and other large dark marketing
  // moments — no black, just the neutral ramp's darker stops.
  dark: 'linear-gradient(135deg, #121212 0%, #2b2b2b 55%, #1a1a1a 100%)',
  // Teal accent gradient used for primary buttons and highlight banners
  accent: 'linear-gradient(135deg, #1f8075 0%, #196a61 55%, #14544e 100%)',
  accentHover: 'linear-gradient(135deg, #62bfb0 0%, #1f8075 55%, #196a61 100%)',
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
