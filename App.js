import { useState } from 'react';
import './App.css';
import EmployeeForm from './EmployeeForm';

function App() {
  // Initialize state from localStorage if data already exists,
  // otherwise start with an empty array.
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  // Adds a new employee object to the employees state array.
  function addEmployee(newEmployee) {
    setEmployees((prev) => [...prev, newEmployee]);
  }

  // Saves the current employees array to localStorage.
  // localStorage can only hold strings, so JSON.stringify() converts the array first.
  function saveData() {
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee data saved to local storage!');
  }

  return (
    <div className="App">
      <h1>Employee Form</h1>
      <EmployeeForm addEmployee={addEmployee} saveData={saveData} />

      {/* Display the list of added employees */}
      {employees.length > 0 && (
        <div>
          <h2>Employee List</h2>
          <ul>
            {employees.map((emp, index) => (
              <li key={index}>
                <strong>{emp.name}</strong> — {emp.title} | {emp.department} | {emp.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
