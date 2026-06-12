import { useState } from 'react';
import { rooms } from '../data/furniture';
import * as SVGs from '../svgs/index';
import useScrollReveal from './useScrollReveal';
import './RoomCards.css';

function PieceCard({ piece, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const [tab, setTab] = useState('photo');
  const ref = useScrollReveal();

  const SVGComponent = SVGs[piece.svgId];

  return (
    <div className="piece-card reveal-element" ref={ref} onClick={() => onSelect(piece.id)}>
      <div className="card-media">
        <div className="card-tabs">
          <button
            className={`card-tab ${tab === 'photo' ? 'active' : ''}`}
            onClick={e => { e.stopPropagation(); setTab('photo'); }}>
            📷
          </button>
          <button
            className={`card-tab ${tab === 'sketch' ? 'active' : ''}`}
            onClick={e => { e.stopPropagation(); setTab('sketch'); }}>
            ✏️
          </button>
        </div>

        {tab === 'photo' ? (
          !imgError ? (
            <img
              src={piece.image}
              alt={piece.nameAr}
              className="card-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="card-img-placeholder">
              <span>🏠</span>
              <span className="card-img-placeholder-label">{piece.nameAr}</span>
            </div>
          )
        ) : (
          <div className="card-sketch">
            {SVGComponent ? <SVGComponent width={260} height={180} /> : <span>—</span>}
          </div>
        )}
      </div>

      <div className="card-info">
        <h3 className="card-name-ar">{piece.nameAr}</h3>
        <span className="card-name-en">{piece.nameEn}</span>
        {piece.qty > 1 && <span className="card-qty">× {piece.qty}</span>}
        <div className="card-spec-peek">
          {piece.specs.slice(0, 2).map((s, i) => (
            <span key={i} className="spec-chip">{s.labelAr}: {s.value}</span>
          ))}
        </div>
      </div>
      <div className="card-more-hint">عرض التفاصيل ←</div>
    </div>
  );
}

function RoomSection({ room, onSelect }) {
  const ref = useScrollReveal();

  return (
    <section className="room-section">
      <div className="room-section-header reveal-element" ref={ref}>
        <span className="room-section-line"/>
        <div>
          <h2 className="room-section-name">{room.nameAr}</h2>
          <span className="room-section-name-en">{room.nameEn}</span>
        </div>
        <span className="room-section-line"/>
      </div>
      <div className="pieces-grid">
        {room.pieces.map(piece => (
          <PieceCard key={piece.id} piece={{ ...piece, roomNameAr: room.nameAr, roomNameEn: room.nameEn }} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default function RoomCards({ onSelect }) {
  return (
    <div className="room-cards-wrapper">
      {rooms.map(room => (
        <RoomSection key={room.id} room={room} onSelect={onSelect} />
      ))}
    </div>
  );
}
