import { useEffect, useMemo, useRef, useState } from 'react';
import './HomeJourney.css';
import FurniturePopup from './FurniturePopup';
import RoomScene from './RoomScene';
import { SCENES } from '../data/scenes';
import { allPieces } from '../data/furniture';

/* ══════════════════════════════════════════════════════
   GEOMETRY — the apartment plan in SVG units
══════════════════════════════════════════════════════ */
const VW = 760, VH = 1040;
const BD = 7;                 // outer wall
const WL = 7;                 // inner wall
const r1B = BD + 282;         // 289 — row 1 bottom
const r2B = r1B + WL + 358;   // 654 — row 2 bottom
const babyR = VW / 2;         // 380 — kids | reception wall
const skyR  = BD + 62;        // 69
const hallL = skyR + WL;      // 76
const hallR = hallL + 416;    // 492
const strL  = hallR + WL;     // 499
const mstR  = BD + 400;       // 407
const utlL  = mstR + WL;      // 414

const R1 = BD, R2 = r1B + WL, R3 = r2B + WL; // row tops

/* Rooms you can walk into — in journey order */
const ROOMS = [
  { id: 'reception', nameAr: 'الاستقبال',   icon: '🛋️', floor: 'marble', x: babyR + WL, y: R1, w: VW - BD - babyR - WL, h: r1B - BD },
  { id: 'dining',    nameAr: 'الصالة',      icon: '🍽️', floor: 'marble', x: hallL,      y: R2, w: hallR - hallL,        h: r2B - R2 },
  { id: 'master',    nameAr: 'أوضة النوم',  icon: '🛏️', floor: 'wood',   x: BD,         y: R3, w: mstR - BD,            h: VH - BD - R3 },
  { id: 'baby',      nameAr: 'أوضة الأطفال', icon: '🧸', floor: 'wood',   x: BD,         y: R1, w: babyR - BD,           h: r1B - BD },
];

/* Every drawn piece. `id` links to a catalog piece (null = decoration only);
   `label` marks the one item per piece that carries the name tag. */
const ITEMS = [
  // ── Kids room
  { id: 'baby-wardrobe', kind: 'wardrobe', x: 319, y: 56,  w: 55,  h: 183, label: true },
  { id: 'baby-bed',      kind: 'bed',      x: 15,  y: 19,  w: 212, h: 95,  label: true },
  { id: 'baby-bed',      kind: 'bed',      x: 15,  y: 180, w: 212, h: 95 },
  { id: 'baby-commode',  kind: 'stand',    x: 15,  y: 126, w: 28,  h: 42,  label: true },
  // ── Reception
  { id: 'tv-unit',         kind: 'tv',    x: 389, y: 88,  w: 18,  h: 120, label: true },
  { id: 'sofa',            kind: 'sofa',  x: 490, y: 17,  w: 160, h: 55,  back: 'top', label: true },
  { id: 'sofa',            kind: 'sofa',  x: 490, y: 224, w: 160, h: 55,  back: 'bottom' },
  { id: 'sofa',            kind: 'sofa',  x: 678, y: 78,  w: 60,  h: 140, back: 'right' },
  { id: 'reception-table', kind: 'glass', x: 516, y: 98,  w: 68,  h: 100, label: true },
  // ── Dining hall
  { id: 'dining-table',    kind: 'glass', x: 146, y: 358, w: 130, h: 170, rx: 14, label: true },
  { id: 'dining-table',    kind: 'chair', x: 192, y: 321, w: 40,  h: 28 },
  { id: 'dining-table',    kind: 'chair', x: 192, y: 536, w: 40,  h: 28 },
  { id: 'dining-table',    kind: 'chair', x: 98,  y: 388, w: 28,  h: 38 },
  { id: 'dining-table',    kind: 'chair', x: 98,  y: 438, w: 28,  h: 38 },
  { id: 'dining-table',    kind: 'chair', x: 298, y: 388, w: 28,  h: 38 },
  { id: 'dining-table',    kind: 'chair', x: 298, y: 438, w: 28,  h: 38 },
  { id: 'bar-sideboard',   kind: 'bar',   x: 436, y: 412, w: 50,  h: 180, label: true },
  { id: 'display-cabinet', kind: 'niche', x: 116, y: 589, w: 200, h: 59,  label: true },
  // ── Master bedroom
  { id: 'vanity',      kind: 'vanity',   x: 117, y: 669, w: 180, h: 38,  label: true },
  { id: null,          kind: 'stand',    x: 18,  y: 701, w: 30,  h: 35 },
  { id: 'bed',         kind: 'bed',      x: 18,  y: 741, w: 240, h: 188, label: true },
  { id: null,          kind: 'stand',    x: 18,  y: 933, w: 30,  h: 35 },
  { id: 'mirror-rack', kind: 'mirror',   x: 18,  y: 979, w: 70,  h: 38,  label: true },
  { id: 'wardrobe',    kind: 'wardrobe', x: 96,  y: 979, w: 308, h: 38,  label: true },
  { id: null,          kind: 'tv',       x: 384, y: 787, w: 22,  h: 120 },
];

