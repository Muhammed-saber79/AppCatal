import { useState } from 'react';
import './FloorPlan2D.css';

// Image map — piece id → public image path
const IMAGE_MAP = {
  'sofa':            '/images/Reception-sofa.png',
  'reception-table': '/images/Reciption-table.png',
  'tv-unit':         '/images/Reception-tv-unit.png',
  'bed':             '/images/Master-bed.png',
  'wardrobe':        '/images/Master-drawer.png',
  'mirror-rack':     '/images/Master-mirror&rack.png',
  'vanity':          '/images/Master-تسريحة.png',
  'display-cabinet': '/images/Hall-nich.png',
  'bar-sideboard':   '/images/Hall-bar.jpg',
  'dining-table':    '/images/Hall-table.png',
  'baby-wardrobe':   '/images/Baby-drawer.png',
  'baby-bed':        '/images/Baby-bed.png',
  'baby-commode':    '/images/Baby-commode.png',
  'master-drawer':   '/images/Master-drawer.png',
};

// Second image per piece (toggle button on the photo side)
const ALT_IMAGE_MAP = {
  'mirror-rack':  { src: '/images/Master-mirror&rack-back.png', showAlt: '↺ عرض الخلف',       showMain: '↺ عرض الأمام' },
  'dining-table': { src: '/images/Hall-table-2.png',            showAlt: '↺ زاوية تانية',     showMain: '↺ الزاوية الأولى' },
  'baby-bed':     { src: '/images/Baby-bed-2.png',              showAlt: '↺ السرير التاني',   showMain: '↺ السرير الأول' },
};

// 2D architectural sketch for each piece (inline SVG)
function Sketch2D({ id }) {
  switch(id) {
    case 'sofa':            return <SofaSketch />;
    case 'reception-table': return <TableSketch />;
    case 'tv-unit':         return <TvUnitSketch />;
    case 'bed':             return <BedSketch large={true} />;
    case 'wardrobe':        return <WardrobeSketch />;
    case 'mirror-rack':     return <MirrorRackSketch />;
    case 'vanity':          return <VanitySketch />;
    case 'display-cabinet': return <NicheSketch />;
    case 'bar-sideboard':   return <BarSketch />;
    case 'dining-table':    return <DiningSketch />;
    case 'baby-wardrobe':   return <BabyWardrobeSketch />;
    case 'baby-commode':    return <CommodeSketch />;
    case 'baby-bed':        return <BabyBedSketch />;
    default:                return null;
  }
}

