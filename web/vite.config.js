import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Since we are hosting on Github Pages (which use Git), we need to minimize the
        // number of files each build changes.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          return null;
        },
      },
    },
  },
});