const pieceById = Object.fromEntries(allPieces.map(p => [p.id, p]));
// plan room ids are the same as the data room ids
const itemRoom = it => pieceById[it.id]?.roomId ?? null;

const HOUSE_VB = [-10, -10, VW + 20, VH + 20];
const roomVB = r => { const p = 26; return [r.x - p, r.y - p, r.w + 2 * p, r.h + 2 * p]; };

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function HomeJourney() {
  const [roomId, setRoomId] = useState(null);
  const [view, setView] = useState('top'); // 'top' = plan from above, 'inside' = eye-level scene
  const [pieceId, setPieceId] = useState(null);
  const stepInTimer = useRef(0);
  const [vb, setVb] = useState(HOUSE_VB);
  const vbRef = useRef(HOUSE_VB);
  const stageRef = useRef(null);

  const room = ROOMS.find(r => r.id === roomId) ?? null;
  const roomIdx = room ? ROOMS.indexOf(room) : -1;
  const piece = pieceId ? pieceById[pieceId] : null;

  // Pieces in the current room (one entry per catalog piece)
  const roomPieces = useMemo(() => {
    if (!room) return [];
    const ids = [...new Set(ITEMS.filter(it => it.id && itemRoom(it) === room.id).map(it => it.id))];
    return ids.map(id => pieceById[id]);
  }, [room]);

  // Smooth camera move between the whole flat and a room
  useEffect(() => {
    const from = vbRef.current;
    const to = room ? roomVB(room) : HOUSE_VB;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 1 : 750;
    const t0 = performance.now();
    let raf;
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = now => {
      const k = ease(Math.min(1, (now - t0) / dur));
      const cur = from.map((v, i) => v + (to[i] - v) * k);
      vbRef.current = cur;
      setVb(cur);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [room]);

  // From the whole flat: zoom into the room from above, then step inside.
  // Between rooms: keep whichever view the visitor is using.
  const enterRoom = id => {
    clearTimeout(stepInTimer.current);
    if (!room) {
      setView('top');
      if (SCENES[id]) stepInTimer.current = setTimeout(() => setView('inside'), 900);
    } else if (!SCENES[id]) {
      setView('top');
    }
    setRoomId(id);
  };
  const leaveRoom = () => {
    clearTimeout(stepInTimer.current);
    setView('top');
    setRoomId(null);
  };
  useEffect(() => () => clearTimeout(stepInTimer.current), []);

  const go = d => enterRoom(ROOMS[(roomIdx + d + ROOMS.length) % ROOMS.length].id);
  const inside = room && view === 'inside';

  // Keyboard: Esc = back to the flat, arrows = next / previous room
  useEffect(() => {
    const onKey = e => {
      if (piece) return;
      if (e.key === 'Escape') leaveRoom();
      if (!room) return;
      if (e.key === 'ArrowLeft')  go(1);
      if (e.key === 'ArrowRight') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Gentle tilt that follows the pointer — gives the plan physical depth
  const onPointerMove = e => {
    const el = stageRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(px * 7).toFixed(2)}deg`);
  };

  const prev = room ? ROOMS[(roomIdx - 1 + ROOMS.length) % ROOMS.length] : null;
  const next = room ? ROOMS[(roomIdx + 1) % ROOMS.length] : null;

  return (
    <div className={`journey ${room ? 'in-room' : 'in-house'} ${inside ? 'is-inside' : ''}`} data-lock-scroll={room ? 'true' : 'false'}>
      {/* ── Top: where am I ── */}
      <header className="journey-top">
        <nav className="journey-crumbs" aria-label="انت فين">
          <button className="crumb" onClick={leaveRoom} disabled={!room}>🏠 الشقة</button>
          {room && <><span className="crumb-sep">‹</span><span className="crumb current">{room.icon} {room.nameAr}</span></>}
        </nav>
        <h2 className="journey-title">
          {room ? room.nameAr : 'اختار أوضة وادخلها'}
        </h2>
        <p className="journey-hint">
          {room ? 'دوس على أي قطعة عشان تشوف صورتها ومواصفاتها' : 'دوس على أي أوضة في الرسمة أو من الزراير تحت'}
        </p>
        {room && SCENES[room.id] && (
          <div className="view-switch" role="group" aria-label="طريقة العرض">
            <button className={view === 'inside' ? 'on' : ''} onClick={() => setView('inside')} aria-pressed={view === 'inside'}>👁 من جوه</button>
            <button className={view === 'top' ? 'on' : ''} onClick={() => setView('top')} aria-pressed={view === 'top'}>🧭 من فوق</button>
          </div>
        )}
      </header>

      {/* ── The plan ── */}
      <div className="journey-stage" ref={stageRef} onPointerMove={onPointerMove}>
        {inside && (
          <div className="journey-scene">
            <RoomScene roomId={room.id} piecesById={pieceById} onPick={setPieceId} />
          </div>
        )}
        <div className="journey-board" hidden={inside}>
          <svg
            viewBox={vb.map(n => n.toFixed(2)).join(' ')}
            className="journey-svg"
            role="img"
            aria-label="مسقط الشقة"
          >
            <PlanDefs />

            {/* Floors */}
            {ROOMS.map(r => (
              <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h} fill={`url(#floor-${r.floor})`} />
            ))}
            <rect x={BD} y={R2} width={skyR - BD} height={r2B - R2} fill="url(#floor-sky)" />
            <rect x={strL + WL} y={R2} width={VW - BD - strL - WL} height={r2B - R2} fill="#E6DCCB" />
            <rect x={utlL} y={R3} width={VW - BD - utlL} height={VH - BD - R3} fill="url(#floor-tile)" />

            {/* Stairs */}
            {Array.from({ length: 13 }).map((_, i) => {
              const y = R2 + i * ((r2B - R2) / 13);
              return <line key={i} x1={strL + WL} y1={y} x2={VW - BD} y2={y} stroke="#C9B89F" strokeWidth="1.4" />;
            })}

            {/* Furniture — with shadows so it sits on the floor */}
            <g filter="url(#lift)">
              {ITEMS.map((it, i) => <Furniture key={i} {...it} />)}
              {/* bathroom / kitchen blocks */}
              <rect x={utlL + 6} y={R3 + 6} width={VW - utlL - BD - 12} height={150} rx={8} fill="#F1ECE4" stroke="#C9B89F" />
              <rect x={utlL + 6} y={R3 + 174} width={VW - utlL - BD - 12} height={VH - R3 - 174 - BD - 8} rx={8} fill="#F1ECE4" stroke="#C9B89F" />
            </g>

            <Walls />
            <Doors />

            {/* Non-walkable area names */}
            <AreaLabel x={(strL + WL + VW - BD) / 2} y={(R2 + r2B) / 2} t="السلم" />
            <AreaLabel x={BD + (skyR - BD) / 2} y={(R2 + r2B) / 2} t="منور" vertical />
            <AreaLabel x={utlL + (VW - BD - utlL) / 2} y={R3 + 84} t="الحمام" />
            <AreaLabel x={utlL + (VW - BD - utlL) / 2} y={R3 + 265} t="المطبخ" />

            {/* Dim everything outside the room we're in */}
            <path
              className="journey-dim"
              style={{ opacity: room ? 1 : 0 }}
              fillRule="evenodd"
              d={`M-50 -50H${VW + 50}V${VH + 50}H-50Z ${room ? `M${room.x} ${room.y}h${room.w}v${room.h}h${-room.w}Z` : ''}`}
            />

            {/* House view: whole rooms are the buttons */}
            {!room && ROOMS.map(r => (
              <g key={r.id} className="room-hit" role="button" tabIndex={0}
                aria-label={`ادخل ${r.nameAr}`}
                onClick={() => enterRoom(r.id)}
                onKeyDown={e => e.key === 'Enter' && enterRoom(r.id)}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} className="room-hit-area" />
                <g className="room-tag" transform={`translate(${r.x + r.w / 2} ${r.y + r.h / 2})`}>
                  <rect x={-78} y={-24} width={156} height={48} rx={24} />
                  <text y={8} textAnchor="middle">{r.icon} {r.nameAr}</text>
                </g>
              </g>
            ))}

            {/* Room view: every piece is a button with its name */}
            {room && ITEMS.filter(it => it.id && itemRoom(it) === room.id).map((it, i) => {
              const p = pieceById[it.id];
              return (
                <g key={i} className="piece-hit" role="button" tabIndex={0}
                  aria-label={p.nameAr}
                  onClick={() => setPieceId(it.id)}
                  onKeyDown={e => e.key === 'Enter' && setPieceId(it.id)}>
                  <rect x={it.x - 3} y={it.y - 3} width={it.w + 6} height={it.h + 6} rx={8} className="piece-hit-area" />
                  {it.label && <PieceTag x={it.x + it.w / 2} y={it.y + it.h / 2} text={p.nameAr} />}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Bottom controls ── */}
      <footer className="journey-bottom">
        {!room ? (
          <div className="room-buttons">
            {ROOMS.map(r => (
              <button key={r.id} className="room-btn" onClick={() => enterRoom(r.id)}>
                <span className="room-btn-icon" aria-hidden="true">{r.icon}</span>
                {r.nameAr}
              </button>
            ))}
          </div>
        ) : (
          <div className="room-controls">
            <button className="nav-room" onClick={() => go(-1)} aria-label={`الأوضة اللي قبل: ${prev.nameAr}`}>
              <span aria-hidden="true">→</span> {prev.icon} {prev.nameAr}
            </button>
            <div className="piece-chips">
              {roomPieces.map(p => (
                <button key={p.id} className="piece-chip" onClick={() => setPieceId(p.id)}>
                  {p.image && <img src={p.image} alt="" />}
                  <span>{p.nameAr}</span>
                </button>
              ))}
            </div>
            <button className="nav-room" onClick={() => go(1)} aria-label={`الأوضة اللي بعد: ${next.nameAr}`}>
              {next.icon} {next.nameAr} <span aria-hidden="true">←</span>
            </button>
          </div>
        )}
        {room && (
          <button className="back-house" onClick={leaveRoom}>🏠 ارجع للشقة كلها</button>
        )}
      </footer>

      {piece && <FurniturePopup piece={piece} onClose={() => setPieceId(null)} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DRAWING HELPERS
══════════════════════════════════════════════════════ */
const C = {
  cream: '#F6F1E8', cream2: '#EADFCD', walnut: '#845F47', walnutDeep: '#5E4231',
  gold: '#B08D57', bronze: 'rgba(86,72,54,0.42)', fabric: '#E3D5BF', wall: '#4A3628',
};

function PlanDefs() {
  return (
    <defs>
      {/* marble tiles */}
      <pattern id="floor-marble" width="64" height="64" patternUnits="userSpaceOnUse">
        <rect width="64" height="64" fill="#F4EFE7" />
        <path d="M0 0H64M0 0V64" stroke="#E2D8C9" strokeWidth="1" />
        <path d="M6 50 C20 40 30 46 44 30 S60 18 64 14" stroke="#E6DDD0" strokeWidth="0.8" fill="none" />
      </pattern>
      {/* light oak planks for bedrooms */}
      <pattern id="floor-wood" width="140" height="18" patternUnits="userSpaceOnUse">
        <rect width="140" height="18" fill="#E1CDAE" />
        <path d="M0 0H140M0 9H140" stroke="#D3BC98" strokeWidth="0.8" />
        <path d="M60 0V9M120 9V18M20 9V18" stroke="#D3BC98" strokeWidth="0.8" />
      </pattern>
      {/* small wet-area tiles */}
      <pattern id="floor-tile" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#E9E3D9" />
        <path d="M0 0H20M0 0V20" stroke="#D8CFC1" strokeWidth="0.8" />
      </pattern>
      {/* skylight grid */}
      <pattern id="floor-sky" width="20" height="48" patternUnits="userSpaceOnUse">
        <rect width="20" height="48" fill="#E8EEF0" />
        <path d="M0 0H20M0 0V48" stroke="#CBD6DA" strokeWidth="1" />
      </pattern>
      <filter id="lift" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#4a3424" floodOpacity="0.28" />
      </filter>
    </defs>
  );
}

function Furniture({ kind, x, y, w, h, rx, back }) {
  switch (kind) {
    case 'bed': {
      const head = 9;
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} fill={C.walnut} />
          <rect x={x + head} y={y + 3} width={w - head - 3} height={h - 6} rx={5} fill={C.cream} />
          {/* pillows */}
          <rect x={x + head + 5} y={y + 8} width={Math.min(34, w * 0.16)} height={h / 2 - 12} rx={5} fill="#fff" stroke={C.cream2} />
          <rect x={x + head + 5} y={y + h / 2 + 4} width={Math.min(34, w * 0.16)} height={h / 2 - 12} rx={5} fill="#fff" stroke={C.cream2} />
          {/* blanket */}
          <rect x={x + w * 0.42} y={y + 3} width={w * 0.58 - 3} height={h - 6} rx={5} fill={C.fabric} />
          <line x1={x + w * 0.42} y1={y + 3} x2={x + w * 0.42} y2={y + h - 3} stroke={C.cream2} strokeWidth="2" />
        </g>
      );
    }
    case 'sofa': {
      const t = 13;
      const b = back === 'top' ? [x, y, w, t] : back === 'bottom' ? [x, y + h - t, w, t] : [x + w - t, y, t, h];
      const vertical = back === 'right';
      const n = 3;
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={10} fill={C.fabric} />
          <rect x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx={6} fill="#CDBB9F" />
          {Array.from({ length: n - 1 }).map((_, i) => vertical
            ? <line key={i} x1={x + 4} x2={x + w - t - 2} y1={y + (h / n) * (i + 1)} y2={y + (h / n) * (i + 1)} stroke="#CDBB9F" strokeWidth="1.5" />
            : <line key={i} y1={back === 'top' ? y + t + 2 : y + 4} y2={back === 'top' ? y + h - 4 : y + h - t - 2} x1={x + (w / n) * (i + 1)} x2={x + (w / n) * (i + 1)} stroke="#CDBB9F" strokeWidth="1.5" />)}
        </g>
      );
    }
    case 'glass':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={rx ?? 8} fill="#EADFCD" />
          <rect x={x} y={y} width={w} height={h} rx={rx ?? 8} fill={C.bronze} stroke={C.gold} strokeWidth="2" />
          <path d={`M${x + 8} ${y + 14} l${Math.min(w, h) * 0.3} ${-6}`} stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'chair':
      return <rect x={x} y={y} width={w} height={h} rx={7} fill={C.fabric} stroke={C.walnut} strokeWidth="1.5" />;
    case 'stand':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={5} fill={C.cream} stroke={C.walnut} strokeWidth="1.5" />
          <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={3} fill={C.bronze} />
        </g>
      );
    case 'tv':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={5} fill={C.walnut} />
          <rect x={x + 3} y={y + 10} width={4} height={h - 20} rx={2} fill="#2b2420" />
        </g>
      );
    case 'wardrobe': {
      const vertical = h > w;
      const n = vertical ? 2 : 4;
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={5} fill={C.cream} stroke={C.walnut} strokeWidth="2" />
          {Array.from({ length: n - 1 }).map((_, i) => vertical
            ? <line key={i} x1={x} x2={x + w} y1={y + (h / n) * (i + 1)} y2={y + (h / n) * (i + 1)} stroke={C.walnut} strokeWidth="1.2" />
            : <line key={i} y1={y} y2={y + h} x1={x + (w / n) * (i + 1)} x2={x + (w / n) * (i + 1)} stroke={C.walnut} strokeWidth="1.2" />)}
        </g>
      );
    }
    case 'bar':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={10} fill={C.cream} />
          <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={C.walnut} strokeWidth="4" />
          {[1, 2, 3].map(i => <line key={i} x1={x + 6} x2={x + w - 6} y1={y + (h / 4) * i} y2={y + (h / 4) * i} stroke={C.gold} strokeWidth="1.2" />)}
        </g>
      );
    case 'niche':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} fill={C.cream} stroke={C.gold} strokeWidth="2" />
          <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={3} fill="rgba(255,236,200,0.8)" stroke={C.gold} strokeWidth="0.8" />
        </g>
      );
    case 'vanity':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} fill={C.cream} stroke={C.walnut} strokeWidth="2" />
          <rect x={x + w * 0.3} y={y + 3} width={w * 0.4} height={6} rx={3} fill="#F3D9A4" />
        </g>
      );
    case 'mirror':
      return <rect x={x} y={y} width={w} height={h} rx={6} fill={C.bronze} stroke={C.walnut} strokeWidth="2" />;
    default:
      return null;
  }
}

