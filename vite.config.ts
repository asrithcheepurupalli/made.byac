import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          offer: path.resolve(__dirname, 'offer.html'),
          ai: path.resolve(__dirname, 'ai.html'),
          kitchen: path.resolve(__dirname, 'kitchen.html'),
          work: path.resolve(__dirname, 'work.html'),
          labs: path.resolve(__dirname, 'labs.html'),
          laws: path.resolve(__dirname, 'laws.html'),
          live: path.resolve(__dirname, 'live.html'),
          system: path.resolve(__dirname, 'system.html'),
          worth: path.resolve(__dirname, 'worth.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
