import { ArrowRight } from 'lucide-react';
import { CORE_SECTORS } from '../data/content';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './common/Reveal';

interface CapabilitiesSectionProps {
  lang: Language;
  onOpenRFQ: () => void;
}

export default function CapabilitiesSection({ lang, onOpenRFQ }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="py-12 md:py-16 bg-[#FAF9F6] text-[#191919] relative overflow-hidden border-t border-gray-200/50 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header with smooth entrance */}
        <Reveal className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919]">
            {lang === 'vi' ? 'Giải Pháp Nội Thất Cho Từng Nhu Cầu' : 'Tailored Furniture Solutions for Every Need'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#191919]/70 font-light leading-relaxed">
            {lang === 'vi'
              ? 'Ba nhóm năng lực sản xuất chuyên sâu đáp ứng từ buồng phòng khách sạn nghỉ dưỡng, hệ ốp mộc kiến trúc phức tạp đến các bộ sưu tập xuất khẩu cao cấp.'
              : 'Three specialized contract manufacturing disciplines engineered for turnkey hospitality suites, complex architectural millwork, and export retail furniture.'}
          </p>
        </Reveal>

        {/* 3 Core Sectors Cards with staggered cascading entrance */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CORE_SECTORS.map((sector) => (
            <StaggerItem key={sector.id} className="h-full">
              <div className="luxury-card h-full">
                <div className="luxury-card-inner p-7 sm:p-8 flex flex-col justify-between h-full bg-white">
                  <div>
                    {/* Sector Header Badge & Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1 rounded-sm bg-[#F4F3F0] text-[#A68A56]">
                        {sector.badge}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        0{CORE_SECTORS.indexOf(sector) + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-xl sm:text-2xl font-normal text-[#191919]">
                      {sector.title[lang]}
                    </h3>
                    <p className="text-xs font-medium text-[#A68A56] mt-1">
                      {sector.subtitle[lang]}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
                      {sector.desc[lang]}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#191919]/60 block mb-2.5">
                        {lang === 'vi' ? 'Hạng mục tiêu biểu:' : 'Key Deliverables:'}
                      </span>
                      <ul className="space-y-2 text-xs text-[#191919]/80">
                        {sector.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C5A880] font-bold">―</span>
                            <span>{cap[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* RFQ Action Button */}
                  <button
                    onClick={onOpenRFQ}
                    className="mt-6 w-full py-2.5 px-4 rounded-lg bg-[#FAF9F6] hover:bg-[#191919] hover:text-white text-[#191919] text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'vi' ? 'Báo Giá Mảng Này' : 'Inquire This Sector'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
