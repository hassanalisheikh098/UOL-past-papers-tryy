import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page, sectionId = null) => {
    if (location.pathname === '/' && sectionId) {
      // On landing page: smooth scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (sectionId) {
      // On other pages: navigate back to landing and scroll to section
      navigate('/');
      setIsOpen(false);
      // Wait for page to render before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Navigate to other pages
      navigate(page);
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate('/');
          window.scrollTo(0, 0);
        }}
        className="font-mono text-sm font-bold tracking-widest text-white flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        UOL.PAPERS
      </motion.button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-sm font-mono text-gray-400 items-center">
        <motion.button
          whileHover={{ color: '#ffffff' }}
          onClick={() => navigate('/explore')}
          className="hover:text-white transition-colors"
        >
          Explore
        </motion.button>
        <motion.button
          whileHover={{ color: '#ffffff' }}
          onClick={() => handleNavigation('/', 'about')}
          className="hover:text-white transition-colors"
        >
          About Us
        </motion.button>
        <motion.button
          whileHover={{ color: '#ffffff' }}
          onClick={() => handleNavigation('/', 'contribute')}
          className="hover:text-white transition-colors"
        >
          Contribute
        </motion.button>

        {user ? (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <span className="text-white text-xs font-mono">
              {user.email.split('@')[0]}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            Login
          </motion.button>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => {
                navigate('/explore');
                setIsOpen(false);
              }}
              className="text-gray-400 hover:text-white transition-colors text-sm font-mono"
            >
              Explore
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => handleNavigation('/', 'about')}
              className="text-gray-400 hover:text-white transition-colors text-sm font-mono"
            >
              About Us
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => handleNavigation('/', 'contribute')}
              className="text-gray-400 hover:text-white transition-colors text-sm font-mono"
            >
              Contribute
            </motion.button>

            <div className="pt-4 border-t border-white/10 mt-4">
              {user ? (
                <>
                  <p className="text-white text-xs font-mono mb-3">{user.email.split('@')[0]}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Login
                </motion.button>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
