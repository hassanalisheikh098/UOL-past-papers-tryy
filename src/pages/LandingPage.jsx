import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import new1 from '../assets/new1.jpg';
import Contribute from '../components/Contribute';

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ users: 1800, papers: 65, departments: "01" });
  const [activeFaq, setActiveFaq] = useState(1800);

  // Motion variants for scroll-triggered animations
  const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };

  const gridItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  const aboutLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } };
  const aboutRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } };

  const faqContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const faqItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
  const faqAnswer = { hidden: { opacity: 0, height: 0, scale: 0.98, y: 6 }, show: { opacity: 1, height: 'auto', scale: 1, y: 0 } };

  useEffect(() => {
    // Check session on component mount
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setIsLoggedIn(!!sessionData?.session);

      // Listen for auth state changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session);
      });
    };

    checkSession();
  }, []);

  const CountUpStat = ({ target, label }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <div>
        <h3 className="text-3xl font-mono font-bold text-white mb-1">{count}</h3>
        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">{label}</p>
      </div>
    );
  };

  const faqItems = [
    {
      question: 'Are the papers verified?',
      answer: 'Yes, every paper is cross-referenced with syllabus codes and years to ensure they are relevant and authentic university documents.'
    },
    {
      question: 'How can I download them?',
      answer: 'Once you login, you can simply click on any paper to open it in our viewer or download the PDF directly to your device.'
    },
    {
      question: 'Are there solutions included?',
      answer: 'Currently, we focus on providing the question papers. However, our "Contributions" section is and always will be open for solved papers.'
    }
  ];

  const departments = [
    { name: 'CS & IT', icon: '💻', desc: 'Algorithms, Data Structures, Web Dev, AI...', papers: 240 },
    { name: 'Management Sciences', icon: '💼', desc: 'Accounting, Marketing, HR, Finance...', papers: 0 },
    { name: 'Law & Social Sciences', icon: '📚', desc: 'Jurisprudence, Ethics, Sociology...', papers: 0 }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="font-mono text-sm font-bold tracking-widest text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          UOL.PAPERS
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-mono text-gray-400 items-center">
          <button onClick={() => navigate('/explore')} className="hover:text-white transition-colors">Explore</button>
          <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</button>
          <button onClick={() => document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contribute</button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(isLoggedIn ? '/explore' : '/login')}
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            {isLoggedIn ? 'Explore' : 'Login'}
          </motion.button>
        </nav>

        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 z-40"
          >
            <nav className="flex flex-col gap-4 p-6 text-sm font-mono text-gray-400">
              <button 
                onClick={() => { navigate('/explore'); setIsMobileMenuOpen(false); }} 
                className="hover:text-white transition-colors text-left"
              >
                Explore
              </button>
              <button 
                onClick={() => { document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                className="hover:text-white transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => { document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                className="hover:text-white transition-colors text-left"
              >
                Contribute
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate(isLoggedIn ? '/explore' : '/login'); setIsMobileMenuOpen(false); }}
                className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors w-fit mt-2"
              >
                {isLoggedIn ? 'Explore' : 'Login'}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mt-12 mb-24 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase font-mono tracking-[0.2em] text-white mb-8 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                V3.0 Repository Live
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl lg:text-7xl font-mono font-bold leading-tight mb-8 text-white"
              >
                The Ultimate
                <br />
                <span className="font-serif italic text-gray-300">Exam Prep</span>
                <br />
                Solution
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-lg font-light leading-relaxed mb-10 max-w-xl"
              >
                Access comprehensive past papers from all <span className="text-white font-medium border-b border-white/20">UOL departments</span>. Empowering students with the materials needed to ace every exam.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/explore')}
                  className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all"
                >
                  Explore Papers
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(isLoggedIn ? '/explore' : '/login')}
                  className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all"
                >
                  Get Started
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg"
              >
                <CountUpStat target={stats.users} label="Active Users" />
                <CountUpStat target={stats.papers} label="Papers" />
                <CountUpStat target={stats.departments} label="Departments" />
              </motion.div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative group"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 relative z-10">
                  <img
                    src={new1}
                    alt="UOL Students"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-xs font-mono text-white mb-1 italic">&quot;Meet The Founder&quot;</p>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Hassan Ali Sheikh</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section id="explore" className="mb-32 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h4 className="text-gray-500 text-sm font-mono mb-4 uppercase tracking-[0.3em]">... /Library ...</h4>
              <h2 className="text-4xl md:text-5xl font-mono font-bold text-white">Click to Explore</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm font-mono max-w-xs">Filter by department to find exactly what you need for your upcoming finals.</p>
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {departments.map((dept, idx) => {
              const locked = dept.name !== 'CS & IT';
              return (
                <motion.div
                  key={idx}
                  variants={gridItem}
                  whileHover={{ y: locked ? 0 : -5 }}
                  onClick={() => !locked && navigate('/explore')}
                  className={`group relative ${locked ? 'cursor-default' : 'cursor-pointer'} bg-white/5 border border-white/10 rounded-3xl p-8 transition-all overflow-hidden ${locked ? 'opacity-90' : 'hover:border-white/30'}`}
                >
                  {/* inner content -- blurred if locked */}
                  <div className={`relative z-10 ${locked ? 'blur-sm' : ''}`}>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors text-xl">📖</div>
                    <h3 className="text-xl font-mono font-bold text-white mb-2">{dept.name}</h3>
                    <p className="text-gray-400 text-sm font-mono mb-6">{dept.desc}</p>
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest flex items-center gap-2">
                      {dept.papers} Papers Available
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform">
                        <line x1="5" x2="19" y1="12" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>

                  {locked && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-20">
                      <div className="text-3xl mb-2">🔒</div>
                      <div className="text-sm text-gray-200 font-mono">Coming soon</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32 px-6 md:px-12">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={aboutLeft} className="order-2 lg:order-1 relative">
              <div className="aspect-square bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 group cursor-help">
                <img
                  src="https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=800&fit=crop&q=80"
                  alt="Campus Life"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                  <span className="text-white font-mono font-bold tracking-widest text-lg uppercase border border-white/20 px-6 py-3 rounded-full backdrop-blur-md">
                    Hover to Know About Us
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={aboutRight} className="order-1 lg:order-2">
              <h4 className="text-gray-500 text-sm font-mono mb-4 uppercase tracking-[0.3em]">... /Our Mission ...</h4>
              <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">Bridging the Gap Between Learning & Success</h2>
              <p className="text-gray-300 text-base font-light leading-relaxed mb-6">
                UOL Past Papers started as a student-led initiative to democratize access to exam resources. We believe that every student deserves a fair chance at academic success, regardless of their network.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 text-sm font-mono text-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Verified by Top Performers
                </li>
                <li className="flex items-center gap-4 text-sm font-mono text-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Spanning Over 5 Years of Material
                </li>
                <li className="flex items-center gap-4 text-sm font-mono text-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Updated Every Semester
                </li>
              </ul>
              <a href="#contribute" className="text-white text-sm font-mono font-bold border-b-2 border-white/20 hover:border-white transition-colors pb-1">
                Learn more about our team →
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Contribute Section (imported component) */}
        <section id="contribute" className="scroll-mt-16">
          <Contribute />
        </section>

        {/* FAQ Section */}
        <section className="mb-32 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-16">
              <h4 className="text-gray-500 text-sm font-mono mb-4 uppercase tracking-[0.3em]">... /Help ...</h4>
              <h2 className="text-4xl font-mono font-bold text-white">Frequently Asked</h2>
            </div>

            <motion.div className="space-y-4" variants={faqContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {faqItems.map((item, idx) => (
                <motion.div key={idx} variants={faqItem} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                    className={`w-full px-8 py-6 text-left flex justify-between items-center transition-all ${
                      activeFaq === idx ? 'bg-white/10 border-b border-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-white font-mono font-bold text-sm">{item.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                      <AnimatePresence initial={false}>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ transformOrigin: 'top' }}
                            className="px-8 py-6 text-gray-300 text-sm font-light border-t border-white/10 bg-black/5 overflow-hidden"
                          >
                            {item.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 items-start">
          <div className="col-span-2 flex flex-col">
            <h2 className="text-3xl font-mono font-bold text-white mb-4">UOL Papers</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The ultimate exam preparation repository for University of Lahore students. Ace your exams with transparency and ease.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-500 text-xs font-mono mb-6 uppercase tracking-widest">Navigation</h4>
            <nav className="flex flex-col gap-4 text-xs font-mono text-gray-400 items-start">
              <button onClick={() => navigate('/explore')} className="hover:text-white transition-colors">Explore Papers</button>
              <button onClick={() => navigate('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <a href="#about" className="hover:text-white transition-colors">About</a>
            </nav>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-500 text-xs font-mono mb-6 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4 items-center">
              <a href="https://www.instagram.com/hassannn_alii/" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/hassan-ali-sheikh-8037222aa/" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] text-gray-500 font-mono">© 2024 UOL Past Papers repository. Designed for excellence.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
