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

// Map Skill attributes to actual Tech SVGs
const SkillIcon = ({ skill }) => {
  switch (skill) {
    case 'react':
      return <SVGIcon path={siReact.path} color="#61DAFB" />;
    case 'python':
      return <SVGIcon path={siPython.path} color="#3776AB" />;
    case 'framer':
      return <SVGIcon path={siFramer.path} color="#0055FF" />;
    default:
      return null;
  }
};

const GrowthTimeline = () => {
  const containerRef = useRef(null);
  
  // Framer Motion Hook to read scroll progress smoothly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Spring physics for the central drawing line (Terminal Industries vibe)
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative w-full max-w-3xl mx-auto py-10" ref={containerRef}>
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Changelog & Learnings</h2>
        <p className="text-slate-500 dark:text-slate-400">Chronological history of my build logs.</p>
      </div>

      <div className="relative">
        {/* The Unified Persistent Background Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />
        
        {/* The Animated "Drawing" Line powered by Scroll */}
        <motion.div 
          className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cobalt-500 to-purple-500 origin-top shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ scaleY }}
        />

        {/* Map through the Notion Data */}
        <div className="space-y-16">
          {DATA.logs.map((log, index) => {
            
            // Determine the "Category/Action" Color state
            let dotColor = "bg-slate-300 dark:bg-slate-700"; // Default
            let glow = "";
            
            if (log.category === 'Learning') {
              dotColor = "bg-cobalt-500";
              glow = "shadow-[0_0_12px_rgba(59,130,246,0.6)]";
            } else if (log.category === 'Building') {
              dotColor = "bg-emerald-500";
              glow = "shadow-[0_0_12px_rgba(16,185,129,0.6)]";
            } else if (log.category === 'Experimenting') {
              dotColor = "bg-purple-500";
              glow = "shadow-[0_0_12px_rgba(168,85,247,0.6)]";
            }

            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* The Timeline Dot */}
                <div className={`absolute left-[26px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${dotColor} ${glow} z-10 transition-colors duration-300`} />

                {/* The Entry Card (Glassmorphism L2 Pearl / Dark) */}
                <div className="group glass-light dark:glass-dark p-6 hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    
                    {/* Date and SVG Meta Tag */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono tracking-tight">
                        {log.date}
                      </span>
                      
                      {/* The Skill Badge */}
                      {log.skill && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50">
                          <SkillIcon skill={log.skill} />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                            {log.skill}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Category Badge */}
                    <div className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border opacity-80"
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
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-cobalt-600 dark:group-hover:text-cobalt-400 transition-colors">
                    {log.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {log.description}
                  </p>
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
