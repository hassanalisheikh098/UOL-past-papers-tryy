import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const semesters = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Semester ${i + 1}`,
}));

function SemesterPage() {
  const navigate = useNavigate();
  const { departmentId } = useParams();

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
              onClick={() => navigate(`/courses/${semester.id}`)}
              className="card p-8 cursor-pointer group"
            >
              <h2 className="text-2xl font-semibold text-gray-100 group-hover:text-red-500 transition-colors">
                {semester.name}
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