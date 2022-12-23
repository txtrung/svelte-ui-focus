import { overlayStore } from "$stores/overlay.js";

export function postMessageIframe(keyName, dataParam, isCloseOverlay = false) {
  isCloseOverlay && overlayStore.closeAll();
  const message = JSON.stringify({
    event: keyName,
    data: dataParam,
  });
  window.parent.postMessage(message, '*');
}

export function getMessageIframe(cb) {
  window.addEventListener("message", cb);
}