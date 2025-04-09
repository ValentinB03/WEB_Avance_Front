import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {           //Accès au site depuis un autre appareil sur le même réseau
    host: true,
    port: 5173,
  },
})
