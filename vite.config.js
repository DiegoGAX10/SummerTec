import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    strictPort: true,
    hmr: {
      clientPort: 443, // Use 443 for HTTPS connections
      timeout: 120000, // Increase timeout to 2 minutes
    },
    cors: true, // Enable CORS for all origins
    allowedHosts: ['summertec.onrender.com']
  }
})