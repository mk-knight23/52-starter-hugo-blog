/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#fcfcfc',
          light: '#f5f5f5',
          dark: '#0a0a0a',
          primary: '#ff3e00',
          secondary: '#7c3aed',
          accent: '#00d1ff',
          border: '#000000'
        }
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #000000',
        'neo-hover': '8px 8px 0px 0px #000000',
        'neo-dark': '4px 4px 0px 0px #ffffff'
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
