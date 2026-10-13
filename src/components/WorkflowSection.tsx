import { WORKFLOW_STEPS } from '../data/content';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './common/Reveal';

interface WorkflowSectionProps {
  lang: Language;
}

export default function WorkflowSection({ lang }: WorkflowSectionProps) {
  return (
    <section id="workflow" className="py-20 md:py-28 bg-[#F4F3F0] text-[#191919] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header with smooth entrance */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#191919]">
            {lang === 'vi' ? 'Quy Trình Phát Triển Và Sản Xuất' : 'Development & Manufacturing Workflow'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#191919]/75 font-light leading-relaxed">
            {lang === 'vi'
              ? 'Quy trình kiểm soát toàn diện từ tiếp nhận bản vẽ kỹ thuật đến khi đóng kiện xuất xưởng: đảm bảo độ chính xác của mộng gỗ, độ khít mối ghép và độ phẳng mặt đá trước khi bàn giao.'
              : 'A structured 5-stage contract manufacturing protocol: ensuring joinery precision, moisture stability, and stone surface alignment prior to export dispatch.'}
          </p>
        </Reveal>

        {/* 5-Step Process Timeline with staggered entrance */}
        <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line behind steps on desktop */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-300 z-0" />

          {WORKFLOW_STEPS.map((step) => (
            <StaggerItem key={step.step} className="h-full">
              <div className="luxury-card relative z-10 h-full">
                <div className="luxury-card-inner p-6 sm:p-7 flex flex-col justify-between h-full bg-white">
                  <div>
                    {/* Number Badge */}
                    <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A880]/40 flex items-center justify-center font-serif text-lg font-bold text-[#A68A56] mb-5">
                      {step.step}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#191919]">
                      {step.title[lang]}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#191919]/70 leading-relaxed font-light">
                      {step.desc[lang]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] font-mono text-[#A68A56]">
                    ✓ {step.details[lang]}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Value Proposition Callout Banner */}
        <Reveal delay={0.2} className="mt-16">
          <div className="bg-[#191919] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880]">
                {lang === 'vi' ? 'TIÊU CHUẨN XUẤT KHẨU VIỆT NAM' : 'EXPORT QUALITY GUARANTEE'}
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-white">
                {lang === 'vi'
                  ? 'Độ ẩm gỗ kiểm soát dưới 10–12%, kết cấu gia cường chịu lực'
                  : 'Moisture-controlled hardwoods under 12%, reinforced export packing'}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {lang === 'vi'
                  ? 'Mỗi kiện hàng đều được đóng gói theo tiêu chuẩn rơi rớt quốc tế (drop test), ghi nhãn từng phòng, sẵn sàng cho công tác fit-out tại khách sạn.'
                  : 'Every shipment is packaged to international drop-test standards with room-specific labeling for streamlined hotel site distribution.'}
              </p>
            </div>

            <a
              href="tel:0977429979"
              className="px-8 py-3.5 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-white transition-colors whitespace-nowrap cursor-pointer shadow-md"
            >
              {lang === 'vi' ? 'Liên Hệ Trực Tiếp Kỹ Thuật' : 'Speak With Our Engineers'}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
