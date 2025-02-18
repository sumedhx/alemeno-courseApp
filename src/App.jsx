import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CourseList from "./components/CourseList";
import DashboardContent from "./components/DashboardContent";
import AddCourse from "./components/AddCourse"
// import EnrolledCourses from "./components/EnrolledCourses"; // To be implemented later

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from "/" to "/dashboard" */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="add-course" element={<AddCourse />} />
          {/* <Route path="enrolled" element={<EnrolledCourses />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
