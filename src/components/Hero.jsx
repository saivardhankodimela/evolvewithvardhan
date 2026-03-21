import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Tie the 3D Rotation to the user's physical scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 180]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen pt-32 pb-10 flex items-center overflow-hidden perspective-[1000px]">
      
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

        {/* Right Column: Scroll-Linked 3D Assembly */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center pointer-events-none transform-style-3d">
          
          <motion.div 
            style={{ rotateX, rotateY, scale, opacity }}
            className="w-64 h-64 md:w-80 md:h-80 relative transform-style-3d"
          >
            {/* 3D Core - Transforming on scroll */}
            <div className="absolute inset-0 border-[3px] border-cobalt-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-[2px] border-purple-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse] rotate-x-45" />
            <div className="absolute inset-8 border-[1px] border-emerald-500/50 rounded-full animate-[spin_20s_linear_infinite] rotate-y-45" />
            
            {/* The Floating Glass Plate Core */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center transform-style-3d"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 glass-light dark:glass-dark rounded-[40px] border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] flex items-center justify-center -translate-z-12 backdrop-blur-3xl">
                <div className="w-24 h-24 bg-gradient-to-tr from-cobalt-500 to-purple-600 rounded-full blur-xl opacity-80 animate-pulse" />
              </div>
            </motion.div>

            {/* Orbiting UI Elements mapped to the sphere */}
            <motion.div 
              className="absolute top-0 right-0 w-24 h-24 glass-light dark:glass-dark rounded-2xl flex items-center justify-center translate-z-24 translate-x-1/2 -translate-y-1/2 shadow-2xl border border-white/30"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
               <div className="w-6 h-6 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            </motion.div>
            
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
