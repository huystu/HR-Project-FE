// src/pages/EmployeePage.jsx
import { useState } from "react";
import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";

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

  return (
    <Layout user={user} route="Employees">
      <DashboardCard header="Employees" btn="Add Employee" btnClick={handleAddEmployee}>
        <Table columns={columns} data={data} />
      </DashboardCard>
    </Layout>
  );
};

export default EmployeePage;