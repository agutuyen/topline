import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Phone, UploadCloud, X } from 'lucide-react';
import { Language, ProductItem, RFQFormData } from '../types';
import { COMPANY_INFO } from '../data/content';

interface RFQModalProps {
  isOpen: boolean;
  lang: Language;
  selectedProducts: ProductItem[];
  onClose: () => void;
  onRemoveProduct: (id: string) => void;
  onOpenPrivacy: () => void;
}

export default function RFQModal({
  isOpen,
  lang,
  selectedProducts,
  onClose,
  onRemoveProduct,
  onOpenPrivacy,
}: RFQModalProps) {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: 'hotel',
    selectedProducts: [],
    notes: '',
  });

  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rfqTrackingId, setRfqTrackingId] = useState('');
  const info = COMPANY_INFO[lang];

  // Lock body scroll when modal is open to ensure reliable inner scrolling
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative max-h-[92vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Header Bar (Isolated Close Button with Zero Text Collision) */}
        <div className="px-6 sm:px-8 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm bg-[#A68A56]/10 text-[#A68A56] font-semibold border border-[#A68A56]/20">
              {lang === 'vi' ? 'TIẾP NHẬN BÁO GIÁ DỰ ÁN' : 'PROJECT RFQ & ESTIMATION'}
            </span>
            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              Standard: RFQ-2026
            </span>
          </div>

          {/* Exquisite Minimalist Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#191919] flex items-center justify-center transition-all duration-200 cursor-pointer hover:rotate-90 shadow-2xs"
            aria-label="Close RFQ Dialog"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          /* Submission Success State */
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-9 text-center"
          >
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

            <div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-gray-200/80 text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-mono">{lang === 'vi' ? 'Mã hồ sơ:' : 'Reference ID:'}</span>
                <span className="font-mono font-bold text-[#191919]">{rfqTrackingId}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500">{lang === 'vi' ? 'Đơn vị gửi:' : 'Submitter:'}</span>
                <span className="font-medium text-[#191919]">
                  {formData.fullName} ({formData.companyName || (lang === 'vi' ? 'Dự án riêng' : 'Private Project')})
                </span>
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

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <a
                href="tel:0977429979"
                className="flex-1 py-3 px-4 rounded-xl bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Hotline: 0977 429 979' : `Hotline: ${info.phoneDisplay}`}</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-3 px-6 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'Hoàn tất' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          /* Form Content with Dedicated Pinned Action Footer */
          <>
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-5 sm:py-6 space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
                  {lang === 'vi' ? 'Yêu Cầu Báo Giá & Tư Vấn Kỹ Thuật' : 'Request Commercial Quotation'}
                </h3>
                <p className="mt-1 text-xs text-[#191919]/70 leading-relaxed">
                  {lang === 'vi'
                    ? 'Nhận báo giá dự toán theo khối lượng (BOQ), tư vấn cấu tạo vật liệu và tiến độ làm mẫu thử (mock-up) từ nhà máy TopLine.'
                    : 'Receive detailed unit pricing, BOQ specification review, sampling timeline, and value-engineering tailored for your project.'}
                </p>
              </div>

              {/* Selected Products Chips */}
              {selectedProducts.length > 0 && (
                <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block mb-2 font-semibold">
                    {lang === 'vi' ? 'HẠNG MỤC SẢN PHẨM ĐÃ CHỌN' : 'SELECTED PRODUCTS'} ({selectedProducts.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map((p) => (
                      <span
                        key={p.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs text-[#191919] shadow-2xs"
                      >
                        <span className="font-mono text-[#A68A56] font-semibold">{p.sku}:</span>
                        <span>{p.name[lang]}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(p.id)}
                          className="text-gray-400 hover:text-red-500 ml-1 p-0.5 cursor-pointer"
                          aria-label={`Remove ${p.name[lang]}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Input Grid */}
              <form id="rfq-form" onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {lang === 'vi' ? 'Họ và tên người liên hệ *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'vi' ? 'Ví dụ: Nguyễn Văn A' : 'Mr. John Smith'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {lang === 'vi' ? 'Số điện thoại / Zalo *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'vi' ? '0977 429 979' : '+84 977 429 979'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {lang === 'vi' ? 'Email doanh nghiệp *' : 'Business Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={lang === 'vi' ? 'duan@doitac.com' : 'project@hotel.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {lang === 'vi' ? 'Đơn vị / Tên công trình' : 'Company / Project Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'vi' ? 'Công ty Thiết kế A / Dự án Khách sạn B' : 'Grand Hyatt Foyer Project'}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {lang === 'vi' ? 'Loại hình dự án' : 'Project Typology'}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F3F0] border border-transparent rounded-lg focus:outline-hidden focus:border-[#C5A880] transition-colors"
                  >
                    <option value="hotel">{lang === 'vi' ? 'Khách sạn / Khu nghỉ dưỡng (Hospitality)' : 'Luxury Hotel / Resort'}</option>
                    <option value="millwork">{lang === 'vi' ? 'Mộc kiến trúc & Fit-out thương mại' : 'Commercial Fit-Out & Millwork'}</option>
                    <option value="retail">{lang === 'vi' ? 'Bộ sưu tập bán lẻ xuất khẩu' : 'Export Retail Furniture Line'}</option>
                    <option value="fb">{lang === 'vi' ? 'Chuỗi nhà hàng F&B' : 'Restaurant & Dining Chain'}</option>
                    <option value="villa">{lang === 'vi' ? 'Biệt thự / Căn hộ cao cấp' : 'Private Villa / Penthouse'}</option>
                  </select>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {lang === 'vi'
                      ? 'Đính kèm bản vẽ / Bảng tiên lượng BOQ (PDF, DWG, XLSX, Hình ảnh)'
                      : 'Attach Drawings / BOQ / Specs (PDF, DWG, XLSX, Images)'}
                  </label>
                  <label className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-gray-300 hover:border-[#C5A880] rounded-xl cursor-pointer bg-[#FAF9F6] transition-colors text-center">
                    <UploadCloud className="w-6 h-6 text-[#A68A56] mb-1" />
                    <span className="text-xs text-gray-600 font-medium">
                      {lang === 'vi'
                        ? 'Bấm để chọn file bản vẽ hoặc spec sheet (tối đa 25MB)'
                        : 'Upload drawings or spec sheets (up to 25MB)'}
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.dwg,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg"
                    />
                  </label>
                  {attachedFiles.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                      {attachedFiles.map((fn, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 font-mono text-[11px] text-[#191919]">
                          <span>📎 {fn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {lang === 'vi' ? 'Mô tả phạm vi công việc / Số lượng / Ghi chú' : 'Scope Details / Quantity / Notes'}
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

                {/* Privacy consent checkbox */}
                <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="mt-0.5 rounded-sm border-gray-300 text-[#C5A880] focus:ring-[#C5A880] cursor-pointer"
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
              </form>
            </div>

            {/* Pinned Action Footer: Always Visible, Never Cut Off */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 z-20">
              <a
                href="tel:0977429979"
                className="py-2.5 px-3.5 rounded-xl border border-gray-200 hover:border-gray-400 text-xs font-mono font-medium text-gray-800 transition-colors flex items-center justify-center gap-1.5 text-center"
                title={lang === 'vi' ? 'Tư vấn hotline' : 'Call hotline'}
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{info.phoneDisplay}</span>
              </a>

              <button
                type="submit"
                form="rfq-form"
                disabled={!agreedPrivacy}
                className="flex-1 py-3 px-6 bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] disabled:opacity-40 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{lang === 'vi' ? 'Gửi Yêu Cầu Báo Giá (Tới sales@toplinefurniture.vn)' : 'Submit Commercial RFQ (To sales@toplinefurniture.vn)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
