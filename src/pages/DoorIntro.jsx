import { useEffect, useRef, useState } from 'react';
import './DoorIntro.css';

// The journey starts at the apartment's front door: a walnut double door on a
// vanilla-latte wall. Tap / scroll / Enter opens it, then we walk inside.
export default function DoorIntro({ onEnter }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);

  const openDoor = () => {
    if (open) return;
    setOpen(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(onEnter, reduce ? 50 : 1500);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  // Scroll, swipe or keyboard also open the door (the page locks the global pager)
  useEffect(() => {
    let startY = 0;
    const onWheel = e => { if (e.deltaY > 20) openDoor(); };
    const onKey = e => { if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) openDoor(); };
    const onTs = e => { startY = e.touches[0].clientY; };
    const onTe = e => { if (startY - e.changedTouches[0].clientY > 40) openDoor(); };
    window.addEventListener('wheel', onWheel);
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTs, { passive: true });
    window.addEventListener('touchend', onTe, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTs);
      window.removeEventListener('touchend', onTe);
    };
  });

  return (
    <div className={`door-scene ${open ? 'is-open' : ''}`} data-lock-scroll="true">
      {/* Wall light falling on the door */}
      <div className="door-sconce" aria-hidden="true" />

      <div className="door-frame">
        {/* What you see through the door: warm light from inside */}
        <div className="door-inside" aria-hidden="true">
          <span>أهلاً بيك</span>
        </div>

        <button className="door-leaves" onClick={openDoor} aria-label="افتح الباب وادخل الشقة">
          <span className="door-leaf door-leaf-r">
            <span className="door-panel" /><span className="door-panel" />
            <span className="door-handle" />
          </span>
          <span className="door-leaf door-leaf-l">
            <span className="door-panel" /><span className="door-panel" />
            <span className="door-handle" />
          </span>
        </button>

        <div className="door-plaque">
          <span className="door-plaque-title">بيتنا</span>
          <span className="door-plaque-sub">كل قطعة في مكانها</span>
        </div>
      </div>

      <div className="door-floor" aria-hidden="true" />

      <button className="door-cta" onClick={openDoor}>
        اضغط على الباب عشان تدخل
        <span className="door-cta-key" aria-hidden="true">👆</span>
      </button>
    </div>
  );
}
