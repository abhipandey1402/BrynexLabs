export const theme = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#050505',
      secondary: '#0A0A0A',
      tertiary: '#111111',
      card: '#0D0D0D',
      cardHover: '#141414',
      navBar: 'rgba(5, 5, 5, 0.8)',
    },
    // Foregrounds
    text: {
      primary: '#F5F5F5',
      secondary: '#A3A3A3',
      muted: '#737373',
      inverse: '#050505',
    },
    // Accent — deep orange → amber
    accent: {
      DEFAULT: '#C2410C',
      light: '#EA580C',
      lighter: '#F59E0B',
      dark: '#9A3412',
      gradient: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #F59E0B 100%)',
      gradientSubtle: 'linear-gradient(135deg, rgba(194, 65, 12, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
      glow: 'radial-gradient(ellipse at center, rgba(194, 65, 12, 0.15) 0%, rgba(234, 88, 12, 0.08) 40%, transparent 70%)',
      glowStrong: 'radial-gradient(ellipse at center, rgba(194, 65, 12, 0.25) 0%, rgba(234, 88, 12, 0.12) 40%, transparent 70%)',
    },
    // Borders
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.06)',
      hover: 'rgba(255, 255, 255, 0.12)',
      accent: 'rgba(194, 65, 12, 0.3)',
      accentHover: 'rgba(194, 65, 12, 0.5)',
    },
  },
  spacing: {
    sectionY: '120px',
    sectionYMobile: '80px',
    containerMax: '1600px', // Widened from 1200px to match Aeos Labs style
    containerPadding: '24px', // Kept minimal
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.3)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.5)',
    glow: '0 0 40px rgba(194, 65, 12, 0.1)',
    glowStrong: '0 0 60px rgba(194, 65, 12, 0.2)',
    button: '0 0 20px rgba(194, 65, 12, 0.3)',
  },
  fonts: {
    sans: 'var(--font-inter)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
} as const;
