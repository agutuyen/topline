import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO, CORE_SECTORS } from '../data/content';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
  onOpenRFQ: () => void;
}

export default function AboutSection({ lang, onOpenRFQ }: AboutSectionProps) {
  const info = COMPANY_INFO[lang];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F4F3F0] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#A68A56]">
            01 / {lang === 'vi' ? 'VỀ CHÚNG TÔI' : 'COMPANY PROFILE'}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919]">
            {lang === 'vi' ? 'Nhà Xưởng Chế Tác May Đo Chuẩn Quốc Tế' : 'Our Manufacturing Base & Vision'}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#191919]/75 font-light leading-relaxed">
            {info.foundingStory}
          </p>
        </div>

        {/* Factory Facility Feature Bento */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Factory Image & Badge (7 cols) */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl shadow-md border border-gray-200/80 bg-white">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
              alt="TopLine Furniture Factory Vietnam"
              className="w-full h-80 sm:h-96 md:h-110 object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            {/* Overlay Caption */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                {lang === 'vi' ? 'CƠ SỞ SẢN XUẤT VIỆT NAM' : 'MANUFACTURING FACILITY - VIETNAM'}
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl font-normal">
                {lang === 'vi'
                  ? 'Đội ngũ kỹ thuật, thợ mộc mộc bản & dây chuyền hoàn thiện xuất khẩu'
                  : 'Custom development, precision machining & export finishing lines'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl">
                {lang === 'vi'
                  ? 'Hiện thực hóa ý đồ thiết kế thành sản phẩm nội thất hoàn thiện thông qua sự am hiểu vật liệu, kỹ thuật tạo mẫu và quy trình kiểm soát kỷ luật.'
                  : 'Translating design intent into production-ready furniture through material knowledge, engineering, sampling and disciplined execution.'}
              </p>
            </div>
          </div>

          {/* Legal Identity & Institutional Trust Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white p-7 sm:p-9 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {lang === 'vi' ? 'DOANH NGHIỆP PHÁP LÝ CHÍNH THỨC' : 'OFFICIAL REGISTERED ENTITY'}
                </span>
                <span className="text-xs font-mono text-gray-400">MST: {info.taxId}</span>
              </div>

              <h4 className="mt-4 font-serif text-xl text-[#191919] font-medium leading-snug">
                {info.officialName}
              </h4>
              <p className="mt-1 text-xs text-[#191919]/60 font-mono">
                {info.internationalName}
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#191919]/80 divide-y divide-gray-100">
              <div className="pt-2 flex justify-between">
                <span className="text-[#191919]/60">{lang === 'vi' ? 'Đại diện pháp luật:' : 'Director / Legal Rep:'}</span>
                <span className="font-semibold text-[#191919]">{info.legalRepresentative}</span>
              </div>
              <div className="pt-3 flex justify-between">
                <span className="text-[#191919]/60">{lang === 'vi' ? 'Vốn điều lệ:' : 'Charter Capital:'}</span>
                <span className="font-semibold text-[#191919]">{info.charterCapital}</span>
              </div>
              <div className="pt-3 flex justify-between">
                <span className="text-[#191919]/60">{lang === 'vi' ? 'Thành viên góp vốn:' : 'Shareholders:'}</span>
                <span className="font-medium text-[#191919] text-right">
                  Trần Văn Đương (55%) <br /> Trần Thanh Nhàn (45%)
                </span>
              </div>
              <div className="pt-3 flex flex-col gap-1">
                <span className="text-[#191919]/60">{lang === 'vi' ? 'Địa chỉ nhà máy & trụ sở:' : 'Factory & HQ Address:'}</span>
                <span className="font-medium text-[#191919] text-xs leading-relaxed">
                  {info.address}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[#191919]/60">{lang === 'vi' ? 'Đường dây nóng:' : 'Direct Hotline:'}</span>{' '}
                <a href="tel:0977429979" className="font-bold text-[#191919] hover:text-[#C5A880]">
                  {info.phoneDisplay}
                </a>
              </div>
              <button
                onClick={onOpenRFQ}
                className="text-xs font-semibold text-[#A68A56] hover:text-[#191919] flex items-center gap-1 group cursor-pointer"
              >
                <span>{lang === 'vi' ? 'Gửi Hồ Sơ Dự Án' : 'Send RFP'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Sectors Cards (Hospitality | Millwork | Retail) */}
        <div id="capabilities" className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#A68A56]">
              02 / {lang === 'vi' ? 'LĨNH VỰC NĂNG LỰC CỐT LÕI' : 'CORE SECTORS'}
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl text-[#191919]">
              {lang === 'vi' ? 'Chuyên Môn Hóa Theo Từng Dự Án' : 'Tailored For Demanding Environments'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CORE_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="bg-white rounded-xl p-7 sm:p-8 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1 rounded-sm bg-[#F4F3F0] text-[#A68A56]">
                      {sector.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">0{CORE_SECTORS.indexOf(sector) + 1}</span>
                  </div>

                  <h4 className="mt-5 font-serif text-xl sm:text-2xl font-normal text-[#191919]">
                    {sector.title[lang]}
                  </h4>
                  <p className="text-xs font-medium text-[#A68A56] mt-1">
                    {sector.subtitle[lang]}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
                    {sector.desc[lang]}
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#191919]/60 block mb-2.5">
                      {lang === 'vi' ? 'Hạng mục tiêu biểu:' : 'Key Deliverables:'}
                    </span>
                    <ul className="space-y-2 text-xs text-[#191919]/80">
                      {sector.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#C5A880] font-bold">―</span>
                          <span>{cap[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={onOpenRFQ}
                  className="mt-8 w-full py-2.5 px-4 rounded-lg bg-[#FAF9F6] hover:bg-[#191919] hover:text-white text-[#191919] text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'vi' ? 'Báo Giá Mảng Này' : 'Inquire This Sector'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
