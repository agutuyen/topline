import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import TopLineLogo from './TopLineLogo';

interface FooterProps {
  lang: Language;
  onOpenRFQ: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function Footer({ lang, onOpenRFQ, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const info = COMPANY_INFO[lang];

  return (
    <footer id="contact" className="bg-[#0D0D0D] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity & Summary (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <TopLineLogo variant="compact" theme="light" />
              <p className="mt-5 text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-sm">
                {lang === 'vi'
                  ? 'Công ty sản xuất nội thất may đo cao cấp cho các công trình khách sạn, kiến trúc ốp gỗ (millwork) và bộ sưu tập xuất khẩu quốc tế từ Việt Nam.'
                  : 'Bespoke hospitality casegoods, architectural millwork, and design-led furniture manufacturing from Vietnam for international clients.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50 space-y-1">
              <div>{lang === 'vi' ? 'MST Doanh Nghiệp:' : 'Business Tax ID:'} <span className="text-white font-mono">{info.taxId}</span></div>
              <div>{lang === 'vi' ? 'Đại diện pháp luật:' : 'Managing Director:'} <span className="text-white">{info.legalRepresentative}</span></div>
              <div>{lang === 'vi' ? 'Vốn điều lệ:' : 'Charter Capital:'} <span className="text-white">{info.charterCapital}</span></div>
            </div>
          </div>

          {/* Contact & Facility Channels (4 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">
              {lang === 'vi' ? 'THÔNG TIN LIÊN HỆ & NHÀ XƯỞNG' : 'CONTACT & FACTORY DETAILS'}
            </span>

            <div className="flex items-start gap-3 text-white/80">
              <span className="text-[#C5A880] text-sm">📍</span>
              <div>
                <span className="text-white font-medium block">
                  {lang === 'vi' ? 'Trụ Sở & Xưởng Sản Xuất:' : 'Factory & Headquarters:'}
                </span>
                <span className="text-white/60 text-xs leading-relaxed mt-0.5 block">
                  {info.address}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-white/80 pt-2">
              <span className="text-[#C5A880] text-sm">📞</span>
              <div>
                <span className="text-white font-medium block">
                  {lang === 'vi' ? 'Điện Thoại / Hotline Zalo:' : 'Hotline / WhatsApp / Zalo:'}
                </span>
                <a
                  href="tel:0977429979"
                  className="text-white/90 font-mono text-sm hover:text-[#C5A880] transition-colors mt-0.5 block"
                >
                  {info.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-white/80 pt-2">
              <span className="text-[#C5A880] text-sm">✉️</span>
              <div className="space-y-1">
                <span className="text-white font-medium block">
                  {lang === 'vi' ? 'Hộp Thư Doanh Nghiệp:' : 'Official Corporate Emails:'}
                </span>
                <div className="text-xs text-white/70">
                  <span className="text-white/40">General:</span>{' '}
                  <a href={`mailto:${info.email}`} className="text-white/90 hover:text-[#C5A880] transition-colors">
                    {info.email}
                  </a>
                </div>
                <div className="text-xs text-white/70">
                  <span className="text-white/40">Sales / RFQ:</span>{' '}
                  <a href={`mailto:${info.salesEmail}`} className="text-[#C5A880] hover:underline">
                    {info.salesEmail}
                  </a>
                </div>
                <div className="text-xs text-white/70">
                  <span className="text-white/40">Technical / API:</span>{' '}
                  <a href={`mailto:${info.techEmail}`} className="text-white/90 hover:text-[#C5A880] transition-colors">
                    {info.techEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & RFQ Action (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] block mb-4">
                {lang === 'vi' ? 'DANH MỤC NHANH' : 'NAVIGATION'}
              </span>
              <ul className="space-y-2 text-xs uppercase tracking-wider text-white/70">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    {lang === 'vi' ? '― Về Chúng Tôi' : '― About Factory'}
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-white transition-colors">
                    {lang === 'vi' ? '― Năng Lực Cốt Lõi' : '― Core Sectors'}
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-white transition-colors">
                    {lang === 'vi' ? '― Bộ Sưu Tập Gỗ & Đá' : '― Furniture Collections'}
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-white transition-colors">
                    {lang === 'vi' ? '― Quy Trình 5 Bước' : '― Quality Workflow'}
                  </a>
                </li>
                <li>
                  <a href="#clients" className="hover:text-white transition-colors">
                    {lang === 'vi' ? '― Dự Án F&B Quốc Tế' : '― Commercial Projects'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onOpenRFQ}
                className="w-full py-3 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-white transition-colors cursor-pointer text-center"
              >
                {lang === 'vi' ? 'Gửi Yêu Cầu Dự Án' : 'Request RFQ Online'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} {info.officialName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer underline text-[11px]"
            >
              {lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer underline text-[11px]"
            >
              {lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Use'}
            </button>
            <span>{lang === 'vi' ? 'ĐKKD: 3703519683 (09/10/2026)' : 'Registration: 3703519683 (Oct 09, 2026)'}</span>
            <span>{lang === 'vi' ? 'Xuất xứ: Việt Nam' : 'Origin: Vietnam'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
