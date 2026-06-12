// Vanity SVG — wide body, center 2 drawers, side cabinets, large square LED-lit mirror, small stool
export default function VanitySVG({ width = 340, height = 260 }) {
  return (
    <svg viewBox="0 0 340 260" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Vanity sketch">
      {/* ── MIRROR (above) ── */}
      {/* LED glow outer */}
      <rect x="105" y="12" width="130" height="115" rx="8" fill="none" stroke="#ffe066" strokeWidth="4" opacity="0.3"/>
      {/* Mirror frame */}
      <rect x="108" y="15" width="124" height="109" rx="6" fill="#1a1814" stroke="#d4a843" strokeWidth="2"/>
      {/* Mirror glass */}
      <rect x="114" y="21" width="112" height="97" rx="4" fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="1"/>
      {/* Mirror LED border strip */}
      <rect x="108" y="15" width="124" height="4" rx="2" fill="#d4a843" opacity="0.7"/>
      <rect x="108" y="120" width="124" height="4" rx="2" fill="#d4a843" opacity="0.7"/>
      <rect x="108" y="15" width="4" height="109" rx="2" fill="#d4a843" opacity="0.7"/>
      <rect x="228" y="15" width="4" height="109" rx="2" fill="#d4a843" opacity="0.7"/>
      {/* Mirror reflection */}
      <line x1="122" y1="30" x2="148" y2="58" stroke="white" strokeWidth="1" opacity="0.15"/>
      <line x1="122" y1="48" x2="155" y2="82" stroke="white" strokeWidth="0.7" opacity="0.1"/>

      {/* ── VANITY BODY ── */}
      <rect x="20" y="130" width="300" height="70" rx="5" fill="#1e1a16" stroke="#d4a843" strokeWidth="1.5"/>

      {/* Left side cabinet */}
      <rect x="24" y="134" width="88" height="62" rx="3" fill="#2a2420" stroke="#5a4a38" strokeWidth="1"/>
      {/* Left cabinet door line */}
      <line x1="68" y1="134" x2="68" y2="196" stroke="#5a4a38" strokeWidth="0.8"/>
      <rect x="54" y="162" width="3" height="10" rx="1.5" fill="#d4a843" opacity="0.7"/>

      {/* Center 2 drawers */}
      <rect x="116" y="134" width="108" height="62" rx="3" fill="#2a2420" stroke="#5a4a38" strokeWidth="1"/>
      {/* Drawer divider */}
      <line x1="116" y1="165" x2="224" y2="165" stroke="#5a4a38" strokeWidth="1"/>
      {/* Drawer handles */}
      <rect x="162" y="145" width="16" height="3" rx="1.5" fill="#d4a843" opacity="0.8"/>
      <rect x="162" y="174" width="16" height="3" rx="1.5" fill="#d4a843" opacity="0.8"/>

      {/* Right side cabinet */}
      <rect x="228" y="134" width="88" height="62" rx="3" fill="#2a2420" stroke="#5a4a38" strokeWidth="1"/>
      <line x1="272" y1="134" x2="272" y2="196" stroke="#5a4a38" strokeWidth="0.8"/>
      <rect x="282" y="162" width="3" height="10" rx="1.5" fill="#d4a843" opacity="0.7"/>

      {/* Vanity top surface */}
      <rect x="20" y="126" width="300" height="8" rx="4" fill="#3a3028" stroke="#d4a843" strokeWidth="0.8"/>

      {/* ── STOOL ── */}
      <rect x="140" y="205" width="60" height="20" rx="8" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      <rect x="148" y="225" width="8" height="14" rx="2" fill="#8a7860"/>
      <rect x="184" y="225" width="8" height="14" rx="2" fill="#8a7860"/>
    </svg>
  );
}
