import './App.css';
import useFullPageScroll from './hooks/useFullPageScroll';
import ParticleBackground from './components/ParticleBackground';
import HeroPage from './pages/HeroPage';
import FloorPlan2D from './components/FloorPlan2D';
import CatalogPage from './pages/CatalogPage';
import CarpenterPage from './pages/CarpenterPage';

const SECTIONS = ['hero', 'floorplan', 'catalog', 'carpenter'];
const DOT_LABELS = ['الرئيسية', 'المخطط', 'الكتالوج', 'النجار'];

export default function App() {
  const { current, prev, direction, goTo } = useFullPageScroll(SECTIONS.length);

  // Pages array
  const pages = [
    <HeroPage key="hero" onStart={() => goTo(1)} />,
    <FloorPlan2D key="floorplan" />,
    <CatalogPage key="catalog" />,
    <CarpenterPage key="carpenter" />,
  ];

  return (
    <div className="app-root" dir="rtl" lang="ar">
      <ParticleBackground />

      {/* Nav dots */}
      <nav className="nav-dots" aria-label="التنقل بين الأقسام">
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            className={`nav-dot ${current === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={DOT_LABELS[i]}
            title={DOT_LABELS[i]}
          />
        ))}
      </nav>

      {/* Page container */}
      <div className="page-container">
        {pages.map((page, i) => {
          let cls = 'page ';
          const isVisible = i === current || i === prev;

          if (!isVisible) return null;

          if (i === current) {
            cls += prev === -1
              ? 'page-idle'
              : direction > 0 ? 'page-enter' : 'page-enter-back';
          } else {
            // i === prev (exiting)
            cls += direction > 0 ? 'page-exit' : 'page-exit-back';
          }

          return (
            <div key={SECTIONS[i]} className={cls}>
              {page}
            </div>
          );
        })}
      </div>

      {/* Scroll hint on hero */}
      {current === 0 && (
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-hint-line" />
          <div className="scroll-hint-arrow" />
        </div>
      )}
    </div>
  );
}
