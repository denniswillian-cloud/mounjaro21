import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  define: {
    // Expõe as variáveis sincronizadas pelo Supabase↔Vercel para o cliente Vite
    __SUPABASE_URL__: JSON.stringify(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    ),
    __SUPABASE_ANON_KEY__: JSON.stringify(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    ),
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
