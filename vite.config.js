import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getGeometryRoughness } from 'three/src/nodes/TSL.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    host: true,
    allowedHosts: ['70c3-2806-2f0-3481-fe68-ddbf-46c-b92a-2f89.ngrok-free.app'],
  },
})