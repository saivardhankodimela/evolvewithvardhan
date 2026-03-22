import React, { useRef, useState, useEffect } from 'react';
import { DATA } from '../utils/data';
import { siReact, siPython, siFramer } from 'simple-icons/icons';
import { CalendarDays, Hash } from 'lucide-react';

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
      className="absolute -right-8 top-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] pointer-events-none z-0 opacity-10 dark:opacity-[0.15] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" 
      style={{ fill: color }} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </svg>
  );
};

// Individual Log Item measuring visibility
const LogItem = ({ log, index, activeIndex, elementRef }) => {
  const ref = useRef(null);
  
  // Forward the ref safely
  useEffect(() => {
    if (ref.current) {
        elementRef.current[index] = ref.current;
    }
  }, [index, elementRef]);

  const isActive = index === activeIndex;
  
  // High visibility for neighbors
  const scale = isActive ? 1 : 0.95;
  const opacity = isActive ? 1 : 0.6;
  const filter = isActive ? 'blur(0px)' : 'blur(2px)';
  const zIndex = isActive ? 20 : 10;

  // Category Colors
  let highlightColor = "rgba(255,255,255,0.05)";
  if (log.category === 'Learning') highlightColor = "rgba(6, 182, 212, 0.15)"; 
  if (log.category === 'Building') highlightColor = "rgba(16, 185, 129, 0.15)"; 
  if (log.category === 'Experimenting') highlightColor = "rgba(139, 92, 246, 0.15)"; 

  return (
    <div 
      ref={ref}
      className={`w-full flex justify-center transition-all duration-700 ease-out py-5 ${isActive ? 'scale-100' : 'scale-95'}`}
      style={{ 
        height: '320px', 
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
          className="absolute -inset-0.5 rounded-[28px] blur-md transition-opacity duration-700"
          style={{ backgroundColor: highlightColor, opacity: isActive ? 1 : 0 }} 
        />
        
        <div className="relative h-full w-full bg-white dark:bg-[#111111] backdrop-blur-3xl backdrop-saturate-200 border border-slate-200 dark:border-white/10 shadow-lg rounded-[24px] p-6 md:p-8 flex items-center overflow-hidden">
          
          <BackgroundSVG skill={log.skill} />

          <div className="relative z-10 w-full flex flex-col justify-center h-full">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white font-mono text-sm tracking-widest font-extrabold rounded-md shadow-sm border border-zinc-200 dark:border-white/5">
                {log.date}
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white dark:bg-black border border-zinc-200 dark:border-white/10 px-4 py-1.5 rounded-full shadow-md"
                    style={{
                      color: log.category === 'Learning' ? '#06b6d4' : log.category === 'Building' ? '#10b981' : '#8b5cf6'
                    }}>
                {log.category}
              </span>
            </div>

            <div className="max-w-[85%]">
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight group-hover:text-cobalt-600 dark:group-hover:text-cobalt-400 transition-colors">
                {log.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-semibold leading-relaxed line-clamp-3 md:line-clamp-4">
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
  const [selectedDate, setSelectedDate] = useState('');
  const itemRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  // Math-based precise scroll tracking using Viewport Coordinates
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Find absolute center line of the container on the screen
    const containerRect = container.getBoundingClientRect();
    const screenCenterLine = containerRect.top + (containerRect.height / 2);
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    itemRefs.current.forEach((el, index) => {
       if (!el) return;
       // Element's center line on the screen
       const rect = el.getBoundingClientRect();
       const elCenter = rect.top + (rect.height / 2);
       const distance = Math.abs(screenCenterLine - elCenter);
       
       if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
       }
    });
    
    if (closestIndex !== activeIndex) {
       setActiveIndex(closestIndex);
    }
  };

  // Focus Log via Date Picker
  const handleDateChange = (e) => {
    const targetDate = e.target.value;
    setSelectedDate(targetDate);
    
    if (targetDate && DATA.logs.length > 0) {
        const targetTime = new Date(targetDate).getTime();
        
        let closestIndex = 0;
        let minDiff = Infinity;

        DATA.logs.forEach((log, index) => {
            const logTime = new Date(log.date).getTime();
            const diff = Math.abs(logTime - targetTime);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = index;
            }
        });

        if (itemRefs.current[closestIndex] && scrollContainerRef.current) {
            // Scroll element precisely to center
            const container = scrollContainerRef.current;
            const el = itemRefs.current[closestIndex];
            const scrollPos = el.offsetTop - (container.clientHeight / 2) + (el.clientHeight / 2);
            container.scrollTo({ top: scrollPos, behavior: 'smooth' });
        }
    }
  };

  return (
    <section id="growth-log" className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Structural Header & Controls */}
      <div className="mb-10 relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-500 to-purple-500">Log</span>
          </h2>
        </div>

        {/* Stats & Controls Panel */}
        <div className="flex flex-wrap items-center gap-4 bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-sm">
           <div className="flex flex-col px-4 py-2 border-r border-slate-200 dark:border-white/10">
               <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">Total Logs</span>
               <div className="flex items-center gap-2">
                   <Hash size={14} className="text-cobalt-500" />
                   <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{DATA.logs.length}</span>
               </div>
           </div>
           
           <div className="flex flex-col px-4 py-2 border-r border-slate-200 dark:border-white/10">
               <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">Latest Entry</span>
               <span className="text-sm font-bold text-slate-900 dark:text-emerald-400 whitespace-nowrap">{DATA.logs[0]?.date}</span>
           </div>

           <div className="flex items-center gap-3 px-4 py-2 relative group cursor-pointer">
               <CalendarDays size={18} className="text-purple-500" />
               <input 
                  type="date" 
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none"
                  aria-label="Jump to Date"
               />
               {/* Custom styling for the native date picker indicator */}
               <style dangerouslySetInnerHTML={{__html: `
                 input[type="date"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    width: 100%;
                    height: 100%;
                 }
               `}} />
           </div>
        </div>
      </div>

      {/* The Scrollable Glass Block Container */}
      <div className="relative w-full rounded-[40px] md:rounded-[60px] glass-light dark:glass-dark border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden p-4 md:p-8 bg-slate-50/50 dark:bg-[#0a0a0a]/50">
        
        {/* The Ticker Scroll Container - Removed snap to preserve ordering and remove skipping */}
        <div 
             ref={scrollContainerRef}
             onScroll={handleScroll}
             className="relative h-[70vh] w-full overflow-y-auto scroll-smooth pr-2 md:pr-4 container-scroll" 
             style={{
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent'
             }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            .container-scroll::-webkit-scrollbar { width: 6px; }
            .container-scroll::-webkit-scrollbar-track { background: transparent; }
            .container-scroll::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.4); border-radius: 20px; }
          `}} />
          
          <div className="h-[20vh] w-full shrink-0" />
          
          <div className="flex flex-col items-center relative z-10 w-full">
            {DATA.logs.map((log, i) => (
              <LogItem 
                key={log.id} 
                log={log} 
                index={i} 
                activeIndex={activeIndex} 
                elementRef={itemRefs}
              />
            ))}
          </div>

          <div className="h-[30vh] w-full shrink-0" />
        </div>

        {/* Overlay Block Gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-100 dark:from-[#0a0a0a] to-transparent pointer-events-none z-30 rounded-t-[40px] md:rounded-t-[60px]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-100 dark:from-[#0a0a0a] to-transparent pointer-events-none z-30 rounded-b-[40px] md:rounded-b-[60px]" />

      </div>

    </section>
  );
};

export default GrowthTimeline;
