// Small device-capability helpers, evaluated in the browser only.
// Desktop (mouse + hover) keeps every effect; touch phones get the light path.

const mq = (query) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false;

// A real mouse/trackpad: the only case where a custom cursor makes sense.
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)');

// Phones and tablets driven by touch.
export const isTouchDevice = () => !hasFinePointer();

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)');
