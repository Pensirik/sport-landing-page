import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        topBarHeight: '60px',
      },
      zIndex: {
        topBar: '20',
      },
      colors: {
        'primary-purple': '#5E3DB3',
        'secondary-purple': '#F5F4F9',
        'ternary-purple': '#090C35',
        'typo-header': '#E7E7E7',
        'typo-title': '#C2C2C2',
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} as Config;
