import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  name: 'react-var-ui',
  test: {
    globals: true,
    threads: false,
    environment: 'jsdom',
    setupFiles: 'test/setupTests.ts',
  },
  plugins: [react()],
}));
