/**
 * Theme Constants
 * ===============
 * Central color and style configuration for the entire app.
 * Using a theme object ensures visual consistency and makes
 * it easy to change the app's appearance in one place.
 */

export const COLORS = {
  // Primary brand colors
  primary: '#6C63FF',
  primaryLight: '#8B83FF',
  primaryDark: '#5A52E0',
  primaryBackground: '#EDEAFF',

  // Status colors
  success: '#4CAF50',
  successBackground: '#E8F5E9',
  danger: '#F44336',
  dangerBackground: '#FFEBEE',
  warning: '#FF9800',
  warningBackground: '#FFF3E0',

  // Neutral colors
  white: '#FFFFFF',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textDisabled: '#D1D5DB',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  divider: '#E5E7EB',

  // Shadows
  shadow: 'rgba(108, 99, 255, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.08)',

  // Completed task overlay
  completedOverlay: 'rgba(108, 99, 255, 0.05)',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  title: 32,
};

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

// minor update at 2026-05-16 18:07:27 - iteration 6

// minor update at 2026-05-16 18:07:34 - iteration 7

// minor update at 2026-05-16 18:08:59 - iteration 20

// minor update at 2026-05-16 18:09:53 - iteration 28

// minor update at 2026-05-16 18:16:32 - iteration 90

// minor update at 2026-05-16 18:16:46 - iteration 92

// minor update at 2026-05-16 18:17:56 - iteration 103

// minor update at 2026-05-16 18:24:03 - iteration 159

// minor update at 2026-05-16 18:27:56 - iteration 194

// minor update at 2026-05-16 18:28:17 - iteration 197

// minor update at 2026-05-16 18:29:53 - iteration 211
