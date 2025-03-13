import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: 5173,       // Default Vite port
    watch: {
      usePolling: true  // Helps with file change detection in Docker
    }
  }
})
