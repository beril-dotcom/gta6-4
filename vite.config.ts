import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { enterDevPlugin, enterProdPlugin } from 'vite-plugin-enter-dev';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'serve'
      ? enterDevPlugin({ react: false })
      : enterProdPlugin({ injectGoogleFonts: false })),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
}));
