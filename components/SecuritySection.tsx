import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, Zap, MessageSquare, Key, Shield } from 'lucide-react';

const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      id: '01/',
      title: 'Безопасный доступ',
      desc: 'Многофакторная аутентификация (MFA) и строгий контроль доступа (IAM) обеспечивают защиту вашей учетной записи от несанкционированного проникновения.',
      icon: '/swensiteam/svg/surrealdb.svg',
      size: 'lg:col-start-1 lg:row-start-1',
      bg: 'bg-[#050505]',
      tag: 'Identity'
    },
    {
      id: '02/',
      title: 'Шифрование данных',
      desc: 'Мы используем алгоритм AES-256 для защиты всех данных "в покое" и протоколы TLS для обеспечения безопасности при передаче информации. Это гарантирует, что даже в случае перехвата трафика, ваши данные останутся недоступными для третьих лиц. Мы применяем сквозное шифрование для всех критических узлов инфраструктуры.',
      icon: '/swensiteam/svg/pocket-base.svg',
      size: 'lg:col-start-2 lg:row-span-2 lg:row-start-1',
      bg: 'bg-[#050505]',
      tag: 'Cryptography'
    },
    {
      id: '03/',
      title: 'Uptime 99.9%',
      desc: 'Наша инфраструктура спроектирована с учетом отказоустойчивости, что гарантирует стабильную работу ваших сервисов даже при пиковых нагрузках.',
      icon: '/swensiteam/svg/vitest.svg',
      size: 'lg:col-start-3 lg:row-start-1',
      bg: 'bg-[#050505]',
      tag: 'Reliability',
      scale: 'scale-125'
    },
    {
      id: '04/',
      title: 'Полная конфиденциальность',
      desc: 'Каждый проект сопровождается юридически обязывающим договором о неразглашении (NDA). Мы гарантируем полную защиту вашей интеллектуальной собственности на всех этапах разработки. Ваша идея — это ваша собственность, и мы юридически подтверждаем свою ответственность за её сохранность и нераспространение.',
      icon: '/swensiteam/svg/dotenv.svg',
      size: 'lg:col-span-1 lg:row-span-2 lg:row-start-2',
      bg: 'bg-[#0A0A0A]',
      tag: 'Legal'
    },
    {
      id: '05/',
      title: 'Infrastructure',
      desc: 'Развертывание в изолированных облачных кластерах с использованием современных практик Network Isolation и Firewalls для предотвращения внешних атак.',
      icon: '/swensiteam/svg/neon.svg',
      size: 'lg:col-start-3 lg:row-start-2',
      bg: 'bg-[#0A0A0A]',
      tag: 'Cloud'
    },
    {
      id: '06/',
      title: 'Аудит кода',
      desc: 'Регулярное проведение автоматизированного тестирования и ручного аудита безопасности специалистами для выявления потенциальных векторов атак.',
      icon: '/swensiteam/svg/oxc.svg',
      size: 'lg:col-start-2 lg:row-start-3',
      bg: 'bg-[#0A0A0A]',
      tag: 'Auditing',
      scale: 'scale-150'
    },
    {
      id: '07/',
      title: 'Активная защита',
      desc: 'Интеллектуальный мониторинг событий в реальном времени с использованием систем обнаружения вторжений (IDS) и предотвращения угроз.',
      icon: '/swensiteam/svg/microsoft-defender.svg',
      size: 'lg:col-start-3 lg:row-start-3',
      bg: 'bg-[#050505]',
      tag: 'Monitoring'
    }
  ];

  return (
    <section id="security" className="bg-[#050505] text-white py-16 relative overflow-hidden border-t border-white/5">
      {/* Header Container */}
      <div className="px-6 md:px-12 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-left"
        >
          Ваш проект под<br />
          <span className="text-[#FF3B30]">надёжной защитой.</span>
        </motion.h2>
      </div>

      {/* Advanced Bento: Tidy Separated Blocks */}
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
              {/* === Pro SVG Background with Rounded Notch and Consistent Border === */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 300 220" preserveAspectRatio="none" className="w-full h-full">
                  <path 
                    d="M 28 0 H 210 Q 240 0 240 30 V 30 Q 240 60 270 60 H 272 Q 300 60 300 88 V 192 Q 300 220 272 220 H 28 Q 0 220 0 192 V 28 Q 0 0 28 0 Z" 
                    fill="#0A0A0A" 
                    className="group-hover:fill-[#111111] transition-colors duration-500"
                    stroke="rgba(255, 255, 255, 0.1)" 
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* === Content === */}
              <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                {/* ID Label (Top Left) */}
                <div className="text-[9px] font-mono tracking-widest text-[#FF3B30] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>{feature.id}</span>
                </div>

                {/* Icon & Info */}
                <div className="flex flex-col gap-4 pt-4 flex-grow">
                  <div className="w-9 h-9 flex items-center justify-center relative overflow-hidden">
                     <img src={feature.icon} alt={feature.tag} className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100 ${feature.scale || ''}`} />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className={`font-bold tracking-tight text-white/90 group-hover:text-white transition-colors mb-2 ${feature.size.includes('row-span-2') ? 'text-xl md:text-2xl lg:text-3xl leading-snug' : 'text-lg md:text-xl'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-neutral-400 leading-relaxed max-w-[95%] transition-colors group-hover:text-white/60 ${feature.size.includes('row-span-2') ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'}`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>

                {/* Tag Label (Bottom Right) */}
                <div className="absolute bottom-6 right-8 text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase group-hover:text-[#FF3B30] transition-colors duration-500">
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
