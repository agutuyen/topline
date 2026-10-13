import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export default function TermsModal({
  isOpen,
  lang,
  onClose,
}: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
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
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden text-[#191919]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Header with Exquisite Close Button */}
        <div className="px-6 sm:px-8 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-md shrink-0 z-20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A68A56] font-semibold">
              {lang === 'vi' ? 'ĐIỀU KHOẢN HỢP ĐỒNG & SẢN XUẤT' : 'TERMS OF CONTRACT MANUFACTURING'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal mt-0.5">
              {lang === 'vi'
                ? 'Điều Khoản Dịch Vụ & Sản Xuất Dự Án B2B'
                : 'Commercial Terms & Manufacturing Framework'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#191919] flex items-center justify-center transition-all duration-200 cursor-pointer hover:rotate-90 shadow-2xs"
            aria-label="Close dialog"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-light"
        >
          <div className="text-[11px] font-mono text-gray-400">
            {lang === 'vi' ? 'Hiệu lực từ ngày 09/10/2026' : 'Effective date: October 09, 2026'} · Version 1.1
          </div>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2 font-serif">
              1. {lang === 'vi' ? 'Phạm Vi Dịch Vụ & Hợp Đồng B2B' : 'Scope of Commercial Services'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'TopLine Furniture cung cấp dịch vụ chế tác nội thất hợp đồng (contract furniture), hệ mộc kiến trúc (architectural millwork) và bộ sưu tập bán lẻ xuất khẩu theo bản vẽ và bảng khối lượng đã được hai bên thống nhất.'
                : 'TopLine Furniture provides custom contract furniture manufacturing, architectural millwork, and export retail collections based on mutually approved shop drawings, material schedules, and bills of materials.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2 font-serif">
              2. {lang === 'vi' ? 'Quy Trình Duyệt Mẫu Vàng (Golden Master Sample)' : 'Golden Master Sample Approval'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Trước khi đưa vào dây chuyền sản xuất hàng loạt, TopLine Furniture chế tác mẫu hoàn thiện (golden sample) để đối tác kiểm tra trực tiếp về màu sơn, thớ gỗ, mối mộng và phụ kiện. Sản xuất đại trà chỉ bắt đầu sau khi có văn bản phê duyệt mẫu.'
                : 'Prior to full-batch production runs, TopLine Furniture fabricates full-scale golden master mock-ups and finish coupons. Production commences only upon formal written client sign-off.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2 font-serif">
              3. {lang === 'vi' ? 'Dung Sai Kỹ Thuật & Tiêu Chuẩn Xuất Xưởng' : 'Engineering Tolerances & Export Warranty'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Mọi sản phẩm tuân thủ nghiêm ngặt dung sai kỹ thuật ±1.0 mm theo bảng bóc tách chi tiết (BOM), độ ẩm gỗ kiểm soát dưới 10–12% và bảo hành kết cấu 24 tháng theo điều kiện hợp đồng.'
                : 'All pieces comply strictly with ±1.0 mm BOM manufacturing tolerances, kiln moisture under 12%, and a 24-month structural warranty under contract terms.'}
            </p>
          </section>
        </div>

        {/* Pinned Footer */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-gray-100 flex items-center justify-end bg-gray-50/80 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#191919] text-white text-xs font-semibold hover:bg-[#C5A880] hover:text-[#191919] transition-colors cursor-pointer"
          >
            {lang === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
