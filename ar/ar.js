/**
 * Livro HYDRA AR — WebXR hit-test, or soft AR (camera + gyro) when immersive-ar is missing.
 * Hit-test / ARButton flow matches three@0.186 examples/webxr_ar_hittest.html.
 */
import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { createHydra, loadPlaylist, runPatch } from './hydra.js';
import {
  showHint as fadeHint,
  translateArButton,
  showSoftFallback,
  checkArSupport,
  observeArButton
} from './ui.js';
import {
  createSoftController,
  cameraErrorMessage,
  HINT_SOFT_PLACE,
  HINT_SOFT_NAV,
  HINT_SOFT_NO_GYRO
} from './soft.js';

const PANEL_ASPECT = 16 / 9;
const PANEL_WIDTH = 1.2;
const PANEL_HEIGHT = PANEL_WIDTH / PANEL_ASPECT;
const PANEL_OFFSET = 0.012;
const DOUBLE_TAP_MS = 300;
const HINT_PLACE = 'Aponte para uma parede ou chão e toque para colocar';
const HINT_NAV = 'Duplo toque ← anterior · → próximo · gravar com o sistema do telefone';

const hydraCanvas = document.getElementById('hydra-canvas');
const landing = document.getElementById('landing');
const overlay = document.getElementById('ar-overlay');
const tapLayer = document.getElementById('ar-tap-layer');
const hintEl = document.getElementById('ar-hint');
const titleEl = document.getElementById('ar-title');
const closeBtn = document.getElementById('ar-close');
const repositionBtn = document.getElementById('ar-reposition');
const fallbackEl = document.getElementById('fallback');
const buttonSlot = document.getElementById('ar-button-slot');
const softEnterBtn = document.getElementById('soft-enter');
const fallbackDefaultText = fallbackEl.textContent;

let camera;
let scene;
let renderer;
let reticle;
let panel;
let hydraTexture;
let hitTestSource = null;
let hitTestSourceRequested = false;
let isPlaced = false;
let playlist = [];
let patchIndex = 0;
let lastPointerX = 0.5;
let lastPointerTapAt = 0;
let lastTapAt = 0;
let placeTimer = null;
let hintTimer = null;
let soft = null;
const unusedScale = new THREE.Vector3();
const hitNormal = new THREE.Vector3();
const worldUp = new THREE.Vector3(0, 1, 0);
const planeUp = new THREE.Vector3();
const currentUp = new THREE.Vector3();
const alignQuat = new THREE.Quaternion();

/**
 * hush() then eval the Hydra body for a wrapped playlist index.
 */
async function runPatchAt(index) {
  const total = playlist.length;
  patchIndex = ((index % total) + total) % total;
  const entry = playlist[patchIndex];
  titleEl.textContent = entry.title + ' · ' + entry.id;
  await runPatch(entry);
}

/**
 * Shows a fading PT-BR hint on the DOM overlay.
 */
function showHint(text, holdMs) {
  clearTimeout(hintTimer);
  hintTimer = fadeHint(hintEl, text, holdMs);
}

/**
 * Clears the placed panel so the next tap can hit-test again.
 */
function resetPlacement() {
  isPlaced = false;
  if (panel) panel.visible = false;
  if (reticle) reticle.visible = false;
  if (soft && soft.isActive()) soft.resetPlacement();
  repositionBtn.hidden = true;
}

/**
 * Copies a hit-test pose onto the Hydra panel and gravity-aligns vertical walls.
 */
function applyHitTransform(mesh, hitMatrix) {
  hitMatrix.decompose(mesh.position, mesh.quaternion, unusedScale);
  hitNormal.set(0, 1, 0).applyQuaternion(mesh.quaternion).normalize();
  planeUp.copy(worldUp).addScaledVector(hitNormal, -worldUp.dot(hitNormal));
  if (planeUp.lengthSq() > 0.0001) {
    planeUp.normalize();
    currentUp.set(0, 0, 1).applyQuaternion(mesh.quaternion);
    alignQuat.setFromUnitVectors(currentUp, planeUp);
    mesh.quaternion.premultiply(alignQuat);
  }
  mesh.position.addScaledVector(hitNormal, PANEL_OFFSET);
}

/**
 * Places the 16:9 Hydra plane on the current reticle hit.
 */
function placePanel() {
  if (!reticle.visible || isPlaced) return;
  applyHitTransform(panel, reticle.matrix);
  panel.scale.set(1, 1, 1);
  panel.visible = true;
  isPlaced = true;
  reticle.visible = false;
  repositionBtn.hidden = false;
  showHint(HINT_NAV, 5500);
}

/**
 * Handles a screen tap: delayed place vs double-tap playlist navigation.
 */
function handleTap(normalizedX) {
  const now = performance.now();
  if (now - lastTapAt < DOUBLE_TAP_MS) {
    clearTimeout(placeTimer);
    placeTimer = null;
    lastTapAt = 0;
    const next = normalizedX < 0.5 ? patchIndex - 1 : patchIndex + 1;
    runPatchAt(next).catch(function (err) { console.error(err); });
    return;
  }
  lastTapAt = now;
  const canPlaceNow = soft && soft.isActive() ? soft.canPlace() : (!isPlaced && reticle.visible);
  if (!canPlaceNow) return;
  clearTimeout(placeTimer);
  placeTimer = setTimeout(function () {
    placeTimer = null;
    if (soft && soft.isActive()) {
      if (soft.place()) {
        repositionBtn.hidden = false;
        showHint(HINT_SOFT_NAV, 5500);
      }
      return;
    }
    placePanel();
  }, DOUBLE_TAP_MS);
}

/**
 * Builds the Three.js scene, WebXR renderer, reticle, and Hydra panel.
 */
