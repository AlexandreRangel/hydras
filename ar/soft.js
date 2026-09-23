/**
 * Soft AR for iOS Safari / non-WebXR: rear camera + DeviceOrientation.
 * Approximate world-lock only — not SLAM / hit-test.
 */
import * as THREE from 'three';

export const SOFT_PLACE_DEPTH = 1.55;
export const SOFT_PREVIEW_OPACITY = 0.78;
export const HINT_SOFT_PLACE = 'Toque para colocar o painel à sua frente';
export const HINT_SOFT_NAV = 'Duplo toque ← anterior · → próximo · gravar com o sistema do telefone';
export const HINT_SOFT_NO_GYRO = 'Toque para colocar o painel. Sem giroscópio neste aparelho — o quadro fica à frente da câmera.';

const DEG_TO_RAD = Math.PI / 180;
const frontDirection = new THREE.Vector3();

/**
 * Maps getUserMedia / play failures to a PT-BR landing message.
 */
export function cameraErrorMessage(err) {
  if (err && (err.code === 'camera-denied' || err.name === 'NotAllowedError')) {
    return 'A câmera foi recusada. No iPhone: Ajustes → Safari → Câmera. Permita o acesso e toque de novo em Entrar em modo soft.';
  }
  return 'Não foi possível abrir a câmera traseira. É preciso HTTPS e um aparelho com câmera. No iPhone, permita o acesso à câmera no Safari.';
}

/**
 * Asks iOS 13+ for DeviceOrientation access from the current user gesture.
 */
export async function requestOrientationPermission() {
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const state = await DeviceOrientationEvent.requestPermission();
      return state === 'granted';
    } catch (err) {
      console.warn('orientation permission', err);
      return false;
    }
  }
  return typeof DeviceOrientationEvent !== 'undefined';
}

/**
 * Opens the rear camera (environment) and plays it inline on iOS Safari.
 */
export async function attachRearCamera(videoEl) {
  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
    const err = new Error('camera-unavailable');
    err.code = 'camera-unavailable';
    throw err;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: 'environment' } }
    });
  } catch (firstErr) {
    if (firstErr && firstErr.name === 'NotAllowedError') {
      firstErr.code = 'camera-denied';
      throw firstErr;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    } catch (secondErr) {
      secondErr.code = secondErr.name === 'NotAllowedError' ? 'camera-denied' : 'camera-unavailable';
      throw secondErr;
    }
  }
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('webkit-playsinline', '');
  videoEl.muted = true;
  videoEl.autoplay = true;
  videoEl.playsInline = true;
  videoEl.srcObject = stream;
  try {
    await videoEl.play();
  } catch (playErr) {
    console.warn('video.play', playErr);
  }
  return stream;
}

/**
 * Stops camera tracks and detaches the video element.
 */
export function stopSoftCamera(stream, videoEl) {
  if (stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  if (videoEl) {
    videoEl.pause();
    videoEl.srcObject = null;
  }
}

/**
 * Screen angle in radians (portrait / landscape) for the orientation quaternion.
 */
function getScreenOrientationRad() {
  if (screen.orientation && typeof screen.orientation.angle === 'number') {
    return screen.orientation.angle * DEG_TO_RAD;
  }
  if (typeof window.orientation === 'number') {
    return window.orientation * DEG_TO_RAD;
  }
  return 0;
}

/**
 * Drives a Three.js camera from DeviceOrientation (three.js DeviceOrientationControls math).
 */
export function createOrientationDriver(camera) {
  let isEnabled = false;
  const zee = new THREE.Vector3(0, 0, 1);
  const euler = new THREE.Euler();
  const q0 = new THREE.Quaternion();
  const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
  function handleDeviceOrientation(event) {
    if (!isEnabled || event.alpha === null || event.beta === null || event.gamma === null) return;
    const alpha = event.alpha * DEG_TO_RAD;
    const beta = event.beta * DEG_TO_RAD;
    const gamma = event.gamma * DEG_TO_RAD;
    euler.set(beta, alpha, -gamma, 'YXZ');
    camera.quaternion.setFromEuler(euler);
    camera.quaternion.multiply(q1);
    camera.quaternion.multiply(q0.setFromAxisAngle(zee, -getScreenOrientationRad()));
  }
  return {
    start: function start() {
      isEnabled = true;
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    },
    stop: function stop() {
      isEnabled = false;
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
    }
  };
}

/**
 * Puts a 16:9 plane in front of the camera, gravity-up, facing the viewer.
 */
export function applySoftPlacement(camera, mesh, depth) {
  camera.getWorldDirection(frontDirection);
  mesh.position.copy(camera.position).addScaledVector(frontDirection, depth);
  mesh.lookAt(camera.position);
  mesh.rotateY(Math.PI);
}

/**
 * Tries document fullscreen so iPhone chrome takes less of the frame.
 */
function requestPageFullscreen() {
  const root = document.documentElement;
  const request = root.requestFullscreen || root.webkitRequestFullscreen;
  if (!request) return;
  Promise.resolve(request.call(root)).catch(function () {});
}

/**
 * Exits document fullscreen if this page requested it.
 */
function exitPageFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  if (!exit || !document.fullscreenElement) return;
  Promise.resolve(exit.call(document)).catch(function () {});
}

