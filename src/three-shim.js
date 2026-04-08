// Mutable THREE namespace shim.
//
// The legacy r80 helpers in src/client/three/* (Projector, CanvasRenderer,
// TrackballControls, etc.) attach themselves to the THREE namespace via
// `THREE.Foo = function() {}`. Under ESM the `import * as THREE` namespace
// is frozen, so those assignments silently fail and `new THREE.Projector()`
// crashes at runtime.
//
// This shim copies the real three exports onto a plain mutable object once
// and exports it as the default. Vite aliases the bare `'three'` specifier
// to this file so every consumer shares one mutable namespace.
//
// We import from `three/build/three.js` directly so the alias does not loop.
import * as ThreeOriginal from 'three/build/three.js';

const THREE = Object.assign({}, ThreeOriginal);

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

export default THREE;
