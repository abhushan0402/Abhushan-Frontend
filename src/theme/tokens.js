// Brand palette — matched to the greatflowers.needsmet.work reference site's
// own design tokens (--gf-primary, --gf-secondary, --gf-accent-yellow, etc,
// pulled from its published CSS): DeepPurple #701888 (primary), Magenta
// #db2173 (secondary/vivid accent), AccentYellow #facc15 (badges, stars,
// highlight elements), HeroPurple #2e0a3f (deepest gradient/shadow stop).
// Dark surfaces (Header/Hero/Footer/marketing) are built off the purple ramp.
// Gradients use the light/mid/deep-shadow stops together to read as raised,
// glossy 3D surfaces rather than flat fills.

export const colors = {
  black: '#2e0a3f', // HeroPurple — darkest surface stop (replaces charcoal/black)
  blackSoft: '#701888', // Primary — mid surface stop
  blackElevated: '#9C4FB0', // lightest "sheen" stop, tint of Primary
  accent: '#701888', // Primary — primary brand accent
  accentLight: '#9C4FB0', // lighter tint, derived from Primary
  accentDark: '#4F1164', // darker shade of Primary
  accentHighlight: '#F472B6', // light pink — glossy light reflection / highlight edge
  accentDeepShadow: '#2e0a3f', // HeroPurple — 3D depth, shadow, background contrast
  gold: '#facc15', // AccentYellow — badges, star ratings, highlight elements
  goldLight: '#FDE047',
  goldDark: '#CA8A04',
  secondary: '#db2173', // Magenta — vivid secondary accent (hover states, CTAs)
  footerNavy: '#1b1338',
  footerMagenta: '#7a1c53',
  cream: '#f8f5ef',
  creamDeep: '#f1ebe0',
  ivory: '#f5f1e8',
  textOnDark: '#f5f1e8',
  textOnDarkMuted: '#9CA3AF', // TextHint
  textOnLight: '#211d17',
  textOnLightMuted: '#6f6a5f',
  border: 'rgba(112, 24, 136, 0.28)',
  borderOnLight: 'rgba(33, 29, 23, 0.12)',
  success: '#22C55E', // ColorSuccess
  error: '#b3453f',
}

export const gradients = {
  // Primary -> Dark -> Deep Shadow sweep used for the hero and other large
  // dark marketing moments — reads as a raised 3D surface with real depth.
  dark: 'linear-gradient(135deg, #9C4FB0 0%, #701888 55%, #2e0a3f 100%)',
  // Glossy 3D button gradient: light reflection at the top, deepening toward
  // the bottom, like a raised/glossy surface rather than a flat fill.
  accent: 'linear-gradient(180deg, #F472B6 0%, #701888 45%, #4F1164 100%)',
  accentHover: 'linear-gradient(180deg, #F9A8D4 0%, #9C4FB0 45%, #701888 100%)',
  // Footer-specific magenta -> navy sweep, matched to the reference site's
  // distinct footer tokens rather than reusing the hero gradient.
  footer: 'linear-gradient(135deg, #7a1c53 0%, #1b1338 100%)',
}

export const fonts = {
  display: '"Lora", "Georgia", serif',
  body: '"DM Sans", "Segoe UI", sans-serif',
}

// Aligned with MUI default breakpoints so Tailwind screens can match 1:1.
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
