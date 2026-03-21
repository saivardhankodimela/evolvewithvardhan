import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Track scroll position to power the "Growing Neural Tree"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"] // Tree finishes growing as they scroll past the hero
  });

  // Spring physics for smooth drawing
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const treeOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen pt-32 pb-10 flex items-center overflow-hidden">
      
      {/* Background Ambience Controls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 mix-blend-screen filter blur-[100px] rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cobalt-500/10 mix-blend-screen filter blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 px-6">
        
        {/* Left Column: Typography & Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-start gap-8"
        >
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-black/20 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Sparkles size={14} className="text-purple-500" />
            <span>AI Generalist & Orchestration Builder</span>
          </div>

          {/* Headline Suite */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Sai Vardhan <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cobalt-500">
                Kodimela
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium">
              Independent consultant, AI enthusiast, and orchestrations builder. Documenting my journey running agents and engineering a scalable future from India.
            </p>
          </div>

          {/* Call to Action - Connect */}
          <a href="#connect" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden mt-4">
            <span className="relative z-10 text-lg">Connect</span>
            <ArrowUpRight size={22} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </a>
        </motion.div>

        {/* Right Column: Scroll-Linked Growing Neural Tree */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center pointer-events-none">
          <motion.svg 
            viewBox="0 0 500 600" 
            className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            style={{ opacity: treeOpacity }}
          >
            <defs>
              <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" /> {/* Purple */}
                <stop offset="50%" stopColor="#06b6d4" /> {/* Cyan */}
                <stop offset="100%" stopColor="#10b981" /> {/* Emerald */}
              </linearGradient>
              <linearGradient id="branch1Grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Central Root / Trunk (Growing Downwards) */}
            <motion.path 
              d="M 250,50 C 250,150 250,250 250,550" 
              stroke="url(#treeGrad)" strokeWidth="6" fill="none"
              style={{ pathLength }} strokeLinecap="round" filter="url(#glow)"
            />

            {/* Left Main Branch */}
            <motion.path 
              d="M 250,200 C 150,250 100,200 50,150" 
              stroke="#8b5cf6" strokeWidth="4" fill="none"
              style={{ pathLength }} strokeLinecap="round" filter="url(#glow)"
            />
            {/* Left Sub-Branch 1 */}
            <motion.path 
              d="M 150,225 C 100,300 50,350 20,400" 
              stroke="#06b6d4" strokeWidth="2" fill="none"
              style={{ pathLength }} strokeLinecap="round"
            />

            {/* Right Main Branch */}
            <motion.path 
              d="M 250,300 C 350,350 400,250 450,200" 
              stroke="url(#branch1Grad)" strokeWidth="5" fill="none"
              style={{ pathLength }} strokeLinecap="round" filter="url(#glow)"
            />
            {/* Right Sub-Branch 1 */}
            <motion.path 
              d="M 350,325 C 400,400 450,450 480,500" 
              stroke="#10b981" strokeWidth="3" fill="none"
              style={{ pathLength }} strokeLinecap="round" filter="url(#glow)"
            />
            {/* Right Sub-Branch 2 */}
            <motion.path 
              d="M 400,275 C 450,300 480,280 500,250" 
              stroke="#06b6d4" strokeWidth="2" fill="none"
              style={{ pathLength }} strokeLinecap="round"
            />

            {/* Bottom Left Branch */}
            <motion.path 
              d="M 250,450 C 180,500 120,480 80,450" 
              stroke="#8b5cf6" strokeWidth="3" fill="none"
              style={{ pathLength }} strokeLinecap="round" filter="url(#glow)"
            />

            {/* Nodes / Leaves (appear as branches grow) */}
            <motion.circle cx="250" cy="50" r="8" fill="#8b5cf6" filter="url(#glow)" />
            <motion.circle cx="50" cy="150" r="6" fill="#8b5cf6" style={{ scale: pathLength }} filter="url(#glow)" />
            <motion.circle cx="450" cy="200" r="8" fill="#3b82f6" style={{ scale: pathLength }} filter="url(#glow)" />
            <motion.circle cx="20" cy="400" r="4" fill="#06b6d4" style={{ scale: pathLength }} />
            <motion.circle cx="480" cy="500" r="7" fill="#10b981" style={{ scale: pathLength }} filter="url(#glow)" />
            <motion.circle cx="80" cy="450" r="5" fill="#8b5cf6" style={{ scale: pathLength }} filter="url(#glow)" />
            <motion.circle cx="250" cy="550" r="10" fill="#10b981" style={{ scale: pathLength }} filter="url(#glow)" />
            <motion.circle cx="500" cy="250" r="4" fill="#06b6d4" style={{ scale: pathLength }} />

          </motion.svg>
        </div>

      </div>
    </section>
  );
};

export default Hero;
