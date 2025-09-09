import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './public/manifest.json'

console.log(manifest)
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        "short_name": "FF*K",
        "name": "FACEF*CK",
        "icons": [
          {
            "src": "icon.ico",
            "sizes": "48x48",
            "type": "image/x-icon",
            "purpose": "maskable"
          },
          {
            "src": "icon.png",
            "type": "image/png",
            "sizes": "379x379",
            "purpose": "any"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "lang": "english",
        "orientation": "portrait",
        "theme_color": "CornflowerBlue",
        "background_color": "black"
      },
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