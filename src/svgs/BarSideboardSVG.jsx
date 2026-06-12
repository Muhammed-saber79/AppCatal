// Bar Sideboard SVG — long low body, fluted left panel, 4 cabinet doors, glass top, 3 diamond gold mirrors above
export default function BarSideboardSVG({ width = 360, height = 260 }) {
  return (
    <svg viewBox="0 0 360 260" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Bar sideboard sketch">

      {/* ── 3 DIAMOND GEOMETRIC MIRRORS above ── */}
      {/* Mirror 1 — left */}
      <polygon points="70,18 98,48 70,78 42,48" fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="2"/>
      <polygon points="70,25 91,48 70,71 49,48" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5"/>
      <line x1="52" y1="38" x2="66" y2="52" stroke="white" strokeWidth="0.7" opacity="0.2"/>

      {/* Mirror 2 — center */}
      <polygon points="180,10 215,48 180,86 145,48" fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="2.5"/>
      <polygon points="180,18 208,48 180,78 152,48" fill="none" stroke="#d4a843" strokeWidth="1" opacity="0.5"/>
      <line x1="158" y1="32" x2="174" y2="46" stroke="white" strokeWidth="0.8" opacity="0.2"/>

      {/* Mirror 3 — right */}
      <polygon points="290,18 318,48 290,78 262,48" fill="rgba(180,210,230,0.18)" stroke="#d4a843" strokeWidth="2"/>
      <polygon points="290,25 311,48 290,71 269,48" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5"/>
      <line x1="272" y1="38" x2="286" y2="52" stroke="white" strokeWidth="0.7" opacity="0.2"/>

      {/* ── SIDEBOARD BODY ── */}
      <rect x="15" y="165" width="330" height="75" rx="5" fill="#1e1a16" stroke="#d4a843" strokeWidth="1.5"/>

      {/* Glass top */}
      <rect x="15" y="157" width="330" height="12" rx="4" fill="rgba(180,220,240,0.3)" stroke="#d4a843" strokeWidth="1.5"/>
      <rect x="15" y="157" width="330" height="3" rx="2" fill="#d4a843" opacity="0.6"/>

      {/* Fluted left panel (~70px wide) */}
      <rect x="19" y="169" width="68" height="67" rx="3" fill="#2a2420" stroke="#5a4a38" strokeWidth="0.8"/>
      {/* Flute lines */}
      {[30, 40, 50, 60, 70, 80].map((x, i) => (
        <line key={i} x1={x} y1="169" x2={x} y2="236" stroke="#d4a843" strokeWidth="0.8" opacity="0.35"/>
      ))}

      {/* 4 Cabinet doors (in remaining ~258px) */}
      {[91, 156, 221, 286].map((x, i) => (
        <g key={i}>
          <rect x={x} y="169" width="60" height="67" rx="2" fill="#2a2420" stroke="#5a4a38" strokeWidth="1"/>
          {/* Door handle */}
          <rect x={x + 27} y="196" width="6" height="14" rx="3" fill="#d4a843" opacity="0.8"/>
        </g>
      ))}

      {/* Base feet */}
      <rect x="30" y="236" width="20" height="10" rx="2" fill="#d4a843" opacity="0.5"/>
      <rect x="155" y="236" width="20" height="10" rx="2" fill="#d4a843" opacity="0.5"/>
      <rect x="310" y="236" width="20" height="10" rx="2" fill="#d4a843" opacity="0.5"/>
    </svg>
  );
}
