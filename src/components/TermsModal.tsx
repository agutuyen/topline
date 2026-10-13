import { X } from 'lucide-react';
import { Language } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export default function TermsModal({ isOpen, lang, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-9 relative max-h-[90vh] overflow-y-auto text-[#191919]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#191919] p-1.5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-gray-100 pb-4 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A68A56]">
            {lang === 'vi' ? 'ĐIỀU KHOẢN SỬ DỤNG' : 'TERMS OF USE & COMMERCIAL RFQ'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
            {lang === 'vi'
              ? 'Điều Khoản Dịch Vụ & Tiếp Nhận Báo Giá B2B'
              : 'Website Terms of Service & B2B Inquiry Terms'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {lang === 'vi' ? 'Ban hành bởi Ban Giám đốc TopLine Furniture' : 'Issued by TopLine Hospitality Furniture Co., Ltd'} · October 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              1. {lang === 'vi' ? 'Phạm Vi Áp Dụng' : 'Scope of Terms'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Website toplinefurniture.vn là cổng giới thiệu năng lực sản xuất nội thất và tiếp nhận yêu cầu báo giá (Request for Quotation - RFQ) cho các khách sạn, khu nghỉ dưỡng, công trình kiến trúc và đối tác thương mại B2B.'
                : 'The website toplinefurniture.vn serves as an informational catalogue showcasing custom manufacturing capabilities and receiving business-to-business Request for Quotation (RFQ) inquiries for hotels, resorts, and commercial retailers.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              2. {lang === 'vi' ? 'Quy Định Về Báo Giá Thương Mại' : 'Commercial Quotation Policy'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Mọi thông tin sản phẩm và danh mục trên website mang tính chất tham khảo mẫu mã và năng lực gia công. Báo giá chính thức chỉ có hiệu lực pháp lý khi được phát hành bằng văn bản có dấu đỏ hoặc thư xác nhận chính thức từ địa chỉ email @toplinefurniture.vn.'
                : 'All catalogue dimensions and specifications displayed online represent prototype baselines. Binding commercial quotations are exclusively issued via written proposals signed by authorized representatives from official @toplinefurniture.vn email addresses.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              3. {lang === 'vi' ? 'Quyền Sở Hữu Trí Tuệ' : 'Intellectual Property & Trademarks'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Thương hiệu TOPLINE FURNITURE, tài liệu hồ sơ năng lực (Company Profile), ảnh chụp nhà xưởng và bản vẽ kỹ thuật thuộc quyền sở hữu của TopLine hoặc đối tác được cấp phép. Nghiêm cấm sao chép, tái sử dụng cho mục đích thương mại ngoài phạm vi hợp tác được phê duyệt.'
                : 'The TOPLINE FURNITURE trademark, proprietary Company Profile materials, factory photography, and shop drawings remain the intellectual property of TopLine or its authorized licensing partners.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              4. {lang === 'vi' ? 'Quy Trình Xử Lý RFQ' : 'RFQ Inquiry Fulfillment Protocol'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Sau khi khách hàng gửi biểu mẫu RFQ, hệ thống sẽ cấp mã theo dõi RFQ-2026-XXXXX. Phòng Kinh doanh (sales@toplinefurniture.vn) sẽ phản hồi trong vòng 24–48 giờ làm việc để rà soát bản vẽ và làm rõ vật tư.'
                : 'Upon RFQ submission, an inquiry tracking reference (RFQ-2026-XXXXX) is generated. Our commercial team (sales@toplinefurniture.vn) responds within 24 to 48 business hours with preliminary engineering review.'}
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#191919] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#C5A880] hover:text-[#191919] transition-colors cursor-pointer"
          >
            {lang === 'vi' ? 'Đã Hiểu & Đóng' : 'Understood & Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
