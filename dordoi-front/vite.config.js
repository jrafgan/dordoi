import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  define: {
    'process.env': {
      ...process.env,
      VITE_APP_JASHYRUUN_ACHKYCH: JSON.stringify(process.env.VITE_APP_JASHYRUUN_ACHKYCH),
      VITE_APP_LS_KEY: JSON.stringify(process.env.VITE_APP_LS_KEY),
      VITE_APP_API_URL: JSON.stringify(process.env.VITE_APP_API_URL),
    },
  },
})
