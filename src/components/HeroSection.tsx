import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import AmbientVideoBackground from './AmbientVideoBackground';

interface HeroSectionProps {
  lang: Language;
  onOpenRFQ: () => void;
  onExploreCollections: () => void;
}

export default function HeroSection({
  lang,
  onOpenRFQ,
  onExploreCollections,
}: HeroSectionProps) {
  const content = COMPANY_INFO[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16 text-white">
      {/* Dynamic luxury video/ambient background */}
      <AmbientVideoBackground overlayOpacity={0.7} />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 my-auto text-center flex flex-col items-center">
        {/* Subtle Category Micro-Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
          <span>{lang === 'vi' ? 'HỒ SƠ NĂNG LỰC NHÀ MÁY NỘI THẤT' : 'HOSPITALITY · MILLWORK · RETAIL'}</span>
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.12] max-w-5xl text-white">
          {lang === 'vi' ? (
            <>
              Nội Thất May Đo, <br className="hidden sm:inline" />
              <span className="italic font-light text-[#C5A880]">Chuẩn Mực Cho Mọi Quy Mô.</span>
            </>
          ) : (
            <>
              Custom Furniture, <br className="hidden sm:inline" />
              <span className="italic font-light text-[#C5A880]">Made To Scale.</span>
            </>
          )}
        </h1>

        {/* Lead Narrative */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 font-sans font-light leading-relaxed">
          {content.foundingSub}
        </p>

        {/* Action Button Strip */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenRFQ}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] text-[#191919] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-white transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'Nhận Báo Giá Dự Án' : 'Request Project Quote'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCollections}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer"
          >
            {lang === 'vi' ? 'Xem Bộ Sưu Tập Thực Tế' : 'Explore Collections'}
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-3 bg-black/20 backdrop-blur-xs rounded-lg border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#C5A880]">2013</div>
            <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {lang === 'vi' ? 'Khởi dựng thương hiệu' : 'Established in Vietnam'}
            </div>
          </div>

          <div className="p-3 bg-black/20 backdrop-blur-xs rounded-lg border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#C5A880]">100%</div>
            <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {lang === 'vi' ? 'May đo chuẩn bản vẽ' : 'Custom Project Execution'}
            </div>
          </div>

          <div className="p-3 bg-black/20 backdrop-blur-xs rounded-lg border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#C5A880]">QC 100%</div>
            <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {lang === 'vi' ? 'Kiểm tra trước xuất xưởng' : 'Full-batch Inspection'}
            </div>
          </div>

          <div className="p-3 bg-black/20 backdrop-blur-xs rounded-lg border border-white/10">
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#C5A880]">GLOBAL</div>
            <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {lang === 'vi' ? 'Chuẩn xuất khẩu quốc tế' : 'Export Standard Logistics'}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="relative z-10 mx-auto text-center animate-bounce cursor-pointer opacity-70 hover:opacity-100">
        <a href="#about" aria-label="Scroll to about section">
          <svg className="w-5 h-5 text-white/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
