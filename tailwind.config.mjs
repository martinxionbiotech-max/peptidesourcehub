/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0A1628", light: "#152A4A", lighter: "#1E3A5F" },
        accent: { DEFAULT: "#C8963E", light: "#D4A84F", dark: "#A67B2A" },
        success: { DEFAULT: "#059669" },
        surface: "#F1F5F9",
        dark: "#1E293B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
