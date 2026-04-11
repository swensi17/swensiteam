import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Отзывов' },
  { value: '24/7', label: 'На связи' },
  { value: '100%', label: 'Гарантия' },
  { value: '4+', label: 'Года опыта' },
  { value: '200+', label: 'Проектов' },
  { value: '100%', label: 'Качество' },
];

const AfterMoney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
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

  // 3D transforms - disabled on mobile
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.9, 1, 0.9]);
  
  // Parallax for words - reduced on mobile
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [120, -120]);
  
  // Rotation for words - disabled on mobile
  const rotate1 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-3, 0, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [3, 0, -3]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-2, 0, 2]);

  // Stats 3D - disabled on mobile
  const statsRotateX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], isMobile ? [0, 0, 0] : [20, 0, -20]);
  const statsScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], isMobile ? [1, 1, 1] : [0.9, 1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-12 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 pb-6 md:pb-12">
        <span className="text-neutral-600 text-[10px] md:text-xs tracking-[0.3em] font-mono">[ 05 / 09 ]</span>
        <span className="text-neutral-600 text-[10px] md:text-xs tracking-[0.3em] font-mono">ПРЕИМУЩЕСТВА</span>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px]" />
      </div>

      {/* 3D Main heading */}
      <motion.div 
        style={{ 
          rotateX,
          scale,
          transformPerspective: 1200,
        }}
        className="relative z-10 w-full mb-2 md:mb-6"
      >
        <div className="text-center">
          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.div style={{ y: y1, rotate: rotate1 }}>
              <span className="block text-[11vw] sm:text-[14vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-[#FF3B30] leading-[0.85]">
                Быстро.
              </span>
            </motion.div>
          </div>
          
          <div className="overflow-hidden mb-6 md:mb-10">
            <motion.div style={{ y: y2, rotate: rotate2 }}>
              <span className="block text-[9vw] sm:text-[12vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-white leading-[0.85]">
                Качественно.
              </span>
            </motion.div>
          </div>
          
          <div className="overflow-hidden">
            <motion.div style={{ y: y3, rotate: rotate3 }}>
              <span className="block text-[11vw] sm:text-[14vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-neutral-700 leading-[0.85]">
                Надёжно.
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3D Stats (6 File Folders Style) */}
      <motion.div 
        style={{ 
          rotateX: isMobile ? 0 : statsRotateX,
          scale: isMobile ? 1 : statsScale,
          transformPerspective: 1000,
        }}
        className="relative z-10 w-full py-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 px-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group flex flex-col items-center w-full"
              style={{ transformPerspective: 800 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateX: -5,
                  z: 50
                }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center cursor-default"
              >
                {/* Folder SVG Outline */}
                <div className="relative w-full aspect-[5/4] mb-3 flex items-center justify-center">
                  <svg 
                    className="absolute inset-0 w-full h-full text-white/20 group-hover:text-white transition-colors duration-500" 
                    viewBox="0 0 100 80" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  >
                    <path d="M 5 20 L 35 20 L 45 30 L 95 30 L 95 75 L 5 75 Z" />
                  </svg>
                  
                  {/* Inside Folder Content - Absolutely centered in the body */}
                  <div className="absolute top-[30%] bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center px-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[7px] sm:text-[8px] md:text-[9px] text-neutral-400 uppercase tracking-[0.2em] leading-tight truncate w-full">
                      {stat.label}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Underneath */}
                <div className="w-12 md:w-16 h-1.5 rounded-full border border-white/10 p-[1px] opacity-50 group-hover:opacity-100 transition-all duration-300">
                   <motion.div 
                     className="bg-white h-full rounded-full" 
                     initial={{ width: "0%" }}
                     whileInView={{ width: "100%" }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                   />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom quote */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 md:px-12 mt-16 md:mt-20"
      >
        <p className="text-center text-neutral-500 max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed">
          Репутация — главный актив. Каждый проект делаем так, будто это наш собственный. 
          <span className="text-neutral-400"> Чистый код, современные технологии, честные сроки.</span>
        </p>
      </motion.div>
    </section>
  );
};

export default AfterMoney;
