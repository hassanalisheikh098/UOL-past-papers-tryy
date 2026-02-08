import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

async function fetchSemestersByDepartment(department) {
  const { data, error } = await supabase
    .from("Main")
    .select("Semester")
    .eq("Department", department);

  if (error) {
    console.error("Error fetching semesters:", error);
    return [];
  }

  console.log(`Semesters for ${department}:`, data);
  return [...new Set(data.map((item) => item.Semester))];
}

function SemesterPage() {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSemesters = async () => {
      setLoading(true);
      const fetchedSemesters = await fetchSemestersByDepartment(departmentId);
      setSemesters(fetchedSemesters.map((name, index) => ({ id: index + 1, name })));
      setLoading(false);
    };

    loadSemesters();
  }, [departmentId]);

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
            Select Semester
          </h1>
          <p className="text-gray-400 font-mono text-lg">
            Choose your semester to view available courses
          </p>
        </motion.div>

        {/* Semesters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, i) => (
              <motion.div
                key={i}
                className="h-40 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))
          ) : (
            semesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/courses/${departmentId}/${semester.name}`)}
                whileHover={{ y: -8, borderColor: 'rgba(255, 255, 255, 0.3)' }}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-3xl font-mono font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                      Semester {semester.name}
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">
                      View materials & courses
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
        {!loading && semesters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 font-mono text-lg">
              No semesters found for this department
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SemesterPage;