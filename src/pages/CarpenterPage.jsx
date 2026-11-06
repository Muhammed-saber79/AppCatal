import './CarpenterPage.css';
import { rooms, palette } from '../data/furniture';

export default function CarpenterPage() {
  return (
    <div className="carpenter-page">
      <div className="carpenter-top">
        <div>
          <h2 className="carpenter-heading">ملف النجار</h2>
          <span className="carpenter-sub">كل القطع بمواصفاتها — جاهز للطباعة</span>
        </div>
        <button className="print-btn" onClick={() => window.print()}>🖨️ اطبع / احفظ PDF</button>
      </div>

      <div className="carpenter-scroll">
        {/* The one rule for every piece */}
        <section className="palette-card" aria-label="باليتة الألوان">
          <h3>قاعدة الألوان لكل القطع</h3>
          <p>أي قطعة في الشقة بتمشي على الألوان دي، حتى لو الصورة لونها مختلف.</p>
          <ul className="palette-list">
            {palette.map(c => (
              <li key={c.id}>
                <span className="swatch" style={{ background: c.hex }} aria-hidden="true" />
                <span className="swatch-name">{c.nameAr}</span>
                <span className="swatch-value">{c.value}</span>
              </li>
            ))}
          </ul>
          <p className="palette-tip">💡 اطلب عيّنة خشب الجوز وحطها جنب الحيطة بعد الدهان قبل التنفيذ.</p>
        </section>

        <div className="carp-table-wrap">
          <table className="carp-table">
            <thead>
              <tr>
                <th>الغرفة</th>
                <th>القطعة</th>
                <th>العدد</th>
                <th>المواصفات</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room =>
                room.pieces.map((piece, pi) => {
                  const specs = piece.specs.filter(s => !['الكمية', 'الوصف', 'تنبيه'].includes(s.labelAr));
                  const notes = [
                    piece.specs.find(s => s.labelAr === 'الوصف' || s.labelAr === 'تنبيه')?.value,
                    piece.images.some(im => im.option) && 'لسه بنختار بين التصميمات اللي في الصور',
                  ].filter(Boolean);
                  // options are all shown; other extra views are skipped to keep the file short
                  const shown = piece.images.some(im => im.option) ? piece.images.filter(im => im.option) : piece.images.slice(0, 1);
                  return (
                    <tr key={piece.id}>
                      {pi === 0 && (
                        <td rowSpan={room.pieces.length} className="room-cell">{room.nameAr}</td>
                      )}
                      <td className="piece-cell">
                        <div className="piece-photos">
                          {shown.map((im, i) => (
                            <figure key={i}>
                              <img src={im.src} alt="" />
                              {im.option && <figcaption>اختيار {i + 1}: {im.label}</figcaption>}
                            </figure>
                          ))}
                        </div>
                        <span>{piece.nameAr}</span>
                      </td>
                      <td className="qty-cell">{piece.qty}</td>
                      <td className="specs-cell">
                        <ul>
                          {specs.map((s, i) => (
                            <li key={i}><strong>{s.labelAr}:</strong> {s.value}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="notes-cell">{notes.length ? notes.join(' — ') : '—'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
