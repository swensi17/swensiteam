import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/i18n';

const getGuarantees = (t: (k: string) => string) => [
  { text: t('guar.1') },
  { text: t('guar.2') },
  { text: t('guar.3') },
  { text: t('guar.4') },
  { text: t('guar.5') },
];

const PoolRules: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const { t } = useLang();
  const guarantees = getGuarantees(t);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], isMobile ? ['5%', '-5%'] : ['20%', '-20%']);
  const quoteRotateY = useTransform(scrollYProgress, [0.3, 0.6], isMobile ? [0, 0] : [-10, 10]);
  const quoteScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], isMobile ? [1, 1, 1] : [0.95, 1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-white dark:bg-[#050505] py-12 md:py-32 overflow-hidden border-t border-gray-200 dark:border-white/5"
    >
      <div className="flex justify-between items-center px-6 md:px-12 pb-8 md:pb-16">
        <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 06 / 09 ]</span>
        <span className="text-[#6e6f6c] dark:text-neutral-600 text-xs tracking-[0.3em] font-mono">{t('guar.label')}</span>
      </div>

      <div className="px-6 md:px-12 mb-10 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="text-[#0ae448] text-xs font-mono tracking-[0.3em] block mb-4 md:mb-6">
            [ {t('guar.label')} ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-[#141415] dark:text-white">
            {t('guar.label')}
          </h2>
        </motion.div>
      </div>

      <div className="relative mb-12 md:mb-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-white/10" />
        
        {isMobile ? (
          <motion.div 
            className="flex py-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
          >
            {[...guarantees, ...guarantees, ...guarantees, ...guarantees].map((item, index) => (
              <div key={index} className="flex items-center flex-shrink-0 mx-4">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0ae448] mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm font-medium text-[#6e6f6c] dark:text-neutral-400 whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div style={{ x }} className="flex py-12 md:py-16">
            {[...guarantees, ...guarantees].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateX: 30 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % guarantees.length) * 0.1 }}
                className="flex items-center flex-shrink-0 mx-8 md:mx-12 group"
                style={{ transformPerspective: 800 }}
              >
                <motion.div className="relative w-8 h-8 md:w-10 md:h-10 mr-4 md:mr-6 flex items-center justify-center" whileHover={{ scale: 1.15 }} transition={{ duration: 0.3 }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-[#0ae448]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <span className="text-xl md:text-2xl lg:text-3xl font-medium text-[#6e6f6c] dark:text-neutral-400 group-hover:text-[#141415] dark:group-hover:text-white transition-colors duration-300 whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-white/10" />
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent pointer-events-none z-10" />
      </div>

      <div className="px-6 md:px-12">
        <motion.div
          style={{ rotateY: quoteRotateY, scale: quoteScale, transformPerspective: 1200 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-gray-50 dark:from-neutral-900/80 to-white dark:to-black border border-gray-200 dark:border-white/10 p-10 md:p-16 lg:p-20"
          >
            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0ae448]" />
              <div className="absolute top-0 left-0 w-[2px] h-full bg-[#0ae448]" />
            </div>
            <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-[#0ae448]" />
              <div className="absolute top-0 right-0 w-[2px] h-full bg-[#0ae448]" />
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0ae448]" />
              <div className="absolute bottom-0 left-0 w-[2px] h-full bg-[#0ae448]" />
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#0ae448]" />
              <div className="absolute bottom-0 right-0 w-[2px] h-full bg-[#0ae448]" />
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.08, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-2 left-2 md:top-4 md:left-4 text-[50px] md:text-[140px] font-serif text-[#141415] dark:text-white leading-none pointer-events-none select-none"
            >
              "
            </motion.div>

            <blockquote className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#141415] dark:text-white font-light leading-tight tracking-tight mb-8 md:mb-12"
              >
                {t('guar.quote1')}
                <span className="text-[#6e6f6c] dark:text-neutral-500">{t('guar.quote2')}</span>
              </motion.p>
              
              <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-[#0ae448]" />
                <span className="text-[#0ae448] text-sm font-mono tracking-[0.2em]">aileader</span>
              </motion.footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0ae448]/3 rounded-full blur-[200px]"
        />
      </div>
    </section>
  );
};

export default PoolRules;
