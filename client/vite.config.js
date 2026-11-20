import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, el front corre en el puerto 5173 y la API en el 3000.
    // El proxy hace que un fetch("/books") del front se reenvíe a la API.
    proxy: {
      '/books': 'http://localhost:3000'
    }
  }
})
