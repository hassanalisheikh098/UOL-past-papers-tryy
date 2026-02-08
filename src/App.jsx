import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import SemesterPage from './pages/SemesterPage';
import CoursesPage from './pages/CoursesPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const location = useLocation();
  
  // Reset scroll to top on route change to avoid partially-scrolled views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);
  const hiddenNavbarPaths = ['/', '/login', '/signup']; // Hide navbar on landing, login, signup
  const showNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/semester/:departmentId" element={<SemesterPage />} />
          <Route path="/courses/:departmentId/:semesterId" element={<CoursesPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

      </div>
    </>
  )
}


export default App;
