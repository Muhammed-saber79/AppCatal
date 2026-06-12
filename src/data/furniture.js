// بيتنا — Apartment Furniture Data
// All rooms and pieces with specs for the carpenter summary

export const rooms = [
  {
    id: 'reception',
    nameAr: 'الاستقبال',
    nameEn: 'Reception',
    pieces: [
      {
        id: 'sofa',
        nameAr: 'الكنبة',
        nameEn: 'Sofa',
        qty: 3,
        image: '/images/reception-sofa.jpg',
        svgId: 'SofaSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '3 قطع متطابقة' },
          { labelAr: 'اللون', labelEn: 'Color', value: 'بيج دافئ' },
          { labelAr: 'المقاعد', labelEn: 'Seats', value: '3 مقاعد / قطعة' },
          { labelAr: 'الذراعين', labelEn: 'Arms', value: 'ذراعان منحنيان بإطار ذهبي' },
          { labelAr: 'القماش', labelEn: 'Fabric', value: 'مخمل' },
          { labelAr: 'الأرجل', labelEn: 'Legs', value: 'ذهبي' },
          { labelAr: 'الوصف', labelEn: 'Notes', value: 'كنبة منخفضة وعريضة، وسائد ظهر بنقش فضي' },
        ],
      },
      {
        id: 'reception-table',
        nameAr: 'طاولة الاستقبال',
        nameEn: 'Center Table',
        qty: 1,
        image: '/images/reception-table.jpg',
        svgId: 'ReceptionTableSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج فاخر بإطار ذهبي' },
          { labelAr: 'القاعدة', labelEn: 'Base', value: 'قاعدة كبسولة بيج مستديرة' },
          { labelAr: 'الشكل', labelEn: 'Shape', value: 'مستطيل' },
          { labelAr: 'الوصف', labelEn: 'Notes', value: 'سطح زجاجي مسطح مع قاعدة ضخمة بشكل الكبسولة' },
        ],
      },
    ],
  },
  {
    id: 'master',
    nameAr: 'غرفة النوم الرئيسية',
    nameEn: 'Master Bedroom',
    pieces: [
      {
        id: 'bed',
        nameAr: 'السرير',
        nameEn: 'LED Bed',
        qty: 1,
        image: '/images/bed.jpg',
        svgId: 'BedSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الرأسية', labelEn: 'Headboard', value: '~12 شريطاً رأسياً منجداً' },
          { labelAr: 'الإضاءة', labelEn: 'Lighting', value: 'إطاران LED حلقي على الجانبين' },
          { labelAr: 'القاعدة', labelEn: 'Base', value: 'منصة مستوية' },
          { labelAr: 'اللون', labelEn: 'Color', value: 'رمادي / أبيض' },
        ],
      },
      {
        id: 'wardrobe',
        nameAr: 'خزانة الملابس',
        nameEn: 'Wardrobe',
        qty: 1,
        image: '/images/wardrobe-mirror.jpg',
        svgId: 'WardrobeSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الأقسام', labelEn: 'Sections', value: 'قسم مفتوح (شماعات + رفوف) + 4 أبواب انزلاقية' },
          { labelAr: 'المرايا', labelEn: 'Mirrors', value: 'الباب 2 و3 بمرايا كاملة الطول' },
          { labelAr: 'الوصف', labelEn: 'Notes', value: 'قطعة واحدة متكاملة — قسم الشماعات على اليسار' },
        ],
      },
      {
        id: 'vanity',
        nameAr: 'طاولة التزيين',
        nameEn: 'Smart Vanity',
        qty: 1,
        image: '/images/vanity.jpg',
        svgId: 'VanitySVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'المرآة', labelEn: 'Mirror', value: 'مرآة LED مربعة كبيرة' },
          { labelAr: 'الأدراج', labelEn: 'Drawers', value: '2 درج مركزي' },
          { labelAr: 'الجانبين', labelEn: 'Side Cabinets', value: 'خزانة جانبية على كل طرف' },
          { labelAr: 'الكرسي', labelEn: 'Stool', value: 'كرسي صغير' },
        ],
      },
    ],
  },
  {
    id: 'dining',
    nameAr: 'غرفة الطعام والبار',
    nameEn: 'Dining & Bar',
    pieces: [
      {
        id: 'dining-table',
        nameAr: 'طاولة الطعام',
        nameEn: 'Dining Table',
        qty: 1,
        image: '/images/dining-table.jpg',
        svgId: 'DiningTableSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 طاولة + 6 كراسي' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج فاخر سميك' },
          { labelAr: 'الإطار', labelEn: 'Frame', value: 'إطار معدني ذهبي X' },
          { labelAr: 'الكراسي', labelEn: 'Chairs', value: '6 كراسي: 1+2+2+1 توزيع' },
          { labelAr: 'تنبيه', labelEn: 'Note', value: 'السطح زجاج وليس رخاماً' },
        ],
      },
      {
        id: 'bar-sideboard',
        nameAr: 'وحدة البار',
        nameEn: 'Bar Sideboard',
        qty: 1,
        image: '/images/bar-sideboard.jpg',
        svgId: 'BarSideboardSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج (وليس رخام)' },
          { labelAr: 'اللوحة', labelEn: 'Panel', value: 'لوحة مضلعة على اليسار' },
          { labelAr: 'الأبواب', labelEn: 'Doors', value: '4 أبواب خزانة' },
          { labelAr: 'المرايا', labelEn: 'Mirrors', value: '3 مرايا هندسية ذهبية ماسية فوقها' },
        ],
      },
    ],
  },
  {
    id: 'niche',
    nameAr: 'النيتش',
    nameEn: 'Niche',
    pieces: [
      {
        id: 'display-cabinet',
        nameAr: 'خزانة العرض الزجاجية',
        nameEn: 'Glass Display Cabinet',
        qty: 1,
        image: '/images/niche.jpg',
        svgId: 'NicheSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الرفوف', labelEn: 'Shelves', value: '5 رفوف زجاجية' },
          { labelAr: 'الإطار', labelEn: 'Frame', value: 'كريمي / ذهبي' },
          { labelAr: 'الإضاءة', labelEn: 'Lighting', value: 'شريط LED على الجانبين' },
          { labelAr: 'الشكل', labelEn: 'Shape', value: 'طويل وضيق' },
        ],
      },
    ],
  },
  {
    id: 'baby',
    nameAr: 'غرفة الأطفال',
    nameEn: 'Baby Room',
    pieces: [
      {
        id: 'baby-wardrobe',
        nameAr: 'خزانة الأطفال',
        nameEn: 'Baby Wardrobe',
        qty: 1,
        image: '/images/baby-wardrobe.jpg',
        svgId: 'BabyWardrobeSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الأبواب', labelEn: 'Doors', value: '2 باب انزلاقي' },
          { labelAr: 'الزخرفة', labelEn: 'Detail', value: 'خط رأسي مركزي واحد على كل باب' },
          { labelAr: 'الداخل', labelEn: 'Interior', value: 'قسمان داخليان' },
        ],
      },
      {
        id: 'baby-bed',
        nameAr: 'سرير الأطفال',
        nameEn: 'Baby Bed',
        qty: 2,
        image: '/images/baby-bed.jpg',
        svgId: 'BabyBedSVG',
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '2 سرير متطابق' },
          { labelAr: 'الرأسية', labelEn: 'Headboard', value: 'أشرطة رأسية (مثل سرير الرئيسية لكن أصغر)' },
          { labelAr: 'القاعدة', labelEn: 'Base', value: 'منصة مستوية' },
        ],
      },
    ],
  },
];

// Flat list of all pieces for easy lookup
export const allPieces = rooms.flatMap(r => r.pieces.map(p => ({ ...p, roomId: r.id, roomNameAr: r.nameAr, roomNameEn: r.nameEn })));
