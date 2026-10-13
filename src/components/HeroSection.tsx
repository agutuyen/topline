import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
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

  const metrics = [
    {
      value: '2013',
      title: lang === 'vi' ? 'Thương Hiệu Khởi Xướng' : 'Brand Heritage',
      sub: lang === 'vi' ? 'Phát triển bởi Don Winston' : 'Founded by Don Winston',
    },
    {
      value: '100%',
      title: lang === 'vi' ? 'May Đo Theo Bản Vẽ' : 'Built To Specification',
      sub: lang === 'vi' ? 'Duyệt mẫu golden sample' : 'Approved golden samples',
    },
    {
      value: 'QC 100%',
      title: lang === 'vi' ? 'Kiểm Tra Trước Xuất' : 'Full-Batch Inspection',
      sub: lang === 'vi' ? 'Độ ẩm gỗ & mộng chịu lực' : 'Moisture & joinery checks',
    },
    {
      value: 'GLOBAL',
      title: lang === 'vi' ? 'Chuẩn Hàng Dự Án' : 'Export Logistics',
      sub: lang === 'vi' ? 'Đóng kiện gỗ chuyên dụng' : 'Crated for ocean freight',
    },
  ];

  const pillars =
    lang === 'vi'
      ? ['Buồng phòng & Suite khách sạn', 'Ốp mộc kiến trúc (Millwork)', 'Bộ sưu tập độc quyền']
      : ['Guestroom & Suite Casegoods', 'Architectural Millwork', 'Signature Collections'];

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden text-white">
      {/* Ambient Video & Subtle Film Grain Layer */}
      <AmbientVideoBackground overlayOpacity={0.52} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Architectural Editorial Typography */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow Micro-Pill with Hairline Ring */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15 text-[#C5A880] text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="whitespace-nowrap">
                {lang === 'vi'
                  ? 'NHÀ MÁY NỘI THẤT MAY ĐO · VIỆT NAM'
                  : 'CONTRACT FURNITURE MANUFACTURING · VIETNAM'}
              </span>
            </div>

            {/* Master Headline */}
            <h1
              className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[4rem] font-normal tracking-tight leading-[1.08] text-white"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}
            >
              {lang === 'vi' ? (
                <>
                  Nội Thất May Đo, <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    Chuẩn Mực Cho Mọi Quy Mô.
                  </span>
                </>
              ) : (
                <>
                  Architectural Furniture, <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    Engineered to Scale.
                  </span>
                </>
              )}
            </h1>

            {/* Lead Copy */}
            <p className="mt-5 max-w-xl text-sm sm:text-base text-white/85 font-light leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {content.foundingSub}
            </p>

            {/* Core Capability Pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {pillars.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 backdrop-blur-sm ring-1 ring-white/12 text-white/90 text-[11px] sm:text-xs font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>

            {/* Button-in-Button Action Strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary RFQ CTA */}
              <button
                onClick={onOpenRFQ}
                className="group px-7 py-3.5 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-between sm:justify-center gap-3"
              >
                <span>{lang === 'vi' ? 'Nhận Báo Giá Dự Án' : 'Request Project Quote'}</span>
                <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-[#191919]" />
                </span>
              </button>

              {/* Secondary Collections Link */}
              <button
                onClick={onExploreCollections}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/18 backdrop-blur-md ring-1 ring-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer text-center"
              >
                {lang === 'vi' ? 'Xem Bộ Sưu Tập Thực Tế' : 'Explore Collections'}
              </button>
            </div>
          </div>

          {/* Right Column: Double-Bezel Architectural Dossier Card */}
          <div className="lg:col-span-5 xl:col-span-5">
            {/* Outer Shell (Doppelrand) */}
            <div className="p-2 sm:p-2.5 rounded-[1.75rem] bg-white/5 backdrop-blur-2xl ring-1 ring-white/15 shadow-2xl">
              {/* Inner Core */}
              <div className="p-6 sm:p-7 rounded-[1.25rem] bg-[#141312]/80 border border-white/10 space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#C5A880]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'HỒ SƠ XƯỞNG SẢN XUẤT' : 'FACILITY SPECIFICATION'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">
                    BOM TOLERANCE: ±1.0MM
                  </span>
                </div>

                {/* 2x2 Metric Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  {metrics.map((m) => (
                    <div
                      key={m.value}
                      className="p-3.5 rounded-xl bg-white/4 ring-1 ring-white/8 hover:bg-white/8 transition-colors"
                    >
                      <div className="font-serif text-xl sm:text-2xl font-normal text-[#C5A880]">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-medium text-white/90 mt-0.5 leading-snug">
                        {m.title}
                      </div>
                      <div className="text-[10px] text-white/50 font-mono mt-0.5 leading-tight">
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Engineering Hotline Line */}
                <a
                  href="tel:0977429979"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#C5A880]/15 to-transparent ring-1 ring-[#C5A880]/25 hover:ring-[#C5A880]/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white/90">
                      {lang === 'vi' ? 'Đường dây nóng kỹ thuật:' : 'Direct Engineering Line:'}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-[#C5A880] group-hover:text-white transition-colors">
                    {content.phoneDisplay}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Scroll Cue */}
      <div className="relative z-10 mx-auto pb-4 text-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-[#C5A880] transition-colors"
        >
          <span>{lang === 'vi' ? 'CUỘN ĐỂ KHÁM PHÁ HỒ SƠ' : 'SCROLL TO EXPLORE PROFILE'}</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
