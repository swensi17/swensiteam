import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // ���� ���������� ������ ����� ������������ ����� �������� �� �����
  const logoY = useTransform(scrollYProgress, [0.7, 1], [200, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <footer ref={containerRef} id="contacts" className="bg-[#050505] text-white pt-16 md:pt-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden flex flex-col min-h-[50vh]">
      
      {/* Top section: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-8 lg:mb-12 z-10 relative">
        
        {/* Top Left: Logo / Input / Socials */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="font-semibold text-lg tracking-tight">aileader.Dev �</div>
          
          <div className="flex w-full max-w-sm mt-4">
            <input 
              type="text" 
              placeholder="email / telegram" 
              className="bg-transparent border border-white/20 text-white placeholder:text-neutral-600 px-4 py-3 rounded-l-md focus:outline-none focus:border-white/40 w-full text-sm font-light transition-colors"
            />
            <a 
              href="https://t.me/aileader17" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#FF3B30] text-white px-6 py-3 rounded-r-md font-medium text-sm hover:bg-white hover:text-black transition-colors whitespace-nowrap flex items-center justify-center"
            >
              ��������
            </a>
          </div>

          <div className="flex gap-4 mt-6">
             <a href="https://t.me/aileader17" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FF3B30] hover:border-[#FF3B30] hover:text-white transition-all text-neutral-400">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
             </a>
             <a href="https://t.me/aileaderorder" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all text-neutral-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
             </a>
             <a href="https://t.me/amirjanjik" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all text-neutral-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
             </a>
          </div>
        </div>

        {/* Top Right: Columns */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-white/90 mb-2">������</h4>
            <a href="#services" className="text-neutral-400 hover:text-[#FF3B30] transition-colors text-sm">Telegram ����</a>
            <a href="#services" className="text-neutral-400 hover:text-[#FF3B30] transition-colors text-sm">���-����������</a>
            <a href="#services" className="text-neutral-400 hover:text-[#FF3B30] transition-colors text-sm">������� & API</a>
            <a href="#services" className="text-neutral-400 hover:text-[#FF3B30] transition-colors text-sm">��������� ����������</a>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-white/90 mb-2">������</h4>
            <a href="https://t.me/aileader17" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">�������� ���</a>
            <a href="https://t.me/amirjanjik" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">������ (10K+)</a>
            <a href="https://t.me/aileaderorder" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">����� �������</a>
          </div>
          <div className="hidden lg:flex flex-col gap-5">
            <h4 className="font-semibold text-white/90 mb-2">��������</h4>
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors text-sm">��� ���</a>
            <a href="#process" className="text-neutral-400 hover:text-white transition-colors text-sm">�������</a>
            <a href="#contacts" className="text-neutral-400 hover:text-white transition-colors text-sm">��������</a>
          </div>
        </div>

      </div>

      {/* Bottom giant text with scroll animation */}
      <div className="w-full flex justify-center mt-0 px-4 translate-y-[15%]">
        <motion.h1 
          style={{ y: logoY, opacity: logoOpacity }}
          className="text-[25vw] md:text-[26vw] lg:text-[27vw] font-black tracking-tight leading-[0.7] text-white lowercase select-none text-center w-full m-0 p-0"
        >
          aileader
        </motion.h1>
      </div>
    </footer>
  );
};

export default Footer;
