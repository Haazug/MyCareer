import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import fixturesHandler from './api/fixtures';

function fixturesDevApi(): Plugin {
  return {
    name: 'mycareer-fixtures-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/fixtures', async (req, res) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const query = Object.fromEntries(url.searchParams.entries());
        await fixturesHandler({ method: req.method, query }, {
          status(code) { res.statusCode = code; return this; },
          setHeader(name, value) { res.setHeader(name, value); },
          json(value) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), fixturesDevApi()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three-engine';
        },
      },
    },
  },
});