function W_({ x, y, w, h }) {
  return <rect x={x} y={y} width={w} height={h} fill={C.wall} />;
}

function D({ x, y, w, h }) {
  return <rect x={x} y={y} width={w} height={h} rx={2} fill="#E9DCC6" stroke={C.gold} strokeWidth="1.5" />;
}

function Walls() {
  const dW = 62;
  const d1X = BD + Math.floor(((babyR - BD) - dW) / 1.15);
  const d2X = babyR + WL + Math.floor(((VW - BD - babyR - WL) - dW) / 9);
  const tvY = R3 + Math.floor((VH - BD - R3 - 120) / 2);
  const mstDoorY = tvY - 105 - 16;
  return (
    <g>
      {/* outer */}
      <W_ x={0} y={0} w={VW} h={BD} /><W_ x={0} y={VH - BD} w={VW} h={BD} />
      <W_ x={0} y={0} w={BD} h={VH} /><W_ x={VW - BD} y={0} w={BD} h={VH} />
      {/* row 1 bottom, with door gaps */}
      <W_ x={BD} y={r1B} w={d1X - BD} h={WL} />
      <W_ x={d1X + dW} y={r1B} w={d2X - d1X - dW} h={WL} />
      <W_ x={d2X + dW} y={r1B} w={VW - BD - d2X - dW} h={WL} />
      <W_ x={BD} y={r2B} w={VW - 2 * BD} h={WL} />
      <W_ x={babyR} y={BD} w={WL} h={r1B - BD} />
      <W_ x={skyR} y={R2} w={WL} h={r2B - R2} />
      <W_ x={hallR} y={R2} w={WL} h={20} />
      <W_ x={hallR} y={R2 + 110} w={WL} h={r2B - R2 - 110} />
      <W_ x={mstR} y={R3} w={WL} h={mstDoorY - R3} />
      <W_ x={mstR} y={mstDoorY + 105} w={WL} h={VH - BD - mstDoorY - 105} />
      <W_ x={utlL} y={R3 + 164} w={VW - utlL - BD} h={WL} />
    </g>
  );
}

