import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-10 flex flex-col items-start gap-6">
      
      {/* Dynamic Background Glow - Cobalt & Purple Matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-cobalt-500/20 to-purple-500/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-50 dark:opacity-80 transition-opacity" />

      {/* Greeting Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        <Terminal size={14} className="text-cobalt-600 dark:text-cobalt-400" />
        <span>AI Generalist & Orchestration Builder</span>
      </motion.div>

      {/* Headline Suite */}
      <div className="space-y-4 max-w-2xl text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Sai Vardhan Kodimela
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Documenting my journey exploring AI, Agents, and Orchestration. Building tools, sharing learnings, and engineering a future scaling from India.
        </motion.p>
      </div>

      {/* Call to Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 mt-4"
      >
        {/* Primary CTA */}
        <button className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden">
          <span className="relative z-10">View My Work</span>
          <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </button>

        {/* Secondary CTA (Glass) */}
        <button className="px-6 py-3 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all">
          Let's Connect
        </button>
      </motion.div>
      
    </section>
  );
};

export default Hero;
