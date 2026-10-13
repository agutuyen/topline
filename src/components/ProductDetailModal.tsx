import { useState, useEffect } from 'react';
import { ArrowRight, Eye, Grid, Layers, Phone, Sparkles } from 'lucide-react';
import { Language, ProductItem } from '../types';
import { COMPANY_INFO } from '../data/content';

interface ProductDetailModalProps {
  product: ProductItem | null;
  lang: Language;
  onClose: () => void;
  onAddToRFQ: (product: ProductItem) => void;
}

type ViewMode = 'product' | 'cutout' | 'collection' | 'detail';

export default function ProductDetailModal({
  product,
  lang,
  onClose,
  onAddToRFQ,
}: ProductDetailModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('product');
  const info = COMPANY_INFO[lang];

  useEffect(() => {
    setViewMode('product');
  }, [product?.id]);

  if (!product) return null;

  const currentImage =
    viewMode === 'cutout' && product.cutoutImage
      ? product.cutoutImage
      : viewMode === 'collection' && product.collectionImage
      ? product.collectionImage
      : viewMode === 'detail' && product.detailImage
      ? product.detailImage
      : product.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#191919] flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105"
          aria-label="Close specification modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: High-Resolution Product Visual Stage */}
        <div className="md:w-1/2 bg-[#FAFAFA] relative min-h-80 md:min-h-full flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
          {/* Main Visual Display */}
          <div className="flex-1 relative flex items-center justify-center p-6 bg-white overflow-hidden">
            <img
              key={currentImage}
              src={currentImage}
              alt={product.name[lang]}
              className={`max-h-full max-w-full transition-all duration-300 animate-fadeIn ${
                viewMode === 'collection' ? 'object-cover w-full h-full' : 'object-contain'
              }`}
            />

            {/* Visual Tag Badge */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono text-[#C5A880] border border-white/10 uppercase tracking-wider">
              {viewMode === 'cutout'
                ? lang === 'vi' ? 'Bản Vẽ / Tách Nền PNG' : 'Cutout / Transparent View'
                : viewMode === 'collection'
                ? lang === 'vi' ? 'Toàn Bộ Bộ Sưu Tập' : 'Complete Collection Board'
                : viewMode === 'detail'
                ? lang === 'vi' ? 'Vật Liệu & Cận Cảnh' : 'Material & Texture Detail'
                : `SKU: ${product.sku || product.id.toUpperCase()}`}
            </div>

            {/* Dimension Watermark */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono text-gray-700 shadow-xs">
              {product.dimensions}
            </div>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="p-3 bg-[#F4F3F0] border-t border-gray-200 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
            <button
              type="button"
              onClick={() => setViewMode('product')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'product'
                  ? 'bg-[#191919] text-white font-semibold shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{lang === 'vi' ? 'Ảnh Studio 1:1' : 'Studio Shot'}</span>
            </button>

            {product.cutoutImage && (
              <button
                type="button"
                onClick={() => setViewMode('cutout')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'cutout'
                    ? 'bg-[#191919] text-white font-semibold shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Tách Nền' : 'Cutout'}</span>
              </button>
            )}

            {product.collectionImage && (
              <button
                type="button"
                onClick={() => setViewMode('collection')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'collection'
                    ? 'bg-[#191919] text-white font-semibold shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Phối Cảnh Bộ' : 'Collection'}</span>
              </button>
            )}

            {product.detailImage && (
              <button
                type="button"
                onClick={() => setViewMode('detail')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'detail'
                    ? 'bg-[#191919] text-white font-semibold shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Vật Liệu' : 'Materials'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Professional Marketing & Technical Specification Dossier */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[85vh] md:max-h-full">
          <div>
            {/* Top Provenance & SKU */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#A68A56]">
                {product.categoryLabel[lang]}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm bg-[#F4F3F0] text-[#191919]">
                SKU: {product.sku || product.id.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#191919] leading-snug">
              {product.name[lang]}
            </h3>

            {/* Marketing & Functional Narrative */}
            <p className="mt-3 text-xs sm:text-sm text-[#191919]/75 leading-relaxed font-light">
              {product.description[lang]}
            </p>

            {/* Technical Specifications Grid */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FAF9F6] border border-gray-200/90 space-y-3 text-xs">
              {/* Standard Dimensions */}
              <div className="flex items-start justify-between">
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'QUY CÁCH TIÊU CHUẨN' : 'STANDARD DIMENSIONS'}
                </span>
                <span className="font-mono font-semibold text-[#191919] text-xs text-right">
                  {product.dimensions}
                  {product.dimensionsCm && (
                    <span className="text-gray-500 font-normal block text-[11px]">({product.dimensionsCm})</span>
                  )}
                </span>
              </div>

              {/* Primary Materials */}
              <div className="pt-2 border-t border-gray-200/60 flex items-start justify-between">
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'VẬT LIỆU CHÍNH' : 'PRIMARY MATERIALS'}
                </span>
                <span className="text-[#191919] font-medium text-xs text-right max-w-[65%]">
                  {product.materials[lang]}
                </span>
              </div>

              {/* Surface Finish */}
              <div className="pt-2 border-t border-gray-200/60 flex items-start justify-between">
                <span className="text-gray-400 font-mono uppercase text-[10px] block">
                  {lang === 'vi' ? 'HOÀN THIỆN BỀ MẶT' : 'SURFACE FINISH'}
                </span>
                <span className="text-[#191919] font-medium text-xs text-right max-w-[65%]">
                  {product.finish[lang]}
                </span>
              </div>

              {/* Hardware / Joinery */}
              {product.hardware && (
                <div className="pt-2 border-t border-gray-200/60 flex items-start justify-between">
                  <span className="text-gray-400 font-mono uppercase text-[10px] block">
                    {lang === 'vi' ? 'PHỤ KIỆN & LIÊN KẾT' : 'HARDWARE / JOINERY'}
                  </span>
                  <span className="text-[#191919] font-medium text-xs text-right max-w-[65%]">
                    {product.hardware[lang]}
                  </span>
                </div>
              )}

              {/* Color Palette */}
              {product.color && (
                <div className="pt-2 border-t border-gray-200/60 flex items-start justify-between">
                  <span className="text-gray-400 font-mono uppercase text-[10px] block">
                    {lang === 'vi' ? 'BẢNG MÀU' : 'COLOR PALETTE'}
                  </span>
                  <span className="text-[#191919] font-medium text-xs text-right">
                    {product.color[lang]}
                  </span>
                </div>
              )}

              {/* Contract Standards */}
              <div className="pt-2 border-t border-gray-200/60 flex items-start justify-between text-[11px] font-mono text-gray-500">
                <span>{lang === 'vi' ? 'TIÊU CHUẨN XUẤT XƯỞNG' : 'EXPORT STANDARDS'}</span>
                <span className="text-[#A68A56] font-medium text-right">
                  Dung sai ±1.0mm · Độ ẩm &lt; 12%
                </span>
              </div>
            </div>

            {/* Keyword Hashtags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#F4F3F0] text-gray-600 text-[10px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Strip: Add to RFQ & Direct Hotline */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => {
                onAddToRFQ(product);
                onClose();
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'vi' ? '+ Thêm Vào Báo Giá Dự Án' : '+ Add to Project RFQ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="tel:0977429979"
              className="py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-400 text-xs font-mono font-medium text-gray-800 transition-colors flex items-center justify-center gap-2 text-center"
              title={lang === 'vi' ? 'Liên hệ kỹ thuật' : 'Direct Engineering Line'}
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{info.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
