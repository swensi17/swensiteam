import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../lib/i18n';

const SecuritySection: React.FC = () => {
  const { t } = useLang();
  const securityFeatures = [
    { id: '01/', title: t('sec.1.title'), desc: t('sec.1.desc'), icon: '/swensiteam/svg/surrealdb.svg', size: 'lg:col-start-1 lg:row-start-1', tag: 'Identity' },
    { id: '02/', title: t('sec.2.title'), desc: t('sec.2.desc'), icon: '/swensiteam/svg/pocket-base.svg', size: 'lg:col-start-2 lg:row-span-2 lg:row-start-1', tag: 'Cryptography' },
    { id: '03/', title: t('sec.3.title'), desc: t('sec.3.desc'), icon: '/swensiteam/svg/vitest.svg', size: 'lg:col-start-3 lg:row-start-1', tag: 'Reliability', scale: 'scale-125' },
    { id: '04/', title: t('sec.4.title'), desc: t('sec.4.desc'), icon: '/swensiteam/svg/dotenv.svg', size: 'lg:col-span-1 lg:row-span-2 lg:row-start-2', tag: 'Legal' },
    { id: '05/', title: t('sec.5.title'), desc: t('sec.5.desc'), icon: '/swensiteam/svg/neon.svg', size: 'lg:col-start-3 lg:row-start-2', tag: 'Cloud' },
    { id: '06/', title: t('sec.6.title'), desc: t('sec.6.desc'), icon: '/swensiteam/svg/oxc.svg', size: 'lg:col-start-2 lg:row-start-3', tag: 'Auditing', scale: 'scale-150' },
    { id: '07/', title: t('sec.7.title'), desc: t('sec.7.desc'), icon: '/swensiteam/svg/microsoft-defender.svg', size: 'lg:col-start-3 lg:row-start-3', tag: 'Monitoring' },
  ];

  return (
    <section id="security" className="bg-white dark:bg-[#050505] text-[#141415] dark:text-white py-16 relative overflow-hidden border-t border-gray-200 dark:border-white/5">
      <div className="px-6 md:px-12 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-left"
        >
          {t('security.title1')}<br />
          <span className="text-[#0ae448]">{t('security.title2')}</span>
        </motion.h2>
      </div>

      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto] lg:grid-rows-3 gap-4 md:gap-5 w-full">
          {securityFeatures.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`${feature.size} relative flex flex-col justify-between group min-h-[220px]`}
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 300 220" preserveAspectRatio="none" className="w-full h-full">
                  <path 
                    d="M 28 0 H 210 Q 240 0 240 30 V 30 Q 240 60 270 60 H 272 Q 300 60 300 88 V 192 Q 300 220 272 220 H 28 Q 0 220 0 192 V 28 Q 0 0 28 0 Z" 
                    className="fill-gray-50 dark:fill-[#0A0A0A] group-hover:fill-gray-100 dark:group-hover:fill-[#111111] transition-colors duration-500 stroke-gray-200 dark:stroke-white/10"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                <div className="text-[9px] font-mono tracking-widest text-[#0ae448] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>{feature.id}</span>
                </div>

                <div className="flex flex-col gap-4 pt-4 flex-grow">
                  <div className="w-9 h-9 flex items-center justify-center relative overflow-hidden">
                     <img src={feature.icon} alt={feature.tag} className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100 ${feature.scale || ''}`} />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className={`font-bold tracking-tight text-[#141415]/90 dark:text-white/90 group-hover:text-[#141415] dark:group-hover:text-white transition-colors mb-2 ${feature.size.includes('row-span-2') ? 'text-xl md:text-2xl lg:text-3xl leading-snug' : 'text-lg md:text-xl'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-[#6e6f6c] dark:text-neutral-400 leading-relaxed max-w-[95%] transition-colors group-hover:text-[#6e6f6c] dark:group-hover:text-white/60 ${feature.size.includes('row-span-2') ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'}`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-6 right-8 text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-[#141415]/20 dark:text-white/20 uppercase group-hover:text-[#0ae448] transition-colors duration-500">
                  <span>{feature.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
