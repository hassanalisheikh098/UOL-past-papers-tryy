import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for development - Replace with Supabase data
const mockDepartments = [
  { id: 1, name: 'BS Computer Science' },
  { id: 2, name: 'BS Electrical Engineering' },
  { id: 3, name: 'BBA' },
];

const mockSemesters = [
  { id: 1, departmentId: 1, number: 1 },
  { id: 2, departmentId: 1, number: 2 },
];

function AdminDashboard() {
  // State for selections and forms
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [newDepartment, setNewDepartment] = useState('');
  const [newSemester, setNewSemester] = useState('');
  const [newCourse, setNewCourse] = useState({
    name: '',
    midExamLink: '',
    finalExamLink: '',
  });

  // Backend integration functions
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    // TODO: Supabase integration
    /* Backend steps:
     * 1. Insert into departments table:
     *    const { data, error } = await supabase
     *      .from('departments')
     *      .insert([{ name: newDepartment }])
     * 2. Handle error if any
     * 3. Update local state/refresh data
     */
    setNewDepartment('');
  };

  const handleSelectDepartment = (dept) => {
    setSelectedDepartment(dept);
    setSelectedSemester(null);
  };

  const handleAddSemester = async (e) => {
    e.preventDefault();
    if (!selectedDepartment) return;
    
    /* Backend steps:
     * 1. Insert into semesters table:
     *    const { data, error } = await supabase
     *      .from('semesters')
     *      .insert([{
     *        department_id: selectedDepartment.id,
     *        number: parseInt(newSemester)
     *      }])
     * 2. Handle error if any
     * 3. Update local state/refresh data
     */
    setNewSemester('');
  };

  const handleSelectSemester = (semester) => {
    setSelectedSemester(semester);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedSemester) return;

    /* Backend steps:
     * 1. Insert into courses table:
     *    const { data, error } = await supabase
     *      .from('courses')
     *      .insert([{
     *        semester_id: selectedSemester.id,
     *        name: newCourse.name,
     *        mid_exam_link: newCourse.midExamLink,
     *        final_exam_link: newCourse.finalExamLink
     *      }])
     * 2. Handle error if any
     * 3. Clear form and update local state/refresh data
     */
    setNewCourse({ name: '', midExamLink: '', finalExamLink: '' });
  };

  const handleBack = () => {
    if (selectedSemester) {
      setSelectedSemester(null);
    } else if (selectedDepartment) {
      setSelectedDepartment(null);
    }
  };

  return (

      <div className="min-h-screen p-4">
        <div className="max-w-3xl mx-auto py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                  {!selectedDepartment
                    ? 'Select or add a degree program'
                    : !selectedSemester
                    ? `Managing ${selectedDepartment.name}`
                    : `Managing Semester ${selectedSemester.number}`}
                </p>
              </div>
              {(selectedDepartment || selectedSemester) && (
                <button
                  onClick={handleBack}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Department Selection/Creation */}
            {!selectedDepartment && (
              <motion.div
                key="departments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card p-6"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Degree Programs</h2>
                
                {/* Add Department Form */}
                <form onSubmit={handleAddDepartment} className="mb-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      placeholder="Enter degree program name (e.g., BS Computer Science)"
                      className="input"
                    />
                    <button type="submit" className="w-full btn-primary">
                      Add Degree Program
                    </button>
                  </div>
                </form>

                {/* Department List */}
                <div className="space-y-2">
                  {mockDepartments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleSelectDepartment(dept)}
                      className="w-full p-4 card hover:border-red-500/50 hover:shadow-red-500/20 
                        transition-all duration-300 text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-100 hover:text-red-500">
                        {dept.name}
                      </h3>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Semester Selection/Creation */}
            {selectedDepartment && !selectedSemester && (
              <motion.div
                key="semesters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card p-6"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Semesters</h2>
                
                {/* Add Semester Form */}
                <form onSubmit={handleAddSemester} className="mb-6">
                  <div className="space-y-4">
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={newSemester}
                      onChange={(e) => setNewSemester(e.target.value)}
                      placeholder="Enter semester number (1-8)"
                      className="input"
                    />
                    <button type="submit" className="w-full btn-primary">
                      Add Semester
                    </button>
                  </div>
                </form>

                {/* Semester List */}
                <div className="space-y-2">
                  {mockSemesters
                    .filter((sem) => sem.departmentId === selectedDepartment.id)
                    .map((sem) => (
                      <button
                        key={sem.id}
                        onClick={() => handleSelectSemester(sem)}
                        className="w-full p-4 card hover:border-red-500/50 hover:shadow-red-500/20 
                          transition-all duration-300 text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-100 hover:text-red-500">
                          Semester {sem.number}
                        </h3>
                      </button>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Course Creation */}
            {selectedSemester && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card p-6"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Add Course</h2>
                
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    placeholder="Course name (e.g., Programming Fundamentals)"
                    className="input"
                  />
                  <input
                    type="url"
                    value={newCourse.midExamLink}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, midExamLink: e.target.value })
                    }
                    placeholder="Mid exam Google Drive link"
                    className="input"
                  />
                  <input
                    type="url"
                    value={newCourse.finalExamLink}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, finalExamLink: e.target.value })
                    }
                    placeholder="Final exam Google Drive link"
                    className="input"
                  />
                  <button type="submit" className="w-full btn-primary">
                    Add Course
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

  );
}

export default AdminDashboard;