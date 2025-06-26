// Global theme for our application
export const theme = {
  colors: {
    primary: {
      main: '#f97316', // Orange (primary)
      light: '#fdba74',
      dark: '#c2410c',
      contrastText: '#ffffff',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    },
    secondary: {
      main: '#0ea5e9', // Blue (secondary)
      light: '#7dd3fc',
      dark: '#0369a1',
      contrastText: '#ffffff',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
    },
    accent: {
      main: '#8b5cf6', // Purple (accent)
      light: '#c4b5fd',
      dark: '#6d28d9',
      contrastText: '#ffffff',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    background: '#f9fafb',
    glass: 'rgba(255, 255, 255, 0.8)',
    glassDark: 'rgba(31, 41, 55, 0.7)',
    overlay: 'rgba(0, 0, 0, 0.4)'
  },
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    heading: "'Inter', system-ui, sans-serif",
    mono: "'Roboto Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  space: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(249, 115, 22, 0.5)',
    none: 'none'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  }
};

export type Theme = typeof theme;
