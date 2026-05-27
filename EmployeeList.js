import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

// Assign a consistent color to each department
const DEPT_COLORS = ['#f5a623','#42c789','#4299e1','#9f7aea','#f687b3','#f56342','#38b2ac','#ed8936'];
const deptColorMap = {};
let colorIndex = 0;
function getDeptColor(dept) {
  const key = dept?.toLowerCase().trim() || 'other';
  if (!deptColorMap[key]) {
    deptColorMap[key] = DEPT_COLORS[colorIndex % DEPT_COLORS.length];
    colorIndex++;
  }
  return deptColorMap[key];
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function EmployeeList({ employees }) {
  const [search, setSearch] = useState('');

  const filtered = employees.filter(emp =>
    [emp.name, emp.title, emp.department, emp.email]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  );

  // Department breakdown for stats
  const deptCounts = employees.reduce((acc, emp) => {
    const d = emp.department || 'Other';
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{employees.length}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        {Object.entries(deptCounts).slice(0, 4).map(([dept, count]) => (
          <div className="stat-card" key={dept}>
            <div className="stat-value" style={{ color: getDeptColor(dept) }}>{count}</div>
            <div className="stat-label">{dept}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="list-toolbar">
        <h1>Employees</h1>
        <div className="search-box">
          <span>⌕</span>
          <input
            placeholder="Search by name, title, department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◻</div>
          <p>{employees.length === 0
            ? <><Link to="/">Add your first employee</Link> to get started.</>
            : 'No employees match your search.'
          }</p>
        </div>
      ) : (
        <div className="employee-grid">
          {filtered.map(emp => {
            const color = getDeptColor(emp.department);
            return (
              <Link
                to={`/employees/${emp.EmployeeId}`}
                className="emp-card"
                key={emp.EmployeeId}
                style={{ '--dept-color': color }}
              >
                <div className="emp-card-avatar">{initials(emp.name)}</div>
                <div className="emp-card-name">{emp.name}</div>
                <div className="emp-card-title">{emp.title}</div>
                <div className="emp-card-footer">
                  <span className="dept-badge">{emp.department}</span>
                  <span className="emp-card-arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default EmployeeList;
