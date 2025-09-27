import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import { builtinModules } from 'node:module'

export default defineConfig({
  plugins: [
    dts({ tsconfigPath: './tsconfig.json' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: './dist',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: builtinModules.flatMap(m => [m, `node:${m}`]) ,
    }
  },
})
