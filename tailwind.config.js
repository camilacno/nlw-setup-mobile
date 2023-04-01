/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        background: '#2596be',
        white: '#ffffff',
        secondary: '#0f3c4c',
        buttonPrimary: '#071e26',
        buttonSecondary: '#25a5be',
        checkbox: '#145369',
        dayHabit: '#041014',
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
