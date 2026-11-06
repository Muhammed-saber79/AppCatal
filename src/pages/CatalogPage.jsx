import { useState } from 'react';
import './CatalogPage.css';
import { rooms, allPieces } from '../data/furniture';
import FurniturePopup from '../components/FurniturePopup';

function CatCard({ piece, onSelect }) {
  const [err, setErr] = useState(false);
  const src = piece.image;

  return (
    <button className="cat-card" onClick={() => onSelect(piece.id)}>
      <div className="cat-card-media">
        {!err && src
          ? <img src={src} alt={piece.nameAr} className="cat-card-img" onError={() => setErr(true)} />
          : <div className="cat-card-placeholder">🏠</div>
        }
        {piece.images.some(im => im.option)
          ? <span className="cat-card-note">✨ {piece.images.filter(im => im.option).length} اختيارات</span>
          : piece.images.length > 1 && <span className="cat-card-note">📷 {piece.images.length} صور</span>}
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
      <div className="cat-card-hint">شوف التفاصيل ←</div>
    </button>
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
        <p className="catalog-subtitle">كل القطع في مكان واحد — دوس على أي قطعة</p>

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
