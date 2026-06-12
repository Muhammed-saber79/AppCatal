// Niche SVG — tall narrow glass cabinet, cream/gold frame, 5 glass shelves, LED strip both sides
export default function NicheSVG({ width = 180, height = 320 }) {
  const shelves = [55, 95, 135, 175, 215];
  return (
    <svg viewBox="0 0 180 320" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Glass display cabinet sketch">
      {/* LED glow — left */}
      <rect x="14" y="20" width="6" height="272" rx="3" fill="#ffe066" opacity="0.15"/>
      {/* LED glow — right */}
      <rect x="160" y="20" width="6" height="272" rx="3" fill="#ffe066" opacity="0.15"/>

      {/* Outer frame */}
      <rect x="18" y="15" width="144" height="282" rx="6" fill="#f5f0e8" stroke="#d4a843" strokeWidth="2.5"/>

      {/* LED strips — left side */}
      <rect x="20" y="18" width="5" height="276" rx="2.5" fill="#d4a843" opacity="0.8"/>
      {/* LED dots */}
      {[30, 55, 80, 105, 130, 155, 180, 205, 230, 255, 280].map((y, i) => (
        <circle key={i} cx="22.5" cy={y} r="2" fill="#ffe066" opacity="0.7"/>
      ))}

      {/* LED strips — right side */}
      <rect x="155" y="18" width="5" height="276" rx="2.5" fill="#d4a843" opacity="0.8"/>
      {[30, 55, 80, 105, 130, 155, 180, 205, 230, 255, 280].map((y, i) => (
        <circle key={'r'+i} cx="157.5" cy={y} r="2" fill="#ffe066" opacity="0.7"/>
      ))}

      {/* Glass interior */}
      <rect x="28" y="22" width="124" height="268" rx="3" fill="rgba(180,210,230,0.1)"/>

      {/* 5 Glass shelves */}
      {shelves.map((y, i) => (
        <g key={i}>
          <rect x="30" y={y} width="120" height="6" rx="2" fill="rgba(180,210,230,0.4)" stroke="#d4a843" strokeWidth="1"/>
          <rect x="30" y={y} width="120" height="2" rx="1" fill="white" opacity="0.3"/>
        </g>
      ))}

      {/* Cabinet top decoration */}
      <rect x="18" y="15" width="144" height="8" rx="4" fill="#d4a843" opacity="0.7"/>
      {/* Cabinet bottom base */}
      <rect x="18" y="289" width="144" height="8" rx="4" fill="#d4a843" opacity="0.7"/>

      {/* Small display items on shelves */}
      <rect x="55" y="84" width="18" height="11" rx="2" fill="#c8b888" opacity="0.5"/>
      <rect x="82" y="82" width="12" height="13" rx="2" fill="#d4a843" opacity="0.3"/>
      <rect x="60" y="124" width="22" height="11" rx="2" fill="#c8b888" opacity="0.4"/>
    </svg>
  );
}
