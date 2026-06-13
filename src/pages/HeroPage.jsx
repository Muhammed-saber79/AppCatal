import './HeroPage.css';

export default function HeroPage({ onStart }) {
  return (
    <div className="hero-page">
      <div className="hero-lines" aria-hidden="true" />

      <div className="hero-content" dir="rtl">
        <div className="hero-badge">كتالوج الأثاث الرسمي</div>

        <h1 className="hero-title">بيتنا</h1>

        <p className="hero-subtitle">
          استعرض كل قطعة أثاث بتفاصيلها الكاملة — مخطط هندسي حقيقي وصور ومواصفات للنجار
        </p>
        <p className="hero-subtitle-en">Every piece. Every detail. Your home story.</p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">4</span>
            <span className="stat-label">غرف</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">10</span>
            <span className="stat-label">قطع أثاث</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">8×13م</span>
            <span className="stat-label">المساحة</span>
          </div>
        </div>

        <button className="hero-cta" onClick={onStart}>
          ابدأ الجولة
          <span className="hero-cta-arrow">↓</span>
        </button>
      </div>

      {/* Ghost floor plan watermark — removed */}
    </div>
  );
}
