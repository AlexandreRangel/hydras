/**
 * Hidden-canvas hydra-synth + playlist loader for the AR page.
 */
const AR_BASE = new URL('.', import.meta.url);
const HYDRA_WIDTH = 1280;
const HYDRA_HEIGHT = 720;

export const FALLBACK_PLAYLIST = [
  { id: '2025-11-10', title: 'Hydra Daydream' },
  { id: '2025-09-11', title: 'Bandeiras MOTIM' }
];

/**
 * Resolves a file next to this module (works with or without a trailing slash).
 */
export function arUrl(fileName) {
  return new URL(fileName, AR_BASE);
}

/**
 * Starts hydra-synth on the hidden 16:9 canvas used as a CanvasTexture.
 */
export function createHydra(hydraCanvas) {
  hydraCanvas.width = HYDRA_WIDTH;
  hydraCanvas.height = HYDRA_HEIGHT;
  return new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    makeGlobal: true,
    width: HYDRA_WIDTH,
    height: HYDRA_HEIGHT,
    preserveDrawingBuffer: true
  });
}

/**
 * Fetches playlist.json, falling back to The Wall entries if the request fails.
 */
export async function loadPlaylist() {
  try {
    const res = await fetch(arUrl('playlist.json'));
    if (!res.ok) throw new Error('playlist ' + res.status);
    const data = await res.json();
    if (data && Array.isArray(data.patches) && data.patches.length) {
      return data.patches;
    }
  } catch (err) {
    console.warn('playlist', err);
  }
  return FALLBACK_PLAYLIST.slice();
}

/**
 * hush() then eval the paste-ready Hydra body for one playlist entry.
 */
export async function runPatch(entry) {
  const res = await fetch(arUrl('patches/' + entry.id + '.js'));
  if (!res.ok) throw new Error('patch ' + entry.id);
  const code = await res.text();
  if (typeof hush === 'function') hush();
  await new Function('return (async () => {\n' + code + '\n})();')();
}
