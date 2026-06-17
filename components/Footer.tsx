import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/i18n';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const logoY = useTransform(scrollYProgress, [0.7, 1], [200, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <footer ref={containerRef} id="contacts" className="bg-gray-100 dark:bg-[#050505] text-[#141415] dark:text-white pt-16 md:pt-24 px-6 md:px-12 border-t border-gray-200 dark:border-white/5 relative overflow-hidden flex flex-col min-h-[50vh]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-8 lg:mb-12 z-10 relative">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="font-semibold text-lg tracking-tight">aileader.Dev ®</div>
          
          <div className="flex w-full max-w-sm mt-4">
            <input 
              type="text" 
              placeholder="email / telegram" 
              className="bg-transparent border border-gray-300 dark:border-white/20 text-[#141415] dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-600 px-4 py-3 rounded-l-md focus:outline-none focus:border-gray-500 dark:focus:border-white/40 w-full text-sm font-light transition-colors"
            />
            <a 
              href="https://t.me/swensi17" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#0ae448] text-white px-6 py-3 rounded-r-md font-medium text-sm hover:bg-[#141415] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors whitespace-nowrap flex items-center justify-center"
            >
              {t('footer.send')}
            </a>
          </div>

          <div className="flex gap-5 mt-6">
             <a href="https://t.me/aileaderuz" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#6e6f6c] dark:text-neutral-400 hover:text-[#0ae448] transition-colors">
               <img src={`${import.meta.env.BASE_URL || '/'}svg/telegram (2).svg`} alt="Telegram" className="w-5 h-5" />
               <span className="text-sm">Telegram</span>
             </a>
             <a href="https://instagram.com/aileader.uz" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors">
               <img src={`${import.meta.env.BASE_URL || '/'}svg/instagram-icon.svg`} alt="Instagram" className="w-5 h-5" />
               <span className="text-sm">Instagram</span>
             </a>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-[#141415]/90 dark:text-white/90 mb-2">{t('footer.services')}</h4>
            <a href="#services" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#0ae448] transition-colors text-sm">{t('footer.bots')}</a>
            <a href="#services" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#0ae448] transition-colors text-sm">{t('footer.web')}</a>
            <a href="#services" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#0ae448] transition-colors text-sm">{t('footer.parsers')}</a>
            <a href="#services" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#0ae448] transition-colors text-sm">{t('footer.mobile')}</a>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-[#141415]/90 dark:text-white/90 mb-2">{t('footer.links')}</h4>
            <a href="https://t.me/swensi17" target="_blank" rel="noreferrer" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.message')}</a>
            <a href="https://t.me/amirjanjik" target="_blank" rel="noreferrer" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.reviews')}</a>
            <a href="https://t.me/aileaderorder" target="_blank" rel="noreferrer" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.archive')}</a>
          </div>
          <div className="hidden lg:flex flex-col gap-5">
            <h4 className="font-semibold text-[#141415]/90 dark:text-white/90 mb-2">{t('footer.company')}</h4>
            <a href="#about" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.about')}</a>
            <a href="#process" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.process')}</a>
            <a href="#contacts" className="text-[#6e6f6c] dark:text-neutral-400 hover:text-[#141415] dark:hover:text-white transition-colors text-sm">{t('footer.contacts')}</a>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-0 px-4 translate-y-[15%]">
        <motion.h1 
          style={{ y: logoY, opacity: logoOpacity }}
          className="text-[18vw] md:text-[20vw] lg:text-[22vw] font-black tracking-tighter leading-[0.7] text-[#141415] dark:text-white lowercase select-none text-center w-full m-0 p-0"
        >
          aileader
        </motion.h1>
      </div>
    </footer>
  );
};

export default Footer;
