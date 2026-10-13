import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import AmbientVideoBackground from './AmbientVideoBackground';

interface HeroSectionProps {
  lang: Language;
  onOpenRFQ: () => void;
  onExploreCollections: () => void;
}

type ShowcaseTab = 'casegoods' | 'millwork' | 'materials';

export default function HeroSection({
  lang,
  onOpenRFQ,
  onExploreCollections,
}: HeroSectionProps) {
  const content = COMPANY_INFO[lang];
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('casegoods');

  const tabData = {
    casegoods: {
      badge: lang === 'vi' ? 'HẠNG MỤC BUỒNG PHÒNG' : 'GUESTROOM CASEGOODS',
      title: lang === 'vi' ? 'Đồ Gỗ Buồng Phòng Khách Sạn & Resort' : 'Luxury Hospitality Casegoods',
      subtitle: lang === 'vi' ? 'Tiêu chuẩn 5 sao · Khách sạn & Biệt thự cao cấp' : 'Five-Star Standard · Turnkey Guestrooms & Suites',
      image: '/images/profile/collection-01-warm-wood.png',
      spec: [
        { label: lang === 'vi' ? 'Vật liệu chính' : 'Primary Material', value: 'White Oak & Natural Marble' },
        { label: lang === 'vi' ? 'Dung sai BOM' : 'BOM Tolerance', value: '±1.0 mm' },
        { label: lang === 'vi' ? 'Tiêu chuẩn kiểm thử' : 'Testing Standards', value: 'BIFMA X5.5 & Drop Test' },
      ],
    },
    millwork: {
      badge: lang === 'vi' ? 'MỘC KIẾN TRÚC' : 'ARCHITECTURAL MILLWORK',
      title: lang === 'vi' ? 'Hệ Ốp Mộc Kiến Trúc & Sảnh Đón' : 'Architectural Millwork & Joinery',
      subtitle: lang === 'vi' ? 'Vách tiêu âm, quầy lễ tân & lam sóng CNC' : 'Acoustic Paneling, Receptions & Curved CNC Joinery',
      image: '/images/profile/architectural-millwork.jpg',
      spec: [
        { label: lang === 'vi' ? 'Gia công kỹ thuật' : 'Fabrication', value: '5-Axis CNC Precision Joinery' },
        { label: lang === 'vi' ? 'Độ ẩm sấy' : 'Kiln Moisture', value: '< 10–12% (Export-Ready)' },
        { label: lang === 'vi' ? 'Khung liên kết' : 'Sub-Structure', value: 'Concealed Heavy-Duty Aluminum' },
      ],
    },
    materials: {
      badge: lang === 'vi' ? 'THƯ VIỆN VẬT LIỆU' : 'MATERIAL PALETTE',
      title: lang === 'vi' ? 'Bề Mặt Gỗ Quý & Chi Tiết Kim Khí' : 'Fine Hardwoods & Metal Trims',
      subtitle: lang === 'vi' ? 'Vân gỗ Burl tự nhiên & đồng thau satin' : 'Select Burl Grains & Brushed Satin Brass',
      image: '/images/profile/stanley-burl-oak.jpg',
      spec: [
        { label: lang === 'vi' ? 'Gỗ tuyển chọn' : 'Timber Selection', value: 'FSC-Certified Burl Oak & Walnut' },
        { label: lang === 'vi' ? 'Kim khí điểm xuyết' : 'Hardware Accents', value: 'Brushed Brass & PVD Coating' },
        { label: lang === 'vi' ? 'Hệ sơn phủ' : 'Finish System', value: 'Low-VOC Ultra-Matte Polyurethane' },
      ],
    },
  };

  const currentTab = tabData[activeTab];

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden text-white">
      {/* 20-second Seamless Boomerang Architectural Video Loop */}
      <AmbientVideoBackground overlayOpacity={0.42} />

      {/* Main Hero Grid */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authoritative Editorial Master */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            {/* Top Provenance Micro-Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-[#C5A880] text-[11px] font-sans font-medium uppercase tracking-[0.22em] shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span>
                {lang === 'vi'
                  ? 'NHÀ MÁY SẢN XUẤT NỘI THẤT MAY ĐO · VIỆT NAM'
                  : 'BESPOKE CONTRACT FURNITURE FACILITY · VIETNAM'}
              </span>
            </div>

            {/* Grand Headline with Cormorant Garamond Serif */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[4rem] font-normal tracking-tight leading-[1.1] text-white">
              {lang === 'vi' ? (
                <>
                  Nội Thất May Đo, <br />
                  <span className="italic font-light text-[#C5A880]">
                    Chuẩn Mực Mọi Quy Mô.
                  </span>
                </>
              ) : (
                <>
                  Architectural Furniture, <br />
                  <span className="italic font-light text-[#C5A880]">
                    Engineered to Scale.
                  </span>
                </>
              )}
            </h1>

            {/* Editorial Lead Narrative — 65ch measure */}
            <p className="max-w-2xl text-base sm:text-lg text-white/90 font-sans font-light leading-relaxed">
              {content.foundingSub}
            </p>

            {/* Architectural Engineering Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>±1.0 mm BOM Tolerance</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Kiln Moisture &lt; 10–12%</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>100% Bench Inspection</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenRFQ}
                className="group px-8 py-4 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-between sm:justify-center gap-3"
              >
                <span>{lang === 'vi' ? 'Nhận Báo Giá Dự Án (RFQ)' : 'Request Project Quote'}</span>
                <span className="w-6 h-6 rounded-full bg-[#191919] text-[#C5A880] flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={onExploreCollections}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer text-center"
              >
                {lang === 'vi' ? 'Xem Bộ Sưu Tập Thực Tế' : 'Explore Collections'}
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Craft & Material Stage */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="luxury-card luxury-card-dark w-full max-w-lg mx-auto">
              <div className="luxury-card-inner p-1 relative flex flex-col justify-between">
                {/* Blueprint Corner Accents */}
                <div className="absolute top-2 left-2 text-[#C5A880]/50 font-mono text-[9px] pointer-events-none z-10">+</div>
                <div className="absolute top-2 right-2 text-[#C5A880]/50 font-mono text-[9px] pointer-events-none z-10">+</div>
                <div className="absolute bottom-2 left-2 text-[#C5A880]/50 font-mono text-[9px] pointer-events-none z-10">+</div>
                <div className="absolute bottom-2 right-2 text-[#C5A880]/50 font-mono text-[9px] pointer-events-none z-10">+</div>

                {/* Tab Switcher Header */}
                <div className="p-3 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-1.5 rounded-t-[1.15rem]">
                  <button
                    onClick={() => setActiveTab('casegoods')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer text-center ${
                      activeTab === 'casegoods'
                        ? 'bg-[#C5A880] text-[#191919] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    01. Casegoods
                  </button>
                  <button
                    onClick={() => setActiveTab('millwork')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer text-center ${
                      activeTab === 'millwork'
                        ? 'bg-[#C5A880] text-[#191919] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    02. Millwork
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer text-center ${
                      activeTab === 'materials'
                        ? 'bg-[#C5A880] text-[#191919] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    03. Materials
                  </button>
                </div>

                {/* Visual Specimen Window */}
                <div className="relative aspect-16/10 bg-black/60 overflow-hidden group">
                  <img
                    key={activeTab}
                    src={currentTab.image}
                    alt={currentTab.title}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 animate-fadeIn"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Visual Specimen Tag */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest text-[#C5A880] border border-white/10">
                    {currentTab.badge}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                      {currentTab.title}
                    </h3>
                    <p className="text-xs text-white/75 font-light mt-0.5">
                      {currentTab.subtitle}
                    </p>
                  </div>
                </div>

                {/* Technical Dossier Parameters */}
                <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-xl space-y-3 rounded-b-[1.15rem]">
                  {currentTab.spec.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-white/10 last:border-b-0 last:pb-0">
                      <span className="text-white/60 font-light">{item.label}:</span>
                      <span className="text-[#C5A880] font-mono font-medium">{item.value}</span>
                    </div>
                  ))}

                  {/* Direct Contact Hotline Strip */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white/70 font-light">
                        {lang === 'vi' ? 'Hỗ trợ kỹ thuật xưởng:' : 'Factory Direct Line:'}
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
      </div>

      {/* Subtle Scroll Cue */}
      <div className="relative z-10 mx-auto pb-4 text-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.2em] uppercase text-white/60 hover:text-[#C5A880] transition-colors"
        >
          <span>{lang === 'vi' ? 'Khám phá năng lực xưởng sản xuất' : 'Explore Factory Capabilities'}</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
