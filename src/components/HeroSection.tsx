import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language, CollectionGroup, ProjectItem } from '../types';
import { fetchCollections, fetchMillworkProjects } from '../services/api';
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
  const [liveCollection, setLiveCollection] = useState<CollectionGroup | null>(null);
  const [liveMillwork, setLiveMillwork] = useState<ProjectItem | null>(null);

  useEffect(() => {
    // Load live collections & millwork projects from backend
    fetchCollections().then((cols) => {
      if (cols && cols.length > 0) {
        setLiveCollection(cols[0]);
      }
    }).catch(() => {});

    fetchMillworkProjects().then((projs) => {
      if (projs && projs.length > 0) {
        setLiveMillwork(projs[0]);
      }
    }).catch(() => {});
  }, []);

  const tabData = {
    casegoods: {
      badge: lang === 'vi' ? 'HẠNG MỤC BUỒNG PHÒNG' : 'GUESTROOM CASEGOODS',
      standardTag: lang === 'vi' ? 'Chuẩn Khách Sạn 5 Sao' : '5-Star Hospitality Grade',
      title: liveCollection?.title?.[lang] || (lang === 'vi' ? 'Đồ Gỗ Buồng Phòng Khách Sạn & Resort' : 'Luxury Hospitality Casegoods'),
      subtitle: liveCollection?.subtitle?.[lang] || (lang === 'vi' ? 'Tiêu chuẩn 5 sao · Khách sạn & Biệt thự cao cấp' : 'Five-Star Standard · Turnkey Guestrooms & Suites'),
      image: liveCollection?.overviewImage || '/images/profile/collection-01-warm-wood.png',
      spec: [
        {
          label: lang === 'vi' ? 'VẬT LIỆU CHÍNH' : 'PRIMARY MATERIAL',
          value: liveCollection?.materialsSummary?.[lang] || (lang === 'vi' ? 'Gỗ Sồi Trắng & Đá Tự Nhiên' : 'White Oak & Natural Marble'),
        },
        { label: lang === 'vi' ? 'DUNG SAI BOM' : 'BOM TOLERANCE', value: '±1.0 mm (CNC Precision)' },
        { label: lang === 'vi' ? 'TIÊU CHUẨN KIỂM THỬ' : 'TESTING STANDARDS', value: 'BIFMA X5.5 & Drop Test' },
      ],
    },
    millwork: {
      badge: liveMillwork?.badge?.[lang] || (lang === 'vi' ? 'MỘC KIẾN TRÚC & FIT-OUT' : 'ARCHITECTURAL MILLWORK'),
      standardTag: lang === 'vi' ? 'Gia Công Chuẩn Khắt Khe' : 'Precision Fit-Out Standard',
      title: liveMillwork?.title?.[lang] || (lang === 'vi' ? 'Hệ Ốp Mộc Kiến Trúc & Sảnh Đón' : 'Architectural Millwork & Joinery'),
      subtitle: liveMillwork?.desc?.[lang] || (lang === 'vi' ? 'Vách tiêu âm nan gỗ, quầy bar & lam sóng CNC' : 'Acoustic Paneling, Receptions & Curved CNC Joinery'),
      image: liveMillwork?.image || '/images/profile/architectural-millwork.jpg',
      spec: [
        {
          label: lang === 'vi' ? 'GIA CÔNG KỸ THUẬT' : 'FABRICATION',
          value: liveMillwork?.materials?.[lang] || '5-Axis CNC Precision Joinery',
        },
        { label: lang === 'vi' ? 'ĐỘ ẨM SẤY GỖ' : 'KILN MOISTURE', value: '< 10–12% (Export-Ready)' },
        { label: lang === 'vi' ? 'KHUNG LIÊN KẾT' : 'SUB-STRUCTURE', value: 'Concealed Heavy Aluminum' },
      ],
    },
    materials: {
      badge: lang === 'vi' ? 'THƯ VIỆN VẬT LIỆU CAO CẤP' : 'FINE MATERIAL PALETTE',
      standardTag: lang === 'vi' ? 'Chứng Chỉ FSC & An Toàn' : 'FSC-Certified & Low-VOC',
      title: lang === 'vi' ? 'Bề Mặt Gỗ Quý & Chi Tiết Kim Khí' : 'Fine Hardwoods & Metal Trims',
      subtitle: lang === 'vi' ? 'Vân gỗ Burl tự nhiên, sơn mờ & đồng thau satin' : 'Select Burl Grains & Brushed Satin Brass',
      image: '/images/profile/stanley-burl-oak.jpg',
      spec: [
        { label: lang === 'vi' ? 'GỖ TUYỂN CHỌN' : 'TIMBER SELECTION', value: 'FSC Burl Oak & Walnut' },
        { label: lang === 'vi' ? 'KIM KHÍ ĐIỂM XUYẾT' : 'HARDWARE ACCENTS', value: 'Brushed Brass & PVD' },
        { label: lang === 'vi' ? 'HỆ SƠN PHỦ' : 'FINISH SYSTEM', value: 'Low-VOC Ultra-Matte PU' },
      ],
    },
  };

  const currentTab = tabData[activeTab];

  const tabButtons: { id: ShowcaseTab; num: string; label: { vi: string; en: string } }[] = [
    { id: 'casegoods', num: '01', label: { vi: 'Casegoods', en: 'Casegoods' } },
    { id: 'millwork', num: '02', label: { vi: 'Millwork', en: 'Millwork' } },
    { id: 'materials', num: '03', label: { vi: 'Materials', en: 'Materials' } },
  ];

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
                  ? 'NỘI THẤT CAO CẤP THEO YÊU CẦU'
                  : 'HIGH-END BESPOKE FURNITURE'}
              </span>
            </div>

            {/* Grand Headline with Cormorant Garamond Serif */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[3.85rem] font-normal tracking-tight leading-[1.12] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
              {lang === 'vi' ? (
                <>
                  Từ Bản Vẽ Đến Thành Phẩm, <br />
                  <span className="italic font-light text-[#C5A880]">
                    Hoàn Thiện Trong Từng Chi Tiết.
                  </span>
                </>
              ) : (
                <>
                  From Blueprint to Finished Piece, <br />
                  <span className="italic font-light text-[#C5A880]">
                    Refined in Every Detail.
                  </span>
                </>
              )}
            </h1>
            {/* Editorial Lead Narrative — 65ch measure */}
            <p className="max-w-2xl text-base sm:text-lg text-white/90 font-sans font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              {content.foundingSub}
            </p>

            {/* Core Values / Giá Trị Cốt Lõi */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-sans font-medium flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{lang === 'vi' ? 'Sản Xuất Theo Yêu Cầu' : 'Bespoke Manufacturing'}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-sans font-medium flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{lang === 'vi' ? 'Kiểm Soát Chất Lượng' : 'Strict Quality Control'}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-sans font-medium flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{lang === 'vi' ? 'Đúng Bản Vẽ & Kỹ Thuật' : 'Exact Blueprint Precision'}</span>
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

          {/* Right Column: Architectural Craft & Material Stage (Modernized Luxury Glassmorphism) */}
          <div className="lg:col-span-5 xl:col-span-5">
            {/* Outer Bezel: Frosted Glass Shell with Soft Ambient Warm Glow */}
            <div className="relative w-full max-w-xl mx-auto rounded-[2rem] p-2 sm:p-2.5 bg-gradient-to-b from-white/20 via-white/10 to-black/35 backdrop-blur-2xl border border-white/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-white/10">
              {/* Subtle ambient warm light reflection */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Inner Core: Concentric Architectural Container */}
              <div className="relative z-10 rounded-[calc(2rem-0.625rem)] overflow-hidden bg-[#161514]/80 backdrop-blur-xl border border-white/15 flex flex-col shadow-inner">
                {/* Modern Segmented Tab Switcher */}
                <div className="p-2 sm:p-2.5 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-1.5 sm:gap-2">
                  {tabButtons.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 px-2.5 sm:px-3 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#C5A880] to-[#DFC8A4] text-[#191919] font-bold shadow-[0_2px_12px_rgba(197,168,128,0.35)]'
                            : 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                        }`}
                      >
                        <span className={`text-[10px] font-mono ${isActive ? 'text-[#191919]/70 font-semibold' : 'text-white/40'}`}>
                          {tab.num}
                        </span>
                        <span className="tracking-wide">
                          {tab.label[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* High-Definition Visual Specimen Window */}
                <div className="p-2 sm:p-2.5 pb-0">
                  <div className="relative aspect-[16/10] bg-black/60 rounded-xl overflow-hidden group border border-white/10">
                    <img
                      key={activeTab}
                      src={currentTab.image}
                      alt={currentTab.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 animate-fadeIn"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-[10px] font-sans font-medium uppercase tracking-[0.18em] shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#C5A880]" />
                        <span>{currentTab.badge}</span>
                      </div>

                      <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/95 text-[10px] font-sans font-normal shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                        <span>{currentTab.standardTag}</span>
                      </div>
                    </div>

                    {/* Bottom Title Overlay */}
                    <div className="absolute bottom-3.5 left-4 right-4 pointer-events-none">
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white drop-shadow-md leading-tight">
                        {currentTab.title}
                      </h3>
                      <p className="text-xs text-white/85 font-light mt-1 drop-shadow-sm">
                        {currentTab.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial Parameter Tiles (Replaces Plain Table) */}
                <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-black/30 backdrop-blur-md">
                  {currentTab.spec.map((item, idx) => (
                    <div
                      key={idx}
                      className="group/item p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A880]/35 transition-all duration-300 flex flex-col justify-between"
                    >
                      <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-white/50 group-hover/item:text-[#C5A880] transition-colors flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                        {item.label}
                      </span>
                      <span className="mt-1 font-sans text-xs font-medium text-white/95 leading-snug">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Concierge & Direct Action Footer */}
                <div className="px-4 py-3 bg-black/50 backdrop-blur-xl border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-sans text-white/75 font-light">
                      {lang === 'vi' ? 'Kỹ sư xưởng trực tuyến:' : 'Engineering Desk:'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="tel:0977429979"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#191919] border border-[#C5A880]/30 text-xs font-mono font-semibold transition-all duration-300"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{content.phoneDisplay}</span>
                    </a>
                    <button
                      onClick={onOpenRFQ}
                      className="px-3 py-1 rounded-full bg-[#C5A880] hover:bg-white text-[#191919] text-[11px] font-sans font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      {lang === 'vi' ? 'Báo giá nhanh' : 'Quick RFQ'}
                    </button>
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
