import { CollectionGroup, ProductItem, WorkflowStep } from '../types';

export const COMPANY_INFO = {
  vi: {
    officialName: 'CÔNG TY TNHH NỘI THẤT TOP LINE HOSPITALITY',
    internationalName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    shortName: 'TOP LINE HOSPITALITY FURNITURE CO., LTD',
    brandName: 'TOPLINE FURNITURE',
    taxId: '3703519683',
    registrationDate: '09/10/2026',
    legalRepresentative: 'Trần Văn Đương – Giám đốc',
    coreActivity: 'Sản xuất đồ gỗ nội thất & mộc kiến trúc theo yêu cầu',
    address: 'Số 26, Đường DX-027, Khu phố Phú Mỹ 2, Phường Bình Dương, Thành phố Hồ Chí Minh, Việt Nam',
    factoryFacility: 'Xưởng Sản Xuất Nội Thất Xuất Khẩu TopLine – Việt Nam',
    hotline: '0977 429 979',
    phoneDisplay: '0977.429.979',
    email: 'info@toplinefurniture.vn',
    salesEmail: 'sales@toplinefurniture.vn',
    techEmail: 'tech@toplinefurniture.vn',
    supportEmail: 'support@toplinefurniture.vn',
    accountingEmail: 'accounting@toplinefurniture.vn',
    tagline: 'NỘI THẤT CAO CẤP THEO YÊU CẦU',
    subTagline: 'TỪ BẢN VẼ ĐẾN THÀNH PHẨM, HOÀN THIỆN TRONG TỪNG CHI TIẾT',
    heritageYear: '2013',
    incorporationDate: '09/10/2026',
    heritageNote: 'Thương hiệu TopLine được Don Winston khởi xướng từ năm 2013. Pháp nhân sản xuất tại Việt Nam thành lập ngày 09/10/2026.',
    foundingStory:
      'Được khởi xướng bởi Don Winston từ năm 2013, TopLine Furniture vận hành như một đối tác sản xuất chiến lược: kết hợp sự tỉ mỉ của tay nghề mộc truyền thống với quy trình gia công chính xác trên quy mô lớn. Pháp nhân sản xuất tại Việt Nam (CÔNG TY TNHH NỘI THẤT TOP LINE HOSPITALITY) được đăng ký chính thức ngày 09/10/2026.',
    foundingSub:
      'TOPLINE phát triển, sản xuất và cung cấp nội thất theo bản vẽ, thông số kỹ thuật và yêu cầu riêng cho từng dự án.',
    footerDesc:
      'Chuyên phát triển, sản xuất và cung cấp nội thất theo thiết kế cho các dự án khách sạn, không gian thương mại và thị trường quốc tế.',
  },
  en: {
    officialName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    internationalName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    shortName: 'TOP LINE HOSPITALITY FURNITURE CO., LTD',
    brandName: 'TOPLINE FURNITURE',
    taxId: '3703519683',
    registrationDate: 'October 09, 2026',
    legalRepresentative: 'Tran Van Duong – Managing Director',
    coreActivity: 'Custom Contract Furniture & Architectural Millwork Manufacturing',
    address: 'No. 26, DX-027 Street, Phu My 2 Quarter, Binh Duong Ward, Ho Chi Minh City, Vietnam',
    factoryFacility: 'TopLine Furniture Manufacturing Facility - Vietnam',
    hotline: '+84 977 429 979',
    phoneDisplay: '+84 977 429 979',
    email: 'info@toplinefurniture.vn',
    salesEmail: 'sales@toplinefurniture.vn',
    techEmail: 'tech@toplinefurniture.vn',
    supportEmail: 'support@toplinefurniture.vn',
    accountingEmail: 'accounting@toplinefurniture.vn',
    tagline: 'HIGH-END BESPOKE FURNITURE',
    subTagline: 'FROM BLUEPRINT TO FINISHED PIECE, REFINED IN EVERY DETAIL',
    heritageYear: '2013',
    incorporationDate: 'October 09, 2026',
    heritageNote: 'Brand heritage initiated by Don Winston in 2013. The operating legal entity in Vietnam was incorporated on October 09, 2026.',
    foundingStory:
      'Initiated by Don Winston in 2013, TopLine Furniture was built on a foundational principle: to make custom furniture truly scalable without sacrificing the bench-made craftsmanship, material honesty, and exacting tolerances that define heirloom contract joinery. Our dedicated manufacturing entity in Vietnam (TOP LINE HOSPITALITY FURNITURE CO., LTD) was incorporated on October 09, 2026.',
    foundingSub:
      'TOPLINE develops, manufactures, and supplies custom furniture based on architectural drawings, technical specifications, and bespoke project requirements.',
    footerDesc:
      'Specialized in developing, manufacturing, and supplying design-led furniture for hospitality projects, commercial spaces, and international export markets.',
  },
};

export const CORE_SECTORS = [
  {
    id: 'hospitality',
    title: { vi: 'Nội Thất Khách Sạn Dự Án', en: 'Custom Hospitality Furniture' },
    subtitle: {
      vi: 'Dự án phòng ngủ & không gian công cộng',
      en: 'Guestrooms, Suites & Public Areas',
    },
    desc: {
      vi: 'Chế tác đồ gỗ buồng phòng và không gian công cộng dựa trên hồ sơ bản vẽ kiến trúc, bảng chỉ định vật liệu (Spec Sheet) và quy trình duyệt mẫu golden sample nghiêm ngặt.',
      en: 'Turnkey guestroom casegoods, suites, and public area loose furniture manufactured to exact architectural drawings, finish schedules, and approved physical golden samples.',
    },
    capabilities: [
      { vi: 'Guestroom Casegoods (Giường, bàn trang điểm, tủ quần áo)', en: 'Guestroom Casegoods' },
      { vi: 'Public-area Furniture (Nội thất sảnh lễ tân, sảnh chờ)', en: 'Public-area Furniture' },
      { vi: 'Custom Vanities (Bàn chậu rửa mặt đá và gỗ)', en: 'Custom Vanities' },
      { vi: 'Mixed-material Furniture (Gỗ, đá tự nhiên, kim loại mạ)', en: 'Mixed-material Furniture' },
    ],
    badge: 'HOSPITALITY',
  },
  {
    id: 'millwork',
    title: { vi: 'Ốp Gỗ & Mộc Kiến Trúc', en: 'Architectural Millwork' },
    subtitle: {
      vi: 'Hệ module gắn tường & fit-out chuẩn xác',
      en: 'Built-in & Fitted Elements to Dimension',
    },
    desc: {
      vi: 'Các cấu kiện mộc liền tường may đo theo kích thước hiện trạng thực tế: hệ vách ốp tiêu âm, tủ kệ âm tường, quầy bar thương mại với lớp sơn đồng nhất và giải pháp lắp đặt hiện trường thuận tiện.',
      en: 'Site-measured architectural cabinetry, acoustic wall paneling, banquettes, and fitted commercial casework engineered with finish consistency and efficient on-site installation detailing.',
    },
    capabilities: [
      { vi: 'Cabinetry & Hệ tủ âm tường', en: 'Architectural Cabinetry' },
      { vi: 'Wall systems & Vách ốp tiêu âm trang trí', en: 'Wall Systems & Paneling' },
      { vi: 'Quầy bar, kệ trưng bày thương mại', en: 'Commercial Shelving & Display' },
      { vi: 'Bàn làm việc & Workstations cho chuỗi nhà hàng', en: 'Workstations & Fitted Joinery' },
    ],
    badge: 'MILLWORK',
  },
  {
    id: 'retail',
    title: { vi: 'Bộ Sưu Tập Bán Lẻ Cao Cấp', en: 'Collection-Led Retail Furniture' },
    subtitle: {
      vi: 'Hệ sản phẩm đồng nhất ngôn ngữ thiết kế',
      en: 'Coordinated Families & Design Language',
    },
    desc: {
      vi: 'Phát triển trọn bộ gia đình sản phẩm đồng bộ: nhất quán từ tỷ lệ hình học, chất liệu gỗ sồi tự nhiên, mặt đá cẩm thạch hoàn thiện satin đến phụ kiện kim khí đồng thau gia công riêng.',
      en: 'Coordinated furniture families developed for design-led hospitality and retail brands — consistent in timber selection, marble profiling, custom hardware, and architectural proportion.',
    },
    capabilities: [
      { vi: 'Accent & Occasional (Bàn trà, bàn console, tủ cạnh)', en: 'Accent & Occasional' },
      { vi: 'Dining & Console Tables (Bàn ăn mặt đá, gỗ sồi)', en: 'Dining & Console Tables' },
      { vi: 'Bedroom Accent Furniture (Giường ngủ, tủ đầu giường)', en: 'Bedroom Accent Furniture' },
      { vi: 'Coordinated Collection Development (Phát triển trọn bộ)', en: 'Coordinated Development' },
    ],
    badge: 'RETAIL',
  },
];
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: { vi: 'Review & Đánh Giá', en: 'Review & Feasibility' },
    desc: {
      vi: 'Phân tích bản vẽ kiến trúc, thông số kỹ thuật, hồ sơ vật liệu và tiến độ lắp đặt của dự án.',
      en: 'In-depth analysis of architectural drawings, specifications, material schedules, and site schedules.',
    },
    details: {
      vi: 'Tư vấn giải pháp tối ưu kết cấu và giá thành mà vẫn giữ trọn ý đồ thiết kế ban đầu.',
      en: 'Value engineering proposals to optimize durability, weight, and fabrication cost.',
    },
  },
  {
    step: '02',
    title: { vi: 'Develop & Mẫu Thử', en: 'Develop & Sampling' },
    desc: {
      vi: 'Kỹ thuật hóa chi tiết (Shop drawings), làm mẫu hoàn thiện màu sơn (finish sample) và chế tác sản phẩm mẫu (mock-up unit).',
      en: 'CAD shop drawings, exact finish color matching, and full-scale golden master mock-ups.',
    },
    details: {
      vi: 'Gửi mẫu duyệt thực tế trực tiếp đến khách hàng và nhà thiết kế trước khi đưa vào dây chuyền.',
      en: 'Physical sample courier to international clients & designers for sign-off.',
    },
  },
  {
    step: '03',
    title: { vi: 'Produce & Sản Xuất', en: 'Produce & Fabrication' },
    desc: {
      vi: 'Gia công hàng loạt trên máy móc hiện đại kết hợp bàn tay khéo léo của thợ mộc lành nghề Việt Nam.',
      en: 'Precision CNC processing paired with artisanal bench joinery and disciplined assembly lines.',
    },
    details: {
      vi: 'Kiểm soát nghiêm ngặt độ ẩm gỗ dưới 10–12% tránh cong vênh khi xuất khẩu sang các vùng khí hậu khác nhau.',
      en: 'Kiln moisture monitoring calibrated for varying international destination climates.',
    },
  },
  {
    step: '04',
    title: { vi: 'Inspect & Kiểm Định', en: 'Inspect & Quality Control' },
    desc: {
      vi: 'Kiểm tra chất lượng (QC) 100% từng sản phẩm: độ khít mối ghép, ray trượt, độ phẳng mặt đá và độ đồng màu sơn.',
      en: '100% component inspection: joinery integrity, hardware endurance, stone flatness, and color tone.',
    },
    details: {
      vi: 'Biên bản nghiệm thu kèm hình ảnh chi tiết gửi cho đại diện dự án theo từng công đoạn.',
      en: 'Photographic inspection reports logged against project bill of materials.',
    },
  },
  {
    step: '05',
    title: { vi: 'Pack & Đóng Gói Xuất Khẩu', en: 'Pack & Export Logistics' },
    desc: {
      vi: 'Đóng gói chống sốc đa lớp bằng xốp bọt khí, góc bảo vệ tăng cường và thùng carton chịu lực hoặc kiện gỗ chuyên dụng.',
      en: 'Heavy-duty multi-layer protective wrapping, reinforced corner guards, and drop-tested export crating.',
    },
    details: {
      vi: 'Ghi nhãn mã phòng (room numbering) rõ ràng để hỗ trợ việc phân phối lắp đặt tại công trình một cách nhanh chóng.',
      en: 'Room-by-room labeling enabling efficient on-site distribution and hotel fit-out.',
    },
  },
];

