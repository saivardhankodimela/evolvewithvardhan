import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import GrowthTimeline from './components/GrowthTimeline';
import AppsShowcase from './components/AppsShowcase';
import Footer from './components/Footer';
import PersistentVFX from './components/PersistentVFX';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-[150vh] transition-colors duration-1000 ease-in-out font-sans selection:bg-purple-500/30 relative overflow-x-hidden ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>
      
      {/* Floating Ribbon Header (Centered Over Everything) */}
      <div className="fixed top-6 w-full flex justify-center z-50 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full glass-light dark:glass-dark w-full max-w-4xl transition-all duration-300">
          <div className="flex items-center gap-3 pr-8 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-zinc-800 to-black dark:from-white dark:to-zinc-300 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-3 rounded-full bg-white dark:bg-black opacity-80"></div>
            </div>
            <span className="font-bold tracking-tight text-zinc-900 dark:text-white font-sans">
              Evolve with Vardhan
            </span>
          </div>
          <div className="flex-1 flex justify-center md:px-8">
            <ul className="flex items-center gap-4 sm:gap-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <li><a href="#home" className="hover:text-black dark:hover:text-white transition-colors">Home</a></li>
              <li><a href="#work" className="hover:text-black dark:hover:text-white transition-colors">Work</a></li>
              <li><a href="#growth-log" className="hover:text-black dark:hover:text-white transition-colors">Growth Log</a></li>
              <li className="hidden sm:block"><a href="#home" className="hover:text-black dark:hover:text-white transition-colors">Connect</a></li>
            </ul>
          </div>
          <div className="pl-4 sm:pl-8 border-l border-slate-300/50 dark:border-white/10">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} className="text-yellow-400 hover:text-yellow-300 transition-colors" /> : <Moon size={18} className="text-slate-600 hover:text-slate-900 transition-colors" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Persistent Global VFX (Stays fixed on the right half of the screen) */}
      <PersistentVFX isDarkMode={isDarkMode} />

      {/* Main Content (Perfectly Centered, Z-10 floats above the Tree) */}
      <main className="pt-32 pb-16 px-6 sm:px-12 w-full max-w-4xl mx-auto flex flex-col gap-24 relative z-10">
        <Hero isDarkMode={isDarkMode} />
        <AppsShowcase />
        <GrowthTimeline />
      </main>

      {/* Footer spans centered column */}
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 relative z-10 pb-8">
        <Footer />
      </div>

    </div>
  );
}

export default App;
