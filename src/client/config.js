import THREE from 'three';
import Detector from './three/Detector';

const mapVersion = '5.1.1.5';



const config = {
  usesWebGL: Detector.webgl,
  isTouchDevice: ('ontouchstart' in document.documentElement),
  isMac: navigator.platform.toUpperCase().indexOf('MAC') >= 0,

  logTerminalVisible: false,
  statsVisible: false,

  rendererContainer: '#container',

  visaRequirementsFile: CDN_URL + VISA_REQUIREMENTS_URL,

  mergeDataFromMapDataFile2: false,
  mergeDataFromDisputedAreasFile: true,
  // mapDataFile: CDN_URL + 'map/5.1.1/country_data.json?v=' + mapVersion,
  mapDataFile: CDN_URL + 'map/5.1.1/ne_50m_admin_0_countries.json?v=' + mapVersion,
  mapDataFile2: CDN_URL + '', // add countries from this higher res file and merge into: ne_50m_admin_0_countries_simplified
  disputedAreasFile: CDN_URL + 'map/5.1.1/ne_10m_admin_0_disputed_areas.json?v=' + mapVersion,

  saveMapData: false,
  saveURL: 'http://dev.local/save-to-file/index.php',
  mergedCountriesFilename: 'country_data.json',

  introRotateDuration: 2000, // 4000
  introWarpDelay: 500, // 2000
  introWarpDuration: 2000, // 2500

  lineAnimateDuration: 800,
  lineAnimateSpeed: 10.0,
  lineDashOffsetLimit: 5.3,

  updateColorsDuration: 800,

  viewSwitchDuration: 800,

  geoScale: 150, // 115
  mapOffsetX: -540, // -500
  mapOffsetY: 160, // 160
  globeRadius: 180,
  globeRotationX: -2.25,
  globeRotationY: 1.7,

  extrudeEnabled: false,
  extrudeDepth: 0.05,

  tesselationEnabled: false,
  tesselationMaxEdgeLength: 5,
  tesselationIterations: 8,

  cameraFOV: 60.0,
  cameraDistance: 500.0,
  cameraDistanceMin2D: 50.0,
  cameraDistanceMin: 250.0,
  cameraDistanceMax: 1000.0,

  sphereEnabled: false,
  sphereVisible: false,

  // Base map colors. Default fill is dark slate so any visa state stands
  // out clearly against it; hover/selected stay white for contrast.
  colorCountryDefault: new THREE.Color(0x1e293b),
  colorCountryHover: new THREE.Color(0xFFFFFF),
  colorCountrySelected: new THREE.Color(0xFFFFFF),

  // Visa-state palette ordered loosely "easiest to hardest". Cool greens
  // for free travel, warm yellows/ambers for limited entry, reds for
  // restricted, violet for special arrangements, slate for unknown.
  colorVisaNotRequired: new THREE.Color(0x22c55e),     // green-500
  colorVisaOnArrival: new THREE.Color(0x84cc16),       // lime-500
  colorVisaETA: new THREE.Color(0xfacc15),             // yellow-400
  colorVisaFreeEU: new THREE.Color(0x14b8a6),          // teal-500
  colorVisaRequired: new THREE.Color(0xef4444),        // red-500
  colorVisaSpecial: new THREE.Color(0xa855f7),         // purple-500
  colorVisaAdmissionRefused: new THREE.Color(0x7f1d1d),// red-900
  colorVisaDataNotAvailable: new THREE.Color(0x475569),// slate-600

  // Heatmap gradient (used by destinations / GDP / population modes).
  // Indigo-950 → amber-400 gives a perceptually wide range and stays
  // legible on the dark base map.
  colorZeroDestinations: new THREE.Color(0x1e1b4b),
  colorMaxDestinations: new THREE.Color(0xfacc15),

  materialSphere: new THREE.MeshPhongMaterial({ color: 0x888888, transparent: false, opacity: 1.0, wireframe: false, shading: THREE.SmoothShading, side: THREE.DoubleSide }),

  materialMap: new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: 0xFFFFFF, shininess: 5, transparent: true, opacity: 0.9, side: THREE.DoubleSide, vertexColors: THREE.VertexColors } )

};


// only for non-BufferedGeometries:
config.materialCountryDefault = new THREE.MeshPhongMaterial({ color: config.colorCountryDefault, transparent: false, wireframe: false, shading: THREE.SmoothShading, side: THREE.DoubleSide });

var lighten = function(color) {
  var lightenColor = new THREE.Color(0x333333);
  return color.clone().add(lightenColor);
};

// Chrome and Firefox seem to ignore linewidth when using WebGLRenderer:
config.materialCountryBorder = new THREE.LineBasicMaterial( { color: 0xFFFFFF, linewidth: 1.5 } );
config.materialCountryBorderDisputed = new THREE.LineBasicMaterial( { color: 0x444444, linewidth: 2.0 } );
config.materialLineDefault = new THREE.LineDashedMaterial( { color: lighten(config.colorCountryDefault), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaNotRequired = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaNotRequired), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaOnArrival = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaOnArrival), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaETA = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaETA), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaFreeEU = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaFreeEU), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaRequired = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaRequired), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaSpecial = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaSpecial), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaAdmissionRefused = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaAdmissionRefused), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending
config.materialLineVisaDataNotAvailable = new THREE.LineDashedMaterial( { color: lighten(config.colorVisaDataNotAvailable), linewidth: 1.2, dashSize: 3, gapSize: 2, opacity: 0.5, transparent: true } ); // blending: THREE.AdditiveBlending


export default config;
