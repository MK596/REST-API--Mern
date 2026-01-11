import React, { useEffect, useState } from "react";
import API from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchEmployees = async () => {
    const res = await API.get("/employees/allemployees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
   <div className="container mt-5">
  <EmployeeForm
    fetchEmployees={fetchEmployees}
    editData={editData}
    setEditData={setEditData}
  />

  <EmployeeList
    employees={employees}
    fetchEmployees={fetchEmployees}
    setEditData={setEditData}
  />
</div>

  );
};

export default App;
