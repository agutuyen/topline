import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export default function PrivacyPolicyModal({
  isOpen,
  lang,
  onClose,
}: PrivacyPolicyModalProps) {
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
              {lang === 'vi' ? 'CHÍNH SÁCH BẢO MẬT & DỮ LIỆU' : 'LEGAL & PRIVACY POLICY'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal mt-0.5">
              {lang === 'vi'
                ? 'Chính Sách Bảo Mật Thông Tin Khách Hàng'
                : 'Data Privacy Policy & Protection'}
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
              1. {lang === 'vi' ? 'Đơn Vị Thu Thập & Quản Lý Dữ Liệu' : 'Data Controller & Operating Entity'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'CÔNG TY TNHH NỘI THẤT TOP LINE HOSPITALITY (thương hiệu: TOPLINE FURNITURE, MST: 3703519683, địa chỉ: Số 26, Đường DX-027, KP Phú Mỹ 2, P. Bình Dương, TP. Hồ Chí Minh, Việt Nam) là đơn vị quản trị và bảo vệ dữ liệu được thu thập qua website toplinefurniture.vn.'
                : 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED (Brand: TOPLINE FURNITURE, Tax ID: 3703519683, address: No. 26, DX-027 Street, Phu My 2 Quarter, Binh Duong Ward, Ho Chi Minh City, Vietnam) acts as the data controller for all personal and business data collected on toplinefurniture.vn.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2 font-serif">
              2. {lang === 'vi' ? 'Dữ Liệu Thu Thập & Mục Đích Sử Dụng' : 'Data Collected & Processing Purpose'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Chúng tôi chỉ thu thập thông tin doanh nghiệp, họ tên người đại diện, số điện thoại, email và hồ sơ bản vẽ đính kèm nhằm mục đích duy nhất: rà soát tính khả thi kỹ thuật (feasibility review), lập dự toán báo giá (BOQ pricing) và tổ chức chế tác mẫu thử (sampling).'
                : 'We collect company details, contact person name, telephone/WhatsApp, email, and attached architectural drawings solely for the purpose of technical feasibility reviews, bill-of-materials cost estimation, and mock-up scheduling.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2 font-serif">
              3. {lang === 'vi' ? 'Cam Kết Bảo Mật Bản Vẽ Kỹ Thuật (NDA)' : 'Confidentiality of Architectural Drawings'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Mọi bản vẽ kỹ thuật (CAD/DWG), mô hình 3D và hồ sơ chỉ định vật liệu (Spec Sheets) của khách hàng đều được xử lý theo thỏa thuận bảo mật nghiêm ngặt. TopLine Furniture cam kết không chuyển giao, thương mại hóa hoặc công khai bản vẽ của dự án cho bất kỳ bên thứ ba nào.'
                : 'All client CAD drawings, 3D models, and proprietary material schedules are treated with strict confidentiality. TopLine Furniture guarantees that no project design assets will be disclosed, shared, or commercialized without explicit written consent.'}
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
