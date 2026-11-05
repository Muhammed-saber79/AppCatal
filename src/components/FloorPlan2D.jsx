import { useState } from 'react';
import './FloorPlan2D.css';
import FurniturePopup from './FurniturePopup';
import { allPieces } from '../data/furniture';

/* ══════════════════════════════════════════════════════
   ALL LAYOUT CONSTANTS
══════════════════════════════════════════════════════ */
const VW  = 760;
const VH  = 1040;
const BD  = 7;    // border
const WL  = 7;    // inner wall

// ── Row Y boundaries ──────────────────────────────────
const r1B = BD + 282;         // 289  — row1 bottom
const r2B = r1B + WL + 358;   // 654  — row2 bottom
// row3 fills r2B+WL → VH-BD = 1033

// ── Row 1 columns ─────────────────────────────────────
// Dividing wall centered in full floor width = VW/2
const babyR = Math.floor(VW / 2);   // 380 — baby|reception wall (centered)
const recL  = babyR + WL;           // 387 — reception left

// ── Row 2 columns ─────────────────────────────────────
const skyR  = BD + 62;        // 69   — skylight right
const hallL = skyR + WL;      // 76   — hall left
const hallR = hallL + 416;    // 492  — hall right
const strL  = hallR + WL;     // 499  — stairs left
const barL  = hallL + 288;    // 364  — bar column left edge
// niche = bottom strip of hall
const nicheH = 78;            // height of niche strip
const nicheT = r2B - nicheH;  // 576  — niche top

// ── Row 3 columns ─────────────────────────────────────
// No separate tv-strip wall — TV lives on the right edge of master area
// master spans from BD to mstR, util from mstR+WL to VW-BD
const mstR   = BD + 400;      // 407  — master right wall
const utlL   = mstR + WL;     // 414  — util left

// TV on the mstR wall: centered, with door above it
const tvH    = 120;           // tv unit height
const tvW2   = 22;            // tv unit width (thin, on wall)
const tvY    = r2B + WL + Math.floor((VH - BD - r2B - WL - tvH) / 2); // centered vertically

// Master door: on the mstR wall, above TV
const mstDoorH = 105;
const mstDoorY = tvY - mstDoorH - 16;

// Last wall (bottom of master): drawer(4/5) + mirror-rack(1/5), thinner height
const lastWallH = 38;         // thinner than before
const lastWallY = VH - BD - lastWallH - 16; // leave 16px gap from bottom
const lastWallW = mstR - BD - WL - 8;       // total width minus margins
const drawerW   = Math.floor(lastWallW * 4 / 5);
const mrrW      = lastWallW - drawerW - WL;

// Derived — keep drawerY/drawerH names for hotspot compat
const drawerY = lastWallY;
const drawerH = lastWallH;

/* ══════════════════════════════════════════════════════
   HOTSPOTS
══════════════════════════════════════════════════════ */



// Clean hotspots — vx/vy/vw/vh = exact visual shape, x/y/w/h = hit area
const _babyRoomW = Math.floor(VW/2) - BD;
const _babyRoomH = r1B - BD;
const _dW = Math.floor(_babyRoomW * 0.15);
const _dH = Math.floor(_babyRoomH * 0.65);
const _dX = Math.floor(VW/2) - _dW - 6;
const _dY = BD + Math.floor((_babyRoomH - _dH) / 2);
const _bedW = Math.floor(_babyRoomW * 0.60);
const _bedSpacing = Math.floor((_babyRoomH - 76 - 28 - 76) / 4);
const _bed1Y = BD + _bedSpacing;
const _bed2Y = BD + _bedSpacing + 76 + _bedSpacing + 28 + _bedSpacing;
const _comSp = Math.floor((_babyRoomH - 95 - 42 - 95) / 4); // matches baby room drawing
const _recW = VW - BD - Math.floor(VW/2) - WL;
const _recH = r1B - BD;
const _sfW = 180, _sfH = 64;
const _sfTopX = Math.floor(VW/2) + WL + Math.floor((_recW - _sfW) / 2);
const _sfBotY = r1B - _sfH - 10;
const _ctW = 100, _ctH = 68;
const _ctX = Math.floor(VW/2) + WL + Math.floor((_recW - _ctW) / 2) - 20;
const _ctY = BD + Math.floor((_recH - _ctH) / 2);
const _barColW = hallR - barL;
const _bW = 70, _bH = 180;
const _bX = hallR - _bW - 6;
const _bY = r1B + WL + Math.floor((r2B - r1B - WL - nicheH - WL - _bH) / 2);
const _vW = 180, _vH = 38;
const _vX = BD + Math.floor((mstR - BD - _vW) / 2);
const _bedMstW = Math.floor((mstR-BD)*0.60);

