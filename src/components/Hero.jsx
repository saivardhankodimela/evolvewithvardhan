import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = ({ isDarkMode }) => {
  return (
    <section id="home" className="relative min-h-[85vh] pt-20 pb-10 flex flex-col justify-center">
      
      {/* Hero Content (Foreground) */}
      <div className="relative z-10 flex flex-col items-start gap-8">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-300' : 'bg-black/5 border-black/10 text-zinc-600'} text-sm font-medium shadow-sm`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Available for new opportunities
        </motion.div>

        {/* Main Header */}
        <div className="flex flex-col gap-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-lg md:text-xl font-medium tracking-wide ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
          >
            Hello, I am
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
              <span className={`bg-clip-text text-transparent bg-gradient-to-br ${isDarkMode ? 'from-white via-zinc-100 to-zinc-500' : 'from-zinc-950 via-zinc-800 to-zinc-500'}`}>Sai </span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-zinc-300 to-white' : 'from-zinc-950 to-zinc-600'}`}>
                Svk.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          Specializing in AI automation, seamless web experiences, and scalable cloud architectures. 
          I engineer digital solutions that blend striking aesthetics with peak performance.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 mt-6"
        >
          <a href="#work" className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl overflow-hidden font-bold transition-all duration-300 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95`}>
            <span>View My Work</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <a href="#connect" className={`group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'} backdrop-blur-md hover:scale-105 active:scale-95`}>
            Let's Talk
          </a>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
