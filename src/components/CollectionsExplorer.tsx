import { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { PRODUCTS_CATALOG, COLLECTIONS_OVERVIEW } from '../data/content';
import { Language, ProductItem } from '../types';
import { Reveal } from './common/Reveal';
interface CollectionsExplorerProps {
  lang: Language;
  onSelectProduct: (product: ProductItem) => void;
  onOpenRFQWithProduct: (product: ProductItem) => void;
}

export default function CollectionsExplorer({
  lang,
  onSelectProduct,
  onOpenRFQWithProduct,
}: CollectionsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: { vi: 'Tất Cả Sản Phẩm (29)', en: 'All Collections (29)' } },
    { id: 'warm-wood', label: { vi: '01. Gỗ Ấm + Đá Đen (6)', en: '01. Warm Wood + Dark Stone (6)' } },
    { id: 'black-contemporary', label: { vi: '02. Đen Kiến Trúc (6)', en: '02. Black Contemporary (6)' } },
    { id: 'sculptural', label: { vi: '03. Điêu Khắc Đá & Gỗ (4)', en: '03. Sculptural Stone + Wood (4)' } },
    { id: 'dining-accent', label: { vi: '04. Bàn Ăn & Tạo Điểm Nhấn (6)', en: '04. Dining & Accent (6)' } },
    { id: 'marlow-oak', label: { vi: '05. Stanley Marlow Oak (3)', en: '05. Stanley Marlow Oak (3)' } },
    { id: 'burl-oak', label: { vi: '06. Stanley Burl Oak Dark (4)', en: '06. Stanley Burl Oak Dark (4)' } },
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      product.name[lang].toLowerCase().includes(query) ||
      (product.sku && product.sku.toLowerCase().includes(query)) ||
      product.materials[lang].toLowerCase().includes(query) ||
      (product.dimensions && product.dimensions.toLowerCase().includes(query)) ||
      product.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  const activeCollectionMeta = COLLECTIONS_OVERVIEW.find(
    (c) => c.id === activeCategory
  );

  return (
    <section id="collections" className="py-20 md:py-28 bg-[#FAF9F6] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header with smooth entrance */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200">
          <div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919]">
              {lang === 'vi' ? 'Bộ Sưu Tập Nội Thất' : 'Furniture Collections'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#191919]/70 max-w-xl font-light">
              {lang === 'vi'
                ? 'Các dòng sản phẩm được hoàn thiện đồng bộ về chất liệu gỗ sồi tuyển chọn, mặt đá tự nhiên và phụ kiện kim khí cao cấp theo tiêu chuẩn xuất khẩu.'
                : 'Each collection is presented as a complete family — consistent in material, proportion, finish, hardware, and architectural design language.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm theo tên, chất liệu đá, gỗ...' : 'Search by name, marble, oak...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#C5A880] shadow-2xs"
            />
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#191919] text-white shadow-xs'
                  : 'bg-white border border-gray-200/80 text-[#191919]/75 hover:bg-gray-100'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
        {/* Collection Overview Banner (When a specific collection is filtered) */}
        {activeCollectionMeta && (
          <div className="mb-10 bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1 rounded-sm bg-[#F4F3F0] text-[#A68A56]">
                    COLLECTION {activeCollectionMeta.number}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    TOPLINE PROFILE
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
                  {activeCollectionMeta.title[lang]}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#191919]/75 leading-relaxed font-light">
                  {activeCollectionMeta.subtitle[lang]}
                </p>
                <div className="mt-5 p-3 rounded-lg bg-[#FAF9F6] border border-gray-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block mb-1">
                    {lang === 'vi' ? 'Hạng mục hoàn thiện trong bộ:' : 'Included pieces in family:'}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#191919]">
                    {activeCollectionMeta.pieces}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F6] relative group overflow-hidden h-64 sm:h-72 lg:h-full min-h-[220px]">
              <img
                src={activeCollectionMeta.overviewImage}
                alt={activeCollectionMeta.title[lang]}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase text-white">
                {lang === 'vi' ? 'Ảnh Tổng Thể Bộ Sưu Tập' : 'Collection Overview Board'}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="luxury-card group"
            >
              <div className="luxury-card-inner flex flex-col justify-between h-full">
              <div>
                {/* Product Image Stage */}
                {/* Product Image Stage — Clean object containment with white background */}
                <div
                  className="relative aspect-square bg-[#FAFAFA] p-4 sm:p-5 border-b border-gray-100 overflow-hidden cursor-pointer flex items-center justify-center group/img"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name[lang]}
                    className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider text-[#C5A880] border border-white/10">
                    {product.sku || product.id.toUpperCase()}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-mono text-gray-700 shadow-xs">
                    {product.dimensions}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white text-[#191919] text-xs font-semibold shadow-md tracking-wider uppercase flex items-center gap-1.5">
                      <span>{lang === 'vi' ? 'Xem Thông Số' : 'Inspect Specs'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="p-5 sm:p-6">
                  <div className="text-[11px] font-mono text-[#A68A56] uppercase tracking-wider">
                    {product.categoryLabel[lang]}
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="mt-1 font-serif text-lg sm:text-xl font-normal text-[#191919] group-hover:text-[#A68A56] transition-colors cursor-pointer"
                  >
                    {product.name[lang]}
                  </h3>
                  <p className="mt-2 text-xs text-[#191919]/70 line-clamp-2 leading-relaxed">
                    {product.description[lang]}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-[#191919]/80 font-mono">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400 font-sans">{lang === 'vi' ? 'Quy cách:' : 'Dimensions:'}</span>
                      <span className="font-medium text-right text-[11px]">{product.dimensions}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400 font-sans">{lang === 'vi' ? 'Vật liệu:' : 'Materials:'}</span>
                      <span className="font-medium text-right text-[11px] line-clamp-1 max-w-[65%]">
                        {product.materials[lang]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 sm:p-6 sm:pt-0 flex gap-2">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-200 hover:border-gray-300 bg-[#FAF9F6] text-[#191919] text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  {lang === 'vi' ? 'Chi Tiết' : 'Specs'}
                </button>
                <button
                  onClick={() => onOpenRFQWithProduct(product)}
                  className="py-2 px-4 rounded-lg bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                  title={lang === 'vi' ? 'Thêm vào yêu cầu báo giá dự án' : 'Add to Project RFQ'}
                >
                  <span>{lang === 'vi' ? '+ Báo Giá' : '+ Add RFQ'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 mt-6">
            <p className="text-gray-500 text-sm">
              {lang === 'vi'
                ? 'Không tìm thấy sản phẩm phù hợp với từ khóa.'
                : 'No products match your search query.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-[#A68A56] underline cursor-pointer"
            >
              {lang === 'vi' ? 'Đặt lại bộ lọc' : 'Reset filters'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
