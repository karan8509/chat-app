import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.39',  // Allows external access
    port: 5173,  // Aap apna desired port number yahan set kar sakte hain
  },
})
