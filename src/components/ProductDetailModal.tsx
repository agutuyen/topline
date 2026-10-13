import { ArrowRight } from 'lucide-react';
import { Language, ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  lang: Language;
  onClose: () => void;
  onAddToRFQ: (product: ProductItem) => void;
}

export default function ProductDetailModal({
  product,
  lang,
  onClose,
  onAddToRFQ,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#191919] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Image Showcase */}
        <div className="md:w-1/2 bg-[#F4F3F0] relative min-h-64 md:min-h-full">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-sm text-xs font-mono text-white">
            {product.dimensions}
          </div>
        </div>

        {/* Right Product Dossier */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#A68A56]">
              {product.categoryLabel[lang]}
            </div>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#191919]">
              {product.name[lang]}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
              {product.description[lang]}
            </p>

            {/* Specifications Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-gray-200/80 space-y-3 text-xs">
              <div>
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'KÍCH THƯỚC TIÊU CHUẨN' : 'STANDARD DIMENSIONS'}
                </span>
                <span className="font-mono font-semibold text-[#191919] text-sm mt-0.5 block">
                  {product.dimensions}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-200/60">
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'VẬT LIỆU CHÍNH' : 'PRIMARY MATERIALS'}
                </span>
                <span className="text-[#191919] font-medium mt-0.5 block">
                  {product.materials[lang]}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-200/60">
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'HOÀN THIỆN BỀ MẶT' : 'SURFACE FINISH'}
                </span>
                <span className="text-[#191919] font-medium mt-0.5 block">
                  {product.finish[lang]}
                </span>
              </div>

              {product.hardware && (
                <div className="pt-2 border-t border-gray-200/60">
                  <span className="text-gray-400 font-mono uppercase text-[10px] block">
                    {lang === 'vi' ? 'PHỤ KIỆN KIM KHÍ' : 'HARDWARE / METALWORK'}
                  </span>
                  <span className="text-[#191919] font-medium mt-0.5 block">
                    {product.hardware[lang]}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-sm bg-gray-100 text-[#191919]/60 text-[10px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onAddToRFQ(product);
                onClose();
              }}
              className="flex-1 py-3 px-5 rounded-lg bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{lang === 'vi' ? 'Thêm Vào Yêu Cầu Báo Giá' : 'Add To Project RFQ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-lg border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-center"
            >
              {lang === 'vi' ? 'Đóng' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
