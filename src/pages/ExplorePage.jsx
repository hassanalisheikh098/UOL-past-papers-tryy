import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const departments = [
  { id: 1, name: 'Computer Science', icon: '💻' },
  { id: 2, name: 'Electrical Engineering', icon: '⚡' },
  { id: 3, name: 'Business Administration', icon: '📊' },
  { id: 4, name: 'Mathematics', icon: '📐' },
  { id: 5, name: 'Physics', icon: '🔭' },
  { id: 6, name: 'Chemistry', icon: '🧪' },
];

function ExplorePage() {
  const navigate = useNavigate();

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
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/semester/${dept.id}`)}
              className="card p-8 cursor-pointer group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                {dept.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-100 group-hover:text-red-500 transition-colors">
                {dept.name}
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