export default function FurniturePopup({ piece, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  // some pieces have 2 images — toggle between them
  const [mirrorSide, setMirrorSide] = useState('front');

  const altImage = ALT_IMAGE_MAP[piece.id];
  const isMirrorRack = Boolean(altImage);
  const imgSrc = altImage && mirrorSide === 'back' ? altImage.src : IMAGE_MAP[piece.id];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (zoomed) { setZoomed(false); return; }
      onClose();
    }
  };

  // Zoom overlay — full screen image viewer
  if (zoomed && imgSrc && !imgErr) {
    return (
      <div
        style={{
          position:'fixed', inset:0, zIndex:600,
          background:'rgba(0,0,0,0.92)',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'zoom-out',
        }}
        onClick={() => setZoomed(false)}
      >
        <img
          src={imgSrc}
          alt={piece.nameAr}
          style={{
            maxWidth:'95vw', maxHeight:'95vh',
            objectFit:'contain', borderRadius:8,
            boxShadow:'0 0 60px rgba(212,168,67,0.2)',
          }}
          onClick={e => e.stopPropagation()}
        />
        <button
          onClick={() => setZoomed(false)}
          style={{
            position:'absolute', top:20, right:20,
            background:'rgba(212,168,67,0.15)',
            border:'1px solid rgba(212,168,67,0.4)',
            color:'#d4a843', borderRadius:8,
            width:36, height:36, fontSize:16, cursor:'pointer',
          }}
        >✕</button>
      </div>
    );
  }

  return (
    <div className="fp-popup-overlay" onClick={handleOverlayClick}>
      {/* Scene wrapper — perspective */}
      <div className="fp-card-scene" onClick={() => setFlipped(f => !f)}>
        <div className={`fp-card ${flipped ? 'flipped' : ''}`}>

          {/* ── FRONT: 2D Architectural Sketch ── */}
          <div className="fp-card-face fp-card-front">
            <div className="fp-card-header" onClick={e => e.stopPropagation()}>
              <div>
                <div className="fp-card-name">{piece.nameAr}</div>
              </div>
              <span className="fp-card-room">{piece.roomNameAr}</span>
              <button className="fp-close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
            </div>

            <div className="fp-card-body">
              <div className="fp-sketch-wrap">
                <svg viewBox="0 0 360 260" width="100%" height="100%" style={{ maxHeight: '280px' }}>
                  <Sketch2D id={piece.id} />
                </svg>
              </div>
            </div>

            <div className="fp-card-footer">
              <span className="fp-flip-icon">↻</span>
              <span>اضغط للتقليب ورؤية الصورة الحقيقية</span>
            </div>
          </div>

          {/* ── BACK: Real Photo ── */}
          <div className="fp-card-face fp-card-back">
            <div className="fp-card-header" onClick={e => e.stopPropagation()}>
              <div>
                <div className="fp-card-name">{piece.nameAr}</div>
                <span style={{ fontSize: 12, color: 'rgba(212,168,67,0.5)' }}>{piece.nameEn}</span>
              </div>
              <span className="fp-card-room">{piece.roomNameAr}</span>
              <div style={{ display:'flex', gap:6, marginRight:'auto', marginLeft:8 }} onClick={e => e.stopPropagation()}>
                {/* Zoom button */}
                {!imgErr && imgSrc && (
                  <button
                    className="fp-close-btn"
                    onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
                    title="تكبير الصورة"
                    style={{ fontSize:15 }}
                  >⛶</button>
                )}
                <button className="fp-close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
              </div>
            </div>

            <div className="fp-card-body">
              <div className="fp-photo-wrap" style={{ position:'relative' }}>
                {!imgErr && imgSrc ? (
                  <>
                    <img
                      src={imgSrc}
                      alt={piece.nameAr}
                      className="fp-photo"
                      style={{ cursor:'zoom-in' }}
                      onError={() => setImgErr(true)}
                      onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
                    />
                    {/* Front/Back toggle for mirror-rack */}
                    {isMirrorRack && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setMirrorSide(s => s === 'front' ? 'back' : 'front'); setImgErr(false); }}
                        style={{
                          position:'absolute', bottom:8, left:8,
                          background:'rgba(12,10,8,0.85)',
                          border:'1px solid rgba(212,168,67,0.4)',
                          borderRadius:6, padding:'4px 12px',
                          fontSize:11, color:'#d4a843',
                          fontFamily:'Cairo, sans-serif',
                          cursor:'pointer',
                        }}
                      >{mirrorSide === 'front' ? altImage.showAlt : altImage.showMain}</button>
                    )}
                    <div
                      style={{
                        position:'absolute', bottom:8, right:8,
                        background:'rgba(0,0,0,0.5)',
                        border:'1px solid rgba(212,168,67,0.3)',
                        borderRadius:6, padding:'3px 8px',
                        fontSize:11, color:'rgba(212,168,67,0.7)',
                        fontFamily:'sans-serif', pointerEvents:'none',
                      }}
                    >🔍 اضغط للتكبير</div>
                  </>
                ) : (
                  <div className="fp-photo-placeholder">
                    <span className="fp-photo-placeholder-icon">🏠</span>
                    <span>الصورة غير متاحة</span>
                  </div>
                )}
              </div>
            </div>

            <div className="fp-card-footer">
              <span className="fp-flip-icon">↻</span>
              <span>اضغط للعودة للرسم الهندسي</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs below card */}
      <SpecsBar piece={piece} />
    </div>
  );
}

function SpecsBar({ piece }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '90vw',
    }}>
      {piece.specs.slice(0, 4).map((s, i) => (
        <div key={i} style={{
          background: 'rgba(12,10,8,0.8)',
          border: '1px solid rgba(212,168,67,0.2)',
          borderRadius: 20,
          padding: '4px 14px',
          fontFamily: 'Cairo, sans-serif',
          fontSize: 12,
          color: '#c8b888',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: '#d4a843' }}>{s.labelAr}: </span>{s.value}
        </div>
      ))}
    </div>
  );
}

