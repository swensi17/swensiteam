import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL || '/';

const integrationsList = [
  { name: 'Telegram', icon: 'telegram (2).svg' },
  { name: 'Instagram', icon: 'instagram-icon.svg' },
  { name: 'Stripe', icon: 'stripe.svg' },
  { name: 'WhatsApp', icon: 'whatsapp-icon.svg' },
  { name: 'Binance', icon: 'binance.svg' },
  { name: 'Facebook', icon: 'facebook-icon (1).svg' },
  { name: 'OpenAI', icon: 'openai_dark.svg' },
  { name: 'TikTok', icon: 'tiktok-icon-dark.svg' },
  { name: 'YouTube', icon: 'youtube.svg' },
  { name: 'LinkedIn', icon: 'linkedin (1).svg' },
  { name: 'Twitter', icon: 'twitter (1).svg' },
  { name: 'Figma', icon: 'figma.svg' },
  { name: 'Python', icon: 'python.svg' },
  { name: 'Vite', icon: 'vite.svg' },
  { name: 'JavaScript', icon: 'javascript.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Swift', icon: 'swift.svg' },
  { name: 'Metamask', icon: 'metamask.svg' },
  { name: 'PayPal', icon: 'paypal-wordmark.svg' }
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Double the list for seamless looping (standard practice for infinite marquee)
  const fullRow = [...integrationsList, ...integrationsList];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans border-b border-white/5"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap');
        .font-signature { 
          font-family: 'Mrs Saint Delafield', cursive; 
        }
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      {/* Background Image with Bars Mask */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-screen opacity-60"
          style={{
            backgroundImage: `url(${BASE_URL}image-optimized.webp)`,
            WebkitMaskImage: `repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 8px,
              black 8px,
              black calc((100% - 88px) / 10 + 8px)
            )`,
            maskImage: `repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 8px,
              black 8px,
              black calc((100% - 88px) / 10 + 8px)
            )`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40" />
      </div>

      {/* Grid Lines */}
      <div className="absolute top-[100px] left-0 w-full h-[1px] bg-white/10 z-10" />
      <div className="absolute top-0 left-[20px] md:left-[70px] w-[1px] h-full bg-white/10 z-10" />

      {/* Main Center Content */}
      <div className="flex-1 flex flex-col justify-center items-center relative w-full h-full pt-16 pb-20">

        {/* Massive Background Text */}
        <motion.div
          style={{ y: textY }}
          className="absolute z-0 w-full flex justify-center pointer-events-none select-none top-[40%] md:top-[28%]"
        >
          <div className="flex flex-nowrap gap-0 relative">
            {"SWENSI".split("").map((char, index) => (
              <div key={index} className="relative">
                <span className="text-[20vw] md:text-[18vw] font-mono font-bold uppercase tracking-tighter leading-none whitespace-nowrap text-transparent block"
                  style={{
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
                  }}>
                  {char}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Central Content Stack */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 flex flex-col items-center justify-center mt-[5vh] sm:mt-[10vh] md:mt-24 lg:mt-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="z-20 whitespace-nowrap pointer-events-none mb-6 md:mb-10"
          >
            <span className="font-signature text-[120px] sm:text-[160px] md:text-[220px] text-[#FF3B30] leading-none drop-shadow-[0 10px_30px_rgba(255,59,48,0.5)] block">
              team
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="z-30 relative"
          >
            <a
              href="https://t.me/swensi17"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-[#FF3B30] text-white font-mono font-bold text-[13px] sm:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[200px] md:min-w-[240px] relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">ОБСУДИТЬ ПРОЕКТ</span>
              <svg className="w-4 h-4 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Integrations Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#050505]/80 backdrop-blur-md border-t border-white/5 z-40 py-6 mask-edges">
        <div className="flex w-full overflow-hidden whitespace-nowrap items-center">
          <motion.div
            className="flex items-center w-fit"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {fullRow.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 md:px-8 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300">
                {item.icon && (
                  <img src={`${BASE_URL}svg/${item.icon}`} alt={item.name} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                )}
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase mt-0.5">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
