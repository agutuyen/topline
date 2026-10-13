import { useState, useEffect } from 'react';
import { ArrowRight, Maximize2, Minimize2, Phone, X } from 'lucide-react';
import { Language, ProductItem } from '../types';
import { COMPANY_INFO } from '../data/content';

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
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const info = COMPANY_INFO[lang];

  useEffect(() => {
    setActiveMediaIdx(0);
    setIsZoomed(false);
  }, [product?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Build authentic media gallery from available views
  const mediaList = [
    {
      id: 'studio',
      url: product.image,
      label: lang === 'vi' ? 'Studio 1:1' : 'Studio View',
      badge: lang === 'vi' ? 'Góc Nhìn Chính Diện' : 'Front Studio View',
    },
    ...(product.cutoutImage
      ? [
          {
            id: 'cutout',
            url: product.cutoutImage,
            label: lang === 'vi' ? 'Tách Nền' : 'Cutout',
            badge: lang === 'vi' ? 'Bản Vẽ / Tách Nền PNG' : 'CAD Transparent View',
          },
        ]
      : []),
    ...(product.collectionImage
      ? [
          {
            id: 'collection',
            url: product.collectionImage,
            label: lang === 'vi' ? 'Phối Cảnh' : 'In-Situ',
            badge: lang === 'vi' ? 'Phối Cảnh Bộ Sưu Tập' : 'Collection Setting',
          },
        ]
      : []),
    ...(product.detailImage
      ? [
          {
            id: 'detail',
            url: product.detailImage,
            label: lang === 'vi' ? 'Vật Liệu' : 'Materials',
            badge: lang === 'vi' ? 'Cận Cảnh Bề Mặt & Vân Gỗ' : 'Texture & Joinery Detail',
          },
        ]
      : []),
  ];

  const currentMedia = mediaList[activeMediaIdx] || mediaList[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Exquisite Minimalist Close Button (Cleanly isolated in top-right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-gray-200/80 text-gray-600 hover:text-[#191919] flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer hover:rotate-90"
          aria-label="Close Specification Sheet"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: High-End Visual Stage with Zoom & Real Thumbnails */}
        <div className="md:w-1/2 bg-[#FAFAFA] relative min-h-80 md:min-h-full flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
          {/* Main Visual Display Stage */}
          <div className="flex-1 relative flex items-center justify-center p-6 sm:p-8 bg-white overflow-hidden group select-none">
            <div
              className={`relative transition-transform duration-300 max-h-full max-w-full flex items-center justify-center ${
                isZoomed ? 'scale-140 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? (lang === 'vi' ? 'Bấm để thu nhỏ' : 'Click to reset zoom') : (lang === 'vi' ? 'Bấm để phóng to chi tiết vân mộc' : 'Click to zoom in')}
            >
              <img
                key={currentMedia.url}
                src={currentMedia.url}
                alt={product.name[lang]}
                className={`max-h-[300px] sm:max-h-[380px] max-w-full transition-all duration-300 animate-fadeIn ${
                  currentMedia.id === 'collection' ? 'object-cover w-full h-full rounded-lg' : 'object-contain'
                }`}
              />
            </div>

            {/* View Mode Badge Overlay */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono text-[#C5A880] border border-white/10 uppercase tracking-wider">
              {currentMedia.badge}
            </div>

            {/* Zoom Toggle Pill */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer backdrop-blur-md transition-colors"
            >
              {isZoomed ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{isZoomed ? (lang === 'vi' ? 'Thu Nhỏ' : '1x') : (lang === 'vi' ? 'Phóng To' : 'Zoom 1.4x')}</span>
            </button>
          </div>

          {/* Miniature Image Thumbnails Strip (Replacing clumsy text buttons) */}
          <div className="p-3 bg-[#F4F3F0] border-t border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {mediaList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setActiveMediaIdx(idx);
                }}
                className={`group relative flex flex-col items-center gap-1 shrink-0 cursor-pointer transition-all ${
                  activeMediaIdx === idx ? 'scale-102 opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white p-1 border-2 transition-all flex items-center justify-center ${
                    activeMediaIdx === idx
                      ? 'border-[#C5A880] shadow-sm ring-2 ring-[#C5A880]/30'
                      : 'border-gray-200 group-hover:border-gray-300'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`text-[10px] font-mono leading-none ${activeMediaIdx === idx ? 'text-[#191919] font-bold' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Professional Marketing & Technical Specification Dossier */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[85vh] md:max-h-full">
          <div>
            {/* Top Provenance & SKU Pill */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 pr-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#A68A56]">
                {product.categoryLabel[lang]}
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-sm bg-[#191919] text-[#C5A880]">
                SKU: {product.sku || product.id.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="mt-3.5 font-serif text-2xl sm:text-3xl font-normal text-[#191919] leading-snug">
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
