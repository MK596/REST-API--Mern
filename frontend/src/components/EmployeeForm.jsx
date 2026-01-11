import React, { useState, useEffect } from "react";
import API from "../api";

const EmployeeForm = ({ fetchEmployees, editData, setEditData }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editData) {
                // UPDATE
                await API.put(`/employees/update/${editData._id}`, form);
                setEditData(null);
            } else {
                // CREATE
                await API.post("/employees/add-emp", form);
            }

            setForm({ name: "", email: "", phone: "", city: "" });
            fetchEmployees();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form
  onSubmit={handleSubmit}
  className="card border-0 shadow-sm mb-4 rounded-3"
>
  {/* Header */}
  <div className="card-header bg-gradient bg-primary text-white text-center py-2 rounded-top-3">
    <h5 className="mb-0 fw-semibold">
      {editData ? "Update Employee" : "Add Employee"}
    </h5>
    <small className="opacity-75">
      {editData ? "Edit details" : "Employee information"}
    </small>
  </div>

  {/* Body */}
  <div className="card-body p-3">
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label small fw-semibold mb-1">
          Full Name
        </label>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="form-control form-control-sm shadow-sm"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-semibold mb-1">
          Email
        </label>
        <input
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="form-control form-control-sm shadow-sm"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-semibold mb-1">
          Phone
        </label>
        <input
          name="phone"
          type="number"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className="form-control form-control-sm shadow-sm"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-semibold mb-1">
          City
        </label>
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="form-control form-control-sm shadow-sm"
        />
      </div>
    </div>

    {/* Button */}
    <div className="d-flex justify-content-center mt-4">
      <button
        type="submit"
        className={`btn ${
          editData ? "btn-warning" : "btn-primary"
        } btn-sm px-4 rounded-pill shadow-sm`}
      >
        {editData ? "Update" : "Save"}
      </button>
    </div>
  </div>
</form>


    );
};

export default EmployeeForm;
