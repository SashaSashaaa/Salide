import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/static/dist",
  build: {
    outDir: "../backend/server/static/dist",
    // minify: false,
  },
  server:{
    port: 3000,
    proxy:{
      "/api": "http://localhost:8000",
      "/media": "http://localhost:8000",
    },
  },
  resolve:{
    alias: {
      "@": "/src/",
    },
  },
})
