import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

const AstralBody = ({ isDarkMode }) => {
  const [moonPhase, setMoonPhase] = useState(0.5);

  useEffect(() => {
    const cycle = 29.5305882;
    const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
    const age = (Date.now() - knownNewMoon) / 86400000;
    const phase = (age % cycle) / cycle;
    setMoonPhase(phase);
  }, []);

  const shadowX = Math.sin(moonPhase * Math.PI * 2) * 50;

  return (
    <div className="fixed top-12 right-12 md:top-20 md:right-24 lg:right-32 z-0 pointer-events-none">
      {isDarkMode ? (
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden">
             <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-zinc-300/40 blur-[1px]" />
             <div className="absolute top-10 right-8 w-6 h-6 rounded-full bg-zinc-300/50 blur-[2px]" />
             <div className="absolute bottom-6 left-10 w-8 h-8 rounded-full bg-zinc-300/30 blur-[2px]" />
             <div 
                className="absolute w-[120%] h-[120%] rounded-full bg-black transition-all duration-1000 ease-in-out blur-[4px]"
                style={{ 
                   top: '-10%',
                   left: `${shadowX}%`, 
                   transform: `scale(${moonPhase > 0.4 && moonPhase < 0.6 ? 0 : 1})`
                }}
             />
          </div>
        </div>
      ) : (
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-[0_0_60px_rgba(251,191,36,0.8)] animate-pulse" />
        </div>
      )}
    </div>
  );
};

const PersistentVFX = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll(); // Tracks global window scroll!

  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });
  const treeOpacity = useTransform(scrollYProgress, [0, 0.01], [0.5, 1]);
  const leafScale = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  return (
    <div className="fixed top-0 right-[-15%] lg:right-[-10%] w-full lg:w-[45%] h-screen pointer-events-none z-0 flex items-end justify-center overflow-visible">
      
      {/* Background Ambience Controls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-colors duration-[1500ms]">
        <div className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] mix-blend-screen filter blur-[100px] rounded-full opacity-40 animate-pulse transition-colors duration-[1500ms] ${isDarkMode ? 'bg-purple-900/50' : 'bg-orange-300/40'}`} />
        <div className={`absolute bottom-1/4 left-1/4 w-[400px] h-[400px] mix-blend-screen filter blur-[120px] rounded-full opacity-40 transition-colors duration-[1500ms] ${isDarkMode ? 'bg-cobalt-900/40' : 'bg-yellow-200/50'}`} />
      </div>

      <AstralBody isDarkMode={isDarkMode} scrollYProgress={scrollYProgress} />

      <motion.svg 
        viewBox="0 0 500 600" 
        className="w-full h-[80%] md:h-[90%] overflow-visible z-10"
        style={{ opacity: treeOpacity }}
      >
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={isDarkMode ? "#18181b" : "#451a03"} />
            <stop offset="100%" stopColor={isDarkMode ? "#3f3f46" : "#78350f"} />
          </linearGradient>
        </defs>

        {/* TRUNK */}
        <motion.path d="M 250,600 Q 240,450 250,300" stroke="url(#trunkGrad)" strokeWidth="24" fill="none" style={{ pathLength }} strokeLinecap="round" />

        {/* MAIN BRANCHES */}
        <motion.path d="M 248,450 Q 180,380 120,320" stroke="url(#trunkGrad)" strokeWidth="14" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 255,420 Q 340,360 400,280" stroke="url(#trunkGrad)" strokeWidth="12" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 245,350 Q 180,250 100,200" stroke="url(#trunkGrad)" strokeWidth="10" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 252,320 Q 320,220 380,150" stroke="url(#trunkGrad)" strokeWidth="9" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 250,300 Q 220,150 200,80" stroke="url(#trunkGrad)" strokeWidth="8" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 250,300 Q 280,180 300,100" stroke="url(#trunkGrad)" strokeWidth="7" fill="none" style={{ pathLength }} strokeLinecap="round" />

        {/* SUB-BRANCHES */}
        <motion.path d="M 150,350 Q 100,380 60,350" stroke="url(#trunkGrad)" strokeWidth="4" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 330,370 Q 380,410 440,380" stroke="url(#trunkGrad)" strokeWidth="4" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 150,230 Q 80,140 40,160" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 340,190 Q 400,100 450,120" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 215,130 Q 150,60 120,80" stroke="url(#trunkGrad)" strokeWidth="2" fill="none" style={{ pathLength }} strokeLinecap="round" />
        <motion.path d="M 285,140 Q 350,70 380,90" stroke="url(#trunkGrad)" strokeWidth="2" fill="none" style={{ pathLength }} strokeLinecap="round" />

        {/* LEAVES */}
        <g fill={isDarkMode ? "#10b981" : "#059669"} opacity={isDarkMode ? 0.8 : 0.9}>
          <motion.circle cx="120" cy="320" r="15" style={{ scale: leafScale }} />
          <motion.circle cx="100" cy="200" r="20" style={{ scale: leafScale }} />
          <motion.circle cx="60" cy="350" r="10" style={{ scale: leafScale }} />
          <motion.circle cx="40" cy="160" r="14" style={{ scale: leafScale }} />
          <motion.circle cx="120" cy="80" r="18" style={{ scale: leafScale }} />
          <motion.circle cx="400" cy="280" r="16" style={{ scale: leafScale }} />
          <motion.circle cx="380" cy="150" r="22" style={{ scale: leafScale }} />
          <motion.circle cx="440" cy="380" r="12" style={{ scale: leafScale }} />
          <motion.circle cx="450" cy="120" r="15" style={{ scale: leafScale }} />
          <motion.circle cx="380" cy="90" r="17" style={{ scale: leafScale }} />
          <motion.circle cx="200" cy="80" r="25" style={{ scale: leafScale }} />
          <motion.circle cx="300" cy="100" r="24" style={{ scale: leafScale }} />
          <motion.circle cx="180" cy="260" r="18" style={{ scale: leafScale }} />
          <motion.circle cx="320" cy="240" r="16" style={{ scale: leafScale }} />
          <motion.circle cx="250" cy="180" r="22" style={{ scale: leafScale }} />
          <motion.circle cx="210" cy="170" r="14" style={{ scale: leafScale }} />
          <motion.circle cx="280" cy="150" r="15" style={{ scale: leafScale }} />
        </g>
      </motion.svg>
    </div>
  );
};

export default PersistentVFX;
