import { rooms } from '../data/furniture';
import './CarpenterSummary.css';

export default function CarpenterSummary() {
  return (
    <section className="carpenter-section" id="carpenter">
      <div className="section-header">
        <h2 className="section-title-ar">جدول النجار</h2>
        <p className="section-title-en">Carpenter Summary</p>
      </div>

      <div className="carpenter-print-btn-row">
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ طباعة الجدول
        </button>
      </div>

      <div className="carpenter-table-wrap">
        <table className="carpenter-table" dir="rtl">
          <thead>
            <tr>
              <th>الغرفة</th>
              <th>القطعة</th>
              <th>الكمية</th>
              <th>المواصفات الرئيسية</th>
              <th>ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room =>
              room.pieces.map((piece, pi) => {
                const mainSpecs = piece.specs.slice(0, 3);
                const note = piece.specs.find(s => s.labelAr === 'الوصف' || s.labelAr === 'تنبيه' || s.labelAr === 'الوصف');
                return (
                  <tr key={piece.id} className={pi === 0 ? 'room-first' : ''}>
                    {pi === 0 && (
                      <td rowSpan={room.pieces.length} className="room-cell">
                        <span className="room-name-ar">{room.nameAr}</span>
                        <span className="room-name-en">{room.nameEn}</span>
                      </td>
                    )}
                    <td className="piece-name-cell">
                      <span className="piece-name-ar">{piece.nameAr}</span>
                      <span className="piece-name-en">{piece.nameEn}</span>
                    </td>
                    <td className="qty-cell">{piece.qty}</td>
                    <td className="specs-cell">
                      <ul>
                        {mainSpecs.map((s, i) => (
                          <li key={i}>
                            <strong>{s.labelAr}:</strong> {s.value}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="notes-cell">
                      {note ? note.value : '—'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
