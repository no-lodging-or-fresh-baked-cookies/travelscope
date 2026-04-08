// d3 v3 ships a UMD bundle that uses top-level `this` to refer to `window`.
// Vite wraps deps as ESM where top-level `this` is `undefined`, which crashes
// d3 at module load. We sidestep that by loading d3.min.js with a classic
// <script> tag in index.html (real script context, `this === window`) and
// re-exporting the resulting global from this shim. Vite aliases the bare
// `d3` specifier to this file.
const d3 = typeof window !== 'undefined' ? window.d3 : undefined;

if (!d3) {
  throw new Error('[d3-shim] window.d3 is not defined — did the <script> tag for d3.min.js fail to load?');
}

export default d3;
