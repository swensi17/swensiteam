import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  { 
    name: "Telegram Bots", 
    desc: "We develop bots of any complexity — from simple informational ones to complex enterprise solutions with payments, CRM integrations, and business process automation.",
    features: ["Payment Systems", "CRM Integrations", "Automation"]
  },
  { 
    name: "Websites", 
    desc: "We create modern web applications with React and TypeScript. Landing pages, corporate sites, SPA applications, admin panels with responsive design.",
    features: ["React / TypeScript", "Responsive Design", "High Performance"]
  },
  { 
    name: "iOS / Android", 
    desc: "Native and cross-platform mobile apps. Using Swift for iOS, Kotlin and Java for Android. Publishing to App Store and Google Play.",
    features: ["Swift / Kotlin", "Store Publishing", "Push Notifications"]
  },
  { 
    name: "Parsers", 
    desc: "Automatic data collection from any website. Bypass protections, work with dynamic content, export to convenient formats. Price and competitor monitoring.",
    features: ["Protection Bypass", "Dynamic Content", "Data Export"]
  },
  { 
    name: "API", 
    desc: "We design and develop REST and GraphQL APIs. Integrations with any external services, payment systems, social networks, and messengers.",
    features: ["REST / GraphQL", "Integrations", "Documentation"]
  },
  { 
    name: "Desktop", 
    desc: "Desktop applications for Windows, Linux, and macOS. Utilities, workflow automation, file and database management.",
    features: ["Windows / macOS", "Automation", "Cross-platform"]
  },
  { 
    name: "CI/CD", 
    desc: "Setting up automatic deployment and testing. GitHub Actions, GitLab CI, Jenkins. Faster development and fewer errors.",
    features: ["GitHub Actions", "Auto Tests", "Fast Deploy"]
  },
  { 
    name: "VPS", 
    desc: "Full server infrastructure setup. Docker containers, Nginx, SSL certificates, monitoring, backups, and attack protection.",
    features: ["Docker / Nginx", "SSL / Security", "Monitoring"]
  },
];

const ServiceDescription: React.FC<{
  service: typeof services[0];
  index: number;
  scrollProgress: any;
}> = ({ service, index, scrollProgress }) => {
  const segmentSize = 1 / services.length;
  const start = Math.max(0, index * segmentSize - 0.02);
  const peak = index * segmentSize + segmentSize / 2;
  const end = Math.min(1, (index + 1) * segmentSize + 0.02);

  const opacity = useTransform(scrollProgress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(scrollProgress, [start, peak, end], [80, 0, -80]);
  const rotateX = useTransform(scrollProgress, [start, peak, end], [25, 0, -25]);
  const scale = useTransform(scrollProgress, [start, peak, end], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, y, rotateX, scale, transformPerspective: 1000 }}
      className="absolute inset-0 flex flex-col justify-center origin-center"
    >
      {/* Title - large and stylish */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6">
        {service.name}
      </h3>

      {/* Description - larger and more readable */}
      <p className="text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        {service.desc}
      </p>

      {/* Number */}
      <div className="flex items-center gap-4">
        <span className="text-[#FF3B30] font-mono text-sm tracking-[0.2em]">
          [ {String(index + 1).padStart(2, '0')} ]
        </span>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // On mobile show stylish chain
  if (isMobile) {
    return (
      <section id="services" className="relative bg-[#050505] border-t border-white/5 py-16 px-6">
        <div className="flex justify-between items-center mb-8">
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 02 / 09 ]</span>
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">SERVICES</span>
        </div>
        
        <div className="mb-12">
          <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em] block mb-3">[ OUR SERVICES ]</span>
          <h2 className="text-3xl font-bold tracking-tight text-white">What We Do</h2>
        </div>
        
        {/* Timeline chain */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF3B30] via-white/20 to-transparent" />
          
          <div className="space-y-0">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-12 pb-8"
              >
                {/* Circle node */}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-[#FF3B30] bg-[#050505] flex items-center justify-center">
                  <span className="text-[#FF3B30] font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                
                {/* Content card */}
                <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-5 relative overflow-hidden">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF3B30]" />
                  
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                  
                  {/* Features as pills */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 text-[10px] font-mono tracking-wider bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-neutral-500 text-xs mb-2">Ready to discuss your project?</p>
          <Button text="DISCUSS PROJECT" />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="services"
      ref={containerRef} 
      className="relative bg-[#050505] border-t border-white/5" 
      style={{ height: `${services.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 02 / 09 ]</span>
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">SERVICES</span>
        </div>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 md:px-12 pb-8">
          
          {/* Left part - title and info */}
          <div className="flex flex-col justify-center h-full">
            {/* Title section - left */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em] block mb-3">
                [ OUR SERVICES ]
              </span>
              <h2 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase text-neutral-400">
                WHAT WE DO:
              </h2>
            </motion.div>
            
            <div className="relative h-[350px] md:h-[400px]">
              {services.map((service, index) => (
                <ServiceDescription 
                  key={index}
                  service={service}
                  index={index}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
            
            {/* Button */}
            <div className="mt-8">
              <Button text="DISCUSS PROJECT" />
            </div>
          </div>
          
          {/* Right part - large names */}
          <div className="relative flex items-center justify-end overflow-hidden">
            {/* Gradients */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col items-end justify-center">
              {services.map((service, index) => {
                const segmentSize = 1 / services.length;
                const start = index * segmentSize;
                const peak = start + segmentSize / 2;
                const end = (index + 1) * segmentSize;

                return (
                  <ServiceNameItem
                    key={index}
                    name={service.name}
                    scrollProgress={scrollYProgress}
                    start={start}
                    peak={peak}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Service name component
const ServiceNameItem: React.FC<{
  name: string;
  scrollProgress: any;
  start: number;
  peak: number;
  end: number;
}> = ({ name, scrollProgress, start, peak, end }) => {
  const color = useTransform(
    scrollProgress,
    [start, peak, end],
    ["rgb(64, 64, 64)", "rgb(255, 59, 48)", "rgb(64, 64, 64)"]
  );

  return (
    <motion.div
      style={{ color }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.95] text-right select-none cursor-default transition-colors duration-300 hover:text-[#FF3B30]"
    >
      {name}
    </motion.div>
  );
};

export default Services;
