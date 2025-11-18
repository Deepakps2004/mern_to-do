import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // When Vite sees a request starting with /api...
      '/api': {
        target: 'http://localhost:5000', // ...forward it to your local backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' so backend sees just '/todos'
      }
    }
  }
})