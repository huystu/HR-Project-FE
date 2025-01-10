// src/pages/EmployeePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import Title from '../components/Title';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";


const EmployeePage = () => {
  const user = "Admin"; // User Name
  const columns = ["Date", "Employee", "Role", "Skills", "Email", "Phone Number", "Action"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); //선택된 직원 데이터

  const [modalMode, setModalMode] = useState("add"); // Setting of Modal: "add" or "edit"

  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleAddEmployee = () => {
    setModalMode("add"); // Set Mode
    setIsModalOpen(true); // Open the modal
    formik.resetForm();
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); //클릭한 직원 데이터 설정
    setIsModalOpen(true); //모달 열기
  }

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const accessToken = localStorage.getItem('token');

  const [data, setData] = useState([]);

  //삭제하는 로직 추가
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee); //삭제할 직원 설정
    setIsDeleteModalOpen(true);
  }

  //item은 data 배열의 각 요소
  const deleteEmployee = () => {

    const updatedData = data.filter(item => item !== item.selectedEmployee)
    setData(updatedData); //상태 업데이트하여 UI에 반영
    setIsDeleteModalOpen(false);
  }

 // Fetch data from API
 const fetchData = async (page = 0, size = 10) => {
    setAuthToken(accessToken); // set the accessToken

    setLoading(true);

    console.log(accessToken);
    
    try {
      const response = await api.get('/employee', {
        params: {
          page: page,
          size: size,
        }
      });

      if (response.status === 200) {
        console.log("Success Pagination: ", response);
        console.log(response.data.data.content);
        setPageCount(response.data.data.page.totalPages);
        
        const formattedData = response.data.data.content.map(employee => ({
          Date: employee.joiningDate, // 원하는 형식으로 날짜 변환 함수
          Employee: employee.name, Role: employee.role || 'N/A',
          Skills: employee.skills.split(',').map(skill => skill.trim()),
          Email: employee.email,
          "Phone Number": employee.contact,
          Action: "50px",
          id: employee.id,
        }));
        setData(formattedData);
      }
    }
    catch (error) {
      console.error('Error fetching employee data:', error);
    }
    
    setLoading(false);
  };

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
        const formattedDate = formatDateForBackend(values.date); // Convert to 'YYYY-MM-DD'

        setAuthToken(accessToken); // set accessToken

        try {
          const response = await api.post("/employee", {
            name: values.name,
            email: values.email,
            contact: values.phoneNumber,
            skills: values.skills,
            role: values.role,
            joiningDate: formattedDate, // Send formatted date
          });

          if (response.status === 200) {
            fetchData(currentPage - 1, pageSize);

            console.log(`Success Employee Info: ${JSON.stringify(response)}`);
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

  useEffect(() => {
    fetchData(currentPage - 1, pageSize);
  }, [currentPage]);

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
          <form onSubmit={formik.handleSubmit}>
            <div className="input-field-half-row">
              <InputField className = "input-field-half" label="Date" type="date" name="date" formik={formik} />
              <InputField className = "input-field-half" label="Name" type="text" name="name" formik={formik} />
            </div>
            <InputField label="Role" type="text" name="role" formik={formik} /> {/*드롭다운*/}
            <InputField label="Skills" type="text" name="skills" formik={formik} /> {/*선택하기*/}
            <InputField label="Email" type="email" name="email" formik={formik} />
            <InputField label="PhoneNumber" type="tel" name="phoneNumber" formik={formik} />
          </form>
        </CustomModal>        

        {/* Delete Confirmation Modal */}
        <DeleteModal    
          isModalOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={deleteEmployee}
          employee={selectedEmployee}
          title = {
            <div style={{ textAlign: "center "}}>
              <img src="/1.png" alt="Delete Confirmation" style={{ width: "50px", height: "50px", marginBottom: "10px" }} />
              <Title>Are you sure?</Title>
            </div>
          }
          subTitle ={
            <p style={{ textAlign: "center" }}>
              Do you want to delete the record? <br></br>
              This process cannot be undone.
            </p>
          } 
          footer={
            <div className = "button-container">
              {/*<img src="/images/1.png" alt="Delete Confirmation" />*/}
              <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={formik.handleSubmit}>Delete</Button>
              </div>
            }
          />
        {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
        : (
        <Table columns={columns} data={data} onEditClick = {handleEditClick} onDeleteClick = {handleDeleteClick} />)
        }
      </DashboardCard>
    </Layout>
  );
};


export default EmployeePage;