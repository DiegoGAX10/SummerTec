import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    service: false
  },
  server: {
    host: '0.0.0.0',  // Permite conexiones externas
    port: 5173,   // Puerto estándar de Vite
    watch: {
      usePolling: true  // Ayuda con la detección de cambios en Docker
    },
    strictPort: true,   // Evita que Vite cambie el puerto automáticamente
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  plugins: [react()],
})