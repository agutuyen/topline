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

  const highlights =
    lang === 'vi'
      ? ['Đồ gỗ buồng phòng & Suite', 'Hệ ốp mộc kiến trúc (Millwork)', 'Bộ sưu tập độc quyền']
      : ['Guestroom & Suite Casegoods', 'Architectural Millwork', 'Signature Collections'];

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden text-white">
      {/* Ambient Architectural Video Background */}
      <AmbientVideoBackground overlayOpacity={0.5} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Authoritative Editorial Voice */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C5A880] text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span>
                {lang === 'vi'
                  ? 'XƯỞNG SẢN XUẤT NỘI THẤT MAY ĐO · VIỆT NAM'
                  : 'BESPOKE CONTRACT FURNITURE · VIETNAM'}
              </span>
            </div>

            {/* Master Headline — Clean weight hierarchy, no gradient text */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-normal tracking-tight leading-[1.08] text-white">
              {lang === 'vi' ? (
                <>
                  Nội Thất May Đo, <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880]">
                    Chuẩn Mực Cho Mọi Quy Mô.
                  </span>
                </>
              ) : (
                <>
                  Architectural Furniture, <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#C5A880]">
                    Engineered to Scale.
                  </span>
                </>
              )}
            </h1>

            {/* Lead Narrative — 65ch measure, natural human cadence */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/85 font-sans font-light leading-relaxed">
              {content.foundingSub}
            </p>

            {/* Core Pillars */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/90 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>

            {/* Primary Action Strip */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenRFQ}
                className="group px-8 py-4 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-between sm:justify-center gap-3"
              >
                <span>{lang === 'vi' ? 'Nhận Báo Giá Dự Án' : 'Request Project Quote'}</span>
                <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#191919]" />
                </span>
              </button>

              <button
                onClick={onExploreCollections}
                className="px-7 py-4 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer text-center"
              >
                {lang === 'vi' ? 'Xem Bộ Sưu Tập Thực Tế' : 'Explore Collections'}
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Hero Feature — Show the actual work */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="bg-[#141312]/85 backdrop-blur-xl rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
              {/* Feature Image Showcase */}
              <div className="relative aspect-16/10 bg-white/5 overflow-hidden">
                <img
                  src="/images/profile/hospitality-project.jpg"
                  alt="TopLine Bespoke Furniture"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono uppercase text-white">
                  {lang === 'vi' ? 'CHI TIẾT MỘC BẢN' : 'CRAFT SPECIFICATION'}
                </div>
              </div>

              {/* Dossier Fact Sheet */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="text-white/60">
                    {lang === 'vi' ? 'Nhà máy sản xuất:' : 'Manufacturing Base:'}
                  </span>
                  <span className="text-white font-medium">
                    {lang === 'vi' ? 'Bình Dương, Việt Nam' : 'Binh Duong, Vietnam'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="text-white/60">
                    {lang === 'vi' ? 'Dung sai kỹ thuật:' : 'Engineering Tolerance:'}
                  </span>
                  <span className="text-[#C5A880] font-mono font-medium">
                    ±1.0 mm (BOM Standard)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="text-white/60">
                    {lang === 'vi' ? 'Độ ẩm gỗ xuất khẩu:' : 'Kiln Moisture Level:'}
                  </span>
                  <span className="text-white font-medium">
                    &lt; 10–12% (Export Crated)
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/70">
                      {lang === 'vi' ? 'Tư vấn trực tiếp:' : 'Direct Engineering Line:'}
                    </span>
                  </div>
                  <a
                    href="tel:0977429979"
                    className="font-mono text-sm font-semibold text-[#C5A880] hover:text-white transition-colors"
                  >
                    {content.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 mx-auto pb-5 text-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[11px] font-sans tracking-widest uppercase text-white/50 hover:text-[#C5A880] transition-colors"
        >
          <span>{lang === 'vi' ? 'Khám phá năng lực nhà máy' : 'Explore Factory Capabilities'}</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
