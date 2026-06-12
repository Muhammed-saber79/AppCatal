// Dining Table SVG — thick glass rectangle, X-frame gold legs, 6 chairs in 1+2+2+1 layout
export default function DiningTableSVG({ width = 360, height = 260 }) {
  return (
    <svg viewBox="0 0 360 260" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Dining table sketch">

      {/* ── CHAIRS ── */}
      {/* Chair at head (top) — 1 */}
      <rect x="150" y="15" width="60" height="32" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="158" y="22" width="44" height="18" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>

      {/* Chairs left side — 2 */}
      <rect x="18" y="80" width="32" height="52" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="22" y="88" width="22" height="36" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>
      <rect x="18" y="148" width="32" height="52" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="22" y="156" width="22" height="36" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>

      {/* Chairs right side — 2 */}
      <rect x="310" y="80" width="32" height="52" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="316" y="88" width="22" height="36" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>
      <rect x="310" y="148" width="32" height="52" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="316" y="156" width="22" height="36" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>

      {/* Chair at foot (bottom) — 1 */}
      <rect x="150" y="213" width="60" height="32" rx="6" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="158" y="220" width="44" height="18" rx="3" fill="#d8c898" stroke="#a09060" strokeWidth="0.8"/>

      {/* ── TABLE ── */}
      {/* X-frame legs */}
      <line x1="80" y1="195" x2="200" y2="62" stroke="#d4a843" strokeWidth="3" strokeLinecap="round"/>
      <line x1="200" y1="195" x2="80" y2="62" stroke="#d4a843" strokeWidth="3" strokeLinecap="round"/>
      <line x1="160" y1="195" x2="280" y2="62" stroke="#d4a843" strokeWidth="3" strokeLinecap="round"/>
      <line x1="280" y1="195" x2="160" y2="62" stroke="#d4a843" strokeWidth="3" strokeLinecap="round"/>

      {/* Glass table top */}
      <rect x="55" y="55" width="250" height="148" rx="6" fill="rgba(180,220,240,0.28)" stroke="#d4a843" strokeWidth="2.5"/>
      {/* Glass highlight */}
      <rect x="65" y="62" width="90" height="10" rx="3" fill="white" opacity="0.2"/>
      <rect x="65" y="62" width="2" height="128" rx="1" fill="white" opacity="0.12"/>
      {/* Glass thickness edge */}
      <rect x="55" y="55" width="250" height="5" rx="3" fill="#d4a843" opacity="0.6"/>
      <rect x="55" y="198" width="250" height="5" rx="3" fill="#d4a843" opacity="0.4"/>
    </svg>
  );
}
