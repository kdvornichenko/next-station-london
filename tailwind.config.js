import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        'dash-animation': 'dash-spin 1s infinite linear',
      },
      keyframes: {
        'dash-spin': {
          '0%': { 'stroke-dashoffset': 0 },
          '100%': { 'stroke-dashoffset': 16 },
        }
      }
    },
  },
  darkMode: "class",
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
      })
    }
  ],
}