/* ── 2D Sketch SVGs — architectural top-view style ── */

function SofaSketch() {
  return (
    <g>
      {/* Back rest */}
      <rect x="20" y="80" width="320" height="35" rx="5" fill="#2a2218" stroke="#c8b888" strokeWidth="2"/>
      {[22, 130, 238].map((x,i) => (
        <rect key={i} x={x} y={83} width={105} height={29} rx={3} fill="#3a3028" stroke="#999" strokeWidth="1"/>
      ))}
      {/* Seat */}
      <rect x="20" y="115" width="320" height="55" rx="5" fill="#2a2218" stroke="#c8b888" strokeWidth="2"/>
      {[22, 130, 238].map((x,i) => (
        <rect key={i} x={x} y={118} width={105} height={49} rx={3} fill="#3a3028" stroke="#999" strokeWidth="1"/>
      ))}
      {/* Arms */}
      <rect x="8" y="80" width="14" height="92" rx="4" fill="#2a2218" stroke="#d4a843" strokeWidth="2"/>
      <rect x="338" y="80" width="14" height="92" rx="4" fill="#2a2218" stroke="#d4a843" strokeWidth="2"/>
      {/* Legs */}
      {[28, 95, 175, 245, 320].map((x,i) => (
        <rect key={i} x={x} y={170} width={10} height={12} rx={2} fill="#d4a843"/>
      ))}
      {/* Label */}
      <text x="180" y="250" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">كنبة — 3 مقاعد</text>
    </g>
  );
}

function TableSketch() {
  return (
    <g>
      {/* Glass top */}
      <rect x="60" y="70" width="240" height="120" rx="8" fill="rgba(180,220,240,0.15)" stroke="#d4a843" strokeWidth="2.5"/>
      <rect x="60" y="70" width="240" height="5" rx="2" fill="#d4a843" opacity="0.6"/>
      {/* Base capsule */}
      <ellipse cx="180" cy="200" rx="80" ry="22" fill="#2a2218" stroke="#d4a843" strokeWidth="2"/>
      <rect x="100" y="178" width="160" height="44" rx="8" fill="#2a2218" stroke="#d4a843" strokeWidth="1.5"/>
      {/* Glass highlight */}
      <rect x="70" y="76" width="60" height="8" rx="3" fill="white" opacity="0.1"/>
      <text x="180" y="250" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">طاولة زجاجية — قاعدة كبسولة</text>
    </g>
  );
}

function TvUnitSketch() {
  return (
    <g>
      {/* Wall-mounted screen */}
      <rect x="95" y="20" width="170" height="96" rx="4" fill="#14120f" stroke="#888" strokeWidth="2"/>
      <rect x="101" y="26" width="158" height="84" rx="2" fill="rgba(120,160,200,0.12)"/>
      <line x1="110" y1="34" x2="140" y2="64" stroke="white" strokeWidth="1" opacity="0.12"/>
      {/* Floating unit — rounded ends */}
      <rect x="20" y="150" width="320" height="50" rx="22" fill="#5a3e28" stroke="#d4a843" strokeWidth="2"/>
      <rect x="20" y="150" width="320" height="6" rx="3" fill="#7a5638" opacity="0.8"/>
      {/* 4 handle-less drawers */}
      {[103, 180, 257].map((x,i)=>(
        <line key={i} x1={x} y1={160} x2={x} y2={194} stroke="#2a1c12" strokeWidth={1.5}/>
      ))}
      {/* Wood grain */}
      {[168, 176, 184].map((y,i)=>(
        <line key={i} x1={34} y1={y} x2={326} y2={y} stroke="#d4a843" strokeWidth={0.5} opacity={0.15}/>
      ))}
      {/* Floating gap / shadow */}
      <rect x="40" y="212" width="280" height="4" rx="2" fill="#000" opacity="0.35"/>
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">وحدة شاشة معلّقة — خشب جوز — 4 أدراج</text>
    </g>
  );
}

