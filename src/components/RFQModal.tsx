import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, ProductItem, RFQFormData } from '../types';

interface RFQModalProps {
  isOpen: boolean;
  lang: Language;
  selectedProducts: ProductItem[];
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
}

export default function RFQModal({
  isOpen,
  lang,
  selectedProducts,
  onClose,
  onRemoveProduct,
}: RFQModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: 'Khách sạn / Resort (Hospitality)',
    selectedProducts: selectedProducts.map((p) => p.name[lang]),
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-9 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-gray-400 hover:text-[#191919] p-1.5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
              {lang === 'vi' ? 'Tiếp Nhận Yêu Cầu Báo Giá Thành Công' : 'Project RFQ Submitted Successfully'}
            </h3>
            <p className="mt-3 text-sm text-[#191919]/70 leading-relaxed max-w-md mx-auto">
              {lang === 'vi'
                ? `Cảm ơn ${formData.fullName || 'Quý khách'}. Đội ngũ kỹ thuật & dự án của TopLine Furniture (Mr. Trần Văn Đương) sẽ liên hệ trực tiếp trong vòng 2 giờ làm việc.`
                : `Thank you, ${formData.fullName || 'there'}. Our commercial estimation team (Director Tran Van Duong) will contact you shortly with full BOM pricing.`}
            </p>

            <div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-gray-200/80 text-left text-xs space-y-2">
              <div className="font-semibold text-[#191919]">
                {lang === 'vi' ? 'Thông tin tiếp nhận:' : 'Inquiry Summary:'}
              </div>
              <div className="text-gray-600">
                {formData.companyName ? `${formData.companyName} · ` : ''}{formData.projectType}
              </div>
              {selectedProducts.length > 0 && (
                <div className="pt-2 border-t border-gray-200 text-gray-700">
                  <span className="font-medium text-[#191919]">
                    {lang === 'vi' ? 'Sản phẩm đã chọn:' : 'Selected Items:'}
                  </span>{' '}
                  {selectedProducts.map((p) => p.name[lang]).join(', ')}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0977429979"
                className="flex-1 py-3 bg-[#191919] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#C5A880] hover:text-[#191919] transition-colors text-center"
              >
                {lang === 'vi' ? 'Gọi Ngay Hotline 0977 429 979' : 'Call Direct Hotline (+84) 977 429 979'}
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-3 px-6 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'Hoàn tất' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A68A56] font-semibold">
              {lang === 'vi' ? 'TIẾP NHẬN BÁO GIÁ DỰ ÁN' : 'PROJECT RFQ & ESTIMATION'}
            </span>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
              {lang === 'vi' ? 'Yêu Cầu Báo Giá & Tư Vấn Kỹ Thuật' : 'Request Commercial Quotation'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
              {lang === 'vi'
                ? 'Nhận báo giá chi tiết, tiến độ mẫu thử (mock-up) và tư vấn phương án vật liệu tối ưu cho công trình của bạn.'
                : 'Receive detailed unit pricing, sampling timeline, and value-engineering options tailored for your project drawings.'}
            </p>

            {/* Selected items tray */}
            {selectedProducts.length > 0 && (
              <div className="mt-5 p-3.5 rounded-xl bg-[#FAF9F6] border border-gray-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 block mb-2">
                  {lang === 'vi'
                    ? `Sản phẩm bạn đang quan tâm (${selectedProducts.length}):`
                    : `Selected Products (${selectedProducts.length}):`}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-xs text-[#191919] font-medium"
                    >
                      <span>{p.name[lang]}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveProduct(p.id)}
                        className="text-gray-400 hover:text-red-500 text-xs ml-1 cursor-pointer"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                    {lang === 'vi' ? 'Họ và tên người liên hệ *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'Mr. John Smith'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                    {lang === 'vi' ? 'Số điện thoại / Zalo *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0977 429 979"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                    {lang === 'vi' ? 'Email doanh nghiệp *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="project@hospitality.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                    {lang === 'vi' ? 'Tên đơn vị / Tên dự án' : 'Company / Project Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'vi' ? 'Vinpearl Resort / Novotel Suite...' : 'Grand Hyatt Foyer Project'}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                  {lang === 'vi' ? 'Loại hình dự án' : 'Project Typology'}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                >
                  <option value="Khách sạn / Resort (Hospitality)">
                    {lang === 'vi' ? 'Khách sạn / Resort (Hospitality)' : 'Luxury Hotel / Resort'}
                  </option>
                  <option value="Nhà hàng / F&B Chain (Commercial Millwork)">
                    {lang === 'vi' ? 'Chuỗi nhà hàng F&B / Quầy kệ thương mại' : 'F&B Chain / Architectural Millwork'}
                  </option>
                  <option value="Căn hộ cao cấp / Penthouse">
                    {lang === 'vi' ? 'Căn hộ cao cấp / Penthouse' : 'Luxury Residential / Penthouse'}
                  </option>
                  <option value="Đơn hàng bán lẻ xuất khẩu (Retail)">
                    {lang === 'vi' ? 'Đơn hàng bán lẻ xuất khẩu (Retail Collections)' : 'Retail Furniture Brand / Export'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191919]/80 mb-1.5">
                  {lang === 'vi' ? 'Yêu cầu quy cách, số lượng hoặc ghi chú' : 'Scope Details / Quantity / Notes'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'vi'
                      ? 'Ví dụ: 80 bộ casegoods phòng khách sạn, yêu cầu gỗ sồi tự nhiên kết hợp đá Dark Emperador, tiến độ thi công tháng 11...'
                      : 'E.g., 80 sets of guestroom casegoods, natural oak veneer with Dark Emperador marble...'
                  }
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3.5 bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{lang === 'vi' ? 'Gửi Yêu Cầu Báo Giá Kỹ Thuật' : 'Submit Commercial RFQ'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
