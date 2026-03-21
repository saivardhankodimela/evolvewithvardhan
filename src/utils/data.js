// This file acts as our Local CMS (Mocking the future CSV/Notion Cron Sync)

export const DATA = {
  // 1. The Growth Logs - Timeline Data
  logs: [
    {
      id: 1,
      date: 'Mar 21, 2026',
      title: 'Setup Architecture & Deployment CI',
      category: 'Building',   // Renders Emerald Green Line
      skill: 'react',         // Renders React Logo
      description: 'Established the React + Tailwind v4 environment locally and initialized the Vite development server routing to test new Glassmorphism themes.',
    },
    {
      id: 2,
      date: 'Mar 20, 2026',
      title: 'Explored LangGraph Agent Orchestration',
      category: 'Learning',   // Renders Cobalt Blue Line
      skill: 'python',        // Renders Python Logo
      description: 'Tested multi-agent architectures using LangGraph strictly to orchestrate workflows involving document scraping and recursive summarization bots.',
    },
    {
      id: 3,
      date: 'Mar 18, 2026',
      title: 'Testing Framer Motion Dynamics',
      category: 'Experimenting', // Renders Vibrant Purple Line
      skill: 'framer',
      description: 'Built heavily animated scroll-linked UI elements referencing the “Terminal Industries” design aesthetics. Optimized DOM for 60fps renders.',
    }
  ],

  // 2. Apps & Creations
  apps: [
    {
      id: 1,
      name: 'Agentic Workflow Hub',
      description: 'A dashboard tracking active LangGraph Python agents running on local cron schedules.',
      status: 'Live', // Or 'Stealth', 'Coming Soon'
      link: '#',
      themeColor: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      id: 2,
      name: 'Glassmorphism UI Kit',
      description: 'An open-source library of Tailwind CSS components utilizing L2 Frosted Pearl techniques.',
      status: 'Building',
      link: '#',
      themeColor: 'from-cobalt-500/20 to-blue-500/20'
    }
  ],

  // 3. Social & Contact Info
  social: {
    linkedin: 'https://linkedin.com/in/sai-vardhan-kodimela',
    github: 'https://github.com/saivardhan',
    email: 'mailto:contact@saivardhan.com'
  }
};
