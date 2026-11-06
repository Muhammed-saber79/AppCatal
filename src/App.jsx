import './App.css';
import useFullPageScroll from './hooks/useFullPageScroll';
import DoorIntro from './pages/DoorIntro';
import HomeJourney from './components/HomeJourney';
import CatalogPage from './pages/CatalogPage';
import CarpenterPage from './pages/CarpenterPage';

const SECTIONS = ['door', 'home', 'catalog', 'carpenter'];
const NAV = [
  { label: 'الباب',    icon: '🚪' },
  { label: 'الشقة',    icon: '🏠' },
  { label: 'الكتالوج', icon: '🛋️' },
  { label: 'النجار',   icon: '📋' },
];

// Allow deep links like /#home or /#catalog
const initialSection = () => {
  const i = SECTIONS.indexOf(window.location.hash.slice(1));
  return i >= 0 ? i : 0;
};

export default function App() {
  const { current, prev, direction, goTo } = useFullPageScroll(SECTIONS.length, initialSection());

  const pages = [
    <DoorIntro key="door" onEnter={() => goTo(1)} />,
    <HomeJourney key="home" />,
    <CatalogPage key="catalog" />,
    <CarpenterPage key="carpenter" />,
  ];

  return (
    <div className="app-root" dir="rtl" lang="ar">
      {/* Side navigation — icon + label so it's obvious for everyone */}
      {current > 0 && (
        <nav className="side-nav" aria-label="التنقل بين الأقسام">
          {SECTIONS.map((s, i) => (
            <button
              key={s}
              className={`side-nav-btn ${current === i ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-current={current === i ? 'page' : undefined}
            >
              <span className="side-nav-icon" aria-hidden="true">{NAV[i].icon}</span>
              <span className="side-nav-label">{NAV[i].label}</span>
            </button>
          ))}
        </nav>
      )}

      <div className="page-container">
        {pages.map((page, i) => {
          if (i !== current && i !== prev) return null;
          let cls = 'page ';
          if (i === current) {
            cls += prev === -1 ? 'page-idle' : direction > 0 ? 'page-enter' : 'page-enter-back';
          } else {
            cls += direction > 0 ? 'page-exit' : 'page-exit-back';
          }
          return <div key={SECTIONS[i]} className={cls}>{page}</div>;
        })}
      </div>
    </div>
  );
}
