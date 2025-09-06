// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], // ← this line is required!
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: "#151312",
        accent: "#AB8BFF",
        light:{
          100: "#d6c6ff",
          200:"#A8b5db",
          300:"#9cavab"
        },
        dark:{
          100:"#221f3d",
          200:"#0f0d23"
        }

      }
    },
  },
  plugins: [],
}
