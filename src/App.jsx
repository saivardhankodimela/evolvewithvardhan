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
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/30 dark:bg-slate-900/40 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder (Kanuga Tree Vector goes here) */}
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="w-2 h-4 rounded-full bg-emerald-400"></div>
          </div>
          <span className="font-semibold tracking-tight hidden sm:block">SVK</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>
      </nav>

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
