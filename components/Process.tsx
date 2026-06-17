import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/i18n';

const getSteps = (t: (k: string) => string) => [
  { num: '01', title: t('step.1.title'), desc: t('step.1.desc'), features: ['Requirements Analysis', 'Timeline Estimation', 'Transparency'] },
  { num: '02', title: t('step.2.title'), desc: t('step.2.desc'), features: ['Clean Code', 'Regular Updates', 'Quality'] },
  { num: '03', title: t('step.3.title'), desc: t('step.3.desc'), features: ['QA Testing', 'Bug Fixes', 'Stability'] },
  { num: '04', title: t('step.4.title'), desc: t('step.4.desc'), features: ['Deploy', 'Documentation', 'Support'] },
];

const StepDescription: React.FC<{
  step: { num: string; title: string; desc: string; features: string[] };
  index: number;
  total: number;
  scrollProgress: any;
}> = ({ step, index, total, scrollProgress }) => {
  const segmentSize = 1 / total;
  const start = Math.max(0, index * segmentSize - 0.02);
  const peak = index * segmentSize + segmentSize / 2;
  const end = Math.min(1, (index + 1) * segmentSize + 0.02);

  const opacity = useTransform(scrollProgress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(scrollProgress, [start, peak, end], [80, 0, -80]);
  const rotateX = useTransform(scrollProgress, [start, peak, end], [25, 0, -25]);
  const scale = useTransform(scrollProgress, [start, peak, end], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, y, rotateX, scale, transformPerspective: 1000 }}
      className="absolute inset-0 flex flex-col justify-center origin-center"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[#0ae448] font-mono text-sm tracking-[0.2em]">
          [ STEP {step.num} ]
        </span>
      </div>
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-[#141415] dark:text-white mb-6">
        {step.title}
      </h3>
      <p className="text-[#6e6f6c] dark:text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        {step.desc}
      </p>
      <div className="flex flex-wrap gap-3">
        {step.features.map((feature, i) => (
          <span 
            key={i}
            className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-full text-sm text-[#6e6f6c] dark:text-neutral-400"
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const StepNameItem: React.FC<{
  title: string;
  num: string;
  scrollProgress: any;
  start: number;
  peak: number;
  end: number;
}> = ({ title, num, scrollProgress, start, peak, end }) => {
  const color = useTransform(
    scrollProgress,
    [start, peak, end],
    ["rgb(64, 64, 64)", "rgb(255, 59, 48)", "rgb(64, 64, 64)"]
  );

  return (
    <motion.div
      style={{ color }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.95] text-left select-none cursor-default transition-colors duration-300 hover:text-[#0ae448] flex items-center justify-start gap-4"
    >
      <span>{title}</span>
    </motion.div>
  );
};

const Process: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const { t } = useLang();
  const steps = getSteps(t);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (isMobile) {
    return (
      <section id="process" className="relative bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 py-24 px-6 overflow-hidden text-left">
        <div className="mb-20">
          <h2 className="text-4xl font-light tracking-tight text-[#141415] dark:text-white uppercase italic font-mono">
            {t('process.mobileTitle')}
          </h2>
        </div>
        
        <div className="relative space-y-20">
          <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gray-200 dark:bg-white/10" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10"
            >
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#050505] border border-gray-300 dark:border-white/20 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 bg-[#0ae448] rounded-full" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="text-2xl font-medium text-[#141415] dark:text-white tracking-tight uppercase">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-[#6e6f6c] dark:text-neutral-500 text-[13px] leading-relaxed mb-6 max-w-md">
                  {step.desc}
                </p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {step.features.map((f, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono tracking-[0.2em] text-[#6e6f6c] dark:text-neutral-600 uppercase"
                    >
                      / {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section 
      id="process"
      ref={containerRef} 
      className="relative bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5" 
      style={{ height: `${steps.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 03 / 09 ]</span>
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">PROCESS</span>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 md:px-12 pb-8">
          <div className="relative flex items-center justify-start overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col items-start justify-center">
              {steps.map((step, index) => {
                const segmentSize = 1 / steps.length;
                const start = index * segmentSize;
                const peak = start + segmentSize / 2;
                const end = (index + 1) * segmentSize;

                return (
                  <StepNameItem
                    key={index}
                    title={step.title}
                    num={step.num}
                    scrollProgress={scrollYProgress}
                    start={start}
                    peak={peak}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col justify-center h-full order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-right"
            >
              <span className="text-[#0ae448] text-xs font-mono tracking-[0.3em] block mb-3">
                [ {t('process.label')} ]
              </span>
              <h2 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase text-[#6e6f6c] dark:text-neutral-400">
                {t('process.title')}
              </h2>
            </motion.div>
            
            <div className="relative h-[300px] md:h-[350px]">
              {steps.map((step, index) => (
                <StepDescription 
                  key={index}
                  step={step}
                  index={index}
                  total={steps.length}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
