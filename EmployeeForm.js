import React from 'react';
import './EmployeeForm.css';

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            title: '',
            department: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Pass the current form data up to App.js to be added to the employees array
        this.props.addEmployee({ ...this.state });

        console.log(this.state);

        // Reset the form fields after submission
        this.setState({ name: '', email: '', title: '', department: '' });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Employee Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={this.state.department}
                    onChange={this.handleChange}
                />

                <button type="submit">Add Employee</button>

                {/* Calls saveData in App.js to persist the employees array to localStorage */}
                <button type="button" onClick={this.props.saveData}>
                    Save to Local Storage
                </button>
            </form>
        );
    }
}

export default EmployeeForm;