function BedSketch({ large }) {
  const strips = large ? 12 : 8;
  const hw = large ? 300 : 260;
  const hx = (360 - hw) / 2;
  const sw = hw / strips;
  return (
    <g>
      {/* Platform */}
      <rect x="20" y="130" width="320" height="100" rx="6" fill="#2a2218" stroke="#c8b888" strokeWidth="2"/>
      <rect x="20" y="130" width="320" height="10" rx="4" fill="#3a3028"/>
      {/* Mattress */}
      <rect x="25" y="120" width="310" height="15" rx="4" fill="#3a3028" stroke="#aaa" strokeWidth="1"/>
      {/* Headboard */}
      <rect x={hx} y="40" width={hw} height={80} rx="6" fill="#2a2218" stroke="#c8b888" strokeWidth="2"/>
      {Array.from({length: strips}).map((_,i) => (
        <rect key={i} x={hx + 2 + i*sw} y={44} width={sw-4} height={72} rx={3}
          fill={i%2===0 ? '#3a3028' : '#2a2218'} stroke="#888" strokeWidth="0.8"/>
      ))}
      {/* Pillow */}
      <rect x="110" y="112" width="140" height="12" rx="5" fill="#4a4838" stroke="#888" strokeWidth="1"/>
      {/* LED rings */}
      <ellipse cx="14" cy="90" rx="10" ry="10" fill="none" stroke="#d4a843" strokeWidth="2.5"/>
      <ellipse cx="14" cy="90" rx="5" ry="5" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.5"/>
      <ellipse cx="346" cy="90" rx="10" ry="10" fill="none" stroke="#d4a843" strokeWidth="2.5"/>
      <ellipse cx="346" cy="90" rx="5" ry="5" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.5"/>
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">
        {large ? 'سرير رئيسي — LED — منصة' : 'سرير أطفال'}
      </text>
    </g>
  );
}

function WardrobeSketch() {
  return (
    <g>
      <rect x="10" y="20" width="340" height="190" rx="4" fill="#1e1a16" stroke="#d4a843" strokeWidth="2"/>
      {/* Open section */}
      <rect x="10" y="20" width="85" height="190" fill="#1a1612" stroke="#d4a843" strokeWidth="1"/>
      <line x1="10" y1="46" x2="95" y2="46" stroke="#888" strokeWidth="1.5"/>
      <line x1="20" y1="68" x2="90" y2="68" stroke="#d4a843" strokeWidth="2.5"/>
      {[30,48,66].map((x,i)=>(
        <g key={i}>
          <line x1={x} y1="68" x2={x-10} y2="88" stroke="#888" strokeWidth="1.2"/>
          <line x1={x} y1="68" x2={x+10} y2="88" stroke="#888" strokeWidth="1.2"/>
        </g>
      ))}
      <text x="52" y="178" textAnchor="middle" fontSize="9" fill="#d4a843" fontFamily="Cairo">شماعات</text>
      {/* Divider */}
      <line x1="95" y1="20" x2="95" y2="210" stroke="#d4a843" strokeWidth="2"/>
      {/* Tracks */}
      <rect x="95" y="20" width="255" height="5" rx="1" fill="#d4a843" opacity="0.5"/>
      <rect x="95" y="205" width="255" height="5" rx="1" fill="#d4a843" opacity="0.5"/>
      {/* 4 sliding doors */}
      {[98, 160, 222, 284].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={25} width={60} height={178} rx={2} fill="#1e1a14" stroke="#666" strokeWidth={1}/>
          {(i===1||i===2) && (
            <rect x={x+4} y={29} width={52} height={170} rx={4} fill="rgba(180,210,230,0.2)" stroke="#d4a843" strokeWidth={1}/>
          )}
          <rect x={x+27} y={106} width={5} height={14} rx={2.5} fill="#d4a843" opacity={0.8}/>
        </g>
      ))}
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">خزانة — قسم مفتوح + 4 أبواب انزلاقية بمرايا</text>
    </g>
  );
}

