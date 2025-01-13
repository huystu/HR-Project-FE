// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import EmployeePage from './pages/EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
