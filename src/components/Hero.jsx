import { motion } from 'framer-motion';
import { Terminal, Send, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] pt-32 pb-10 flex items-center">
      
      {/* Background Ambience Controls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 mix-blend-screen filter blur-[100px] rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cobalt-500/10 mix-blend-screen filter blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        
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

          {/* Call to Action - Priority DM */}
          <a href="#connect" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden mt-4">
            <span className="relative z-10 text-lg">Priority DM & Connect</span>
            <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </a>
        </motion.div>

        {/* Right Column: Abstract Space-Filling Composition (Liquid Glass Simulation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center pointer-events-none"
        >
          {/* The Composition Base - A Floating Glass Morphism structure */}
          <div className="relative w-full max-w-md aspect-square">
            
            {/* Core Orb */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-10 rounded-full bg-gradient-to-tr from-cobalt-500 to-purple-600 filter blur-3xl opacity-50 dark:opacity-40"
            />

            {/* Main Glass Panel */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute inset-4 rounded-[40px] glass-light dark:glass-dark border border-white/40 dark:border-white/10 shadow-2xl flex items-center justify-center overflow-hidden"
            >
               {/* Internal Decorative Elements */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 dark:bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/4" />
               
               <Terminal size={120} className="text-slate-900/10 dark:text-white/10" strokeWidth={1} />
            </motion.div>
            
            {/* Floating Satellite Glass Panel 1 */}
            <motion.div 
              animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 top-16 w-32 h-32 rounded-3xl glass-light dark:glass-dark border border-white/50 dark:border-white/10 shadow-xl flex items-center justify-center backdrop-blur-3xl"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600" />
            </motion.div>

            {/* Floating Satellite Glass Panel 2 */}
            <motion.div 
              animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
              className="absolute -left-12 bottom-20 w-40 h-24 rounded-3xl glass-light dark:glass-dark border border-white/50 dark:border-white/10 shadow-xl flex items-center justify-center backdrop-blur-3xl"
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-cobalt-400" />
                <div className="w-3 h-3 rounded-full bg-purple-400" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
