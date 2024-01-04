import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

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
        '@uiw/react-color-sketch',
        'react-use-pointer-drag',
        'react/jsx-runtime',
      ],
    },
  },
  plugins: [
    {
      ...typescript(),
      apply: 'build',
    } as any,
    react({ jsxRuntime: 'classic' }),
  ],
}));