const SPOTS = [
  { id:'baby-wardrobe',
    x:_dX-4,   y:_dY-4,   w:_dW+8,      h:_dH+8,
    vx:_dX,    vy:_dY,    vw:_dW,        vh:_dH,        ar:'خزانة الأطفال' },

  { id:'baby-bed',
    x:BD+4,    y:BD+4,    w:_bedW+8,     h:r1B-BD-8,
    vx:BD+8,   vy:_bed1Y, vw:_bedW,      vh:76+_bedSpacing+28+_bedSpacing+76, ar:'أسرّة الأطفال' },

  // Commode between the two baby beds — after baby-bed so it sits on top
  { id:'baby-commode',
    x:BD+6,    y:BD+_comSp+95+_comSp-2, w:28+4, h:42+4,
    vx:BD+8,   vy:BD+_comSp+95+_comSp,  vw:28,  vh:42,   ar:'كومود' },

  { id:'sofa',
    x:babyR+WL+4, y:BD+4, w:VW-BD-babyR-WL-8, h:r1B-BD-8,
    vx:_sfTopX, vy:BD+10, vw:_sfW,        vh:_sfH,       ar:'الكنبة' },

  { id:'reception-table',
    x:_ctX-4,  y:_ctY-4,  w:_ctW+8,     h:_ctH+8,
    vx:_ctX,   vy:_ctY,   vw:_ctW,       vh:_ctH,        ar:'طاولة وسط' },

  { id:'tv-unit',
    x:babyR+WL-2, y:BD+Math.floor((_recH-120)/2)-4, w:18+8, h:120+8,
    vx:babyR+WL+2, vy:BD+Math.floor((_recH-120)/2), vw:18, vh:120, ar:'الشاشة' },

  { id:'dining-table',
    x:hallL+38, y:r1B+WL+44, w:228,      h:238,
    vx:hallL+56, vy:r1B+WL+62, vw:160,   vh:152,          ar:'طاولة الطعام' },

  { id:'bar-sideboard',
    x:_bX-4,   y:_bY-4,   w:_bW+8,      h:_bH+8,
    vx:_bX,    vy:_bY,    vw:_bW,        vh:_bH,          ar:'البار' },

  { id:'display-cabinet',
    x:hallL+36, y:nicheT+2, w:204,       h:nicheH-4,
    vx:hallL+40, vy:nicheT+WL+6, vw:200, vh:nicheH-WL-12, ar:'النيتش' },

  { id:'vanity',
    x:_vX-4,   y:r2B+WL+4, w:_vW+8,     h:_vH+8,
    vx:_vX,    vy:r2B+WL+8, vw:_vW,      vh:_vH,          ar:'التسريحة' },

  { id:'bed',
    x:BD+WL,   y:r2B+WL+52, w:_bedMstW+12, h:212,
    vx:BD+WL+4, vy:r2B+WL+80, vw:_bedMstW, vh:188,         ar:'السرير' },

  { id:'wardrobe',
    x:BD+WL+4+mrrW+WL-2, y:drawerY-2, w:drawerW+4,  h:drawerH+4,
    vx:BD+WL+4+mrrW+WL+1, vy:drawerY, vw:drawerW,   vh:drawerH,   ar:'الدولاب' },

  { id:'mirror-rack',
    x:BD+WL,   y:drawerY-2, w:mrrW+4,   h:drawerH+4,
    vx:BD+WL+4, vy:drawerY, vw:mrrW,    vh:drawerH,        ar:'مرايا ورف' },
];

