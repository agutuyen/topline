import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './common/Reveal';

interface AboutSectionProps {
  lang: Language;
  onOpenRFQ: () => void;
}

export default function AboutSection({ lang, onOpenRFQ }: AboutSectionProps) {
  const info = COMPANY_INFO[lang];

  const stats = [
    {
      value: '2013',
      label: lang === 'vi' ? 'Hành trình thương hiệu' : 'Brand Journey',
      sub: lang === 'vi' ? 'Khởi xướng bởi Don Winston' : 'Founded by Don Winston',
    },
    {
      value: '100%',
      label: lang === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom Manufacturing',
      sub: lang === 'vi' ? 'Gia công theo đúng bản vẽ kỹ thuật' : 'Bespoke to drawing specs',
    },
    {
      value: '100% QC',
      label: lang === 'vi' ? 'Kiểm soát chất lượng' : 'Quality Control',
      sub: lang === 'vi' ? 'Kiểm thử từng kiện hàng xuất xưởng' : 'Full batch bench tested',
    },
    {
      value: 'GLOBAL',
      label: lang === 'vi' ? 'Tiêu chuẩn xuất khẩu' : 'Export Quality',
      sub: lang === 'vi' ? 'Dung sai ±1.0mm · Độ ẩm < 12%' : '±1.0mm BOM · Moisture < 12%',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F4F3F0] text-[#191919] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header with smooth entrance */}
        <Reveal className="max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919] leading-tight">
            {lang === 'vi' ? 'Năng Lực Sản Xuất Nội Thất Theo Yêu Cầu' : 'Custom Furniture Manufacturing Capabilities'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#191919]/75 font-light leading-relaxed max-w-3xl">
            {lang === 'vi'
              ? 'Kết hợp sự tỉ mỉ của tay nghề mộc bản truyền thống với quy trình gia công chính xác trên quy mô lớn, TopLine Furniture là đối tác sản xuất chiến lược đồng hành cùng các nhà thiết kế và chủ đầu tư quốc tế.'
              : 'Combining the meticulous precision of artisanal joinery with large-scale contract manufacturing execution, TopLine Furniture operates as a strategic production partner for international developers and designers.'}
          </p>
        </Reveal>

        {/* 4 Architectural Metric Pillars with staggered entrance */}
        <StaggerContainer className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between h-full">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-[#C5A880]">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-medium text-[#191919] block mt-1.5">
                    {stat.label}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-light block mt-2 border-t border-gray-100 pt-2">
                  {stat.sub}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 2-Column Perfectly Balanced Facility & Legal Identity Grid */}
        <StaggerContainer className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Card: Manufacturing Facility Details */}
          <StaggerItem className="h-full">
            <div className="luxury-card h-full">
              <div className="luxury-card-inner flex flex-col justify-between h-full bg-white">
                {/* Facility Photography */}
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src="/images/profile/factory-overview.png"
                      alt="TopLine Furniture Factory Vietnam"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                      {lang === 'vi' ? 'CƠ SỞ SẢN XUẤT · BÌNH DƯƠNG' : 'FACILITY · BINH DUONG, VIETNAM'}
                    </div>
                  </div>

                  {/* Facility Narrative & Specs */}
                  <div className="p-7 sm:p-8 space-y-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#191919]">
                      {lang === 'vi'
                        ? 'Nhà Xưởng Chế Tác Mộc Bản & Dây Chuyền Hoàn Thiện'
                        : 'Bench-Made Joinery & Export Finishing Lines'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#191919]/75 leading-relaxed font-light">
                      {lang === 'vi'
                        ? 'Quy trình sản xuất khép kín tại nhà xưởng: từ bóc tách bản vẽ kỹ thuật, làm mẫu thử (mock-up), tuyển chọn tom gỗ và đá tự nhiên đến công đoạn lắp ráp cơ khí chính xác và đóng kiện xuất khẩu.'
                        : 'Closed-loop in-house manufacturing: from CAD shop drawing engineering and master golden mock-ups to precision CNC machining, hand-finishing, and export crating.'}
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#FAF9F6] border border-gray-100">
                        <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">
                          {lang === 'vi' ? 'Dung sai kỹ thuật' : 'BOM Tolerance'}
                        </span>
                        <span className="font-semibold text-[#191919]">±1.0 mm (BOM Standard)</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#FAF9F6] border border-gray-100">
                        <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">
                          {lang === 'vi' ? 'Kiểm soát độ ẩm' : 'Kiln Moisture'}
                        </span>
                        <span className="font-semibold text-[#191919]">&lt; 10–12% (Export Crated)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Address */}
                <div className="p-7 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-[#191919]/70">
                    <span className="text-[#C5A880] font-bold">📍</span>
                    <span>{info.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Right Card: Institutional Credentials & Legal Entity */}
          <StaggerItem className="h-full">
            <div className="luxury-card h-full">
              <div className="luxury-card-inner p-7 sm:p-9 flex flex-col justify-between h-full bg-white">
                <div>
                  {/* Official Legal Status Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === 'vi' ? 'DOANH NGHIỆP PHÁP LÝ CHÍNH THỨC' : 'OFFICIAL REGISTERED ENTITY'}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {lang === 'vi' ? 'MST' : 'Tax ID'}: {info.taxId}
                    </span>
                  </div>

                  <h4 className="mt-4 font-serif text-xl sm:text-2xl text-[#191919] font-medium leading-snug">
                    {info.officialName}
                  </h4>
                  <p className="mt-1 text-xs text-[#191919]/60 font-mono">
                    {info.internationalName}
                  </p>

                  {/* Structured Credential Rows */}
                  <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#191919]/80 divide-y divide-gray-100">
                    <div className="pt-2 flex justify-between">
                      <span className="text-[#191919]/60">{lang === 'vi' ? 'Ngày cấp ĐKKD:' : 'Registration Date:'}</span>
                      <span className="font-semibold text-[#191919]">{info.registrationDate}</span>
                    </div>
                    <div className="pt-3 flex justify-between">
                      <span className="text-[#191919]/60">{lang === 'vi' ? 'Đại diện pháp luật:' : 'Director / Legal Rep:'}</span>
                      <span className="font-semibold text-[#191919]">{info.legalRepresentative}</span>
                    </div>
                    <div className="pt-3 flex justify-between">
                      <span className="text-[#191919]/60">{lang === 'vi' ? 'Lĩnh vực hoạt động:' : 'Core Capability:'}</span>
                      <span className="font-medium text-[#191919] text-right max-w-[65%]">{info.coreActivity}</span>
                    </div>
                    <div className="pt-3 flex flex-col gap-1 bg-[#FAF9F6] p-3 rounded-lg border border-gray-100">
                      <span className="text-[11px] font-semibold text-[#A68A56] uppercase tracking-wider">
                        {lang === 'vi' ? 'Hồ sơ năng lực & Pháp lý:' : 'Compliance & Contract Capability:'}
                      </span>
                      <span className="text-[11px] text-[#191919]/70 leading-relaxed">
                        {lang === 'vi'
                          ? 'Doanh nghiệp sản xuất chính ngạch, đầy đủ tư cách pháp nhân ký hợp đồng kinh tế, bảo lãnh dự án và xuất hóa đơn VAT theo quy định pháp luật Việt Nam.'
                          : 'Fully registered corporate entity in Vietnam, eligible for commercial contract execution, export compliance, project warranties, and official VAT invoicing.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Hotline & RFQ Trigger */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[#191919]/60">{lang === 'vi' ? 'Đường dây nóng:' : 'Direct Hotline:'}</span>{' '}
                    <a href="tel:0977429979" className="font-bold text-[#191919] hover:text-[#C5A880] transition-colors">
                      {info.phoneDisplay}
                    </a>
                  </div>
                  <button
                    onClick={onOpenRFQ}
                    className="px-4 py-2 bg-[#191919] hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                  >
                    <span>{lang === 'vi' ? 'Gửi Hồ Sơ Dự Án' : 'Send RFP'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