function VanitySketch() {
  return (
    <g>
      {/* LED Mirror */}
      <rect x="105" y="10" width="150" height="110" rx="6" fill="none" stroke="#ffe066" strokeWidth="4" opacity="0.3"/>
      <rect x="108" y="13" width="144" height="104" rx="5" fill="#1a1814" stroke="#d4a843" strokeWidth="2"/>
      <rect x="114" y="19" width="132" height="92" rx="4" fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="1"/>
      <rect x="108" y="13" width="144" height="4" rx="2" fill="#d4a843" opacity="0.8"/>
      <rect x="108" y="117" width="144" height="4" rx="2" fill="#d4a843" opacity="0.7"/>
      {/* Body */}
      <rect x="20" y="125" width="320" height="70" rx="5" fill="#1e1a14" stroke="#d4a843" strokeWidth="2"/>
      <rect x="24" y="129" width="95" height="62" rx="3" fill="#252018" stroke="#555" strokeWidth="1"/>
      <line x1="71" y1="129" x2="71" y2="191" stroke="#555" strokeWidth="0.8"/>
      <rect x="125" y="129" width="110" height="62" rx="3" fill="#252018" stroke="#555" strokeWidth="1"/>
      <line x1="125" y1="160" x2="235" y2="160" stroke="#555" strokeWidth="1"/>
      <rect x="172" y="140" width="16" height="4" rx="2" fill="#d4a843" opacity="0.8"/>
      <rect x="172" y="169" width="16" height="4" rx="2" fill="#d4a843" opacity="0.8"/>
      <rect x="241" y="129" width="95" height="62" rx="3" fill="#252018" stroke="#555" strokeWidth="1"/>
      {/* Stool */}
      <rect x="145" y="202" width="70" height="22" rx="8" fill="#2a2218" stroke="#888" strokeWidth="1.5"/>
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">تسريحة — مرآة LED — أدراج</text>
    </g>
  );
}

function NicheSketch() {
  return (
    <g>
      <rect x="100" y="10" width="160" height="240" rx="5" fill="rgba(180,220,240,0.08)" stroke="#d4a843" strokeWidth="2"/>
      <rect x="102" y="12" width="7" height="236" rx="3" fill="#d4a843" opacity="0.6"/>
      <rect x="251" y="12" width="7" height="236" rx="3" fill="#d4a843" opacity="0.6"/>
      {[55, 95, 135, 175, 215].map((y,i)=>(
        <rect key={i} x={107} y={y} width={146} height={7} rx={3}
          fill="rgba(180,220,240,0.4)" stroke="#d4a843" strokeWidth={1}/>
      ))}
      <rect x="100" y="10" width="160" height="9" rx="4" fill="#d4a843" opacity="0.6"/>
      <rect x="100" y="241" width="160" height="9" rx="4" fill="#d4a843" opacity="0.6"/>
      <text x="180" y="262" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">نيتش — 5 رفوف زجاجية — LED</text>
    </g>
  );
}

function BarSketch() {
  return (
    <g>
      {/* 3 pebble-shaped mirrors */}
      <path d="M95,18 C125,10 150,40 150,85 C150,125 130,130 100,118 C70,105 55,80 62,55 C68,35 78,22 95,18 Z"
        fill="rgba(180,150,110,0.18)" stroke="#d4a843" strokeWidth="2"/>
      <path d="M185,22 C210,18 225,35 222,62 C220,85 205,92 188,86 C172,80 165,60 168,42 C170,30 176,24 185,22 Z"
        fill="rgba(180,150,110,0.18)" stroke="#d4a843" strokeWidth="2"/>
      <path d="M175,112 C195,98 240,98 255,110 C266,120 258,132 235,134 C205,137 178,135 170,126 C166,120 168,116 175,112 Z"
        fill="rgba(180,150,110,0.18)" stroke="#d4a843" strokeWidth="2"/>
      {/* Body — rounded ends, cream */}
      <rect x="20" y="152" width="320" height="68" rx="14" fill="#3a332a" stroke="#d4a843" strokeWidth="1.5"/>
      {/* Wood top */}
      <rect x="15" y="143" width="330" height="11" rx="5" fill="#8a6038" stroke="#d4a843" strokeWidth="1.5"/>
      {/* 4 doors (2+2) */}
      {[38, 113, 188, 263].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={157} width={72} height={60} rx={2} fill="#2f2a22" stroke="#555" strokeWidth={1}/>
          <rect x={i%2===0 ? x+64 : x+4} y={174} width={3} height={22} rx={1.5} fill="#d4a843" opacity={0.9}/>
        </g>
      ))}
      {/* Tapered legs with gold tips */}
      {[44, 308].map((x,i)=>(
        <g key={i}>
          <polygon points={`${x},220 ${x+8},220 ${x+6},234 ${x+2},234`} fill="#3a332a" stroke="#888" strokeWidth={0.8}/>
          <rect x={x+2} y={231} width={4} height={4} fill="#d4a843"/>
        </g>
      ))}
      <text x="180" y="252" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">وحدة بار — 4 أبواب — سطح خشب — 3 مرايا حصى</text>
    </g>
  );
}

