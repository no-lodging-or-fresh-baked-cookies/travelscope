import { defineConfig } from 'vite';
import { resolve } from 'path';

// Vite migration of the legacy Gulp+Browserify pipeline.
// Source code under src/ is intentionally left untouched in this step;
// jQuery/Three/D3 modernization happens in later steps.
export default defineConfig({
  root: 'src',
  // Existing static assets (data/, assets/, favicons, etc.) live in ../public.
  publicDir: resolve(__dirname, 'public'),
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: [
      // Route bare `three` imports through a mutable shim so the legacy
      // r80 helpers can attach themselves to the namespace. Exact match
      // only — `three/build/three.js` inside the shim must still resolve.
      { find: /^three$/, replacement: resolve(__dirname, 'src/three-shim.js') },
      // d3 v3's UMD uses top-level `this`; load via <script> and shim.
      { find: /^d3$/, replacement: resolve(__dirname, 'src/d3-shim.js') },
    ],
  },
});
