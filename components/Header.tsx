import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowUpRight, 
  Compass, 
  Briefcase, 
  Code2, 
  ShieldCheck, 
  GitMerge, 
  HelpCircle, 
  Mail 
} from 'lucide-react';

const navItems = [
  { 
    label: 'Главная', href: '#home', id: 'home', icon: Compass,
    menu: {
      title: "Точка отсчета",
      desc: "Знакомство с нашей философией разработки и ключевыми принципами создания цифровых продуктов элитного качества под ключ.",
      subItems: ["Обзор", "Наши технологии", "Профиль Студии", "Миссия и Видение"]
    }
  },
  { 
    label: 'Услуги', href: '#services', id: 'services', icon: Briefcase,
    menu: {
      title: "Комплексная разработка",
      desc: "Воплощаем функциональность: от чистой архитектуры и дизайна до написания масштабируемого кода. Мы покрываем все потребности современного бизнеса.",
      subItems: ["Фронтенд Решения", "Бэкенд Системы", "Telegram-боты", "UI/UX Дизайн"]
    }
  },
  { 
    label: 'Стек', href: '#stack', id: 'stack', icon: Code2,
    menu: {
      title: "Технологический путь",
      desc: "Мы используем самые актуальные фреймворки и языки программирования для создания продуктов, которые опережают время.",
      subItems: ["Frontend Stack", "Backend Stack", "Database systems", "Cloud & Infra"]
    }
  },
  { 
    label: 'Безопасность', href: '#security', id: 'security', icon: ShieldCheck,
    menu: {
      title: "Информационная защита",
      desc: "Мы берем на себя полную ответственность за сохранность ваших данных. Сертификаты шифрования и стабильность инфраструктуры — наш приоритет.",
      subItems: ["Аудит уязвимостей", "Защита от DDoS", "Резервные копии", "Шифрование данных"]
    }
  },
  { 
    label: 'Процесс', href: '#process', id: 'process', icon: GitMerge,
    menu: {
      title: "Прозрачные этапы",
      desc: "Высокий уровень контроля на каждом шаге. Вы всегда точно знаете, на каком этапе находится ваш продукт, благодаря нашей методологии.",
      subItems: ["Брифинг & Анализ", "Проектирование", "Разработка и Тесты", "Релиз & Поддержка"]
    }
  },
  { 
    label: 'FAQ', href: '#faq', id: 'faq', icon: HelpCircle,
    menu: {
      title: "База знаний",
      desc: "Наши ответы на самые популярные вопросы: от сроков разработки до юридических гарантий и условий поддержки.",
      subItems: ["Гарантии и Договор", "Сроки разработки", "Оплата и Поддержка", "Техническое задание"]
    }
  },
  { 
    label: 'Контакты', href: '#contacts', id: 'contacts', icon: Mail,
    menu: {
      title: "Прямая связь",
      desc: "Остались вопросы или готовы начать проект? Напишите нам прямо сейчас, мы всегда на связи и открыты к диалогу.",
      subItems: ["Написать в Telegram", "Оставить заявку", "Наш канал", "Наш офис"]
    }
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuObj, setActiveMenuObj] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'stack', 'security', 'process', 'faq', 'contacts'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id);
    const item = navItems.find(n => n.id === id);
    if (item?.menu) setActiveMenuObj(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 hidden lg:block ${
          scrolled || (hoveredItem && activeMenuObj?.menu)
            ? 'bg-[#050505] shadow-2xl' 
            : 'bg-transparent'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col items-center">
          <div className="pt-4 relative">
            <nav className="flex items-center bg-white/5 rounded-full px-1.5 py-1.5 backdrop-blur-md border border-white/10 shadow-xl relative z-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredItem === item.id;
                const Icon = item.icon;
                
                return (
                  <a 
                    key={item.id}
                    href={item.href}
                    className="relative px-4 py-1.5 cursor-pointer flex items-center gap-2"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onClick={(e) => scrollToSection(e, item.href)}
                  >
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          layoutId="activeBubble"
                          className={`absolute inset-0 rounded-full z-0 ${isActive ? 'bg-[#FF3B30]' : 'bg-white/10'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </AnimatePresence>

                    {Icon && (
                      <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors duration-300 ${(isActive || isHovered) ? 'text-white' : 'text-neutral-500'}`} />
                    )}

                    <span className={`relative z-10 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {item.label}
                    </span>

                    {item.menu && (
                      <ChevronDown 
                        className={`w-3 h-3 relative z-10 transition-transform duration-300 ${(isActive || isHovered) ? 'text-white' : 'text-neutral-500'} ${isHovered ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <AnimatePresence>
              {hoveredItem && activeMenuObj?.menu && (
                <div className="absolute top-full left-0 w-full pt-0.5 pointer-events-none">
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.23, 1, 0.32, 1],
                      layout: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ originY: 0 }}
                    className="w-full overflow-hidden bg-[#0A0A0A] border-x border-b border-white/5 rounded-b-[28px] shadow-2xl pointer-events-auto"
                    onMouseEnter={() => handleMouseEnter(hoveredItem)}
                  >
                    <div className="p-8 flex items-stretch gap-8">
                      <div className="flex flex-col gap-4 min-w-[200px] pt-1">
                        {activeMenuObj.menu.subItems.map((sub: string, idx: number) => (
                          <a 
                            key={idx} 
                            href={activeMenuObj.href} 
                            onClick={(e) => scrollToSection(e, activeMenuObj.href)}
                            className="group flex items-center justify-between text-[14px] font-medium text-neutral-300 hover:text-white transition-colors"
                          >
                            <span className="relative inline-block overflow-hidden">
                              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {sub}
                              </span>
                              <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-[#FF3B30]">
                                {sub}
                              </span>
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#FF3B30] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                          </a>
                        ))}
                      </div>

                      <div className="flex-1 bg-white/[0.03] rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF3B30]/20 rounded-full blur-3xl group-hover:bg-[#FF3B30]/30 transition-colors duration-500 pointer-events-none" />
                        <h4 className="text-[#FF3B30] text-[9px] tracking-widest font-mono mb-3 uppercase">
                          [ {activeMenuObj.menu.title} ]
                        </h4>
                        <p className="text-neutral-400 text-[13px] leading-relaxed font-light">
                          {activeMenuObj.menu.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] backdrop-blur-3xl lg:hidden flex flex-col"
          >
            <nav className="flex-1 overflow-y-auto pt-24 pb-6 px-6">
              <div className="flex flex-col">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`group flex items-center justify-between py-3.5 border-b border-white/5 text-[20px] font-medium tracking-tight transition-colors duration-300 ${
                        activeSection === item.id ? 'text-[#FF3B30]' : 'text-white'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        {Icon && (
                          <Icon className={`w-6 h-6 transition-colors duration-300 ${activeSection === item.id ? 'text-[#FF3B30]' : 'text-neutral-500 group-hover:text-white'}`} />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 -rotate-90 transition-colors duration-300 ${activeSection === item.id ? 'text-[#FF3B30]' : 'text-neutral-600 group-hover:text-white'}`} 
                      />
                    </motion.a>
                  )
                })}
              </div>
            </nav>

            {/* Mobile Menu Footer - Removed to prevent duplication */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple Mobile Floating Header */}
      <div 
        className={`fixed z-50 lg:hidden transition-all duration-300 left-4 right-4 h-14 rounded-full border border-white/10 backdrop-blur-xl ${
          (scrolled && !mobileMenuOpen) 
            ? 'top-4 bg-[#050505]/90 opacity-100 shadow-2xl' 
            : 'top-2 bg-transparent border-transparent opacity-0'
        }`}
      />

      {/* Fixed Mobile Branding (Star) - Hide when menu is open */}
      <motion.div 
        className="lg:hidden fixed top-4 left-4 z-[60] pointer-events-none w-12 h-12 flex items-center justify-center"
        animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[48px] font-mono leading-none text-[#FF8C00] block drop-shadow-[0_0_15px_rgba(255,140,0,0.3)]">*</span>
      </motion.div>

      {/* Fixed Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-6 right-6 z-[60] transition-none">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-end justify-center gap-1.5 p-2 bg-transparent"
        >
          <motion.span 
            animate={{ 
              rotate: mobileMenuOpen ? 45 : 0, 
              y: mobileMenuOpen ? 6 : 0,
              width: mobileMenuOpen ? "36px" : "32px"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[1.5px] bg-white origin-center"
          />
          <motion.span 
            animate={{ 
              opacity: mobileMenuOpen ? 0 : 1,
              scaleX: mobileMenuOpen ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
            className="w-9 h-[1.5px] bg-white"
          />
          <motion.span 
            animate={{ 
              rotate: mobileMenuOpen ? -45 : 0, 
              y: mobileMenuOpen ? -6 : 0,
              width: mobileMenuOpen ? "36px" : "32px"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[1.5px] bg-white origin-center"
          />
        </button>
      </div>
    </>
  );
};

export default Header;
