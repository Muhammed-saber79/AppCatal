// Baby Wardrobe SVG — 2 sliding doors, ONE straight vertical center line per door, 2 inner sections
export default function BabyWardrobeSVG({ width = 260, height = 200 }) {
  return (
    <svg viewBox="0 0 260 200" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Baby wardrobe sketch">
      {/* Outer frame */}
      <rect x="10" y="10" width="240" height="180" rx="4" fill="#1e1a16" stroke="#d4a843" strokeWidth="2"/>

      {/* Door tracks */}
      <rect x="10" y="12" width="240" height="4" rx="1" fill="#d4a843" opacity="0.5"/>
      <rect x="10" y="184" width="240" height="4" rx="1" fill="#d4a843" opacity="0.5"/>

      {/* Door 1 — left half */}
      <rect x="12" y="16" width="118" height="168" rx="2" fill="#2a2420" stroke="#6a5a48" strokeWidth="1.2"/>
      {/* Single centered vertical line on door 1 — straight, not diagonal */}
      <line x1="71" y1="22" x2="71" y2="178" stroke="#d4a843" strokeWidth="1.5" opacity="0.7"/>
      {/* Handle door 1 */}
      <rect x="124" y="96" width="4" height="14" rx="2" fill="#d4a843" opacity="0.8"/>

      {/* Door 2 — right half */}
      <rect x="130" y="16" width="118" height="168" rx="2" fill="#2a2420" stroke="#6a5a48" strokeWidth="1.2"/>
      {/* Single centered vertical line on door 2 */}
      <line x1="189" y1="22" x2="189" y2="178" stroke="#d4a843" strokeWidth="1.5" opacity="0.7"/>
      {/* Handle door 2 */}
      <rect x="132" y="96" width="4" height="14" rx="2" fill="#d4a843" opacity="0.8"/>

      {/* Inner section divider (visible at edges as hint) */}
      <text x="71" y="198" textAnchor="middle" fontSize="8" fill="#d4a843" opacity="0.5">قسم 1</text>
      <text x="189" y="198" textAnchor="middle" fontSize="8" fill="#d4a843" opacity="0.5">قسم 2</text>
    </svg>
  );
}
