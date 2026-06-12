import { useState, useCallback } from 'react';
import './App.css';
import ParticleBackground from './components/ParticleBackground';
import FloorPlan from './components/FloorPlan';
import RoomCards from './components/RoomCards';
import DetailPanel from './components/DetailPanel';
import CarpenterSummary from './components/CarpenterSummary';
import { allPieces } from './data/furniture';

const NAV_LINKS = [
  { href: '#floorplan', label: 'المخطط' },
  { href: '#catalog', label: 'الكتالوج' },
  { href: '#carpenter', label: 'جدول النجار' },
];

export default function App() {
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [activeSection, setActiveSection] = useState('floorplan');

  const selectedPiece = allPieces.find(p => p.id === selectedPieceId) || null;

  const handleSelectPiece = useCallback((id) => {
    setSelectedPieceId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPieceId(null);
  }, []);

  return (
    <div className="app-root" dir="rtl" lang="ar">
      <ParticleBackground />

      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-ar">بيتنا</span>
            <span className="brand-sep">·</span>
            <span className="brand-en">Our Home</span>
          </div>
          <nav className="app-nav">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">كتالوج الأثاث</div>
          <h1 className="hero-title">بيتنا</h1>
          <p className="hero-subtitle">
            استعرض كل قطعة أثاث بالتفصيل — صورة حقيقية، رسم هندسي، ومواصفات للنجار
          </p>
          <p className="hero-subtitle-en">
            Explore every furniture piece — real photo, sketch, and carpenter specs
          </p>
          <div className="hero-actions">
            <a href="#floorplan" className="btn-primary">استعرض المخطط</a>
            <a href="#catalog" className="btn-secondary">الكتالوج</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">5</span>
              <span className="stat-label">غرف</span>
            </div>
            <div className="stat-divider"/>
            <div className="stat">
              <span className="stat-num">10</span>
              <span className="stat-label">قطع أثاث</span>
            </div>
            <div className="stat-divider"/>
            <div className="stat">
              <span className="stat-num">8.05×12.97م</span>
              <span className="stat-label">المساحة</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOOR PLAN ── */}
      <section id="floorplan" className="content-section">
        <div className="section-label">المخطط التفاعلي</div>
        <h2 className="section-heading">خريطة الشقة</h2>
        <p className="section-subheading">
          انقر على أي قطعة أثاث لعرض تفاصيلها الكاملة
        </p>
        <FloorPlan onSelectPiece={handleSelectPiece} selectedId={selectedPieceId} />
      </section>

      {/* ── CATALOG CARDS ── */}
      <section id="catalog" className="content-section">
        <div className="section-label">الكتالوج</div>
        <h2 className="section-heading">قطع الأثاث</h2>
        <p className="section-subheading">
          كل الغرف والقطع — بصورة ورسم ومواصفات
        </p>
        <RoomCards onSelect={handleSelectPiece} />
      </section>

      {/* ── CARPENTER TABLE ── */}
      <CarpenterSummary />

      {/* ── FOOTER ── */}
      <footer className="app-footer">
        <span className="brand-ar" style={{ fontSize: 20 }}>بيتنا</span>
        <span style={{ opacity: 0.3, fontSize: 12 }}>© 2025</span>
      </footer>

      {/* ── DETAIL PANEL ── */}
      {selectedPiece && (
        <DetailPanel piece={selectedPiece} onClose={handleClose} />
      )}
    </div>
  );
}
