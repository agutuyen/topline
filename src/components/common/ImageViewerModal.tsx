import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface ImageViewerModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

/**
 * Universal Fullscreen Image Viewer Lightbox.
 * Displays images at full resolution with zoom controls, backdrop click-to-close,
 * and keyboard shortcuts (Esc, +, -).
 */
export default function ImageViewerModal({
  isOpen,
  imageUrl,
  altText,
  title,
  subtitle,
  onClose,
}: ImageViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(2.5, z + 0.25));
      if (e.key === '-' || e.key === '_') setZoomLevel((z) => Math.max(0.75, z - 0.25));
      if (e.key === '0') setZoomLevel(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((z) => Math.min(2.5, z + 0.25));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((z) => Math.max(0.75, z - 0.25));
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Bar with Title, Subtitle, and Exquisite Close Button */}
      <div
        className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 z-10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col max-w-xl">
          {title && (
            <h4 className="font-serif text-white text-base sm:text-lg font-normal truncate">
              {title}
            </h4>
          )}
          {subtitle && (
            <span className="text-[11px] font-mono text-[#C5A880] tracking-wider uppercase mt-0.5">
              {subtitle}
            </span>
          )}
        </div>

        {/* Exquisite Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90 shadow-md"
          aria-label="Close Fullscreen Image"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full-Scale Image Canvas */}
      <div
        className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-auto overscroll-contain"
        onClick={onClose}
      >
        <div
          className="transition-transform duration-200 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-fadeIn"
          />
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div
        className="px-6 py-3.5 flex items-center justify-between border-t border-white/10 bg-black/60 z-10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[11px] font-mono text-white/50 hidden sm:block">
          Bấm ESC hoặc nhấp bên ngoài để đóng · Phím +/- để phóng to
        </div>

        {/* Zoom Action Controls */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= 0.75}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
            title="Thu nhỏ (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-medium text-white px-2 min-w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 2.5}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
            title="Phóng to (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={resetZoom}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer ml-1 flex items-center gap-1"
            title="Khôi phục kích thước chuẩn (0)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>100%</span>
          </button>

          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="p-2 rounded-lg bg-[#C5A880]/20 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#191919] transition-all cursor-pointer ml-2"
            title="Mở ảnh gốc trong tab mới"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
