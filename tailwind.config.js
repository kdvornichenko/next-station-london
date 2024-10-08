import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // Подключаем компоненты NextUI
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'custom': '5px 5px 40px var(--tw-shadow-color)',
      },
      backdropFilter: {
        'blur-custom': 'blur(3px)',
      },
      backgroundImage: {
        // Определяем кастомный градиент
        'button-gradient': 'linear-gradient(90deg, #ED127B, #602F93, #00ADEF, #40B93C)',
      },
      colors: {
        primary: '#45D483',
        'metro-pink': '#ED127B',
        'metro-purple': '#602F93',
        'metro-blue': '#00ADEF',
        'metro-green': '#40B93C',
        'card-red': '#FF1D5C',
        'card-blue': '#7DBAD7',
        'current-color': 'var(--nsl-current-color)'
      },
      animation: {
        'dash-animation': 'dash-spin 1s infinite linear',
        'gradient-shift': 'gradient-shift 15s infinite ease-in-out',
        'bg-fade': 'bg-fade 10s infinite ease-in-out',
        'border-fade': 'border-fade 5s infinite ease-in-out',
      },
      keyframes: {
        'dash-spin': {
          '0%': { 'stroke-dashoffset': 0 },
          '100%': { 'stroke-dashoffset': 16 },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'bg-fade': {
          '0%': { backgroundColor: '#ED127B' },
          '25%': { backgroundColor: '#602F93' },
          '50%': { backgroundColor: ' #00ADEF' },
          '75%': { backgroundColor: ' #40B93C' },
          '100%': { backgroundColor: ' #ED127B' }
        },
        'border-fade': {
          '0%': { borderColor: '#ED127B' },
          '25%': { borderColor: '#602F93' },
          '50%': { borderColor: ' #00ADEF' },
          '75%': { borderColor: ' #40B93C' },
          '100%': { borderColor: ' #ED127B' }
        }
      },
    },
  },
  darkMode: 'class', // Поддержка темной темы
  plugins: [
    nextui(),
    function ({ addComponents }) {
      addComponents({
        '.score-field': {
          width: '100%',
          height: '100%',
          textAlign: 'center',
          color: 'black',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        },
      });
    },
  ],
};