export default function FloorPlan2D() {
  const [sel, setSel] = useState(null);
  const piece = sel ? allPieces.find(p => p.id === sel) : null;
  const tap   = id  => setSel(p => p === id ? null : id);

  return (
    <div className="floorplan-page">
      <div className="floorplan-header">
        <p className="floorplan-title">المخطط التفاعلي · انقر على أي قطعة</p>
      </div>
      <div className="floorplan-svg-wrap">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="floorplan-svg">
          <rect width={VW} height={VH} fill="#0c0a08"/>

          {/* ─── OUTER BORDER ─── */}
          <rect x={0}     y={0}     width={VW}  height={BD}  fill="#4a90d9"/>
          <rect x={0}     y={VH-BD} width={VW}  height={BD}  fill="#4a90d9"/>
          <rect x={0}     y={0}     width={BD}  height={VH}  fill="#4a90d9"/>
          <rect x={VW-BD} y={0}     width={BD}  height={VH}  fill="#4a90d9"/>

          {/* ─── INNER WALLS ─── */}

          {/* ROW1 bottom — gaps matching door positions */}
          {(() => {
            const dW = 62;
            const d1X = BD + Math.floor(((babyR - BD) - dW) / 1.15);
            const d2X = babyR + WL + Math.floor(((VW - BD - babyR - WL) - dW) / 9);
            return <>
              <W_ x={BD}      y={r1B} w={d1X - BD}           h={WL}/>
              <W_ x={d1X+dW}  y={r1B} w={d2X - d1X - dW}     h={WL}/>
              <W_ x={d2X+dW}  y={r1B} w={VW - BD - d2X - dW} h={WL}/>
            </>;
          })()}

          {/* ROW2 bottom — solid wall, no horizontal door */}
          <W_ x={BD} y={r2B} w={VW-BD-BD} h={WL}/>

          {/* Baby | reception dividing wall — RESTORED */}
          <W_ x={babyR} y={BD} w={WL} h={r1B-BD}/>

          {/* Sky | Hall */}
          <W_ x={skyR}    y={r1B+WL} w={WL} h={r2B-r1B-WL}/>

          {/* Hall | Stairs — gap for larger door h=90 at y=r1B+WL+20 */}
          <W_ x={hallR} y={r1B+WL}        w={WL} h={20}/>
          <W_ x={hallR} y={r1B+WL+20+90}  w={WL} h={r2B-r1B-WL-20-90}/>

          {/* No inner bar/niche walls — open hall space */}

          {/* Master right wall (mstR) — gap for vertical door */}
          <W_ x={mstR} y={r2B+WL}                    w={WL} h={mstDoorY-r2B-WL}/>
          <W_ x={mstR} y={mstDoorY+mstDoorH}          w={WL} h={VH-BD-mstDoorY-mstDoorH}/>
          {/* util left wall */}
          {/* (no tv-strip wall — TV is on the mstR wall face) */}

          {/* No vanity separator wall — open master space */}

          {/* ─── DOORS ─── */}
          {(() => {
            const dW = 62;

            const babyWallW = babyR - BD;
            const recWallW  = VW - BD - babyR - WL;

            // Baby door — more to the right (closer to dividing wall)
            const d1X = BD + Math.floor((babyWallW - dW) / 1.15);
            // Reception door — more to the left (closer to dividing wall)
            const d2X = babyR + WL + Math.floor((recWallW - dW) / 9);

            // Hall|Stairs vertical door — top of row2, larger height
            const vDoorH = 90;
            const vDoorY = r1B + WL + 20;

            return <>
              {/* WALL 1 top */}
              <Door x={d1X} y={0}      w={dW}/>
              <Door x={d2X} y={0}      w={dW}/>
              {/* WALL 2 row1→row2 */}
              <Door x={d1X} y={r1B-3}  w={dW}/>
              <Door x={d2X} y={r1B-3}  w={dW}/>
              {/* Hall|Stairs vertical */}
              <Door x={hallR-3} y={vDoorY} w={WL+6} h={vDoorH} vert/>
              {/* mstR vertical */}
              <Door x={mstR-3} y={mstDoorY} w={WL+6} h={mstDoorH} vert/>
            </>;
          })()}

          {/* ═══════ ROW 1 — BABY ═══════ */}
          {(() => {
            const roomW = babyR - BD;   // ~373px
            const roomH = r1B - BD;     // ~282px

            // ── DRAWER: 65% of room HEIGHT (shorter), 28% of room WIDTH (thinner), flush right ──
            const dW = Math.floor(roomW * 0.15);  // ~104px — thin
            const dH = Math.floor(roomH * 0.65);  // ~183px — shorter
            const dX = babyR - dW - 6;            // flush right wall
            const dY = BD + Math.floor((roomH - dH) / 2); // vertically centered

            // ── BEDS: 60% of room width each, left side ──
            const bedW = Math.floor(roomW * 0.57); // ~223px wide
            const bedH = 95;
            const comW = 28, comH = 42;
            // distribute: top-gap / bed1 / commode-gap / commode / commode-gap / bed2 / bot-gap
            const totalUsed = bedH + comH + bedH;
            const spacing   = Math.floor((roomH - totalUsed) / 4); // 4 gaps
            const bed1Y = BD + spacing;
            const comY  = BD + spacing + bedH + spacing;
            const bed2Y = BD + spacing + bedH + spacing + comH + spacing;

            return <>
              {/* Drawer */}
              <Piece x={dX} y={dY} w={dW} h={dH} label="drawer" fs={10}/>
              {/* Bed 1 */}
              <Piece x={BD+8} y={bed1Y} w={bedW} h={bedH} label="bed"/>
              {/* Commode */}
              <Piece x={BD+8} y={comY}  w={comW} h={comH} rx={4}/>
              {/* Bed 2 */}
              <Piece x={BD+8} y={bed2Y} w={bedW} h={bedH} label="bed"/>
            </>;
          })()}

          <ZL x={140} y={r1B-10} t="Baby"/>

          {/* ═══════ ROW 1 — RECEPTION ═══════ */}
          {/* Reception room: x=babyR+WL .. VW-BD, y=BD .. r1B */}
          {(() => {
            const recW = VW - BD - babyR - WL;  // ~455px wide
            const recH = r1B - BD;              // ~282px tall

            // TV — thin vertical, on the left wall (shared with baby room)
            const tvX = babyR + WL + 2;
            const tvUH = 120, tvUW = 18;
            const tvUY = BD + Math.floor((recH - tvUH) / 2);

            // Top sofa — centered on top wall, faces down
            const sfW = 160, sfH = 55;
            const sfTopX = babyR + WL + Math.floor((recW - sfW) / 2);

            // Bottom sofa — centered on bottom wall, faces up
            const sfBotX = sfTopX;
            const sfBotY = r1B - sfH - 10;

            // Right sofa — centered on right wall, faces left
            const sfRH = 140, sfRW = 60;
            const sfRY = BD + Math.floor((recH - sfRH) / 2);
            const sfRX = VW - BD - WL - sfRW - 8;

            // Center table
            const ctW = 68, ctH = 100;
            const ctX = babyR + WL + Math.floor((recW - ctW) / 2) - 20;
            const ctY = BD + Math.floor((recH - ctH) / 2);

            return <>
              {/* TV */}
              <Piece x={tvX} y={tvUY} w={tvUW} h={tvUH} label="tv" fs={8} color="#4a90d9"/>
              {/* Top sofa */}
              <Piece x={sfTopX} y={BD+10} w={sfW} h={sfH} label="sofa"/>
              {/* Right sofa */}
              <Piece x={sfRX} y={sfRY} w={sfRW} h={sfRH} label="sofa" fs={10}/>
              {/* Center table */}
              <Piece x={ctX} y={ctY} w={ctW} h={ctH} label="table"/>
              {/* Bottom sofa */}
              <Piece x={sfBotX} y={sfBotY} w={sfW} h={sfH} label="sofa"/>
            </>;
          })()}

          <ZL x={recL+(VW-BD-recL)/2} y={r1B-10} t="Reception"/>

          {/* ═══════ ROW 2 — SKYLIGHT ═══════ */}
          {[0,1,2,3,4,5,6].map(i=>(
            <line key={'h'+i}
              x1={BD} y1={r1B+WL+i*48} x2={skyR} y2={r1B+WL+i*48}
              stroke="#4a90d9" strokeWidth="0.7" opacity="0.28"/>
          ))}
          {[BD, BD+20, BD+42].map((x,i)=>(
            <line key={'v'+i}
              x1={x} y1={r1B+WL} x2={x} y2={r2B}
              stroke="#4a90d9" strokeWidth="0.7" opacity="0.28"/>
          ))}
          <ZL x={BD+(skyR-BD)/2} y={r1B+WL+(r2B-r1B-WL)/2+6} t="sky" c="#4a90d9" small/>

          {/* ═══════ ROW 2 — HALL ═══════ */}

          {/* dining table — SMALLER, centered */}
          <Piece x={hallL+70} y={r1B+WL+62} w={130} h={170} label="table" rx={14}/>

          {/* chairs: 1 top centered, 1 bottom centered, 2 left stacked, 2 right stacked */}
          {/* top — 1 */}
          <Piece x={hallL+116} y={r1B+WL+25} w={40}  h={28} rx={5}/>
          {/* bottom — 1 */}
          <Piece x={hallL+116} y={r1B+WL+240} w={40} h={28} rx={5}/>
          {/* left — 2 stacked */}
          <Piece x={hallL+22}  y={r1B+WL+92}  w={28} h={38} rx={5}/>
          <Piece x={hallL+22}  y={r1B+WL+142} w={28} h={38} rx={5}/>
          {/* right — 2 stacked */}
          <Piece x={hallL+222} y={r1B+WL+92}  w={28} h={38} rx={5}/>
          <Piece x={hallL+222} y={r1B+WL+142} w={28} h={38} rx={5}/>

          {/* bar — flush against right wall of hall, centered vertically in hall */}
          {(() => {
            const bW = 50;
            const bH = 180;
            const bX = hallR - bW - 6;   // flush right, 6px from wall
            const bY = r1B + WL + 70 + Math.floor((r2B - r1B - WL - nicheH - WL - bH) / 2);
            return <Piece x={bX} y={bY} w={bW} h={bH} label="bar" color="#d4a843" fs={12}/>;
          })()}

          {/* niche — small centered rect in lower-hall, NOT full width */}
          <Piece x={hallL+40} y={nicheT+WL+6}
            w={200} h={nicheH-WL-12}
            label="Niche" color="#d4a843" fs={12}/>

          <ZL x={hallL+140} y={r1B+WL+26} t="Hall"/>

          {/* ═══════ ROW 2 — STAIRS ═══════ */}
          {Array.from({length:13}).map((_,i)=>(
            <line key={i}
              x1={strL+WL} y1={r1B+WL+i*((r2B-r1B-WL)/13)}
              x2={VW-BD}   y2={r1B+WL+i*((r2B-r1B-WL)/13)}
              stroke="#303028" strokeWidth="1.1"/>
          ))}
          <ZL x={(strL+WL+VW-BD)/2} y={(r1B+WL+r2B)/2+6} t="Stairs" c="#4a90d9" small/>

          {/* ═══════ ROW 3 — MASTER ═══════ */}
          {/* Vanity — CENTERED in master wall width */}
          {(() => {
            const vW = 180, vH = 38;
            const vX = BD + Math.floor((mstR - BD - vW) / 2);
            return <Piece x={vX} y={r2B+WL+8} w={vW} h={vH} label="vanity"/>;
          })()}

          {/* commode TOP — above bed, no left gap */}
          <Piece x={BD+WL+4} y={r2B+WL+40}  w={30} h={35} rx={4}/>

          {/* bed — 60% of master room width, with space for TV on right */}
          <Piece x={BD+WL+4} y={r2B+WL+80}  w={Math.floor((mstR-BD)*0.60)} h={188} label="bed" rx={10}/>

          {/* commode BOTTOM — below bed */}
          <Piece x={BD+WL+4} y={r2B+WL+272} w={30} h={35} rx={4}/>

          {/* Last wall — mirror LEFT (1/5) + divider + drawer RIGHT (4/5) */}
          <Piece x={BD+WL+4}              y={drawerY} w={mrrW}   h={drawerH} label="mirror" rx={5} color="#9ab0d0" fs={9}/>
          <W_   x={BD+WL+4+mrrW+1}        y={drawerY} w={WL}     h={drawerH}/>
          <Piece x={BD+WL+4+mrrW+WL+1}    y={drawerY} w={drawerW} h={drawerH} label="drawer" rx={5}/>

          {/* TV — centered on mstR wall face (right wall of master) */}
          <Piece x={mstR-tvW2-1} y={tvY} w={tvW2} h={tvH} label="tv" fs={8} color="#4a90d9"/>

          <ZL x={BD+(mstR-BD)/2} y={r2B+WL+235} t="Master"/>

          {/* ═══════ ROW 3 — UTIL ═══════ */}
          <W_ x={utlL} y={r2B+WL+164} w={VW-utlL-BD} h={WL}/>
          <Piece x={utlL+6} y={r2B+WL+6}   w={VW-utlL-BD-12} h={150}
            label="bathroom" rx={8} fs={12}/>
          <Piece x={utlL+6} y={r2B+WL+174} w={VW-utlL-BD-12} h={VH-r2B-WL-174-BD-8}
            label="kitchen" rx={8} fs={12} color="#666"/>

          {/* ─── INTERACTIVE HOTSPOTS ─── */}
          {SPOTS.map((h,idx) => {
            const on = sel === h.id;
            // Use exact visual coords if provided, else fall back to hotspot bounds
            const vx = h.vx ?? h.x, vy = h.vy ?? h.y;
            const vw = h.vw ?? h.w, vh = h.vh ?? h.h;
            const cx = vx + vw/2;
            const cy = vy + vh/2;
            return (
              <g key={h.id+idx} className="furn-hotspot"
                onClick={() => tap(h.id)}
                role="button" tabIndex={0} aria-label={h.ar}
                onKeyDown={e => e.key==='Enter' && tap(h.id)}>
                {/* Invisible hit area — full hotspot region */}
                <rect x={h.x-4} y={h.y-4} width={h.w+8} height={h.h+8} fill="transparent"/>
                {/* Hover highlight — exact visual shape */}
                <rect x={vx} y={vy} width={vw} height={vh} rx={6}
                  fill={on?'rgba(212,168,67,0.2)':'rgba(212,168,67,0)'}
                  stroke={on?'#d4a843':'rgba(212,168,67,0)'}
                  strokeWidth={2} className="furn-hover-rect"/>
                {on && (
                  <rect x={vx-4} y={vy-4} width={vw+8} height={vh+8} rx={9}
                    fill="none" stroke="#d4a843" strokeWidth="1.5"
                    strokeDasharray="6 3" className="furn-selected-ring"/>
                )}
                <text x={cx} y={cy+5} textAnchor="middle" fontSize="14"
                  fill="#d4a843" fontFamily="Cairo,sans-serif" fontWeight="700"
                  className="furn-label" style={{opacity:on?1:undefined}}>
                  {h.ar}
                </text>
                <circle cx={cx} cy={vy+14} r={4}
                  fill={on?'#d4a843':'rgba(212,168,67,0.45)'}
                  className="furn-hover-rect"/>
              </g>
            );
          })}

        </svg>
      </div>
      {piece && <FurniturePopup piece={piece} onClose={()=>setSel(null)}/>}
    </div>
  );
}

