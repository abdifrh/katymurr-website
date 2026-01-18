/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4F1E9',
        warm: '#D69B71',
        accent: '#9A4818',
        dark: '#674439',
        white: '#FFFFFF',
      },
      fontFamily: {
        primary: ['Lora', 'Georgia', 'serif'],
        secondary: ['Georgia', 'Times New Roman', 'serif'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
        xxl: '6rem',
      },
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
}

