import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { siReact, siPython, siFramer } from 'simple-icons';
import { DATA } from '../utils/data';

// SVG Renderer for Simple Icons
const SVGIcon = ({ path, color, size = 18 }) => (
  <svg role="img" viewBox="0 0 24 24" style={{ width: size, height: size, fill: color }} xmlns="http://www.w3.org/2000/svg">
    <path d={path} />
  </svg>
);

// Map Skill attributes to actual Tech SVGs (Huge Background Version)
const BackgroundSVG = ({ skill }) => {
  let path = '';
  let color = '';
  switch (skill) {
    case 'react':
      path = siReact.path; color = '#61DAFB'; break;
    case 'python':
      path = siPython.path; color = '#3776AB'; break;
    case 'framer':
      path = siFramer.path; color = '#0055FF'; break;
    default:
      return null;
  }
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full opacity-[0.07] dark:opacity-[0.15]" style={{ fill: color }} xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  );
};

const GrowthTimeline = () => {
  const containerRef = useRef(null);
  
  // Framer Motion Hook to read scroll progress smoothly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Spring physics for the central drawing line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative w-full max-w-4xl mx-auto py-20" ref={containerRef}>
      
      {/* Section Header */}
      <div className="mb-20 text-center md:text-left md:ml-20">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">Growth & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500">Changelog</span></h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">Chronological history of my explorations and builds.</p>
      </div>

      <div className="relative">
        {/* The Unified Persistent Background Line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full" />
        
        {/* The Animated "Drawing" Line powered by Scroll */}
        <motion.div 
          className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cobalt-500 to-purple-500 origin-top shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full"
          style={{ scaleY }}
        />

        {/* Map through the Notion Data */}
        <div className="space-y-24">
          {DATA.logs.map((log, index) => {
            
            // Determine the "Category/Action" Color state
            let dotColor = "bg-slate-300 dark:bg-slate-700";
            let glow = "";
            let categoryGradient = "";
            let borderColor = "";
            
            if (log.category === 'Learning') {
              dotColor = "bg-cobalt-500";
              glow = "shadow-[0_0_20px_rgba(59,130,246,0.8)]";
              categoryGradient = "from-cobalt-500/10 to-transparent";
              borderColor = "border-cobalt-500/30";
            } else if (log.category === 'Building') {
              dotColor = "bg-emerald-500";
              glow = "shadow-[0_0_20px_rgba(16,185,129,0.8)]";
              categoryGradient = "from-emerald-500/10 to-transparent";
              borderColor = "border-emerald-500/30";
            } else if (log.category === 'Experimenting') {
              dotColor = "bg-purple-500";
              glow = "shadow-[0_0_20px_rgba(168,85,247,0.8)]";
              categoryGradient = "from-purple-500/10 to-transparent";
              borderColor = "border-purple-500/30";
            }

            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="relative pl-16 md:pl-28 group"
              >
                {/* The Timeline Dot */}
                <div className={`absolute left-[22px] md:left-[26px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-900 ${dotColor} ${glow} z-20 transition-all duration-500 group-hover:scale-150`} />

                {/* Massive Background SVG Container */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 pointer-events-none z-0 transform transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 group-hover:opacity-60">
                  {log.skill && <BackgroundSVG skill={log.skill} />}
                </div>

                {/* The Entry Card (Frosted Glass Overlaying the SVG) */}
                <div className={`relative z-10 overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/60 dark:bg-slate-900/60 border ${borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}>
                  
                  {/* Subtle internal gradient matching the category */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradient} pointer-events-none`} />

                  <div className="relative p-8 md:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
                      
                      {/* Date */}
                      <span className="px-3 py-1 bg-slate-100/50 dark:bg-black/20 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono tracking-tight backdrop-blur-md">
                        {log.date}
                      </span>

                      {/* Action Category Badge */}
                      <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border backdrop-blur-md shadow-sm"
                        style={{
                          color: log.category === 'Learning' ? '#3b82f6' : log.category === 'Building' ? '#10b981' : '#a855f7',
                          borderColor: log.category === 'Learning' ? 'rgba(59,130,246,0.3)' : log.category === 'Building' ? 'rgba(16,185,129,0.3)' : 'rgba(168,85,247,0.3)',
                          backgroundColor: log.category === 'Learning' ? 'rgba(59,130,246,0.1)' : log.category === 'Building' ? 'rgba(16,185,129,0.1)' : 'rgba(168,85,247,0.1)'
                        }}
                      >
                        {log.category}
                      </div>

                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cobalt-600 dark:group-hover:text-cobalt-400 transition-colors relative z-10">
                      {log.title}
                    </h3>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium relative z-10">
                      {log.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GrowthTimeline;
