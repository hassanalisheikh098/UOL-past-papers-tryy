import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import ExplorePage from './pages/ExplorePage';
import SemesterPage from './pages/SemesterPage';
import CoursesPage from './pages/CoursesPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { GridBackgroundDemo } from "./components/GridBackground";
import { LayoutGrid } from './components/Layoutgrid';
import LayoutGridDemo from './pages/Layoutgriddemo';
import { HeroScrollDemo } from './components/Help'

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Add padding for navbar */}
        <Routes>
          <Route path="/" element={<GridBackgroundDemo />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/semester/:departmentId" element={<SemesterPage />} />
          <Route path="/courses/:departmentId/:semesterId" element={<CoursesPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/aboutus" element={<LayoutGridDemo />} />
          <Route path="/contribute" element={<HeroScrollDemo/>} />
        </Routes>
      </div>
    </>
  )
}


export default App;