function createScene() {
  const container = document.getElementById('ar-root');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);
  hydraTexture = new THREE.CanvasTexture(hydraCanvas);
  hydraTexture.colorSpace = THREE.SRGBColorSpace;
  hydraTexture.minFilter = THREE.LinearFilter;
  hydraTexture.magFilter = THREE.LinearFilter;
  hydraTexture.generateMipmaps = false;
  const geometry = new THREE.PlaneGeometry(PANEL_WIDTH, PANEL_HEIGHT).rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    map: hydraTexture,
    side: THREE.DoubleSide,
    toneMapped: false
  });
  panel = new THREE.Mesh(geometry, material);
  panel.visible = false;
  scene.add(panel);
  reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial()
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);
  const controller1 = renderer.xr.getController(0);
  controller1.addEventListener('select', onSelect);
  scene.add(controller1);
  const controller2 = renderer.xr.getController(1);
  controller2.addEventListener('select', onSelect);
  scene.add(controller2);
}

/**
 * XR controller select — official hit-test example hook, with overlay-tap guard.
 */
function onSelect() {
  if (performance.now() - lastPointerTapAt < 400) return;
  handleTap(lastPointerX);
}

/**
 * Ends the current immersive AR session if one is active.
 */
function endSession() {
  const session = renderer.xr.getSession();
  if (session) session.end();
}

/**
 * Restores landing UI after the WebXR session ends.
 */
function onSessionEnd() {
  document.body.classList.remove('is-presenting');
  landing.hidden = false;
  resetPlacement();
  hitTestSourceRequested = false;
  hitTestSource = null;
  hintEl.classList.remove('show');
}

/**
 * Hides the landing page while the immersive session is presenting.
 */
function onSessionStart() {
  document.body.classList.add('is-presenting');
  landing.hidden = true;
  resetPlacement();
  showHint(HINT_PLACE, 7000);
}

/**
 * Matches three@0.186 webxr_ar_hittest: request viewer-space hit-test, pose the reticle.
 */
function animate(timestamp, frame) {
  if (hydraTexture) hydraTexture.needsUpdate = true;
  if (soft && soft.isActive()) {
    soft.update();
  } else if (frame) {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();
    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer').then(function (viewerSpace) {
        session.requestHitTestSource({ space: viewerSpace }).then(function (source) {
          hitTestSource = source;
        });
      });
      session.addEventListener('end', function () {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });
      hitTestSourceRequested = true;
    }
    if (hitTestSource && !isPlaced) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length) {
        const hit = hitTestResults[0];
        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }
    }
  }
  renderer.render(scene, camera);
}

/**
 * Keeps the non-presenting renderer sized to the viewport.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Records tap X in screen space for left/right double-tap navigation.
 */
function onOverlayPointerDown(event) {
  if (!event.isPrimary) return;
  lastPointerX = event.clientX / Math.max(1, window.innerWidth);
  lastPointerTapAt = performance.now();
  handleTap(lastPointerX);
}

/**
 * Enters camera + gyro soft AR when WebXR immersive-ar is unavailable.
 */
async function startSoftSession() {
  if (soft && soft.isActive()) return;
  fallbackEl.textContent = fallbackDefaultText;
  try {
    const result = await soft.start();
    document.body.classList.add('is-presenting');
    landing.hidden = true;
    resetPlacement();
    showHint(result.hasOrientation ? HINT_SOFT_PLACE : HINT_SOFT_NO_GYRO, 7000);
  } catch (err) {
    console.warn(err);
    fallbackEl.textContent = cameraErrorMessage(err);
    fallbackEl.classList.add('show');
  }
}

/**
 * Leaves soft AR and restores the landing page.
 */
function endSoftSession() {
  if (soft) soft.stop();
  document.body.classList.remove('is-presenting');
  landing.hidden = false;
  resetPlacement();
  hintEl.classList.remove('show');
}

/**
 * Mounts ARButton with hit-test + this page's DOM overlay, then starts Hydra.
 */
async function init() {
  createHydra(hydraCanvas);
  createScene();
  soft = createSoftController({
    camera: camera,
    scene: scene,
    hydraTexture: hydraTexture,
    videoEl: document.getElementById('soft-camera'),
    reticleEl: document.getElementById('ar-reticle'),
    panelWidth: PANEL_WIDTH,
    panelHeight: PANEL_HEIGHT
  });
  const sessionInit = {
    requiredFeatures: ['hit-test'],
    optionalFeatures: ['dom-overlay'],
    domOverlay: { root: overlay }
  };
  const arButton = ARButton.createButton(renderer, sessionInit);
  buttonSlot.appendChild(arButton);
  if (arButton.tagName === 'A') showSoftFallback(fallbackEl, softEnterBtn, arButton);
  translateArButton(arButton);
  observeArButton(arButton, fallbackEl, softEnterBtn);
  checkArSupport(fallbackEl, arButton, softEnterBtn);
  renderer.xr.addEventListener('sessionstart', onSessionStart);
  renderer.xr.addEventListener('sessionend', onSessionEnd);
  window.addEventListener('resize', onWindowResize);
  tapLayer.addEventListener('pointerdown', onOverlayPointerDown);
  softEnterBtn.addEventListener('click', function (event) {
    event.preventDefault();
    startSoftSession().catch(function (err) { console.error(err); });
  });
  closeBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    if (soft && soft.isActive()) {
      endSoftSession();
      return;
    }
    endSession();
  });
  repositionBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    resetPlacement();
    showHint(soft && soft.isActive() ? HINT_SOFT_PLACE : HINT_PLACE, 5000);
  });
  playlist = await loadPlaylist();
  try {
    await runPatchAt(0);
  } catch (err) {
    console.error(err);
  }
}

init();
