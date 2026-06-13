import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Full-page scroll hook — one section at a time.
 * Sections slide in from bottom to top.
 */
export default function useFullPageScroll(totalSections) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const isAnimating = useRef(false);
  const lockUntil = useRef(0);

  const goTo = useCallback((index) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= totalSections) return;
    const now = Date.now();
    if (now < lockUntil.current) return;
    lockUntil.current = now + 900;
    isAnimating.current = true;
    setDirection(index > current ? 1 : -1);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => { isAnimating.current = false; }, 900);
  }, [current, totalSections]);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const back = useCallback(() => goTo(current - 1), [goTo, current]);

  // Helper: is a popup/overlay open?
  const isOverlayOpen = () => !!document.querySelector('.fp-popup-overlay');

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      if (isOverlayOpen()) return;
      // Allow native scroll in catalog/carpenter scroll containers
      const target = e.target;
      const scrollable = target.closest('.catalog-scroll, .carpenter-scroll');
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop = scrollTop === 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
          e.preventDefault();
          if (e.deltaY > 0) next(); else back();
        }
        return;
      }
      e.preventDefault();
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) back();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, back]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (isOverlayOpen()) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 50) next();
      else if (dy < -50) back();
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [next, back]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (isOverlayOpen()) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') next();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, back]);

  return { current, prev, direction, goTo, next, back };
}
