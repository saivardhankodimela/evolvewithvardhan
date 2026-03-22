import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

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
  // using pure CSS animations and useMemo to prevent positional shifting glitch during React re-renders
  const starsArray = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3
    }));
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-[1500ms] will-change-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
      {starsArray.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
          style={{ 
            top: `${star.top}%`, 
            left: `${star.left}%`, 
            width: star.size, 
            height: star.size,
            animation: `twinkle ${star.duration}s infinite ${star.delay}s ease-in-out`
          }}
        />
      ))}
    </div>
  );
};

// Pseudo-random number generator for stunning, deterministic biological rendering
const PRNG = (seed) => {
    let value = seed;
    return () => {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646; // returns [0, 1)
    };
};

const MangoTree = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();

  const woodColor = isDarkMode ? "#3d2b1f" : "#451a03"; 
  const plantGreen = isDarkMode ? "#166534" : "#15803d";
  const leafColor = isDarkMode ? "#064e3b" : "#059669"; 

  // Procedural biological tree generation
  const { branches, leaves, mangoes } = useMemo(() => {
    const rand = PRNG(123456); // Golden seed for an incredibly realistic botanical fractal
    const b = [];
    const l = [];
    const m = [];
    
    // Recursive Botanical Structure
    const buildBranch = (x, y, length, angle, depth, startScroll) => {
        if (depth === 0 || startScroll > 0.95) return;

        const endX = x + length * Math.sin(angle);
        const endY = y - length * Math.cos(angle);
        const endScroll = startScroll + 0.1; // 10% scroll per structural generation
        
        b.push({
            id: `branch_${depth}_${x}_${y}`,
            x1: x, y1: y, x2: endX, y2: endY,
            width: depth * 2.8 + 2, 
            startScroll, endScroll
        });

        // ==========================================
        // LEAF LOGISTICS (Strict Botanical Adherence)
        // ==========================================
        // 1. SAPLING / PLANT PHASE LEAVES (Depths 8, 7, 6)
        if (depth >= 6) {
            for(let i=0; i<2; i++) {
                const isLeft = i % 2 === 0;
                l.push({
                    id: `sapling_leaf_${depth}_${i}_${endY}`,
                    x: endX, y: endY, // Clamped perfectly to the green stem
                    scale: 0.7,
                    angle: isLeft ? -65 : 65, 
                    spawnScroll: endScroll,
                    fadeScroll: endScroll + 0.35 // Plummets off the tree as the trunk hardens
                });
            }
        }
        
        // 2. MATURE CANOPY (Depths 1, 2)
        // Eliminates 'floating leaves' by clamping XY origins strictly to the twig endpoints
        if (depth <= 2) {
            const numLeaves = depth === 2 ? 3 : 5; // Balanced realism density
            for(let i=0; i<numLeaves; i++) {
                l.push({
                    id: `canopy_leaf_${depth}_${i}_${endX}`,
                    // Microscopic organic noise, visually clamping the leaf DIRECTLY to the wood
                    x: endX + (rand()*6 - 3),
                    y: endY + (rand()*6 - 3),
                    scale: rand() * 0.45 + 0.55,
                    angle: (rand() * 100) - 50, // Downward gravitational droop
                    spawnScroll: endScroll + rand()*0.05,
                    fadeScroll: 999 // Permanent
                });
            }
        }
        
        // 3. MATURE MANGO FRUIT (Depth 1)
        if (depth === 1 && rand() > 0.7 && startScroll > 0.6) {
           m.push({
               id: `mango_${endX}_${endY}`,
               x: endX + (rand()*4 - 2), // Clamped directly to the terminal twig
               y: endY + 8, // Gravity offset hanging below the twig
               scale: rand() * 0.4 + 0.6,
               spawnScroll: endScroll + 0.12
           });
        }

        // ==========================================
        // STRUCTURAL MACRO-MORPHOLOGY (True Botanical Fractal)
        // ==========================================
        let numChildren = 0;
        let angleSpread = 0;
        let lenMultiplier = 0.8;

        if (depth >= 6) {
            // SAPLING / TRUNK: Strong vertical growth, zero branching
            numChildren = 1;
            angleSpread = 0.1; // Very subtle organic lean
            lenMultiplier = 0.9;
        } else if (depth === 5) {
            // CANOPY ANCHOR: The trunk branches aesthetically into 3 major boughs
            numChildren = 3;
            angleSpread = 1.0; // Clean, wide biological split
            lenMultiplier = 0.85;
        } else {
            // UPPER CANOPY: True recursive bifurcating fractal tree physics
            numChildren = 2; // Strict splitting prevents chaotic "messy" branching
            angleSpread = 0.8;
            lenMultiplier = 0.75; // Shorter twigs as they reach the top
        }

        for(let i=0; i<numChildren; i++) {
            let newAngle = angle;
            if (numChildren > 1) {
                // Generate a perfectly symmetric burst, adjusted with microlimit organic noise
                const step = angleSpread / (numChildren - 1);
                newAngle = angle - (angleSpread / 2) + (step * i);
                newAngle += (rand() * 0.1 - 0.05); // Organic biological variance
            } else {
                newAngle += (rand() * angleSpread - angleSpread/2);
            }
            
            const newLength = length * (lenMultiplier + (rand()*0.1 - 0.05));
            buildBranch(endX, endY, newLength, newAngle, depth - 1, endScroll);
        }
    };

    // Stage 1 (Seed -> Sapling) triggers at 5% scroll
    buildBranch(400, 900, 130, 0, 8, 0.05);

    return { branches: b, leaves: l, mangoes: m };
  }, []);

  // Stage 1: The Mango Seed Physics
  const seedOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const seedScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);

  // Special Branch Component to handle localized VFX aging natively
  const DynamicBranch = ({ b }) => {
     const draw = useTransform(scrollYProgress, [b.startScroll, b.endScroll], [0, 1]);
     const visibility = useTransform(scrollYProgress, [b.startScroll - 0.001, b.startScroll], [0, 1]);
     
     // Plant Physics: The trunk genuinely ages from a green sapling plant to a woody brown tree
     const currentColor = useTransform(
         scrollYProgress, 
         [b.startScroll, b.startScroll + 0.3], 
         [plantGreen, woodColor]
     );

     return (
        <motion.line 
            x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
            strokeWidth={b.width}
            strokeLinecap="round"
            className="transition-opacity duration-100"
            style={{ 
                stroke: currentColor,
                pathLength: draw,
                opacity: visibility 
            }}
        />
     );
  };

  const DynamicLeaf = ({ l }) => {
     const scale = useTransform(scrollYProgress, [l.spawnScroll, l.spawnScroll + 0.08], [0, l.scale]);
     // Sapling leaves fadeout when fadeScroll is triggered; Canopy leaves never fade
     const opacity = useTransform(
         scrollYProgress, 
         [l.spawnScroll - 0.001, l.spawnScroll, l.fadeScroll, l.fadeScroll + 0.1], 
         [0, 1, 1, 0]
     );

     return (
        <motion.path 
            // Authentic Lanceolate Leaf (Tapered, elongated teardrop)
            d="M 0 0 C -12 25 -15 60 0 90 C 15 60 12 25 0 0 Z"
            fill={leafColor}
            style={{ 
                x: l.x, y: l.y,
                scale: scale,
                rotate: `${l.angle}deg`,
                originX: 0.5, originY: 0,
                opacity: opacity
            }}
        />
     );
  };

  return (
    <div className="fixed right-[-5%] lg:right-[0%] bottom-0 w-[50vw] max-w-[700px] h-[95vh] pointer-events-none z-10 overflow-visible drop-shadow-2xl">
      <motion.svg
        viewBox="0 0 800 1000"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter id="mangoGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* STAGE 1: MANGO SEED POUCH */}
        <motion.g style={{ opacity: seedOpacity, scale: seedScale, originX: 0.5, originY: 1, x: 370, y: 880 }}>
          <path 
            d="M 0 30 C 15 0 50 -10 75 15 C 100 40 85 70 45 60 C 20 45 0 55 0 30 Z" 
            fill={isDarkMode ? "#78716c" : "#d6d3d1"} 
            stroke={isDarkMode ? "#44403c" : "#a8a29e"} 
            strokeWidth="3" 
          />
          <path d="M 15 30 Q 40 20 60 30 M 20 45 Q 40 35 55 45 M 10 20 Q 30 5 50 10" stroke={isDarkMode ? "#57534e" : "#a8a29e"} strokeWidth="1" fill="none" />
        </motion.g>

        {/* BRANCHNODES: Trunk, Stems, and Canopy */}
        {branches.map(b => <DynamicBranch key={b.id} b={b} />)}

        {/* FOLIAGE: Lanceolate Growth */}
        {leaves.map(l => <DynamicLeaf key={l.id} l={l} />)}

        {/* FRUIT: Mature Golden Mangoes */}
        {mangoes.map((m) => {
           const scale = useTransform(scrollYProgress, [m.spawnScroll, m.spawnScroll + 0.1], [0, m.scale]);
           const opacity = useTransform(scrollYProgress, [m.spawnScroll - 0.001, m.spawnScroll], [0, 1]);
           return (
             <motion.g 
               key={m.id} 
               style={{ x: m.x, y: m.y, scale: scale, opacity: opacity, originX: 0.5, originY: 0 }}
               filter="url(#mangoGlow)"
             >
               <path d="M 0 5 C 22 5 35 30 25 55 C 10 75 -15 65 -22 40 C -30 15 -15 5 0 5 Z" fill="#f59e0b" />
               <circle cx="-5" cy="20" r="14" fill="#10b981" opacity="0.4" filter="blur(4px)" />
               <circle cx="12" cy="35" r="16" fill="#ef4444" opacity="0.45" filter="blur(6px)" />
               <circle cx="-12" cy="45" r="8" fill="#10b981" opacity="0.3" filter="blur(3px)" />
               <line x1="0" y1="5" x2="3" y2="-8" stroke="#451a03" strokeWidth="2.5" />
             </motion.g>
           );
        })}
      </motion.svg>
    </div>
  );
};

const PersistentVFX = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020617] will-change-[background-color]">
        
        {/* Dynamic Nighttime Galaxy (Solid Base Layer) */}
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] transition-colors duration-[1500ms]" />
           <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/40 rounded-full blur-[130px] mix-blend-screen" />
           <div className="absolute bottom-[20%] right-[-20%] w-[70vw] h-[70vw] bg-fuchsia-900/30 rounded-full blur-[150px] mix-blend-screen" />
           
           <Stars isDarkMode={isDarkMode} />

           {/* Midnight Wisps Anchored Left */}
           <Cloud isDarkMode={true} top={10} left={-5} scale={2.0} duration={30} delay={0} opacity={0.15} />
           <Cloud isDarkMode={true} top={40} left={10} scale={1.4} duration={40} delay={4} opacity={0.10} />
           <Cloud isDarkMode={true} top={70} left={0} scale={1.8} duration={45} delay={2} opacity={0.12} />
        </div>

        {/* Dynamic Daylight Atmosphere (Transitions on top of Night) */}
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
      </div>

      <AstralBody isDarkMode={isDarkMode} />

      {/* True Biological Mango Tree Timeline Matrix */}
      <MangoTree isDarkMode={isDarkMode} />
    </>
  );
};

export default PersistentVFX;
