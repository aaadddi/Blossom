export const colors = {
  // Primary Solana colors
  solana: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Main Solana purple
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  // Secondary blue colors
  ocean: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main Solana blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  // Accent colors
  accent: {
    purple: '#8b5cf6', // Solana purple
    blue: '#0ea5e9',   // Solana blue
    green: '#10b981',  // Success green
    red: '#ef4444',    // Error red
    yellow: '#f59e0b', // Warning yellow
  }
} as const;

// Type for the colors object
export type Colors = typeof colors;

// Helper function to get color values
export const getColor = (color: keyof Colors, shade?: number) => {
  if (shade) {
    return colors[color][shade as keyof typeof colors[typeof color]];
  }
  return colors[color];
}; 