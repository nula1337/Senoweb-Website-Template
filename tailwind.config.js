/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize, screens } from 'fluid-tailwind'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: "selector",
  content: {
    files: ["./src/**/*.{html,njk,js}"],
    extract,
  },
  theme: {
    fontSize: fontSize,
    screens: screens,
    extend: {
      fontFamily: {
        "sans": ["Oswald", defaultTheme.fontFamily.sans],
        "work-sans": ["Work Sans", defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "#3B82F6"
      }
    },
  },
  plugins: [
    fluid,
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}