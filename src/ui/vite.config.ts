import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: process.env.VITE_BASE_URL || '/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../../src'),
      '@shared': path.resolve(__dirname, '../../src/shared'),
      '@ui-shared': path.resolve(__dirname, './shared'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist-benchmark'),
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        comparison: path.resolve(__dirname, 'comparison/index.html'),
        'comparison-af': path.resolve(__dirname, 'comparison-af/index.html'),
        aggregated: path.resolve(__dirname, 'aggregated/index.html'),
      },
    },
  },
});
