import React from 'react';
import { motion } from 'framer-motion';

const CompaniesSection: React.FC = () => {
  // Only using items that have corresponding SVGs in the /public/svg folder
  const techRow1 = [
    { name: 'JavaScript', icon: 'javascript.svg' },
    { name: 'TypeScript', icon: 'typescript.svg' },
    { name: 'Python', icon: 'python.svg' },
    { name: 'Golang', icon: 'golang_dark.svg' },
    { name: 'Swift', icon: 'swift.svg' },
    { name: 'C++', icon: 'c-plusplus.svg' },
    { name: 'C#', icon: 'csharp.svg' }
  ];

  const techRow2 = [
    { name: 'Java', icon: 'java.svg' },
    { name: 'OpenAI', icon: 'openai_dark.svg' },
    { name: 'Claude', icon: 'claude-ai-wordmark-icon_dark.svg', wide: true },
    { name: 'MongoDB', icon: 'mongodb-icon-dark.svg' },
    { name: 'MySQL', icon: 'mysql-icon-dark.svg' },
    { name: 'Redis', icon: 'redis.svg' },
    { name: 'Supabase', icon: 'supabase_wordmark_dark.svg', wide: true }
  ];

  const techRow3 = [
    { name: 'Turso', icon: 'turso-dark.svg' },
    { name: 'Neon', icon: 'neon.svg' },
    { name: 'SQLite', icon: 'sqlite.svg' },
    { name: 'MariaDB', icon: 'mariadb.svg' },
    { name: 'Figma', icon: 'figma.svg' },
    { name: 'Vite', icon: 'vite.svg' }
  ];

  // Tripling for seamless infinite scroll
  const fullRow1 = [...techRow1, ...techRow1, ...techRow1];
  const fullRow2 = [...techRow2, ...techRow2, ...techRow2];
  const fullRow3 = [...techRow3, ...techRow3, ...techRow3];

  // Animation duration
  const scrollDuration = 50;

  return (
    <section id="stack" className="bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-32 relative overflow-hidden border-t border-white/5">
      <div className="px-6 md:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
          <div className="lg:col-span-5 text-left">
            <span className="text-[#FF3B30] text-xs font-mono tracking-widest block mb-4 md:mb-6 uppercase">
              [ Инструменты ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6">
              Стек <span className="text-[#FF3B30]">решений</span>
            </h2>
            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
              Мы используем передовые технологии и сотрудничаем с ведущими платформами для обеспечения максимальной скорости и безопасности.
            </p>
          </div>
        </div>
      </div>

      {/* Marquees - Square Grid Aesthetics */}
      <div className="relative w-full flex flex-col overflow-hidden bg-[#0A0A0A] border-y border-white/10">
        
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Moves Left */}
        <div className="flex overflow-hidden w-full whitespace-nowrap border-b border-white/5">
          <motion.div 
            className="flex w-fit"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ repeat: Infinity, duration: scrollDuration, ease: "linear" }}
          >
            {fullRow1.map((tech, i) => (
              <div key={i} className="h-20 sm:h-24 md:h-28 w-[110px] sm:w-[160px] md:w-[200px] border-r border-white/10 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors relative shrink-0">
                <img src={`/aileaderteam/svg/${tech.icon}`} alt={tech.name} className={`object-contain mb-2 ${tech.wide ? 'w-16 sm:w-24 md:w-32 h-4 sm:h-6 md:h-8' : 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10'}`} />
                <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex overflow-hidden w-full whitespace-nowrap border-b border-white/5">
          <motion.div 
            className="flex w-fit"
            animate={{ x: ["-33.333333%", "0%"] }}
            transition={{ repeat: Infinity, duration: scrollDuration + 10, ease: "linear" }}
          >
            {fullRow2.map((tech, i) => (
              <div key={i} className="h-20 sm:h-24 md:h-28 w-[110px] sm:w-[160px] md:w-[200px] border-r border-white/10 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors relative shrink-0">
                <img src={`/aileaderteam/svg/${tech.icon}`} alt={tech.name} className={`object-contain mb-2 ${tech.wide ? 'w-16 sm:w-24 md:w-32 h-4 sm:h-6 md:h-8' : 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10'}`} />
                <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 3 - Moves Left */}
        <div className="flex overflow-hidden w-full whitespace-nowrap">
          <motion.div 
            className="flex w-fit"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ repeat: Infinity, duration: scrollDuration - 5, ease: "linear" }}
          >
            {fullRow3.map((tech, i) => (
              <div key={i} className="h-20 sm:h-24 md:h-28 w-[110px] sm:w-[160px] md:w-[200px] border-r border-white/10 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors relative shrink-0">
                <img src={`/aileaderteam/svg/${tech.icon}`} alt={tech.name} className={`object-contain mb-2 ${tech.wide ? 'w-16 sm:w-24 md:w-32 h-4 sm:h-6 md:h-8' : 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10'}`} />
                <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CompaniesSection;
