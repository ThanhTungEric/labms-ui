import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/services/hooks': path.resolve(__dirname, 'src/services/hooks'),
      '@/services/types': path.resolve(__dirname, 'src/services/types'),
    },
  },
})
