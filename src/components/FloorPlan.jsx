import { useState } from 'react';
import './FloorPlan.css';

/**
 * Interactive SVG floor plan — 8.05 × 12.97 m apartment
 * Each furniture hotspot is clickable.
 *
 * Coordinate mapping (viewBox 0 0 805 1297 → scaled to display):
 * Scale: 1px ≈ 1cm so 805×1297 is easy to reason about.
 * 
 * Layout (approximate):
 *  Reception (living): bottom-left quadrant
 *  Dining+Bar:         bottom-right
 *  Master Bedroom:     top-left
 *  Niche:              small corridor/alcove (top-center)
 *  Baby Room:          top-right
 */

const VIEWBOX_W = 805;
const VIEWBOX_H = 1297;

// Room rectangles [x, y, w, h]
const roomRects = {
  reception: { x: 15, y: 660, w: 400, h: 622, label: 'الاستقبال', labelEn: 'Reception' },
  dining:    { x: 425, y: 660, w: 365, h: 622, label: 'طعام + بار', labelEn: 'Dining & Bar' },
  master:    { x: 15, y: 15, w: 390, h: 630, label: 'غرفة رئيسية', labelEn: 'Master Bedroom' },
  niche:     { x: 415, y: 15, w: 100, h: 330, label: 'نيتش', labelEn: 'Niche' },
  baby:      { x: 525, y: 15, w: 265, h: 630, label: 'غرفة أطفال', labelEn: 'Baby Room' },
};

// Hotspot definitions: cx,cy = center of hotspot ellipse
const hotspots = [
  // Reception
  { id: 'sofa',          room: 'reception', cx: 100, cy: 800, label: 'كنبة', shape: 'rect', x: 40, y: 755, w: 210, h: 90 },
  { id: 'reception-table', room: 'reception', cx: 250, cy: 880, label: 'طاولة الاستقبال', shape: 'rect', x: 190, y: 850, w: 130, h: 60 },
  // Dining
  { id: 'dining-table',  room: 'dining',    cx: 608, cy: 870, label: 'طاولة الطعام', shape: 'rect', x: 490, y: 790, w: 240, h: 160 },
  { id: 'bar-sideboard', room: 'dining',    cx: 620, cy: 1180, label: 'وحدة البار', shape: 'rect', x: 450, y: 1140, w: 280, h: 80 },
  // Master
  { id: 'bed',           room: 'master',    cx: 180, cy: 200, label: 'السرير', shape: 'rect', x: 50, y: 130, w: 260, h: 160 },
  { id: 'wardrobe',      room: 'master',    cx: 185, cy: 540, label: 'خزانة', shape: 'rect', x: 25, y: 510, w: 360, h: 80 },
  { id: 'vanity',        room: 'master',    cx: 185, cy: 440, label: 'تسريحة', shape: 'rect', x: 55, y: 400, w: 260, h: 70 },
  // Niche
  { id: 'display-cabinet', room: 'niche',  cx: 465, cy: 180, label: 'خزانة عرض', shape: 'rect', x: 428, y: 60, w: 75, h: 260 },
  // Baby
  { id: 'baby-wardrobe', room: 'baby',     cx: 660, cy: 550, label: 'خزانة أطفال', shape: 'rect', x: 535, y: 510, w: 240, h: 80 },
  { id: 'baby-bed',      room: 'baby',     cx: 645, cy: 200, label: 'سرير أطفال', shape: 'rect', x: 535, y: 90, w: 220, h: 130 },
];

const roomColors = {
  reception: 'rgba(212,168,67,0.08)',
  dining:    'rgba(100,160,200,0.08)',
  master:    'rgba(180,100,180,0.08)',
  niche:     'rgba(100,200,150,0.08)',
  baby:      'rgba(200,150,100,0.08)',
};

const roomBorders = {
  reception: '#d4a843',
  dining:    '#6ab0d4',
  master:    '#c882c8',
  niche:     '#6ac88a',
  baby:      '#d4a064',
};

