import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contribute = () => {
  const navigate = useNavigate();

  return (
    <section id="contribute" className="mb-32 px-6 md:px-12 relative">
      {/* Subtle decorative orbs (static, no animation) */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-sm"
      >
        {/* subtle grid pattern (static) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-2xl relative z-10">
          <h4 className="text-gray-400 text-sm font-mono mb-6 uppercase tracking-[0.3em]">... /Contribute ...</h4>

          <h2 className="text-5xl md:text-7xl font-mono font-bold mb-8 relative text-white">
            <span className="bg-gradient-to-r from-white/70 to-white/40 bg-clip-text text-transparent">Want To</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">Contribute?</span>
          </h2>

          <p className="text-gray-300 text-lg mb-12 font-medium leading-relaxed">
            Send us your past papers to help us grow! <span className="font-bold">Every single paper</span> contributed helps hundreds of fellow students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="mailto:hassancodes098@gmail.com" className="group relative bg-white text-black px-10 py-4 rounded-full font-bold text-sm transition-all inline-flex items-center justify-center gap-2 overflow-hidden">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10">
                <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H17.5C20 5 22 7 22 9.5V17z" />
                <path d="m22 9-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 9" />
              </svg>
              <span className="relative z-10">Email Submissions</span>
            </motion.a>

        
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex gap-8">
            {[{ number: '1500+', label: 'Contributors' }, { number: '850+', label: 'Papers Shared' }, { number: '12', label: 'Departments' }].map((stat, i) => (
              <div key={i} className="cursor-default">
                <p className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stat.number}</p>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative SVG (static, low opacity) */}
        <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="150" stroke="black" strokeWidth="2" />
            <circle cx="200" cy="200" r="100" stroke="black" strokeWidth="2" />
            <circle cx="200" cy="200" r="50" stroke="black" strokeWidth="2" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="black" strokeWidth="2" />
            <line x1="200" y1="50" x2="200" y2="350" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Contribute;
