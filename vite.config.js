import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './public/manifest.json'


export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      manifest,
      srcDir: 'src', // Update if your service-worker.js is elsewhere
      filename: 'service-worker.js', // Ensure it's accessible in production
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/.*\.png$/, // Example pattern for caching png images
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
              },
            },
          },
        ],
      },
    })],
})