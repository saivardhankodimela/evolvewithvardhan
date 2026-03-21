import { Github, Linkedin, Mail } from 'lucide-react';
import { DATA } from '../utils/data';

const Footer = () => {
  return (
    <footer className="w-full mt-20 mb-8 px-6 max-w-5xl mx-auto">
      
      {/* Floating Glass Contact Plate */}
      <div className="glass-light dark:glass-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white/60 to-white/20 dark:from-slate-800/60 dark:to-slate-900/40 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cobalt-500/10 blur-[80px] rounded-full" />

        <div className="text-center md:text-left z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">Let's build together.</h2>
          <p className="text-slate-600 dark:text-slate-400">Actively exploring AI, orchestrations, and stunning web UIs.</p>
        </div>

        <div className="flex items-center gap-4 z-10">
          <a href={DATA.social.linkedin} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-xl hover:scale-110 hover:shadow-cobalt-500/20 transition-all text-slate-700 dark:text-slate-300 hover:text-cobalt-600 dark:hover:text-cobalt-400">
            <Linkedin size={24} />
          </a>
          <a href={DATA.social.github} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-xl hover:scale-110 hover:shadow-emerald-500/20 transition-all text-slate-700 dark:text-slate-300 hover:text-emerald-500">
            <Github size={24} />
          </a>
          <a href={DATA.social.email} className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-xl hover:scale-110 hover:shadow-purple-500/20 transition-all text-slate-700 dark:text-slate-300 hover:text-purple-500">
            <Mail size={24} />
          </a>
        </div>

      </div>

      <div className="mt-12 text-center text-sm font-medium text-slate-500 flex flex-col items-center justify-center gap-2">
        <p>© {new Date().getFullYear()} Sai Vardhan Kodimela. Designed with L2 Glassmorphism.</p>
        <p>Built exclusively on free infrastructure & Vite React.</p>
      </div>

    </footer>
  );
};

export default Footer;
