// Reception Table SVG — flat glass top with gold rim + large rounded capsule-shaped beige base
export default function ReceptionTableSVG({ width = 280, height = 160 }) {
  return (
    <svg viewBox="0 0 280 160" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Reception table sketch">
      {/* Glass top */}
      <rect x="20" y="30" width="240" height="32" rx="4" fill="rgba(180,220,240,0.35)" stroke="#d4a843" strokeWidth="2"/>
      {/* Glass reflection */}
      <rect x="28" y="35" width="100" height="6" rx="2" fill="white" opacity="0.3"/>
      {/* Gold rim highlight */}
      <rect x="20" y="30" width="240" height="3" rx="2" fill="#d4a843" opacity="0.8"/>
      <rect x="20" y="59" width="240" height="3" rx="2" fill="#d4a843" opacity="0.5"/>
      {/* Capsule base — large rounded oval */}
      <ellipse cx="140" cy="110" rx="95" ry="34" fill="#d4c4a0" stroke="#b8a070" strokeWidth="2"/>
      {/* Base highlight */}
      <ellipse cx="140" cy="99" rx="80" ry="10" fill="#e8d8b8" opacity="0.5"/>
      {/* Connector between top and base */}
      <rect x="118" y="62" width="44" height="18" rx="2" fill="#c8b888" stroke="#b8a070" strokeWidth="1"/>
      {/* Base shadow */}
      <ellipse cx="140" cy="140" rx="90" ry="8" fill="#b8a878" opacity="0.2"/>
    </svg>
  );
}
