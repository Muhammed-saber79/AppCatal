import { useState, useEffect } from 'react';
import {
  SofaSVG, ReceptionTableSVG, BedSVG, WardrobeSVG,
  VanitySVG, DiningTableSVG, BarSideboardSVG,
  NicheSVG, BabyWardrobeSVG, BabyBedSVG
} from '../svgs/index';
import './DetailPanel.css';

const svgMap = {
  SofaSVG,
  ReceptionTableSVG,
  BedSVG,
  WardrobeSVG,
  VanitySVG,
  DiningTableSVG,
  BarSideboardSVG,
  NicheSVG,
  BabyWardrobeSVG,
  BabyBedSVG,
};

export default function DetailPanel({ piece, onClose }) {
  const [tab, setTab] = useState('photo');
  const [imgError, setImgError] = useState(false);

  // Reset tab when piece changes
  useEffect(() => {
    setTab('photo');
    setImgError(false);
  }, [piece?.id]);

  if (!piece) return null;

  const SVGComponent = svgMap[piece.svgId];

  return (
    <div className="detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={piece.nameAr}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-header">
          <div>
            <h2 className="detail-title-ar">{piece.nameAr}</h2>
            <span className="detail-title-en">{piece.nameEn}</span>
          </div>
          <div className="detail-meta">
            <span className="detail-room">{piece.roomNameAr}</span>
          </div>
          <button className="detail-close" onClick={onClose} aria-label="إغلاق">✕</button>
        </div>

        {/* Tab switcher */}
        <div className="detail-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'photo'}
            className={`detail-tab ${tab === 'photo' ? 'active' : ''}`}
            onClick={() => setTab('photo')}>
            📷 الصورة
          </button>
          <button
            role="tab"
            aria-selected={tab === 'sketch'}
            className={`detail-tab ${tab === 'sketch' ? 'active' : ''}`}
            onClick={() => setTab('sketch')}>
            ✏️ الرسم
          </button>
          <button
            role="tab"
            aria-selected={tab === 'specs'}
            className={`detail-tab ${tab === 'specs' ? 'active' : ''}`}
            onClick={() => setTab('specs')}>
            📋 المواصفات
          </button>
        </div>

        {/* Tab content */}
        <div className="detail-body">
          {tab === 'photo' && (
            <div className="detail-photo-wrap">
              {!imgError ? (
                <img
                  src={piece.image}
                  alt={piece.nameAr}
                  className="detail-photo"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="detail-photo-placeholder">
                  <span className="placeholder-icon">🏠</span>
                  <p>الصورة غير متاحة</p>
                  <p className="placeholder-hint">{piece.image}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'sketch' && (
            <div className="detail-sketch-wrap">
              {SVGComponent ? (
                <SVGComponent width={340} height={240} />
              ) : (
                <p style={{ color: '#a89060', textAlign: 'center' }}>الرسم غير متاح</p>
              )}
            </div>
          )}

          {tab === 'specs' && (
            <div className="detail-specs">
              <table className="specs-table">
                <tbody>
                  {piece.specs.map((s, i) => (
                    <tr key={i}>
                      <td className="spec-label">
                        <span className="spec-label-ar">{s.labelAr}</span>
                        <span className="spec-label-en">{s.labelEn}</span>
                      </td>
                      <td className="spec-value">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
