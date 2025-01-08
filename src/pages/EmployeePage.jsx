// src/pages/EmployeePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import Title from '../components/Title';
import { useFormik } from 'formik';
import '../styles/global.css';

import Pagination from "../components/Pagination";

const EmployeePage = () => {
  const user = "Admin"; // User Name
  const columns = ["Date", "Employee", "Role", "Skills", "Email", "Phone Number", "Action"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); //선택된 직원 데이터

  const [modalMode, setModalMode] = useState("add"); // Setting of Modal: "add" or "edit"

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleAddEmployee = () => {
    setModalMode("add"); // Set Mode
    setIsModalOpen(true); // Open the modal
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); //클릭한 직원 데이터 설정
    setIsModalOpen(true); //모달 열기
  }

  const [pageCount, setPageCount] = useState(21);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const accessToken = localStorage.getItem('token');

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

  /*
  const showModal = () => {
    setIsModalOpen(true);
  }
  */

  // Change Date Type (LocalDate Type in Java)
  const formatDateForBackend = (date) => {
    // Convert JS Date to 'YYYY-MM-DD' format
    const jsDate = new Date(date); // Ensure it's a Date object
    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(jsDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Return 'YYYY-MM-DD' format
  };
  
  // Formik settings
  const formik = useFormik({
    initialValues: {
      date: selectedEmployee?.Date || '',
      employee: selectedEmployee?.Employee || '',
      email: selectedEmployee?.Email || '',
      phoneNumber: selectedEmployee?.PhoneNumber || '',
      role: selectedEmployee?.Role || '',
      skills: selectedEmployee?.Skills || '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.date)
      {
        errors.date = 'Date is required';
      }
      
      if (!values.name)
      {
        errors.name = 'Name is required';
      }

      if (!values.phoneNumber)
      {
        errors.phoneNumber = 'phoneNumber is required';
      } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be 10 digits';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

        return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      if (modalMode === "add") { 
        console.log("Add Employee Info: ", values);

        const formattedDate = formatDateForBackend(values.date); // Convert to 'YYYY-MM-DD'

        setAuthToken(accessToken); // accessToken 설정

        try {
          const response = await api.post("/employee", {
            name: values.name,
            email: values.email,
            contact: values.phoneNumber,
            skills: values.skills,
            rolel: values.role,
            joiningDate: formattedDate, // Send formatted date
          });

          if (response.status === 200) {
            const newEmployee = {
              Date: values.date,
              Employee: values.name,
              Role: values.role || "N/A",
              Skills: values.skills.split(",").map((skill) => skill.trim()),
              Email: values.email,
              "Phone Number": values.phoneNumber,
              Action: "50px",
            };

            setData((prevData) => [...prevData, newEmployee]); // Update UI

            console.log(`Success Employee Info: ${response.data}`);
            alert("Employee added successfully!");

            setIsModalOpen(false);
          }
        } catch (error) {
          console.error("Error adding employee:", error);
          alert("Failed to add employee. Please try again.");
        }
      };
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <Layout user={user} route="Employees">
      <DashboardCard header="Employees" btn="Add Employee" btnClick={handleAddEmployee} footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}>
        <CustomModal 
          isModalOpen={isModalOpen}
          handleOk={formik.handleSubmit} //폼 제출
          handleCancel={handleCancel}
          title = {<Title>Add Employee</Title>}
          footer={
            <div className = "button-container">
              <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button onClick={formik.handleSubmit}>Add</Button>
            </div>
          }
        >
        {/*date, Name, role, skills, email, phoneNumber, actions*/}
          <form onSubmit={formik.handleSubmit}>
            <InputField label="Date" type="date" name="date" formik={formik} />
            <InputField label="Name" type="text" name="name" formik={formik} />
            <InputField label="Role" type="text" name="role" formik={formik} />
            <InputField label="Skills" type="text" name="skills" formik={formik} />
            <InputField label="Email" type="email" name="email" formik={formik} />
            <InputField label="PhoneNumber" type="tel" name="phoneNumber" formik={formik} />
          </form>
        </CustomModal>
        <Table 
          columns={columns} 
          data={data}
          onEditClick = {handleEditClick} // 테이블에서 Edit 클릭 시 실행될 함수 전달
        />
      </DashboardCard>
    </Layout>
  );
};


export default EmployeePage;