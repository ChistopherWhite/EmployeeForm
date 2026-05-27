import { useParams, Link } from 'react-router-dom';
import './EmployeeList.css';

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

function EmployeeDetail({ employees }) {
  const { id } = useParams();
  const employee = (employees.length > 0 ? employees : JSON.parse(localStorage.getItem('employees') || '[]'))
    .find(emp => emp.EmployeeId === id);

  if (!employee) return (
    <div className="detail-page">
      <h1>Not Found</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>This employee record doesn't exist.</p>
      <Link to="/employees" className="back-link">← Back to list</Link>
    </div>
  );

  const color = getDeptColor(employee.department);

  return (
    <div className="detail-page">
      <Link to="/employees" className="back-link" style={{ marginBottom: 20, display: 'inline-flex' }}>
        ← Back to list
      </Link>

      <h1 style={{ marginTop: 16 }}>Employee Profile</h1>

      <div className="detail-hero" style={{ '--dept-color': color }}>
        <div className="detail-avatar">{initials(employee.name)}</div>
        <div>
          <div className="detail-hero-name">{employee.name}</div>
          <div className="detail-hero-title">{employee.title}</div>
        </div>
      </div>

      <div className="detail-fields">
        {[
          ['Email',       employee.email],
          ['Department',  employee.department],
          ['Job Title',   employee.title],
          ['Employee ID', employee.EmployeeId],
        ].map(([label, value]) => (
          <div className="detail-field" key={label}>
            <span className="detail-field-label">{label}</span>
            <span className="detail-field-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDetail;
