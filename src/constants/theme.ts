import { vars } from 'nativewind';
import { Platform } from 'react-native';

/**
 * Primary color palette - generated from #F54927
 * Source: https://www.tints.dev/primary/F54927
 */
export const primary = {
  50: '#FEF1F0',
  100: '#FDDEDD',
  200: '#FBC1BD',
  300: '#FA9D96',
  400: '#F87669',
  500: '#F54927',  // Base color
  600: '#C3381D',
  700: '#952913',
  800: '#691A0A',
  900: '#3D0B03',
  950: '#2C0602',
} as const;

/**
 * Semantic colors
 */
export const semantic = {
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
} as const;

/**
 * Light theme values
 */
const lightTheme = {
  background: '#FFFFFF',
  surface: '#F8F8F8',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
};

/**
 * Dark theme values
 */
const darkTheme = {
  background: '#0D0D0D',
  surface: '#1A1A1A',
  card: '#262626',
  text: '#FAFAFA',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  border: '#3F3F46',
  borderLight: '#27272A',
};

/**
 * CSS Variables for NativeWind runtime theming
 */
export const themes = {
  light: vars({
    // Primary
    '--color-primary-50': primary[50],
    '--color-primary-100': primary[100],
    '--color-primary-200': primary[200],
    '--color-primary-300': primary[300],
    '--color-primary-400': primary[400],
    '--color-primary-500': primary[500],
    '--color-primary-600': primary[600],
    '--color-primary-700': primary[700],
    '--color-primary-800': primary[800],
    '--color-primary-900': primary[900],
    '--color-primary-950': primary[950],
    // Semantic
    '--color-success': semantic.success,
    '--color-warning': semantic.warning,
    '--color-error': semantic.error,
    '--color-info': semantic.info,
    // Theme
    '--color-background': lightTheme.background,
    '--color-surface': lightTheme.surface,
    '--color-card': lightTheme.card,
    '--color-text': lightTheme.text,
    '--color-text-secondary': lightTheme.textSecondary,
    '--color-text-muted': lightTheme.textMuted,
    '--color-border': lightTheme.border,
    '--color-border-light': lightTheme.borderLight,
  }),
  dark: vars({
    // Primary
    '--color-primary-50': primary[50],
    '--color-primary-100': primary[100],
    '--color-primary-200': primary[200],
    '--color-primary-300': primary[300],
    '--color-primary-400': primary[400],
    '--color-primary-500': primary[500],
    '--color-primary-600': primary[600],
    '--color-primary-700': primary[700],
    '--color-primary-800': primary[800],
    '--color-primary-900': primary[900],
    '--color-primary-950': primary[950],
    // Semantic
    '--color-success': semantic.success,
    '--color-warning': semantic.warning,
    '--color-error': semantic.error,
    '--color-info': semantic.info,
    // Theme
    '--color-background': darkTheme.background,
    '--color-surface': darkTheme.surface,
    '--color-card': darkTheme.card,
    '--color-text': darkTheme.text,
    '--color-text-secondary': darkTheme.textSecondary,
    '--color-text-muted': darkTheme.textMuted,
    '--color-border': darkTheme.border,
    '--color-border-light': darkTheme.borderLight,
  }),
};

/**
 * Legacy Colors export for Expo components compatibility
 */
export const Colors = {
  light: {
    text: lightTheme.text,
    background: lightTheme.background,
    tint: primary[500],
    icon: lightTheme.textSecondary,
    tabIconDefault: lightTheme.textMuted,
    tabIconSelected: primary[500],
  },
  dark: {
    text: darkTheme.text,
    background: darkTheme.background,
    tint: primary[400],
    icon: darkTheme.textSecondary,
    tabIconDefault: darkTheme.textMuted,
    tabIconSelected: primary[400],
  },
};

/**
 * Font families per platform
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
