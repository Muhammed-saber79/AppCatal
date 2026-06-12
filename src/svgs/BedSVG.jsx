// Bed SVG — platform base, ~12 vertical upholstered strips headboard, two LED ring/loop fixtures on each side
export default function BedSVG({ width = 320, height = 200, small = false }) {
  const strips = small ? 8 : 12;
  const headW = small ? 260 : 280;
  const headX = small ? 30 : 20;
  const headH = small ? 70 : 80;
  const stripW = headW / strips;

  return (
    <svg viewBox="0 0 320 200" width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-label={small ? 'Baby bed sketch' : 'Master bed sketch'}>
      {/* Platform base */}
      <rect x="20" y="130" width="280" height="50" rx="6" fill="#b0b0b0" stroke="#888" strokeWidth="1.5"/>
      <rect x="20" y="130" width="280" height="8" rx="4" fill="#c8c8c8"/>
      {/* Mattress */}
      <rect x="24" y="118" width="272" height="16" rx="4" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
      {/* Headboard — vertical upholstered strips */}
      <rect x={headX} y="38" width={headW} height={headH} rx="6" fill="#c0c0c0" stroke="#999" strokeWidth="1.5"/>
      {Array.from({ length: strips }).map((_, i) => (
        <rect
          key={i}
          x={headX + 2 + i * stripW}
          y="42"
          width={stripW - 4}
          height={headH - 8}
          rx="3"
          fill={i % 2 === 0 ? '#d8d8d8' : '#c8c8c8'}
          stroke="#aaa"
          strokeWidth="0.8"
        />
      ))}
      {/* Headboard shadow/base */}
      <rect x={headX} y={38 + headH} width={headW} height="8" rx="2" fill="#999" opacity="0.5"/>

      {/* LED ring fixtures — left side */}
      <ellipse cx="12" cy="78" rx="9" ry="9" fill="none" stroke="#d4a843" strokeWidth="2.5"/>
      <ellipse cx="12" cy="78" rx="5" ry="5" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="12" cy="78" r="2" fill="#ffe066" opacity="0.8"/>
      {/* LED ring glow left */}
      <ellipse cx="12" cy="78" rx="9" ry="9" fill="none" stroke="#ffe066" strokeWidth="1" opacity="0.3"/>

      {/* LED ring fixtures — right side */}
      <ellipse cx="308" cy="78" rx="9" ry="9" fill="none" stroke="#d4a843" strokeWidth="2.5"/>
      <ellipse cx="308" cy="78" rx="5" ry="5" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="308" cy="78" r="2" fill="#ffe066" opacity="0.8"/>
      <ellipse cx="308" cy="78" rx="9" ry="9" fill="none" stroke="#ffe066" strokeWidth="1" opacity="0.3"/>

      {/* Pillow */}
      <rect x="100" y="110" width="120" height="12" rx="5" fill="#f0f0f0" stroke="#ccc" strokeWidth="1"/>
    </svg>
  );
}
