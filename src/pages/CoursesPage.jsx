import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import fetchSemestersByDepartment from './SemesterPage'


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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await fetchCoursesByDepartmentAndSemester(departmentId, semesterId);
      setCourses(fetchedCourses);
      console.log("sdsd" , departmentId)
    };

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };
  
    getSession();
  
    // Update on auth state change
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    fetchCourses();
  }, [semesterId, departmentId]);

  const handleLoginClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
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

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
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
                  <a
                    href={user ? course.mid : '/login?message=Login to access past papers'}
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    onClick={!user ? handleLoginClick : undefined}
                  >
                    Mid Exam
                  </a>
                  <a
                    href={isLoggedIn ? course.final : '/login?message=Login to access past papers'}
                    rel="noopener noreferrer"
                    className="btn-primary"
                    onClick={!user ? handleLoginClick : undefined}
                  >
                    Final Exam
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showPopup && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded">
            Login to access past papers
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
