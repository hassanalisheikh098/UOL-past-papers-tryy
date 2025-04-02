import { motion } from 'framer-motion';
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
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await fetchCoursesByDepartmentAndSemester(departmentId, semesterId);
      setCourses(fetchedCourses);
    };

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
      if (!session?.user) {
        setShowPopup(true);
      }
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
      if (!session?.user) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    });

    fetchCourses();
  }, [semesterId, departmentId]);

  const handleLinkClick = (link, type) => {
    if (!user) {
      alert("You need to log in to access this content.");
      return;
    }
    if (!link) {
      alert(`There are no ${type} papers available for this course.`);
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 pl-10 pr-10">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Available Courses
          </h1>
          <p className="text-gray-400 mt-2">Access past papers for your courses</p>
        </motion.div>

        {showPopup && (
          <div className="popup bg-gray-800 text-white p-4 rounded shadow-lg">
            <p>You need to log in to access this content.</p>
            <button
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              className="btn-primary mt-4"
            >
              Log in with Google
            </button>
          </div>
        )}

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-100 group-hover:text-red-500 transition-colors">
                  {course.course}
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLinkClick(course.mid, "Mid Exam")}
                    className="btn-secondary"
                  >
                    Mid Exam
                  </button>
                  <button
                    onClick={() => handleLinkClick(course.final, "Final Exam")}
                    className="btn-primary"
                  >
                    Final Exam
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
