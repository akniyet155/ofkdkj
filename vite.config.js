import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: GitHub Pages needs repo subpath, Vercel/localhost stay at root
const base = process.env.VITE_BASE
  ?? (process.env.VERCEL ? '/' : '/ofkdkj/')

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'hls-vendor': ['hls.js']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
})
