import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  build: { target: 'es2020' },
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 3010,
      clientPort: 3010,
    },
  },
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: false,
      include: ['../../**/src/**/*.ts', '../../**/src/**/*.tsx'],
    }),
  ],
})
