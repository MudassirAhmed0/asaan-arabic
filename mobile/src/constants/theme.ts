export const colors = {
  // Primary palette
  primary: '#0D7377',       // Deep teal
  primaryLight: '#14919B',
  primaryDark: '#0A5C5F',

  // Accent
  accent: '#D4A843',        // Gold
  accentLight: '#E8C96A',

  // Backgrounds
  background: '#F5F0EB',    // Warm cream
  surface: '#FFFFFF',
  surfaceAlt: '#F0EAE3',

  // Text
  text: '#1A1A2E',          // Near-black
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Semantic
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  // Arabic display
  arabicLarge: {
    fontFamily: 'Amiri',
    fontSize: 36,
    lineHeight: 56,
  },
  arabicMedium: {
    fontFamily: 'Amiri',
    fontSize: 28,
    lineHeight: 44,
  },
  arabicSmall: {
    fontFamily: 'Amiri',
    fontSize: 22,
    lineHeight: 34,
  },

  // App text
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;
