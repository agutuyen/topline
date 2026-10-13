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
            {lang === 'vi' ? 'CHÍNH SÁCH BẢO MẬT & DỮ LIỆU' : 'LEGAL & PRIVACY POLICY'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
            {lang === 'vi'
              ? 'Chính Sách Bảo Mật Thông Tin Khách Hàng'
              : 'Data Privacy Policy & Protection'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {lang === 'vi' ? 'Hiệu lực từ ngày 09/10/2026' : 'Effective date: October 09, 2026'} · Version 1.1
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              1. {lang === 'vi' ? 'Đơn Vị Thu Thập & Quản Lý Dữ Liệu' : 'Data Controller & Operating Entity'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'CÔNG TY TNHH NỘI THẤT TOP LINE HOSPITALITY (thương hiệu: TOPLINE FURNITURE, MST: 3703519683, địa chỉ: Số 26, Đường DX-027, KP Phú Mỹ 2, P. Bình Dương, TP. Hồ Chí Minh, Việt Nam) là đơn vị quản trị và bảo vệ dữ liệu được thu thập qua website toplinefurniture.vn.'
                : 'TOP LINE HOSPITALITY FURNITURE COMPANY LIMITED (Brand: TOPLINE FURNITURE, Tax ID: 3703519683, address: No. 26, DX-027 Street, Phu My 2 Quarter, Binh Duong Ward, Ho Chi Minh City, Vietnam) acts as the data controller for all personal and business data collected on toplinefurniture.vn.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              2. {lang === 'vi' ? 'Dữ Liệu Thu Thập & Mục Đích Sử Dụng' : 'Data Collected & Processing Purpose'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Chúng tôi chỉ thu thập các thông tin tối thiểu cần thiết phục vụ giao dịch B2B, bao gồm: Họ tên người liên hệ, Email doanh nghiệp, Số điện thoại/Zalo, Tên công ty/dự án, Bản vẽ kỹ thuật (PDF/CAD/DWG) và ghi chú kỹ thuật trong yêu cầu báo giá (RFQ). Chúng tôi cam kết không kinh doanh, cho thuê hay chia sẻ dữ liệu này cho bên thứ ba vì mục đích tiếp thị.'
                : 'We collect only necessary B2B information required to formulate project quotations: Contact person name, business email, phone/WhatsApp number, company name, architectural drawings (PDF/CAD), and technical project specifications. We never sell, rent, or lease your data to third parties for marketing purposes.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              3. {lang === 'vi' ? 'Chính Sách Xử Lý Dữ Liệu Với AI (Claude API)' : 'AI Processing & Third-Party AI Services (Claude API)'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Khi khách hàng sử dụng các tính năng hỗ trợ bóc tách hồ sơ hoặc hỏi đáp dự án ứng dụng Claude API (Anthropic), dữ liệu chỉ được xử lý tạm thời qua API an toàn cấp doanh nghiệp. Dữ liệu bản vẽ và thông tin bảo mật của dự án không được sử dụng để huấn luyện mô hình công cộng (zero data training guarantee).'
                : 'When utilizing experimental AI specification features powered by the Claude API (Anthropic), queries and documents are processed under enterprise API data protection terms. Customer proprietary drawings and project specifications are never used to train public AI foundation models.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              4. {lang === 'vi' ? 'Lưu Trữ & Bảo Mật Bản Vẽ Kỹ Thuật' : 'Storage & Confidentiality of Architectural Drawings'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Tất cả file bản vẽ đính kèm trong RFQ được lưu trữ riêng biệt trên máy chủ có kiểm soát phân quyền. Chỉ đội ngũ kỹ sư bóc tách dự án và phòng kinh doanh của TopLine được phép truy cập để lập báo giá.'
                : 'All engineering drawings and BOQs uploaded via the RFQ channel are retained within encrypted private storage accessible strictly by TopLine’s engineering estimators and project sales team.'}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-sm sm:text-base text-[#191919] mb-2">
              5. {lang === 'vi' ? 'Quyền Của Khách Hàng & Kênh Liên Hệ' : 'Data Subject Rights & Contact'}
            </h3>
            <p>
              {lang === 'vi'
                ? 'Quý khách có quyền yêu cầu trích xuất, đính chính hoặc xóa vĩnh viễn dữ liệu dự án của mình bất kỳ lúc nào bằng cách gửi email tới: tech@toplinefurniture.vn hoặc info@toplinefurniture.vn.'
                : 'You have the right to request access, correction, or deletion of your project records at any time by contacting our data protection desk at: tech@toplinefurniture.vn or info@toplinefurniture.vn.'}
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