function Doors() {
  const dW = 62;
  const d1X = BD + Math.floor(((babyR - BD) - dW) / 1.15);
  const d2X = babyR + WL + Math.floor(((VW - BD - babyR - WL) - dW) / 9);
  const tvY = R3 + Math.floor((VH - BD - R3 - 120) / 2);
  const mstDoorY = tvY - 105 - 16;
  return (
    <g>
      <D x={d1X} y={0} w={dW} h={WL + 2} />
      <D x={d2X} y={0} w={dW} h={WL + 2} />
      <D x={d1X} y={r1B - 1} w={dW} h={WL + 2} />
      <D x={d2X} y={r1B - 1} w={dW} h={WL + 2} />
      <D x={hallR - 1} y={R2 + 20} w={WL + 2} h={90} />
      <D x={mstR - 1} y={mstDoorY} w={WL + 2} h={105} />
    </g>
  );
}

function AreaLabel({ x, y, t, vertical }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="area-label"
      transform={vertical ? `rotate(-90 ${x} ${y})` : undefined}>{t}</text>
  );
}

function PieceTag({ x, y, text }) {
  const w = text.length * 6.2 + 18;
  return (
    <g className="piece-tag" transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-11} width={w} height={22} rx={11} />
      <text y={4.5} textAnchor="middle">{text}</text>
    </g>
  );
}
