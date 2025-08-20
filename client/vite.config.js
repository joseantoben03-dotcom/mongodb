import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",   // 👈 Use localhost
    port: 3000,          // 👈 Change port
    proxy: {
      "/students": "http://localhost:5000",
    },
  },
})