export default function FloorPlan({ onSelectPiece, selectedId }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="floorplan-wrapper">
      <div className="floorplan-legend">
        {Object.entries(roomRects).map(([id, r]) => (
          <span key={id} className="legend-item" style={{ borderColor: roomBorders[id] }}>
            <span className="legend-dot" style={{ background: roomBorders[id] }}/>
            {r.label}
          </span>
        ))}
      </div>
      <div className="floorplan-container">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="floorplan-svg"
          role="img"
          aria-label="مخطط الشقة التفاعلي"
        >
          {/* Outer apartment boundary */}
          <rect x="10" y="10" width={VIEWBOX_W - 20} height={VIEWBOX_H - 20}
            rx="8" fill="#0d0d0f" stroke="#d4a843" strokeWidth="3"/>

          {/* Room fills */}
          {Object.entries(roomRects).map(([id, r]) => (
            <rect key={id} x={r.x} y={r.y} width={r.w} height={r.h}
              fill={roomColors[id]} stroke={roomBorders[id]} strokeWidth="1.5" strokeDasharray="6 3"/>
          ))}

          {/* Dimension labels */}
          <text x={VIEWBOX_W / 2} y={VIEWBOX_H - 5} textAnchor="middle" fontSize="18" fill="#d4a843" opacity="0.6">8.05 م</text>
          <text x="8" y={VIEWBOX_H / 2} textAnchor="middle" fontSize="18" fill="#d4a843" opacity="0.6"
            transform={`rotate(-90, 8, ${VIEWBOX_H / 2})`}>12.97 م</text>

          {/* Room labels */}
          {Object.entries(roomRects).map(([id, r]) => (
            <g key={'lbl-'+id}>
              <text x={r.x + r.w / 2} y={r.y + 28} textAnchor="middle"
                fontSize="22" fontWeight="bold" fill={roomBorders[id]} opacity="0.7"
                fontFamily="Cairo, sans-serif">{r.label}</text>
              <text x={r.x + r.w / 2} y={r.y + 50} textAnchor="middle"
                fontSize="14" fill={roomBorders[id]} opacity="0.4"
                fontFamily="Cairo, sans-serif">{r.labelEn}</text>
            </g>
          ))}

          {/* Wall between rooms (vertical + horizontal) */}
          <line x1="415" y1="15" x2="415" y2="645" stroke="#d4a843" strokeWidth="3" opacity="0.4"/>
          <line x1="515" y1="15" x2="515" y2="645" stroke="#d4a843" strokeWidth="3" opacity="0.4"/>
          <line x1="415" y1="345" x2="515" y2="345" stroke="#d4a843" strokeWidth="2" opacity="0.3"/>
          <line x1="15" y1="648" x2={VIEWBOX_W - 15} y2="648" stroke="#d4a843" strokeWidth="3" opacity="0.5"/>
          <line x1="415" y1="648" x2="415" y2={VIEWBOX_H - 15} stroke="#d4a843" strokeWidth="3" opacity="0.5"/>

          {/* Furniture hotspots */}
          {hotspots.map(h => {
            const isSelected = selectedId === h.id;
            const isHovered = hoveredId === h.id;
            const active = isSelected || isHovered;
            return (
              <g key={h.id} className="hotspot-group"
                onClick={() => onSelectPiece(h.id)}
                onMouseEnter={() => setHoveredId(h.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}>
                {/* Hotspot fill */}
                <rect
                  x={h.x} y={h.y} width={h.w} height={h.h}
                  rx="6"
                  fill={active ? 'rgba(212,168,67,0.3)' : 'rgba(212,168,67,0.12)'}
                  stroke={active ? '#d4a843' : 'rgba(212,168,67,0.4)'}
                  strokeWidth={active ? 2 : 1}
                />
                {/* Pulse ring when selected */}
                {isSelected && (
                  <rect x={h.x - 4} y={h.y - 4} width={h.w + 8} height={h.h + 8}
                    rx="10" fill="none" stroke="#d4a843" strokeWidth="1.5"
                    strokeDasharray="4 3" opacity="0.6">
                    <animate attributeName="stroke-dashoffset" from="0" to="28" dur="1.5s" repeatCount="indefinite"/>
                  </rect>
                )}
                {/* Label */}
                <text x={h.cx} y={h.cy + 5} textAnchor="middle"
                  fontSize="16" fill={active ? '#d4a843' : '#c8b888'}
                  fontFamily="Cairo, sans-serif" fontWeight={active ? 'bold' : 'normal'}>
                  {h.label}
                </text>
                {/* Click indicator dot */}
                <circle cx={h.cx} cy={h.cy - 20} r="4"
                  fill={active ? '#d4a843' : 'rgba(212,168,67,0.4)'}/>
              </g>
            );
          })}

          {/* Compass indicator */}
          <g transform="translate(745,50)">
            <circle cx="0" cy="0" r="22" fill="rgba(212,168,67,0.1)" stroke="#d4a843" strokeWidth="1"/>
            <text x="0" y="5" textAnchor="middle" fontSize="16" fill="#d4a843" fontFamily="Cairo">ش</text>
            <line x1="0" y1="-22" x2="0" y2="-12" stroke="#d4a843" strokeWidth="2"/>
          </g>
        </svg>
      </div>
      <p className="floorplan-hint">انقر على أي قطعة أثاث لعرض التفاصيل</p>
    </div>
  );
}
