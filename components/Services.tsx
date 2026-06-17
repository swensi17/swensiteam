import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/i18n';

const getServices = (t: (k: string) => string) => [
  { name: t('svc.1.name'), desc: t('svc.1.desc'), features: ["Payment Systems", "CRM Integrations", "Automation"] },
  { name: t('svc.2.name'), desc: t('svc.2.desc'), features: ["React / TypeScript", "Responsive Design", "High Performance"] },
  { name: t('svc.3.name'), desc: t('svc.3.desc'), features: ["Swift / Kotlin", "Store Publishing", "Push Notifications"] },
  { name: t('svc.4.name'), desc: t('svc.4.desc'), features: ["Protection Bypass", "Dynamic Content", "Data Export"] },
  { name: t('svc.5.name'), desc: t('svc.5.desc'), features: ["REST / GraphQL", "Integrations", "Documentation"] },
  { name: t('svc.6.name'), desc: t('svc.6.desc'), features: ["Windows / macOS", "Automation", "Cross-platform"] },
  { name: t('svc.7.name'), desc: t('svc.7.desc'), features: ["GitHub Actions", "Auto Tests", "Fast Deploy"] },
  { name: t('svc.8.name'), desc: t('svc.8.desc'), features: ["Docker / Nginx", "SSL / Security", "Monitoring"] },
];

const ServiceDescription: React.FC<{
  service: { name: string; desc: string; features: string[] };
  index: number;
  total: number;
  scrollProgress: any;
}> = ({ service, index, total, scrollProgress }) => {
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
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-[#141415] dark:text-white mb-6">
        {service.name}
      </h3>
      <p className="text-[#6e6f6c] dark:text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        {service.desc}
      </p>
      <div className="flex items-center gap-4">
        <span className="text-[#0ae448] font-mono text-sm tracking-[0.2em]">
          [ {String(index + 1).padStart(2, '0')} ]
        </span>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const { t } = useLang();
  const services = getServices(t);
  
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
      <section id="services" className="relative bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 py-16 px-6">
        <div className="flex justify-between items-center mb-8">
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 02 / 09 ]</span>
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">SERVICES</span>
        </div>
        
        <div className="mb-12">
          <span className="text-[#0ae448] text-xs font-mono tracking-[0.3em] block mb-3">[ OUR SERVICES ]</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#141415] dark:text-white">{t('services.title')}</h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0ae448] via-gray-200 dark:via-white/20 to-transparent" />
          
          <div className="space-y-0">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-12 pb-8"
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-[#0ae448] bg-white dark:bg-[#050505] flex items-center justify-center">
                  <span className="text-[#0ae448] font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#0ae448]" />
                  <h3 className="text-xl font-bold text-[#141415] dark:text-white mb-2">{service.name}</h3>
                  <p className="text-[#6e6f6c] dark:text-neutral-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[#6e6f6c] dark:text-neutral-500 text-xs mb-2">{t('services.ready')}</p>
          <Button text={t('services.cta')} />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="services"
      ref={containerRef} 
      className="relative bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5" 
      style={{ height: `${services.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 02 / 09 ]</span>
          <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">SERVICES</span>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 md:px-12 pb-8">
          <div className="flex flex-col justify-center h-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-[#0ae448] text-xs font-mono tracking-[0.3em] block mb-3">
                [ {t('services.label')} ]
              </span>
              <h2 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase text-[#6e6f6c] dark:text-neutral-400">
                {t('services.title')}:
              </h2>
            </motion.div>
            
            <div className="relative h-[350px] md:h-[400px]">
              {services.map((service, index) => (
                <ServiceDescription 
                  key={index}
                  service={service}
                  index={index}
                  total={services.length}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
            
            <div className="mt-8">
              <Button text={t('services.cta')} />
            </div>
          </div>
          
          <div className="relative flex items-center justify-end overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col items-end justify-center">
              {services.map((service, index) => {
                const segmentSize = 1 / services.length;
                const start = index * segmentSize;
                const peak = start + segmentSize / 2;
                const end = (index + 1) * segmentSize;

                return (
                  <ServiceNameItem
                    key={index}
                    name={service.name}
                    scrollProgress={scrollYProgress}
                    start={start}
                    peak={peak}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceNameItem: React.FC<{
  name: string;
  scrollProgress: any;
  start: number;
  peak: number;
  end: number;
}> = ({ name, scrollProgress, start, peak, end }) => {
  const color = useTransform(
    scrollProgress,
    [start, peak, end],
    ["rgb(64, 64, 64)", "rgb(255, 59, 48)", "rgb(64, 64, 64)"]
  );

  return (
    <motion.div
      style={{ color }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.95] text-right select-none cursor-default transition-colors duration-300 hover:text-[#0ae448]"
    >
      {name}
    </motion.div>
  );
};

export default Services;
