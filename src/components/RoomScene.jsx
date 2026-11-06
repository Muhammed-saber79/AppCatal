import { useEffect, useRef, useState } from 'react';
import './RoomScene.css';
import { SCENES } from '../data/scenes';

// Eye-level view of a room built from parallax layers — layouts live in data/scenes.js

const FLOOR_TOP = 60; // % of scene height where the back wall meets the floor

export default function RoomScene({ roomId, piecesById, onPick }) {
  const scene = SCENES[roomId];
  const ref = useRef(null);
  const [broken, setBroken] = useState({}); // cut-outs that failed to load

  // Parallax: pointer on desktop, gyroscope on phones
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const set = (x, y) => { tx = Math.max(-1, Math.min(1, x)); ty = Math.max(-1, Math.min(1, y)); };
    const onMove = e => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onTilt = e => { if (e.gamma != null) set(e.gamma / 25, (e.beta - 45) / 25); };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--px', cx.toFixed(4));
      el.style.setProperty('--py', cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      el.addEventListener('pointermove', onMove);
      window.addEventListener('deviceorientation', onTilt);
      raf = requestAnimationFrame(tick);
    }
    return () => {
      el.removeEventListener('pointermove', onMove);
      window.removeEventListener('deviceorientation', onTilt);
      cancelAnimationFrame(raf);
    };
  }, [roomId]);

  if (!scene) return null;

  // Back to front: things further back are drawn first and move less
  const items = [...scene.items].sort((a, b) => (a.wall ? -1 : a.y) - (b.wall ? -1 : b.y));

  return (
    <div className={`scene floor-${scene.floor} window-${scene.window}`} ref={ref} key={roomId}>
      {/* Layer 1 — wall */}
      <div className="scene-layer scene-wall" style={{ '--depth': 0.15, height: `${FLOOR_TOP}%` }}>
        <div className="scene-cove" />
        <div className="scene-window" />
        <div className="scene-skirting" />
      </div>

      {/* Layer 2 — floor in perspective */}
      <div className="scene-layer scene-floor-wrap" style={{ '--depth': 0.35, top: `${FLOOR_TOP}%` }}>
        <div className="scene-floor" />
        <div className="scene-sunlight" />
      </div>

      {/* Layer 3 — furniture */}
      {items.map((it, i) => {
        if (broken[it.src]) return null;
        const p = piecesById[it.id];
        const depth = it.wall ? 0.2 : 0.35 + it.y * 0.55;
        const scale = it.wall ? 1 : 0.86 + it.y * 0.3;              // closer = bigger
        const bottomPct = (100 - FLOOR_TOP) * (1 - (it.y ?? 0)) - 2;
        const bottom = it.wall ? undefined : `${bottomPct}%`;
        const height = it.h * scale;
        // tall pieces reach the ceiling: put their name tag inside instead of above
        const topPct = it.wall ? it.top : 100 - bottomPct - height;
        return (
          <button
            key={it.src ?? `${it.id}-${i}`}
            className={`scene-item ${it.wall ? 'on-wall' : ''} ${topPct < 12 ? 'tag-inside' : ''}`}
            style={{
              '--depth': depth,
              '--delay': `${0.15 + i * 0.12}s`,
              left: `${it.x}%`,
              bottom,
              top: it.wall ? `${it.top}%` : undefined,
              height: `${height}%`,
              zIndex: 10 + Math.round((it.wall ? 0 : it.y) * 100),
            }}
            onClick={() => onPick(it.id)}
            aria-label={p?.nameAr ?? it.id}
            // a twin is a second part of the same piece: clickable, but announced once
            tabIndex={it.twin ? -1 : undefined}
            aria-hidden={it.twin || undefined}
          >
            {!it.wall && it.kind !== 'bedding' && <span className="scene-shadow" aria-hidden="true" />}
            {it.kind
              ? <Drawn kind={it.kind} />
              : <img src={it.src} alt="" draggable="false" className={it.flip ? 'flip' : undefined}
                  onError={() => setBroken(b => ({ ...b, [it.src]: true }))} />}
            {p && !it.twin && <span className="scene-tag">{p.nameAr}</span>}
          </button>
        );
      })}

      {/* Layer 4 — foreground: soft vignette + warm light, moves the most */}
      <div className="scene-layer scene-front" style={{ '--depth': 1.1 }} aria-hidden="true" />
    </div>
  );
}

// Pieces drawn in CSS where a clean photo cut-out wasn't possible
function Drawn({ kind }) {
  switch (kind) {
    case 'coffee-table':
      return (
        <span className="scene-coffee" aria-hidden="true">
          <span className="scene-coffee-top" /><span className="scene-coffee-base" />
        </span>
      );
    case 'pebbles':
      return (
        <span className="scene-pebbles" aria-hidden="true">
          <span className="pebble pebble-1" /><span className="pebble pebble-2" /><span className="pebble pebble-3" />
        </span>
      );
    case 'bedding':
      return (
        <span className="scene-bedding" aria-hidden="true">
          <span className="bedding-pillows"><span /><span /></span>
          <span className="bedding-throw" />
          <span className="bedding-base" />
        </span>
      );
    default:
      return <span className={`scene-${kind}`} aria-hidden="true" />;
  }
}
