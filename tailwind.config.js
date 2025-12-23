/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend:{
      fontFamily: {
      inknut: ['"Inknut Antiqua"', 'serif'],
    },
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      sj: "890px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1900px",
    },
    }
  },
  plugins: [],
};
