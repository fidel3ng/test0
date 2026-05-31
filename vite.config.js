import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['JSCPP']
  },
  build: {
    commonjsOptions: {
      include: [/JSCPP/, /node_modules/]
    }
  }
})
