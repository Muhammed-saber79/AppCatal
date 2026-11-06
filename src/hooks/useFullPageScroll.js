import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Full-page scroll hook — one section at a time.
 * Sections slide in from bottom to top.
 */
export default function useFullPageScroll(totalSections, initial = 0) {
  const [current, setCurrent] = useState(initial);
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
  // (pages can also opt out with data-lock-scroll, e.g. the door intro or a zoomed-in room)
  const isOverlayOpen = () => !!document.querySelector('.fp-popup-overlay, [data-lock-scroll="true"]');

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

  // Touch — a swipe only changes the page when it is clearly vertical, and never
  // while the finger is scrolling a list (catalog, carpenter file) that can still move.
  useEffect(() => {
    let start = null;
    const onTouchStart = (e) => {
      const t = e.touches[0];
      const box = e.target.closest?.('.catalog-scroll, .carpenter-scroll');
      start = {
        x: t.clientX, y: t.clientY, time: Date.now(), box,
        atTop: box ? box.scrollTop <= 0 : true,
        atBottom: box ? box.scrollTop + box.clientHeight >= box.scrollHeight - 2 : true,
        // horizontal strips (chips, thumbnails, wide tables) never change the page
        inStrip: !!e.target.closest?.('.piece-chips, .room-buttons, .catalog-tabs, .fp-thumbs'),
      };
    };
    const onTouchEnd = (e) => {
      if (!start || isOverlayOpen() || start.inStrip) { start = null; return; }
      const t = e.changedTouches[0];
      const dy = start.y - t.clientY;
      const dx = start.x - t.clientX;
      const s = start; start = null;
      if (Math.abs(dy) < 70 || Math.abs(dy) < Math.abs(dx) * 1.5) return; // too short or sideways
      if (s.box) {
        // inside a list: only leave it when it was already at its edge before the swipe
        if (dy > 0 && !s.atBottom) return;
        if (dy < 0 && !s.atTop) return;
      }
      if (dy > 0) next(); else back();
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
