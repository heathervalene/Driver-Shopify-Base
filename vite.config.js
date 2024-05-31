import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import cleanup from '@by-association-only/vite-plugin-shopify-clean'

export default defineConfig({
  build: { 
    emptyOutDir: false,
    sourcemap: true
  }, 
  plugins: [
    cleanup(), 
    shopify({
        snippetFile: 'vite.liquid',
    })
  ]
})
