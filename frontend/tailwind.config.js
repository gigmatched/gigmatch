/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: "#09E1CE",
        },
        pink: {
          DEFAULT: "#FD54C9",
          300: "#FD54C9",
        },
        navy: "#003366",
        'soft-gray': "#F4F4F4",
        'light-silver': "#E0E0E0",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}