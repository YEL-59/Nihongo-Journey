import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        warm: '#FDFBF7',
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5', // Main Primary Indigo
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        sakura: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F472B6',
          400: '#F43F5E',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
        },
        torii: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#F43F5E',
          600: '#E11D48', // Torii Vermilion
          700: '#BE123C',
        },
        matcha: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981', // Nature Green
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'Hind Siliguri', 'sans-serif'],
        japanese: ['Noto Sans JP', 'Hiragino Sans', 'sans-serif'],
        bengali: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        glow: '0 0 25px -5px rgba(79, 70, 229, 0.25)',
        'sakura-glow': '0 0 20px -3px rgba(236, 72, 153, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
