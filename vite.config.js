import { defineConfig } from 'vite';

export default defineConfig({
  base: '/2025/', // Base URL for deployment
  build: {
    outDir: 'dist', // Output directory (default)
  },
});