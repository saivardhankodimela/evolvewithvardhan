import React, { useRef, useState, useEffect } from 'react';
import { DATA } from '../utils/data';
import { siReact, siPython, siFramer } from 'simple-icons/icons';

// Localized SVG Background Component
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
    <svg 
      viewBox="0 0 24 24" 
      className="absolute -right-8 top-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] pointer-events-none z-0 opacity-10 dark:opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" 
      style={{ fill: color }} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </svg>
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
  
  // High visibility for neighbors (the user requested "50% visible previous/latest")
  const scale = isActive ? 1 : 0.92;
  const opacity = isActive ? 1 : 0.6;
  const filter = isActive ? 'blur(0px)' : 'blur(1px)';
  const zIndex = isActive ? 20 : 10;

  // Category Colors
  let highlightColor = "rgba(255,255,255,0.05)";
  if (log.category === 'Learning') highlightColor = "rgba(6, 182, 212, 0.2)"; 
  if (log.category === 'Building') highlightColor = "rgba(16, 185, 129, 0.2)"; 
  if (log.category === 'Experimenting') highlightColor = "rgba(139, 92, 246, 0.2)"; 

  return (
    <div 
      ref={ref}
      className="w-full flex justify-center snap-center transition-all duration-500 ease-out py-4"
      style={{ 
        height: '28vh', // Perfectly sized so 3-4 fit elegantly in the scrolling viewport
        opacity, 
        transform: `scale(${scale})`, 
        filter, 
        zIndex 
      }}
    >
      {/* Rectangular Apple Liquid Glass Card */}
      <div className="w-full max-w-4xl relative group h-full">
        {/* Glowing aura */}
        <div 
          className="absolute -inset-0.5 rounded-3xl blur-md transition-opacity duration-700"
          style={{ backgroundColor: highlightColor, opacity: isActive ? 1 : 0.4 }} 
        />
        
        <div className="relative h-full w-full bg-white/70 dark:bg-[#111111]/80 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 dark:border-white/10 shadow-xl rounded-[24px] p-6 md:p-8 flex items-center overflow-hidden">
          
          {/* Localized Background Tech SVG */}
          <BackgroundSVG skill={log.skill} />

          <div className="relative z-10 w-full flex flex-col justify-center h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-slate-200/50 dark:bg-black/30 text-slate-600 dark:text-slate-400 font-mono text-xs tracking-widest font-bold rounded-md">
                {log.date}
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white dark:bg-black/50 border border-slate-200 dark:border-white/5 px-3 py-1 rounded-full shadow-sm"
                    style={{
                      color: log.category === 'Learning' ? '#06b6d4' : log.category === 'Building' ? '#10b981' : '#8b5cf6'
                    }}>
                {log.category}
              </span>
            </div>

            <div className="max-w-[80%]">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-cobalt-500 transition-colors line-clamp-1">
                {log.title}
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                {log.description}
              </p>
            </div>
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
      <div className="mb-8 relative z-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-500 to-purple-500">Log</span>
        </h2>
      </div>

      {/* The Scrollable Glass Block Container */}
      <div className="relative w-full rounded-[40px] md:rounded-[60px] glass-light dark:glass-dark border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden p-4 md:p-8 bg-slate-50/30 dark:bg-[#0a0a0a]/50">
        
        {/* The Ticker Scroll Container */}
        <div className="relative h-[70vh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth pr-2 md:pr-4" 
             style={{
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent'
             }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.4); border-radius: 20px; }
          `}} />
          
          <div className="h-[21vh] w-full shrink-0" />
          
          <div className="flex flex-col items-center relative z-10 w-full pt-4">
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

          <div className="h-[21vh] w-full shrink-0" />
        </div>

        {/* Overlay Block Gradients to fade out the top and bottom of the box frame */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent pointer-events-none z-30 rounded-t-[40px] md:rounded-t-[60px]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none z-30 rounded-b-[40px] md:rounded-b-[60px]" />

      </div>

    </section>
  );
};

export default GrowthTimeline;
