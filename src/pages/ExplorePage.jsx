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
  // Filter out duplicate department names
  const uniqueDepartments = [...new Set(data.map((item) => item.Department))];
  return uniqueDepartments;
}

function ExplorePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const getDepartments = async () => {
      const fetchedDepartments = await fetchAllDepartments();
      setDepartments(fetchedDepartments);
    };
    getDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-4 pl-10 pr-10">
      <div className="max-w-7xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Explore Departments
          </h1>
          <p className="text-gray-400 mt-2">Select your department to access past papers</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setSelectedDepartment(dept);
                navigate(`/semester/${dept}`);
              }}
              className="card p-8 cursor-pointer group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                📚
              </div>
              <h2 className="text-xl font-semibold text-gray-100 group-hover:text-red-500 transition-colors">
                {dept}
              </h2>
              <p className="text-gray-400 mt-2">Access past papers and study materials</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default ExplorePage;