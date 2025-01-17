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
import Title from '../components/Title';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

import roleOptions from "../constants/roleOptions";
import skillOptions from "../constants/skillOptions";



const EmployeePage = () => {
  const user = localStorage.getItem('loginUser'); // User Name
  const columns = ["Date", "Employee", "Role", "Skills", "Email", "Phone Number", "Action"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); //선택된 직원 데이터
  const [modalMode, setModalMode] = useState("add"); // Setting of Modal: "add" or "edit" or "delete"
  

  const [loading, setLoading] = useState(false); // 로딩 상태

  

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleViewClick = (row) => {
    navigate(`/employees/${row.id}`); //EmployeePage에서 전달받은 데이터 중 선택된 직원의 고유ID
};

const navigate = useNavigate();
const accessToken = localStorage.getItem('token');

// Check token

// Check token
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
      navigate("/"); // Redirect to login if no token
  } else {
      setAuthToken(token); // Set token in Axios headers
  }
}, [navigate]);


const handleSaveClick = async (row) => {
  const employeeId = row.id; // 직원 ID 가져오기
  console.log('Employee ID', employeeId);
        

  try {
    const response = await api.get(`/employee/${employeeId}/cv`, {
      responseType: "blob", // Handle binary data
  });


      console.log("response status:", response.status);
      console.log("response:", response);
      if (response.status !== 200) {
          const errorResponse = await response.clone().text(); // 복제된 객체에서 텍스트 읽기
          console.error('Error response:', errorResponse);
          throw new Error('Failed to fetch CV. HTTP Status: ${response.status');
          
      }

       // 응답이 PDF인지 확인
       const contentType = response.headers.get('Content-Type');
       if (!contentType || !contentType.includes('application/pdf')) {
           const errorResponse = await response.clone().text(); // 복제된 객체에서 텍스트 읽기
           console.error('Unexpected Response Body:', errorResponse);
           throw new Error('The server did not return a PDF file.');
       }

       // Create a Blob URL and download the file
       const blob = new Blob([response.data], { type: "application/pdf" });
       const url = window.URL.createObjectURL(blob);


        // 파일 다운로드 처리
        const link = document.createElement('a');
        link.href = url;
        link.download = `employee_${employeeId}_cv.pdf`; // 다운로드 파일 이름 지정
        document.body.appendChild(link);
        link.click();
        link.remove(); // 사용 후 링크 제거

        // URL 해제
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading CV:', error);
        alert('Failed to download CV. Please try again.');
  }
};

  //모달 열기, 폼 데이터 초기화 후 모달 열기
  const handleAddEmployee = () => {
    setModalMode("add"); // Set Mode
    setIsModalOpen(true); // Open the modal
    // formik.resetForm();
    formik.resetForm( { date: '',
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
      skills: '', } );
  };

  const parseDateFromBackend = (dateString) => {
    //convert 'yyyy-mm-dd' format string to date object
    const jsDate = new Date(dateString);
    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(jsDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Return 'YYYY-MM-DD' format
    
  };

  //직원 수정 모달 열기
  //handleEdiClick 함수가 비동기로 데이터를 가져온 후 selectedEmployee를 업데이트
  const handleEditClick = async (employee) => {
    setModalMode("edit");
    // console.log("click edit: ", employee);

    // setSelectedEmployee(employee); //클릭한 직원 데이터 api에서 불러와 selectedEmployee 상태로 저장

    // console.log("click edit: ", selectedEmployee);

    try {
         //선택된 직원 데이터 GET 요청
        //  const getResponse = await api.get(`/employee/${selectedEmployee.id}`);
        const getResponse = await api.get(`/employee/${employee.id}`); 
        const employeeData = getResponse.data.data;



        console.log("Employee data:", employeeData);

         //상태를 업데이트하여 selectedEmployee에 직원
         setSelectedEmployee({ 
            //  ...selectedEmployee,
             id: employeeData.id,
             name: employeeData.name,
             email: employeeData.email,
             phoneNumber: employeeData.contact, 
             role: employeeData.role, 
             skills: employeeData.skills, 
             date: parseDateFromBackend(employeeData.joiningDate)
          });

          console.log("selected employee: ", selectedEmployee);
          //console.log("Raw date from backend:", employeeData.date);
          const employeeDate = employeeData.date || employeeData.joiningDate || "unknown";
          console.log("Extracted employee date:", employeeDate);
          console.log("Parsed date for frontend:", parseDateFromBackend);

         //formik의 폼 필드 값을 업데이트하고 모달 열기
         formik.setValues({
          name: employeeData.name,
          email: employeeData.email,
          phoneNumber: employeeData.contact,
          role: employeeData.role,
          skills: employeeData.skills,
          date: parseDateFromBackend(employeeData.date),
        });
        
        // 수정된 ID를 URL에 전달
        navigate(`/employee/${id}/detail`);


    }
    catch(error)
    {
      console.error(error);
    }
    setIsModalOpen(true); //모달 열기
  }

  
  //삭제하는 로직 추가
  const handleDeleteClick = (employee) => {
    setModalMode("delete");
    setSelectedEmployee(employee); //삭제할 직원 설정
    setIsDeleteModalOpen(true);
    
  }

  //item은 data 배열의 각 요소
  const deleteEmployee = async () => {
    if (!selectedEmployee || !selectedEmployee.id) {
      alert("Error: Unable to identify the employee to delete.");
      return;
    }
  
    try {
      // DELETE 요청 보내기
      const response = await api.delete(`/employee/${selectedEmployee.id}`);
      if (response.status === 200) {
        alert("Employee deleted successfully!");
  
        // 상태에서 해당 직원 제거
        const updatedData = data.filter((item) => item.id !== selectedEmployee.id);
        setData(updatedData);

        //console.log()
        // 삭제 모달 닫기
        setIsDeleteModalOpen(false);
        fetchData(currentPage - 1, pageSize);
        
        //성공적으로 추가된 후, fetchData로 데이터를 새로고침하여 테이블에 반영
      } else {
        alert("Failed to delete employee. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    }
  };

  //const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  //const accessToken = localStorage.getItem('token');

  const [data, setData] = useState([]);


  

  // 1. API에서 데이터 가져오기
    const fetchData = async (page = 0, size = 10) => {
    setAuthToken(accessToken); // 인증 토큰 설정
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
        
        //2. 데이터를 화면에 맞게 변환
        const formattedData = response.data.data.content.map(employee => ({
          Date: employee.joiningDate, // 원하는 형식으로 날짜 변환 함수
          Employee: employee.name, 
          Role: employee.role || 'N/A',
          Skills: employee.skills,
          Email: employee.email,
          "Phone Number": employee.contact,
          Action: ["Edit", "Delete", "View", "Save"],
          id: employee.id,
        }));

        //3. 상태 업데이트
        setData(formattedData);
        setPageCount(response.data.data.page.totalPages);
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
  //initialValues는 처음 렌더링할 때만 설정됨
  //selectedEmployee가 바뀔 때마다 폼 값을 업데이트하려면 formik.setValues를 이용해 명시적으로
  const formik = useFormik({
    initialValues: {
      
      //name: selectedEmployee?.name || '',
      date: selectedEmployee?.date || '',
      name: selectedEmployee?.name || '',
      email: selectedEmployee?.email || '',
      phoneNumber: selectedEmployee?.phoneNumber || '',
      role: selectedEmployee?.role || '',
      skills: selectedEmployee?.skills || [],
    },
    enableReinitialize: true, //selectedEmployee가 변경될 때 초기화
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
        errors.phoneNumber = 'Phone number is required';
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
      console.log("submited values:", values);
      
      if (modalMode === "add") { 
        const formattedDate = formatDateForBackend(values.date); // Convert to 'YYYY-MM-DD'
        setAuthToken(accessToken); // accessToken 설정

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
            //성공적으로 추가된 후, fetchData로 데이터를 새로고침하여 테이블에 반영

            console.log(`Success Employee Info: ${JSON.stringify(response)}`);
            alert("Employee added successfully!");

            setIsModalOpen(false);
          }
        } catch (error) {
          console.error("Error adding employee:", error);
          alert("Failed to add employee. Please try again.");
        }
      }
  

      else if (modalMode === "edit" && selectedEmployee){
        try {
       
          //폼에 데이터 채우기

          const formattedDate = formatDateForBackend(values.date);

          const updatedEmployeeData = {
          name: values.name,
          email: values.email,
          contact: values.phoneNumber,
          skills: values.skills,
          role: values.role,
          joiningDate: formattedDate,
          };

        

        console.log("selectedEmployee: ", selectedEmployee);

        await updateEmployee(selectedEmployee.id, updatedEmployeeData);
        } catch (error) {
          console.error('Error fetching employee:', error);
          alert("Failed to fetch employee data");
        }
      }
    },
    });


    // selectedEmployee가 변경될 때마다 폼 값을 업데이트
useEffect(() => {
  console.log("useEffect when chaning selectedEmployee: ", selectedEmployee);
  if (selectedEmployee) {
    formik.setValues({
      date: selectedEmployee?.date ||'',
      name: selectedEmployee?.name ||'',
      email: selectedEmployee?.email ||'',
      phoneNumber: selectedEmployee.phoneNumber ||'',
      role: selectedEmployee?.role ||'',
      skills: selectedEmployee?.skills ||'',
    });
  }
}, [selectedEmployee]);  // selectedEmployee가 변경될 때마다 실행
      
  // PUT 요청을 보내는 함수
const updateEmployee = async (id, updatedData) => {
  //const token = localStorage.getItem('token'); // 인증 토큰 가져오기
  setAuthToken(accessToken); // 인증 토큰 설정

  try {
    const response = await api.put(`/employee/${id}`, updatedData);
    console.log('PUT Response:', response.data);

    if (response.status === 200) {
      //데이터 갱신
      console.log("fetching updated data...");
      await fetchData(currentPage - 1, pageSize);
      console.log("data refreshed!");
      console.log("formik initial values:", formik.initialValues);
      console.log(selectedEmployee);

    // Refresh data after update
      

    //console.log(response.data);

      alert("Employee updated successfully!");
      setIsModalOpen(false); 
    }

  } catch (error) {
    console.error('Error making PUT request:', error);
    alert("Failed to update employee, please try again.");
  }
};

 //4. 컴포넌트가 렌더링 될 때 데이터 가져오기
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
          title = {<Title>{modalMode === "add" ? "Add Employee" : "Update Employee"}</Title>}
          footer={
            <div className = "button-container">
              <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button onClick={formik.handleSubmit}>{modalMode === "add" ? "Add" : "Update"}</Button>
            </div>
          }
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="input-field-half-row">
              <InputField className = "-half" label= {<span>Date <span className = "red-asterisk">*</span></span>} type="date" name="date" formik={formik} />
              <InputField className = "-half" label= {<span>Name <span className = "red-asterisk">*</span></span>} type="text" name="name" formik={formik} />
            </div>
            <InputField label="Role" type="text" name="role" formik={formik} />
            {/* <InputField label="Role" type="select" name="role" formik={formik} options={roleOptions} defaultValue={modalMode === 'edit' ? formik.values.role : undefined} /> */}
            {/* <InputField
              label="Role"
              type="autocomplete"
              name="role"
              formik={formik}
              options={roleOptions}
              value={inputValue}
              onSearch={handelAddMemberSearch}
              onFocus={handleAddMemberFocus}
              onSelect={handelAddMemberSelect}
            /> */}
            <InputField label="Skills" type="text" name="skills" formik={formik} />
            <InputField label={<span> Email <span className = "red-asterisk">*</span></span>} type="email" name="email" formik={formik} />
            <InputField label={<span>Phone number <span className = "red-asterisk">*</span></span>} type="tel" name="phoneNumber" formik={formik} />
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
                  <Button onClick={deleteEmployee}>Delete</Button>
                  </div>
                }
              />
            
            {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
        : (
        <Table columns={columns} data={data} onEditClick = {handleEditClick} onDeleteClick = {handleDeleteClick} onViewClick = {handleViewClick} onSaveClick = {handleSaveClick} />)
        }

          {/* 테이블에서 Edit 클릭 시 실행될 함수 전달 */}

        
      </DashboardCard>
    </Layout>
  );
};


export default EmployeePage;