/* ─── SVG helpers (all outside component) ─── */

function W_({ x, y, w, h }) {
  return <rect x={x} y={y} width={w} height={h} fill="#4a90d9"/>;
}

function Door({ x, y, w, h, vert=false }) {
  // vert=true: w = wall thickness (narrow), h = door opening (tall)
  // render as a tall narrow rect
  const rectW = vert ? w : w;
  const rectH = vert ? h : (h ?? WL+2);
  return (
    <rect x={x} y={y} width={rectW} height={rectH}
      rx={3} fill="rgba(245,166,35,0.18)" stroke="#f5a623" strokeWidth="1.5"/>
  );
}

function Piece({ x, y, w, h, label='', color='#4a90d9', rx=6, fs=13 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx}
        fill="rgba(74,144,217,0.07)" stroke={color} strokeWidth="1.5"/>
      {label && (
        <text x={x+w/2} y={y+h/2+fs*0.38} textAnchor="middle"
          fontSize={fs} fill={color} fontFamily="sans-serif" opacity="0.9">{label}</text>
      )}
    </g>
  );
}

function ZL({ x, y, t, c='#50d080', small=false }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={small?11:13}
      fontStyle="italic" fill={c} fontFamily="sans-serif" opacity="0.9">{t}</text>
  );
}
