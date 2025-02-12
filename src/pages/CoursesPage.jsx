import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const courses = [
  { id: 1, name: 'Introduction to Programming', midLink: '#', finalLink: '#' },
  { id: 2, name: 'Data Structures', midLink: '#', finalLink: '#' },
  { id: 3, name: 'Database Systems', midLink: '#', finalLink: '#' },
  { id: 4, name: 'Operating Systems', midLink: '#', finalLink: '#' },
];

function CoursesPage() {
  const { semesterId } = useParams();

  return (
    <div className="min-h-screen bg-gray-950 p-4 pl-10 pr-10" >
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
                  {course.name}
                </h2>
                <div className="flex gap-4">
                  <a
                    href={course.midLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Mid Exam
                  </a>
                  <a
                    href={course.finalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Final Exam
                  </a>
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