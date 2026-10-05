import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
      tailwindcss(),

  ],
  // Mirrors the production Vercel rewrite in vercel.json: the API is served
  // from the SAME origin as the app, so the admin auth cookie is first-party.
  // Safari blocks third-party cookies, which is why cross-origin login failed
  // on iPhone/iPad. Leave VITE_BACKEND_URL unset to use this path locally.
  server: {
    host: true, // expose on the LAN so a phone can reach the dev site
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        // When testing from a phone the page origin is the Mac's LAN IP, which
        // is not in the server's CORS allowlist. Send an allowlisted origin
        // upstream instead. In production Vercel forwards the real domain,
        // which is already allowlisted, so this only affects local dev.
        headers: { Origin: "http://localhost:5173" },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",
    globals: true,
  },
})
