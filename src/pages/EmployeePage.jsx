// src/pages/EmployeePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const EmployeePage = () => {
  const user = "Admin"; // User Name
  const columns = ["Date", "Employee", "Role", "Skills", "Email", "Phone Number", "Action"];

  const [data, setData] = useState([
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
  ]);

  const [pageCount, setPageCount] = useState(21);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const accessToken = localStorage.getItem('token');

  const navigate = useNavigate();

  // Add Employee
  const handleAddEmployee = () => {
    const newEmployee = {
      Date: new Date().toLocaleDateString(),
      Employee: "New Employee",
      Role: "Developer",
      Skills: "React",
      Email: "new@st.com",
      "Phone Number": "0000000000",
      Action: "50px",
    };
    setData((prevData) => [...prevData, newEmployee]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <Layout user={user} route="Employees">
      <DashboardCard header="Employees" btn="Add Employee" btnClick={handleAddEmployee} footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}>
        <Table columns={columns} data={data} />
      </DashboardCard>
    </Layout>
  );
};

export default EmployeePage;