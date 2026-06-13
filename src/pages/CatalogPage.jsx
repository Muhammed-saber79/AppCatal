import { useState } from 'react';
import './CatalogPage.css';
import { rooms, allPieces } from '../data/furniture';
import FurniturePopup from '../components/FurniturePopup';

const IMAGE_MAP = {
  'sofa':            '/images/Reception-sofa.png',
  'reception-table': '/images/Reciption-table.png',
  'bed':             '/images/Master-bed.png',
  'wardrobe':        '/images/Master-mirror&rack.png',
  'vanity':          '/images/Master-تسريحة.png',
  'display-cabinet': '/images/Hall-nich.png',
  'bar-sideboard':   '/images/Hall-bar.png',
  'dining-table':    '/images/Hall-table.png',
  'baby-wardrobe':   '/images/Baby-drawer.png',
  'baby-bed':        '/images/Baby-bed.png',
};

function CatCard({ piece, onSelect }) {
  const [err, setErr] = useState(false);
  const src = IMAGE_MAP[piece.id];

  return (
    <div className="cat-card" onClick={() => onSelect(piece.id)}>
      <div className="cat-card-media">
        {!err && src
          ? <img src={src} alt={piece.nameAr} className="cat-card-img" onError={() => setErr(true)} />
          : <div className="cat-card-placeholder">🏠</div>
        }
      </div>
      <div className="cat-card-body">
        <h3 className="cat-card-name">{piece.nameAr}</h3>
        <span className="cat-card-room">{piece.roomNameAr}</span>
        <div className="cat-card-specs">
          {piece.specs.slice(0, 2).map((s, i) => (
            <span key={i} className="cat-spec-chip">{s.labelAr}: {s.value}</span>
          ))}
        </div>
      </div>
      <div className="cat-card-hint">عرض التفاصيل ←</div>
    </div>
  );
}

export default function CatalogPage() {
  const [activeRoom, setActiveRoom] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const selectedPiece = selectedId ? allPieces.find(p => p.id === selectedId) : null;

  const tabs = [
    { id: 'all', label: 'الكل' },
    ...rooms.map(r => ({ id: r.id, label: r.nameAr })),
  ];

  const visiblePieces = activeRoom === 'all'
    ? allPieces
    : allPieces.filter(p => p.roomId === activeRoom);

  return (
    <div className="catalog-page">
      <div className="catalog-top">
        <div className="catalog-title-row">
          <h2 className="catalog-title">كتالوج الأثاث</h2>
        </div>
        <p className="catalog-subtitle">FURNITURE CATALOG</p>

        <div className="catalog-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`cat-tab ${activeRoom === t.id ? 'active' : ''}`}
              onClick={() => setActiveRoom(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-scroll">
        <div className="cat-grid">
          {visiblePieces.map(p => (
            <CatCard key={p.id} piece={p} onSelect={setSelectedId} />
          ))}
        </div>
      </div>

      {selectedPiece && (
        <FurniturePopup piece={selectedPiece} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
