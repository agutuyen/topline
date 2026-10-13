import { ArrowRight } from 'lucide-react';
import { COMMERCIAL_CLIENTS } from '../data/content';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './common/Reveal';
interface MillworkShowcaseProps {
  lang: Language;
  onOpenRFQ: () => void;
}

export default function MillworkShowcase({ lang, onOpenRFQ }: MillworkShowcaseProps) {
  const millworkProjects = [
    {
      title: { vi: 'Hệ Quầy & Nội Thất Chuỗi Nhà Hàng Quốc Tế', en: 'International Chain Dining Millwork' },
      client: 'Taco Bell / Five Guys / KFC Projects',
      desc: {
        vi: 'Chế tác module bàn quầy, vách ốp trang trí, hệ tủ pantry và quầy bar thương mại chuẩn kích thước fit-out khắt khe.',
        en: 'Custom commercial service counters, branded wall systems, banquettes, and heavy-use joinery built to architectural specifications.',
      },
      image: '/images/profile/architectural-millwork.jpg',
    },
    {
      title: { vi: 'Ốp Tường Kiến Trúc & Vách Gỗ Tiêu Âm', en: 'Architectural Wall Systems & Acoustical Paneling' },
      client: 'Executive Workspaces & Lounges',
      desc: {
        vi: 'Hệ thống vách nan gỗ sồi cong, tủ kệ âm tường tích hợp ánh sáng LED giấu rãnh và cửa giấu khuôn hiện đại.',
        en: 'Precision fluted oak tambour wall systems, integrated concealed LED channel shelving, and flush-mount hidden door assemblies.',
      },
      image: '/images/profile/hospitality-project.jpg',
    },
    {
      title: { vi: 'Bàn Chậu Rửa Lavabo Mặt Đá May Đo', en: 'Custom Hospitality Vanities & Millwork' },
      client: 'Resort & Luxury Hotel Suites',
      desc: {
        vi: 'Tủ lavabo kết hợp đá tự nhiên chống thấm 100%, khung gỗ chịu ẩm cao cấp và phụ kiện đồng mạ chống rỉ sét.',
        en: 'Heavy natural stone integrated basin tops, moisture-sealed marine-grade subframes, and precision plumbing chases.',
      },
      image: '/images/profile/manufacturing-floor.jpg',
    },
  ];

  return (
    <section id="clients" className="py-20 md:py-28 bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header with smooth entrance */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              {lang === 'vi' ? 'Mộc Kiến Trúc & Thương Hiệu Quốc Tế' : 'Architectural Fit-Out at Scale'}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
              {lang === 'vi'
                ? 'Năng lực gia công các hạng mục mộc kiến trúc phức tạp, từ chuỗi F&B toàn cầu như Taco Bell, Five Guys, KFC đến các khách sạn nghỉ dưỡng 5 sao.'
                : 'Proven manufacturing execution for major hospitality brands, international F&B chains, and high-profile corporate environments.'}
            </p>
          </div>

          <button
            onClick={onOpenRFQ}
            className="px-6 py-3 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-white transition-all duration-200 cursor-pointer self-start md:self-auto flex items-center gap-2"
          >
            <span>{lang === 'vi' ? 'Yêu Cầu Báo Giá Thi Công' : 'Submit Millwork Drawings'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Reveal>

        {/* Commercial Client Partner Logos Strip */}
        <div className="py-8 border-b border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {COMMERCIAL_CLIENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
            >
              <span className="font-serif text-base tracking-widest text-[#C5A880] font-medium uppercase">
                {item.logoText}
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1 text-center font-mono">
                {item.role}
              </span>
            </div>
          ))}
        </div>

        {/* Millwork Project Cards with staggered cascade */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {millworkProjects.map((proj, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="luxury-card luxury-card-dark group h-full">
                <div className="luxury-card-inner flex flex-col justify-between h-full">
                <div>
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-[#C5A880]">
                      {proj.client}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#C5A880] transition-colors">
                      {proj.title[lang]}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                      {proj.desc[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                  <button
                    onClick={onOpenRFQ}
                    className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'vi' ? 'Tư Vấn Hạng Mục Này' : 'Request Specifications'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
