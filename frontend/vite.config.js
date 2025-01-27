import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port:3000
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "rgb(103, 181, 233)",
          "secondary": "rgb(24, 24, 24)",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  }
})
