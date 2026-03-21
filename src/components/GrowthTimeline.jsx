import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '../utils/data';
import { siReact, siPython, siFramer } from 'simple-icons/icons';

// SVG Background Component with smooth crossfade
const BackgroundSVG = ({ skill }) => {
  if (!skill) return null;
  
  let path = '';
  let color = '';
  switch (skill) {
    case 'react': path = siReact.path; color = '#06b6d4'; break; // Liquid Cyan
    case 'python': path = siPython.path; color = '#8b5cf6'; break; // Neon Violet
    case 'framer': path = siFramer.path; color = '#10b981'; break; // Emerald
    default: return null;
  }
  
  return (
    <motion.svg 
      key={skill}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewBox="0 0 24 24" 
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] pointer-events-none z-0" 
      style={{ fill: color }} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </motion.svg>
  );
};

// Individual Log Item measuring visibility
const LogItem = ({ log, index, activeIndex, setActiveIndex }) => {
  const ref = useRef(null);
  
  // Use classic Intersection Observer to detect when this item hits the center
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveIndex(index);
        }
      },
      { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setActiveIndex]);

  const isActive = index === activeIndex;
  // Calculate relative distance for the analog watch curve
  const diff = index - activeIndex; 
  
  // Determines styles based on distance from center
  const scale = isActive ? 1 : 0.85;
  const opacity = isActive ? 1 : Math.abs(diff) === 1 ? 0.3 : 0.05;
  const filter = isActive ? 'blur(0px)' : 'blur(4px)';
  const zIndex = isActive ? 20 : 10;

  // Category Colors matching Liquid theme
  let highlightColor = "rgba(255,255,255,0.2)";
  if (log.category === 'Learning') highlightColor = "rgba(6, 182, 212, 0.4)"; // Cyan
  if (log.category === 'Building') highlightColor = "rgba(16, 185, 129, 0.4)"; // Emerald
  if (log.category === 'Experimenting') highlightColor = "rgba(139, 92, 246, 0.4)"; // Violet

  return (
    <div 
      ref={ref}
      className={`w-full flex justify-center snap-center transition-all duration-700 ease-out py-8`}
      style={{ 
        minHeight: '45vh', // Ensures it takes up enough space to isolate center
        opacity, 
        transform: `scale(${scale})`, 
        filter, 
        zIndex 
      }}
    >
      {/* The Apple Liquid Glass Card */}
      <div className="w-full max-w-2xl relative">
        <div 
          className="absolute -inset-0.5 rounded-[32px] blur-md transition-opacity duration-700"
          style={{ backgroundColor: isActive ? highlightColor : 'transparent', opacity: isActive ? 1 : 0 }} 
        />
        <div className="relative h-full w-full glass-light dark:glass-dark rounded-[30px] p-10 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-500 dark:text-slate-300 font-mono text-sm tracking-widest">
              {log.date}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-white opacity-80"
                  style={{
                    color: log.category === 'Learning' ? '#06b6d4' : log.category === 'Building' ? '#10b981' : '#8b5cf6'
                  }}>
              {log.category}
            </span>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-cobalt-500 transition-colors">
              {log.title}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {log.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const GrowthTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="growth-log" className="relative w-full py-24 overflow-hidden">
      
      {/* Structural Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12 relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-500 to-purple-500">Log</span>
        </h2>
        <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl">A scroll-linked analog ticker documenting my builds and explorations.</p>
      </div>

      {/* Massive Fixed Background SVG Container */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
        <AnimatePresence mode='popLayout'>
          <BackgroundSVG skill={DATA.logs[activeIndex]?.skill} />
        </AnimatePresence>
      </div>

      {/* The Ticker Scroll Container */}
      {/* Height optimized to show ~3 cards at a time (Center, top edge, bottom edge) */}
      <div className="relative h-[80vh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
        
        {/* Padding wrappers to allow the first and last items to snap to absolute center */}
        <div className="h-[20vh] w-full shrink-0" />
        
        <div className="flex flex-col items-center px-4 md:px-6 relative z-10 w-full max-w-5xl mx-auto">
          {DATA.logs.map((log, i) => (
            <LogItem 
              key={log.id} 
              log={log} 
              index={i} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>

        <div className="h-[20vh] w-full shrink-0" />
      </div>

      {/* Overlay gradient to boost "fading out" effect at the physical top/bottom of scroll box */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 dark:from-[var(--color-slate-900)] to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-[var(--color-slate-900)] to-transparent pointer-events-none z-30" />

    </section>
  );
};

export default GrowthTimeline;
