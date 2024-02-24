import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Customize build behavior, including environment variable injection
    // Example: Specify additional environment variables or transformations
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
    },
  },
})