function DiningSketch() {
  return (
    <g>
      {/* Table */}
      <rect x="60" y="50" width="240" height="155" rx="6" fill="rgba(180,220,240,0.15)" stroke="#d4a843" strokeWidth="2.5"/>
      <rect x="60" y="50" width="240" height="6" rx="3" fill="#d4a843" opacity="0.6"/>
      {/* Wooden legs */}
      {[[72,62],[278,62],[72,183],[278,183]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={10} height={10} rx={2} fill="#4a3a2c" stroke="#d4a843" strokeWidth={1} opacity={0.8}/>
      ))}
      {/* Chairs top */}
      <rect x="150" y="20" width="60" height="32" rx="5" fill="#2a2218" stroke="#888" strokeWidth="1.5"/>
      {/* Chairs bottom */}
      <rect x="150" y="205" width="60" height="32" rx="5" fill="#2a2218" stroke="#888" strokeWidth="1.5"/>
      {/* Chairs left */}
      {[65, 130].map((y,i)=>(
        <rect key={i} x={22} y={y} width={40} height={52} rx={5} fill="#2a2218" stroke="#888" strokeWidth={1.5}/>
      ))}
      {/* Chairs right */}
      {[65, 130].map((y,i)=>(
        <rect key={i} x={298} y={y} width={40} height={52} rx={5} fill="#2a2218" stroke="#888" strokeWidth={1.5}/>
      ))}
      <text x="180" y="252" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">طاولة بسطح زجاج برونزي — أرجل خشب — 6 كراسي</text>
    </g>
  );
}

function BabyWardrobeSketch() {
  return (
    <g>
      <rect x="15" y="30" width="330" height="180" rx="4" fill="#1e1a14" stroke="#d4a843" strokeWidth="2"/>
      <rect x="15" y="30" width="330" height="5" rx="1" fill="#d4a843" opacity="0.5"/>
      <rect x="15" y="205" width="330" height="5" rx="1" fill="#d4a843" opacity="0.5"/>
      {/* Door 1 */}
      <rect x="17" y="35" width="163" height="170" rx="2" fill="#252018" stroke="#666" strokeWidth="1.2"/>
      {/* Mirror on left half of door 1 */}
      <rect x="21" y="39" width="66" height="162" rx="2" fill="rgba(180,210,230,0.18)" stroke="#888" strokeWidth="1"/>
      <line x1="30" y1="50" x2="55" y2="80" stroke="white" strokeWidth="1" opacity="0.15"/>
      {/* Wavy S wood strip */}
      <path d="M92,35 L92,100 C92,115 104,115 104,130 L104,205" fill="none" stroke="#9a8f84" strokeWidth="5"/>
      {/* Door 2 */}
      <rect x="180" y="35" width="163" height="170" rx="2" fill="#252018" stroke="#666" strokeWidth="1.2"/>
      <path d="M255,35 L255,110 C255,125 267,125 267,140 L267,205" fill="none" stroke="#9a8f84" strokeWidth="5"/>
      <text x="180" y="230" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">خزانة أطفال — بابان انزلاقيان — شريط خشب متموّج + مرآة</text>
    </g>
  );
}

function BabyBedSketch() {
  // Two mirrored single beds — accent slot on the outer side of each
  const Bed = ({ x, flip }) => (
    <g>
      {/* Headboard (cream) */}
      <rect x={x} y={40} width={150} height={70} rx={8} fill="#3a352c" stroke="#d4a843" strokeWidth={2}/>
      {/* Gray upholstered panel */}
      <rect x={flip ? x+38 : x+12} y={50} width={100} height={50} rx={6} fill="#4a4a4a" stroke="#888" strokeWidth={1}/>
      {/* Oval slot with wood strip */}
      <rect x={flip ? x+14 : x+122} y={54} width={14} height={42} rx={7} fill="#14110d" stroke="#888" strokeWidth={1}/>
      <rect x={flip ? x+18 : x+126} y={58} width={6} height={34} rx={3} fill="#7a6a5c"/>
      {/* Mattress */}
      <rect x={x+4} y={110} width={142} height={22} rx={5} fill="#3a3a38" stroke="#aaa" strokeWidth={1}/>
      {/* Ash wood base with white band */}
      <rect x={x} y={132} width={150} height={8} rx={2} fill="#4a453c" stroke="#888" strokeWidth={0.8}/>
      <rect x={x} y={140} width={150} height={50} rx={3} fill="#6e655c" stroke="#d4a843" strokeWidth={1.5}/>
    </g>
  );
  return (
    <g>
      <Bed x={15} flip={false}/>
      <Bed x={195} flip={true}/>
      <text x="180" y="230" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">سريرين أطفال — التاني عكس الأول</text>
    </g>
  );
}

