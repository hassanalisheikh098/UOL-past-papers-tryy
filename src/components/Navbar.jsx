import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure correct import path

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('Logged out successfully!');
      navigate('/login');
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getSession();

    // Update on auth state change
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  const displayName = user?.email.split('@')[0];

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-red-500 hover:text-red-400"
            >
              UOL Papers
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center space-x-10">
            <button
              onClick={() => navigate('/explore')}
              className="text-gray-300 hover:text-red-400"
            >
              Explore
            </button>
            <button
              onClick={() => navigate('/aboutus')}
              className="text-gray-300 hover:text-red-400"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/contribute')}
              className="text-gray-300 hover:text-red-400"
            >
              Contribute
            </button>
          </div>

          {user ? (
            <span
              onClick={handleLogout}
              className="text-gray-300 cursor-pointer hover:text-red-400"
            >
              Log Out
            </span>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
