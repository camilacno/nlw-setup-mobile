/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        background: '#0C6B7C',

        white: '#ffffff',
        secondary: '#95B0B7',
        buttonPrimary: '#324A51',
        buttonSecondary: '#95B0B7',
        checkbox: '#33a1b8',
      },
      fontFamily: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold',
      },
    },
  },
  plugins: [],
}
