import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

async function fetchCoursesByDepartmentAndSemester(department, semester) {
  const { data, error } = await supabase
    .from("Main")
    .select("Course, Mid, Final")
    .eq("Department", department)
    .eq("Semester", semester);

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  console.log(`Courses for ${department} in Semester ${semester}:`, data);
  return data.map((item) => ({
    course: item.Course,
    mid: item.Mid,
    final: item.Final
  }));
}

function CoursesPage() {
  const { departmentId, semesterId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const fetchedCourses = await fetchCoursesByDepartmentAndSemester(departmentId, semesterId);
      setCourses(fetchedCourses);
      setLoading(false);
    };

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    fetchCourses();
  }, [semesterId, departmentId]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setPopup('Login to download past papers');
    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Popup notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-orange-500/90 text-white px-6 py-3 rounded-lg font-mono text-sm backdrop-blur-sm"
          >
            🔐 {popup}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-mono font-bold text-white mb-4">
            Available Courses
          </h1>
          <p className="text-gray-400 font-mono text-lg">
            Semester {semesterId} • {departmentId}
          </p>
        </motion.div>

        {/* Courses List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            Array(5).fill(0).map((_, i) => (
              <motion.div
                key={i}
                className="h-20 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-mono font-bold text-white group-hover:text-gray-200 transition-colors">
                      {course.course}
                    </h2>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {course.mid && (
                      <motion.a
                        href={user ? course.mid : '#'}
                        target={user ? '_blank' : undefined}
                        rel={user ? 'noopener noreferrer' : undefined}
                        onClick={!user ? handleLoginClick : undefined}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white hover:text-black transition-all font-mono text-center"
                      >
                        Mid Exam
                      </motion.a>
                    )}
                    {course.final && (
                      <motion.a
                        href={user ? course.final : '#'}
                        target={user ? '_blank' : undefined}
                        rel={user ? 'noopener noreferrer' : undefined}
                        onClick={!user ? handleLoginClick : undefined}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-all font-mono text-center"
                      >
                        Final Exam
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 font-mono text-lg">
                No courses found for this semester
              </p>
            </motion.div>
          )}
        </div>

        {/* Help text for non-logged users */}
        {!user && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl text-center"
          >
            <p className="text-gray-400 font-mono text-sm">
              💡 Sign in to download past papers
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
