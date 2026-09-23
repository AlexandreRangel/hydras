/**
 * PT-BR overlay hints and ARButton label/fallback handling.
 */
const UNSUPPORTED_RE = /NOT SUPPORTED|NOT ALLOWED|NOT AVAILABLE|NEEDS HTTPS/i;

/**
 * Shows a fading PT-BR hint on the DOM overlay.
 */
export function showHint(hintEl, text, holdMs) {
  hintEl.textContent = text;
  hintEl.classList.add('show');
  if (!holdMs) return null;
  return setTimeout(function () {
    hintEl.classList.remove('show');
  }, holdMs);
}

/**
 * Applies PT-BR labels to the three.js ARButton after it mutates its text.
 */
export function translateArButton(button) {
  const text = button.textContent || '';
  if (text === 'START AR') button.textContent = 'Entrar em AR';
  else if (text === 'STOP AR') button.textContent = 'Sair de AR';
}

/**
 * Labels the soft-AR enter button (iPhone vs other non-WebXR clients).
 */
export function labelSoftButton(button) {
  const isiOS = /iP(hone|ad|od)/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  button.textContent = isiOS ? 'Entrar (modo iOS)' : 'Entrar em modo soft';
  button.setAttribute('aria-label', button.textContent);
}

/**
 * Shows the unsupported-device message and hides the English ARButton fallback.
 */
export function showUnsupportedFallback(fallbackEl, button) {
  fallbackEl.classList.add('show');
  if (button) button.hidden = true;
}

/**
 * Reveals modo soft as the primary action when immersive-ar is missing.
 */
export function showSoftFallback(fallbackEl, softButton, arButton) {
  showUnsupportedFallback(fallbackEl, arButton);
  if (softButton) {
    labelSoftButton(softButton);
    softButton.hidden = false;
  }
}

/**
 * Checks immersive-ar support and reveals the PT-BR fallback when missing.
 */
export async function checkArSupport(fallbackEl, button, softButton) {
  if (window.isSecureContext === false || !navigator.xr || typeof navigator.xr.isSessionSupported !== 'function') {
    showSoftFallback(fallbackEl, softButton, button);
    return false;
  }
  try {
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
      showSoftFallback(fallbackEl, softButton, button);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(err);
    showSoftFallback(fallbackEl, softButton, button);
    return false;
  }
}

/**
 * Keeps ARButton text in PT-BR and hides English unsupported labels.
 */
export function observeArButton(button, fallbackEl, softButton) {
  const observer = new MutationObserver(function () {
    translateArButton(button);
    if (UNSUPPORTED_RE.test(button.textContent || '')) {
      showSoftFallback(fallbackEl, softButton, button);
    }
  });
  observer.observe(button, { characterData: true, childList: true, subtree: true });
  return observer;
}
