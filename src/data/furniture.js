// بيتنا — Apartment Furniture Data
// All rooms and pieces with specs for the carpenter summary.
//
// Each piece has `images`: the first one is the main photo. Extra entries are
// either other views of the same design, or design OPTIONS (option: true) that
// are still being decided — those are labelled "اختيار" in the UI.

// One palette for the whole apartment — every piece follows it.
export const palette = [
  { id: 'body',  nameAr: 'الجسم والضلف',     value: 'كريمي',                hex: '#E6DCCB' },
  { id: 'wood',  nameAr: 'الخشب (تفاصيل بس)', value: 'جوز متوسط (مش غامق)', hex: '#845F47' },
  { id: 'metal', nameAr: 'المقابض والأرجل',   value: 'دهبي مطفي',             hex: '#B29C71' },
  { id: 'glass', nameAr: 'الزجاج والمرايا',   value: 'برونزي',                hex: '#564836' },
  { id: 'wall',  nameAr: 'الحيطان',          value: 'فانيلا لاتيه',           hex: '#DFD3C1' },
  { id: 'light', nameAr: 'الإضاءة',          value: 'دافية (Warm White)',     hex: '#F3D9A4' },
];

const P = '/photos/';

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
        images: [
          { src: P + 'sofa-a.jpg', label: 'الخط الدهبي بيلف على الركن', option: true },
          { src: P + 'sofa-b.jpg', label: 'الخط الدهبي على طول من تحت', option: true },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '3 قطع متطابقة' },
          { labelAr: 'القماش', labelEn: 'Fabric', value: 'قطيفة بيج دافي' },
          { labelAr: 'الدراعات', labelEn: 'Arms', value: 'رفيعة ومقوّسة من فوق، بخط دهبي رفيع حوالين وش الدراع، وقنوات طولية على الجنب' },
          { labelAr: 'الأرجل', labelEn: 'Legs', value: '4 أرجل جوز مربعة 5×5 سم، ارتفاع 10 سم، بطرف دهبي' },
          { labelAr: 'الزوايا', labelEn: 'Corners', value: 'زوايا تحت مدوّرة سنة خفيفة جداً' },
          { labelAr: 'المخدات', labelEn: 'Pillows', value: 'درجات بيج ودهبي (من غير فضي أو رمادي)' },
          { labelAr: 'الوصف', labelEn: 'Notes', value: 'رجل خامسة مخفية في النص من تحت عشان الهيكل مايهبطش' },
        ],
      },
      {
        id: 'reception-table',
        nameAr: 'ترابيزة الاستقبال',
        nameEn: 'Coffee Table',
        qty: 1,
        images: [{ src: P + 'coffee-table.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج برونزي مستطيل بزوايا مدوّرة' },
          { labelAr: 'الحرف', labelEn: 'Edge', value: 'إطار دهبي مطفي حوالين الزجاج' },
          { labelAr: 'القاعدة', labelEn: 'Base', value: 'حلقة بيضاوي (شكل O) كريمي' },
        ],
      },
      {
        id: 'tv-unit',
        nameAr: 'وحدة الشاشة',
        nameEn: 'TV Unit',
        qty: 1,
        images: [{ src: P + 'tv-unit.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'التركيب', labelEn: 'Mounting', value: 'معلّقة على الحيطة (طايرة)' },
          { labelAr: 'الإطار', labelEn: 'Shell', value: 'جوز: السطح والقاعدة والطرفين المقوّسين' },
          { labelAr: 'الأدراج', labelEn: 'Drawers', value: '4 ضلف كريمي من غير مقابض' },
        ],
      },
    ],
  },
  {
    id: 'master',
    nameAr: 'أوضة النوم',
    nameEn: 'Master Bedroom',
    pieces: [
      {
        id: 'bed',
        nameAr: 'السرير',
        nameEn: 'Bed',
        qty: 1,
        images: [
          { src: P + 'master-bed-walnut.jpg', label: 'براويز جوز من غير إضاءة', option: true },
          { src: P + 'master-bed-lights.jpg', label: 'كريمي بإضاءة ∞', option: true },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 سرير + 2 كومودينو + بانكيت' },
          { labelAr: 'الرأسية', labelEn: 'Headboard', value: 'لوح كريمي، فيه 9 قنوات منجّدة بيج' },
          { labelAr: 'البراويز', labelEn: 'Frames', value: 'حسب الاختيار: برواز جوز حوالين القنوات + حافة جوز رفيعة برا، أو كريمي بالكامل' },
          { labelAr: 'الإضاءة', labelEn: 'Lighting', value: 'حسب الاختيار: من غير، أو 2 إضاءة ∞ دافية' },
          { labelAr: 'الجوانب', labelEn: 'Rails', value: 'كريمي' },
          { labelAr: 'الكومودينو', labelEn: 'Nightstands', value: 'كريمي + زجاج برونزي بحرف جوز + مقابض دهبي' },
          { labelAr: 'البانكيت', labelEn: 'Bench', value: 'قعدة بيج + حرف جوز + جسم كريمي' },
        ],
      },
      {
        id: 'wardrobe',
        nameAr: 'دولاب الملابس',
        nameEn: 'Wardrobe',
        qty: 1,
        images: [{ src: P + 'master-wardrobe.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة — 4 ضلف' },
          { labelAr: 'الضلف', labelEn: 'Doors', value: 'كريمي، والطرفين عليهم خطين جوز رفاع' },
          { labelAr: 'الإطار', labelEn: 'Frame', value: 'حافة جوز حوالين الدولاب كله بأركان مدوّرة + قاعدة جوز' },
          { labelAr: 'المرايا', labelEn: 'Mirrors', value: '2 مراية برونزي في النص ببرواز جوز زواياه مدوّرة سنة' },
          { labelAr: 'المقابض', labelEn: 'Handles', value: 'بيضاوي دهبي غاطس' },
        ],
      },
      {
        id: 'mirror-rack',
        nameAr: 'المرايا والرف',
        nameEn: 'Mirror & Rack',
        qty: 1,
        images: [
          { src: '/images/Master-mirror&rack.png', label: 'من قدام' },
          { src: '/images/Master-mirror&rack-back.png', label: 'من ورا' },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الإطار', labelEn: 'Frame', value: 'خشب جوز' },
          { labelAr: 'النوع', labelEn: 'Type', value: 'مرايا مع رف علوي' },
          { labelAr: 'الموقع', labelEn: 'Location', value: 'الحائط الأخير — أوضة النوم' },
        ],
      },
      {
        id: 'vanity',
        nameAr: 'التسريحة',
        nameEn: 'Vanity',
        qty: 1,
        images: [{ src: P + 'vanity.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة + كرسي' },
          { labelAr: 'المراية', labelEn: 'Mirror', value: 'مراية مربعة عريضة ببرواز كريمي وإضاءة دافية' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج برونزي بحرف جوز' },
          { labelAr: 'الجسم', labelEn: 'Body', value: 'كريمي: عمود أدراج + دولاب صغير + درج تحت السطح' },
          { labelAr: 'المقابض', labelEn: 'Handles', value: 'دهبي مطفي' },
          { labelAr: 'الكرسي', labelEn: 'Stool', value: 'قعدة بيج على جسم كريمي' },
        ],
      },
    ],
  },
  {
    id: 'dining',
    nameAr: 'الصالة',
    nameEn: 'Dining & Bar',
    pieces: [
      {
        id: 'dining-table',
        nameAr: 'السفرة',
        nameEn: 'Dining Table',
        qty: 1,
        images: [{ src: P + 'dining.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 طاولة + 6 كراسي (1+2+2+1)' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج برونزي بحرف جوز' },
          { labelAr: 'الطاولة', labelEn: 'Table', value: 'جسم وأرجل كريمي مسلوبة بطرف دهبي' },
          { labelAr: 'الكراسي', labelEn: 'Chairs', value: 'قطيفة بيج، أرجل كريمي بطرف دهبي' },
        ],
      },
      {
        id: 'bar-sideboard',
        nameAr: 'البار',
        nameEn: 'Bar Sideboard',
        qty: 1,
        images: [
          { src: P + 'bar-glass.jpg', label: 'جوز + زجاج برونزي', option: true },
          { src: P + 'bar-wood.jpg', label: 'خشب من غير زجاج', option: true },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'جوز بأطراف مدوّرة (+ زجاج برونزي حسب الاختيار)' },
          { labelAr: 'الجسم', labelEn: 'Body', value: 'كريمي سادة بجوانب مقوّسة' },
          { labelAr: 'الأبواب', labelEn: 'Doors', value: '4 أبواب (2+2) بمقابض دهبي طولية' },
          { labelAr: 'الأرجل', labelEn: 'Legs', value: 'كريمي مسلوبة بطرف دهبي' },
          { labelAr: 'المرايا', labelEn: 'Mirrors', value: '3 مرايا برونزي بشكل حصى فوقه' },
        ],
      },
      {
        id: 'display-cabinet',
        nameAr: 'النيش',
        nameEn: 'Display Cabinet',
        qty: 1,
        images: [{ src: P + 'niche.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الجسم', labelEn: 'Body', value: 'كريمي سادة، جوانب مقوّسة من غير خطوط' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'غطا جوز رفيع من فوق' },
          { labelAr: 'التفاصيل', labelEn: 'Trims', value: 'شريط دهبي فوق وتحت + أطراف الأرجل دهبي' },
          { labelAr: 'الرفوف', labelEn: 'Shelves', value: '5 رفوف زجاج + بابين زجاج' },
          { labelAr: 'الإضاءة', labelEn: 'Lighting', value: 'LED دافي على الجوانب' },
        ],
      },
    ],
  },
  {
    id: 'baby',
    nameAr: 'أوضة الأطفال',
    nameEn: 'Kids Room',
    pieces: [
      {
        id: 'baby-wardrobe',
        nameAr: 'دولاب الأطفال',
        nameEn: 'Kids Wardrobe',
        qty: 1,
        images: [{ src: P + 'kids-wardrobe.jpg' }],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة' },
          { labelAr: 'الأبواب', labelEn: 'Doors', value: '2 باب سحاب كريمي' },
          { labelAr: 'الزخرفة', labelEn: 'Detail', value: 'شريط جوز متموّج (S) في نص كل باب' },
          { labelAr: 'المرآة', labelEn: 'Mirror', value: 'مراية طولية على النص الشمال للباب الأول' },
          { labelAr: 'الإطار', labelEn: 'Frame', value: 'سطح وقاعدة وجنب جوز بأطراف مدوّرة' },
        ],
      },
      {
        id: 'baby-bed',
        nameAr: 'سراير الأطفال',
        nameEn: 'Kids Beds',
        qty: 2,
        images: [
          { src: P + 'kids-beds.jpg', label: 'السريرين مع بعض' },
          { src: P + 'kids-bed-1.jpg', label: 'السرير الأول' },
          { src: P + 'kids-bed-2.jpg', label: 'السرير التاني' },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '2 سرير — التاني عكس الأول' },
          { labelAr: 'الرأسية', labelEn: 'Headboard', value: 'كريمي بلوحة منجّدة بيج' },
          { labelAr: 'التفصيلة', labelEn: 'Detail', value: 'فتحة بيضاوي بشريط جوز في الجزء الصغير' },
          { labelAr: 'الاتجاه', labelEn: 'Orientation', value: 'الجزء الصغير ناحية الكومود في السريرين' },
          { labelAr: 'القاعدة', labelEn: 'Base', value: 'صندوق كريمي سادة' },
        ],
      },
      {
        id: 'baby-commode',
        nameAr: 'كومود الأطفال',
        nameEn: 'Kids Nightstand',
        qty: 1,
        images: [
          { src: '/images/Baby-commode.png', label: 'الكومود' },
          { src: P + 'kids-beds.jpg', label: 'بين السريرين' },
        ],
        specs: [
          { labelAr: 'الكمية', labelEn: 'Quantity', value: '1 قطعة (بين السريرين)' },
          { labelAr: 'الألوان', labelEn: 'Colors', value: 'كريمي + قاعدة جوز' },
          { labelAr: 'السطح', labelEn: 'Top', value: 'زجاج برونزي فوق إطار جوز' },
          { labelAr: 'الدرج', labelEn: 'Drawer', value: 'درج واحد كبير بمقبض محفور' },
          { labelAr: 'الشكل', labelEn: 'Shape', value: 'جوانب مقوّسة' },
        ],
      },
    ],
  },
];

// Flat list of all pieces for easy lookup. `image` = the main photo.
export const allPieces = rooms.flatMap(r => r.pieces.map(p => ({
  ...p,
  image: p.images[0].src,
  roomId: r.id,
  roomNameAr: r.nameAr,
  roomNameEn: r.nameEn,
})));
