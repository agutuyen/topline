import { CollectionGroup, ProductItem, WorkflowStep } from '../types';

export const COMPANY_INFO = {
  vi: {
    officialName: 'CÔNG TY TNHH NỘI THẤT TOP LINE HOSPITALITY',
    internationalName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    shortName: 'TOP LINE HOSPITALITY FURNITURE CO., LTD',
    brandName: 'TopLine Furniture',
    taxId: '3703519683',
    registrationDate: '09/10/2026',
    charterCapital: '1.000.000.000 VNĐ (Một tỷ đồng)',
    legalRepresentative: 'Trần Văn Đương – Giám đốc',
    shareholders: [
      { name: 'Trần Văn Đương', share: '550.000.000 VNĐ (55%)' },
      { name: 'Trần Thanh Nhàn', share: '450.000.000 VNĐ (45%)' },
    ],
    address: 'Số 26, Đường DX-027, Khu phố Phú Mỹ 2, Phường Bình Dương, Thành phố Hồ Chí Minh, Việt Nam',
    factoryFacility: 'Xưởng Sản Xuất Nội Thất Xuất Khẩu TopLine – Việt Nam',
    hotline: '0977 429 979',
    phoneDisplay: '0977.429.979',
    email: 'duongtran.wooden80@gmail.com',
    tagline: 'NỘI THẤT MAY ĐO, CHUẨN MỰC CHO MỌI QUY MÔ',
    subTagline: 'CUSTOM FURNITURE, MADE TO SCALE.',
    foundingStory:
      'Được khởi xướng bởi Don Winston từ năm 2013, TopLine Furniture được thành lập với tầm nhìn rõ ràng: hiện thực hóa năng lực sản xuất nội thất may đo theo quy mô lớn mà không làm mất đi tính thủ công tinh xảo, sự linh hoạt và giá trị vượt trội.',
    foundingSub:
      'Từ Việt Nam, TopLine phát triển và chế tác nội thất cao cấp cho các chuỗi khách sạn, khu nghỉ dưỡng, dự án kiến trúc ốp gỗ (millwork) và các bộ sưu tập bán lẻ độc quyền cho khách hàng quốc tế.',
  },
  en: {
    officialName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    internationalName: 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED',
    shortName: 'TOP LINE HOSPITALITY FURNITURE CO., LTD',
    brandName: 'TopLine Furniture',
    taxId: '3703519683',
    registrationDate: 'October 09, 2026',
    charterCapital: '1,000,000,000 VND (1 Billion VND)',
    legalRepresentative: 'Tran Van Duong – Managing Director',
    shareholders: [
      { name: 'Tran Van Duong', share: '550,000,000 VND (55%)' },
      { name: 'Tran Thanh Nhan', share: '450,000,000 VND (45%)' },
    ],
    address: 'No. 26, DX-027 Street, Phu My 2 Quarter, Binh Duong Ward, Ho Chi Minh City, Vietnam',
    factoryFacility: 'TopLine Furniture Manufacturing Facility - Vietnam',
    hotline: '+84 977 429 979',
    phoneDisplay: '0977.429.979',
    email: 'duongtran.wooden80@gmail.com',
    tagline: 'CUSTOM FURNITURE, MADE TO SCALE.',
    subTagline: 'HOSPITALITY | ARCHITECTURAL MILLWORK | RETAIL',
    foundingStory:
      'Founded by Don Winston in 2013, TopLine Furniture was established with a clear vision: to make custom furniture scalable without losing the craftsmanship, flexibility, and great value that define truly well-made furniture.',
    foundingSub:
      'From Vietnam, TopLine develops and manufactures custom hospitality furniture, architectural millwork, and design-led retail collections for international clients.',
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
      vi: 'Chế tác nội thất may đo theo bản vẽ kiến trúc, thông số kỹ thuật nghiêm ngặt và mẫu mã được phê duyệt. Casegoods cao cấp, tủ lavabo độc bản, nội thất đa chất liệu.',
      en: 'Project-specific furniture developed around drawings, specifications, approved samples, material schedules, and site requirements.',
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
      vi: 'Các chi tiết may đo vừa vặn chuẩn kích thước hiện trạng công trình, đồng nhất màu sơn hoàn thiện và phối hợp lắp đặt mượt mà. Đã thi công các chuỗi quốc tế như Taco Bell, Five Guys, KFC.',
      en: 'Built-in and fitted elements developed around site dimensions, finish consistency, and seamless installation coordination.',
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
      vi: 'Phát triển theo từng họ sản phẩm hoàn chỉnh: thống nhất về chất liệu, tỷ lệ kiến trúc, lớp hoàn thiện, phụ kiện kim khí và cá tính thẩm mỹ.',
      en: 'Retail development organized as coordinated families — consistent in material, proportion, finish, hardware, and design language.',
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

export const PRODUCTS_CATALOG: ProductItem[] = [
  // Collection 01 - Warm Wood + Dark Stone
  {
    id: 'c1-credenza',
    name: { vi: 'Tủ Credenza / Tủ Cabinet Gỗ & Đá', en: 'Credenza / Cabinet Warm Wood' },
    category: 'warm-wood',
    categoryLabel: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Wood + Dark Stone' },
    dimensions: 'W1400 x D450 x H750 mm',
    materials: {
      vi: 'Mặt đá tự nhiên Dark Emperador, veneer gỗ sồi tự nhiên, tay nắm đồng cổ',
      en: 'Natural Stone Top (Dark Emperador), Oak veneer body, antique brass hardware',
    },
    finish: { vi: 'Sơn PU mờ bảo tồn tom gỗ sồi ấm', en: 'Warm matte oak finish with exposed grain' },
    hardware: { vi: 'Tay nắm tròn kim loại Antique Brass', en: 'Circular antique brass metal pulls' },
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Tủ credenza bo góc cong mềm mại kết hợp mặt đá cẩm thạch tối màu sang trọng và nan sọc fluted thủ công tinh tế.',
      en: 'Rounded case profile credenza featuring dark natural stone top, fluted vertical detailing, and antique-brass circular hardware.',
    },
    tags: ['Credenza', 'Storage', 'Dark Stone', 'Fluted Oak'],
  },
  {
    id: 'c1-dresser',
    name: { vi: 'Tủ Ngăn Kéo 6 Hộc (6-Drawer Dresser)', en: '6-Drawer Dresser Warm Wood' },
    category: 'warm-wood',
    categoryLabel: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Wood + Dark Stone' },
    dimensions: 'W1400 x D520 x H800 mm',
    materials: {
      vi: 'Mặt đá cẩm thạch tự nhiên dày dặn, thân gỗ sồi tự nhiên, ray trượt giảm chấn cao cấp',
      en: 'Natural stone top, oak veneer casegoods, soft-closing undermount slides',
    },
    finish: { vi: 'Gỗ sồi ấm tự nhiên mộc mạc', en: 'Natural warm oak veneer' },
    hardware: { vi: 'Tay nắm thanh dài Antique Brass', en: 'Linear antique-brass bar pulls' },
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Tủ 6 ngăn kéo đối xứng với tay kéo đồng nguyên khối, mặt đá cẩm thạch chống trầy xước và chân gỗ vuốt nhã nhặn.',
      en: 'Refined 6-drawer dresser pairing natural stone surface with warm oak joinery and solid brass hardware.',
    },
    tags: ['Dresser', 'Bedroom', 'Oak Veneer'],
  },
  {
    id: 'c1-nightstand',
    name: { vi: 'Tủ Đầu Giường 2 Ngăn (Nightstand)', en: '2-Drawer Nightstand' },
    category: 'warm-wood',
    categoryLabel: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Wood + Dark Stone' },
    dimensions: 'W600 x D450 x H550 mm',
    materials: {
      vi: 'Mặt đá tự nhiên bo góc, veneer gỗ sồi, phụ kiện đồng cổ điển',
      en: 'Contoured natural stone slab, oak veneer casing, antique brass pulls',
    },
    finish: { vi: 'Veneer gỗ sồi cao cấp', en: 'Hand-rubbed warm oak finish' },
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Kích thước lý tưởng cho phòng suite khách sạn 5 sao, bề mặt đá chịu nhiệt và chống bám bẩn.',
      en: 'Compact luxury bedside cabinet with durable natural stone surface for 5-star hospitality guestrooms.',
    },
    tags: ['Nightstand', 'Suite', 'Compact'],
  },
  {
    id: 'c1-consoletable',
    name: { vi: 'Bàn Console Chân Nan Sọc (Console Table)', en: 'Fluted Column Console Table' },
    category: 'warm-wood',
    categoryLabel: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Wood + Dark Stone' },
    dimensions: 'W1400 x D400 x H780 mm',
    materials: {
      vi: 'Mặt đá tự nhiên phiến lớn, 2 chân trụ nan sọc fluted thủ công',
      en: 'Solid natural stone slab top, dual fluted architectural oak pillar base',
    },
    finish: { vi: 'Sơn mờ bảo vệ chống tia UV', en: 'Low-sheen protective architectural lacquer' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Chiếc bàn console ấn tượng cho sảnh đón khách sạn hoặc hành lang cao cấp với chân trụ dạng thức cột Hy Lạp hiện đại.',
      en: 'Architectural foyer console with tactile fluted wood columns anchoring a substantial marble slab.',
    },
    tags: ['Console', 'Fluted', 'Lobby'],
  },
  {
    id: 'c1-diningtable',
    name: { vi: 'Bàn Ăn Chữ Nhật Mặt Đá (Dining Table)', en: 'Rectangular Stone Dining Table' },
    category: 'warm-wood',
    categoryLabel: { vi: 'Bộ Sưu Tập 01: Gỗ Ấm + Đá Đen', en: 'Collection 01: Wood + Dark Stone' },
    dimensions: 'W2250 x D1050 x H760 mm',
    materials: {
      vi: 'Mặt đá hoa cương phiến lớn 30mm, kết cấu khung thép ngầm, 2 chân đế nan gỗ sồi',
      en: 'Continuous 30mm natural stone slab, internal steel truss, dual fluted oak pedestal legs',
    },
    finish: { vi: 'Đá đánh bóng satin chống thấm, gỗ sồi xử lý độ ẩm 10%', en: 'Honed satin marble, kiln-dried oak base' },
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Bàn ăn 8–10 chỗ ngồi đẳng cấp quốc tế, kết hợp sự vững chãi của đá tự nhiên và sự ấm áp của chất gỗ gia công tỉ mỉ.',
      en: 'Substantial 8-10 seater dining table designed for private dining suites and penthouse residences.',
    },
    tags: ['Dining Table', '8-Seater', 'Marble'],
  },

  // Collection 02 - Black Contemporary
  {
    id: 'c2-bed',
    name: { vi: 'Giường Ngủ Hiện Đại Màu Đen (King Platform Bed)', en: 'Black Contemporary King Bed' },
    category: 'black-contemporary',
    categoryLabel: { vi: 'Bộ Sưu Tập 02: Đen Kiến Trúc Hiện Đại', en: 'Collection 02: Black Contemporary' },
    dimensions: 'W2100 x D2200 x H1200 mm',
    materials: {
      vi: 'Khung gỗ tần bì/sồi tẩm sấy tiêu chuẩn, sơn đen mờ kiến trúc, giát giường chịu lực',
      en: 'Kiln-dried solid ash & oak frame, architectural matte black lacquer, reinforced slats',
    },
    finish: { vi: 'Đen mờ sâu thẳm lộ tom gỗ tự nhiên', en: 'Deep matte black open-pore architectural finish' },
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Tỷ lệ hình học mạnh mẽ, đầu giường nguyên khối tối giản thể hiện sự sang trọng điềm tĩnh của phong cách đương đại.',
      en: 'Bold architectural proportions and restrained detailing crafted for high-end contemporary hospitality suites.',
    },
    tags: ['Bed', 'King Size', 'Black Contemporary'],
  },
  {
    id: 'c2-mediaconsole',
    name: { vi: 'Kệ Tivi & Media Console Đen (Media Console)', en: 'Black Architectural Media Console' },
    category: 'black-contemporary',
    categoryLabel: { vi: 'Bộ Sưu Tập 02: Đen Kiến Trúc Hiện Đại', en: 'Collection 02: Black Contemporary' },
    dimensions: 'W1800 x D480 x H520 mm',
    materials: {
      vi: 'Veneer sồi đen, ray trượt mở êm, khoang kỹ thuật giấu dây cáp chuẩn khách sạn',
      en: 'Ebonized oak veneer, soft-closing drawer glides, concealed wire management channels',
    },
    finish: { vi: 'Sơn đen mờ 5% cao cấp', en: '5% low-sheen ebonized matte lacquer' },
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Thiết kế cân xứng có hộc mở trung tâm cho thiết bị nghe nhìn và các ngăn kéo kín lưu trữ gọn gàng.',
      en: 'Clean linear silhouette with central AV open bay and seamless touch-latch storage drawers.',
    },
    tags: ['Media', 'AV Unit', 'Hospitality Tech'],
  },
  {
    id: 'c2-chest',
    name: { vi: 'Tủ 4 Tầng Ngăn Kéo Cao (4-Drawer Chest)', en: '4-Drawer Tall Chest' },
    category: 'black-contemporary',
    categoryLabel: { vi: 'Bộ Sưu Tập 02: Đen Kiến Trúc Hiện Đại', en: 'Collection 02: Black Contemporary' },
    dimensions: 'W900 x D480 x H1100 mm',
    materials: {
      vi: 'Gỗ tự nhiên kết hợp veneer sồi, đường nét vát cạnh tinh vi không cần tay nắm nổi',
      en: 'Solid wood joinery, ebonized oak veneer, integrated beveled finger-pull detail',
    },
    finish: { vi: 'Đen mờ kiến trúc', en: 'Architectural matte black' },
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Tủ cao tiết kiệm diện tích sàn mà vẫn tối đa hóa không gian lưu trữ cho phòng ngủ khách sạn.',
      en: 'Vertical chest engineered for efficient suite floorplates without sacrificing drawer volume.',
    },
    tags: ['Chest', 'Vertical Storage', 'Minimalist'],
  },

  // Collection 03 - Sculptural Stone + Wood
  {
    id: 'c3-sideboard',
    name: { vi: 'Tủ Sideboard Điêu Khắc Bo Cong (Sculptural Sideboard)', en: 'Sculptural Curved Fluted Sideboard' },
    category: 'sculptural',
    categoryLabel: { vi: 'Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ', en: 'Collection 03: Sculptural Stone + Wood' },
    dimensions: 'W2200 x D500 x H720 mm',
    materials: {
      vi: 'Mặt đá Calacatta tự nhiên vân nổi, thân nan gỗ sồi uốn cong bán kính lớn',
      en: 'Expressive Calacatta marble slab, curved tambour oak cabinetry with solid wood ribs',
    },
    finish: { vi: 'Mặt đá đánh bóng thủ công, gỗ sồi màu tự nhiên ấm', en: 'Honed organic stone, natural golden oak finish' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Tác phẩm điểm nhấn với mặt đá uốn theo dáng nan gỗ, thể hiện đỉnh cao kỹ thuật cơ khí chính xác và tay nghề thợ mộc TopLine.',
      en: 'Statement storage credenza combining expressive stone surfaces with sculptural oak forms and flowing radii.',
    },
    tags: ['Sculptural', 'Organic Curves', 'Tambour Wood'],
  },
  {
    id: 'c3-organic-coffee',
    name: { vi: 'Bàn Trà Dáng Hữu Cơ (Organic Coffee Table)', en: 'Biomorphic Organic Coffee Table' },
    category: 'sculptural',
    categoryLabel: { vi: 'Bộ Sưu Tập 03: Điêu Khắc Đá & Gỗ', en: 'Collection 03: Sculptural Stone + Wood' },
    dimensions: 'W1600 x D800 x H360 mm',
    materials: {
      vi: 'Phiến đá tự nhiên cắt đường cong uốn lượn, 2 chân đế gỗ sồi điêu khắc nguyên khối',
      en: 'Freeform sculpted natural stone top, dual undulating solid oak sculpted bases',
    },
    finish: { vi: 'Đá mài cạnh tròn Bullnose, gỗ sồi tự nhiên', en: 'Bullnose bull-edged marble, silky tactile oak base' },
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Dáng hình lấy cảm hứng từ thiên nhiên, tạo điểm nhấn nghệ thuật phóng khoáng cho phòng khách và sảnh VIP.',
      en: 'Nature-inspired organic silhouette designed as a functional centerpiece for luxury hospitality lobbies.',
    },
    tags: ['Coffee Table', 'Organic Form', 'Marble Sculpture'],
  },

  // Stanley Bedroom Collection
  {
    id: 'stanley-burl',
    name: { vi: 'Bộ Giường & Tủ Stanley Burl Oak Cao Cấp', en: 'Stanley - Burl Oak Dark Collection' },
    category: 'stanley',
    categoryLabel: { vi: 'Dòng Sản Phẩm Stanley: Burl Oak', en: 'Stanley Collection: Burl Oak' },
    dimensions: 'King Bed: W2150 x D2250 x H1350 mm | Dresser: W1600 x D500 x H850 mm',
    materials: {
      vi: 'Vân gỗ nu Burl Oak quý hiếm, khung gỗ sồi nhập khẩu, tay nắm núm tiện đồng thau',
      en: 'Exquisite Burl Oak burl veneer, kiln-dried hardwood framing, solid turned brass knobs',
    },
    finish: { vi: 'Đánh bóng sâu làm nổi bật từng đốm vân nu tự nhiên', en: 'Deep multi-step hand-rubbed finish revealing burled grain' },
    hardware: { vi: 'Núm kéo tròn kim loại đồng tiện thủ công', en: 'Turned solid brass traditional knob hardware' },
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Dòng sản phẩm gia công hoàn thiện cho thương hiệu nội thất quốc tế danh tiếng, kết hợp tinh hoa cổ điển và độ bền vượt trội.',
      en: 'Finished Stanley Furniture pieces grouped as the Burl Oak Dark bedroom collection for presidential hospitality suites.',
    },
    tags: ['Stanley', 'Burl Oak', 'Heritage Luxury'],
  },
  {
    id: 'stanley-marlow',
    name: { vi: 'Bộ Giường Marlow Oak Tự Nhiên (Marlow Oak Set)', en: 'Stanley - Marlow Oak Collection' },
    category: 'stanley',
    categoryLabel: { vi: 'Dòng Sản Phẩm Stanley: Marlow Oak', en: 'Stanley Collection: Marlow Oak' },
    dimensions: 'King Bed: W2100 x D2200 x H1280 mm | Nightstand: W650 x D450 x H600 mm',
    materials: {
      vi: 'Gỗ sồi Marlow tự nhiên tuyển chọn, lớp đệm bọc vải nỉ cao cấp chống cháy theo tiêu chuẩn khách sạn',
      en: 'Select Marlow oak timber, commercial-grade fire-retardant upholstered headboard panel',
    },
    finish: { vi: 'Sơn mờ màu nâu mộc tự nhiên', en: 'Hand-wiped medium oak natural finish' },
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: {
      vi: 'Sự kết hợp hoàn hảo giữa khung sồi khỏe khoắn và nệm êm ái, mang lại trải nghiệm nghỉ ngơi thư thái tối đa.',
      en: 'Marlow and Arbor coordinated bedroom set combining solid timber framing with bespoke upholstery.',
    },
    tags: ['Marlow Oak', 'Upholstered', 'Hospitality Standard'],
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
