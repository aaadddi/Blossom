import type { Config } from 'tailwindcss';
import { colors } from './styles/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        solana: colors.solana,
        ocean: colors.ocean,
        accent: colors.accent,
      },
    },
  },
  plugins: [],
};

export default config; 