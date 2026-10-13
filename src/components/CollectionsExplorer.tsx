import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/content';
import { Language, ProductItem } from '../types';

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
    { id: 'all', label: { vi: 'Tất Cả Sản Phẩm', en: 'All Collections' } },
    { id: 'warm-wood', label: { vi: '01. Gỗ Ấm + Đá Đen', en: '01. Warm Wood + Dark Stone' } },
    { id: 'black-contemporary', label: { vi: '02. Đen Kiến Trúc', en: '02. Black Contemporary' } },
    { id: 'sculptural', label: { vi: '03. Điêu Khắc Đá & Gỗ', en: '03. Sculptural Stone + Wood' } },
    { id: 'stanley', label: { vi: 'Dòng Stanley Luxury', en: 'Stanley Collections' } },
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      product.name[lang].toLowerCase().includes(query) ||
      product.materials[lang].toLowerCase().includes(query) ||
      product.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collections" className="py-20 md:py-28 bg-[#FAF9F6] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200">
          <div>
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#A68A56]">
              03 / {lang === 'vi' ? 'BỘ SƯU TẬP & DANH MỤC' : 'CURATED COLLECTIONS'}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919]">
              {lang === 'vi' ? 'Ngôn Ngữ Thiết Kế Đồng Bộ' : 'Design-Led Furniture Families'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#191919]/70 max-w-xl font-light">
              {lang === 'vi'
                ? 'Mỗi bộ sưu tập được tổ chức nhất quán về chất liệu đá tự nhiên, gỗ sồi tuyển chọn, tỷ lệ hoàn mỹ và phụ kiện kim khí cao cấp.'
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
        </div>

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

        {/* Products Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Stage */}
                <div
                  className="relative aspect-4/3 bg-[#F4F3F0] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name[lang]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-white">
                    {product.dimensions}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-white/95 text-[#191919] text-xs font-semibold shadow-md tracking-wider uppercase">
                      {lang === 'vi' ? 'Xem Thông Số Kỹ Thuật' : 'Inspect Specifications'}
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
