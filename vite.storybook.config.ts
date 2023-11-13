import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'] as any,
    },
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          return assetInfo.name === 'style.css' ? 'index.css' : assetInfo.name!;
        },
      },
      external: [
        'react',
        'react-dom',
        'filesize',
        'radash',
        'react-color',
        'react-use-pointer-drag',
        'react/jsx-runtime',
      ],
    },
  },
  plugins: [react({ jsxRuntime: 'classic' })],
}));
