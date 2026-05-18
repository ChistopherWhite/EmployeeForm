import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeDetail() {
  const { id } = useParams();

  // Load employees from localStorage and find the matching employee by ID
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const employee = employees.find((emp) => emp.EmployeeId === id);

  if (!employee) {
    return (
      <div className="employee-detail">
        <h1>Employee Not Found</h1>
        <p>This employee does not exist or may not have been saved yet.</p>
        <Link to="/employees" className="back-link">← Back to Employee List</Link>
      </div>
    );
  }

  return (
    <div className="employee-detail">
      <h1>Employee Details</h1>
      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Name</span>
          <span className="detail-value">{employee.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value">{employee.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Job Title</span>
          <span className="detail-value">{employee.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Department</span>
          <span className="detail-value">{employee.department}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Employee ID</span>
          <span className="detail-value">{employee.EmployeeId}</span>
        </div>
      </div>
      <Link to="/employees" className="back-link">← Back to Employee List</Link>
    </div>
  );
}

export default EmployeeDetail;