function CommodeSketch() {
  return (
    <g>
      {/* Bronze glass top on wood frame */}
      <rect x="85" y="40" width="190" height="12" rx="3" fill="rgba(120,90,60,0.45)" stroke="#d4a843" strokeWidth="1.5"/>
      <rect x="82" y="52" width="196" height="9" rx="3" fill="#8a6a4c" stroke="#888" strokeWidth="1"/>
      {/* Cream body with rounded sides */}
      <rect x="88" y="61" width="184" height="110" rx="14" fill="#3a352c" stroke="#d4a843" strokeWidth="2"/>
      {/* Carved finger-pull */}
      <path d="M160,61 L200,61 L196,70 C190,74 170,74 164,70 Z" fill="#14110d" stroke="#888" strokeWidth="0.8"/>
      {/* Walnut base */}
      <rect x="95" y="171" width="170" height="44" rx="2" fill="#5a3e28" stroke="#d4a843" strokeWidth="1.5"/>
      {[182, 192, 202].map((y,i)=>(
        <line key={i} x1={100} y1={y} x2={260} y2={y} stroke="#d4a843" strokeWidth={0.5} opacity={0.2}/>
      ))}
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">كومود — درج واحد — سطح زجاج — قاعدة جوز</text>
    </g>
  );
}

function MirrorRackSketch() {
  return (
    <g>
      {/* Top shelf / rack */}
      <rect x="20" y="18" width="320" height="24" rx="4" fill="#2a2420" stroke="#d4a843" strokeWidth="2"/>
      {/* Bracket supports */}
      {[44, 176, 308].map((x,i) => (
        <rect key={i} x={x} y={42} width={8} height={28} rx={2} fill="#d4a843" opacity="0.5"/>
      ))}
      {/* Large center mirror */}
      <rect x="85" y="78" width="190" height="148" rx="6"
        fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="2"/>
      {/* LED strips */}
      <rect x="85"  y="78"  width="190" height="5" rx="2" fill="#d4a843" opacity="0.8"/>
      <rect x="85"  y="221" width="190" height="5" rx="2" fill="#d4a843" opacity="0.7"/>
      <rect x="85"  y="78"  width="5"   height="148" rx="2" fill="#d4a843" opacity="0.7"/>
      <rect x="270" y="78"  width="5"   height="148" rx="2" fill="#d4a843" opacity="0.7"/>
      {/* Reflection */}
      <line x1="100" y1="94"  x2="135" y2="129" stroke="white" strokeWidth="1" opacity="0.15"/>
      <line x1="100" y1="112" x2="148" y2="160" stroke="white" strokeWidth="0.7" opacity="0.1"/>
      {/* Small side mirror left */}
      <rect x="20" y="78" width="58" height="148" rx="4"
        fill="rgba(180,210,230,0.1)" stroke="#d4a843" strokeWidth="1.5"/>
      <line x1="30" y1="90" x2="50" y2="110" stroke="white" strokeWidth="0.7" opacity="0.1"/>
      {/* Small side mirror right */}
      <rect x="282" y="78" width="58" height="148" rx="4"
        fill="rgba(180,210,230,0.1)" stroke="#d4a843" strokeWidth="1.5"/>
      <line x1="292" y1="90" x2="312" y2="110" stroke="white" strokeWidth="0.7" opacity="0.1"/>
      <text x="180" y="252" textAnchor="middle" fontSize="13"
        fill="rgba(212,168,67,0.6)" fontFamily="Cairo, sans-serif">مرايا ورف — الحائط الأخير للغرفة</text>
    </g>
  );
}
