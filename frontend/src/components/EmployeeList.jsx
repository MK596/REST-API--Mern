import React from "react";
import API from "../api";

const EmployeeList = ({ employees, fetchEmployees, setEditData }) => {
  const handleDelete = async (id) => {
    await API.delete(`/employees/delete/${id}`);
    fetchEmployees();
  };

  return (
    <div className="card shadow-sm">
  <div className="card-body">
    <h4 className="text-center mb-3">Employee List</h4>

    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.city}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => setEditData(emp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default EmployeeList;
