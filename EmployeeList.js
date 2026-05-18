import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList(props) {
  return (
    <div className="employee-list">
      <h1>Employee List</h1>

      {props.employees.length === 0 ? (
        <p className="empty-message">No employees added yet. <Link to="/">Add one here.</Link></p>
      ) : (
        <ul>
          {props.employees.map((employee) => (
            <li key={employee.EmployeeId}>
              <Link to={`/employees/${employee.EmployeeId}`}>
                <span className="emp-name">{employee.name}</span>
                <span className="emp-meta">{employee.title} — {employee.department}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link to="/" className="back-link">← Add Another Employee</Link>
    </div>
  );
}

export default EmployeeList;
