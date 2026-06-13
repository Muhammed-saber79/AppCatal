import './CarpenterPage.css';
import { rooms } from '../data/furniture';

export default function CarpenterPage() {
  return (
    <div className="carpenter-page">
      <div className="carpenter-top">
        <div>
          <h2 className="carpenter-heading">جدول النجار</h2>
          <span className="carpenter-sub">CARPENTER SUMMARY</span>
        </div>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ طباعة
        </button>
      </div>

      <div className="carpenter-scroll">
        <div className="carp-table-wrap">
          <table className="carp-table" dir="rtl">
            <thead>
              <tr>
                <th>الغرفة</th>
                <th>القطعة</th>
                <th>الكمية</th>
                <th>المواصفات</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room =>
                room.pieces.map((piece, pi) => {
                  const note = piece.specs.find(
                    s => s.labelAr === 'الوصف' || s.labelAr === 'تنبيه'
                  );
                  return (
                    <tr key={piece.id}>
                      {pi === 0 && (
                        <td rowSpan={room.pieces.length} className="room-cell">
                          <span className="room-name-ar">{room.nameAr}</span>
                          <span className="room-name-en">{room.nameEn}</span>
                        </td>
                      )}
                      <td>
                        <span className="piece-name-ar">{piece.nameAr}</span>
                        <span className="piece-name-en">{piece.nameEn}</span>
                      </td>
                      <td className="qty-cell">{piece.qty}</td>
                      <td className="specs-cell">
                        <ul>
                          {piece.specs.slice(0, 3).map((s, i) => (
                            <li key={i}><strong>{s.labelAr}:</strong> {s.value}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="notes-cell">{note ? note.value : '—'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="carpenter-footer">
        بيتنا · Our Home · © 2025
      </div>
    </div>
  );
}
