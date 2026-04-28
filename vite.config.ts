import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "variables" as *;\n`,
        loadPaths: ['./src-react/styles'],
      },
    },
  },
  server: {
    port: 4200,
  },
});
