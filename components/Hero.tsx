import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../lib/i18n';

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
  const { t } = useLang();
  const fullRow = [...integrationsList, ...integrationsList, ...integrationsList];

  return (
    <section id="home" className="relative h-screen text-white overflow-hidden flex flex-col" style={{ backgroundColor: '#050505' }}>
      <style>{`
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src={`${BASE_URL}hero-bg.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050505]/55" />
      </div>

      {/* Content - vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        {/* AILEADER text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold uppercase tracking-tighter leading-none text-center"
            style={{ fontFamily: 'Helony, sans-serif' }}>
            <span className="text-[#0ae448]">AI</span><span className="text-white">LEADER</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/60 text-center text-[14px] sm:text-[16px] md:text-[18px] max-w-[500px] mb-8"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="https://t.me/swensi17"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-3 px-7 py-3 rounded-[100px] border border-[#fffce1] text-[#fffce1] text-[14px] sm:text-[16px] tracking-[-0.01em] hover:bg-[#fffce1] hover:text-[#0e100f] transition-all duration-300"
        >
          {t('hero.btn')}
          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1V7"/></svg>
          </span>
        </motion.a>
      </div>

      {/* Infinite Scrolling Integrations Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm border-t border-white/5 z-10 py-3 md:py-5 overflow-hidden">
        <div className="flex w-full whitespace-nowrap items-center mask-edges">
          <motion.div
            className="flex items-center w-fit"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {fullRow.map((item, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 px-4 md:px-8 shrink-0 opacity-80">
                <img src={`${BASE_URL}svg/${item.icon}`} alt={item.name} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                <span className="text-[9px] md:text-xs font-mono font-bold tracking-[0.15em] text-white uppercase">
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
