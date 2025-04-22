import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Permite conexiones externas
    port: 5173,       // Puerto estándar de Vite
    watch: {
      usePolling: true  // Ayuda con la detección de cambios en Docker
    },
    strictPort: true,   // Evita que Vite cambie el puerto automáticamente
    allowedHosts: ['summertec.onrender.com'] // Agrega el host permitido en Render
  }
})
