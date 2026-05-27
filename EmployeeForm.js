import React from 'react';
import './EmployeeForm.css';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', title: '', department: '' };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addEmployee({ ...this.state });
    this.setState({ name: '', email: '', title: '', department: '' });
  }

  render() {
    return (
      <>
        <div className="page-header">
          <h1>Add Employee</h1>
          <p>Fill out the form below to register a new employee.</p>
        </div>

        <div className="form-card">
          <form onSubmit={this.handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Jane Smith"
                  value={this.state.name} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="jane@company.com"
                  value={this.state.email} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" name="title" placeholder="e.g. Software Engineer"
                  value={this.state.title} onChange={this.handleChange} required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" placeholder="e.g. Engineering"
                  value={this.state.department} onChange={this.handleChange} required />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Add Employee</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.saveData}>
                Save to Storage
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EmployeeForm;
