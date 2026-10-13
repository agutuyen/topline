import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

  const stats = [
    {
      value: '2013',
      label: lang === 'vi' ? 'Khởi xướng thương hiệu' : 'Brand Heritage',
    },
    {
      value: '100%',
      label: lang === 'vi' ? 'May đo theo bản vẽ' : 'Custom Built',
    },
    {
      value: 'QC 100%',
      label: lang === 'vi' ? 'Kiểm tra xuất xưởng' : 'Full Inspection',
    },
    {
      value: 'GLOBAL',
      label: lang === 'vi' ? 'Xuất khẩu quốc tế' : 'Export Ready',
    },
  ];

  const highlights =
    lang === 'vi'
      ? ['Khách sạn & Resort', 'Millwork kiến trúc', 'Bán lẻ cao cấp']
      : ['Hotels & Resorts', 'Architectural Millwork', 'Premium Retail'];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden text-white">
      {/* Brighter video background with reduced overlay */}
      <AmbientVideoBackground overlayOpacity={0.55} />

      {/* Main Content — Left-aligned with right breathing room */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column — Primary content */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Micro-pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="whitespace-nowrap">
                {lang === 'vi'
                  ? 'Nhà Máy Nội Thất Xuất Khẩu'
                  : 'Export Furniture Manufacturer'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-normal tracking-tight leading-[1.1] text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              {lang === 'vi' ? (
                <>
                  Nội Thất May Đo,{' '}
                  <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Chuẩn Mực Cho Mọi Quy Mô.
                  </span>
                </>
              ) : (
                <>
                  Custom Furniture,{' '}
                  <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Made To Scale.
                  </span>
                </>
              )}
            </h1>

            {/* Lead text */}
            <p className="mt-4 max-w-xl text-sm sm:text-[15px] md:text-base text-white/85 font-light leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              {content.foundingSub}
            </p>

            {/* Highlight chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/85 text-[11px] sm:text-xs font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                  {h}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
              <button
                onClick={onOpenRFQ}
                className="w-full sm:w-auto px-7 py-3 bg-[#C5A880] text-[#191919] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span className="whitespace-nowrap">
                  {lang === 'vi' ? 'Nhận Báo Giá Dự Án' : 'Request Project Quote'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {lang === 'vi' ? 'Xem Bộ Sưu Tập' : 'Explore Collections'}
              </button>
            </div>
          </div>

          {/* Right Column — Stats & social proof */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-1.5">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex items-center gap-4 px-5 py-2.5 bg-[#1a1815]/45 backdrop-blur-xl rounded-lg border border-white/10 hover:border-[#C5A880]/25 hover:bg-[#1a1815]/55 transition-all group"
              >
                <div className="font-serif text-xl sm:text-2xl font-medium text-[#C5A880] min-w-[80px] whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-white/80 uppercase tracking-wider leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Quick contact teaser — single line */}
            <a
              href="tel:0977429979"
              className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#C5A880]/20 to-[#1a1815]/40 backdrop-blur-xl rounded-lg border border-[#C5A880]/20 hover:border-[#C5A880]/35 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold text-white/80 whitespace-nowrap">
                {lang === 'vi' ? 'Hotline / Zalo' : 'Call / WhatsApp'}
              </span>
              <span className="font-serif text-base font-medium text-[#C5A880] tracking-wide whitespace-nowrap ml-auto">
                {content.phoneDisplay}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="relative z-10 mx-auto pb-4 animate-bounce opacity-50 hover:opacity-90 transition-opacity">
        <a href="#about" aria-label="Scroll down">
          <svg className="w-4 h-4 text-white/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
