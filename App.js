import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import EmployeeDetail from './EmployeeDetail';

function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  function addEmployee(newEmployee) {
    const employeeWithId = { ...newEmployee, EmployeeId: Date.now().toString() };
    setEmployees((prev) => {
      const updated = [...prev, employeeWithId];
      localStorage.setItem('employees', JSON.stringify(updated));
      return updated;
    });
  }

  function saveData() {
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Saved to local storage!');
  }

  return (
    <Router>
      <div className="shell">

        {/* Top bar */}
        <header className="topbar">
          <div className="topbar-logo">STAFF<span>BASE</span></div>
          <span className="topbar-badge">{employees.length} employees</span>
        </header>

        {/* Sidebar */}
        <nav className="sidebar">
          <span className="sidebar-label">Manage</span>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="sidebar-icon">＋</span> Add Employee
          </NavLink>
          <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="sidebar-icon">◫</span> Employee List
          </NavLink>
        </nav>

        {/* Main */}
        <main className="main">
          <Routes>
            <Route path="/" element={<EmployeeForm addEmployee={addEmployee} saveData={saveData} />} />
            <Route path="/employees" element={<EmployeeList employees={employees} />} />
            <Route path="/employees/:id" element={<EmployeeDetail employees={employees} />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
