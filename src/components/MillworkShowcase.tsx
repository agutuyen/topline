import { useState } from 'react';
import { ArrowRight, Eye, Maximize2 } from 'lucide-react';
import { COMMERCIAL_CLIENTS, MILLWORK_PROJECTS } from '../data/content';
import { Language, ProjectItem } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './common/Reveal';
import ProjectGalleryModal from './ProjectGalleryModal';

interface MillworkShowcaseProps {
  lang: Language;
  onOpenRFQ: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export default function MillworkShowcase({
  lang,
  onOpenRFQ,
  onSelectProject,
}: MillworkShowcaseProps) {
  return (
    <section id="clients" className="py-20 md:py-28 bg-[#121212] text-white relative">
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

        {/* Millwork Project Cards with Interactive Gallery Triggers */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {MILLWORK_PROJECTS.map((proj) => (
            <StaggerItem key={proj.id} className="h-full">
              <div className="luxury-card luxury-card-dark group h-full">
                <div className="luxury-card-inner flex flex-col justify-between h-full bg-[#141312]">
                  <div>
                    {/* Clickable Image Thumbnail Grid with Zoom Cue */}
                    <div
                      className="aspect-16/10 overflow-hidden relative cursor-pointer group/img"
                      onClick={() => onSelectProject(proj)}
                      title={lang === 'vi' ? 'Bấm để phóng to và xem từng ảnh' : 'Click to view gallery and enlarge'}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title[lang]}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-[#C5A880] border border-white/10">
                        {proj.client}
                      </div>

                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                        {proj.galleryImages.length} {lang === 'vi' ? 'ảnh chi tiết' : 'photos'}
                      </div>

                      {/* Hover Overlay Prompter */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-white text-[#191919] text-xs font-semibold shadow-xl uppercase tracking-wider flex items-center gap-1.5 transform translate-y-1 group-hover/img:translate-y-0 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>{lang === 'vi' ? 'Phóng To Từng Ảnh' : 'View & Zoom Photos'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h3
                        onClick={() => onSelectProject(proj)}
                        className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#C5A880] transition-colors cursor-pointer"
                      >
                        {proj.title[lang]}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                        {proj.desc[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-6 pt-0 sm:p-7 sm:pt-0 flex gap-2.5">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Xem Ảnh Chi Tiết' : 'View Gallery'}</span>
                    </button>
                    <button
                      onClick={onOpenRFQ}
                      className="py-2.5 px-4 rounded-lg bg-[#C5A880] hover:bg-white hover:text-[#191919] text-[#191919] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1"
                      title={lang === 'vi' ? 'Yêu cầu báo giá hạng mục này' : 'Request RFQ for this scope'}
                    >
                      <span>{lang === 'vi' ? 'Báo Giá' : 'RFQ'}</span>
                      <ArrowRight className="w-3 h-3" />
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
