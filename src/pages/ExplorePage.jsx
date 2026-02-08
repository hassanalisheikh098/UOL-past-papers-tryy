import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

async function fetchAllDepartments() {
  const { data, error } = await supabase
    .from("Main")
    .select("Department");

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  console.log("Available Departments:", data);
  const uniqueDepartments = [...new Set(data.map((item) => item.Department))];
  return uniqueDepartments;
}

function ExplorePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDepartments = async () => {
      setLoading(true);
      const fetchedDepartments = await fetchAllDepartments();
      setDepartments(fetchedDepartments);
      setLoading(false);
    };
    getDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-mono font-bold text-white mb-4">
            Explore Departments
          </h1>
          <p className="text-gray-400 font-mono text-lg">
            Select your department to access past papers
          </p>
        </motion.div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, i) => (
              <motion.div
                key={i}
                className="h-40 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))
          ) : (
            departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/semester/${dept}`)}
                whileHover={{ y: -8, borderColor: 'rgba(255, 255, 255, 0.3)' }}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                      📚
                    </div>
                    <h2 className="text-2xl font-mono font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                      {dept}
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">
                      View available courses & materials
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 text-white/50 group-hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Empty state */}
        {!loading && departments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 font-mono text-lg">
              No departments found
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;