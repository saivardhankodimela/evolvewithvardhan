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
    case 'react': path = siReact.path; color = '#06b6d4'; break; 
    case 'python': path = siPython.path; color = '#8b5cf6'; break; 
    case 'framer': path = siFramer.path; color = '#10b981'; break; 
    default: return null;
  }
  
  return (
    <motion.svg 
      key={skill}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 1.5, rotate: 20 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewBox="0 0 24 24" 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none z-0" 
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
  
  // Adjusted visibility for the fade - keeping unselected items readable
  const scale = isActive ? 1 : 0.9;
  const opacity = isActive ? 1 : 0.4;
  const filter = isActive ? 'blur(0px)' : 'blur(2px)';
  const zIndex = isActive ? 20 : 10;

  // Category Colors matching Liquid theme
  let highlightColor = "rgba(255,255,255,0.1)";
  if (log.category === 'Learning') highlightColor = "rgba(6, 182, 212, 0.3)"; 
  if (log.category === 'Building') highlightColor = "rgba(16, 185, 129, 0.3)"; 
  if (log.category === 'Experimenting') highlightColor = "rgba(139, 92, 246, 0.3)"; 

  return (
    <div 
      ref={ref}
      className="w-full flex justify-center snap-center transition-all duration-700 ease-out py-6 md:py-10"
      style={{ 
        minHeight: '50vh', 
        opacity, 
        transform: `scale(${scale})`, 
        filter, 
        zIndex 
      }}
    >
      {/* The Apple Liquid Glass Card */}
      <div className="w-full max-w-3xl relative">
        <div 
          className="absolute -inset-0.5 rounded-[32px] blur-lg transition-opacity duration-700"
          style={{ backgroundColor: isActive ? highlightColor : 'transparent', opacity: isActive ? 1 : 0 }} 
        />
        <div className="relative h-full w-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 dark:border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.4),_0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.4)] rounded-[30px] p-8 md:p-12 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono text-sm tracking-widest font-bold border border-slate-900/10 dark:border-white/10">
              {log.date}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest bg-white dark:bg-black px-4 py-1.5 rounded-full shadow-sm"
                  style={{
                    color: log.category === 'Learning' ? '#06b6d4' : log.category === 'Building' ? '#10b981' : '#8b5cf6'
                  }}>
              {log.category}
            </span>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-cobalt-500 transition-colors">
              {log.title}
            </h3>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
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
    <section id="growth-log" className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Structural Header */}
      <div className="mb-12 relative z-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-500 to-purple-500">Log</span>
        </h2>
      </div>

      {/* The Scrollable Glass Block Container */}
      <div className="relative w-full rounded-[40px] md:rounded-[60px] glass-light dark:glass-dark border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden p-4 md:p-10">
        
        {/* Massive Fixed Background SVG Container - Centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
          <AnimatePresence mode='popLayout'>
            <BackgroundSVG skill={DATA.logs[activeIndex]?.skill} />
          </AnimatePresence>
        </div>

        {/* The Ticker Scroll Container */}
        {/* Added custom thin scrollbar styling to clearly indicate scrollable length */}
        <div className="relative h-[70vh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth pr-2 md:pr-4" 
             style={{
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
             }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.5); border-radius: 20px; }
          `}} />
          
          <div className="h-[20vh] w-full shrink-0" />
          
          <div className="flex flex-col items-center relative z-10 w-full">
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

        {/* Overlay Block Gradients to fade out the top and bottom of the box frame */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white dark:from-black/80 to-transparent pointer-events-none z-30 rounded-t-[40px] md:rounded-t-[60px]" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-black/80 to-transparent pointer-events-none z-30 rounded-b-[40px] md:rounded-b-[60px]" />

      </div>

    </section>
  );
};

export default GrowthTimeline;
