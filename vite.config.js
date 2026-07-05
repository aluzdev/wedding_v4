import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // WSL2 + archivos en /mnt/c: los eventos del FS de Windows no llegan
      // a Linux, así que sondeamos los archivos para detectar cambios.
      usePolling: true,
      interval: 100,
    },
  },
})
