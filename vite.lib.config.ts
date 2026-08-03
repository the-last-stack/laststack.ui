import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    outDir: 'dist-lib',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        color: resolve(__dirname, 'src/color/index.ts'),
      },
      formats: ['es'],
      // Named, not derived: with more than one entry the default is the package
      // name, and the banner below imports this by path.
      cssFileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        // Only the component entry carries the stylesheet. `color` is imported
        // by React Native, where a CSS import is a build error.
        banner: (chunk) => (chunk.name === 'index' ? "import './index.css';" : ''),
      },
    },
  },
})
