import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/i18n';
import { useTheme } from '../lib/theme';

const navItems = [
  { key: 'nav.home', href: '#home', id: 'home' },
  { key: 'nav.services', href: '#services', id: 'services' },
  { key: 'nav.stack', href: '#stack', id: 'stack' },
  { key: 'nav.security', href: '#security', id: 'security' },
  { key: 'nav.process', href: '#process', id: 'process' },
  { key: 'nav.faq', href: '#faq', id: 'faq' },
  { key: 'nav.contacts', href: '#contacts', id: 'contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < 50 || current < lastScroll);
      setScrolled(current > 50);
      lastScroll = current;
      
      const sections = navItems.map(n => n.id);
      let cur = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 300) cur = section;
      }
      setActiveSection(cur);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center pt-4 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${scrolled ? 'backdrop-blur-md pt-3' : ''}`}>
        <nav className="flex items-center gap-1 px-2 py-1.5 rounded-[100px] border border-[#42433d] bg-black/80 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`relative px-4 py-1.5 rounded-[100px] text-[14px] tracking-[-0.01em] transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-[#0e100f] font-semibold'
                  : 'text-[#fffce1]/80 hover:text-[#fffce1]'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-[100px] bg-[#fffce1]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{t(item.key)}</span>
            </a>
          ))}
          {/* Language dropdown */}
          <div className="ml-2 relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="px-4 py-1.5 rounded-[100px] border border-[#fffce1] text-[#fffce1] text-[14px] tracking-[-0.01em] hover:bg-[#fffce1] hover:text-[#0e100f] transition-all">
              {lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-[#0e100f] border border-[#42433d] rounded-[8px] overflow-hidden z-50">
                {(['en', 'ru', 'uz'] as const).map((l) => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`block w-full px-4 py-2 text-[13px] uppercase text-left transition-colors ${lang === l ? 'text-[#0ae448]' : 'text-[#fffce1] hover:bg-white/5'}`}>
                    {l === 'en' ? 'English' : l === 'ru' ? 'Русский' : 'O\'zbek'}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Theme toggle */}
          <button onClick={toggleTheme} className="ml-2 w-8 h-8 rounded-full border border-[#fffce1] flex items-center justify-center text-[#fffce1] hover:bg-[#fffce1] hover:text-[#0e100f] transition-all">
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <div className="ml-2 w-[1px] h-5 bg-[#fffce1]/30" />
          <a
            href="https://t.me/swensi17"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 rounded-[100px] border border-[#fffce1] text-[#fffce1] text-[14px] tracking-[-0.01em] hover:bg-[#fffce1] hover:text-[#0e100f] transition-all duration-300"
          >
            {t('nav.cta')}
          </a>
        </nav>
      </header>

      {/* Mobile Nav */}
      <div className={`lg:hidden fixed top-3 left-3 right-3 z-50 flex items-center justify-between px-4 py-2.5 rounded-[100px] border backdrop-blur-md transition-all duration-500 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'} ${theme === 'light' ? 'bg-white/90 border-gray-200' : 'bg-black/70 border-[#42433d]'}`}>
        <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL || '/'}avatar.png`} alt="logo" className={`w-7 h-7 rounded-full border ${theme === 'light' ? 'border-gray-200' : 'border-[#fffce1]/30'}`} />
          <span className={`text-[14px] font-semibold ${theme === 'light' ? 'text-[#141415]' : 'text-[#fffce1]'}`}>aileader</span>
        </a>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={`w-7 h-7 rounded-full border flex items-center justify-center ${theme === 'light' ? 'border-gray-300 text-[#141415]' : 'border-[#fffce1] text-[#fffce1]'}`}>
            {theme === 'dark' ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`flex flex-col gap-1.5 p-1 ${theme === 'light' ? 'text-[#141415]' : 'text-[#fffce1]'}`}>
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 5 : 0 }} className="w-5 h-[1.5px] bg-current block origin-center" />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-5 h-[1.5px] bg-current block" />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -5 : 0 }} className="w-5 h-[1.5px] bg-current block origin-center" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className={`lg:hidden fixed inset-0 z-40 flex flex-col ${theme === 'light' ? 'bg-white' : 'bg-[#0e100f]'}`}
          >
            {/* Top bar: logo + close */}
            <div className={`flex items-center justify-between px-6 py-5 border-b ${theme === 'light' ? 'border-gray-200' : 'border-[#42433d]'}`}>
              <span className={`text-[16px] font-semibold ${theme === 'light' ? 'text-[#141415]' : 'text-[#fffce1]'}`}>aileader</span>
              <button onClick={() => setMobileMenuOpen(false)} className={`text-[12px] tracking-[0.1em] uppercase flex items-center gap-2 ${theme === 'light' ? 'text-[#141415]' : 'text-[#fffce1]'}`}>
                CLOSE
                <span className="w-5 h-5 flex items-center justify-center">✕</span>
              </button>
            </div>

            {/* Big nav links */}
            <div className="flex-1 flex flex-col px-6 gap-2 pt-4 overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`group py-3 border-b ${theme === 'light' ? 'border-gray-100' : 'border-[#42433d]/50'}`}
                >
                  <span className={`text-[32px] sm:text-[40px] font-light tracking-tight transition-colors ${activeSection === item.id ? 'text-[#0ae448]' : theme === 'light' ? 'text-[#141415] group-hover:text-[#0ae448]' : 'text-[#fffce1] group-hover:text-[#0ae448]'}`}>
                    {t(item.key)}
                  </span>
                </a>
              ))}
            </div>

            {/* Bottom: lang + CTA */}
            <div className={`flex items-center justify-between px-6 py-5 border-t ${theme === 'light' ? 'border-gray-200' : 'border-[#42433d]'}`}>
              <div className="flex items-center gap-1">
                {(['uz', 'ru', 'en'] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-[100px] text-[12px] uppercase transition-all ${lang === l ? (theme === 'light' ? 'bg-[#141415] text-white' : 'bg-[#fffce1] text-[#0e100f]') : (theme === 'light' ? 'text-[#141415]/50' : 'text-[#fffce1]/50')}`}>
                    {l}
                  </button>
                ))}
              </div>
              <a href="https://t.me/swensi17" target="_blank" rel="noopener noreferrer"
                className={`px-5 py-2 rounded-[100px] border text-[13px] tracking-wide ${theme === 'light' ? 'border-[#141415] text-[#141415]' : 'border-[#fffce1] text-[#fffce1]'}`}>
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
