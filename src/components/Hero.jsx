import { motion } from 'framer-motion';
import { Terminal, Send } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-10 flex flex-col items-center justify-center">
      
      {/* Abstract Background Glows for Glassmorphism Contrast */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[80px] rounded-full opacity-70 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cobalt-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[80px] rounded-full opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* The Glassmorphic Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl glass-light dark:glass-dark rounded-3xl p-10 md:p-14 relative z-10 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        <div className="flex flex-col items-start gap-8">
          
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Terminal size={14} className="text-emerald-500" />
            <span>AI Generalist & Orchestration Builder</span>
          </div>

          {/* Headline Suite */}
          <div className="space-y-6 text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Sai Vardhan <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cobalt-500">Kodimela</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
              Independent consultant, AI enthusiast, and orchestrations builder. Documenting my journey running agents and engineering a scalable future from India.
            </p>
          </div>

          {/* Call to Action - Priority DM */}
          <a href="#contact" className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl shadow-slate-900/20 dark:shadow-white/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden">
            <span className="relative z-10">Priority DM & Connect</span>
            <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </a>

        </div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
