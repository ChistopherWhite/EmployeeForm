import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import EmployeeDetail from './EmployeeDetail';

function App() {
  // Initialize state from localStorage if data already exists,
  // otherwise start with an empty array.
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  // Adds a new employee object to the employees state array.
  // A unique EmployeeId is generated using the current timestamp.
  function addEmployee(newEmployee) {
    const employeeWithId = {
      ...newEmployee,
      EmployeeId: Date.now().toString(),
    };
    setEmployees((prev) => [...prev, employeeWithId]);
  }

  // Saves the current employees array to localStorage.
  // localStorage can only hold strings, so JSON.stringify() converts the array first.
  function saveData() {
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee data saved to local storage!');
  }

  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <Link style={styles.link} to="/">Add Employee</Link>
        <Link style={styles.link} to="/employees">Employee List</Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route
          path="/"
          element={<EmployeeForm addEmployee={addEmployee} saveData={saveData} />}
        />
        <Route
          path="/employees"
          element={<EmployeeList employees={employees} />}
        />
        <Route
          path="/employees/:id"
          element={<EmployeeDetail />}
        />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex',
    gap: '20px',
    padding: '16px 24px',
    backgroundColor: '#282c34',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default App;
