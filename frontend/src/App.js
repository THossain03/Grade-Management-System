import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourse from './pages/AddCourse';
import AddResult from './pages/AddResult';
import AddStudent from './pages/AddStudent';
import CourseList from './pages/CourseList';
import Home from './pages/Home';
import ResultList from './pages/ResultList';
import StudentList from './pages/StudentList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/add-result" element={<AddResult />} />
        <Route path="/results" element={<ResultList />} />
      </Routes>
    </Router>
  );
}

export default App;
