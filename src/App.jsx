import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import GrowthTimeline from './components/GrowthTimeline';
import AppsShowcase from './components/AppsShowcase';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark 

  // Toggle Theme Logic
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Sync with document element for Tailwind dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen font-sans selection:bg-cobalt-500/30">
      
      {/* Floating Ribbon Header */}
      <div className="fixed top-6 w-full flex justify-center z-50 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-8 px-6 py-3 rounded-full glass-light dark:glass-dark border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5">
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              <div className="w-1.5 h-3 rounded-full bg-white opacity-80"></div>
            </div>
            <span className="font-bold tracking-tight text-slate-800 dark:text-slate-100 font-sans">
              Grow with Vardhan
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} className="text-yellow-400 hover:text-yellow-300 transition-colors" /> : <Moon size={18} className="text-slate-600 hover:text-slate-900 transition-colors" />}
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="pt-32 pb-16 px-6 max-w-5xl mx-auto flex flex-col gap-24">
        <Hero />
        <GrowthTimeline />
        <AppsShowcase />
      </main>

      <Footer />

    </div>
  );
}

export default App;
