import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../lib/i18n';

const getFaqData = (t: (k: string) => string) => [
  { num: '01', q: t('faq.1.q'), a: t('faq.1.a') },
  { num: '02', q: t('faq.2.q'), a: t('faq.2.a') },
  { num: '03', q: t('faq.3.q'), a: t('faq.3.a') },
  { num: '04', q: t('faq.4.q'), a: t('faq.4.a') },
];

const FAQItem: React.FC<{ 
  num: string; 
  q: string; 
  a: string; 
  index: number;
  isOpen: boolean;
  onClick: () => void;
}> = ({ num, q, a, index, isOpen, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-t border-gray-200 dark:border-white/10 relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div 
        className={`absolute inset-0 bg-gray-50 dark:bg-white/[0.02] transition-transform duration-500 origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
      />
      
      <div className="relative z-10 py-6 md:py-10">
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <div className="flex items-start gap-3 md:gap-6 flex-1">
            <span className={`text-[10px] md:text-xs font-mono tracking-widest transition-colors duration-300 pt-1 md:pt-2 ${isHovered || isOpen ? 'text-[#0ae448]' : 'text-[#6e6f6c] dark:text-neutral-600'}`}>
              [{num}]
            </span>
            
            <div className="flex-1">
              <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight transition-colors duration-300 leading-tight ${isHovered || isOpen ? 'text-[#141415] dark:text-white' : 'text-[#6e6f6c] dark:text-neutral-300'}`}>
                {q}
              </h3>
              
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="text-[#6e6f6c] dark:text-neutral-500 text-sm md:text-base leading-relaxed mt-3 md:mt-4 max-w-2xl">
                  {a}
                </p>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isOpen ? 'border-[#0ae448] text-[#0ae448]' : 'border-gray-300 dark:border-white/20 text-[#6e6f6c] dark:text-white/40'}`}
          >
            <span className="text-lg md:text-xl leading-none">+</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLang();
  const faqData = getFaqData(t);

  return (
    <section id="faq" className="bg-white dark:bg-black py-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,59,48,0.03)_0%,transparent_70%)]" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[25vw] font-black text-[#141415]/[0.03] dark:text-white/[0.015] tracking-tighter">
          FAQ
        </span>
      </div>

      <div className="px-6 md:px-12 mb-10 md:mb-24">
        <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.3em] font-mono text-[#6e6f6c] dark:text-neutral-600 border-b border-gray-200 dark:border-white/5 pb-4">
          <span>[ 08 / 09 ]</span>
          <span>QUESTIONS</span>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="text-[#0ae448] text-xs font-mono tracking-widest block mb-4 md:mb-6">
                [ {t('faq.label')} ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] text-[#141415] dark:text-white">
                {t('faq.title')} <span className="text-gray-400 dark:text-neutral-600">{t('faq.title2')}</span>
              </h2>
              
              <p className="text-[#6e6f6c] dark:text-neutral-500 mt-6 md:mt-8 max-w-sm text-sm leading-relaxed mx-auto lg:mx-0">
                {t('faq.hint')}
              </p>
              
              <motion.a
                href="https://t.me/swensi17"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 mt-6 md:mt-8 border border-[#141415] dark:border-[#fffce1] py-3 md:py-3 px-7 rounded-[100px] group hover:bg-[#141415] dark:hover:bg-[#fffce1] transition-all duration-300 w-full sm:w-auto"
              >
                <span className="text-[#141415] dark:text-[#fffce1] text-[14px] md:text-[16px] tracking-[-0.01em] group-hover:text-white dark:group-hover:text-[#0e100f] transition-colors duration-300">{t('faq.btn')}</span>
                <svg 
                  className="w-3 h-3 md:w-4 md:h-4 text-[#141415] dark:text-white group-hover:text-white dark:group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                num={item.num}
                q={item.q}
                a={item.a}
                index={index}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
            <div className="border-t border-gray-200 dark:border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