export const COMMERCIAL_CLIENTS = [
  { name: 'Taco Bell', role: 'Architectural Millwork & Fitted Stations', logoText: 'TACO BELL' },
  { name: 'Five Guys', role: 'Commercial Joinery & Wall Systems', logoText: 'FIVE GUYS' },
  { name: 'KFC', role: 'Seating Elements & Dining Surfaces', logoText: 'KFC' },
  { name: 'Boutique Hotel Suites', role: 'Custom Casegoods & Vanities', logoText: 'BOUTIQUE RESORTS' },
  { name: 'Stanley Furniture', role: 'Fine Woodworking & Export Collections', logoText: 'STANLEY' },
];

export const COLLECTIONS_OVERVIEW: CollectionGroup[] = [
  {
    id: 'warm-wood',
    number: '01',
    title: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Warm Wood + Dark Stone' },
    subtitle: {
      vi: 'Sự giao thoa giữa chất mộc ấm áp và vẻ đẹp vĩnh cửu của đá tự nhiên trầm. Dáng bo tròn mềm mại kết hợp nan gỗ xẻ rãnh fluted tinh xảo.',
      en: 'Warm wood, dark natural stone, rounded case profiles, fluted details and antique-brass accents.',
    },
    pieces: 'CREDENZA | DRESSER | NIGHTSTAND | CONSOLE | COFFEE TABLE | DINING TABLE',
    overviewImage: '/images/profile/collection-01-warm-wood.png',
    detailImage: '/images/capabilities/TL-WW-Details_Materials.png',
    materialsSummary: {
      vi: 'Gỗ tự nhiên bọc Dark Veneer, Mặt đá cẩm thạch Dark Emperador Marble, Nan sọc dọc, Đồng cổ',
      en: 'Dark Oak Veneer, Natural Dark Emperador Marble, Hand-fluted slats, Antique Brass pulls',
    },
  },
  {
    id: 'black-contemporary',
    number: '02',
    title: { vi: 'Bộ Sưu Tập 02: Đen Kiến Trúc', en: 'Collection 02: Black Contemporary' },
    subtitle: {
      vi: 'Đường nét kiến trúc đương đại mạch lạc, tối giản tinh tế, tỷ lệ hình khối cân xứng tuyệt đối mang sắc đen huyền bí sang trọng.',
      en: 'A coordinated dark bedroom and media family with clean architectural proportions and restrained detailing.',
    },
    pieces: 'BED | NIGHTSTAND | DRESSER | CHEST | MEDIA CONSOLE | MIRROR',
    overviewImage: '/images/profile/collection-02-black-contemporary.png',
    detailImage: '/images/products/TL-BC-01_King_Bed.png',
    materialsSummary: {
      vi: 'Gỗ tần bì tự nhiên kết hợp MDF/HDF chống ẩm, Sơn đen mờ Matte Black, Tay nắm vát âm tối giản',
      en: 'Natural Ash & moisture-resistant HDF core, Matte Black open-pore finish, Integrated bevel pulls',
    },
  },
  {
    id: 'sculptural',
    number: '03',
    title: { vi: 'Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ', en: 'Collection 03: Sculptural Stone + Wood' },
    subtitle: {
      vi: 'Tác phẩm nghệ thuật điêu khắc nội thất. Kết hợp phiến đá tự nhiên vân biểu cảm sống động với bệ chân gỗ sồi uốn lượn hữu cơ.',
      en: 'Statement occasional, dining and storage pieces combining expressive stone surfaces with sculptural oak forms.',
    },
    pieces: 'SIDEBOARD | COFFEE TABLE | SIDE TABLE | DINING / CONSOLE TABLE',
    overviewImage: '/images/profile/collection-03-sculptural-stone.png',
    detailImage: '/images/capabilities/TL-SW-Hero_Collection.png',
    materialsSummary: {
      vi: 'Đá tự nhiên Calacatta / Breccia phiến lớn, Gỗ sồi tự nhiên White Oak uốn cong, Dầu dưỡng mộc tự nhiên',
      en: 'Calacatta / Breccia natural stone slabs, Sculptural White Oak curved bases, Hand-rubbed oil finish',
    },
  },
  {
    id: 'dining-accent',
    number: '04',
    title: { vi: 'Bộ Sưu Tập 04: Bàn Ăn & Tạo Điểm Nhấn', en: 'Collection 04: Dining & Accent Collection' },
    subtitle: {
      vi: 'Vẻ đẹp vượt thời gian mang lại chiều sâu cảm xúc và sự tinh tế cho không gian nội thất hiện đại và cổ điển. Tôn vinh bề mặt xúc giác tự nhiên.',
      en: 'Timeless contemporary pieces celebrating natural tactile surfaces, layered geometric volumes, and artisan-crafted joinery.',
    },
    pieces: 'DINING TABLE | SIDEBOARD | COFFEE TABLE | ORGANIC COFFEE TABLE | LOW CABINET | GEOMETRIC SIDE TABLE',
    overviewImage: '/images/profile/collection-04-approved.png',
    detailImage: '/images/capabilities/TL-DA-Details_Materials.png',
    materialsSummary: {
      vi: 'Gỗ sồi nâu ấm, Mặt đá cẩm thạch be kem, Nan gỗ dệt ziczac, Chân ghép đá & gỗ vững chắc',
      en: 'Warm honey oak, cream beige natural marble top, hand-woven slatted joinery, hybrid stone-timber bases',
    },
  },
  {
    id: 'marlow-oak',
    number: '05',
    title: { vi: 'Bộ Sưu Tập 05: Stanley Marlow Oak', en: 'Collection 05: Stanley Marlow Oak Collection' },
    subtitle: {
      vi: 'Phong cách chuyển tiếp Mỹ (Transitional American). Gỗ sồi chải cước mộc wire-brushed tạo cảm giác mộc mạc cao cấp, thư thái và bền vững.',
      en: 'American Transitional bedroom collection in wire-brushed white oak with tailored upholstered detailing.',
    },
    pieces: 'MARLOW KING BED | MARLOW 6-DRAWER DRESSER | MARLOW NIGHTSTAND',
    overviewImage: '/images/capabilities/TL-ST-Details_Materials.png',
    detailImage: '/images/profile/stanley-marlow-01.jpg',
    materialsSummary: {
      vi: 'Gỗ sồi trắng Mỹ White Oak, Vải dệt nỉ cao cấp nhập khẩu, Tay nắm kim loại gunmetal, Bề mặt chải cước mộc',
      en: 'Wire-brushed American White Oak, tailored performance fabric, gunmetal bronze hardware, dovetailed joinery',
    },
  },
  {
    id: 'burl-oak',
    number: '06',
    title: { vi: 'Bộ Sưu Tập 06: Stanley Burl Oak Dark', en: 'Collection 06: Stanley Burl Oak Dark Collection' },
    subtitle: {
      vi: 'Đẳng cấp quý tộc tân cổ điển (Traditional Luxury). Khai thác vẻ đẹp vân mây xoáy huyền ảo của veneer gỗ nu sồi trầm quý hiếm kết hợp phào chỉ uốn cong.',
      en: 'Finished Stanley Furniture pieces grouped as the Burl Oak Dark bedroom collection featuring heirloom burl veneers.',
    },
    pieces: 'KING PANEL BED | UPHOLSTERED BED | 9-DRAWER DRESSER | BACHELOR CHEST NIGHTSTAND',
    overviewImage: '/images/profile/stanley-burl-oak.jpg',
    detailImage: '/images/products/TL-BD-01_King_Panel_Bed.png',
    materialsSummary: {
      vi: 'Veneer gỗ nu sồi quý tộc Burl Oak, Gỗ thịt tự nhiên, Đầu giường vòm vương miện, Chân quỳ uốn cong',
      en: 'Exotic Burl Oak root veneer, solid hardwood substrate, traditional crown mouldings, cabriole legs',
    },
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    "id": "tl-ww-01",
    "sku": "TL-WW-01",
    "name": {
      "vi": "Tủ Credenza / Cabinet Mặt Đá Dark Emperador",
      "en": "Credenza / Cabinet with Marble Top"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "1200 x 450 x 750 mm",
    "dimensionsCm": "120 x 45 x 75 cm",
    "materials": {
      "vi": "Gỗ tự nhiên & Veneer sồi sẫm màu, Mặt đá cẩm thạch Dark Emperador",
      "en": "Natural Dark Emperador Marble, select dark oak veneer, solid hardwood substrate"
    },
    "finish": {
      "vi": "Dark Veneer phủ mờ cao cấp",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu gỗ ấm + Nâu vân đá Emperador",
      "en": "Nâu gỗ ấm + Nâu vân đá Emperador"
    },
    "hardware": {
      "vi": "Tay nắm đồng cổ (Antique Brass)",
      "en": "Antique brass metal pulls, soft-closing undermount slides"
    },
    "designStyle": {
      "vi": "Modern Luxury / Mid-Century",
      "en": "Modern Luxury / Mid-Century"
    },
    "features": {
      "vi": "Thiết kế dáng tủ bán nguyệt bo cong 2 đầu chống va đập, 2 cánh mở lớn với khoang chia đợt thông minh. Bề mặt đá Emperador Tây Ban Nha với những đường vân hoa tuyết độc bản chống thấm nước, chống xước, chịu lực cao. Thích hợp làm tủ trang trí phòng khách, tủ rượu sảnh đón hoặc tủ buffet phòng ăn.",
      "en": "Credenza / Cabinet with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-01_Credenza_Cabinet.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-01_Credenza_Cabinet.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "Thiết kế dáng tủ bán nguyệt bo cong 2 đầu chống va đập, 2 cánh mở lớn với khoang chia đợt thông minh. Bề mặt đá Emperador Tây Ban Nha với những đường vân hoa tuyết độc bản chống thấm nước, chống xước, chịu lực cao. Thích hợp làm tủ trang trí phòng khách, tủ rượu sảnh đón hoặc tủ buffet phòng ăn.",
      "en": "Credenza / Cabinet with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TopLine",
      "TuCredenza",
      "DaEmperador",
      "WarmWood",
      "NoiThatGoCaoCap"
    ],
    "seoKeywords": "#TopLine #TuCredenza #DaEmperador #WarmWood #NoiThatGoCaoCap"
  },
  {
    "id": "tl-ww-02",
    "sku": "TL-WW-02",
    "name": {
      "vi": "Tủ Ngăn Kéo 6 Hộc Warm Wood Mặt Đá Marble",
      "en": "6-Drawer Dresser with Marble Top"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "1400 x 520 x 800 mm",
    "dimensionsCm": "140 x 52 x 80 cm",
    "materials": {
      "vi": "Gỗ tự nhiên & Veneer cao cấp, Mặt đá Dark Emperador Marble",
      "en": "Natural Dark Emperador Marble, select dark oak veneer, solid hardwood substrate"
    },
    "finish": {
      "vi": "Dark Veneer mờ tinh tế",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu gỗ ấm + Nâu vân đá Emperador",
      "en": "Nâu gỗ ấm + Nâu vân đá Emperador"
    },
    "hardware": {
      "vi": "Ray trượt giảm chấn, Tay nắm đồng cổ đôi",
      "en": "Antique brass metal pulls, soft-closing undermount slides"
    },
    "designStyle": {
      "vi": "Modern Luxury / Contemporary",
      "en": "Modern Luxury / Contemporary"
    },
    "features": {
      "vi": "6 hộc kéo bố trí đối xứng 2 cột x 3 tầng, không gian lưu trữ quần áo và phụ kiện cực lớn. Hệ ray âm trượt êm ái chống kẹt. Mặt đá tự nhiên dày 20mm tôn thêm vẻ vương giả cho phòng ngủ master.",
      "en": "6-Drawer Dresser with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-02_6Drawer_Dresser.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-02_6Drawer_Dresser.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "6 hộc kéo bố trí đối xứng 2 cột x 3 tầng, không gian lưu trữ quần áo và phụ kiện cực lớn. Hệ ray âm trượt êm ái chống kẹt. Mặt đá tự nhiên dày 20mm tôn thêm vẻ vương giả cho phòng ngủ master.",
      "en": "6-Drawer Dresser with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuNganKeo",
      "TuDresser",
      "PhongNguCaoCap",
      "TopLineFurniture",
      "MarbleDresser"
    ],
    "seoKeywords": "#TuNganKeo #TuDresser #PhongNguCaoCap #TopLineFurniture #MarbleDresser"
  },
  {
    "id": "tl-ww-03",
    "sku": "TL-WW-03",
    "name": {
      "vi": "Tủ Đầu Giường 2 Ngăn Kéo Bo Cong Mặt Đá",
      "en": "Nightstand 2-Drawer with Marble Top"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "600 x 450 x 550 mm",
    "dimensionsCm": "60 x 45 x 55 cm",
    "materials": {
      "vi": "Gỗ sồi veneer sẫm màu, Mặt đá cẩm thạch Dark Emperador",
      "en": "Natural Dark Emperador Marble, select dark oak veneer, solid hardwood substrate"
    },
    "finish": {
      "vi": "Dark Veneer hoàn thiện thủ công",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu gỗ ấm + Đá Emperador",
      "en": "Nâu gỗ ấm + Đá Emperador"
    },
    "hardware": {
      "vi": "Tay nắm đồng thanh ngang, Ray trượt êm",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Modern Luxury",
      "en": "Modern Luxury"
    },
    "features": {
      "vi": "Dáng tab đầu giường bo tròn góc thanh lịch, mặt đá cẩm thạch thoải mái để đèn ngủ, ly nước mà không sợ ố bẩn. 2 hộc kéo tiện lợi cất giữ vật dụng cá nhân.",
      "en": "Nightstand 2-Drawer with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-03_Nightstand.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-03_Nightstand.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "Dáng tab đầu giường bo tròn góc thanh lịch, mặt đá cẩm thạch thoải mái để đèn ngủ, ly nước mà không sợ ố bẩn. 2 hộc kéo tiện lợi cất giữ vật dụng cá nhân.",
      "en": "Nightstand 2-Drawer with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuDauGiuong",
      "Nightstand",
      "TabDauGiuong",
      "TopLine",
      "NoiThatKhachSan"
    ],
    "seoKeywords": "#TuDauGiuong #Nightstand #TabDauGiuong #TopLine #NoiThatKhachSan"
  },
  {
    "id": "tl-ww-04",
    "sku": "TL-WW-04",
    "name": {
      "vi": "Bàn Console Chân Nan Bo Cong Mặt Đá",
      "en": "Console Table Fluted Legs with Stone Top"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "1400 x 400 x 780 mm",
    "dimensionsCm": "140 x 40 x 78 cm",
    "materials": {
      "vi": "Gỗ tự nhiên xẻ rãnh lam nan sọc, Mặt đá Dark Emperador",
      "en": "Natural Dark Emperador Marble, select dark oak veneer, solid hardwood substrate"
    },
    "finish": {
      "vi": "Dark Veneer mộc cao cấp",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu gỗ trầm + Đá Emperador",
      "en": "Nâu gỗ trầm + Đá Emperador"
    },
    "hardware": {
      "vi": "Khung thép gia cường bên trong",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Architectural Luxury",
      "en": "Architectural Luxury"
    },
    "features": {
      "vi": "Tạo hình chữ U ngược với 2 chân trụ hình bán nguyệt ốp nan gỗ thủ công tinh tế. Mặt đá nguyên phiến sang trọng, thích hợp đặt tại tiền sảnh, hành lang hoặc sau lưng ghế sofa lớn.",
      "en": "Console Table Fluted Legs with Stone Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-04_Console_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-04_Console_Table.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "Tạo hình chữ U ngược với 2 chân trụ hình bán nguyệt ốp nan gỗ thủ công tinh tế. Mặt đá nguyên phiến sang trọng, thích hợp đặt tại tiền sảnh, hành lang hoặc sau lưng ghế sofa lớn.",
      "en": "Console Table Fluted Legs with Stone Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanConsole",
      "BanTrangTri",
      "BanSanh",
      "NanGoFluted",
      "MarbleConsole"
    ],
    "seoKeywords": "#BanConsole #BanTrangTri #BanSanh #NanGoFluted #MarbleConsole"
  },
  {
    "id": "tl-ww-05",
    "sku": "TL-WW-05",
    "name": {
      "vi": "Bàn Trà Vuông Chân Lam Gỗ Bo Góc Mặt Đá",
      "en": "Square Coffee Table with Fluted Legs"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "1200 x 1200 x 420 mm",
    "dimensionsCm": "120 x 120 x 42 cm",
    "materials": {
      "vi": "Khung chân gỗ bọc lam sọc thủ công, Mặt đá tự nhiên Emperador",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Dark Veneer phủ mờ",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu ấm + Đá Emperador",
      "en": "Nâu ấm + Đá Emperador"
    },
    "hardware": {
      "vi": "Kết cấu mộng gỗ chịu lực",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Contemporary Craft",
      "en": "Contemporary Craft"
    },
    "features": {
      "vi": "Thiết kế vuông vức 1m2 bề thế cho không gian phòng khách rộng, bốn chân trụ nan gỗ độc đáo, độ cao 42cm chuẩn tỷ lệ công thái học khi dùng cùng sofa nỉ hoặc da cao cấp.",
      "en": "Square Coffee Table with Fluted Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-05_Coffee_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-05_Coffee_Table.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "Thiết kế vuông vức 1m2 bề thế cho không gian phòng khách rộng, bốn chân trụ nan gỗ độc đáo, độ cao 42cm chuẩn tỷ lệ công thái học khi dùng cùng sofa nỉ hoặc da cao cấp.",
      "en": "Square Coffee Table with Fluted Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTra",
      "BanSofa",
      "BanTraVuong",
      "NoiThatPhongKhach",
      "CoffeeTable"
    ],
    "seoKeywords": "#BanTra #BanSofa #BanTraVuong #NoiThatPhongKhach #CoffeeTable"
  },
  {
    "id": "tl-ww-06",
    "sku": "TL-WW-06",
    "name": {
      "vi": "Bàn Ăn Chữ Nhật 8 Chỗ Chân Đôi Lam Gỗ Mặt Đá",
      "en": "Rectangular Dining Table with Fluted Double Pedestals"
    },
    "category": "warm-wood",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "collectionId": "warm-wood",
    "collectionName": {
      "vi": "Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen",
      "en": "Collection 01: Warm Wood & Dark Stone"
    },
    "dimensions": "2250 x 1050 x 760 mm",
    "dimensionsCm": "225 x 105 x 76 cm",
    "materials": {
      "vi": "Mặt đá cẩm thạch Dark Emperador, Chân đôi bọc lam gỗ tự nhiên",
      "en": "Natural Dark Emperador Marble, select dark oak veneer, solid hardwood substrate"
    },
    "finish": {
      "vi": "Dark Veneer mờ",
      "en": "Matte dark oak veneer with moisture barrier"
    },
    "color": {
      "vi": "Nâu gỗ ấm + Đá Emperador",
      "en": "Nâu gỗ ấm + Đá Emperador"
    },
    "hardware": {
      "vi": "Thanh giằng thép chịu tải nặng",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Transitional Luxury",
      "en": "Transitional Luxury"
    },
    "features": {
      "vi": "Bàn ăn tiệc tiêu chuẩn 8-10 chỗ ngồi. Chân trụ đôi đặt lùi vào trong giúp tối ưu khoảng để chân cho người ngồi. Mặt đá chống bám dính dầu mỡ, dễ lau chùi, chịu nhiệt tốt.",
      "en": "Rectangular Dining Table with Fluted Double Pedestals engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-WW-06_Dining_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-WW-06_Dining_Table.png",
    "collectionImage": "/images/profile/collection-01-warm-wood.png",
    "detailImage": "/images/capabilities/TL-WW-Details_Materials.png",
    "description": {
      "vi": "Bàn ăn tiệc tiêu chuẩn 8-10 chỗ ngồi. Chân trụ đôi đặt lùi vào trong giúp tối ưu khoảng để chân cho người ngồi. Mặt đá chống bám dính dầu mỡ, dễ lau chùi, chịu nhiệt tốt.",
      "en": "Rectangular Dining Table with Fluted Double Pedestals engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanAn",
      "BanAnMatDa",
      "BanAn8Ghe",
      "DiningTable",
      "TopLineDining"
    ],
    "seoKeywords": "#BanAn #BanAnMatDa #BanAn8Ghe #DiningTable #TopLineDining"
  },
  {
    "id": "tl-bc-01",
    "sku": "TL-BC-01",
    "name": {
      "vi": "Giường Ngủ Hiện Đại Black Contemporary King Size",
      "en": "Contemporary Platform Bed - Matte Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "2150 x 1950 x 1200 mm",
    "dimensionsCm": "215 x 195 x 120 cm",
    "materials": {
      "vi": "Gỗ tự nhiên tần bì kết hợp MDF chống ẩm cao cấp",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn đen mờ Matte Black giữ vân gỗ hở nhẹ",
      "en": "Matte black open-pore architectural finish"
    },
    "color": {
      "vi": "Đen tuyền (Jet Black)",
      "en": "Đen tuyền (Jet Black)"
    },
    "hardware": {
      "vi": "Phụ kiện giát giường thép trợ lực",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Modern Minimalist / Architectural",
      "en": "Modern Minimalist / Architectural"
    },
    "features": {
      "vi": "Kiểu giường bục Platform với thành giường giấu chân tạo cảm giác bay bổng, đầu giường phẳng bảng lớn vững chãi tạo điểm nhấn phong cách Monochrome thời thượng.",
      "en": "Contemporary Platform Bed - Matte Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-01_King_Bed.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-01_King_Bed.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Kiểu giường bục Platform với thành giường giấu chân tạo cảm giác bay bổng, đầu giường phẳng bảng lớn vững chãi tạo điểm nhấn phong cách Monochrome thời thượng.",
      "en": "Contemporary Platform Bed - Matte Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "GiuongNgu",
      "GiuongKing",
      "BlackContemporary",
      "MinimalistBed",
      "GiuongDen"
    ],
    "seoKeywords": "#GiuongNgu #GiuongKing #BlackContemporary #MinimalistBed #GiuongDen"
  },
  {
    "id": "tl-bc-02",
    "sku": "TL-BC-02",
    "name": {
      "vi": "Tủ Đầu Giường Hiện Đại Màu Đen 2 Ngăn + Hộc Mở",
      "en": "Contemporary Nightstand with Open Cubby - Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "600 x 450 x 600 mm",
    "dimensionsCm": "60 x 45 x 60 cm",
    "materials": {
      "vi": "Gỗ công nghiệp HDF chống ẩm & Gỗ tần bì",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn đen mờ hoàn thiện mịn",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Đen tuyền",
      "en": "Đen tuyền"
    },
    "hardware": {
      "vi": "Tay nắm vát âm (Integrated J-pull), Ray giảm chấn",
      "en": "Integrated bevelled edge pulls, soft-closing drawer glides"
    },
    "designStyle": {
      "vi": "Modern Contemporary",
      "en": "Modern Contemporary"
    },
    "features": {
      "vi": "Tầng trên là khoang hở tiện để sách báo, đồng hồ, điện thoại; 2 tầng dưới là ngăn kéo kín có ray trượt êm ái. Bề mặt sơn chống bám vân tay.",
      "en": "Contemporary Nightstand with Open Cubby - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-02_Nightstand.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-02_Nightstand.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Tầng trên là khoang hở tiện để sách báo, đồng hồ, điện thoại; 2 tầng dưới là ngăn kéo kín có ray trượt êm ái. Bề mặt sơn chống bám vân tay.",
      "en": "Contemporary Nightstand with Open Cubby - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TabDauGiuong",
      "NightstandDen",
      "NoiThatDen",
      "BlackFurniture",
      "TopLineNightstand"
    ],
    "seoKeywords": "#TabDauGiuong #NightstandDen #NoiThatDen #BlackFurniture #TopLineNightstand"
  },
  {
    "id": "tl-bc-03",
    "sku": "TL-BC-03",
    "name": {
      "vi": "Tủ Ngăn Kéo Đôi 6 Hộc Black Contemporary",
      "en": "Contemporary 6-Drawer Double Dresser - Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "1500 x 500 x 820 mm",
    "dimensionsCm": "150 x 50 x 82 cm",
    "materials": {
      "vi": "Gỗ MDF cao cấp cốt xanh chống ẩm phủ veneer tần bì sơn đen",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn PU đen mờ 5 lớp chống trầy",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Đen tuyền",
      "en": "Đen tuyền"
    },
    "hardware": {
      "vi": "Ray âm giảm chấn toàn phần",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Architectural Clean Lines",
      "en": "Architectural Clean Lines"
    },
    "features": {
      "vi": "Thiết kế tối giản không tay nắm lộ, đường rãnh âm chạy ngang mặt tủ tạo điểm nhấn kiến trúc thanh lịch. Sức chứa lớn, mặt trên rộng rãi làm bàn trang điểm hoặc đặt đồ decor.",
      "en": "Contemporary 6-Drawer Double Dresser - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-03_6Drawer_Dresser.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-03_6Drawer_Dresser.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Thiết kế tối giản không tay nắm lộ, đường rãnh âm chạy ngang mặt tủ tạo điểm nhấn kiến trúc thanh lịch. Sức chứa lớn, mặt trên rộng rãi làm bàn trang điểm hoặc đặt đồ decor.",
      "en": "Contemporary 6-Drawer Double Dresser - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuDresser",
      "TuQuanAo",
      "Tu6Ngan",
      "BlackDresser",
      "NoiThatPhongNgu"
    ],
    "seoKeywords": "#TuDresser #TuQuanAo #Tu6Ngan #BlackDresser #NoiThatPhongNgu"
  },
  {
    "id": "tl-bc-04",
    "sku": "TL-BC-04",
    "name": {
      "vi": "Tủ Ngăn Kéo Đứng 4 Tầng Black Contemporary Chest",
      "en": "Contemporary 4-Drawer Tall Chest - Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "850 x 480 x 1150 mm",
    "dimensionsCm": "85 x 48 x 115 cm",
    "materials": {
      "vi": "Gỗ HDF phủ veneer sơn đen mờ",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn đen satin sang trọng",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Đen tuyền",
      "en": "Đen tuyền"
    },
    "hardware": {
      "vi": "Ray trượt bi giảm chấn",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Minimalist Modern",
      "en": "Minimalist Modern"
    },
    "features": {
      "vi": "Kiểu tủ đứng dọc tiết kiệm tối đa diện tích sàn cho căn hộ hoặc phòng ngủ nhỏ. 4 ngăn kéo sâu lòng đựng chăn ga, quần áo gấp gọn gàng.",
      "en": "Contemporary 4-Drawer Tall Chest - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-04_4Drawer_Chest.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-04_4Drawer_Chest.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Kiểu tủ đứng dọc tiết kiệm tối đa diện tích sàn cho căn hộ hoặc phòng ngủ nhỏ. 4 ngăn kéo sâu lòng đựng chăn ga, quần áo gấp gọn gàng.",
      "en": "Contemporary 4-Drawer Tall Chest - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuDung",
      "TuNganKeoDung",
      "TallChest",
      "BlackChest",
      "TopLineFurniture"
    ],
    "seoKeywords": "#TuDung #TuNganKeoDung #TallChest #BlackChest #TopLineFurniture"
  },
  {
    "id": "tl-bc-05",
    "sku": "TL-BC-05",
    "name": {
      "vi": "Kệ Tivi Đa Năng Black Contemporary Media Console",
      "en": "Contemporary Media Console / TV Stand - Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "1800 x 450 x 550 mm",
    "dimensionsCm": "180 x 45 x 55 cm",
    "materials": {
      "vi": "Gỗ công nghiệp HDF & Gỗ tự nhiên sơn đen",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn đen mờ chống bám vân tay",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Đen tuyền",
      "en": "Đen tuyền"
    },
    "hardware": {
      "vi": "Bản lề giảm chấn, khoét lỗ luồn dây điện thông minh",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Contemporary Media",
      "en": "Contemporary Media"
    },
    "features": {
      "vi": "Khoang giữa mở chia 2 tầng thông thoáng giải nhiệt cho đầu thu, máy chơi game PS5, amply; 2 cánh tủ đóng hai bên cất đĩa và phụ kiện; tích hợp lỗ luồn dây điện thông minh.",
      "en": "Contemporary Media Console / TV Stand - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-05_Media_Console.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-05_Media_Console.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Khoang giữa mở chia 2 tầng thông thoáng giải nhiệt cho đầu thu, máy chơi game PS5, amply; 2 cánh tủ đóng hai bên cất đĩa và phụ kiện; tích hợp lỗ luồn dây điện thông minh.",
      "en": "Contemporary Media Console / TV Stand - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "KeTivi",
      "MediaConsole",
      "TVStand",
      "NoiThatPhongKhach",
      "KeTiviDen"
    ],
    "seoKeywords": "#KeTivi #MediaConsole #TVStand #NoiThatPhongKhach #KeTiviDen"
  },
  {
    "id": "tl-bc-06",
    "sku": "TL-BC-06",
    "name": {
      "vi": "Gương Treo Tường Khung Gỗ Vát Cạnh Black Contemporary",
      "en": "Contemporary Framed Wall Mirror - Black"
    },
    "category": "black-contemporary",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "collectionId": "black-contemporary",
    "collectionName": {
      "vi": "Bộ Sưu Tập 02: Đen Kiến Trúc",
      "en": "Collection 02: Black Contemporary"
    },
    "dimensions": "850 x 50 x 1100 mm",
    "dimensionsCm": "85 x 5 x 110 cm",
    "materials": {
      "vi": "Khung gỗ tự nhiên sơn đen, Phôi gương Bỉ AGC tráng bạc 8 lớp",
      "en": "Natural ash hardwood, moisture-resistant HDF core, architectural matte black finish"
    },
    "finish": {
      "vi": "Sơn đen mờ",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Đen tuyền",
      "en": "Đen tuyền"
    },
    "hardware": {
      "vi": "Móc treo âm chịu tải an toàn",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Architectural Minimalist",
      "en": "Architectural Minimalist"
    },
    "features": {
      "vi": "Khung viền bản dày dặn, hình khối góc cạnh mạnh mẽ, chống ẩm mốc và biến dạng. Treo ngang hoặc dọc linh hoạt cho bàn trang điểm, phòng thay đồ hoặc lối vào tiền sảnh.",
      "en": "Contemporary Framed Wall Mirror - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BC-06_Mirror.png",
    "cutoutImage": "/images/products/cutouts/TL-BC-06_Mirror.png",
    "collectionImage": "/images/profile/collection-02-black-contemporary.png",
    "detailImage": "/images/products/TL-BC-01_King_Bed.png",
    "description": {
      "vi": "Khung viền bản dày dặn, hình khối góc cạnh mạnh mẽ, chống ẩm mốc và biến dạng. Treo ngang hoặc dọc linh hoạt cho bàn trang điểm, phòng thay đồ hoặc lối vào tiền sảnh.",
      "en": "Contemporary Framed Wall Mirror - Black engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "GuongTreoTuong",
      "GuongBanPhan",
      "GuongKhungGo",
      "Mirror",
      "BlackMirror"
    ],
    "seoKeywords": "#GuongTreoTuong #GuongBanPhan #GuongKhungGo #Mirror #BlackMirror"
  },
  {
    "id": "tl-sw-01",
    "sku": "TL-SW-01",
    "name": {
      "vi": "Tủ Sideboard Uốn Cong Khắc Nan Sồi Mặt Đá Nghệ Thuật",
      "en": "Sculptural Fluted Oak Sideboard with Expressive Stone Top"
    },
    "category": "sculptural",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "collectionId": "sculptural",
    "collectionName": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "dimensions": "2200 x 500 x 780 mm",
    "dimensionsCm": "220 x 50 x 78 cm",
    "materials": {
      "vi": "Gỗ sồi tự nhiên (White Oak) uốn cong nan sọc, Mặt đá Calacatta / Breccia",
      "en": "Full-slab Calacatta / Breccia natural stone, sculpturally formed American White Oak"
    },
    "finish": {
      "vi": "Dầu dưỡng gỗ mộc tự nhiên (Natural Oil)",
      "en": "Hand-rubbed natural oil finish preserving timber tactile warmth"
    },
    "color": {
      "vi": "Vàng sồi mộc + Đá vân nâu hổ phách",
      "en": "Vàng sồi mộc + Đá vân nâu hổ phách"
    },
    "hardware": {
      "vi": "Bản lề giấu kín cao cấp",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Sculptural Organic / Wabi Sabi Luxury",
      "en": "Sculptural Organic / Wabi Sabi Luxury"
    },
    "features": {
      "vi": "Kiệt tác thủ công với thân tủ bo cong mềm mại bọc hàng trăm thanh nan sồi tuyển chọn, mặt đá tự nhiên nguyên phiến vân loang nghệ thuật độc bản. Không gian lưu trữ sang trọng cho biệt thự, penthouse.",
      "en": "Sculptural Fluted Oak Sideboard with Expressive Stone Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-SW-01_Sculptural_Sideboard.png",
    "cutoutImage": "/images/products/cutouts/TL-SW-01_Sculptural_Sideboard.png",
    "collectionImage": "/images/profile/collection-03-sculptural-stone.png",
    "detailImage": "/images/capabilities/TL-SW-Hero_Collection.png",
    "description": {
      "vi": "Kiệt tác thủ công với thân tủ bo cong mềm mại bọc hàng trăm thanh nan sồi tuyển chọn, mặt đá tự nhiên nguyên phiến vân loang nghệ thuật độc bản. Không gian lưu trữ sang trọng cho biệt thự, penthouse.",
      "en": "Sculptural Fluted Oak Sideboard with Expressive Stone Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuSideboard",
      "GoSoiFluted",
      "DaNgheThuat",
      "SculpturalFurniture",
      "TopLineLuxury"
    ],
    "seoKeywords": "#TuSideboard #GoSoiFluted #DaNgheThuat #SculpturalFurniture #TopLineLuxury"
  },
  {
    "id": "tl-sw-02",
    "sku": "TL-SW-02",
    "name": {
      "vi": "Bàn Ăn / Console Chân Sồi Uốn Điêu Khắc Mặt Đá Nguyên Phiến",
      "en": "Sculptural Oak & Stone Dining / Console Table"
    },
    "category": "sculptural",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "collectionId": "sculptural",
    "collectionName": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "dimensions": "2200 x 950 x 760 mm",
    "dimensionsCm": "220 x 95 x 76 cm",
    "materials": {
      "vi": "Mặt đá tự nhiên Breccia vân nghệ thuật, Chân gỗ sồi khối uốn cong",
      "en": "Full-slab Calacatta / Breccia natural stone, sculpturally formed American White Oak"
    },
    "finish": {
      "vi": "Hoàn thiện mộc Natural Oak",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Vàng sồi sáng + Vân đá Breccia đa sắc",
      "en": "Vàng sồi sáng + Vân đá Breccia đa sắc"
    },
    "hardware": {
      "vi": "Khung thép chịu lực ngầm",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Sculptural Statement",
      "en": "Sculptural Statement"
    },
    "features": {
      "vi": "Điểm nhấn tuyên ngôn (statement piece) cho phòng ăn hoặc sảnh đón. Chân gỗ sồi uốn lượn dày dặn nâng đỡ mặt đá cẩm thạch kiên cố, vừa mang vẻ đẹp điêu khắc vừa vững chắc tuyệt đối.",
      "en": "Sculptural Oak & Stone Dining / Console Table engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-SW-02_Dining_Console_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-SW-02_Dining_Console_Table.png",
    "collectionImage": "/images/profile/collection-03-sculptural-stone.png",
    "detailImage": "/images/capabilities/TL-SW-Hero_Collection.png",
    "description": {
      "vi": "Điểm nhấn tuyên ngôn (statement piece) cho phòng ăn hoặc sảnh đón. Chân gỗ sồi uốn lượn dày dặn nâng đỡ mặt đá cẩm thạch kiên cố, vừa mang vẻ đẹp điêu khắc vừa vững chắc tuyệt đối.",
      "en": "Sculptural Oak & Stone Dining / Console Table engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanAnDieuKhac",
      "BanAnGoSoi",
      "BanAnMatDaBreccia",
      "StatementTable",
      "TopLineArt"
    ],
    "seoKeywords": "#BanAnDieuKhac #BanAnGoSoi #BanAnMatDaBreccia #StatementTable #TopLineArt"
  },
  {
    "id": "tl-sw-03",
    "sku": "TL-SW-03",
    "name": {
      "vi": "Bàn Tab Góc Hữu Cơ Hình Giọt Nước Chân Sồi Uốn",
      "en": "Organic Pebble Side Table with Sculptural Oak Legs"
    },
    "category": "sculptural",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "collectionId": "sculptural",
    "collectionName": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "dimensions": "650 x 550 x 520 mm",
    "dimensionsCm": "65 x 55 x 52 cm",
    "materials": {
      "vi": "Mặt đá cẩm thạch vân tự nhiên cắt hình sỏi/hạt đậu, Chân gỗ sồi 3 trụ cong",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Dầu lau thực vật an toàn",
      "en": "Hand-rubbed natural oil finish preserving timber tactile warmth"
    },
    "color": {
      "vi": "Vàng sồi tự nhiên + Đá vân loang",
      "en": "Vàng sồi tự nhiên + Đá vân loang"
    },
    "hardware": {
      "vi": "Khớp nối mộng cơ học chính xác",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Organic Modern",
      "en": "Organic Modern"
    },
    "features": {
      "vi": "Thiết kế bất đối xứng lấy cảm hứng từ thiên nhiên tĩnh lặng (Wabi Sabi Modern), dễ dàng di chuyển và phối hợp cùng sofa đơn, ghế thư giãn tạo góc chill nghệ thuật.",
      "en": "Organic Pebble Side Table with Sculptural Oak Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-SW-03_Organic_Side_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-SW-03_Organic_Side_Table.png",
    "collectionImage": "/images/profile/collection-03-sculptural-stone.png",
    "detailImage": "/images/capabilities/TL-SW-Hero_Collection.png",
    "description": {
      "vi": "Thiết kế bất đối xứng lấy cảm hứng từ thiên nhiên tĩnh lặng (Wabi Sabi Modern), dễ dàng di chuyển và phối hợp cùng sofa đơn, ghế thư giãn tạo góc chill nghệ thuật.",
      "en": "Organic Pebble Side Table with Sculptural Oak Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTab",
      "BanGoc",
      "BanTraPebble",
      "OrganicFurniture",
      "SideTable"
    ],
    "seoKeywords": "#BanTab #BanGoc #BanTraPebble #OrganicFurniture #SideTable"
  },
  {
    "id": "tl-sw-04",
    "sku": "TL-SW-04",
    "name": {
      "vi": "Bàn Trà Hữu Cơ Freeform Chân Sồi Liền Khối Mặt Đá",
      "en": "Freeform Organic Coffee Table with Curved Oak Base"
    },
    "category": "sculptural",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "collectionId": "sculptural",
    "collectionName": {
      "vi": "Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ",
      "en": "Collection 03: Sculptural Stone + Wood"
    },
    "dimensions": "1500 x 850 x 380 mm",
    "dimensionsCm": "150 x 85 x 38 cm",
    "materials": {
      "vi": "Mặt đá cẩm thạch phiến lớn cắt lượn sóng tự do, Bệ chân gỗ sồi khối cong",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Bảo vệ mờ giữ nguyên vân đá & thớ gỗ",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Sồi tự nhiên + Đá Breccia loang màu",
      "en": "Sồi tự nhiên + Đá Breccia loang màu"
    },
    "hardware": {
      "vi": "Gia cố sợi thủy tinh mặt đá",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Organic Statement / High-End Craft",
      "en": "Organic Statement / High-End Craft"
    },
    "features": {
      "vi": "Mặt bàn trà hình hạt đậu không góc nhọn tạo luồng di chuyển thoải mái và an toàn cho gia đình có trẻ nhỏ. Bệ chân gỗ sồi mộc mạc cân bằng hoàn hảo nét kiêu sa của đá cẩm thạch.",
      "en": "Freeform Organic Coffee Table with Curved Oak Base engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-SW-04_Freeform_Coffee_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-SW-04_Freeform_Coffee_Table.png",
    "collectionImage": "/images/profile/collection-03-sculptural-stone.png",
    "detailImage": "/images/capabilities/TL-SW-Hero_Collection.png",
    "description": {
      "vi": "Mặt bàn trà hình hạt đậu không góc nhọn tạo luồng di chuyển thoải mái và an toàn cho gia đình có trẻ nhỏ. Bệ chân gỗ sồi mộc mạc cân bằng hoàn hảo nét kiêu sa của đá cẩm thạch.",
      "en": "Freeform Organic Coffee Table with Curved Oak Base engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTraHuuCo",
      "FreeformCoffeeTable",
      "BanSofaNgheThuat",
      "TopLineSculptural"
    ],
    "seoKeywords": "#BanTraHuuCo #FreeformCoffeeTable #BanSofaNgheThuat #TopLineSculptural"
  },
  {
    "id": "tl-da-01",
    "sku": "TL-DA-01",
    "name": {
      "vi": "Bàn Ăn Chữ Nhật 8 Chỗ Chân Ghép Đá & Gỗ Sang Trọng",
      "en": "Dining Table with Stone Top and Inset Column Legs"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "2400 x 1000 x 760 mm",
    "dimensionsCm": "240 x 100 x 76 cm",
    "materials": {
      "vi": "Khung gỗ sồi tự nhiên, Mặt đá marble màu be kem, Chân trụ ốp đá & gỗ",
      "en": "Warm honey oak, cream beige natural marble top, hand-woven slatted joinery"
    },
    "finish": {
      "vi": "Sơn bóng mờ chống trầy xước",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu hạt dẻ ấm + Đá marble be kem",
      "en": "Nâu hạt dẻ ấm + Đá marble be kem"
    },
    "hardware": {
      "vi": "Khung thép chống võng khẩu độ lớn",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Timeless Contemporary",
      "en": "Timeless Contemporary"
    },
    "features": {
      "vi": "Chiều dài 2m4 rộng rãi cho bữa tiệc gia đình 8-10 thành viên. Chân bàn kết hợp độc đáo giữa gỗ và đá tạo điểm nhấn đồng bộ từ trên xuống dưới.",
      "en": "Dining Table with Stone Top and Inset Column Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-01_Dining_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-01_Dining_Table.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Chiều dài 2m4 rộng rãi cho bữa tiệc gia đình 8-10 thành viên. Chân bàn kết hợp độc đáo giữa gỗ và đá tạo điểm nhấn đồng bộ từ trên xuống dưới.",
      "en": "Dining Table with Stone Top and Inset Column Legs engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanAn2m4",
      "BanAnCaoCap",
      "DiningTable",
      "TopLineDining",
      "NoiThatBep"
    ],
    "seoKeywords": "#BanAn2m4 #BanAnCaoCap #DiningTable #TopLineDining #NoiThatBep"
  },
  {
    "id": "tl-da-02",
    "sku": "TL-DA-02",
    "name": {
      "vi": "Tủ Búp-Phê Cao 4 Cánh Nan Phẳng Mặt Đá",
      "en": "High Sideboard / Credenza 4-Door with Marble Top"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "2200 x 500 x 850 mm",
    "dimensionsCm": "220 x 50 x 85 cm",
    "materials": {
      "vi": "Thân gỗ tự nhiên vân sọc đứng, Mặt đá cẩm thạch be kem nguyên tấm",
      "en": "Warm honey oak, cream beige natural marble top, hand-woven slatted joinery"
    },
    "finish": {
      "vi": "Veneer sồi nâu vàng phủ bóng mờ",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu ấm + Đá marble be",
      "en": "Nâu ấm + Đá marble be"
    },
    "hardware": {
      "vi": "Bản lề nhấn mở Tip-on Blum",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Refined Modern",
      "en": "Refined Modern"
    },
    "features": {
      "vi": "Chiều cao 85cm chuẩn tủ tiệc buffet, 4 cánh mở giấu tay nắm tinh tế, chia nhiều tầng đợt chứa ly tách, chén đĩa và bộ sưu tập rượu quý.",
      "en": "High Sideboard / Credenza 4-Door with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-02_Sideboard_Credenza.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-02_Sideboard_Credenza.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Chiều cao 85cm chuẩn tủ tiệc buffet, 4 cánh mở giấu tay nắm tinh tế, chia nhiều tầng đợt chứa ly tách, chén đĩa và bộ sưu tập rượu quý.",
      "en": "High Sideboard / Credenza 4-Door with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuBuffet",
      "TuCredenza",
      "TuPhongAn",
      "SideboardCaoCap",
      "TopLineAccent"
    ],
    "seoKeywords": "#TuBuffet #TuCredenza #TuPhongAn #SideboardCaoCap #TopLineAccent"
  },
  {
    "id": "tl-da-03",
    "sku": "TL-DA-03",
    "name": {
      "vi": "Bàn Trà Chữ Nhật Hai Tầng Mặt Đá Đế Bục Gỗ",
      "en": "Tiered Platform Coffee Table with Marble Top"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "1400 x 800 x 360 mm",
    "dimensionsCm": "140 x 80 x 36 cm",
    "materials": {
      "vi": "Mặt đá cẩm thạch dày, Đế gỗ khối giật cấp 2 tầng",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Gỗ nâu trầm hoàn thiện satin",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Nâu gỗ + Đá be sáng",
      "en": "Nâu gỗ + Đá be sáng"
    },
    "hardware": {
      "vi": "Kết cấu hộp gia cường",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Modern Architectural",
      "en": "Modern Architectural"
    },
    "features": {
      "vi": "Kết cấu 2 tầng hình khối kiến trúc hiện đại, tầng dưới là bục gỗ rộng rãi để sách ảnh, điều khiển tivi; tầng trên là mặt đá vươn bay sang trọng.",
      "en": "Tiered Platform Coffee Table with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-03_Coffee_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-03_Coffee_Table.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Kết cấu 2 tầng hình khối kiến trúc hiện đại, tầng dưới là bục gỗ rộng rãi để sách ảnh, điều khiển tivi; tầng trên là mặt đá vươn bay sang trọng.",
      "en": "Tiered Platform Coffee Table with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTra2Tang",
      "BanTraMatDa",
      "PlatformCoffeeTable",
      "TopLineLiving"
    ],
    "seoKeywords": "#BanTra2Tang #BanTraMatDa #PlatformCoffeeTable #TopLineLiving"
  },
  {
    "id": "tl-da-04",
    "sku": "TL-DA-04",
    "name": {
      "vi": "Bàn Trà Oval Hữu Cơ Chân Lam Gỗ Dệt Mặt Đá Viền Mộc",
      "en": "Organic Oval Coffee Table with Texturized Base"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "1600 x 800 x 360 mm",
    "dimensionsCm": "160 x 80 x 36 cm",
    "materials": {
      "vi": "Mặt đá tự nhiên mài cạnh mộc sần, Thân trụ bọc lam gỗ dệt ziczac",
      "en": "Warm honey oak, cream beige natural marble top, hand-woven slatted joinery"
    },
    "finish": {
      "vi": "Hoàn thiện tự nhiên thô mộc cao cấp",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Nâu mộc + Đá tự nhiên",
      "en": "Nâu mộc + Đá tự nhiên"
    },
    "hardware": {
      "vi": "Cốt gỗ chịu ẩm uốn nhiệt",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Textural Organic Modern",
      "en": "Textural Organic Modern"
    },
    "features": {
      "vi": "Trải nghiệm xúc giác phong phú với viền đá gồ ghề tự nhiên kết hợp thân trụ bọc nan gỗ đan lát mộc mạc, tạo phong cách sống nghỉ dưỡng an yên (Resort Living).",
      "en": "Organic Oval Coffee Table with Texturized Base engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-04_Organic_Coffee_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-04_Organic_Coffee_Table.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Trải nghiệm xúc giác phong phú với viền đá gồ ghề tự nhiên kết hợp thân trụ bọc nan gỗ đan lát mộc mạc, tạo phong cách sống nghỉ dưỡng an yên (Resort Living).",
      "en": "Organic Oval Coffee Table with Texturized Base engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTraOval",
      "BanTraThoMoc",
      "OrganicLiving",
      "TopLineCoffeeTable"
    ],
    "seoKeywords": "#BanTraOval #BanTraThoMoc #OrganicLiving #TopLineCoffeeTable"
  },
  {
    "id": "tl-da-05",
    "sku": "TL-DA-05",
    "name": {
      "vi": "Tủ Kệ Thấp 4 Cánh Dáng Dài Mặt Đá Marble",
      "en": "Low Cabinet / Sideboard with Marble Top"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "2400 x 500 x 700 mm",
    "dimensionsCm": "240 x 50 x 70 cm",
    "materials": {
      "vi": "Gỗ tự nhiên xẻ rãnh nan dọc, Mặt đá cẩm thạch be kem",
      "en": "Warm honey oak, cream beige natural marble top, hand-woven slatted joinery"
    },
    "finish": {
      "vi": "Veneer gỗ nâu ấm phủ mờ",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Nâu ấm + Đá marble be",
      "en": "Nâu ấm + Đá marble be"
    },
    "hardware": {
      "vi": "Ray và bản lề giảm chấn cao cấp",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Low-Profile Luxury",
      "en": "Low-Profile Luxury"
    },
    "features": {
      "vi": "Chiều dài vượt trội 2m4 nhưng chiều cao hạ thấp 70cm giữ không gian thoáng đãng, công năng đa dạng vừa làm kệ tivi màn hình lớn vừa làm tủ console trưng bày tranh ảnh.",
      "en": "Low Cabinet / Sideboard with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-05_Low_Cabinet_Sideboard.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-05_Low_Cabinet_Sideboard.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Chiều dài vượt trội 2m4 nhưng chiều cao hạ thấp 70cm giữ không gian thoáng đãng, công năng đa dạng vừa làm kệ tivi màn hình lớn vừa làm tủ console trưng bày tranh ảnh.",
      "en": "Low Cabinet / Sideboard with Marble Top engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "KeTiviDai",
      "LowCabinet",
      "TuThapMatDa",
      "NoiThatSangTrong"
    ],
    "seoKeywords": "#KeTiviDai #LowCabinet #TuThapMatDa #NoiThatSangTrong"
  },
  {
    "id": "tl-da-06",
    "sku": "TL-DA-06",
    "name": {
      "vi": "Bàn Tab Góc Khối Hộp Giật Cấp Bậc Thang",
      "en": "Geometric Stepped Architectural Side Table"
    },
    "category": "other",
    "categoryLabel": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "collectionId": "other",
    "collectionName": {
      "vi": "Dining & Accent Collection",
      "en": "Dining & Accent Collection"
    },
    "dimensions": "500 x 500 x 500 mm",
    "dimensionsCm": "50 x 50 x 50 cm",
    "materials": {
      "vi": "Gỗ tự nhiên nguyên khối ghép tầng xếp lớp",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Sơn phủ bóng mờ chống bám bụi",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu vân gỗ sồi",
      "en": "Nâu vân gỗ sồi"
    },
    "hardware": {
      "vi": "Ghép mộng finger-joint âm dương",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Geometric Contemporary",
      "en": "Geometric Contemporary"
    },
    "features": {
      "vi": "Khối lập phương giật cấp 3 tầng mang tính điêu khắc hình học, vừa là bàn tab đặt góc sofa, vừa có thể làm đôn kê tượng hoặc đèn bàn nghệ thuật.",
      "en": "Geometric Stepped Architectural Side Table engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-DA-06_Geometric_Side_Table.png",
    "cutoutImage": "/images/products/cutouts/TL-DA-06_Geometric_Side_Table.png",
    "collectionImage": "",
    "detailImage": "",
    "description": {
      "vi": "Khối lập phương giật cấp 3 tầng mang tính điêu khắc hình học, vừa là bàn tab đặt góc sofa, vừa có thể làm đôn kê tượng hoặc đèn bàn nghệ thuật.",
      "en": "Geometric Stepped Architectural Side Table engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BanTabHop",
      "BanTabBacThang",
      "GeometricTable",
      "SteppedSideTable"
    ],
    "seoKeywords": "#BanTabHop #BanTabBacThang #GeometricTable #SteppedSideTable"
  },
  {
    "id": "tl-st-01",
    "sku": "TL-ST-01",
    "name": {
      "vi": "Giường Ngủ King Gỗ Sồi Marlow Bọc Nệm Đầu Giường",
      "en": "Stanley Marlow King Bed with Upholstered Headboard"
    },
    "category": "marlow-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "collectionId": "marlow-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "dimensions": "2180 x 2050 x 1350 mm",
    "dimensionsCm": "218 x 205 x 135 cm",
    "materials": {
      "vi": "Gỗ sồi trắng Mỹ (American White Oak), Vải bọc dệt nỉ cao cấp",
      "en": "Wire-brushed American White Oak, imported performance fabric upholstery"
    },
    "finish": {
      "vi": "Xử lý chải cước vân mộc (Wire-brushed Oak)",
      "en": "Wire-brushed low-sheen clear polyurethane protective coat"
    },
    "color": {
      "vi": "Nâu sồi mộc (Marlow Oak) + Xám be",
      "en": "Nâu sồi mộc (Marlow Oak) + Xám be"
    },
    "hardware": {
      "vi": "Hệ thống thang giát sắt bọc gỗ chịu lực",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "American Transitional / Rustic Modern",
      "en": "American Transitional / Rustic Modern"
    },
    "features": {
      "vi": "Thiết kế bản quyền Stanley Furniture phong cách Mỹ, đầu giường tựa êm ái chống mỏi cổ, khung gỗ sồi chải vân mờ lộ rõ từng thớ gỗ tự nhiên mộc mạc và sang trọng.",
      "en": "Stanley Marlow King Bed with Upholstered Headboard engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-ST-01_Marlow_King_Bed.png",
    "cutoutImage": "/images/products/cutouts/TL-ST-01_Marlow_King_Bed.png",
    "collectionImage": "/images/capabilities/TL-ST-Details_Materials.png",
    "detailImage": "/images/profile/stanley-marlow-01.jpg",
    "description": {
      "vi": "Thiết kế bản quyền Stanley Furniture phong cách Mỹ, đầu giường tựa êm ái chống mỏi cổ, khung gỗ sồi chải vân mờ lộ rõ từng thớ gỗ tự nhiên mộc mạc và sang trọng.",
      "en": "Stanley Marlow King Bed with Upholstered Headboard engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "GiuongNguStanley",
      "GiuongGoSoi",
      "GiuongBocDem",
      "StanleyFurniture",
      "MarlowOak"
    ],
    "seoKeywords": "#GiuongNguStanley #GiuongGoSoi #GiuongBocDem #StanleyFurniture #MarlowOak"
  },
  {
    "id": "tl-st-02",
    "sku": "TL-ST-02",
    "name": {
      "vi": "Tủ Ngăn Kéo 6 Hộc Gỗ Sồi Marlow Oak Dresser",
      "en": "Stanley Marlow 6-Drawer Double Dresser"
    },
    "category": "marlow-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "collectionId": "marlow-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "dimensions": "1600 x 500 x 860 mm",
    "dimensionsCm": "160 x 50 x 86 cm",
    "materials": {
      "vi": "Gỗ sồi trắng tự nhiên tuyển chọn, Hộc tủ gỗ thông thơm",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Chải vân sồi cước mộc wire-brushed",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Nâu sồi Marlow Oak",
      "en": "Nâu sồi Marlow Oak"
    },
    "hardware": {
      "vi": "Tay nắm thanh ngang kim loại súng mờ (Gunmetal)",
      "en": "Gunmetal bronze hardware, whisper-quiet Blum/Hettich slides"
    },
    "designStyle": {
      "vi": "Transitional American",
      "en": "Transitional American"
    },
    "features": {
      "vi": "Kỹ thuật ghép mộng mộc truyền thống đảm bảo hộc kéo không bao giờ xộc xệch, ray trượt âm trơn tru, chân đế khối vuông vức đầm chắc.",
      "en": "Stanley Marlow 6-Drawer Double Dresser engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-ST-02_Marlow_6Drawer_Dresser.png",
    "cutoutImage": "/images/products/cutouts/TL-ST-02_Marlow_6Drawer_Dresser.png",
    "collectionImage": "/images/capabilities/TL-ST-Details_Materials.png",
    "detailImage": "/images/profile/stanley-marlow-01.jpg",
    "description": {
      "vi": "Kỹ thuật ghép mộng mộc truyền thống đảm bảo hộc kéo không bao giờ xộc xệch, ray trượt âm trơn tru, chân đế khối vuông vức đầm chắc.",
      "en": "Stanley Marlow 6-Drawer Double Dresser engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuDresserGoSoi",
      "TuNganKeoMarlow",
      "StanleyDresser",
      "NoiThatMy"
    ],
    "seoKeywords": "#TuDresserGoSoi #TuNganKeoMarlow #StanleyDresser #NoiThatMy"
  },
  {
    "id": "tl-st-03",
    "sku": "TL-ST-03",
    "name": {
      "vi": "Tủ Đầu Giường 2 Ngăn Kéo Gỗ Sồi Marlow Oak Nightstand",
      "en": "Stanley Marlow 2-Drawer Nightstand"
    },
    "category": "marlow-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "collectionId": "marlow-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 05: Stanley Marlow Oak",
      "en": "Collection 05: Stanley Marlow Oak"
    },
    "dimensions": "650 x 460 x 620 mm",
    "dimensionsCm": "65 x 46 x 62 cm",
    "materials": {
      "vi": "Gỗ sồi trắng tự nhiên kết hợp veneer sồi dày",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Chải vân sồi mộc wire-brushed",
      "en": "Export-grade protective multi-coat PU finish, moisture-sealed"
    },
    "color": {
      "vi": "Nâu sồi Marlow Oak",
      "en": "Nâu sồi Marlow Oak"
    },
    "hardware": {
      "vi": "Tay nắm kim loại gunmetal, Ray trượt êm",
      "en": "Gunmetal bronze hardware, whisper-quiet Blum/Hettich slides"
    },
    "designStyle": {
      "vi": "Transitional American",
      "en": "Transitional American"
    },
    "features": {
      "vi": "Đồng bộ hoàn hảo với giường ngủ Marlow King, kích thước vừa vặn đầu giường, hoàn thiện chải cước mộc chống bám dính vân tay.",
      "en": "Stanley Marlow 2-Drawer Nightstand engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-ST-03_Marlow_Nightstand.png",
    "cutoutImage": "/images/products/cutouts/TL-ST-03_Marlow_Nightstand.png",
    "collectionImage": "/images/capabilities/TL-ST-Details_Materials.png",
    "detailImage": "/images/profile/stanley-marlow-01.jpg",
    "description": {
      "vi": "Đồng bộ hoàn hảo với giường ngủ Marlow King, kích thước vừa vặn đầu giường, hoàn thiện chải cước mộc chống bám dính vân tay.",
      "en": "Stanley Marlow 2-Drawer Nightstand engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TabDauGiuongGoSoi",
      "NightstandMarlow",
      "StanleyNightstand",
      "NoiThatXuatKhau"
    ],
    "seoKeywords": "#TabDauGiuongGoSoi #NightstandMarlow #StanleyNightstand #NoiThatXuatKhau"
  },
  {
    "id": "tl-bd-01",
    "sku": "TL-BD-01",
    "name": {
      "vi": "Giường Ngủ King Tân Cổ Điển Vòm Cong Gỗ Nu Trầm",
      "en": "Stanley Burl Oak Dark King Panel Bed"
    },
    "category": "burl-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "collectionId": "burl-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "dimensions": "2220 x 2100 x 1480 mm",
    "dimensionsCm": "222 x 210 x 148 cm",
    "materials": {
      "vi": "Gỗ tự nhiên cao cấp ốp Veneer gỗ nu sồi quý hiếm (Burl Oak Veneer)",
      "en": "Rare Burl Oak root veneer, solid timber core, traditional crown mouldings"
    },
    "finish": {
      "vi": "Hoàn thiện sơn bóng mờ cổ điển phô diễn vân xoáy nu",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu đen gỗ nu trầm (Dark Burl)",
      "en": "Nâu đen gỗ nu trầm (Dark Burl)"
    },
    "hardware": {
      "vi": "Mộng ghép thủ công truyền thống",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Classic Luxury / Traditional Elegance",
      "en": "Classic Luxury / Traditional Elegance"
    },
    "features": {
      "vi": "Đầu giường tạo hình vòm cong vương miện quyền uy, toàn bộ bề mặt được phủ lớp veneer nu sồi tự nhiên với những xoáy vân kỳ ảo như những đám mây ngũ sắc. Khẳng định đẳng cấp quý tộc của phòng ngủ Master.",
      "en": "Stanley Burl Oak Dark King Panel Bed engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BD-01_King_Panel_Bed.png",
    "cutoutImage": "/images/products/cutouts/TL-BD-01_King_Panel_Bed.png",
    "collectionImage": "/images/profile/stanley-burl-oak.jpg",
    "detailImage": "/images/products/TL-BD-01_King_Panel_Bed.png",
    "description": {
      "vi": "Đầu giường tạo hình vòm cong vương miện quyền uy, toàn bộ bề mặt được phủ lớp veneer nu sồi tự nhiên với những xoáy vân kỳ ảo như những đám mây ngũ sắc. Khẳng định đẳng cấp quý tộc của phòng ngủ Master.",
      "en": "Stanley Burl Oak Dark King Panel Bed engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "GiuongTanCoDien",
      "GiuongGoNu",
      "BurlOak",
      "StanleyBurl",
      "GiuongQuyToc"
    ],
    "seoKeywords": "#GiuongTanCoDien #GiuongGoNu #BurlOak #StanleyBurl #GiuongQuyToc"
  },
  {
    "id": "tl-bd-02",
    "sku": "TL-BD-02",
    "name": {
      "vi": "Giường Ngủ King Bọc Nệm Khung Vòm Gỗ Nu Trầm",
      "en": "Stanley Burl Oak Dark Upholstered Bed"
    },
    "category": "burl-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "collectionId": "burl-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "dimensions": "2220 x 2100 x 1480 mm",
    "dimensionsCm": "222 x 210 x 148 cm",
    "materials": {
      "vi": "Khung vòm gỗ nu sồi trầm, Lòng đầu giường bọc nệm vải gấm/nỉ kem sáng",
      "en": "Wire-brushed American White Oak, imported performance fabric upholstery"
    },
    "finish": {
      "vi": "Sơn bóng mờ phô vân nu + Vải dệt hoa văn tinh xảo",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu nu trầm + Vải kem sáng tương phản",
      "en": "Nâu nu trầm + Vải kem sáng tương phản"
    },
    "hardware": {
      "vi": "Khung thép giằng lực",
      "en": "Heavy-duty contract joinery & concealed soft-close fittings"
    },
    "designStyle": {
      "vi": "Classic Luxury",
      "en": "Classic Luxury"
    },
    "features": {
      "vi": "Sự kết hợp hoàn mỹ giữa sắc gỗ nu trầm ấm cổ kính và chất liệu vải bọc êm ái thanh nhã, tạo sự tương phản nhẹ nhàng và giấc ngủ êm sâu cho gia chủ.",
      "en": "Stanley Burl Oak Dark Upholstered Bed engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BD-02_King_Upholstered_Bed.png",
    "cutoutImage": "/images/products/cutouts/TL-BD-02_King_Upholstered_Bed.png",
    "collectionImage": "/images/profile/stanley-burl-oak.jpg",
    "detailImage": "/images/products/TL-BD-01_King_Panel_Bed.png",
    "description": {
      "vi": "Sự kết hợp hoàn mỹ giữa sắc gỗ nu trầm ấm cổ kính và chất liệu vải bọc êm ái thanh nhã, tạo sự tương phản nhẹ nhàng và giấc ngủ êm sâu cho gia chủ.",
      "en": "Stanley Burl Oak Dark Upholstered Bed engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "GiuongBocDemTanCoDien",
      "GiuongBurlOak",
      "NoiThatPhongNguMaster"
    ],
    "seoKeywords": "#GiuongBocDemTanCoDien #GiuongBurlOak #NoiThatPhongNguMaster"
  },
  {
    "id": "tl-bd-03",
    "sku": "TL-BD-03",
    "name": {
      "vi": "Tủ Ngăn Kéo Lớn 9 Hộc Chân Quỳ Gỗ Nu Trầm",
      "en": "Stanley Burl Oak Dark 9-Drawer Triple Dresser"
    },
    "category": "burl-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "collectionId": "burl-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "dimensions": "1750 x 520 x 950 mm",
    "dimensionsCm": "175 x 52 x 95 cm",
    "materials": {
      "vi": "Gỗ tự nhiên kết hợp veneer gỗ nu tuyển chọn toàn phần",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Sơn bóng mờ phô diễn vân mây xoáy nu",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu đen gỗ nu trầm",
      "en": "Nâu đen gỗ nu trầm"
    },
    "hardware": {
      "vi": "Núm tay nắm tròn kim loại đồng cổ (Antique Brass)",
      "en": "Antique brass metal pulls, soft-closing undermount slides"
    },
    "designStyle": {
      "vi": "Traditional Luxury",
      "en": "Traditional Luxury"
    },
    "features": {
      "vi": "Kiểu dáng Triple Dresser với 9 hộc kéo phân bổ 3 hàng x 3 cột, chân quỳ uốn cong mềm mại quý tộc, tay nắm núm đồng tròn sang trọng.",
      "en": "Stanley Burl Oak Dark 9-Drawer Triple Dresser engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BD-03_9Drawer_Triple_Dresser.png",
    "cutoutImage": "/images/products/cutouts/TL-BD-03_9Drawer_Triple_Dresser.png",
    "collectionImage": "/images/profile/stanley-burl-oak.jpg",
    "detailImage": "/images/products/TL-BD-01_King_Panel_Bed.png",
    "description": {
      "vi": "Kiểu dáng Triple Dresser với 9 hộc kéo phân bổ 3 hàng x 3 cột, chân quỳ uốn cong mềm mại quý tộc, tay nắm núm đồng tròn sang trọng.",
      "en": "Stanley Burl Oak Dark 9-Drawer Triple Dresser engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "TuDresser9Ngan",
      "TuGoNu",
      "TripleDresser",
      "NoiThatTanCoDien"
    ],
    "seoKeywords": "#TuDresser9Ngan #TuGoNu #TripleDresser #NoiThatTanCoDien"
  },
  {
    "id": "tl-bd-04",
    "sku": "TL-BD-04",
    "name": {
      "vi": "Tủ Đầu Giường 3 Ngăn Kéo Bachelor Chest Gỗ Nu Trầm",
      "en": "Stanley Burl Oak Dark 3-Drawer Nightstand / Bachelor Chest"
    },
    "category": "burl-oak",
    "categoryLabel": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "collectionId": "burl-oak",
    "collectionName": {
      "vi": "Bộ Sưu Tập 06: Stanley Burl Oak Dark",
      "en": "Collection 06: Stanley Burl Oak Dark"
    },
    "dimensions": "800 x 480 x 820 mm",
    "dimensionsCm": "80 x 48 x 82 cm",
    "materials": {
      "vi": "Gỗ tự nhiên ốp veneer gỗ nu trầm, Mặt trước vát bo viền",
      "en": "Solid kiln-dried hardwood, natural stone surfaces, bespoke joinery"
    },
    "finish": {
      "vi": "Sơn bóng mờ cổ điển",
      "en": "Classic semi-gloss satin lacquer enhancing burl wood figure"
    },
    "color": {
      "vi": "Nâu đen gỗ nu trầm",
      "en": "Nâu đen gỗ nu trầm"
    },
    "hardware": {
      "vi": "Núm đồng cổ đôi mỗi ngăn kéo",
      "en": "Antique brass metal pulls, soft-closing undermount slides"
    },
    "designStyle": {
      "vi": "Traditional Luxury",
      "en": "Traditional Luxury"
    },
    "features": {
      "vi": "Dáng tủ gia tài Bachelor Chest bề thế 3 tầng ngăn kéo sâu, mặt gỗ nu hoa văn đối xứng tuyệt mỹ, hoàn thiện đồng bộ cùng giường King Burl Oak.",
      "en": "Stanley Burl Oak Dark 3-Drawer Nightstand / Bachelor Chest engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "image": "/images/products/TL-BD-04_3Drawer_Nightstand_Chest.png",
    "cutoutImage": "/images/products/cutouts/TL-BD-04_3Drawer_Nightstand_Chest.png",
    "collectionImage": "/images/profile/stanley-burl-oak.jpg",
    "detailImage": "/images/products/TL-BD-01_King_Panel_Bed.png",
    "description": {
      "vi": "Dáng tủ gia tài Bachelor Chest bề thế 3 tầng ngăn kéo sâu, mặt gỗ nu hoa văn đối xứng tuyệt mỹ, hoàn thiện đồng bộ cùng giường King Burl Oak.",
      "en": "Stanley Burl Oak Dark 3-Drawer Nightstand / Bachelor Chest engineered for international luxury hospitality environments. Built to exacting BOM tolerances with hand-selected materials, moisture-controlled joinery, and durable contract finishing."
    },
    "tags": [
      "BachelorChest",
      "TabDauGiuong3Ngan",
      "NoiThatStanley",
      "BurlOakNightstand"
    ],
    "seoKeywords": "#BachelorChest #TabDauGiuong3Ngan #NoiThatStanley #BurlOakNightstand"
  }
];
