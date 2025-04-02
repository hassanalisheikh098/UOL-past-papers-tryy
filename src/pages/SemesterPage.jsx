import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

async function fetchSemestersByDepartment(department) {
  const { data, error } = await supabase
    .from("Main")
    .select("Semester")
    .eq("Department", department); // Filter by department

  if (error) {
    console.error("Error fetching semesters:", error);
    return [];
  }

  console.log(`Semesters for ${department}:`, data);
  return [...new Set(data.map((item) => item.Semester))]; // Remove duplicates
}


function SemesterPage() {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const loadSemesters = async () => {
      const fetchedSemesters = await fetchSemestersByDepartment(departmentId);
      const sortedSemesters = fetchedSemesters
        .sort((a, b) => a - b) 
        .map((name, index) => ({ id: index + 1, name }));
      setSemesters(sortedSemesters);
    };

    loadSemesters();
  }, [departmentId]);

  return (
    <div className="min-h-screen bg-gray-950 p-4 pl-10 pr-10">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Select Semester
          </h1>
          <p className="text-gray-400 mt-2">Choose your semester to view available courses</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/courses/${departmentId}/${semester.name}`)}
              className="card p-8 cursor-pointer group"
            >
              <h2 className="text-2xl font-semibold text-gray-100 group-hover:text-red-500 transition-colors">
                Semester {semester.name}
              </h2>
              <p className="text-gray-400 mt-2">View all courses and materials</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SemesterPage;