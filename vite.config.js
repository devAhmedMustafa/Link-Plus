import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import dotenv from "dotenv"

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/components/containers'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
})
