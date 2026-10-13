import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, Phone, X } from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { COMPANY_INFO } from '../data/content';
import ImageViewerModal from './common/ImageViewerModal';

interface ProjectGalleryModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
  onOpenRFQ: () => void;
}

export default function ProjectGalleryModal({
  project,
  lang,
  onClose,
  onOpenRFQ,
}: ProjectGalleryModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const info = COMPANY_INFO[lang];

  useEffect(() => {
    setActiveIdx(0);
    setIsFullscreenOpen(false);
  }, [project?.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFullscreenOpen) onClose();
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % project.galleryImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, isFullscreenOpen]);

  if (!project) return null;

  const currentImage = project.galleryImages[activeIdx] || { url: project.image, caption: project.title };
  const totalImages = project.galleryImages.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % totalImages);
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      >
        <div
          data-lenis-prevent
          className="w-full max-w-5xl bg-[#141312] text-white rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative max-h-[94vh] flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar with Exquisite Minimalist Close Button */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 z-20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 font-semibold">
                {project.badge[lang]}
              </span>
              <span className="text-xs text-white/50 font-mono hidden sm:inline">
                {project.client}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/60">
                {activeIdx + 1} / {totalImages}
              </span>

              {/* Exquisite Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90 shadow-sm"
                aria-label="Close Project Gallery"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Stage: High-Resolution Viewer with Fullscreen Lightbox Trigger */}
          <div
            className="relative flex-1 bg-black/60 min-h-[340px] sm:min-h-[460px] flex items-center justify-center p-4 overflow-hidden group select-none cursor-pointer"
            onClick={() => setIsFullscreenOpen(true)}
            title={lang === 'vi' ? 'Nhấp để xem ảnh đầy đủ toàn màn hình' : 'Click to view full image'}
          >
            {/* Main Image */}
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.caption[lang]}
                className="max-h-[320px] sm:max-h-[440px] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-102 animate-fadeIn"
              />
            </div>

            {/* Previous / Next Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
              aria-label="Previous Image"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
              aria-label="Next Image"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View Full Image Cue Pill */}
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-md group-hover:scale-105 transition-all">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Xem Ảnh Đầy Đủ' : 'View Full Image'}</span>
            </div>

            {/* Image Caption Banner */}
            <div className="absolute bottom-4 left-4 right-32 z-20 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-md text-xs text-white/90 border border-white/10 truncate font-light">
              <span className="text-[#C5A880] font-mono font-medium mr-2">[{activeIdx + 1}/{totalImages}]</span>
              {currentImage.caption[lang]}
            </div>
          </div>

          {/* Thumbnails Gallery Ribbon (Click to Switch) */}
          <div
            data-lenis-prevent
            className="p-3 bg-black/50 border-t border-white/10 shrink-0"
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {project.galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeIdx === i
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/50 scale-102 opacity-100'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption[lang]}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] font-mono px-1 text-white">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Specifications & Pinned Action Footer */}
          <div className="p-5 sm:p-6 bg-[#181615] border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0 z-20">
            <div className="space-y-1.5 max-w-2xl text-xs">
              <h4 className="font-serif text-base sm:text-lg text-white font-normal">
                {project.title[lang]}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-white/70 text-[11px]">
                <div>
                  <span className="text-white/40 mr-1.5">{lang === 'vi' ? 'Hạng mục:' : 'Scope:'}</span>
                  <span>{project.scope[lang]}</span>
                </div>
                <div>
                  <span className="text-white/40 mr-1.5">{lang === 'vi' ? 'Vật liệu:' : 'Materials:'}</span>
                  <span>{project.materials[lang]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="tel:0977429979"
                className="py-2.5 px-3.5 rounded-lg border border-white/20 hover:border-white/40 text-xs font-mono text-white/90 flex items-center gap-1.5 transition-colors"
                title="Hotline Kỹ Thuật"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{info.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenRFQ();
                }}
                className="py-2.5 px-4 rounded-lg bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>{lang === 'vi' ? 'Yêu Cầu Báo Giá Thi Công' : 'Submit Drawings for RFQ'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox for Project Photos */}
      <ImageViewerModal
        isOpen={isFullscreenOpen}
        imageUrl={currentImage.url}
        altText={currentImage.caption[lang]}
        title={project.title[lang]}
        subtitle={`${project.client} · [${activeIdx + 1}/${totalImages}] ${currentImage.caption[lang]}`}
        onClose={() => setIsFullscreenOpen(false)}
      />
    </>
  );
}
