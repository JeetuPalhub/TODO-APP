import { defineConfig } from 'vite' // Tool to help set up Vite settings
import react from '@vitejs/plugin-react' // Lets Vite understand React code

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Tell Vite to use the React plugin
})
