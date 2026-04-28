import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['color-functions', 'import', 'global-builtin'],
      },
    },
  },
  server: {
    port: 4200,
  },
});