/**
 * Session helper: camera background, gyro camera, preview / placed Hydra panel.
 */
export function createSoftController(options) {
  const camera = options.camera;
  const scene = options.scene;
  const hydraTexture = options.hydraTexture;
  const videoEl = options.videoEl;
  const reticleEl = options.reticleEl;
  const panelWidth = options.panelWidth;
  const panelHeight = options.panelHeight;
  const placeDepth = options.placeDepth || SOFT_PLACE_DEPTH;
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(panelWidth, panelHeight),
    new THREE.MeshBasicMaterial({
      map: hydraTexture,
      side: THREE.DoubleSide,
      toneMapped: false,
      transparent: true,
      opacity: 1
    })
  );
  panel.visible = false;
  scene.add(panel);
  const orientation = createOrientationDriver(camera);
  let stream = null;
  let isActive = false;
  let isPlaced = false;
  /**
   * Shows or hides the centered CSS reticle.
   */
  function setReticleVisible(isVisible) {
    if (reticleEl) reticleEl.hidden = !isVisible;
  }
  /**
   * Unlocks the panel so the next frame / tap can preview and place again.
   */
  function resetPlacement() {
    isPlaced = false;
    panel.material.opacity = SOFT_PREVIEW_OPACITY;
    panel.visible = isActive;
    setReticleVisible(isActive);
  }
  /**
   * Locks the panel in front of the current camera pose.
   */
  function place() {
    if (!isActive || isPlaced) return false;
    applySoftPlacement(camera, panel, placeDepth);
    panel.visible = true;
    panel.material.opacity = 1;
    isPlaced = true;
    setReticleVisible(false);
    return true;
  }
  /**
   * Follows the camera with a translucent preview until the first place.
   */
  function update() {
    if (!isActive || isPlaced) return;
    applySoftPlacement(camera, panel, placeDepth);
    panel.visible = true;
  }
  /**
   * Starts camera + orientation from a tap (permissions must stay on this gesture).
   */
  async function start() {
    if (isActive) return { hasOrientation: true };
    const orientationPromise = requestOrientationPermission();
    document.body.classList.add('is-soft');
    try {
      const settled = await Promise.allSettled([orientationPromise, attachRearCamera(videoEl)]);
      const orientationResult = settled[0];
      const cameraResult = settled[1];
      if (cameraResult.status === 'rejected') {
        document.body.classList.remove('is-soft');
        throw cameraResult.reason;
      }
      stream = cameraResult.value;
      const hasOrientation = orientationResult.status === 'fulfilled' && orientationResult.value === true;
      orientation.start();
      isActive = true;
      resetPlacement();
      requestPageFullscreen();
      return { hasOrientation: hasOrientation };
    } catch (err) {
      document.body.classList.remove('is-soft');
      throw err;
    }
  }
  /**
   * Tears down camera, gyro, preview, and optional fullscreen.
   */
  function stop() {
    isActive = false;
    isPlaced = false;
    orientation.stop();
    stopSoftCamera(stream, videoEl);
    stream = null;
    panel.visible = false;
    setReticleVisible(false);
    camera.position.set(0, 0, 0);
    camera.quaternion.identity();
    document.body.classList.remove('is-soft');
    exitPageFullscreen();
  }
  return {
    start: start,
    stop: stop,
    update: update,
    place: place,
    resetPlacement: resetPlacement,
    isActive: function isSoftActive() { return isActive; },
    isPlaced: function isSoftPlaced() { return isPlaced; },
    canPlace: function canSoftPlace() { return isActive && !isPlaced; }
  };
}
