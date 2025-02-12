import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure correct import path

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center"
      >
        <div className="card p-14 space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            The Ultimate Exam Prep Solution
            <span className="block text-transparent bg-clip-text  bg-gradient-to-r from-red-500 to-red-600 mt-2 ">
              UOL Past Papers
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Access past papers from all departments and ace your exams with comprehensive preparation materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/explore')}
              className="btn-primary"
            >
              Explore Papers
            </motion.button>

            {!isLoggedIn && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Get Started
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
