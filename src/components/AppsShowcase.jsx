import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { DATA } from '../utils/data';

const AppsShowcase = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-10">
      
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Creations & Apps</h2>
        <p className="text-slate-500 dark:text-slate-400">Applications currently in development or live.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DATA.apps.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group relative h-64 rounded-2xl overflow-hidden glass-light dark:glass-dark flex flex-col justify-end p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >
            {/* The Dynamic Gradient Background for the App Card */}
            <div className={`absolute inset-0 bg-gradient-to-br ${app.themeColor} opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
            
            {/* Status Badge */}
            <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-black/5 dark:border-white/10 text-xs font-semibold tracking-wide">
              {app.status}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {app.name}
                <ArrowUpRight size={20} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
              </h3>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[85%]">
                {app.description}
              </p>
            </div>
            
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default AppsShowcase;
