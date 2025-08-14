/** @type {import('tailwindcss').Config} */ // This helps with autocomplete in editors
export default {
  content: [
    "./index.html", // Look in this file for Tailwind class names
    "./src/**/*.{js,ts,jsx,tsx}", // Look in all JS/TS/JSX/TSX files inside src folder
  ],
  theme: {
    extend: {}, // Here we can add new styles or change existing ones
  },
  plugins: [], // Extra tools for Tailwind can go here
}
