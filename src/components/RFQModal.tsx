import { useState } from 'react';
import { ArrowRight, UploadCloud, CheckCircle2, Phone } from 'lucide-react';
import { Language, ProductItem, RFQFormData } from '../types';

interface RFQModalProps {
  isOpen: boolean;
  lang: Language;
  selectedProducts: ProductItem[];
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onOpenPrivacy?: () => void;
}

export default function RFQModal({
  isOpen,
  lang,
  selectedProducts,
  onClose,
  onRemoveProduct,
  onOpenPrivacy,
}: RFQModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [rfqTrackingId, setRfqTrackingId] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [agreedPrivacy, setAgreedPrivacy] = useState(true);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedPrivacy) return;

    // Generate standard RFQ tracking code per spec: RFQ-YYYY-#####
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const tracking = `RFQ-2026-${randomCode}`;
    setRfqTrackingId(tracking);
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
          <div className="py-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-50 rounded-full inline-block mb-2">
              {rfqTrackingId}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
              {lang === 'vi' ? 'Tiếp Nhận Yêu Cầu Báo Giá Thành Công' : 'Project RFQ Submitted Successfully'}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#191919]/70 leading-relaxed max-w-lg mx-auto">
              {lang === 'vi'
                ? `Hồ sơ đã được chuyển tiếp trực tiếp đến Bộ phận Dự án & Ước tính Giá (sales@toplinefurniture.vn). Kỹ sư dự án của TopLine Furniture sẽ liên hệ trong 2–4 giờ làm việc để rà soát bản vẽ.`
                : `Your inquiry has been logged and routed to our project estimation desk (sales@toplinefurniture.vn). Our engineering team will review your drawings and respond within 24 hours.`}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#FAF9F6] border border-gray-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-mono">{lang === 'vi' ? 'Mã hồ sơ:' : 'Reference ID:'}</span>
                <span className="font-mono font-bold text-[#191919]">{rfqTrackingId}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500">{lang === 'vi' ? 'Đơn vị gửi:' : 'Submitter:'}</span>
                <span className="font-medium text-[#191919]">{formData.fullName} ({formData.companyName || 'Dự án riêng'})</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500">{lang === 'vi' ? 'Email tiếp nhận:' : 'Routing Desk:'}</span>
                <span className="font-mono text-[#A68A56]">sales@toplinefurniture.vn</span>
              </div>
              {attachedFiles.length > 0 && (
                <div className="pt-2 border-t border-gray-200 text-gray-700">
                  <span className="font-medium text-[#191919]">
                    {lang === 'vi' ? 'Tài liệu đính kèm:' : 'Attached Files:'}
                  </span>{' '}
                  {attachedFiles.join(', ')}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0977429979"
                className="flex-1 py-3 bg-[#191919] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#C5A880] hover:text-[#191919] transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Hotline Kỹ Thuật: 0977 429 979' : 'Direct Line: (+84) 977 429 979'}</span>
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
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A68A56] font-semibold">
                {lang === 'vi' ? 'TIẾP NHẬN BÁO GIÁ DỰ ÁN' : 'PROJECT RFQ & ESTIMATION'}
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                Standard: RFQ-2026
              </span>
            </div>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
              {lang === 'vi' ? 'Yêu Cầu Báo Giá & Tư Vấn Kỹ Thuật' : 'Request Commercial Quotation'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
              {lang === 'vi'
                ? 'Nhận báo giá chi tiết, bóc tách khối lượng (BOQ), tiến độ mẫu thử (mock-up) và tư vấn phương án sản xuất tối ưu.'
                : 'Receive detailed unit pricing, BOQ specification review, sampling timeline, and value-engineering tailored for your project.'}
            </p>

            {/* Selected items tray */}
            {selectedProducts.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-[#FAF9F6] border border-gray-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 block mb-1.5">
                  {lang === 'vi'
                    ? `Sản phẩm đã chọn (${selectedProducts.length}):`
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

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                    {lang === 'vi' ? 'Họ và tên người liên hệ *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'Mr. John Smith'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                    {lang === 'vi' ? 'Số điện thoại / Zalo *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0977 429 979"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                    {lang === 'vi' ? 'Email doanh nghiệp *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="project@hotel.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                    {lang === 'vi' ? 'Tên đơn vị / Tên dự án' : 'Company / Project Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'vi' ? 'Novotel Suite / Resort...' : 'Grand Hyatt Foyer Project'}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                  {lang === 'vi' ? 'Loại hình dự án' : 'Project Typology'}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                >
                  <option value="Khách sạn / Resort (Hospitality)">
                    {lang === 'vi' ? 'Khách sạn / Resort (Hospitality)' : 'Luxury Hotel / Resort'}
                  </option>
                  <option value="Chuỗi nhà hàng F&B / Quầy kệ mộc kiến trúc (Millwork)">
                    {lang === 'vi' ? 'Chuỗi nhà hàng F&B / Quầy kệ mộc kiến trúc (Millwork)' : 'F&B Chain / Architectural Millwork'}
                  </option>
                  <option value="Căn hộ cao cấp / Penthouse">
                    {lang === 'vi' ? 'Căn hộ cao cấp / Penthouse' : 'Luxury Residential / Penthouse'}
                  </option>
                  <option value="Đơn hàng bán lẻ xuất khẩu (Retail)">
                    {lang === 'vi' ? 'Đơn hàng bán lẻ xuất khẩu (Retail Collections)' : 'Retail Furniture Brand / Export'}
                  </option>
                </select>
              </div>

              {/* File upload section per RFQ-01 / RFQ-02 spec */}
              <div>
                <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                  {lang === 'vi' ? 'Đính kèm bản vẽ / BOQ / Phối cảnh (PDF, DWG, XLSX, JPG, PNG)' : 'Attach Drawings / BOQ / Specs (PDF, DWG, XLSX, Images)'}
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-[#FAF9F6] hover:bg-gray-100 transition-colors cursor-pointer text-xs text-gray-600">
                  <UploadCloud className="w-4 h-4 text-[#A68A56]" />
                  <span>
                    {attachedFiles.length > 0
                      ? `${attachedFiles.length} file(s): ${attachedFiles.slice(0, 2).join(', ')}${attachedFiles.length > 2 ? '...' : ''}`
                      : lang === 'vi' ? 'Tải lên bản vẽ kỹ thuật hoặc thông số' : 'Upload drawings or spec sheets (up to 25MB)'}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.dxf,.xlsx,.xls,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191919]/80 mb-1">
                  {lang === 'vi' ? 'Yêu cầu quy cách, số lượng hoặc ghi chú' : 'Scope Details / Quantity / Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    lang === 'vi'
                      ? 'Ví dụ: 80 bộ casegoods phòng khách sạn, yêu cầu veneer sồi tự nhiên kết hợp đá Dark Emperador, tiến độ thi công tháng 11...'
                      : 'E.g., 80 sets of guestroom casegoods, natural oak veneer with Dark Emperador marble...'
                  }
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                />
              </div>

              {/* Privacy consent checkbox per spec */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  className="mt-0.5 rounded-sm border-gray-300 text-[#C5A880] focus:ring-[#C5A880]"
                  required
                />
                <label htmlFor="privacy-consent" className="cursor-pointer">
                  {lang === 'vi' ? (
                    <>
                      Tôi đồng ý để TopLine Furniture xử lý thông tin và bản vẽ dự án theo{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-[#A68A56] underline cursor-pointer"
                      >
                        Chính sách bảo mật dữ liệu B2B
                      </button>.
                    </>
                  ) : (
                    <>
                      I consent to TopLine Furniture reviewing project drawings in accordance with the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-[#A68A56] underline cursor-pointer"
                      >
                        B2B Data Privacy Policy
                      </button>.
                    </>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreedPrivacy}
                className="w-full py-3.5 bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{lang === 'vi' ? 'Gửi Yêu Cầu Báo Giá (Gửi tới sales@toplinefurniture.vn)' : 'Submit Commercial RFQ (Routes to sales@toplinefurniture.vn)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
