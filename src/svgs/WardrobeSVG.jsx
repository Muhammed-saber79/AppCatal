// Wardrobe SVG — left: open hanger unit (rod+hooks+shelves); right: 4 sliding doors, doors 2&3 have full-length rounded mirror panels
export default function WardrobeSVG({ width = 360, height = 220 }) {
  return (
    <svg viewBox="0 0 360 220" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Wardrobe sketch">
      {/* Outer frame */}
      <rect x="10" y="10" width="340" height="200" rx="4" fill="#2a2420" stroke="#d4a843" strokeWidth="2"/>

      {/* ── LEFT SECTION: Open hanger unit (width ~100px) ── */}
      <rect x="10" y="10" width="100" height="200" rx="0" fill="#1e1a16" stroke="#d4a843" strokeWidth="1" opacity="0.6"/>
      {/* Top shelf */}
      <rect x="14" y="36" width="92" height="6" rx="2" fill="#3a3028"/>
      {/* Hanger rod */}
      <rect x="18" y="56" width="84" height="4" rx="2" fill="#d4a843" opacity="0.8"/>
      {/* Hooks on rod */}
      {[30, 45, 60, 75, 90].map((x, i) => (
        <path key={i} d={`M${x},60 Q${x+4},66 ${x},72`} fill="none" stroke="#d4a843" strokeWidth="1.5"/>
      ))}
      {/* Clothes hangers (simplified) */}
      {[30, 55, 80].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="60" x2={x-10} y2="78" stroke="#8a7860" strokeWidth="1" opacity="0.6"/>
          <line x1={x} y1="60" x2={x+10} y2="78" stroke="#8a7860" strokeWidth="1" opacity="0.6"/>
          <rect x={x-10} y="78" width="20" height="18" rx="2" fill="#5a4838" opacity="0.5"/>
        </g>
      ))}
      {/* Bottom shelves */}
      <rect x="14" y="130" width="92" height="6" rx="2" fill="#3a3028"/>
      <rect x="14" y="158" width="92" height="6" rx="2" fill="#3a3028"/>
      <rect x="14" y="186" width="92" height="6" rx="2" fill="#3a3028"/>
      {/* Label */}
      <text x="60" y="212" textAnchor="middle" fontSize="8" fill="#d4a843" opacity="0.7">شماعات</text>

      {/* Divider between open and sliding sections */}
      <line x1="110" y1="10" x2="110" y2="210" stroke="#d4a843" strokeWidth="2"/>

      {/* ── RIGHT SECTION: 4 Sliding doors (width ~240px, each ~60px) ── */}
      {/* Door tracks */}
      <rect x="110" y="12" width="238" height="4" rx="1" fill="#d4a843" opacity="0.5"/>
      <rect x="110" y="202" width="238" height="4" rx="1" fill="#d4a843" opacity="0.5"/>

      {/* Door 1 — plain */}
      <rect x="112" y="16" width="58" height="186" rx="2" fill="#2a2420" stroke="#6a5a48" strokeWidth="1"/>
      <line x1="138" y1="16" x2="138" y2="202" stroke="#4a3a28" strokeWidth="0.5"/>

      {/* Door 2 — mirror panel (full-length rounded) */}
      <rect x="170" y="16" width="58" height="186" rx="2" fill="#2a2420" stroke="#d4a843" strokeWidth="1.2"/>
      <rect x="175" y="22" width="46" height="174" rx="6" fill="rgba(180,210,230,0.22)" stroke="#d4a843" strokeWidth="1"/>
      {/* Mirror reflection lines */}
      <line x1="182" y1="30" x2="200" y2="50" stroke="white" strokeWidth="0.8" opacity="0.2"/>
      <line x1="182" y1="45" x2="205" y2="72" stroke="white" strokeWidth="0.5" opacity="0.15"/>
      <text x="199" y="115" textAnchor="middle" fontSize="7" fill="#d4a843" opacity="0.6">مرآة</text>

      {/* Door 3 — mirror panel */}
      <rect x="228" y="16" width="58" height="186" rx="2" fill="#2a2420" stroke="#d4a843" strokeWidth="1.2"/>
      <rect x="233" y="22" width="46" height="174" rx="6" fill="rgba(180,210,230,0.22)" stroke="#d4a843" strokeWidth="1"/>
      <line x1="240" y1="30" x2="258" y2="50" stroke="white" strokeWidth="0.8" opacity="0.2"/>
      <line x1="240" y1="45" x2="263" y2="72" stroke="white" strokeWidth="0.5" opacity="0.15"/>
      <text x="257" y="115" textAnchor="middle" fontSize="7" fill="#d4a843" opacity="0.6">مرآة</text>

      {/* Door 4 — plain */}
      <rect x="286" y="16" width="58" height="186" rx="2" fill="#2a2420" stroke="#6a5a48" strokeWidth="1"/>
      <line x1="312" y1="16" x2="312" y2="202" stroke="#4a3a28" strokeWidth="0.5"/>

      {/* Door handles */}
      {[140, 198, 256, 314].map((x, i) => (
        <rect key={i} x={x-1} y="102" width="3" height="16" rx="1.5" fill="#d4a843" opacity="0.8"/>
      ))}
    </svg>
  );
}
