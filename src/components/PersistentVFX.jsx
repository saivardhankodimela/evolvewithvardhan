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
    <div className="fixed top-12 right-12 md:top-20 md:right-24 lg:right-32 z-10 pointer-events-none w-24 h-24 md:w-32 md:h-32">
      {/* Nighttime Crescent Moon */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          <defs>
            <mask id="moon-mask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <circle cx={50 + shadowX} cy="50" r="40" fill="black" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="40" fill="#e2e8f0" mask="url(#moon-mask)" />
          {/* Stylized Lunar Craters */}
          <circle cx="35" cy="40" r="6" fill="#cbd5e1" mask="url(#moon-mask)" opacity="0.6"/>
          <circle cx="55" cy="65" r="4" fill="#cbd5e1" mask="url(#moon-mask)" opacity="0.5"/>
          <circle cx="65" cy="30" r="8" fill="#cbd5e1" mask="url(#moon-mask)" opacity="0.4"/>
        </svg>
      </div>

      {/* Daylight Sun */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-[0_0_60px_rgba(251,191,36,0.8)] animate-pulse" />
      </div>
    </div>
  );
};

// SVG Cloud Component anchored to specific coordinates with gentle hovering
const Cloud = ({ top, left, scale, duration, delay, opacity, isDarkMode }) => (
  <motion.svg
    width={200}
    height={100}
    viewBox="0 0 200 100"
    className="absolute pointer-events-none will-change-transform"
    style={{ top: `${top}%`, left: `${left}%`, transformOrigin: 'top left' }}
    initial={{ scale: scale, y: 0, x: 0 }}
    animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
    transition={{
      repeat: Infinity,
      duration: duration,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <path
      d="M50 80 Q25 80 25 55 Q25 35 45 35 Q55 15 80 15 Q110 15 120 40 Q145 30 165 45 Q185 60 175 80 Z"
      fill={isDarkMode ? `rgba(255, 255, 255, ${opacity * 0.15})` : `rgba(255, 255, 255, ${opacity})`}
      filter="blur(4px)"
    />
  </motion.svg>
);

const Stars = ({ isDarkMode }) => {
  // Generate a massive galaxy of tiny stars everywhere
  // using pure CSS animations instead of Framer Motion to completely eliminate transition lag
  const starsArray = Array.from({ length: 150 });
  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-[1500ms] will-change-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
      {starsArray.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 3;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`, 
              width: size, 
              height: size,
              animation: `twinkle ${duration}s infinite ${delay}s ease-in-out`
            }}
          />
        );
      })}
    </div>
  );
};

const PersistentVFX = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();

  // Sequential, layered structural growth based on scroll progress
  const trunkLength = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, 1]), { stiffness: 80, damping: 20 });
  const branchLength = useSpring(useTransform(scrollYProgress, [0.3, 0.7], [0, 1]), { stiffness: 80, damping: 20 });
  const subBranchLength = useSpring(useTransform(scrollYProgress, [0.6, 0.9], [0, 1]), { stiffness: 80, damping: 20 });
  
  const treeOpacity = useTransform(scrollYProgress, [0, 0.01], [0.5, 1]);
  const leafScale = useTransform(scrollYProgress, [0.7, 1.0], [0, 1]);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020617] will-change-[background-color]">
        
        {/* Dynamic Daylight Atmosphere */}
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out will-change-opacity ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
           <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#bae6fd] to-[#f0f9ff]" />
           <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-yellow-200/50 rounded-full blur-[140px] mix-blend-screen animate-pulse will-change-transform" />
           <div className="absolute bottom-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-cyan-300/40 rounded-full blur-[150px] mix-blend-multiply" />
           
           {/* Clouds Anchored strictly to the Left Side */}
           <Cloud isDarkMode={false} top={5} left={-5} scale={1.8} duration={25} delay={0} opacity={0.8} />
           <Cloud isDarkMode={false} top={25} left={15} scale={1.2} duration={35} delay={2} opacity={0.6} />
           <Cloud isDarkMode={false} top={50} left={-10} scale={2.4} duration={40} delay={5} opacity={0.5} />
           <Cloud isDarkMode={false} top={75} left={5} scale={1.6} duration={30} delay={1} opacity={0.7} />
        </div>

        {/* Dynamic Nighttime Galaxy */}
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out will-change-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
           <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]" />
           <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/40 rounded-full blur-[130px] mix-blend-screen" />
           <div className="absolute bottom-[20%] right-[-20%] w-[70vw] h-[70vw] bg-fuchsia-900/30 rounded-full blur-[150px] mix-blend-screen" />
           
           <Stars isDarkMode={isDarkMode} />

           {/* Midnight Wisps Anchored Left */}
           <Cloud isDarkMode={true} top={10} left={-5} scale={2.0} duration={30} delay={0} opacity={0.15} />
           <Cloud isDarkMode={true} top={40} left={10} scale={1.4} duration={40} delay={4} opacity={0.10} />
           <Cloud isDarkMode={true} top={70} left={0} scale={1.8} duration={45} delay={2} opacity={0.12} />
        </div>
      </div>

      <AstralBody isDarkMode={isDarkMode} />

      {/* Tree container locked to the right */}
      <div className="fixed top-0 right-[-15%] lg:right-[-10%] w-full lg:w-[45%] h-screen pointer-events-none z-0 flex items-end justify-center overflow-visible">
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
          <motion.path d="M 250,600 Q 240,450 250,300" stroke="url(#trunkGrad)" strokeWidth="24" fill="none" style={{ pathLength: trunkLength }} strokeLinecap="round" />

          {/* MAIN BRANCHES */}
          <motion.path d="M 248,450 Q 180,380 120,320" stroke="url(#trunkGrad)" strokeWidth="14" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />
          <motion.path d="M 255,420 Q 340,360 400,280" stroke="url(#trunkGrad)" strokeWidth="12" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />
          <motion.path d="M 245,350 Q 180,250 100,200" stroke="url(#trunkGrad)" strokeWidth="10" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />
          <motion.path d="M 252,320 Q 320,220 380,150" stroke="url(#trunkGrad)" strokeWidth="9" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />
          <motion.path d="M 250,300 Q 220,150 200,80" stroke="url(#trunkGrad)" strokeWidth="8" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />
          <motion.path d="M 250,300 Q 280,180 300,100" stroke="url(#trunkGrad)" strokeWidth="7" fill="none" style={{ pathLength: branchLength }} strokeLinecap="round" />

          {/* SUB-BRANCHES */}
          <motion.path d="M 150,350 Q 100,380 60,350" stroke="url(#trunkGrad)" strokeWidth="4" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />
          <motion.path d="M 330,370 Q 380,410 440,380" stroke="url(#trunkGrad)" strokeWidth="4" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />
          <motion.path d="M 150,230 Q 80,140 40,160" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />
          <motion.path d="M 340,190 Q 400,100 450,120" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />
          <motion.path d="M 215,130 Q 150,60 120,80" stroke="url(#trunkGrad)" strokeWidth="2" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />
          <motion.path d="M 285,140 Q 350,70 380,90" stroke="url(#trunkGrad)" strokeWidth="2" fill="none" style={{ pathLength: subBranchLength }} strokeLinecap="round" />

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
    </>
  );
};

export default PersistentVFX;
