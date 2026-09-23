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
 * Shows the unsupported-device message and hides the English ARButton fallback.
 */
export function showUnsupportedFallback(fallbackEl, button) {
  fallbackEl.classList.add('show');
  if (button) button.hidden = true;
}

/**
 * Checks immersive-ar support and reveals the PT-BR fallback when missing.
 */
export async function checkArSupport(fallbackEl, button) {
  if (window.isSecureContext === false || !navigator.xr || typeof navigator.xr.isSessionSupported !== 'function') {
    showUnsupportedFallback(fallbackEl, button);
    return;
  }
  try {
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) showUnsupportedFallback(fallbackEl, button);
  } catch (err) {
    console.warn(err);
    showUnsupportedFallback(fallbackEl, button);
  }
}

/**
 * Keeps ARButton text in PT-BR and hides English unsupported labels.
 */
export function observeArButton(button, fallbackEl) {
  const observer = new MutationObserver(function () {
    translateArButton(button);
    if (UNSUPPORTED_RE.test(button.textContent || '')) {
      showUnsupportedFallback(fallbackEl, button);
    }
  });
  observer.observe(button, { characterData: true, childList: true, subtree: true });
  return observer;
}
