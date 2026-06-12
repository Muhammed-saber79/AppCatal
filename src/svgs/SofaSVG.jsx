// Sofa SVG — beige low-profile sofa, curved gold arms, 3 fat seat cushions, silver-patterned back pillows
export default function SofaSVG({ width = 320, height = 160 }) {
  return (
    <svg viewBox="0 0 320 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Sofa sketch">
      {/* Body / seat base */}
      <rect x="30" y="90" width="260" height="45" rx="6" fill="#d4c4a0" stroke="#b8a070" strokeWidth="1.5"/>
      {/* Seat cushions — 3 divisions */}
      <line x1="117" y1="90" x2="117" y2="135" stroke="#b8a070" strokeWidth="1"/>
      <line x1="203" y1="90" x2="203" y2="135" stroke="#b8a070" strokeWidth="1"/>
      {/* Cushion highlights */}
      <rect x="35" y="93" width="78" height="39" rx="4" fill="#e0d0a8" opacity="0.5"/>
      <rect x="121" y="93" width="78" height="39" rx="4" fill="#e0d0a8" opacity="0.5"/>
      <rect x="207" y="93" width="78" height="39" rx="4" fill="#e0d0a8" opacity="0.5"/>
      {/* Back rest */}
      <rect x="34" y="55" width="252" height="38" rx="5" fill="#c8b888" stroke="#b8a070" strokeWidth="1.5"/>
      {/* Back pillows — 3, with subtle silver dot pattern */}
      <rect x="40" y="59" width="78" height="30" rx="4" fill="#d8c898" stroke="#a09060" strokeWidth="1"/>
      <rect x="121" y="59" width="78" height="30" rx="4" fill="#d8c898" stroke="#a09060" strokeWidth="1"/>
      <rect x="202" y="59" width="78" height="30" rx="4" fill="#d8c898" stroke="#a09060" strokeWidth="1"/>
      {/* Silver dot pattern on back pillows */}
      {[55,79,103,137,161,185,217,241,265].map((x,i) => (
        <circle key={i} cx={x} cy="73" r="1.5" fill="#c8c8b0" opacity="0.7"/>
      ))}
      {[55,79,103,137,161,185,217,241,265].map((x,i) => (
        <circle key={'b'+i} cx={x} cy="82" r="1.5" fill="#c8c8b0" opacity="0.5"/>
      ))}
      {/* Left arm — curved gold */}
      <path d="M30,55 Q8,60 8,90 Q8,118 30,120 L30,55Z" fill="#c8b888" stroke="#d4a843" strokeWidth="2"/>
      <path d="M30,55 Q12,62 12,90 Q12,114 30,116" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.7"/>
      {/* Right arm — curved gold */}
      <path d="M290,55 Q312,60 312,90 Q312,118 290,120 L290,55Z" fill="#c8b888" stroke="#d4a843" strokeWidth="2"/>
      <path d="M290,55 Q308,62 308,90 Q308,114 290,116" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.7"/>
      {/* Gold arm arch details */}
      <path d="M14,75 Q11,90 14,105" fill="none" stroke="#d4a843" strokeWidth="1" opacity="0.8"/>
      <path d="M306,75 Q309,90 306,105" fill="none" stroke="#d4a843" strokeWidth="1" opacity="0.8"/>
      {/* Legs */}
      <rect x="45" y="135" width="10" height="14" rx="2" fill="#d4a843"/>
      <rect x="100" y="135" width="10" height="14" rx="2" fill="#d4a843"/>
      <rect x="165" y="135" width="10" height="14" rx="2" fill="#d4a843"/>
      <rect x="210" y="135" width="10" height="14" rx="2" fill="#d4a843"/>
      <rect x="265" y="135" width="10" height="14" rx="2" fill="#d4a843"/>
    </svg>
  );
}
